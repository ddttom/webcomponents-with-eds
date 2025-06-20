# Block Debugging Guide for AI Assistants

This guide provides step-by-step instructions for AI assistants to debug and test EDS (Edge Delivery Services) blocks using the local development server designed to improve AI assistant workflows.

## Overview

The project includes a local development server (`server.js`) that significantly improves AI assistant effectiveness by enabling testing blocks in isolation while maintaining EDS compatibility. This guide explains how to create test files and debug blocks efficiently.

## Prerequisites

- Node.js installed
- Project server running via `npm run debug`
- Understanding of EDS block structure

## Quick Start

1. **Start the development server:**

   ```bash
   npm run debug
   ```

   Server runs at: `http://localhost:3000`

2. **Create a test file in your block directory:**

   ```bash
   blocks/your-block-name/test.html
   ```

3. **Access your test:**

   ```bash
   http://localhost:3000/blocks/your-block-name/test.html
   ```

## EDS Block Structure

EDS blocks follow a specific structure that must be replicated exactly in test files:

```bash
blocks/block-name/
├── block-name.js          # Block JavaScript (ES module)
├── block-name.css         # Block styles
├── README.md              # Documentation
└── test.html              # Test file (MUST replicate EDS structure)
```

**CRITICAL**: Test files must use the exact same block structure as EDS. The purpose of test files is to replicate the EDS environment locally - there is no alternative structure.

## Creating test.html Files

### Basic Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block Name Test</title>
    <!-- Link to block CSS -->
    <link rel="stylesheet" href="block-name.css">
    <style>
        /* Optional: Add test-specific styles */
        body {
            font-family: Arial, sans-serif;
            padding: 2rem;
            background: #f5f5f5;
        }
        .test-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="test-container">
        <h1>Block Name Test</h1>
        
        <!-- EDS Block Structure (Exact Replication) -->
        <div class="block-name block" data-block-name="block-name" data-block-status="initialized">
            <div>
                <div>
                    <p>Your test content here</p>
                </div>
            </div>
        </div>
        
        <!-- Test Controls (Optional) -->
        <div class="test-controls">
            <button onclick="location.reload()">Reload Test</button>
        </div>
    </div>

    <!-- Block Initialization Script -->
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

### EDS Block Structure Requirements

**CRITICAL:** Block structure must exactly replicate EDS processing:

- Block container: `.block-name.block` with `data-block-name="block-name"` and `data-block-status="initialized"`
- Content wrapper: Nested `<div><div>content</div></div>` structure
- Content elements: Use semantic HTML (`<p>`, `<h2>`, `<a>`, etc.)
- JavaScript selector: Target `.block-name.block` (not `.block-name-block`)

### Content Structure

EDS blocks expect specific HTML structure. Common patterns:

#### Simple Content Block

```html
<div class="my-block block" data-block-name="my-block" data-block-status="initialized">
    <div>
        <div>
            <p>Single piece of content</p>
        </div>
    </div>
</div>
```

#### Multi-Column Block

```html
<div class="my-block block" data-block-name="my-block" data-block-status="initialized">
    <div>
        <div>
            <p>Column 1 content</p>
        </div>
        <div>
            <p>Column 2 content</p>
        </div>
        <div>
            <p>Column 3 content</p>
        </div>
    </div>
</div>
```

#### Table-Based Block

```html
<div class="my-block block" data-block-name="my-block" data-block-status="initialized">
    <div>
        <div>
            <p>Header 1</p>
        </div>
        <div>
            <p>Header 2</p>
        </div>
    </div>
    <div>
        <div>
            <p>Row 1, Col 1</p>
        </div>
        <div>
            <p>Row 1, Col 2</p>
        </div>
    </div>
    <div>
        <div>
            <p>Row 2, Col 1</p>
        </div>
        <div>
            <p>Row 2, Col 2</p>
        </div>
    </div>
</div>
```

