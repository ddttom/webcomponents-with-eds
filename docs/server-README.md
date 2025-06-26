# Development Server Documentation

> **📋 Style Guide**: For CSS naming conventions and standards, see the [CSS Naming Convention Style Guide](style-guide.md)

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

## Build vs Blocks Directory Decision Guide

> **📋 Architecture Reference**: For comprehensive details on the dual-directory architecture, see [build_blocks_clarification.md](for-ai/build_blocks_clarification.md).

### Component Complexity Assessment

Before creating a new component, assess its complexity to choose the appropriate development approach:

#### **Simple Components** → Direct `/blocks/` Development
**Use When:**
- ✅ Pure JavaScript/CSS (no external dependencies)
- ✅ Simple state management or no state
- ✅ Standard EDS patterns sufficient
- ✅ No build process needed

**Examples:** Basic cards, simple forms, text blocks, static content

```bash
# Simple component workflow
blocks/simple-card/
├── simple-card.js      # Direct development
├── simple-card.css     # Direct development  
├── test.html           # EDS testing
└── README.md
```

#### **Complex Components** → `/build/` Development → `/blocks/` Deployment
**Use When:**
- ✅ External dependencies (libraries, frameworks)
- ✅ Build process required (bundling, transpilation)
- ✅ Advanced state management
- ✅ Complex interactions or animations
- ✅ Design system integration (Shoelace, Material, etc.)

**Examples:** Data visualization, rich UI components, external library integrations

```bash
# Complex component workflow
build/complex-card/          # Development workspace
├── index.html              # Development testing
├── package.json            # Dependencies & build scripts
├── vite.config.js          # Build configuration
├── complex-card.js         # Source code
└── complex-card.css        # Source styles

# After npm run deploy:
blocks/complex-card/         # Production deployment
├── test.html               # EDS testing
├── complex-card.js         # Bundled output
├── complex-card.css        # Stub CSS (styles bundled in JS)
└── README.md               # User documentation
```

### **Decision Flowchart**

```
New Component → Complexity Assessment
                       ↓
              Does it need external libraries?
                    ↙        ↘
                   Yes        No
                    ↓         ↓
               /build/    More than 5
               approach  interactive elements?
                           ↙        ↘
                          Yes        No
                           ↓         ↓
                      /build/   /blocks/
                      approach  approach
```

### **Development Workflow Selection**

```bash
# Simple Component Workflow
1. Create in blocks/component-name/
2. Develop directly (component-name.js, component-name.css)
3. Test with: npm run debug → localhost:3000/blocks/component-name/test.html
4. Deploy: Copy to your EDS project directly

# Complex Component Workflow  
1. Create in build/component-name/
2. Develop with modern tooling (npm run dev → localhost:5174)
3. Build & bundle: npm run deploy
4. Test EDS compatibility: npm run debug → localhost:3000/blocks/component-name/test.html
5. Deploy: Copy blocks/component-name/ to your EDS project
```

## HTML File Naming in EDS Testing

### `test.html` vs `index.html` Distinction

**Important**: The EDS development server uses `test.html` files, not `index.html`. This is an intentional architectural decision, not an inconsistency.

#### File Purpose Distinction

| File         | Environment        | Auto-loaded | Purpose                |
| ------------ | ------------------ | ----------- | ---------------------- |
| `index.html` | Development (Vite) | ✅ Yes       | Build tool integration |
| `test.html`  | EDS Testing        | ❌ No        | Manual EDS testing     |

#### Why `test.html` for EDS?

1. **Explicit naming** prevents conflicts with development servers that auto-serve `index.html`
2. **Multiple test files** can exist (test.html, test-advanced.html, test-error.html)
3. **Clear purpose** - specifically for EDS environment testing
4. **No auto-discovery** - must be explicitly accessed, preventing accidental loading
5. **Tool separation** - development tools use `index.html`, EDS testing uses `test.html`

### Access Patterns

```bash
# Development (Vite auto-loads index.html)
cd build/my-component
npm run dev
# Automatically opens: http://localhost:5174/ (serves index.html)

# EDS Testing (explicit test.html request)  
npm run debug
# Manually navigate to: http://localhost:3000/blocks/my-component/test.html
```

### Creating EDS Test Files

When creating test files for EDS components:

1. **Always name them `test.html`** (not `index.html`)
2. **Use explicit paths** when referencing in documentation
3. **Include multiple test scenarios** if needed:
   ```
   blocks/my-component/
   ├── test.html              # Basic functionality
   ├── test-error.html        # Error handling
   └── test-advanced.html     # Complex scenarios
   ```

### Common Mistakes to Avoid

❌ **Wrong**: Expecting `index.html` to work with EDS server
❌ **Wrong**: Assuming file naming is inconsistent
❌ **Wrong**: Using development URLs for EDS testing

