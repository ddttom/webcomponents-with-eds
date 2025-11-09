# Advanced Jupyter Notebook Testing Techniques

Advanced patterns and techniques for testing EDS blocks with Jupyter notebooks.

## Performance Testing

Measure block decoration performance:

```javascript
console.time('block-decoration');
const block = await testBlock('myblock', content);
console.timeEnd('block-decoration');
// Output: block-decoration: 15.234ms
```

## Testing Multiple Variations

Test multiple content variations in parallel:

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

## Generating Test Content

Create content programmatically:

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

## Snapshot Testing

Create HTML snapshots for regression testing:

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

## Before/After Analysis

Analyze transformation impact:

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

## Batch Testing

Test multiple blocks efficiently:

```javascript
async function batchTest(blocks) {
  const results = {};

  for (const [blockName, content] of Object.entries(blocks)) {
    try {
      const block = await testBlock(blockName, content);
      results[blockName] = { success: true, block };
      console.log(`✓ ${blockName}`);
    } catch (error) {
      results[blockName] = { success: false, error: error.message };
      console.log(`✗ ${blockName}: ${error.message}`);
    }
  }

  return results;
}

const testBlocks = {
  'accordion': accordionContent,
  'tabs': tabsContent,
  'cards': cardsContent
};

const results = await batchTest(testBlocks);
```

## Content Validation

Validate block output structure:

```javascript
function validateAccordion(block) {
  const errors = [];

  const details = block.querySelectorAll('details');
  if (details.length === 0) {
    errors.push('No <details> elements found');
  }

  details.forEach((detail, i) => {
    const summary = detail.querySelector('summary');
    if (!summary) {
      errors.push(`Item ${i}: Missing <summary>`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

const block = await testBlock('accordion', content);
const validation = validateAccordion(block);
console.log(validation.valid ? '✓ Valid' : '✗ Invalid:', validation.errors);
```

## Regression Testing

Compare outputs across versions:

```javascript
async function compareVersions(blockName, content, version1Path, version2Path) {
  // Test version 1
  let module1 = await import(version1Path);
  const block1 = global.document.createElement('div');
  block1.className = blockName;
  block1.innerHTML = content;
  await module1.default(block1);
  const html1 = block1.outerHTML;

  // Test version 2
  let module2 = await import(version2Path);
  const block2 = global.document.createElement('div');
  block2.className = blockName;
  block2.innerHTML = content;
  await module2.default(block2);
  const html2 = block2.outerHTML;

  // Compare
  const same = html1 === html2;
  console.log(same ? '✓ Identical' : '✗ Different');

  if (!same) {
    console.log('Size difference:', html2.length - html1.length, 'bytes');
  }

  return { same, html1, html2 };
}
```

## Dynamic Content Generation

Generate realistic test content:

```javascript
function generateRealisticAccordion() {
  const faqs = [
    {
      q: "What is Adobe Edge Delivery Services?",
      a: "Adobe Edge Delivery Services (EDS) is a composable platform for creating high-impact, high-performance websites."
    },
    {
      q: "How do blocks work?",
      a: "Blocks are JavaScript functions that decorate DOM elements, transforming simple HTML into interactive components."
    },
    {
      q: "Why use Jupyter notebooks for testing?",
      a: "Jupyter notebooks provide instant feedback without build steps, making development faster and more interactive."
    }
  ];

  return faqs.map(({q, a}) => `
    <div>
      <div>${q}</div>
      <div>${a}</div>
    </div>
  `).join('');
}

const realisticContent = generateRealisticAccordion();
await saveBlockHTML('accordion', realisticContent, 'accordion-realistic.html');
```

## Test Data Libraries

Create reusable test data:

```javascript
const TestData = {
  accordion: {
    empty: '',
    single: '<div><div>Q</div><div>A</div></div>',
    multiple: `
      <div><div>Q1</div><div>A1</div></div>
      <div><div>Q2</div><div>A2</div></div>
      <div><div>Q3</div><div>A3</div></div>
    `,
    malformed: '<div><div>Q only</div></div>',
    nested: `
      <div>
        <div>Question with <strong>formatting</strong></div>
        <div>Answer with <a href="#">links</a> and <em>emphasis</em></div>
      </div>
    `
  }
};

// Test all variations
for (const [variant, content] of Object.entries(TestData.accordion)) {
  await saveBlockHTML('accordion', content, `accordion-${variant}.html`);
}
```

## Memory Profiling

Track memory usage during testing:

```javascript
if (global.gc) {
  global.gc();
  const before = process.memoryUsage().heapUsed;

  const block = await testBlock('myblock', content);

  global.gc();
  const after = process.memoryUsage().heapUsed;

  const delta = after - before;
  console.log('Memory delta:', (delta / 1024 / 1024).toFixed(2), 'MB');
}
```

## Accessibility Testing

Check for accessibility issues:

```javascript
function checkAccessibility(block) {
  const issues = [];

  // Check for images without alt text
  const images = block.querySelectorAll('img');
  images.forEach((img, i) => {
    if (!img.alt) {
      issues.push(`Image ${i}: Missing alt attribute`);
    }
  });

  // Check for buttons without labels
  const buttons = block.querySelectorAll('button');
  buttons.forEach((btn, i) => {
    if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
      issues.push(`Button ${i}: Missing label`);
    }
  });

  return {
    accessible: issues.length === 0,
    issues
  };
}

const block = await testBlock('myblock', content);
const a11y = checkAccessibility(block);
console.log(a11y.accessible ? '✓ Accessible' : '⚠ Issues:', a11y.issues);
```
