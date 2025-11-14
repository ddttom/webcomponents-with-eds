# Jupyter Notebook Testing for EDS Blocks - Browser Only

*Related: [EDS Native Testing Standards](testing/eds-native-testing-standards.md) | [Block Architecture Standards](implementation/block-architecture-standards.md) | [Debug Guide](testing/debug.md)*

## Overview

This document explains the Jupyter notebook implementation for **interactive testing of EDS blocks using JavaScript in the browser**. Notebooks are executed via the ipynb-viewer block on EDS sites.

**BROWSER-ONLY EXECUTION**: The test.ipynb notebook runs exclusively in the browser with:
- **Simple async pattern** - Direct `await` and `return` statements (no IIFE wrappers)
- **Direct imports** - Each cell imports what it needs independently (no initialization required)
- **Helper functions** - `testBlock()` and `showPreview()` via ES6 imports
- **Overlay previews** - Full-screen overlay with backdrop (no popup blockers)
- **Native browser APIs** - Direct use of `document`, `window`, `fetch`
- **Cell independence** - Run any cell at any time in any order

## What This Is

**Jupyter Notebook Testing** provides an interactive browser-based environment for testing Adobe Edge Delivery Services (EDS) blocks using:
- **JavaScript** (NOT Python) executed in the browser
- **Browser execution** via ipynb-viewer block on EDS sites
- **Native browser APIs** (`document`, `window`, `fetch`)
- **Simple async pattern** - Write code naturally with `await` and `return`
- **Direct ES6 imports** - Each cell imports helper functions independently
- **Helper functions** - `testBlock()` and `showPreview()` from `/scripts/ipynb-helpers.js`
- **Overlay previews** - Full-screen overlay on same page (no popup blockers)
- **Cell independence** - Run any cell at any time in any order
- **Interactive execution** - Run code cells individually with click

Test EDS blocks interactively in the browser and share executable notebooks for end-user interaction. The overlay preview system provides full styling and interactivity without popup blockers.

---

## Architecture Overview

### Core Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Jupyter Notebook                                      │
│                       (.ipynb file)                                         │
│                     BROWSER EXECUTION                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │                    ipynb-viewer Block                        │          │
│  │                    (EDS)                                     │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                              ↓                                              │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │              Native Browser APIs                             │          │
│  │              - document                                      │          │
│  │              - window                                        │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                              ↓                                              │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │              Helper Functions:                               │          │
│  │              scripts/ipynb-helpers.js                        │          │
│  │              - testBlock() (direct ES6 import)               │          │
│  │              - showPreview() (direct ES6 import)             │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                              ↓                                              │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │              EDS Block Decoration                            │          │
│  │              JavaScript Execution                            │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                              ↓                                              │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │              OVERLAY PREVIEW                                 │          │
│  │              (same page - no popup blockers)                 │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                              ↓                                              │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │              LIVE PREVIEW UI                                 │          │
│  │  ┌────────────────────────────────────────────────────────┐  │          │
│  │  │  [blockname] Block Preview         [✕ Close]           │  │          │
│  │  └────────────────────────────────────────────────────────┘  │          │
│  │  ┌────────────────────────────────────────────────────────┐  │          │
│  │  │                                                        │  │          │
│  │  │           Block Content (scrollable)                  │  │          │
│  │  │                                                        │  │          │
│  │  └────────────────────────────────────────────────────────┘  │          │
│  │                                                               │          │
│  │  Features:                                                    │          │
│  │  - Full-screen overlay with backdrop                          │          │
│  │  - Close button, ESC key, or backdrop click                   │          │
│  │  - Scrollable content                                         │          │
│  │  - Direct CSS/JS loading (no blob URL issues)                 │          │
│  │  - No popup blockers                                          │          │
│  └───────────────────────────────────────────────────────────────┘          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Why Jupyter Notebooks?

**Traditional test.html approach:**
- Requires development server
- Browser refresh for each change
- Manual testing only
- No inline documentation

