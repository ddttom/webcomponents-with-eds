# Jupyter Notebook Testing for EDS Blocks

Guide for creating and managing Jupyter notebooks for testing Adobe Edge Delivery Services (EDS) blocks interactively using JavaScript.

## When to Use This Skill

Use this skill when:
- Creating new Jupyter notebooks for EDS block testing
- Editing existing notebooks to add new test cases
- Setting up interactive testing environments for blocks
- Generating test content for blocks
- Creating visual previews of decorated blocks
- Debugging block behavior with different content structures
- Documenting block usage with executable examples

## Overview

This skill enables rapid, interactive testing of EDS blocks using Jupyter notebooks with JSLab (JavaScript kernel) and jsdom (virtual DOM). This approach provides instant feedback without servers, deployments, or browser refreshes.

### Key Benefits
- **Instant Feedback**: Test blocks immediately without build steps
- **Content Experimentation**: Try different content structures in seconds
- **Visual Previews**: Generate styled HTML files with live CSS reload
- **VS Code Integration**: Work in your editor without context switching
- **Documentation**: Create executable examples for blocks

## Technical Foundation

### Stack
- **tslab**: Modern JavaScript kernel for Jupyter (no native dependencies)
- **jsdom**: JavaScript implementation of DOM APIs
- **VS Code Jupyter extension**: Notebook editing in your IDE

### Environment Setup

The setup initializes a virtual DOM environment that mimics a browser:

```javascript
const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true  // Enables getComputedStyle() and visual APIs
});

// Expose globals for block code
global.document = dom.window.document;
global.window = dom.window;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;
global.customElements = dom.window.customElements;
global.CustomEvent = dom.window.CustomEvent;
global.Event = dom.window.Event;
```

## Helper Functions

### testBlock(blockName, innerHTML)
Tests a block and returns the decorated DOM element.

**Parameters:**
- `blockName` (string): Block name (matches folder name)
- `innerHTML` (string, optional): HTML content to test with

**Returns:** Decorated block as DOM element

**Example:**
```javascript
const block = await testBlock('accordion', '<div>content</div>');
console.log(block.outerHTML);
```

### saveBlockHTML(blockName, innerHTML, filename?)
Generates a styled HTML preview file in the `ipynb-tests/` directory.

**Parameters:**
- `blockName` (string): Block name
- `innerHTML` (string, optional): HTML content
- `filename` (string, optional): Custom filename (defaults to `blockname-preview.html`)

**Returns:** Path to saved file

**Key Innovation:** Links to actual CSS files instead of embedding them, enabling live reload workflow.

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

### Standard Cell Organization

1. **Title & Introduction** (Markdown)
   - Explain what's being tested
   - Add important warnings or notes

2. **Setup Cell** (Code, always first)
   - Initialize jsdom environment
   - Define helper functions
   - Create output directory
   - Must run before any other cells

3. **Simple Tests** (Code with Markdown explanations)
   - Start with basic examples
   - Test blocks without complex content

4. **Content Structure Tests** (Code with Markdown explanations)
   - Test blocks with various content structures
   - Test edge cases
   - One block per section

5. **Visual Output Examples** (Code)
   - Generate HTML files for browser viewing
   - Test interactive features

6. **Reference Section** (Markdown)
   - Quick reminders of helper functions
   - Useful code snippets

## Creating Notebooks

### Option 1: Copy and Customize (Recommended)
```bash
cp test.ipynb my-custom-tests.ipynb
# Open in VS Code and modify
```

### Option 2: Create from Scratch

1. In VS Code: Command Palette → "Jupyter: Create New Blank Notebook"
2. Select "jslab" kernel
3. Add setup cell (copy from test.ipynb Cell 1)
4. Add test cells

### Notebook Template

```markdown
# [Block Name] Testing

This notebook tests the [block name] block with various content structures.

**Run Cell 1 first** to initialize the environment.

## What's Tested
- Feature 1
- Feature 2
- Edge cases
```

```javascript
// Cell 1: Setup (copy entire setup from test.ipynb)
const { JSDOM } = require('jsdom');
// ... (full setup code)
```

```javascript
// Cell 2: Basic test
const block = await testBlock('myblock');
block.outerHTML
```

```javascript
// Cell 3: Content structure test
const content = `
  <div>
    <div>Test content</div>
  </div>
`;
const block = await testBlock('myblock', content);
block.outerHTML
```

```javascript
// Cell 4: Save visual preview
await saveBlockHTML('myblock', content);
// Open ipynb-tests/myblock-preview.html in browser
```

## Content Structure Patterns

### Accordion Block
```javascript
const accordionContent = `
  <div>
    <div>Question 1</div>
    <div>Answer 1 with detailed content.</div>
  </div>
  <div>
    <div>Question 2</div>
    <div>Answer 2 with detailed content.</div>
  </div>
`;
```

### Tabs Block
```javascript
const tabsContent = `
  <div>
    <div>Tab 1</div>
    <div>Content for tab 1</div>
  </div>
  <div>
    <div>Tab 2</div>
    <div>Content for tab 2</div>
  </div>
`;
```

### Cards Block
```javascript
const cardsContent = `
  <div>
    <div><picture><img src="image1.jpg" alt="Card 1"></picture></div>
    <div><h3>Title 1</h3><p>Description 1</p></div>
  </div>
  <div>
    <div><picture><img src="image2.jpg" alt="Card 2"></picture></div>
    <div><h3>Title 2</h3><p>Description 2</p></div>
  </div>
