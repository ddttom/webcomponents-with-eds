---
name: jupyter-notebook-testing
description: Create and manage Jupyter notebooks for testing Adobe Edge Delivery Services (EDS) blocks interactively using JavaScript with jsdom and JSLab kernel. Covers notebook creation, testBlock function, saveBlockHTML for styled previews, helper functions, content structure patterns, development workflow with live CSS reload, troubleshooting, and installation. Use when creating notebooks, testing blocks with ipynb files, using jslab kernel, generating HTML previews, or working with interactive block testing.
---

# Jupyter Notebook Testing for EDS Blocks

Interactive testing environment for EDS blocks using Jupyter notebooks with JavaScript (JSLab) and jsdom.

## When to Use This Skill

Use this skill when:
- Creating new Jupyter notebooks (`.ipynb` files) for EDS block testing
- Editing existing notebooks to add test cases
- Setting up interactive testing environments for blocks
- Generating test content or visual previews
- Debugging block behavior with different content structures
- Using `testBlock()`, `saveBlockHTML()`, or other helper functions
- Working with jslab kernel or jsdom virtual DOM
- Documenting block usage with executable examples

## Overview

Test EDS blocks rapidly with Jupyter notebooks using JSLab (JavaScript kernel) and jsdom (virtual DOM). Get instant feedback without servers, deployments, or browser refreshes.

### Key Benefits

- **Instant Feedback**: Test blocks immediately without build steps
- **Content Experimentation**: Try different content structures in seconds
- **Visual Previews**: Generate styled HTML files with live CSS reload
- **VS Code Integration**: Work in your editor without context switching
- **Documentation**: Create executable examples for blocks

### Technology Stack

- **tslab**: Modern JavaScript kernel for Jupyter (no native dependencies)
- **jsdom**: JavaScript implementation of DOM APIs
- **VS Code Jupyter extension**: Notebook editing in your IDE

## Quick Start

### 1. Create or Open Notebook

**Option A: Copy existing template**
```bash
cp test.ipynb my-block-tests.ipynb
# Open in VS Code
```

**Option B: Create from scratch**
- VS Code: Command Palette → "Jupyter: Create New Blank Notebook"
- Select "jslab" kernel
- Copy setup cell from `test.ipynb`

### 2. Run Setup Cell (Always First)

```javascript
// Cell 1: Setup - MUST RUN FIRST
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true
});

// Expose globals
global.document = dom.window.document;
global.window = dom.window;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;
global.customElements = dom.window.customElements;
global.CustomEvent = dom.window.CustomEvent;
global.Event = dom.window.Event;

// Helper functions (testBlock, saveBlockHTML, loadBlockStyles)
// ... (copy full setup from test.ipynb)
```

### 3. Test Your Block

```javascript
// Cell 2: Simple test
const block = await testBlock('myblock');
block.outerHTML
```

```javascript
// Cell 3: Test with content
const content = `
  <div>
    <div>Test content</div>
  </div>
`;
const block = await testBlock('myblock', content);
console.log('Children:', block.children.length);
```

```javascript
// Cell 4: Generate styled preview
await saveBlockHTML('myblock', content);
// Open ipynb-tests/myblock-preview.html in browser
```

## Helper Functions

### testBlock(blockName, innerHTML?)

Tests a block and returns the decorated DOM element.

**Parameters:**
- `blockName` (string): Block name matching folder name
- `innerHTML` (string, optional): HTML content to test with

**Returns:** Decorated block as DOM element

**Example:**
```javascript
const block = await testBlock('accordion', '<div>content</div>');
console.log(block.outerHTML);
```

### saveBlockHTML(blockName, innerHTML?, filename?)

Generates a styled HTML preview file in `ipynb-tests/` directory.

**Parameters:**
- `blockName` (string): Block name
- `innerHTML` (string, optional): HTML content
- `filename` (string, optional): Custom filename (defaults to `blockname-preview.html`)

**Returns:** Path to saved file

**Key Feature:** Links to actual CSS files instead of embedding them, enabling live reload workflow.