**Jupyter notebook approach (browser-only):**
- Interactive cell-by-cell execution in browser
- Test multiple scenarios in one file
- Inline documentation with Markdown
- Generate styled overlay previews instantly
- Simple async pattern (no complex wrappers)
- No initialization required - import what you need
- Iterative development with immediate feedback
- Shareable executable notebooks for end users
- Runs on EDS pages via ipynb-viewer block

---

## Browser Execution

The test.ipynb notebook runs **exclusively in the browser** via the ipynb-viewer block.

### Features

**Purpose:** Interactive block testing and end-user demonstrations

**Features:**
- Native browser APIs (`document`, `window`, `fetch`)
- Direct JavaScript execution with async/await support
- Console output display in cell output
- Overlay previews with backdrop (no popup blockers)
- Helper functions via direct imports - no initialization needed
- Simple async pattern - write code naturally

**When to use:**
- Testing EDS blocks interactively on EDS sites
- Sharing executable demos with end users
- Interactive tutorials and documentation
- Client presentations
- Live coding examples

### Setup (No Initialization Required!)

Each cell imports what it needs independently:

```javascript
const { testBlock, showPreview } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', content);
await showPreview('accordion', content);
return block.outerHTML;
```

**Available helper functions:**
- `testBlock(blockName, innerHTML)` - Test block decoration
- `showPreview(blockName, innerHTML)` - Open overlay preview

**Important:** Cell code runs in async context automatically (via `AsyncFunction`). Just write code naturally with `await` and `return` - no IIFE wrapper needed!

---

## Live Preview Feature

The notebook supports **visual overlay previews** in the browser!

### Overlay Preview

When using `showPreview()`, an overlay appears with the styled block:

**Example:**
```javascript
// Test and preview a block
const { showPreview } = await import('/scripts/ipynb-helpers.js');
await showPreview('accordion', accordionContent);
return '✓ Preview overlay opened';
```

**Features:**
- Dark themed professional UI
- Full-screen overlay with backdrop
- **Responsive preview buttons**: Mobile (375×667), Tablet (768×1024), Desktop (95%×95vh)
- **Adaptive UI**: Button text abbreviates to M/T/D in mobile view for better fit
- ✕ Close button (or press ESC, or click backdrop)
- Scrollable content area
- No popup blockers to worry about
- Stays on same page

### Live Preview System with Overlay (NEW)

**Live previews now use a full-screen overlay - no popup blockers!**

The preview system creates an overlay on the current page with the styled block.

**How it works:**

1. **Creates overlay with inline styles**:
   ```javascript
   const overlay = document.createElement('div');
   overlay.className = 'ipynb-preview-overlay';
   // Full-screen overlay with backdrop
   // Semi-transparent black background
   // Centered container with styled content
   ```

2. **Minimal DOM structure** (no wrapper interference):
   ```html
   <div class="ipynb-preview-overlay">
     <div class="ipynb-preview-container">
       <div class="ipynb-preview-header">
         <div class="ipynb-preview-title">blockname Block Preview</div>
         <button>✕ Close</button>
       </div>
       <div class="ipynb-preview-content">
         <div class="blockname block">
           <!-- undecorated block content as direct children -->
         </div>
       </div>
     </div>
   </div>
   ```

3. **Automatically decorates the block**:
   - Dynamically imports `/blocks/blockname/blockname.js`
   - Executes the block's default export (decoration function)
   - Full error handling and console logging

**Key Benefits:**
- ✅ **No popup blockers** - Overlay on same page
- ✅ **Better UX** - Stays on current page
- ✅ **Clean DOM structure** - Block decorated properly
- ✅ **EDS-compatible structure** - Follows EDS block decoration patterns
- ✅ **Full styling** - All CSS loads from current page
- ✅ **Perfect JavaScript execution** - Module imports work correctly

**Features:**
- Full-screen overlay with semi-transparent backdrop
- Dark themed header with responsive preview controls
- **Responsive preview buttons**:
  - 📱 Mobile (375px × 667px) - iPhone SE/8 size
  - 📱 Tablet (768px × 1024px) - iPad size
  - 🖥️ Desktop (95% × 95vh) - Full desktop view (default)
  - **Adaptive button text**: Shows "M", "T", "D" in mobile view for compact fit