✅ **Correct**: Understanding the different purposes of each file type
✅ **Correct**: Using appropriate file names for each environment
✅ **Correct**: Explicit URLs for EDS testing

This separation ensures that development tools work smoothly while providing clear, explicit testing for the EDS environment.

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
├── build/                 # Complex component development
│   └── component-name/
│       ├── index.html     # Development testing
│       ├── package.json   # Dependencies & build scripts
│       └── component-name.js
└── blocks/                # EDS blocks (simple + deployed complex)
    └── block-name/
        ├── test.html       # EDS testing files
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

### Request Logging

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

## Best Practices

### **Component Architecture Decision Making**

> **📋 Detailed Guide**: See [build_blocks_clarification.md](for-ai/build_blocks_clarification.md) for complete architecture explanation.

#### **When to Use `/build/` Approach**
```bash
# Complex components need modern tooling
cd build/shoelace-card
npm install          # Install dependencies
npm run dev         # Hot reload development
npm run deploy      # Bundle and deploy to blocks/
```

#### **When to Use `/blocks/` Approach**
```bash
# Simple components work directly
cd blocks/simple-card
# Edit .js and .css files directly
# Test immediately with npm run debug
```

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

3. **Testing Verification**:
   - Block appears correctly on page
   - JavaScript executes without errors
   - CSS applies properly
   - Interactive elements function as expected
   - **EDS structure is identical to production expectations**

### **Performance Optimization**

#### **Server-Level Optimizations**
- Zero external dependencies for maximum speed
- Built-in Node.js modules only
- Minimal memory footprint
- Efficient proxy caching

#### **Development Workflow Optimizations**
- **Hot reload** for rapid iteration (build/ directories)
- **Immediate testing** for quick validation (blocks/ directories)
- **Smart proxying** for external resource access
- **Clear logging** for debugging efficiency

### **Security Considerations**

#### **Development Only Usage**
- No authentication required (development environment)
- Permissive CORS headers for testing
- No rate limiting (local development)
- Detailed error logging enabled

#### **Safe File Serving**
- Project directory restriction only
- No directory traversal vulnerabilities
- Proper MIME type detection
- Graceful error handling

### **Troubleshooting Guide**

#### **Common Development Issues**

**Port conflicts:**
```bash
# Check what's using port 3000
lsof -i :3000

# Kill conflicting processes
pkill -f "node server.js"
```

**File not found errors:**
- Verify file paths are relative to project root
- Check file permissions and accessibility
- Ensure correct file naming (`test.html` for EDS)
- Monitor server logs for detailed error information

**Build vs Blocks confusion:**
- Use `index.html` in `/build/` directories
- Use `test.html` in `/blocks/` directories
- Match environment to file type
- Reference [build_blocks_clarification.md](for-ai/build_blocks_clarification.md) for guidance

**EDS structure issues:**
- Ensure `.block` class usage
- Check data attributes are present
- Verify nested div wrapper structure
- Use semantic HTML elements for content

## Integration with Build Process

### **Automated Component Deployment**

For components developed in `/build/` directories:

```bash
# Development cycle
cd build/my-component
npm run dev              # Development with hot reload
npm run deploy          # Build and copy to blocks/

# Testing cycle  
cd ../../               # Return to project root
npm run debug          # Start EDS testing server
# Test at: http://localhost:3000/blocks/my-component/test.html
```

### **Manual Component Development**

For simple components in `/blocks/` directories:

```bash
# Direct development
cd blocks/my-component
# Edit .js, .css files directly
npm run debug          # Test immediately
# Test at: http://localhost:3000/blocks/my-component/test.html
```

### **CI/CD Integration**

```bash
# Validate all components
npm run validate       # Check code quality
npm run security      # Security audit
npm run debug         # Test server functionality
```

## Conclusion

This development server provides a simple, effective way to test EDS blocks locally while maintaining compatibility with the EDS architecture. Its local-first approach with proxy fallback ensures AI assistants can develop in isolation while still accessing remote dependencies when needed.

The server's simplicity aligns with EDS principles of minimal tooling and maximum performance, while its clear logging and immediate feedback mechanisms make it an ideal development companion for AI assistants building high-quality, performant web components. The comprehensive error reporting and consistent patterns enable AI assistants to work more effectively and produce reliable results.

### **Key Benefits for AI-Assisted Development**

- **Unified Environment**: AI sees code, content, and data in one place
- **Immediate Feedback**: Save and refresh for instant results
- **Complete Context**: No system switching required for development
- **Flexible Architecture**: Support for both simple and complex components
- **Clear Documentation**: Comprehensive guides for all development scenarios

> **📋 Next Steps**: For advanced component architecture decisions, consult [build_blocks_clarification.md](for-ai/build_blocks_clarification.md) for complete guidance on the dual-directory development system.