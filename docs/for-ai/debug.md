# Block Debugging Guide for AI Assistants

## 🚨 **DEEP DEBUGGING POLICY NOTICE**

> **📋 Policy Requirement**: The advanced debugging techniques described in this document (file replacement, instrumentation, core file modifications) require **explicit user request** per the [debugging policy](debug.md#deep-debugging-request-policy). 
>
> **⚠️ DO NOT PROCEED** with file replacement operations, instrumentation setup, or advanced testing workflows without explicit approval from the user.
>
> See [debug.md](debug.md) for complete policy details and standard debugging approaches that do not require approval.

---

## 🔧 EDS Core File Debugging Policy

### **TEMPORARY DEBUGGING ALLOWED WITH MANDATORY RESTORATION**

**OFFICIAL POLICY**: Temporary debugging statements ARE permitted in EDS core files for troubleshooting purposes, provided the files are restored to their original state after debugging is complete.

#### **Debuggable EDS Core Files**
- **[`scripts/aem.js`](scripts/aem.js)** - EDS core functionality and block processing
- **[`scripts/scripts.js`](scripts/scripts.js)** - EDS main processing script and lifecycle  
- **[`scripts/delayed.js`](scripts/delayed.js)** - EDS delayed loading functionality

#### **Mandatory Restoration Requirement**
```bash
# After debugging is complete, ALWAYS restore original files
git restore scripts/aem.js
git restore scripts/scripts.js  
git restore scripts/delayed.js

# Verify clean state
git status
```

#### **Allowed Debug Modifications**
**✅ PERMITTED Debug Statements:**
```javascript
// DOM inspection and state logging
console.log('[DEBUG-EDS] Block processing state:', blockStatus);
console.log('[DEBUG-EDS] Element count:', elements.length);

// Execution flow tracking  
console.group('[DEBUG-EDS] Function: decorateBlocks()');
console.log('[DEBUG-EDS] Processing block:', blockName);
console.groupEnd();

// Variable value inspection
console.log('[DEBUG-EDS] Configuration:', config);
console.log('[DEBUG-EDS] Data loaded:', data);

// Timing and lifecycle tracking
console.time('[DEBUG-EDS] Block decoration time');
console.timeEnd('[DEBUG-EDS] Block decoration time');
```

#### **Forbidden Modifications**
**❌ NEVER ALLOWED:**
```javascript
// DO NOT modify logic or behavior
if (condition) {
  // Adding new conditional logic - FORBIDDEN
}

// DO NOT change function parameters or return values
function decorateBlock(block) {
  // Changing function signature - FORBIDDEN
  return modifiedResult; // Changing return value - FORBIDDEN
}

// DO NOT add new functionality
block.addEventListener('click', handler); // Adding new behavior - FORBIDDEN
```

#### **Debug Statement Guidelines**
1. **Non-Behavioral Only**: Debug statements must NOT alter functionality, logic, or behavior
2. **Visibility Only**: Only provide visibility into execution flow, variable values, and state
3. **Temporary**: Must be removed after debugging session is complete
4. **Prefixed**: Use `[DEBUG-EDS]` prefix for easy identification and removal
5. **Grouped**: Use `console.group()` for organized output
6. **Mandatory Restoration**: Always use `git restore` to return files to original state

---

## Standard Debugging Workflow

### **Deep Debugging Activities (Require Explicit Request)**
- **Temporary Core EDS File Debugging**: Adding debug statements to `scripts/aem.js`, `scripts/scripts.js`, `scripts/delayed.js` (with mandatory restoration)
- **Test File Amendments**: Modifying existing test.html files or creating new test scenarios
- **File Replacement Operations**: Backing up and replacing block files for testing
- **EDS Internal Instrumentation**: Adding comprehensive performance monitoring to EDS core processing
- **Production File Debugging**: Any debugging that affects files deployed to production

### **Standard Debugging (No Request Required)**
- **Console Logging**: Adding `console.log` statements to user-created block files
- **Block Function Debugging**: Standard debugging within component `decorate()` functions
- **CSS Debugging**: Testing styles and layout issues
- **Browser DevTools Usage**: Inspecting DOM, network, and performance
- **Configuration Validation**: Checking block structure and naming

**WHY THIS POLICY EXISTS:**
- **EDS Core Integrity**: Prevents accidental modification of Adobe-licensed core files
- **File Safety**: Avoids unintended changes to test files and production code
- **Debugging Clarity**: Ensures complex debugging operations are intentionally requested
- **Version Control**: Maintains clean git history without temporary debug artifacts

---

## Standard Debugging Workflow

This guide provides step-by-step instructions for AI assistants to debug and test EDS (Edge Delivery Services) blocks using the local development server designed to improve AI assistant workflows.

### Prerequisites
- Node.js installed
- Project server running via `npm run debug`
- Understanding of EDS block structure

### Quick Start

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

## HTML File Naming Convention Standards

### **File Type Decision Matrix**

| Environment | File Name | Auto-loaded | Purpose | Server | Usage |
|-------------|-----------|-------------|---------|---------|-------|
| **Development** | `index.html` | ✅ Yes | Build tool integration | Vite (5174) | `npm run dev` |
| **EDS Testing** | `test.html` | ❌ No | Manual EDS testing | EDS Debug (3000) | `npm run debug` |

### **When to Use Each File Type**

#### Use `index.html` when:
- Working in `/build/` directories
- Using Vite, webpack, or other modern build tools
- Need auto-loading development server behavior
- Building components with external dependencies

#### Use `test.html` when:
- Working in `/blocks/` directories  
- Testing EDS block compatibility
- Need explicit file requests
- Testing multiple scenarios (test.html, test-advanced.html, test-error.html)

### **File Naming Examples**

#### ✅ **CORRECT Usage:**
```bash
# Development environment
build/my-component/
├── index.html              # Auto-loaded by Vite
├── package.json
└── vite.config.js

# EDS testing environment  
blocks/my-component/
├── test.html               # Explicit EDS testing
├── test-advanced.html      # Advanced scenarios
├── my-component.js
└── my-component.css
```

#### ❌ **INCORRECT Usage:**
```bash
# Wrong: Using index.html in blocks directory
blocks/my-component/
├── index.html              # WRONG - doesn't work with EDS debug server

# Wrong: Using test.html in build directory  
build/my-component/
├── test.html               # WRONG - build tools expect index.html
```

### **Development Workflow with Correct File Types**

```bash
# 1. Component Development (uses index.html)
cd build/my-component
npm run dev
# Opens: http://localhost:5174/ (auto-loads index.html)

# 2. Build and Deploy (creates test.html)
npm run deploy
# Creates: ../../blocks/my-component/test.html

# 3. EDS Testing (uses test.html)
cd ../../  # Return to project root
npm run debug
# Navigate to: http://localhost:3000/blocks/my-component/test.html
```

### **Common HTML File Naming Mistakes**

#### ❌ **Wrong Assumptions:**
- "File naming is inconsistent across the project"
- "test.html and index.html serve the same purpose"
- "You can use either file name in any environment"

#### ✅ **Correct Understanding:**
- Different environments require different file names
- Each file type serves a specific purpose and tool ecosystem
- The naming pattern prevents conflicts and ensures proper tool integration

---

## File Replacement Testing Strategy

> **📋 Policy Note**: File replacement operations require explicit user request per debugging policy.

### **EDS Dynamic Block Loading Constraint**

**CRITICAL**: EDS uses dynamic imports with constructed paths that cannot be modified:
```javascript
// In scripts/aem.js - loadBlock function
const mod = await import(`/blocks/${blockName}/${blockName}.js`);
```

This means EDS **always** calls the block by its exact name (`your-component.js`), making direct instrumentation impossible without file replacement.

### **File Replacement Testing Workflow**

When testing instrumented or enhanced block versions, you must temporarily replace the original block file:

#### **Method 1: Manual Backup/Restore**
```bash
# 1. Create backup of original
cp blocks/your-component/your-component.js blocks/your-component/your-component-backup.js

# 2. Replace with instrumented/test version
cp blocks/your-component/your-component-instrumented.js blocks/your-component/your-component.js

# 3. Run tests (EDS automatically loads the replacement version)
# http://localhost:3000/blocks/your-component/test.html

# 4. Restore original file
cp blocks/your-component/your-component-backup.js blocks/your-component/your-component.js

# 5. Clean up backup
rm blocks/your-component/your-component-backup.js
```

#### **Method 2: Git-Based Workflow (Recommended)**
```bash
# 1. Ensure clean working directory
git status

# 2. Replace with instrumented/test version
cp blocks/your-component/your-component-instrumented.js blocks/your-component/your-component.js

# 3. Run tests and collect data
# (Execute testing procedures)

# 4. Restore original using git
git restore blocks/your-component/your-component.js

# 5. Verify restoration
git status  # Should show no changes
```

#### **Automated Testing Script Template**
```bash
#!/bin/bash
# test-instrumented-block.sh

BLOCK_NAME="$1"
BLOCK_PATH="blocks/$BLOCK_NAME"
ORIGINAL_FILE="${BLOCK_PATH}/${BLOCK_NAME}.js"
INSTRUMENTED_FILE="${BLOCK_PATH}/${BLOCK_NAME}-instrumented.js"
BACKUP_FILE="${BLOCK_PATH}/${BLOCK_NAME}-backup.js"

# Validation
if [ ! -f "$INSTRUMENTED_FILE" ]; then
    echo "❌ Instrumented file not found: $INSTRUMENTED_FILE"
    exit 1
fi

echo "🔧 Testing instrumented $BLOCK_NAME block..."

# 1. Backup original
cp "$ORIGINAL_FILE" "$BACKUP_FILE"
echo "✅ Original file backed up"

# 2. Replace with instrumented version
cp "$INSTRUMENTED_FILE" "$ORIGINAL_FILE"
echo "✅ Instrumented version deployed"

# 3. Wait for user testing
echo "🌐 Open: http://localhost:3000/blocks/$BLOCK_NAME/test.html"
echo "📊 Run tests, then press Enter to restore..."
read -r

# 4. Restore original
cp "$BACKUP_FILE" "$ORIGINAL_FILE"
rm "$BACKUP_FILE"
echo "✅ Original file restored and backup cleaned up"
```

### **Why File Replacement is Required**

1. **EDS Dynamic Loading**: `import(\`/blocks/\${blockName}/\${blockName}.js\`)` cannot be modified
2. **Exact Name Matching**: EDS constructs paths using block name, requires exact filename
3. **No Import Redirection**: Cannot redirect imports without modifying core EDS files
4. **Testing Isolation**: File replacement allows testing enhanced code in real EDS environment

## Block JavaScript Implementation Debugging

### **Enhanced `decorate()` Function Patterns**

All EDS blocks should implement comprehensive debugging patterns in their `decorate()` functions:

#### **Standard Error Handling Pattern**
```javascript
// Standard error handling pattern for all blocks
export default async function decorate(block) {
  const blockName = block.dataset.blockName || 'unknown';
  
  try {
    console.group(`[${blockName.toUpperCase()}] Block decoration starting`);
    console.time(`[${blockName.toUpperCase()}] Decoration time`);
    
    // Ensure EDS visibility
    if (!document.body.classList.contains('appear')) {
      console.warn(`[${blockName.toUpperCase()}] Adding appear class for visibility`);
      document.body.classList.add('appear');
    }
    
    // Component logic here
    await enhanceBlock(block);
    
    console.log(`[${blockName.toUpperCase()}] Decoration completed successfully`);
    
  } catch (error) {
    console.error(`[${blockName.toUpperCase()}] Decoration failed:`, error);
    
    // Fallback content
    block.innerHTML = `<p>Component temporarily unavailable</p>`;
    
  } finally {
    console.timeEnd(`[${blockName.toUpperCase()}] Decoration time`);
    console.groupEnd();
  }
}
```

#### **Performance Monitoring Integration**
```javascript
// Add to component decorate() function for performance monitoring
export default function decorate(block) {
  const startTime = performance.now();
  console.time('[PERF] Block decoration');
  
  try {
    // Component logic here
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Performance thresholds
    if (duration > 100) {
      console.warn(`[PERF] Slow decoration: ${duration.toFixed(2)}ms`);
    } else {
      console.log(`[PERF] Good performance: ${duration.toFixed(2)}ms`);
    }
    
  } catch (error) {
    console.error('[PERF] Performance monitoring failed:', error);
  } finally {
    console.timeEnd('[PERF] Block decoration');
  }
}
```

## Browser DevTools Debugging

### Console Debugging Commands
```javascript
// Find all blocks on page
const blocks = document.querySelectorAll('[class*="block"]');
console.log('All blocks:', blocks);

// Check EDS initialization
console.log('Body has appear class:', document.body.classList.contains('appear'));

// Monitor block loading
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, checking blocks...');
  setTimeout(() => {
    const decorated = document.querySelectorAll('[data-block-status]');
    console.log('Decorated blocks:', decorated.length);
  }, 1000);
});
```

### Network Tab Analysis
- **Check Resource Loading**: Verify CSS and JS files load correctly
- **Monitor API Calls**: Watch for failed external requests
- **Asset Validation**: Ensure images and fonts load properly
- **Timing Analysis**: Identify slow-loading resources

### Performance Tab Usage
- **Lighthouse Audits**: Run performance, accessibility, and SEO audits
- **Paint Metrics**: Monitor First Contentful Paint and Largest Contentful Paint
- **Layout Shifts**: Identify Cumulative Layout Shift issues
- **Bundle Analysis**: Check for unused code and large dependencies

## Common Debugging Scenarios

### Block Not Initializing
```javascript
// Check if block exists and has proper structure
const block = document.querySelector('.your-block-name');
if (!block) {
  console.error('Block element not found');
} else {
  console.log('Block found:', block);
  console.log('Block classes:', block.className);
  console.log('Block dataset:', block.dataset);
}
```

### CSS Not Applied
```javascript
// Check if CSS file loaded
const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
cssLinks.forEach(link => {
  if (link.href.includes('your-block-name')) {
    console.log('Block CSS found:', link.href);
  }
});

// Check computed styles
const block = document.querySelector('.your-block-name');
const styles = window.getComputedStyle(block);
console.log('Applied styles:', styles);
```

### JavaScript Errors
```javascript
// Global error handler for debugging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  console.log('Error source:', event.filename);
  console.log('Line number:', event.lineno);
});

// Promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

## Testing Workflow

### 1. Local Testing
```bash
# Start development server
npm run debug

# Test specific block using correct file name
open http://localhost:3000/blocks/your-block/test.html
```

### 2. Browser Testing
- **Chrome DevTools**: Primary debugging environment
- **Firefox Developer Tools**: Cross-browser validation
- **Safari Web Inspector**: WebKit compatibility testing
- **Mobile Testing**: Chrome DevTools device simulation

### 3. Performance Testing
```javascript
// Simple performance test
console.time('Block load time');
// ... block loading code ...
console.timeEnd('Block load time');

// Memory usage monitoring
console.log('Memory usage:', performance.memory);
```

### EDS Body Visibility Debugging
```javascript
// Check if body has appear class for visibility
if (!document.body.classList.contains('appear')) {
  console.warn('EDS body.appear class missing - page may be invisible');
  console.log('Body classes:', document.body.className);
  console.log('Main element exists:', !!document.querySelector('main'));
}

// Safe fallback for components
export default async function decorate(block) {
  try {
    // Ensure body visibility for component rendering
    if (!document.body.classList.contains('appear')) {
      console.warn('[component-name] Adding appear class for visibility');
      document.body.classList.add('appear');
    }
    
    // ... rest of component logic
  } catch (error) {
    console.error('[component-name] Enhancement failed:', error);
  }
}
```

## Error Handling Best Practices

### Graceful Degradation
```javascript
export default async function decorate(block) {
  try {
    // Enhanced functionality
    await enhanceBlock(block);
  } catch (error) {
    console.warn('Enhancement failed, using fallback:', error);
    // Fallback to basic functionality
    renderBasicContent(block);
  }
}
```

### User-Friendly Error Messages
```javascript
function handleError(error, block) {
  console.error('Block error:', error);
  
  if (block) {
    block.innerHTML = `
      <div class="error-message">
        <p>This content is temporarily unavailable.</p>
        <p>Please try refreshing the page.</p>
      </div>
    `;
  }
}
```

## Enhanced Debugging Checklist

### **Pre-Development Setup**
- [ ] **File Naming**: Understand when to use `index.html` vs `test.html`
- [ ] **Environment Setup**: Correct server for file type (Vite vs EDS debug)
- [ ] **File Replacement Strategy**: Understand instrumented file testing workflow
- [ ] **Debug Tools Available**: Browser console, DevTools, server logs
- [ ] **Performance Baseline**: Know expected timing and memory benchmarks
- [ ] **Error Patterns**: Familiar with common failure modes and solutions

### **Before Testing**
- [ ] Block files exist (`.js`, `.css`)
- [ ] Server is running (`npm run debug`)
- [ ] Test file created in correct location with correct name (`test.html`)
- [ ] Block structure follows EDS conventions
- [ ] **Instrumented versions prepared** (if performance testing)
- [ ] **Git working directory clean** (for file replacement workflow)

### **During Testing**
- [ ] Check browser console for errors
- [ ] Verify network requests succeed
- [ ] Test responsive behavior
- [ ] Validate accessibility features
- [ ] Test all interactive elements
- [ ] **Monitor performance metrics** (timing, memory)
- [ ] **Track DOM mutations** (if debugging timing issues)
- [ ] **Verify EDS integration** (attributes, styling, lifecycle)

### **Performance Testing Checklist**
- [ ] **Function Execution Timing**: <20ms for block decoration
- [ ] **Memory Usage**: <500KB increase per block
- [ ] **DOM Mutations**: <15 mutations per decoration cycle
- [ ] **Async Operations**: <5 concurrent operations
- [ ] **Resource Loading**: All critical resources <1MB
- [ ] **Error Recovery**: Graceful degradation implemented

### **File Replacement Testing Checklist**
- [ ] **Backup Created**: Original file safely backed up
- [ ] **Instrumented Version**: Enhanced version ready for deployment
- [ ] **Testing Complete**: All scenarios tested thoroughly
- [ ] **Original Restored**: File replacement properly reversed
- [ ] **Git Status Clean**: No unintended changes committed

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
4. Ensure proper file naming (`test.html` for EDS testing)

#### HTML File Naming Issues

1. Use `test.html` for EDS environment testing
2. Use `index.html` for development build environments
3. Check URL matches file type (localhost:3000 for test.html, localhost:5174 for index.html)
4. Verify server type matches file purpose

## Deployment and EDS Integration

### Deploy Command Usage
After successful development and testing, use the deploy command to build and deploy components:

```bash
# Navigate to component build directory
cd build/your-component

# Deploy finished built stubs and README to blocks folder
npm run deploy
```

### EDS Project Integration
To actually use the built system in your EDS project, copy the `blocks/` contents to your own repository:

```bash
# Copy built components to your EDS project
cp -r blocks/your-component /path/to/your/eds-project/blocks/

# Navigate to your EDS project
cd /path/to/your/eds-project

# Add to git and commit
git add blocks/your-component/
git commit -m "Add component with advanced features"

# Push to your repository
git push origin main
```

### Complete Workflow
1. **Development**: Work in `build/your-component/` with `npm run dev` (uses index.html)
2. **Testing**: Use `npm run debug` for EDS compatibility testing (uses test.html)
3. **Build & Deploy**: Run `npm run deploy` to create production files
4. **Copy to EDS**: Copy `blocks/your-component/` to your EDS repository
5. **Git Integration**: Commit and push to your EDS project repository

---

## 🔒 Remember: Deep Debugging Request Policy

Before proceeding with any deep debugging activities that involve EDS core file modifications, test file amendments, or file replacement operations, ensure you have received an explicit request from the user. Standard debugging activities can proceed without additional approval.

**Standard = Good to go**  
**Deep = Request required**  
**Core File Debugging = Allowed with mandatory restoration**
**HTML File Naming = Use correct file type for environment**

This policy ensures safe, intentional debugging while maintaining EDS core integrity and project stability. Always restore EDS core files to their original state after debugging sessions and use the appropriate HTML file naming convention for each environment.