- Close button, ESC key, or click backdrop to close
- Scrollable content area
- Previous overlay automatically removed
- Smooth transitions between viewport sizes
- Compact header styling in mobile view (reduced padding and font sizes)

**Example:**
```javascript
// This creates a fully interactive overlay preview
const { showPreview } = await import('/scripts/ipynb-helpers.js');
await showPreview('accordion', accordionContent);
// An overlay appears with:
// - Full accordion styling from accordion.css
// - Interactive <details> elements
// - Base styles from styles.css
// - Press ESC, click backdrop, or click close button to dismiss
```

---

## Enhanced Markdown Rendering (NEW)

The **ipynb-viewer block** now supports comprehensive markdown rendering when viewing notebooks in the browser:

### Supported Markdown Features

**Code Blocks (NEW):**
```javascript
// Triple backtick code blocks now render properly
const example = 'with syntax highlighting';
```

**Tables (NEW):**
| Feature | JSLab | Browser |
|---------|-------|---------|
| DOM Creation | ✅ jsdom | ✅ Native |

**Lists (NEW):**
- Unordered lists with `-` or `*`
- Ordered lists with `1.`
- Proper nesting and spacing

**Inline Formatting:**
- **Bold** text with `**text**`
- *Italic* text with `*text*`
- `Inline code` with backticks
- [Links](url) with `[text](url)`

**Headers:**
- `#` H1
- `##` H2
- `###` H3

**Why this matters:**
The Quick Reference sections in test.ipynb now display beautifully in the browser with properly formatted code examples, tables, and lists!

---

## Helper Functions

Helper functions are defined in [scripts/ipynb-helpers.js](../../scripts/ipynb-helpers.js) and imported in each cell as needed. This keeps the notebook clean and makes helpers reusable.

### Testing Functions

#### `testBlock(blockName, innerHTML)`

Tests a block's decoration function with provided content in the browser.

**Parameters:**
- `blockName`: Name of the block (e.g., 'accordion')
- `innerHTML`: HTML content structure (EDS table format)

**Returns:** The decorated block element

**Example:**
```javascript
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', `
  <div>
    <div>Question 1</div>
    <div>Answer 1</div>
  </div>
`);
console.log(block.outerHTML);
return block.outerHTML;
```

#### `showPreview(blockName, innerHTML)`

Opens an overlay with the styled, decorated block.

**Parameters:**
- `blockName`: Name of the block
- `innerHTML`: HTML content structure

**Returns:** Success message

**Example:**
```javascript
const { showPreview } = await import('/scripts/ipynb-helpers.js');
await showPreview('accordion', accordionContent);
return '✓ Preview overlay opened';
```

**What it creates:**
- Full-screen overlay with semi-transparent backdrop
- Dark themed header with close button
- Scrollable content area
- Block decorated with proper CSS/JS
- Close with ESC, backdrop click, or close button

---

## File Structure

```
project/
├── test.ipynb                      # Main browser-only test notebook
├── scripts/
│   └── ipynb-helpers.js           # Helper functions module
├── blocks/                         # EDS blocks
│   ├── accordion/
│   │   ├── accordion.js           # Block JavaScript
│   │   ├── accordion.css          # Block styles
│   │   └── README.md              # Block documentation
│   ├── ipynb-viewer/              # Notebook viewer block
│   │   ├── ipynb-viewer.js        # Displays and executes notebooks
│   │   ├── ipynb-viewer.css       # Viewer styles
│   │   └── README.md              # Usage documentation
│   └── [other blocks]/
└── styles/                         # EDS core styles
    ├── styles.css
    ├── fonts.css
    └── lazy-styles.css
```

---

## Workflow

### 1. Open the Notebook

Open [test.ipynb](../../test.ipynb) on an EDS page using the ipynb-viewer block:

**In your Google Doc:**
```
| IPynb Viewer |
|--------------|
| /test.ipynb  |
```

### 2. Test Blocks

**Simple pattern - import what you need:**

```javascript
// Test a block
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', `
  <div>
    <div>Question</div>
    <div>Answer</div>
  </div>