## Testing Workflow for AI Assistants

### Step 1: Analyze the Block

Before creating tests, examine:

- Block JavaScript (`block-name.js`)
- Block CSS (`block-name.css`)
- README.md for usage instructions
- Example files if available

### Step 2: Create Test File

1. **Create `test.html` in the block directory**
2. **Use the basic template above**
3. **Customize the content structure** based on block requirements
4. **Add test-specific content** that exercises block functionality

### Step 3: Start Development Server

```bash
npm run debug
```

Monitor terminal output for:

- Server startup confirmation
- File serving logs
- Error messages

### Step 4: Access and Test

1. **Navigate to:** `http://localhost:3000/blocks/block-name/test.html`
2. **Open browser developer tools**
3. **Check for:**
   - JavaScript errors in console
   - Network requests for assets
   - CSS loading issues
   - Block functionality

### Step 5: Debug Issues

Common debugging steps:

#### JavaScript Errors

- Check console for error messages
- Verify ES module imports
- Ensure block function is exported correctly
- Check for missing dependencies

#### CSS Issues

- Verify CSS file loads (Network tab)
- Check for CSS syntax errors
- Ensure proper class naming
- Test responsive behavior

#### Block Not Initializing

- Verify block container has correct class name
- Check if `decorate` function is called
- Ensure DOM is ready before initialization
- Verify block structure matches expectations

## Advanced Testing Scenarios

### Testing with Multiple Instances

```html
<div class="my-block block" data-block-name="my-block" data-block-status="initialized">
    <div>
        <div>
            <p>Instance 1 content</p>
        </div>
    </div>
</div>

<div class="my-block block" data-block-name="my-block" data-block-status="initialized">
    <div>
        <div>
            <p>Instance 2 content</p>
        </div>
    </div>
</div>

<script type="module">
    import decorate from './my-block.js';
    
    document.addEventListener('DOMContentLoaded', () => {
        const blocks = document.querySelectorAll('.my-block.block');
        blocks.forEach(block => decorate(block));
    });
</script>
```

### Testing with Dynamic Content

```html
<div class="test-controls">
    <button onclick="addContent()">Add Content</button>
    <button onclick="removeContent()">Remove Content</button>
</div>

<div class="my-block block" data-block-name="my-block" data-block-status="initialized" id="test-block">
    <div>
        <div>
            <p>Initial content</p>
        </div>
    </div>
</div>

<script type="module">
    import decorate from './my-block.js';
    
    let contentCount = 1;
    
    window.addContent = function() {
        const block = document.getElementById('test-block');
        const newRow = document.createElement('div');
        newRow.innerHTML = `<div>Dynamic content ${++contentCount}</div>`;
        block.appendChild(newRow);
        
        // Re-decorate if needed
        decorate(block);
    };
    
    window.removeContent = function() {
        const block = document.getElementById('test-block');
        const rows = block.children;
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
        }
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        const block = document.getElementById('test-block');
        decorate(block);
    });
</script>
```

### Testing with External Dependencies

```html
<!-- Include external libraries if block requires them -->
<script src="https://cdn.jsdelivr.net/npm/library@version/dist/library.min.js"></script>

<div class="my-block block" data-block-name="my-block" data-block-status="initialized">
    <div><div>Content requiring external library</div></div>
</div>
```

## Server Behavior

### Local File Priority

- Server serves local files first
- Falls back to proxy (`https://allabout.network`) for missing files
- Enables testing with real remote assets

### MIME Type Support

- `.html` → `text/html`
- `.js` → `application/javascript`
- `.css` → `text/css`
- `.json` → `application/json`
- Images, fonts, and other assets supported

### CORS Headers

- Permissive CORS for development
- No caching for immediate updates

## Debugging Checklist

### Before Testing

- [ ] Block files exist (`.js`, `.css`)
- [ ] Server is running (`npm run debug`)
- [ ] Test file created in correct location
- [ ] Block structure follows EDS conventions