**Example:**
```javascript
// Saves to ipynb-tests/accordion-preview.html
await saveBlockHTML('accordion', content);

// Custom filename
await saveBlockHTML('accordion', content, 'my-test.html');
```

### loadBlockStyles(blockName)

Loads CSS for a block into the virtual DOM.

**Parameters:**
- `blockName` (string): Block name

**Returns:** CSS content string or null

**Note:** Usually called automatically by `testBlock()` and `saveBlockHTML()`.

## Notebook Structure

Recommended cell organization:

1. **Title & Introduction** (Markdown)
   - Explain what's being tested
   - Add important warnings or notes

2. **Setup Cell** (Code, always first)
   - Initialize jsdom environment
   - Define helper functions
   - Create output directory
   - Must run before any other cells

3. **Simple Tests** (Code + Markdown)
   - Start with basic examples
   - Test blocks without complex content

4. **Content Structure Tests** (Code + Markdown)
   - Test blocks with various content structures
   - Test edge cases
   - One block per section

5. **Visual Output** (Code)
   - Generate HTML files for browser viewing
   - Test interactive features

6. **Reference Section** (Markdown)
   - Quick reminders of helper functions
   - Useful code snippets

## Development Workflow

### Typical Session

```bash
# 1. Edit block code
code blocks/myblock/myblock.js

# 2. Test in notebook (VS Code)
# Open test.ipynb and run test cell

# 3. See styled version
# Run saveBlockHTML() cell
# Open ipynb-tests/myblock-preview.html

# 4. Tweak CSS
# Edit blocks/myblock/myblock.css
# Just refresh browser (CSS is linked!)

# 5. Adjust JavaScript
# Edit blocks/myblock/myblock.js
# Rerun notebook cell (Shift+Enter)

# 6. Commit when ready
git add blocks/myblock/
git commit -m "Add myblock"
```

## CSS Linking Strategy

The implementation links to actual CSS files instead of embedding them:

```html
<!-- Global EDS Styles -->
<link rel="stylesheet" href="../styles/styles.css">
<link rel="stylesheet" href="../styles/fonts.css">
<link rel="stylesheet" href="../styles/lazy-styles.css">

<!-- Block-specific styles -->
<link rel="stylesheet" href="../blocks/accordion/accordion.css">
```

**Benefits:**
- Edit CSS, refresh browser - no regeneration needed
- Small file sizes (~2KB vs ~100KB)
- Matches production EDS structure
- Browser caching works
- Easy debugging

## Project Structure

```
your-project/
├── test.ipynb                    # Main testing notebook
├── ipynb-tests/                  # Generated HTML previews
│   ├── accordion-preview.html    # Links to ../styles/*.css
│   ├── tabs-preview.html         # Links to ../blocks/*/*.css
│   └── myblock-preview.html
├── styles/                       # Global EDS styles
│   ├── styles.css                # Core styles (linked in previews)
│   ├── fonts.css                 # Font declarations (linked)
│   └── lazy-styles.css           # Lazy styles (linked)
├── blocks/                       # Your EDS blocks
│   ├── accordion/
│   │   ├── accordion.js
│   │   └── accordion.css         # Linked from preview HTML
│   └── myblock/
│       ├── myblock.js
│       └── myblock.css
└── package.json                  # Dependencies (jsdom)
```

## Limitations

### What Doesn't Work

- **Interactive features in notebook output**: Button clicks, form submissions won't work in raw notebook output (use `saveBlockHTML()` to test in browser)
- **Web Components**: Limited support in jsdom (stick with vanilla EDS blocks)
- **Advanced browser APIs**: If jsdom doesn't support it, neither does this environment
- **Styling in notebook**: Raw HTML only in notebook output (use `saveBlockHTML()` for styled previews)

### Workarounds

- Save HTML files and test in real browser for interactive features
- Check `customElements` availability before testing Web Component blocks
- Use browser for animation testing and cross-browser issues

## Best Practices

### Writing Good Tests

```javascript
// ✅ Good: Clear explanation and expectations
// Testing accordion with 3 Q&A pairs
// Expected: Should create 3 <details> elements
const content = `
  <div>
    <div>What is EDS?</div>
    <div>Edge Delivery Services...</div>
  </div>
  <div>
    <div>How does it work?</div>
    <div>It transforms content...</div>
  </div>
  <div>
    <div>Why test in notebooks?</div>
    <div>Instant feedback...</div>
  </div>