`;
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

## Advanced Techniques

### Performance Testing
```javascript
console.time('block-decoration');
const block = await testBlock('myblock', content);
console.timeEnd('block-decoration');
// Output: block-decoration: 15.234ms
```

### Testing Multiple Variations
```javascript
async function testVariations(blockName, contentArray) {
  return Promise.all(
    contentArray.map((content, i) =>
      saveBlockHTML(blockName, content, `${blockName}-variation-${i}.html`)
    )
  );
}

await testVariations('accordion', [
  '<div><div>Test 1</div><div>Content 1</div></div>',
  '<div><div>Test 2</div><div>Content 2</div></div>',
  '<div><div>Test 3</div><div>Content 3</div></div>',
]);
```

### Generating Test Content
```javascript
function generateAccordionContent(numItems) {
  const items = Array.from({ length: numItems }, (_, i) => `
    <div>
      <div>Question ${i + 1}</div>
      <div>This is answer ${i + 1} with test content.</div>
    </div>
  `).join('');
  return items;
}

// Test with different sizes
await saveBlockHTML('accordion', generateAccordionContent(3), 'accordion-3-items.html');
await saveBlockHTML('accordion', generateAccordionContent(10), 'accordion-10-items.html');
```

### Snapshot Testing
```javascript
async function createSnapshot(blockName, content, snapshotName) {
  const block = await testBlock(blockName, content);
  const html = block.outerHTML;

  const fs = await import('fs/promises');
  const path = await import('path');
  const snapshotPath = path.resolve(`./ipynb-tests/snapshots/${snapshotName}.html`);

  await fs.mkdir(path.dirname(snapshotPath), { recursive: true });
  await fs.writeFile(snapshotPath, html, 'utf-8');

  console.log(`✓ Snapshot saved: ${snapshotName}`);
  return html;
}

await createSnapshot('accordion', testContent, 'accordion-baseline');
```

### Before/After Analysis
```javascript
const block = global.document.createElement('div');
block.className = 'accordion';
block.innerHTML = content;

const before = block.innerHTML;
const beforeSize = new Blob([before]).size;

// Decorate
const module = await import('./blocks/accordion/accordion.js');
await module.default(block);

const after = block.innerHTML;
const afterSize = new Blob([after]).size;

console.log('Original:', beforeSize, 'bytes');
console.log('Transformed:', afterSize, 'bytes');
console.log('Size ratio:', (afterSize / beforeSize).toFixed(2) + 'x');
```

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

## Troubleshooting

### JSLab Kernel Not Available
```bash
npm install -g tslab
tslab install --python=python3
jupyter kernelspec list  # Should show jslab
# Restart VS Code: Command Palette → "Developer: Reload Window"
```

### Can't Find Modules
Make sure VS Code is opened from project root:
```bash
cd /path/to/project/
code .
```

### TypeScript Errors About 'document'
This is expected. Use `global.document` to avoid TypeScript compile-time warnings:
```javascript
// ✅ Works at runtime
const div = global.document.createElement('div');

// ❌ Causes TypeScript warning (but works at runtime)
const div = document.createElement('div');
```

### Module Not Found Errors
Use `path.resolve()` for dynamic imports:
```javascript
// ✅ Correct - absolute path
const path = await import('path');
const modulePath = path.resolve('./blocks/myblock/myblock.js');
const module = await import(modulePath);

// ❌ Incorrect - relative path
const module = await import('../blocks/myblock/myblock.js');
```

### Web Components Not Working
Check availability and fallback to browser testing:
```javascript
if (global.customElements) {
  console.log('Custom elements supported');
} else {
  console.log('Custom elements not available - use saveBlockHTML() and test in browser');
  await saveBlockHTML('myblock', content);
}
```

## Installation Requirements

### One-Time Setup

```bash
# 1. Install jsdom (project dependency)
npm install jsdom

# 2. Install Jupyter
pip3 install jupyter
# Or: conda install jupyter

# 3. Install tslab globally
npm install -g tslab

# 4. Register tslab with Jupyter
tslab install --python=python3

# 5. Verify installation
jupyter kernelspec list
# Should show: jslab

# 6. Install VS Code Jupyter extension
code --install-extension ms-toolsai.jupyter
```

### Verify Setup
```bash
# Check Node.js
node -v

# Check Jupyter
jupyter --version

# Check tslab is registered
jupyter kernelspec list

# Open VS Code from project root
code .
```

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

### Sharing Notebooks
```bash
# Use clear names
git add form-validation-tests.ipynb

# Test from clean state first
# VS Code: Command Palette → "Jupyter: Restart Kernel and Run All Cells"

# Commit with context
git commit -m "Add form validation test notebook"
```

## Usage Examples

### Quick Block Test
```javascript
// Simple test
const block = await testBlock('helloworld');
block.outerHTML
```

### Testing with Content
```javascript
// Test accordion block
const accordionContent = `
  <div>
    <div>What is EDS?</div>
    <div>Edge Delivery Services is Adobe's modern platform.</div>
  </div>
  <div>
    <div>How do blocks work?</div>
    <div>Blocks transform DOM elements using JavaScript.</div>
  </div>
`;

const block = await testBlock('accordion', accordionContent);
console.log('Created sections:', block.querySelectorAll('details').length);
```

### Generating Styled Previews
```javascript
// Save for browser viewing
await saveBlockHTML('accordion', accordionContent);
// Opens ipynb-tests/accordion-preview.html

// Edit blocks/accordion/accordion.css
// Refresh browser to see changes (CSS is linked!)
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