`);
console.log(block.outerHTML);
return block.outerHTML;
```

### 3. Generate Previews

**Open overlay with styled preview:**

```javascript
const { showPreview } = await import('/scripts/ipynb-helpers.js');
const content = `
  <div>
    <div>Question</div>
    <div>Answer</div>
  </div>
`;

await showPreview('accordion', content);
return '✓ Preview overlay opened';
```

### 4. Iterate

1. Run any cell at any time (no order required)
2. View output inline in cell output areas
3. Make changes to block JavaScript/CSS
4. Re-run cells to test changes
5. Generate new overlay to see updates

---

## Content Structure Patterns

### EDS Table Format

EDS blocks expect content in a table structure (rows and columns):

```javascript
// Two-column structure (common)
const contentHTML = `
  <div><!-- Row 1 -->
    <div>Column 1 content</div>
    <div>Column 2 content</div>
  </div>
  <div><!-- Row 2 -->
    <div>Column 1 content</div>
    <div>Column 2 content</div>
  </div>
`;
```

### With Images

```javascript
const contentHTML = `
  <div>
    <div>
      <picture>
        <img src="../images/hero.jpg" alt="Hero image">
      </picture>
    </div>
    <div>Hero text content</div>
  </div>
`;
```

### With Links

```javascript
const contentHTML = `
  <div>
    <div>
      <a href="https://example.com">Click here</a>
    </div>
    <div>Link description</div>
  </div>
`;
```

---

## Advantages Over test.html

| Feature | test.html | Jupyter Notebook |
|---------|-----------|------------------|
| **Setup** | Development server required | No server needed |
| **Iteration** | Browser refresh | Run cell |
| **Multiple Tests** | Multiple files or sections | Multiple cells |
| **Documentation** | Comments only | Markdown + code |
| **Output** | Browser console | Inline display |
| **Debugging** | Browser DevTools | Console logs inline |
| **HTML Preview** | Manual creation | Auto-generated with CSS |
| **Experimentation** | Reload page | Rerun cell |

---

## Common Use Cases

### 1. Rapid Prototyping

Test block logic interactively:

```javascript
// Quick test of content extraction
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('hero', `<div><div>Title</div></div>`);
console.log('Extracted title:', block.querySelector('h1')?.textContent);
return block.outerHTML;
```

### 2. Multiple Scenarios

Test different configurations in separate cells:

```javascript
// Cell 1: Basic accordion
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const content1 = `<div><div>Q1</div><div>A1</div></div>`;
const block1 = await testBlock('accordion', content1);
return block1.outerHTML;
```

```javascript
// Cell 2: Multiple items
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const content2 = `
  <div><div>Q1</div><div>A1</div></div>
  <div><div>Q2</div><div>A2</div></div>
  <div><div>Q3</div><div>A3</div></div>
`;
const block2 = await testBlock('accordion', content2);
return block2.outerHTML;
```

### 3. Edge Cases

Test error handling and edge cases:

```javascript
// Empty content
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const emptyBlock = await testBlock('hero', '');
console.log('Empty content handled:', emptyBlock.innerHTML);
return emptyBlock.outerHTML;
```

```javascript
// Invalid structure
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const invalidBlock = await testBlock('hero', '<div>Only one cell</div>');
console.log('Invalid structure handled:', invalidBlock.innerHTML);
return invalidBlock.outerHTML;
```

### 4. Documentation

Combine Markdown cells with code cells for living documentation:

```markdown
## Hero Block Tests

The hero block displays a large heading and supporting text.
It supports both single and double-column layouts.

### Test 1: Basic Usage
```

```javascript
const { testBlock, showPreview } = await import('/scripts/ipynb-helpers.js');
const content = `<div><div>Hero Title</div><div>Hero description</div></div>`;
const block = await testBlock('hero', content);
await showPreview('hero', content);
return '✓ Hero block tested';
```

---

## IPynb Viewer Block (NEW)

The **ipynb-viewer** EDS block allows you to display and execute Jupyter notebooks directly on your website.

### Features