`;

const block = await testBlock('accordion', content);
console.log('Created sections:', block.querySelectorAll('details').length);

// ❌ Bad: No context, cryptic variable names
const x = '<div><div>Q</div><div>A</div></div>';
await testBlock('accordion', x);
```

### Organizing Notebooks

- Use descriptive filenames: `form-validation-tests.ipynb`, not `test2.ipynb`
- Start with clear Markdown introduction
- Explain what each test does and why
- Keep one block per section
- Mix Markdown and Code cells for readability

### Error Handling

```javascript
try {
  const block = await testBlock('myblock', content);
  console.log('✓ Success:', block.outerHTML.substring(0, 100));
} catch (error) {
  console.error('✗ Failed:', error.message);
  console.log('This block may need a real browser for testing');
}
```

## When to Use Notebooks

### ✅ Use Notebooks For

- Quick validation before committing
- Trying different content structures
- Debugging edge cases
- Exploring block transformation behavior
- Creating documentation examples
- Rapid prototyping
- Testing blocks in isolation

### ❌ Don't Use For

- Complex interactive features (test in real browser)
- Animation testing (browser is better)
- Cross-browser issues (need real browsers)
- Full integration testing (use real site)
- Web Components with complex lifecycle (jsdom limitations)

## Integration with Development Workflow

Notebooks complement but don't replace traditional development:

1. **Design**: Plan block structure and content model
2. **Prototype**: Quick tests in notebook for basic functionality
3. **Implement**: Write actual block code
4. **Test in notebook**: Verify core transformation logic
5. **Test in browser**: Check styling and interactivity
6. **Integration test**: Test on real site
7. **Commit**: Version control everything

## Reference Files

For detailed information, see:

- **[INSTALLATION.md](INSTALLATION.md)** - Complete setup guide with one-time installation steps for tslab, Jupyter, jsdom, and VS Code extension
- **[EXAMPLES.md](EXAMPLES.md)** - Content structure patterns and complete testing examples for accordion, tabs, cards, hero, and other blocks
- **[ADVANCED_TECHNIQUES.md](ADVANCED_TECHNIQUES.md)** - Performance testing, snapshot testing, batch testing, validation patterns, and advanced workflows
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Solutions for kernel issues, module errors, path problems, styling issues, and platform-specific gotchas

## Quick Reference

### Create Notebook Template

```markdown
# [Block Name] Testing

This notebook tests the [block name] block with various content structures.

**Run Cell 1 first** to initialize the environment.

## What's Tested
- Feature 1
- Feature 2
- Edge cases
```

### Common Commands

```javascript
// Basic test
const block = await testBlock('blockname');

// Test with content
const block = await testBlock('blockname', htmlContent);

// Generate preview
await saveBlockHTML('blockname', htmlContent);

// Custom preview name
await saveBlockHTML('blockname', htmlContent, 'custom-name.html');
```

### Keyboard Shortcuts (VS Code)

- **Shift+Enter**: Run cell and move to next
- **Cmd/Ctrl+Enter**: Run cell and stay
- **A**: Insert cell above
- **B**: Insert cell below
- **DD**: Delete cell
- **M**: Change to Markdown
- **Y**: Change to Code

## Summary

Jupyter notebooks with JSLab provide a powerful, interactive testing environment for EDS blocks that:

- Eliminates server and build overhead
- Provides instant feedback on block behavior
- Generates styled previews with live CSS reload
- Integrates seamlessly with VS Code
- Documents block usage with executable examples
- Accelerates the development feedback loop

The key innovations are the CSS linking strategy (enabling live reload), proper EDS structure in generated files, developer-friendly helper functions, and complete VS Code integration.

Use this skill whenever you need to rapidly test, debug, or document EDS blocks without the ceremony of full development environments.

---

**Skill Status**: ✅ Complete - Following Anthropic 500-line rule
**Line Count**: < 500 lines
**Progressive Disclosure**: Detailed content in reference files
