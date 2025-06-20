# Development Server Documentation

## Overview

This document explains the minimal Node.js development server (`server.js`) designed to improve AI assistant workflows when testing and developing EDS (Edge Delivery Services) components locally. The server provides local file serving with automatic fallback to a remote proxy, making it ideal for AI assistants to test blocks and components in isolation with immediate feedback and clear error reporting.

## Dependencies

The development server has **zero external dependencies** and uses only Node.js built-in modules:

- **`http`** - Creates the HTTP server
- **`fs/promises`** - File system operations (readFile, access)
- **`path`** - Path manipulation utilities (join, extname, dirname)
- **`url`** - URL utilities (fileURLToPath)
- **`fetch`** - HTTP requests for proxy functionality (built-in Node.js 18+)

### Requirements

- **Node.js 18+** (for built-in fetch support)
- **No npm packages required** - completely self-contained

This zero-dependency approach aligns with the project's philosophy of minimal tooling and maximum performance.

## Quick Start

```bash
npm run debug
```

The server will start on `http://localhost:3000` and serve files from the project root directory.

## Server Architecture

### Core Functionality

The server implements a **local-first, proxy-fallback** architecture:

1. **Local File Priority**: Always attempts to serve files from the local filesystem first
2. **Proxy Fallback**: If a file doesn't exist locally, proxies the request to `https://allabout.network`
3. **MIME Type Detection**: Automatically detects and serves appropriate content types
4. **CORS Support**: Includes proper CORS headers for cross-origin requests

### File Structure

```
project-root/
├── server.js              # Main server file
├── package.json           # Contains "debug" script
└── blocks/                # Your EDS blocks
    └── block-name/
        ├── test.html       # Test files for blocks
        ├── block-name.js   # Block JavaScript
        └── block-name.css  # Block styles
```

## Configuration

### Environment Variables

- `PORT`: Server port (default: 3000)

### Proxy Configuration

The server is configured to proxy missing files to:
```javascript
const PROXY_HOST = 'https://allabout.network';
```

This allows you to test local components while still accessing remote assets and content.

## Supported File Types

The server includes comprehensive MIME type support:

| Extension | MIME Type |
|-----------|-----------|
| `.html` | `text/html` |
| `.js` | `application/javascript` |
| `.css` | `text/css` |
| `.json` | `application/json` |
| `.png`, `.jpg`, `.jpeg` | Image types |
| `.svg` | `image/svg+xml` |
| `.woff`, `.woff2`, `.ttf` | Font types |

## Usage Examples

### Testing Block Components

1. **Create a test file** in your block directory:
   ```
   blocks/my-block/test.html
   ```

2. **Start the server**:
   ```bash
   npm run debug
   ```

3. **Access your test**:
   ```
   http://localhost:3000/blocks/my-block/test.html
   ```

### Example Test File Structure

**CRITICAL**: Test files must use the exact same block structure as EDS. The purpose of test files is to replicate the EDS environment locally - there is no alternative structure. Any deviation will cause inconsistent behavior between test and production.

#### Required EDS Block Structure (Exact Replication)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Block Test - EDS Structure</title>
    <link rel="stylesheet" href="my-block.css">
</head>
<body>
    <!-- EDS Block Structure: Use .block class with data attributes -->
    <div class="my-block block" data-block-name="my-block" data-block-status="initialized">
        <div>
            <div>
                <p>Test content for my block</p>
            </div>
        </div>
    </div>

    <script type="module">
        import decorate from './my-block.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            // Select using EDS structure: .block-name.block
            const block = document.querySelector('.my-block.block');
            if (block) {
                decorate(block);
            }
        });
    </script>
</body>
</html>
```

#### Critical Requirement: Identical EDS Structure

**The test structure MUST be identical to the EDS structure.** The purpose of test files is to replicate the exact EDS environment locally.

| Element | Required EDS Structure | Purpose |
|---------|----------------------|---------|
| **Block Container** | `<div class="block-name block" data-block-name="block-name" data-block-status="initialized">` | Exact replica of EDS block processing |
| **Content Wrapper** | Nested `<div><div><p>content</p></div></div>` | Matches EDS content structure exactly |
| **JavaScript Selector** | `.block-name.block` | Targets the same elements as EDS |
| **Content Elements** | Semantic HTML (`<p>`, `<h2>`, etc.) | Identical to EDS content processing |

**There is no "basic HTML" alternative** - test files must use EDS structure to ensure compatibility.

## Server Behavior

### Local File Serving

When a request comes in:

1. **Path Resolution**: Converts URL to local file path
2. **File Existence Check**: Uses `fs.access()` to check if file exists
3. **Content Serving**: Reads and serves file with appropriate headers
4. **Error Handling**: Gracefully handles file read errors

### Proxy Behavior

When local file doesn't exist:

1. **Proxy Request**: Makes HTTP request to `https://allabout.network`
2. **Content Type Detection**: Preserves original content type
3. **Binary/Text Handling**: Appropriately handles different content types
4. **Error Handling**: Returns 404 if both local and proxy fail