### During Testing

- [ ] Check browser console for errors
- [ ] Verify network requests succeed
- [ ] Test responsive behavior
- [ ] Validate accessibility features
- [ ] Test all interactive elements

### Common Issues

#### Block Not Appearing

1. Check CSS class names match EDS convention
2. Verify CSS file loads correctly
3. Ensure block container exists in DOM
4. Check for JavaScript errors preventing rendering

#### JavaScript Module Errors

1. Verify ES module syntax
2. Check import/export statements
3. Ensure all dependencies are available
4. Validate function calls and variable references

#### Styling Issues

1. Check CSS file path in `<link>` tag
2. Verify CSS selectors match HTML structure
3. Test for CSS conflicts with global styles
4. Check responsive breakpoints

#### Server Issues

1. Restart server if files aren't updating
2. Check terminal for error messages
3. Verify file paths are correct
4. Clear browser cache if needed

## Example: Complete Test File

Here's a complete example for a hypothetical "card" block:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Block Test</title>
    <link rel="stylesheet" href="card.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 2rem;
            background: #f5f5f5;
        }
        .test-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .test-section {
            margin: 2rem 0;
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="test-container">
        <h1>Card Block Test</h1>
        
        <div class="test-section">
            <h2>Single Card</h2>
            <div class="card block" data-block-name="card" data-block-status="initialized">
                <div>
                    <div>
                        <h3>Card Title</h3>
                        <p>Card description text goes here.</p>
                        <p><a href="#test">Learn More</a></p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="test-section">
            <h2>Multiple Cards</h2>
            <div class="card block" data-block-name="card" data-block-status="initialized">
                <div>
                    <div>
                        <h3>Card 1 Title</h3>
                        <p>First card description.</p>
                        <p><a href="#test1">Link 1</a></p>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Card 2 Title</h3>
                        <p>Second card description.</p>
                        <p><a href="#test2">Link 2</a></p>
                    </div>
                </div>
                <div>
                    <div>
                        <h3>Card 3 Title</h3>
                        <p>Third card description.</p>
                        <p><a href="#test3">Link 3</a></p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="test-controls">
            <button onclick="location.reload()">Reload Test</button>
            <button onclick="toggleTheme()">Toggle Theme</button>
        </div>
    </div>

    <script type="module">
        import decorate from './card.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const blocks = document.querySelectorAll('.card.block');
            blocks.forEach(block => decorate(block));
        });
        
        window.toggleTheme = function() {
            document.body.style.background = 
                document.body.style.background === 'rgb(51, 51, 51)' ? '#f5f5f5' : '#333';
        };
    </script>
</body>
</html>
```

## Best Practices for AI Assistants

1. **Always create test files** when debugging blocks
2. **Follow EDS naming conventions** exactly
3. **Test multiple scenarios** (single/multiple instances, different content)
4. **Check browser console** for errors
5. **Verify responsive behavior** using browser dev tools
6. **Test accessibility** with keyboard navigation
7. **Document test cases** in comments
8. **Use meaningful test content** that exercises block features

## Troubleshooting Server Issues

### Server Won't Start

```bash
# Check if port is in use
lsof -i :3000

# Kill existing process
pkill -f "node server.js"

# Restart server
npm run debug
```

### Files Not Loading

- Verify file paths relative to project root
- Check file permissions
- Monitor server logs for detailed errors
- Clear browser cache

### Proxy Not Working

- Check internet connection
- Verify proxy URL in server configuration
- Review network logs in browser dev tools

This guide provides comprehensive instructions for AI assistants to effectively debug and test EDS blocks using the local development server designed to improve AI assistant workflows. The server's local-first approach with proxy fallback enables AI assistants to work more efficiently by providing immediate feedback, clear error reporting, and consistent testing patterns. Follow these established patterns for reliable, efficient EDS development that leverages the server's AI assistant-focused design.
