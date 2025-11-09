# Jupyter Notebook Testing Examples

Complete examples and patterns for testing EDS blocks with Jupyter notebooks.

## Table of Contents

- [Quick Start Examples](#quick-start-examples)
- [Content Structure Patterns](#content-structure-patterns)
- [Block-Specific Examples](#block-specific-examples)
- [Testing Workflows](#testing-workflows)
- [Best Practices Examples](#best-practices-examples)

## Quick Start Examples

### Basic Block Test

```javascript
// Simple test without content
const block = await testBlock('helloworld');
block.outerHTML
```

### Test with Content

```javascript
// Test with HTML content
const content = `
  <div>
    <div>Test content</div>
  </div>
`;
const block = await testBlock('accordion', content);
block.outerHTML
```

### Generate Visual Preview

```javascript
// Save styled HTML file
await saveBlockHTML('accordion', content);
// Open ipynb-tests/accordion-preview.html in browser
```

## Content Structure Patterns

### Accordion Block

```javascript
const accordionContent = `
  <div>
    <div>What is EDS?</div>
    <div>Edge Delivery Services is Adobe's modern platform for creating high-performance websites.</div>
  </div>
  <div>
    <div>How do blocks work?</div>
    <div>Blocks transform DOM elements using JavaScript decoration patterns.</div>
  </div>
  <div>
    <div>Why use notebooks?</div>
    <div>Jupyter notebooks provide instant feedback without build steps or deployments.</div>
  </div>
`;

const block = await testBlock('accordion', accordionContent);
console.log('Created sections:', block.querySelectorAll('details').length);
await saveBlockHTML('accordion', accordionContent);
```

### Tabs Block

```javascript
const tabsContent = `
  <div>
    <div>Overview</div>
    <div>
      <h3>Getting Started</h3>
      <p>Welcome to EDS blocks development.</p>
    </div>
  </div>
  <div>
    <div>Features</div>
    <div>
      <h3>Key Features</h3>
      <ul>
        <li>Fast performance</li>
        <li>Easy authoring</li>
        <li>Composable blocks</li>
      </ul>
    </div>
  </div>
  <div>
    <div>Examples</div>
    <div>
      <h3>Code Examples</h3>
      <pre>export default function decorate(block) { ... }</pre>
    </div>
  </div>
`;

const block = await testBlock('tabs', tabsContent);
await saveBlockHTML('tabs', tabsContent);
```

### Cards Block

```javascript
const cardsContent = `
  <div>
    <div>
      <picture>
        <source type="image/webp" srcset="image1.webp">
        <img src="image1.jpg" alt="Feature 1" width="300" height="200">
      </picture>
    </div>
    <div>
      <h3>Fast Performance</h3>
      <p>Lightning-fast page loads with optimized delivery.</p>
      <p><a href="/learn-more">Learn more</a></p>
    </div>
  </div>
  <div>
    <div>
      <picture>
        <source type="image/webp" srcset="image2.webp">
        <img src="image2.jpg" alt="Feature 2" width="300" height="200">
      </picture>
    </div>
    <div>
      <h3>Easy Authoring</h3>
      <p>Author content in familiar tools like Google Docs.</p>
      <p><a href="/docs">Documentation</a></p>
    </div>
  </div>
  <div>
    <div>
      <picture>
        <source type="image/webp" srcset="image3.webp">
        <img src="image3.jpg" alt="Feature 3" width="300" height="200">
      </picture>
    </div>
    <div>
      <h3>Composable Blocks</h3>
      <p>Build pages from reusable block components.</p>
      <p><a href="/blocks">Browse blocks</a></p>
    </div>
  </div>
`;

const block = await testBlock('cards', cardsContent);
console.log('Created cards:', block.querySelectorAll('.card').length);
await saveBlockHTML('cards', cardsContent);
```

### Hero Block

```javascript
const heroContent = `
  <div>
    <div>
      <h1>Welcome to EDS</h1>
      <p>Build blazing-fast websites with Adobe Edge Delivery Services.</p>
      <p><a href="/get-started">Get Started</a></p>
    </div>
    <div>
      <picture>
        <source type="image/webp" srcset="hero.webp">
        <img src="hero.jpg" alt="Hero image" width="1200" height="600">
      </picture>
    </div>
  </div>
`;

const block = await testBlock('hero', heroContent);
await saveBlockHTML('hero', heroContent);
```

### Columns Block

```javascript
const columnsContent = `
  <div>
    <div>
      <h3>Column 1</h3>
      <p>First column content with text and formatting.</p>
    </div>
    <div>
      <h3>Column 2</h3>
      <p>Second column with different content.</p>
    </div>
    <div>
      <h3>Column 3</h3>
      <p>Third column completes the layout.</p>
    </div>
  </div>
`;

const block = await testBlock('columns', columnsContent);
await saveBlockHTML('columns', columnsContent);
```

## Block-Specific Examples

### Form Block

```javascript
const formContent = `
  <div>
    <div>
      <label>Name</label>
      <input type="text" name="name" required>
    </div>
    <div>
      <label>Email</label>
      <input type="email" name="email" required>
    </div>
    <div>
      <label>Message</label>
      <textarea name="message" rows="5"></textarea>
    </div>
    <div>
      <button type="submit">Send</button>
    </div>
  </div>
`;

const block = await testBlock('form', formContent);
console.log('Form fields:', block.querySelectorAll('input, textarea').length);
await saveBlockHTML('form', formContent, 'form-contact.html');
```

### Quote Block

```javascript
const quoteContent = `
  <div>
    <div>
      <p>The best way to predict the future is to invent it.</p>
      <p>— Alan Kay</p>
    </div>
  </div>
`;

const block = await testBlock('quote', quoteContent);
await saveBlockHTML('quote', quoteContent);
```

### Table Block

```javascript
const tableContent = `
  <div>
    <div>
      <div>Feature</div>
      <div>Basic</div>
      <div>Pro</div>
      <div>Enterprise</div>
    </div>
    <div>
      <div>Storage</div>
      <div>10 GB</div>
      <div>100 GB</div>
      <div>Unlimited</div>
    </div>
    <div>
      <div>Users</div>
      <div>1</div>
      <div>10</div>
      <div>Unlimited</div>
    </div>
    <div>
      <div>Support</div>
      <div>Email</div>
      <div>Priority</div>
      <div>24/7 Phone</div>
    </div>
  </div>
`;

const block = await testBlock('table', tableContent);
await saveBlockHTML('table', tableContent);
```

## Testing Workflows

### Complete Test Session

```javascript
// 1. Test basic structure
const block = await testBlock('accordion');
console.log('Basic test:', block.className);

// 2. Test with content
const content = accordionContent;  // Define your content
const contentBlock = await testBlock('accordion', content);
console.log('Items:', contentBlock.querySelectorAll('details').length);

// 3. Generate preview
await saveBlockHTML('accordion', content);

// 4. Test variations
await saveBlockHTML('accordion', emptyContent, 'accordion-empty.html');
await saveBlockHTML('accordion', singleItem, 'accordion-single.html');
await saveBlockHTML('accordion', manyItems, 'accordion-many.html');

// 5. Verify structure
const details = contentBlock.querySelectorAll('details');
details.forEach((detail, i) => {
  console.log(`Item ${i}:`, detail.querySelector('summary')?.textContent);
});
```

### Edge Case Testing

```javascript
// Empty content
const empty = '';
const emptyBlock = await testBlock('accordion', empty);
console.log('Empty:', emptyBlock.children.length);

// Single item
const single = '<div><div>Q</div><div>A</div></div>';
const singleBlock = await testBlock('accordion', single);
console.log('Single:', singleBlock.querySelectorAll('details').length);

// Malformed content
const malformed = '<div><div>Q only</div></div>';
const malformedBlock = await testBlock('accordion', malformed);
console.log('Malformed:', malformedBlock.outerHTML.substring(0, 100));

// Nested HTML
const nested = `
  <div>
    <div>Question with <strong>bold</strong> text</div>
    <div>Answer with <a href="#">links</a> and <em>emphasis</em></div>
  </div>
`;
const nestedBlock = await testBlock('accordion', nested);
await saveBlockHTML('accordion', nested, 'accordion-nested.html');
```

### Multiple Blocks in Sequence

```javascript
// Test multiple blocks
const blocks = ['accordion', 'tabs', 'cards', 'hero'];

for (const blockName of blocks) {
  try {
    const block = await testBlock(blockName);
    console.log(`✓ ${blockName}: ${block.children.length} children`);
    await saveBlockHTML(blockName, '', `${blockName}-default.html`);
  } catch (error) {
    console.error(`✗ ${blockName}: ${error.message}`);
  }
}
```

## Best Practices Examples

### Good Test with Clear Expectations

```javascript
// ✅ Good: Clear explanation and expectations

// Testing accordion with 3 Q&A pairs
// Expected: Should create 3 <details> elements with <summary> headers

const content = `
  <div>
    <div>What is EDS?</div>
    <div>Edge Delivery Services is a composable platform for creating high-performance websites.</div>
  </div>
  <div>
    <div>How does it work?</div>
    <div>It transforms simple HTML content into interactive blocks using JavaScript decoration.</div>
  </div>
  <div>
    <div>Why test in notebooks?</div>
    <div>Jupyter notebooks provide instant feedback without build steps or browser refreshes.</div>
  </div>
`;

const block = await testBlock('accordion', content);

// Verify expectations
const details = block.querySelectorAll('details');
console.log('✓ Created sections:', details.length, '(expected: 3)');

details.forEach((detail, i) => {
  const summary = detail.querySelector('summary');
  console.log(`✓ Section ${i + 1}: "${summary?.textContent}"`);
});

// Save for visual inspection
await saveBlockHTML('accordion', content, 'accordion-3-sections.html');
```

### Bad Test (No Context)

```javascript
// ❌ Bad: No context, cryptic variable names, no verification

const x = '<div><div>Q</div><div>A</div></div>';
const b = await testBlock('accordion', x);
b.outerHTML
```

### Organized Test Notebook Structure

```markdown
# Accordion Block Testing

Testing the accordion block with various content structures and edge cases.

**Run Cell 1 first** to initialize the environment.

## What's Tested
- Empty accordion
- Single item accordion
- Multiple items (2, 3, 5, 10)
- Nested HTML in questions/answers
- Malformed content handling
- Very long content
```

```javascript
// Cell 1: Setup (always first)
const { JSDOM } = require('jsdom');
// ... full setup code ...
```

```javascript
// Cell 2: Test empty accordion
const empty = '';
const emptyBlock = await testBlock('accordion', empty);
console.log('Empty result:', emptyBlock.children.length, 'children');
```

```javascript
// Cell 3: Test single item
const single = '<div><div>Question</div><div>Answer</div></div>';
const singleBlock = await testBlock('accordion', single);
console.log('Single item:', singleBlock.querySelectorAll('details').length, 'details');
await saveBlockHTML('accordion', single, 'accordion-single.html');
```

### Error Handling Example

```javascript
// ✅ Good: Handle potential errors

try {
  const block = await testBlock('myblock', content);
  console.log('✓ Success');
  console.log('  Children:', block.children.length);
  console.log('  Classes:', block.className);
  console.log('  Preview:', block.outerHTML.substring(0, 100) + '...');

  await saveBlockHTML('myblock', content);
  console.log('✓ Saved preview to ipynb-tests/myblock-preview.html');
} catch (error) {
  console.error('✗ Failed:', error.message);
  console.log('💡 Tip: This block may need a real browser for testing');
  console.log('   Stack:', error.stack);
}
```

### Documentation Example

```markdown
## Accordion Block Results

### Structure
The accordion block transforms a list of Q&A pairs into HTML `<details>` elements.

### Input Format
```html
<div>
  <div>Question</div>
  <div>Answer</div>
</div>
```

### Output Format
```html
<details>
  <summary>Question</summary>
  <div>Answer</div>
</details>
```

### Test Results
- ✅ Empty content: Handles gracefully (0 details)
- ✅ Single item: Creates 1 detail element
- ✅ Multiple items: Creates correct number of details
- ✅ Nested HTML: Preserves formatting
- ⚠️  Malformed content: May create incomplete details
```

## CSS Testing Workflow

```javascript
// 1. Generate initial preview
await saveBlockHTML('accordion', content, 'accordion-v1.html');

// 2. Edit CSS file
// Open blocks/accordion/accordion.css in editor
// Make changes...

// 3. Refresh browser (Cmd+Shift+R)
// CSS is linked, so changes appear immediately!

// 4. No need to regenerate HTML or rerun notebook cells
// This is the power of linked CSS instead of embedded CSS

console.log('💡 Edit CSS, refresh browser - no regeneration needed!');
```

## Complete Example Notebook Flow

```markdown
# Complete Testing Session: Accordion Block
Testing accordion functionality end-to-end.
```

```javascript
// Setup
const { JSDOM } = require('jsdom');
// ... full setup ...
```

```javascript
// Define test content
const testContent = `
  <div>
    <div>What is EDS?</div>
    <div>Adobe Edge Delivery Services platform.</div>
  </div>
  <div>
    <div>How to use?</div>
    <div>Create blocks with JavaScript decoration.</div>
  </div>
`;
```

```javascript
// Test transformation
const block = await testBlock('accordion', testContent);
console.log('✓ Block created');
console.log('  Details elements:', block.querySelectorAll('details').length);
```

```javascript
// Generate styled preview
await saveBlockHTML('accordion', testContent);
console.log('✓ Preview saved');
console.log('→ Open ipynb-tests/accordion-preview.html');
```

```markdown
## Results
- Block creates 2 `<details>` elements ✓
- Each has proper `<summary>` ✓
- Content preserved ✓
- Preview available at `ipynb-tests/accordion-preview.html` ✓

## Next Steps
- Edit `blocks/accordion/accordion.css` to adjust styling
- Refresh browser to see CSS changes
- Test with more complex content
```