- **Parse .ipynb files**: Loads and displays Jupyter notebook JSON format
- **Markdown rendering**: Converts markdown cells to formatted HTML with tables, code blocks, lists
- **Interactive execution**: Run JavaScript code cells with a click (async/await support)
- **No initialization required**: Each cell imports what it needs
- **Console capture**: Shows console.log() and console.error() output
- **Result display**: Shows return values from code execution
- **Error handling**: Catches and displays errors with styling
- **Cell independence**: Run any cell at any time in any order

### Usage in EDS

Add the block to your Google Doc:

```
| IPynb Viewer |
|--------------|
| /notebooks/test.ipynb |
```

### What Gets Executed

When users click "Run" on a code cell:
- Code executes in the browser using `AsyncFunction` constructor (supports await)
- Each cell can import helper functions independently
- Console methods are captured during execution
- Results display inline below the cell
- Errors are caught and shown in red
- Successful execution turns the cell border green

**Important:** Each cell imports what it needs - no initialization required!

### Use Cases

1. **Interactive Tutorials**: Step-by-step coding lessons
2. **Documentation with Examples**: Combine explanations with runnable code
3. **Data Exploration**: Allow users to run calculations
4. **Testing Tools**: Provide interactive testing utilities
5. **Client Demos**: Share executable examples

### Security Considerations

- Code runs in the user's browser context
- Has access to the global scope and DOM
- Be cautious with untrusted notebook files
- Consider additional sandboxing for public sites

### Related Files

- **Block implementation**: [blocks/ipynb-viewer/ipynb-viewer.js](../../blocks/ipynb-viewer/ipynb-viewer.js)
- **Block styles**: [blocks/ipynb-viewer/ipynb-viewer.css](../../blocks/ipynb-viewer/ipynb-viewer.css)
- **Block documentation**: [blocks/ipynb-viewer/README.md](../../blocks/ipynb-viewer/README.md)
- **Example notebook**: [notebooks/example.ipynb](../../notebooks/example.ipynb)
- **Context-aware notebook**: [test.ipynb](../../test.ipynb)

---

## Limitations

### What Notebooks CAN'T Do

1. **Block-Only Testing**
   - Can only test individual blocks in isolation
   - No full page context with EDS core loaded
   - No interaction with other blocks on the page
   - **Solution**: Use traditional test.html for full page testing

2. **Limited Browser APIs**
   - Overlay runs in current page context
   - Has access to same APIs as parent page
   - Full browser feature support

3. **Automated Testing**
   - No CI/CD integration
   - No regression testing
   - Manual execution only
   - **Solution**: Use Jest/Mocha for automated tests

### What Notebooks CAN Do

1. **DOM Manipulation**
   - Test block decorate functions
   - Verify element creation
   - Check HTML structure with native browser APIs

2. **Content Extraction**
   - Parse EDS table structure
   - Extract text, images, links
   - Test data transformation

3. **Logic Testing**
   - Configuration handling
   - Conditional rendering
   - Content processing
   - JavaScript calculations

4. **Visual Previews**
   - Generate styled overlay previews
   - Visual verification with real CSS
   - Interactive block testing
   - Instant feedback loop
   - No popup blockers

5. **Interactive Execution**
   - Run JavaScript code cells
   - Execute code in browser
   - Display results inline
   - Interactive tutorials and demos
   - Share executable notebooks

---

## Quick Start Guide

### For End Users and Testing (Browser)

1. **Add ipynb-viewer block** to your EDS page:
   ```
   | IPynb Viewer |
   |--------------|
   | /test.ipynb  |
   ```

2. **Test a block** (any cell):
   ```javascript
   const { testBlock } = await import('/scripts/ipynb-helpers.js');
   const block = await testBlock('accordion', '<div><div>Q</div><div>A</div></div>');
   return block.outerHTML;
   ```

3. **Generate preview** (any cell):
   ```javascript
   const { showPreview } = await import('/scripts/ipynb-helpers.js');
   await showPreview('accordion', '<div><div>Q</div><div>A</div></div>');
   return '✓ Preview overlay opened';
   ```

