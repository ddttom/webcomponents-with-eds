# EDS Block Debugging Guide
## Comprehensive Troubleshooting for Edge Delivery Services

This guide provides systematic approaches to debug and troubleshoot EDS blocks, covering everything from basic setup issues to complex integration problems.

## 🚀 Quick Reference

### Common Problems → Quick Solutions

| Problem                     | Quick Fix                                    | Section                                       |
| --------------------------- | -------------------------------------------- | --------------------------------------------- |
| Block not loading           | Check file naming matches class name exactly | [File Naming](#file-naming-issues)            |
| Content not displaying      | Verify EDS block structure in test file      | [Block Structure](#block-structure-issues)    |
| Styles not applying         | Check CSS class naming conventions           | [Styling Issues](#styling-and-css-issues)     |
| JavaScript errors           | Use browser DevTools + EDS debug server      | [JavaScript Debugging](#javascript-debugging) |
| Build component not working | Check dual-directory deployment process      | [Build Issues](#build-component-issues)       |
| Proxy/network failures      | Verify server.js proxy configuration         | [Network Issues](#network-and-proxy-issues)   |

### Debugging Decision Tree

```
Issue Detected
├── Block doesn't load at all → File Naming/Structure Issues
├── Block loads but no content → Content Extraction Issues  
├── Content shows but no styling → CSS/Naming Issues
├── Partial functionality → JavaScript/Logic Issues
├── Performance problems → Performance Debugging
└── Build/deployment issues → Build Process Issues
```

### Essential Commands

```bash
# Start EDS debug server
npm run debug

# Test specific block
http://localhost:3000/blocks/your-block/test.html

# Check file replacement status
git status

# Restore original files after debugging
git restore scripts/aem.js scripts/scripts.js
```

## 🏗️ Foundation Concepts

### EDS Dynamic Loading Constraint

**Critical Understanding**: EDS automatically generates file paths from HTML class names with zero flexibility.

```javascript
// This is hardcoded in scripts/aem.js - you cannot change it
const mod = await import(`${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.js`);
```

**Implications:**
- HTML: `<div class="my-component">` → MUST have `/blocks/my-component/my-component.js`
- No aliases, redirects, or alternative paths possible
- File replacement is the only way to test alternative implementations

### Served vs Rendered HTML States

EDS transforms HTML in two phases - understanding both is crucial for debugging:

#### Served HTML (What CMS Delivers)
```html
<div class="highlight-text">
  **Important** content here
</div>
```

#### Rendered HTML (What Your decorate() Function Receives)
```html
<div class="highlight-text block" data-block-name="highlight-text" data-block-status="initialized">
  <div>
    <div>**Important** content here</div>
  </div>
</div>
```

**Debugging Impact:**
- Content extraction must handle nested `<div><div>` structure
- EDS attributes (`data-block-name`, `data-block-status`) are already present
- Use `block.querySelector('div div')` pattern for content access

### Two Test Files Pattern

Complex blocks may include both test files for comprehensive validation:

```
/blocks/my-component/
├── test.html              # 🎯 Standard: Tests rendered HTML
└── test2.html             # 📄 Advanced: Tests served HTML edge cases
```

**When to Use:**
- **`test.html`**: Standard testing (95% of cases)
- **`test2.html`**: Edge case testing, CMS output validation, transformation debugging

## 🛠️ Debugging Strategies

### Strategy 1: Browser DevTools + EDS Server

**Best for**: JavaScript errors, styling issues, content problems

```bash
# 1. Start EDS debug server
npm run debug

# 2. Open in browser with DevTools
http://localhost:3000/blocks/your-block/test.html

# 3. Check Console, Network, Elements tabs
```

**Pro Tips:**
- Use Console to test `decorate` function directly
- Network tab shows proxy requests to production
- Elements tab reveals EDS-generated structure

### Strategy 2: File Replacement Testing

**Best for**: Testing modified implementations, instrumentation, complex debugging

```bash
# 1. Backup original
cp blocks/my-component/my-component.js blocks/my-component/my-component-backup.js

# 2. Replace with debug version
cp blocks/my-component/my-component-debug.js blocks/my-component/my-component.js

# 3. Test changes
http://localhost:3000/blocks/my-component/test.html

# 4. Restore original (CRITICAL)
git restore blocks/my-component/my-component.js
```

**Safety Script:**
```bash
#!/bin/bash
# debug-replace.sh
COMPONENT=$1
BACKUP_FILE="blocks/$COMPONENT/$COMPONENT-backup.js"
ORIGINAL_FILE="blocks/$COMPONENT/$COMPONENT.js"
DEBUG_FILE="blocks/$COMPONENT/$COMPONENT-debug.js"

if [ ! -f "$DEBUG_FILE" ]; then
  echo "❌ Debug file not found: $DEBUG_FILE"
  exit 1
fi

echo "🔄 Creating backup and replacing file..."
cp "$ORIGINAL_FILE" "$BACKUP_FILE"
cp "$DEBUG_FILE" "$ORIGINAL_FILE"
echo "✅ Replacement complete. Test your changes."
echo "⚠️  Run 'git restore $ORIGINAL_FILE' when done"
```

### Strategy 3: EDS Core Scripts Instrumentation

**Best for**: Deep EDS processing issues, timing problems, block lifecycle debugging

**IMPORTANT**: Only add temporary debug statements - never modify behavior

```javascript
// ✅ ALLOWED: Add to scripts/aem.js temporarily
export function decorateBlock(block) {
  console.log('[DEBUG-EDS] decorateBlock called for:', block.className);
  console.log('[DEBUG-EDS] Block dataset:', block.dataset);
  
  const shortBlockName = block.classList[0];
  // ... original EDS code continues unchanged
}
```

**Cleanup Process:**
```bash
# Always restore original files after debugging
git restore scripts/aem.js scripts/scripts.js scripts/delayed.js
```

## 🐛 Common Issues & Solutions

### File Naming Issues

#### Problem: Block Not Loading
```
Error: Failed to import module for my-component
```

**Diagnosis:**
```bash
# Check file structure
ls -la blocks/my-component/
# Must see: my-component.js, my-component.css

# Check HTML class name
grep "class.*my-component" blocks/my-component/test.html
```

**Solution:**
- Ensure file name exactly matches HTML class name
- Verify case sensitivity (Linux/Mac are case-sensitive)
- Check for typos or special characters

#### Problem: CSS Not Loading
```
# Network tab shows 404 for CSS file
```

**Solution:**
```bash
# Verify CSS file exists and is named correctly
ls blocks/my-component/my-component.css

# Check CSS content is valid
css-validator blocks/my-component/my-component.css
```

### Block Structure Issues

#### Problem: Content Not Extracting Correctly
```javascript
// This fails because it assumes flat structure
const content = block.textContent.trim();
```

**Solution:**
```javascript
// ✅ Handle EDS nested structure
function extractContent(block) {
  // Strategy 1: EDS nested structure
  const nestedDiv = block.querySelector('div div');
  if (nestedDiv?.textContent?.trim()) {
    return nestedDiv.textContent.trim();
  }
  
  // Strategy 2: Direct content fallback
  const directText = block.textContent?.trim();
  if (directText) {
    return directText;
  }
  
  // Strategy 3: Data attributes
  return block.dataset.content || '';
}
```

#### Problem: Test File Structure Incorrect

**Diagnosis:**
```html
<!-- ❌ WRONG: Missing EDS attributes -->
<div class="my-component">Content</div>

<!-- ❌ WRONG: Missing nested structure -->
<div class="my-component block" data-block-name="my-component">
  Content
</div>
```

**Solution:**
```html
<!-- ✅ CORRECT: Exact EDS structure -->
<div class="my-component block" data-block-name="my-component" data-block-status="initialized">
  <div>
    <div>Content goes here</div>
  </div>
</div>
```

### Styling and CSS Issues

#### Problem: CSS Classes Not Following Conventions

**Common Mistakes:**
```css
/* ❌ Wrong selector patterns */
.my-component-block { }        /* Should be .my-component.block */
.mycomponent { }               /* Should use hyphens */
.my_component { }              /* Should use hyphens, not underscores */
```

**Solution:**
```css
/* ✅ Correct EDS patterns */
.my-component.block { }        /* JavaScript selector */
.my-component { }              /* Base block styling */
.my-component-container { }    /* Structural wrapper (don't style) */
.my-component-wrapper { }      /* Layout container */
.my-component-element { }      /* Component parts */
.my-component-element-state { } /* State modifiers */
```

#### Problem: Styles Not Applying After DOM Replacement

**Diagnosis:**
```javascript
// Check if EDS attributes were preserved
console.log('Block status:', block.getAttribute('data-block-status'));
console.log('Block name:', block.getAttribute('data-block-name'));
```

**Solution:**
```javascript
export default async function decorate(block) {
  // Preserve EDS attributes BEFORE DOM changes
  const blockStatus = block.getAttribute('data-block-status');
  const blockName = block.getAttribute('data-block-name');
  const blockClasses = Array.from(block.classList);
  
  // Your DOM manipulation
  block.innerHTML = '';
  block.appendChild(newContent);
  
  // Restore EDS attributes
  if (blockStatus) block.setAttribute('data-block-status', blockStatus);
  if (blockName) block.setAttribute('data-block-name', blockName);
  blockClasses.forEach(cls => block.classList.add(cls));
}
```

### JavaScript Debugging

#### Problem: decorate Function Not Running

**Diagnosis Steps:**
```javascript
// 1. Add basic logging
export default function decorate(block) {
  console.log('[DEBUG] Decorate function called for:', block.className);
  console.log('[DEBUG] Block content:', block.innerHTML);
  
  // Your code here
}

// 2. Check in browser console
// Should see logs when block loads
```

**Common Causes:**
- JavaScript syntax errors (check browser console)
- File not found (check Network tab)
- EDS not recognizing block structure

#### Problem: Async Operations Failing

**Common Pattern:**
```javascript
// ❌ Problematic: No error handling
export default async function decorate(block) {
  const data = await fetch('/api/data.json');
  const result = await data.json();
  // What if fetch fails?
}
```

**Solution:**
```javascript
// ✅ Robust error handling
export default async function decorate(block) {
  try {
    const response = await fetch('/api/data.json', {
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    // Process data
    
  } catch (error) {
    console.error('[my-component] Enhancement failed:', error);
    
    // Show fallback content
    block.innerHTML = '<p>Content temporarily unavailable.</p>';
  }
}
```

### Build Component Issues

#### Problem: Vite Build Failing

**Diagnosis:**
```bash
cd build/my-component
npm run build

# Check for errors in output
# Common issues: missing dependencies, import errors
```

**Common Solutions:**
```bash
# 1. Check dependencies
npm install

# 2. Verify imports are correct
grep -r "import.*from" *.js

# 3. Check vite.config.js
cat vite.config.js
```

#### Problem: Deploy Process Not Working

**Diagnosis:**
```bash
cd build/my-component
npm run deploy

# Check if files were created
ls -la ../../blocks/my-component/
```

**Solution:**
```javascript
// Verify deploy.js script exists and is executable
if (!existsSync(join(DIST_DIR, `${COMPONENT_NAME}.js`))) {
  throw new Error(`Built file not found: ${COMPONENT_NAME}.js`);
}
```

### Network and Proxy Issues

#### Problem: Assets Not Loading from Production

**Diagnosis:**
```bash
# Check server logs for proxy requests
npm run debug
# Look for proxy success/failure messages in terminal
```

**Common Issues:**
- Incorrect production URL in proxy config
- CORS issues with production server
- Network connectivity problems

**Solution:**
```javascript
// In vite.config.js - verify proxy configuration
proxy: {
  '/slides': {
    target: 'https://your-production-site.com',  // Correct URL?
    changeOrigin: true,
    secure: true,
    configure: (proxy, options) => {
      proxy.on('error', (err, req, res) => {
        console.log('Proxy error:', err);
      });
    }
  }
}
```

## 🔬 Advanced Debugging Scenarios

### Shadow DOM Visibility Issues

**Problem**: Component loads successfully but content is invisible

**Symptoms:**
```
✅ Console logs show successful processing
✅ Network requests complete successfully  
❌ Screen shows blank/white content
🔍 MutationObserver timing errors
```

**Root Cause**: Shadow DOM isolation prevents EDS styling from reaching component content

**Investigation Steps:**

1. **Check DOM structure:**
```javascript
console.log('Block after decoration:', block.innerHTML);
console.log('Block computed style:', window.getComputedStyle(block));
```

2. **Verify EDS attributes:**
```javascript
console.log('data-block-status:', block.getAttribute('data-block-status'));
console.log('data-block-name:', block.getAttribute('data-block-name'));
```

3. **Test with minimal component:**
```javascript
// Replace complex component with simple test
export default function decorate(block) {
  block.innerHTML = '<p style="color: red;">TEST VISIBLE</p>';
}
```

**Solution:**
```javascript
export default async function decorate(block) {
  try {
    // Preserve EDS attributes before any DOM changes
    const blockStatus = block.getAttribute('data-block-status');
    const blockName = block.getAttribute('data-block-name');
    
    // Build complete structure in memory first
    const newContent = await buildCompleteStructure();
    
    // Atomic replacement
    block.innerHTML = '';
    block.appendChild(newContent);
    
    // Restore EDS attributes for visibility
    if (blockStatus) block.setAttribute('data-block-status', blockStatus);
    if (blockName) block.setAttribute('data-block-name', blockName);
    
    // Ensure EDS visibility classes
    if (!document.body.classList.contains('appear')) {
      document.body.classList.add('appear');
    }
    
  } catch (error) {
    console.error('[component] Enhancement failed:', error);
    // Original content remains if enhancement fails
  }
}
```

### Performance Debugging

#### Memory Leak Detection

**Problem**: Browser becomes slow/unresponsive over time

**Diagnosis:**
```javascript
// Add memory monitoring
export default function decorate(block) {
  const startMemory = performance.memory?.usedJSHeapSize || 0;
  
  // Your component logic
  
  const endMemory = performance.memory?.usedJSHeapSize || 0;
  console.log('[MEMORY] Heap size change:', endMemory - startMemory, 'bytes');
  
  // Store cleanup function
  block._cleanup = () => {
    // Remove event listeners
    // Clear intervals/timeouts
    // Remove DOM references
  };
}
```

#### Bundle Size Analysis

**Problem**: Complex components loading slowly

**Tools:**
```bash
cd build/my-component
npm run build

# Check bundle size
ls -lh dist/

# Analyze bundle composition
npx vite-bundle-analyzer dist/
```

### Race Condition Debugging

**Problem**: Component sometimes works, sometimes doesn't

**Diagnosis:**
```javascript
export default async function decorate(block) {
  // Check if called multiple times
  if (block._decorating) {
    console.warn('[RACE] Decoration already in progress');
    return;
  }
  
  block._decorating = true;
  
  try {
    // Component logic
  } finally {
    block._decorating = false;
  }
}
```

## 🧰 Debugging Tools & Automation

### Custom Debug Scripts

#### Component Test Script
```javascript
// debug-component.js
window.debugComponent = function(componentName) {
  const block = document.querySelector(`.${componentName}.block`);
  
  if (!block) {
    console.error(`❌ Component not found: ${componentName}`);
    return;
  }
  
  console.group(`🔍 Debug: ${componentName}`);
  console.log('Block element:', block);
  console.log('Block attributes:', Object.fromEntries(
    Array.from(block.attributes).map(attr => [attr.name, attr.value])
  ));
  console.log('Block classes:', Array.from(block.classList));
  console.log('Block content:', block.innerHTML);
  console.log('Computed style:', window.getComputedStyle(block));
  console.groupEnd();
};

// Usage: debugComponent('my-component')
```

#### Network Debug Helper
```javascript
// debug-network.js
window.debugNetwork = function() {
  const originalFetch = window.fetch;
  
  window.fetch = function(url, options) {
    console.log(`🌐 FETCH: ${url}`, options);
    
    return originalFetch(url, options)
      .then(response => {
        console.log(`✅ FETCH SUCCESS: ${url}`, response.status);
        return response;
      })
      .catch(error => {
        console.error(`❌ FETCH ERROR: ${url}`, error);
        throw error;
      });
  };
  
  console.log('🔍 Network debugging enabled');
};
```

### Automated Testing Scripts

#### Block Validation Script
```bash
#!/bin/bash
# validate-block.sh

COMPONENT=$1
BLOCK_DIR="blocks/$COMPONENT"

echo "🔍 Validating block: $COMPONENT"

# Check required files exist
if [ ! -f "$BLOCK_DIR/$COMPONENT.js" ]; then
  echo "❌ Missing JavaScript file: $BLOCK_DIR/$COMPONENT.js"
  exit 1
fi

if [ ! -f "$BLOCK_DIR/$COMPONENT.css" ]; then
  echo "❌ Missing CSS file: $BLOCK_DIR/$COMPONENT.css"
  exit 1
fi

if [ ! -f "$BLOCK_DIR/test.html" ]; then
  echo "❌ Missing test file: $BLOCK_DIR/test.html"
  exit 1
fi

# Check test file structure
if ! grep -q "data-block-name=\"$COMPONENT\"" "$BLOCK_DIR/test.html"; then
  echo "❌ Test file missing required data-block-name attribute"
  exit 1
fi

echo "✅ Block validation passed"
```

### Browser Debugging Setup

#### Console Helpers
```javascript
// Add to test.html for enhanced debugging
<script>
// Global debug helpers
window.EDS_DEBUG = {
  // Log all block decorations
  logDecorations: true,
  
  // Override console for better formatting
  log: function(message, data) {
    console.log(`[EDS-DEBUG] ${message}`, data || '');
  },
  
  // DOM inspection helper
  inspectBlock: function(selector) {
    const block = document.querySelector(selector);
    return {
      element: block,
      attributes: block ? Object.fromEntries(
        Array.from(block.attributes).map(a => [a.name, a.value])
      ) : null,
      content: block?.innerHTML,
      computed: block ? window.getComputedStyle(block) : null
    };
  },
  
  // Performance monitoring
  startTimer: function(name) {
    console.time(`[EDS-PERF] ${name}`);
  },
  
  endTimer: function(name) {
    console.timeEnd(`[EDS-PERF] ${name}`);
  }
};

// Auto-enable debugging in development
if (window.location.hostname === 'localhost') {
  window.EDS_DEBUG.enabled = true;
  console.log('🔧 EDS debugging enabled');
}
</script>
```

## 📋 Debugging Checklists

### Pre-Development Checklist
- [ ] EDS debug server running (`npm run debug`)
- [ ] Browser DevTools open and configured
- [ ] Understanding of component requirements
- [ ] Test files created with proper EDS structure

### Block Loading Issues Checklist
- [ ] File names match HTML class names exactly
- [ ] Required files exist (`.js`, `.css`, `test.html`)
- [ ] Test file uses correct EDS block structure
- [ ] No JavaScript syntax errors in console
- [ ] Network tab shows successful file loading

### Content/Styling Issues Checklist  
- [ ] CSS follows EDS naming conventions
- [ ] Content extraction handles nested EDS structure
- [ ] EDS attributes preserved after DOM manipulation
- [ ] Styles target correct CSS selectors
- [ ] No conflicting styles from other sources

### Build Component Issues Checklist
- [ ] Build process completes without errors
- [ ] Deploy script copies files to correct locations
- [ ] Bundled files are self-contained
- [ ] External dependencies properly bundled
- [ ] Test files work in EDS environment

### Performance Issues Checklist
- [ ] Bundle size is reasonable for functionality
- [ ] No memory leaks or excessive DOM manipulation
- [ ] Async operations have proper timeouts
- [ ] Error handling prevents component failure
- [ ] Cleanup functions remove event listeners

## 🆘 Emergency Procedures

### Complete System Reset
```bash
# If debugging modifications break the system
git restore .
npm install
npm run debug

# Verify clean state
git status
```

### Component Isolation Testing
```bash
# Test component in minimal environment
mkdir temp-test
cd temp-test

# Create minimal test file
cat > test.html << EOF
<!DOCTYPE html>
<html>
<head><title>Minimal Test</title></head>
<body>
  <div class="my-component block" data-block-name="my-component" data-block-status="initialized">
    <div><div>Test content</div></div>
  </div>
  <script type="module">
    import decorate from '../blocks/my-component/my-component.js';
    decorate(document.querySelector('.my-component.block'));
  </script>
</body>
</html>
EOF

# Test in browser
python -m http.server 8080
```

### Recovery from File Replacement
```bash
# If you forget to restore files after debugging
git status                    # Check what's modified
git diff scripts/aem.js      # See what changed
git restore scripts/aem.js   # Restore original
git restore scripts/scripts.js
git restore scripts/delayed.js
```

## 📚 Additional Resources

### EDS Architecture Understanding
- **File Structure**: [EDS Block Documentation](https://www.aem.live/docs/)
- **CSS Conventions**: [Style Guide](../style-guide.md)
- **Development Patterns**: [Block Architecture Standards](block-architecture-standards.md)

### Development Tools
- **Browser DevTools**: Chrome/Firefox developer tools
- **Network Analysis**: Browser Network tab for proxy debugging
- **Performance**: Lighthouse for performance analysis
- **Code Quality**: ESLint for JavaScript validation

### Community Resources
- **EDS Discord**: Real-time community support
- **GitHub Issues**: Known issues and solutions
- **Documentation**: Official EDS documentation and examples

---

Remember: **Debugging is a systematic process**. Start with the simplest explanations, use the tools methodically, and always clean up temporary modifications when finished. Most EDS issues fall into predictable patterns that become easy to recognize with experience.