### Request Flow

```
Request → Local File Check → Serve Local File
    ↓ (if not found)
Proxy Request → Remote Server → Serve Proxied Content
    ↓ (if proxy fails)
Return 404 Error Page
```

## Logging and Debugging

The server provides comprehensive logging:

```
🚀 Server running at http://localhost:3000
📁 Serving files from: /path/to/project
🔗 Proxying missing files to: https://allabout.network
📄 Main page: http://localhost:3000/server.html

Request: GET /blocks/my-block/test.html
Serving local file: /path/to/project/blocks/my-block/test.html

Request: GET /missing-file.json
Local file not found, attempting proxy for: /missing-file.json
Proxying request to: https://allabout.network/missing-file.json
✅ Successfully proxied: /missing-file.json
```

## Error Handling

### Local File Errors

- **File Not Found**: Automatically falls back to proxy
- **Read Errors**: Logs error and attempts proxy fallback
- **Permission Errors**: Gracefully handled with error logging

### Proxy Errors

- **Network Errors**: Returns 404 with helpful error page
- **DNS Resolution**: Handles domain resolution failures
- **HTTP Errors**: Logs detailed error information

### 404 Error Page

When both local and proxy fail, returns a helpful error page:

```html
<!DOCTYPE html>
<html>
  <head><title>404 Not Found</title></head>
  <body>
    <h1>404 Not Found</h1>
    <p>The requested resource <code>/path</code> was not found locally 
    or on the proxy server.</p>
    <p>Attempted proxy URL: <code>https://allabout.network/path</code></p>
  </body>
</html>
```

## Performance Considerations

### Caching Headers

All responses include:
```javascript
'Cache-Control': 'no-cache'
```

This ensures you always see the latest changes during development.

### CORS Headers

Proxy responses include comprehensive CORS headers:
```javascript
'Access-Control-Allow-Origin': '*'
'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
'Access-Control-Allow-Headers': 'Content-Type, Authorization'
```

## Security Notes

### Development Only

This server is designed for **development use only**:

- No authentication or authorization
- Permissive CORS headers
- No rate limiting
- Detailed error logging

**Do not use in production environments.**

### Safe Defaults

- Only serves files from project directory
- No directory traversal vulnerabilities
- Proper MIME type detection
- Graceful error handling

## Troubleshooting

### Common Issues

**Server won't start:**
```bash
# Check if port is in use
lsof -i :3000

# Kill existing process
pkill -f "node server.js"

# Restart server
npm run debug
```

**Files not loading:**
- Check file paths are relative to project root
- Verify file permissions
- Check server logs for detailed error messages

**Proxy not working:**
- Verify internet connection
- Check proxy URL configuration
- Review network logs in browser dev tools

**Block not working in EDS but works locally:**
- Verify test.html uses EDS block structure (`.block-name.block` with data attributes)
- Check JavaScript selector targets `.block-name.block` not `.block-name-block`
- Ensure content is wrapped in nested `<div><div>content</div></div>` structure
- Use semantic HTML elements (`<p>`, `<h2>`, etc.) for content
- Add debug logging to block JavaScript to trace execution

**Modal/overlay blocks not appearing:**
- Check browser console for JavaScript errors
- Verify localStorage isn't preventing display (clear with `localStorage.clear()`)
- Ensure CSS is loading correctly
- Check that block content extraction logic handles EDS nested structure

### Debug Mode

The server runs with comprehensive logging enabled. Monitor the terminal output to understand request flow and identify issues.

## Integration with EDS

### Block Testing Workflow

1. **Create Block Structure**:
   ```
   blocks/my-block/
   ├── my-block.js
   ├── my-block.css
   ├── README.md
   └── test.html
   ```

2. **Start Development Server**:
   ```bash
   npm run debug
   ```

3. **Test Block**:
   - Navigate to `http://localhost:3000/blocks/my-block/test.html`
   - Make changes to JS/CSS files
   - Refresh browser to see changes

4. **Proxy Integration**:
   - Missing assets automatically load from remote server
   - Test with real content and dependencies

### EDS-Specific Features

- **Automatic Block Loading**: Test files can import block JavaScript modules
- **CSS Loading**: Block stylesheets load automatically
- **Asset Proxying**: Missing icons, fonts, and images load from remote server
- **Query Index Access**: Can test with real query-index.json data

### Real-World Example: Floating Alert Block

The floating-alert block demonstrates the importance of using correct EDS structure in test files:

#### Correct EDS Structure (test.html):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Floating Alert Test - EDS Structure</title>
    <link rel="stylesheet" href="floating-alert.css">
</head>
<body>
    <div class="floating-alert block" data-block-name="floating-alert" data-block-status="initialized">
        <div>
            <div>
                <p>🎉 Welcome! Please review our <a href="#privacy">updated privacy policy</a>.</p>
            </div>
        </div>
    </div>

    <script type="module">
        import decorate from './floating-alert.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const block = document.querySelector('.floating-alert.block');
            if (block) {
                decorate(block);
            }
        });
    </script>