4. **Features:**
   - Read markdown documentation
   - Click "Run" on any code cell
   - See console output and results
   - Open overlay previews with styled blocks
   - Execute JavaScript interactively
   - Learn through runnable examples
   - No initialization required

---

## Best Practices

### 1. Import What You Need

Each cell imports helper functions independently:

```javascript
const { testBlock, showPreview } = await import('/scripts/ipynb-helpers.js');
```

### 2. Use Simple Async Pattern

Cell code runs in async context automatically - write code naturally:

```javascript
// ✅ GOOD - Simple and clean
const { testBlock, showPreview } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', content);
await showPreview('accordion', content);
return block.outerHTML;
```

```javascript
// ❌ BAD - Unnecessary IIFE wrapper (don't do this!)
return (async () => {
  const block = await testBlock('accordion', content);
  return block.outerHTML;
})();
```

### 3. Structure Your Notebooks

```
Cells: Markdown documentation and test cases
  - One test scenario per cell
  - Use markdown cells for explanations
  - Generate previews inline
  - Import helpers as needed
```

### 4. Add Markdown Documentation

Explain what each test does and why:

```markdown
### Test Case 3: Grid Layout with 3 Columns

This tests the block's ability to display items in a grid
with a configurable number of columns using data attributes.
```

### 5. Use Overlay Previews for Visual Verification

Always generate overlay previews for visual checks:

```javascript
const { showPreview } = await import('/scripts/ipynb-helpers.js');
await showPreview('your-block', content);
return '✓ Preview overlay opened';
```

The overlay appears with:
- Full block styling (CSS)
- Interactive JavaScript
- Close button, ESC key, or backdrop click to close

### 6. Keep Tests Focused

One test scenario per cell for clarity:

```javascript
// ❌ BAD - Multiple tests in one cell
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block1 = await testBlock('hero', content1);
const block2 = await testBlock('hero', content2);
const block3 = await testBlock('hero', content3);
```

```javascript
// ✅ GOOD - Separate cells for each test
// Cell 1:
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block1 = await testBlock('hero', content1);
return block1.outerHTML;
```

```javascript
// Cell 2:
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block2 = await testBlock('hero', content2);
return block2.outerHTML;
```

---

## Troubleshooting

### Issue: No Output Displayed

**Error:** Cell runs successfully (green checkmark) but output cell is empty

**Solution:** Make sure you're using `return` to display results:
```javascript
// ✅ GOOD - Shows output
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', content);
return block.outerHTML;

// ❌ BAD - No output
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', content);
```

### Issue: Helper Functions Not Found

**Error:** Import fails or functions not available

**Solution:** Check the import path and syntax:
```javascript
// ✅ GOOD - Correct import
const { testBlock, showPreview } = await import('/scripts/ipynb-helpers.js');

// ❌ BAD - Wrong path
const { testBlock } = await import('./scripts/ipynb-helpers.js');
```

### Issue: Overlay Not Appearing

**Error:** `showPreview()` runs but no overlay appears

**Solution:**
- Check browser console for JavaScript errors
- Verify block JavaScript file exists: `blocks/blockname/blockname.js`
- Check that block CSS file exists: `blocks/blockname/blockname.css`

### Issue: CSS Not Loading in Preview

**Error:** Overlay shows unstyled content

**Solution:**
- Check that block CSS file exists: `blocks/blockname/blockname.css`
- Check browser console for 404 errors
- Verify CSS loads on the parent page

---

## Integration with Claude Code

The Jupyter notebook testing system integrates with Claude Code through:

### Slash Command

```bash
/jupyter-notebook <block-name>
```

Creates a new notebook for testing the specified block with:
- Pre-configured jsdom setup
- Helper functions included
- Example test cases
- Proper file structure

### Skill Activation

The `jupyter-notebook-testing` skill activates when:
- Working with `.ipynb` files
- Using keywords: "jupyter", "notebook", "testBlock"
- Creating interactive tests

This provides:
- Guidance on notebook structure
- Helper function documentation
- Troubleshooting tips
- Best practices

---

## Comparison with Other Testing Approaches