</body>
</html>
```

#### Why This Structure Matters:

1. **Content Extraction**: Block JavaScript expects nested `<div><div><p>content</p></div></div>` structure
2. **CSS Targeting**: Styles target `.floating-alert.block` not `.floating-alert-block`
3. **Data Attributes**: EDS adds `data-block-name` and `data-block-status` attributes
4. **Semantic HTML**: Content uses proper HTML elements (`<p>`, `<a>`) not plain text

#### Critical: Only One Correct Structure

**There is only one correct way to structure test files - they must exactly replicate EDS structure.**

```html
<!-- ❌ WRONG: Any structure that differs from EDS -->
<div class="floating-alert-block">
    Welcome! Please review our updated privacy policy.
</div>

<!-- ❌ WRONG: Missing data attributes -->
<div class="floating-alert block">
    <div><div>Content</div></div>
</div>

<!-- ❌ WRONG: Missing nested wrapper divs -->
<div class="floating-alert block" data-block-name="floating-alert" data-block-status="initialized">
    <p>Content</p>
</div>

<!-- ✅ CORRECT: Exact EDS structure replication -->
<div class="floating-alert block" data-block-name="floating-alert" data-block-status="initialized">
    <div>
        <div>
            <p>Welcome! Please review our <a href="#privacy">updated privacy policy</a>.</p>
        </div>
    </div>
</div>
```

**The test structure must be identical to EDS structure.** Any deviation will cause blocks to behave differently between test and production environments, defeating the purpose of local testing.

## Best Practices

### Creating EDS-Compatible Test Files

**Critical**: Always use EDS block structure in test files to ensure compatibility between local testing and production deployment.

#### Step-by-Step Test File Creation

1. **Create the HTML Structure**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block Name Test - EDS Structure</title>
    <link rel="stylesheet" href="block-name.css">
</head>
<body>
    <!-- EDS Block Structure Template -->
    <div class="block-name block" data-block-name="block-name" data-block-status="initialized">
        <div>
            <div>
                <!-- Your block content here using semantic HTML -->
                <p>Your content goes here</p>
            </div>
        </div>
    </div>

    <script type="module">
        import decorate from './block-name.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const block = document.querySelector('.block-name.block');
            if (block) {
                decorate(block);
            }
        });
    </script>
</body>
</html>
```

2. **Block Structure Requirements**:
   - **Container**: `<div class="block-name block" data-block-name="block-name" data-block-status="initialized">`
   - **Nested Wrappers**: Always use `<div><div>content</div></div>` structure
   - **Semantic Content**: Use proper HTML elements (`<p>`, `<h2>`, `<a>`, etc.)
   - **JavaScript Selector**: Target `.block-name.block` (not `.block-name-block`)

3. **Common Block Content Patterns**:

```html
<!-- Simple text block -->
<div class="text block" data-block-name="text" data-block-status="initialized">
    <div>
        <div>
            <p>This is a paragraph of text content.</p>
        </div>
    </div>
</div>

<!-- Block with links -->
<div class="alert block" data-block-name="alert" data-block-status="initialized">
    <div>
        <div>
            <p>Important notice! Please read our <a href="#policy">updated policy</a>.</p>
        </div>
    </div>
</div>

<!-- Block with multiple content elements -->
<div class="card block" data-block-name="card" data-block-status="initialized">
    <div>
        <div>
            <h2>Card Title</h2>
            <p>Card description text.</p>
            <p><a href="#link">Learn more</a></p>
        </div>
    </div>
</div>
```

#### Test File Organization Template

```html
<!-- Include block-specific styles -->
<link rel="stylesheet" href="block-name.css">

<!-- Create EDS-compatible block structure -->
<div class="block-name block" data-block-name="block-name" data-block-status="initialized">
    <div>
        <div>
            <!-- Block content using semantic HTML -->
        </div>
    </div>
</div>

<!-- Import and initialize block with EDS selector -->
<script type="module">
  import decorate from './block-name.js';
  document.addEventListener('DOMContentLoaded', () => {
    const block = document.querySelector('.block-name.block');
    if (block) {
      decorate(block);
    }
  });
</script>
```

### Development Workflow

1. **Start with test.html**: Create isolated test environment
2. **Develop incrementally**: Make small changes and test frequently
3. **Use browser dev tools**: Monitor network requests and console output
4. **Test responsive design**: Use browser responsive mode
5. **Validate accessibility**: Test with screen readers and keyboard navigation

## Conclusion

This development server provides a lightweight, efficient environment specifically designed to improve AI assistant workflows when testing EDS blocks and components. Its local-first approach with proxy fallback ensures AI assistants can develop in isolation while still accessing remote dependencies when needed.

The server's simplicity aligns with EDS principles of minimal tooling and maximum performance, while its clear logging and immediate feedback mechanisms make it an ideal development companion for AI assistants building high-quality, performant web components. The comprehensive error reporting and consistent patterns enable AI assistants to work more effectively and produce reliable results.