| Feature | test.html | Jupyter Notebooks | Automated Tests |
|---------|-----------|-------------------|-----------------|
| **Real rendering** | ✅ Yes | ✅ Yes (popup) | ❌ No |
| **Server required** | ✅ Yes | ✅ Yes (EDS page) | ❌ No |
| **Interactive** | ✅ Yes | ✅ Yes | ❌ No |
| **Multiple scenarios** | ❌ No | ✅ Yes | ✅ Yes |
| **Documentation** | ❌ No | ✅ Inline markdown | ⚠️ Separate |
| **Visual feedback** | ✅ Yes | ✅ Yes (popup) | ❌ No |
| **Block decoration** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Browser APIs** | ✅ Full | ✅ Full | ⚠️ Mocked |
| **Overlay previews** | ❌ No | ✅ Yes | ❌ No |
| **CI/CD** | ❌ No | ❌ No | ✅ Yes |
| **End-user facing** | ❌ No | ✅ Yes | ❌ No |

### test.html (Browser-based)

**Best for:** Full page testing with EDS core, interactions, browser-specific behavior

**Pros:**
- Real browser rendering with full EDS core
- Full browser APIs available
- User interaction testing
- Browser DevTools integration
- Multiple blocks on same page

**Cons:**
- Requires development server
- Manual refresh workflow
- One scenario per file
- No inline documentation

### Jupyter Notebooks (Browser-only)

**Best for:** Interactive block testing, tutorials, demos, documentation

**Pros:**
- Interactive code execution in browser
- Multiple scenarios in one file
- Inline markdown documentation
- Overlay previews with styling (no popup blockers)
- Simple async pattern (no complex wrappers)
- No initialization required
- Shareable executable notebooks
- Perfect for end-user tutorials

**Cons:**
- Block-only testing (no EDS core context)
- Requires publishing on EDS page
- No CI/CD integration

### Automated Tests (Jest/Mocha)

**Best for:** Regression testing, CI/CD, coverage

**Pros:**
- CI/CD integration
- Regression testing
- Coverage reports
- Fast execution
- Consistent results

**Cons:**
- Setup complexity
- No visual feedback
- Not interactive
- Mocked environments
- No end-user facing

---

## Related Documentation

- **[EDS Native Testing Standards](testing/eds-native-testing-standards.md)** - Traditional test.html approach
- **[Block Architecture Standards](implementation/block-architecture-standards.md)** - Block development patterns
- **[Debug Guide](testing/debug.md)** - Debugging workflows
- **[Jupyter Notebook Skill](.claude/skills/jupyter-notebook-testing.md)** - Claude Code skill

---

## Conclusion

The Jupyter notebook testing system provides **interactive browser-based testing** for EDS blocks with a simple, elegant approach.

### Key Benefits

**Browser-Only Execution:**
- Native browser APIs (`document`, `window`, `fetch`)
- Real DOM manipulation and testing
- No Node.js setup required
- Runs on EDS pages via ipynb-viewer block

**Simple Async Pattern:**
- Write code naturally with `await` and `return`
- No complex IIFE wrappers
- Cell code runs in async context automatically
- Clean, readable test code

**Overlay Previews:**
- Instant visual feedback with styled blocks
- Full-screen overlay with backdrop
- ESC key, backdrop click, or close button to dismiss
- No popup blockers to worry about
- Minimal DOM structure (no wrapper interference)

**Interactive and Shareable:**
- Multiple test scenarios in one file
- Inline markdown documentation
- Executable by end users on EDS pages
- Perfect for tutorials and demos
- No initialization required

**Helper Functions:**
- `testBlock()` - Test block decoration
- `showPreview()` - Generate overlay previews
- Direct ES6 imports - no setup needed

### Recommended Workflow

1. **Develop** in browser with `testBlock()` and `showPreview()`
2. **Preview** with overlays for instant visual feedback
3. **Validate** in test.html for full EDS core context
4. **Share** executable notebooks with end users
5. **Automate** with Jest/Mocha for CI/CD (future)

This approach gives you **speed, simplicity, visual feedback, and shareability** - all with native browser APIs, direct imports, and no initialization required.
