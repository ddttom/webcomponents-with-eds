# Creating Raw EDS Blocks
## The Simple, EDS-Native Approach

**Related Documentation:** [Block Architecture Standards](block-architecture-standards.md) | [EDS Overview](../eds.md) | [Complex EDS Blocks Guide](complex-eds-blocks-guide.md) | [Debug Guide](../testing/debug.md)

This guide demonstrates how to create effective EDS blocks using **vanilla JavaScript**, **minimal dependencies**, and **additive enhancement** patterns that preserve content and follow EDS philosophy.

## **🔒 Critical EDS Constraint: Block Names Are Fixed**

> **Critical EDS Constraint:** EDS requires exact file name matching - block names in HTML must match JavaScript file names exactly. See [Block Architecture Standards](block-architecture-standards.md#file-naming-conventions) for complete details on this constraint and the dual-directory architecture solution.

**Quick summary:** When HTML contains `<div class="highlight-text">`, EDS automatically imports `/blocks/highlight-text/highlight-text.js` - you cannot change this path. This constraint affects every decision in EDS block development.

## **Understanding EDS HTML States** 📄

> **Understanding HTML States:** EDS transforms served HTML into rendered HTML through decoration. See [Design Philosophy Guide](design-philosophy-guide.md#understanding-served-vs-rendered-html) for the complete explanation of this two-phase process.

**Quick summary:** Your `decorate` function receives RENDERED HTML with nested `<div><div>` structure and EDS attributes. Use `block.querySelector('div div')` to extract content.

### **Two Test Files (When Needed)**

Complex blocks sometimes include both:
```
/blocks/highlight-text/
├── test.html              # 🎯 Standard: Tests rendered HTML
└── test2.html             # 📄 Optional: Tests served HTML edge cases
```

**Most blocks only need `test.html`** - but `test2.html` helps validate EDS processing works correctly.

## Quick Start: Your First Block

### 1. Create the Block Structure

```
/blocks/highlight-text/
├── highlight-text.js       # Core functionality
├── highlight-text.css      # Styling
├── test.html              # 🧪 EDS test file (for EDS debug server)
├── README.md              # Documentation
└── example.md             # Author examples
```

### **About the `test.html` File**

**Why `test.html` and not `index.html`?**

For simple EDS blocks, we use `test.html` because:
- **EDS Testing**: Specifically for testing with EDS debug server (`npm run debug`)
- **No Auto-Serving**: Must navigate to `http://localhost:3000/blocks/highlight-text/test.html`
- **EDS Structure**: Tests actual EDS block structure and decoration
- **Production Assets**: EDS debug server automatically proxies missing assets to your production site
- **No Conflicts**: Doesn't interfere with any build tools that expect `index.html`

**🔄 EDS Server Proxy Benefit:**
```
Request: http://localhost:3000/media/image.jpg
Proxied: https://your-production-site.com/media/image.jpg
Result:  Your simple blocks can use real production assets during testing
```

**Note**: Complex build components use both:
- `index.html` for development (Vite auto-serves with its own proxy)
- `test.html` for EDS integration testing (EDS server proxy)

### 2. Basic JavaScript Implementation

```javascript
// blocks/highlight-text/highlight-text.js

/**
 * Configuration constants - centralize all settings
 */
const HIGHLIGHT_CONFIG = {
  MARKER_PATTERN: /\*\*(.*?)\*\*/g,
  HIGHLIGHT_CLASS: 'highlight-text-mark',
  ERROR_MESSAGE: 'Could not process text highlighting',
  ANIMATION_DELAY: 100
};

/**
 * Extract content from EDS nested structure
 * This follows the same pattern as the columns block
 */
function extractTextContent(block) {
  // Strategy 1: Check nested EDS structure (most reliable)
  const nestedDiv = block.querySelector('div div');
  if (nestedDiv?.textContent?.trim()) {
    return nestedDiv.textContent.trim();
  }

  // Strategy 2: Check direct text content
  const directText = block.textContent?.trim();
  if (directText) {
    return directText;
  }

  // Strategy 3: No content found
  return '';
}

/**
 * Process text for highlighting without destroying DOM structure
 */
function processHighlighting(element, text) {
  try {
    // Only process if we have marker syntax
    if (!HIGHLIGHT_CONFIG.MARKER_PATTERN.test(text)) {
      return false; // No changes needed
    }

    // Create processed content
    const processedHTML = text.replace(
      HIGHLIGHT_CONFIG.MARKER_PATTERN, 
      `<mark class="${HIGHLIGHT_CONFIG.HIGHLIGHT_CLASS}">$1</mark>`
    );

    // Update content
    element.innerHTML = processedHTML;
    return true; // Changes made
  } catch (error) {
    console.error('[highlight-text]', HIGHLIGHT_CONFIG.ERROR_MESSAGE, error);
    return false;
  }
}

/**
 * Add enhancement classes and animations
 */
function addEnhancements(block) {
  // Add progressive enhancement class
  block.classList.add('highlight-text-enhanced');

  // Add staggered animation to highlights
  const highlights = block.querySelectorAll(`.${HIGHLIGHT_CONFIG.HIGHLIGHT_CLASS}`);
  highlights.forEach((highlight, index) => {
    highlight.style.animationDelay = `${index * HIGHLIGHT_CONFIG.ANIMATION_DELAY}ms`;
  });
}

/**
 * Main decoration function - EDS standard
 * This follows the enhancement pattern, not replacement
 */
export default function decorate(block) {
  try {
    // Step 1: Extract content using EDS pattern
    const textContent = extractTextContent(block);
    
    if (!textContent) {
      // No content to process - block remains unchanged
      return;
    }

    // Step 2: Find the content element to enhance
    const contentElement = block.querySelector('div div') || block;

    // Step 3: Process highlighting (only if needed)
    const wasProcessed = processHighlighting(contentElement, textContent);

    // Step 4: Add enhancements only if processing succeeded
    if (wasProcessed) {
      addEnhancements(block);
    }

    // Step 5: Block is now enhanced, original content preserved
    
  } catch (error) {
    console.error('[highlight-text] Enhancement failed:', error);
    // Original content remains intact - user gets basic experience
  }
}
```

### 3. CSS Styling

```css
/* blocks/highlight-text/highlight-text.css */

/* Base block styles */
.highlight-text {
  font-family: inherit;
  line-height: 1.6;
}

/* Enhanced state styling */
.highlight-text.highlight-text-enhanced {
  position: relative;
}

/* Highlight styling */
.highlight-text-mark {
  background: linear-gradient(120deg, #a8e6cf 0%, #88d8a3 100%);
  padding: 0.2em 0.4em;
  border-radius: 0.25em;
  font-weight: 600;
  color: #2d5a27;
  
  /* Animation */
  animation: highlightFadeIn 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(2px);
}

/* Fade-in animation */
@keyframes highlightFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .highlight-text-mark {
    background: linear-gradient(120deg, #2d5a27 0%, #1a3d1a 100%);
    color: #a8e6cf;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .highlight-text-mark {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .highlight-text-mark {
    background: #ffff00;
    color: #000000;
    border: 2px solid #000000;
  }
}
```

### 4. Test File

#### 🔴 CRITICAL: test.html Requirements

**Your test.html MUST include these critical elements or loadBlock() will fail:**

1. **Block structure with wrappers** (if using external plugins)
2. **`.block` class** on block element
3. **`data-block-name` attribute** set to block name
4. **Manual decoration** OR use EDS's `loadBlock()` function

#### Template A: Manual Decoration (Simple)

Use when your block has no external dependencies:

```html
<!-- blocks/highlight-text/test.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Highlight Text Block - Test</title>
    <link rel="stylesheet" href="highlight-text.css">
    <style>
        body {
            font-family: system-ui, sans-serif;
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
            line-height: 1.6;
        }
        .test-section {
            margin-bottom: 3rem;
            padding: 1.5rem;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>Highlight Text Block Tests</h1>

    <div class="test-section">
        <h2>Basic Highlighting</h2>
        <div class="highlight-text block" data-block-name="highlight-text" data-block-status="initialized">
            <div>
                <div>This text has **important words** and **key phrases** highlighted.</div>
            </div>
        </div>
    </div>

    <div class="test-section">
        <h2>Multiple Highlights</h2>
        <div class="highlight-text block" data-block-name="highlight-text" data-block-status="initialized">
            <div>
                <div>EDS blocks should be **simple**, **performant**, and **accessible** while providing **great user experience**.</div>
            </div>
        </div>
    </div>

    <div class="test-section">
        <h2>No Highlights (Graceful Handling)</h2>
        <div class="highlight-text block" data-block-name="highlight-text" data-block-status="initialized">
            <div>
                <div>This text has no special markers and should remain unchanged.</div>
            </div>
        </div>
    </div>

    <div class="test-section">
        <h2>Empty Content</h2>
        <div class="highlight-text block" data-block-name="highlight-text" data-block-status="initialized">
            <div>
                <div></div>
            </div>
        </div>
    </div>

    <script type="module">
        import decorate from './highlight-text.js';

        document.addEventListener('DOMContentLoaded', () => {
            const blocks = document.querySelectorAll('.highlight-text.block');
            blocks.forEach(block => {
                console.log('Decorating block:', block);
                decorate(block);
            });
        });
    </script>
</body>
</html>
```

#### Template B: Using EDS loadBlock() (Advanced)

Use when testing full EDS integration or when block uses external plugins:

```html
<!-- blocks/bio/test.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bio Block - Test</title>

    <!-- EDS Core Styles -->
    <link rel="stylesheet" href="/styles/styles.css">

    <style>
        /* Test page styling */
        body {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        .test-section {
            margin: 3rem 0;
            padding: 2rem;
            border: 2px solid #ccc;
            border-radius: 8px;
        }

        /* EDS pattern - ensure body appears */
        body.appear {
            display: block;
        }
    </style>
</head>
<body>
    <h1>Bio Block Tests</h1>

    <!-- Test Case 1: Image Link Conversion -->
    <div class="test-section">
        <h2>Test: Image Link Conversion</h2>

        <!-- 🔴 CRITICAL: Wrapper div required if block uses external plugins -->
        <div class="bio-wrapper">
            <div class="bio">
                <div>
                    <div><a href="https://picsum.photos/200/200.jpg">Test Author</a></div>
                    <div>This bio has an image link that should be converted to an image element.</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Test Case 2: Multiple Blocks -->
    <div class="test-section">
        <h2>Test: Multiple Bio Blocks</h2>

        <div class="bio-wrapper">
            <div class="bio">
                <div>
                    <div><a href="https://picsum.photos/200/201.jpg">First Author</a></div>
                    <div>First bio instance.</div>
                </div>
            </div>
        </div>

        <div class="bio-wrapper">
            <div class="bio">
                <div>
                    <div><a href="https://picsum.photos/200/202.jpg">Second Author</a></div>
                    <div>Second bio instance.</div>
                </div>
            </div>
        </div>
    </div>

    <script type="module">
        import { loadBlock } from '/scripts/aem.js';

        // 🔴 CRITICAL: Add body.appear class FIRST
        document.body.classList.add('appear');

        // Get all bio blocks
        const bioBlocks = document.querySelectorAll('.bio');

        // Load each block using EDS loadBlock()
        for (const block of bioBlocks) {
            // 🔴 CRITICAL: Set dataset.blockName BEFORE calling loadBlock()
            block.classList.add('block');
            block.dataset.blockName = 'bio';

            await loadBlock(block);
        }

        console.log('✅ All blocks loaded');
    </script>
</body>
</html>
```

#### Why These Requirements Matter

**1. Wrapper divs (`.{blockname}-wrapper`)**
- Required if block uses external plugins (expressions, etc.)
- Plugin queries for wrapper element in production
- Without wrapper, plugin fails with null pointer errors
- Pattern: `.bio-wrapper` contains `.bio` block

**2. `block.dataset.blockName`**
- EDS's `loadBlock()` uses this to construct import path
- Without it: `/blocks/undefined/undefined.js 404` error
- Must be set BEFORE calling `loadBlock()`
- Format: `block.dataset.blockName = 'bio';`

**3. `.block` class**
- Indicates block has been processed by EDS
- Some EDS utilities check for this class
- Add it manually in test files: `block.classList.add('block');`

#### Common test.html Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `/blocks/undefined/undefined.js 404` | Missing `dataset.blockName` | Add `block.dataset.blockName = 'bio';` before `loadBlock()` |
| `Cannot read properties of null` | Missing wrapper div | Wrap block in `<div class="bio-wrapper">` |
| All blocks show same content | Using global selectors in decorate | Change `document.querySelector()` to `block.querySelector()` |
| Plugin errors | Plugin called before wrapper exists | Ensure wrappers exist in HTML structure |

## Advanced Example: Interactive Counter

This example shows handling state and user interaction while maintaining the EDS enhancement pattern.

```javascript
// blocks/interactive-counter/interactive-counter.js

const COUNTER_CONFIG = {
  MIN_VALUE: 0,
  MAX_VALUE: 100,
  DEFAULT_VALUE: 0,
  DEFAULT_STEP: 1,
  BUTTON_LABELS: {
    INCREMENT: '+',
    DECREMENT: '-',
    RESET: 'Reset'
  }
};

/**
 * Parse configuration from block content
 */
function parseCounterConfig(block) {
  const config = { ...COUNTER_CONFIG };
  
  // Look for configuration in nested structure
  const configElement = block.querySelector('div div');
  if (configElement) {
    const configText = configElement.textContent.trim();
    
    // Parse simple config: "start=5, step=2, max=50"
    if (configText) {
      const pairs = configText.split(',').map(pair => pair.trim());
      pairs.forEach(pair => {
        const [key, value] = pair.split('=').map(s => s.trim());
        if (key && value && !isNaN(value)) {
          switch (key.toLowerCase()) {
            case 'start':
            case 'value':
              config.DEFAULT_VALUE = parseInt(value, 10);
              break;
            case 'step':
              config.DEFAULT_STEP = parseInt(value, 10);
              break;
            case 'min':
              config.MIN_VALUE = parseInt(value, 10);
              break;
            case 'max':
              config.MAX_VALUE = parseInt(value, 10);
              break;
          }
        }
      });
    }
  }
  
  return config;
}

/**
 * Create counter interface elements
 */
function createCounterInterface(config) {
  const container = document.createElement('div');
  container.className = 'counter-interface';
  
  // Display
  const display = document.createElement('div');
  display.className = 'counter-display';
  display.textContent = config.DEFAULT_VALUE;
  display.setAttribute('aria-live', 'polite');
  display.setAttribute('aria-label', 'Counter value');
  
  // Controls
  const controls = document.createElement('div');
  controls.className = 'counter-controls';
  
  // Decrement button
  const decrementBtn = document.createElement('button');
  decrementBtn.className = 'counter-button counter-decrement';
  decrementBtn.textContent = config.BUTTON_LABELS.DECREMENT;
  decrementBtn.setAttribute('aria-label', 'Decrease counter');
  
  // Increment button
  const incrementBtn = document.createElement('button');
  incrementBtn.className = 'counter-button counter-increment';
  incrementBtn.textContent = config.BUTTON_LABELS.INCREMENT;
  incrementBtn.setAttribute('aria-label', 'Increase counter');
  
  // Reset button
  const resetBtn = document.createElement('button');
  resetBtn.className = 'counter-button counter-reset';
  resetBtn.textContent = config.BUTTON_LABELS.RESET;
  resetBtn.setAttribute('aria-label', 'Reset counter to initial value');
  
  controls.appendChild(decrementBtn);
  controls.appendChild(incrementBtn);
  controls.appendChild(resetBtn);
  
  container.appendChild(display);
  container.appendChild(controls);
  
  return {
    container,
    display,
    decrementBtn,
    incrementBtn,
    resetBtn
  };
}

/**
 * Set up counter state and event handlers
 */
function setupCounterLogic(elements, config) {
  let currentValue = config.DEFAULT_VALUE;
  
  function updateDisplay() {
    elements.display.textContent = currentValue;
    
    // Update button states
    elements.decrementBtn.disabled = currentValue <= config.MIN_VALUE;
    elements.incrementBtn.disabled = currentValue >= config.MAX_VALUE;
    
    // Visual feedback
    elements.display.classList.toggle('at-min', currentValue === config.MIN_VALUE);
    elements.display.classList.toggle('at-max', currentValue === config.MAX_VALUE);
  }
  
  function increment() {
    if (currentValue < config.MAX_VALUE) {
      currentValue += config.DEFAULT_STEP;
      updateDisplay();
    }
  }
  
  function decrement() {
    if (currentValue > config.MIN_VALUE) {
      currentValue -= config.DEFAULT_STEP;
      updateDisplay();
    }
  }
  
  function reset() {
    currentValue = config.DEFAULT_VALUE;
    updateDisplay();
  }
  
  // Event listeners
  elements.incrementBtn.addEventListener('click', increment);
  elements.decrementBtn.addEventListener('click', decrement);
  elements.resetBtn.addEventListener('click', reset);
  
  // Keyboard support
  elements.container.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
      case '+':
        event.preventDefault();
        increment();
        break;
      case 'ArrowDown':
      case '-':
        event.preventDefault();
        decrement();
        break;
      case 'Home':
        event.preventDefault();
        reset();
        break;
    }
  });
  
  // Initial state
  updateDisplay();
  
  // Return cleanup function
  return () => {
    elements.incrementBtn.removeEventListener('click', increment);
    elements.decrementBtn.removeEventListener('click', decrement);
    elements.resetBtn.removeEventListener('click', reset);
  };
}

/**
 * Main decoration function
 */
export default function decorate(block) {
  try {
    // Step 1: Parse configuration from content
    const config = parseCounterConfig(block);
    
    // Step 2: Create interface elements
    const elements = createCounterInterface(config);
    
    // Step 3: Set up interaction logic
    const cleanup = setupCounterLogic(elements, config);
    
    // Step 4: Replace content with interface
    // (This is one case where replacement is necessary for interaction)
    const originalContent = block.innerHTML;
    block.innerHTML = '';
    block.appendChild(elements.container);
    
    // Step 5: Add enhancement class
    block.classList.add('counter-enhanced');
    
    // Step 6: Store cleanup function for potential use
    block._counterCleanup = cleanup;
    
    // Step 7: Store original content as fallback
    block._originalContent = originalContent;
    
  } catch (error) {
    console.error('[counter] Enhancement failed:', error);
    // Block retains original content
  }
}
```

## 🔴 CRITICAL: Use Block Parameter Not Global Selectors

**Understanding when to use the `block` parameter vs. document-level selectors is essential.**

### Document-Level vs Block-Scoped Operations

**Block-scoped operations** (use `block` parameter):
- Querying elements within the block
- Checking the block's classes or attributes
- Modifying the block's content or structure

**Document-level operations** (global selectors are intentional):
- Accessing page metadata (`meta` tags)
- Controlling document body scroll
- Global event listeners (keyboard, scroll)
- Collecting page-wide elements (all headings, all code snippets)
- Accessing document structure (header, footer)

### The Problem: Global Selectors Break Multi-Block Pages

When you use `document.querySelector()` to query for **the block itself or its children**, it **always finds the first matching block on the page**, causing severe bugs when multiple blocks exist.

#### ❌ BAD: Global Selectors (Production Bug Example from bio block)

```javascript
export default function decorate(block) {
  // ❌ This finds the FIRST .bio on the page, not the current block!
  const bioElement = document.querySelector('.bio');
  if (!bioElement.classList.contains('hide-author')) {
    // This check applies first block's classes to ALL blocks!
  }

  // ❌ Gets image from FIRST block, not current block
  const imgElement = document.querySelector('.bio.block img');

  // ❌ Appends to FIRST block, not current block
  const bioBlock = document.querySelector('.bio.block');
  bioBlock.appendChild(authorElement);
}
```

**What happens:**
1. Page has 3 bio blocks: normal, hide-author, normal
2. First block is normal (no hide-author)
3. ALL blocks check first block's classes → ALL blocks process as normal
4. ALL blocks query first block's image → wrong images everywhere
5. ALL blocks append to first block → names pile up on first block only

**Real production bug:** Image links showed as text because all blocks were checking the first block's configuration instead of their own.

#### ✅ GOOD: Block Parameter Scoping

```javascript
export default function decorate(block) {
  // ✅ Check THIS block's classes
  if (!block.classList.contains('hide-author')) {
    // Correctly handles each block independently
  }

  // ✅ Query within THIS block
  const imgElement = block.querySelector('img');

  // ✅ Append to THIS block
  block.appendChild(authorElement);
}
```

### Why EDS Calls Decorate Multiple Times

EDS's `decorateBlock()` function loops through ALL blocks of a type:

```javascript
// Inside EDS core (scripts/aem.js):
document.querySelectorAll('.bio').forEach(block => {
  decorate(block);  // Called once per block with unique block parameter
});
```

**Your decorate function MUST use the `block` parameter** to work correctly when multiple blocks exist.

### Complete Bio Block Example (Fixed)

```javascript
export default function decorate(block) {
  // ✅ Check current block's classes
  if (!block.classList.contains('hide-author')) {

    // ✅ Query within current block
    const firstCell = block.querySelector('div > div:first-child');
    if (firstCell) {
      const link = firstCell.querySelector('a');
      if (link && link.href) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const isImageLink = imageExtensions.some(ext =>
          link.href.toLowerCase().includes(ext)
        );

        if (isImageLink) {
          const img = document.createElement('img');
          img.src = link.href;
          img.alt = link.textContent || 'Bio image';
          link.replaceWith(img);  // Atomic DOM replacement
        }
      }
    }

    // ✅ Query image within current block
    const imgElement = block.querySelector('img');

    let author = '';
    if (imgElement && imgElement.getAttribute('alt')) {
      author = imgElement.getAttribute('alt');
    }

    if (!author) {
      const metaAuthor = document.querySelector('meta[name="author"]');
      if (metaAuthor) {
        author = metaAuthor.getAttribute('content');
      }
    }

    const authorElement = document.createElement('strong');
    authorElement.textContent = author;

    // ✅ Append to current block
    block.appendChild(authorElement);
  }
}
```

### Rule of Thumb

**Inside `decorate(block)` function:**

**Block-scoped (use block parameter):**
- ✅ `block.querySelector()` - ALWAYS correct for querying within the block
- ✅ `block.classList` - ALWAYS correct for block classes
- ✅ `block.appendChild()` - ALWAYS correct for block DOM manipulation
- ❌ `document.querySelector('.your-block')` - NEVER correct (use `block` parameter)

**Document-level (global selectors are intentional):**
- ✅ `document.querySelector('meta[name="author"]')` - OK for page metadata
- ✅ `document.querySelectorAll('h1, h2, h3, h4, h5, h6')` - OK for page-wide queries
- ✅ `document.querySelector('header')` - OK for document structure
- ✅ `document.body.style` - OK for body control
- ✅ `window.addEventListener()` - OK for global event listeners
- ✅ `window.matchMedia()` - OK for responsive behavior

**Defensive documentation:** Always add comments for intentional document-level selectors:
```javascript
// Global Selector is INTENTIONAL - used for Document access
// This block scans ALL page headings to build table of contents
const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
```

## Best Practices for Raw EDS Blocks

### 1. Content Extraction Patterns

**Always use multiple strategies:**

```javascript
function extractContent(block) {
  // Strategy 1: EDS nested structure
  const nested = block.querySelector('div div')?.textContent?.trim();
  if (nested) return nested;
  
  // Strategy 2: Direct content
  const direct = block.textContent?.trim();
  if (direct) return direct;
  
  // Strategy 3: Data attributes
  const dataContent = block.dataset.content;
  if (dataContent) return dataContent;
  
  // Strategy 4: Default
  return '';
}
```

### 2. DOM Manipulation Patterns

**Use `.replaceWith()` for surgical element replacement:**

#### ❌ BAD: Clearing and Appending

```javascript
// This destroys all other content in the container
firstCell.innerHTML = '';
firstCell.appendChild(img);

// If firstCell had other elements, they're now gone!
```

#### ✅ GOOD: Atomic Replacement with `.replaceWith()`

```javascript
// This surgically replaces ONLY the link element
link.replaceWith(img);

// Other elements in firstCell remain untouched
```

**Why `.replaceWith()` is better:**
1. **Surgical precision** - Only replaces the target element
2. **Atomic operation** - Single DOM change instead of clear + append
3. **Preserves siblings** - Other elements in container remain intact
4. **Better performance** - Fewer DOM mutations
5. **Clearer intent** - Code shows exact transformation

#### Real-World Example: Image Link Conversion

```javascript
export default function decorate(block) {
  const firstCell = block.querySelector('div > div:first-child');
  if (firstCell) {
    const link = firstCell.querySelector('a');
    if (link && link.href) {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      const isImageLink = imageExtensions.some(ext =>
        link.href.toLowerCase().includes(ext)
      );

      if (isImageLink) {
        // Create replacement element
        const img = document.createElement('img');
        img.src = link.href;
        img.alt = link.textContent || 'Bio image';

        // ✅ Atomic replacement - link is removed, img takes its place
        link.replaceWith(img);
      }
    }
  }
}
```

#### When to Use Each Pattern

| Pattern | Use When | Example |
|---------|----------|---------|
| `.replaceWith()` | Replacing one element with another | Link → Image, div → button |
| `.innerHTML = ''` then `.appendChild()` | Rebuilding entire container | Complete UI reconstruction |
| `.appendChild()` | Adding to existing content | Appending new elements |
| `.insertBefore()` / `.insertAfter()` | Precise positioning | Injecting elements at specific locations |

### 3. Progressive Enhancement

**Build functionality in layers:**

```javascript
export default function decorate(block) {
  // Layer 1: Basic functionality (always works)
  addBasicEnhancements(block);
  
  // Layer 2: Advanced features (if supported)
  if ('IntersectionObserver' in window) {
    addScrollEffects(block);
  }
  
  // Layer 3: Cutting-edge features (if available)
  if ('CSS' in window && CSS.supports('backdrop-filter', 'blur(10px)')) {
    addGlassmorphism(block);
  }
}
```

### 3. Wrapper Divs for External Plugins

**Understanding the `.{blockname}-wrapper` pattern:**

#### When to Use Wrappers

Wrapper divs are ONLY needed when:
1. Your block uses external plugins (expressions, etc.)
2. The plugin needs a parent container for queries
3. In production, EDS creates this wrapper automatically
4. In test.html, you MUST create it manually

#### Production vs Test Environment

**Production (automatic):**
```html
<!-- EDS creates this structure automatically -->
<section>
  <div class="bio-wrapper">  <!-- EDS adds this -->
    <div class="bio block">...</div>
  </div>
</section>
```

**Test.html (manual):**
```html
<!-- You MUST create the wrapper yourself -->
<div class="bio-wrapper">  <!-- You add this -->
  <div class="bio">...</div>
</div>
```

#### Example: Bio Block with Expressions Plugin

```javascript
export default function decorate(block) {
  // Your block decoration code...

  // At the end, call external plugin
  // Plugin queries for .bio-wrapper
  renderExpressions(document.querySelector('.bio-wrapper'));
}
```

**Why this matters:**
- The expressions plugin calls `document.querySelector('.bio-wrapper')`
- In production, EDS creates the wrapper automatically
- In test.html, you must create it manually
- Without the wrapper: `Cannot read properties of null (reading 'firstChild')`

#### When Wrappers Are NOT Needed

Skip the wrapper if:
- Your block has no external plugin dependencies
- Your block is fully self-contained
- You're only using EDS core utilities

```html
<!-- Simple block without external plugins - no wrapper needed -->
<div class="highlight-text block">
  <div>
    <div>Content here</div>
  </div>
</div>
```

### 4. Error Boundaries

**Never let enhancement break the page:**

```javascript
export default function decorate(block) {
  try {
    enhanceBlock(block);
  } catch (error) {
    console.error('[block-name] Enhancement failed:', error);
    
    // Optional: Add error indicator
    if (isDevelopment()) {
      const errorMsg = document.createElement('div');
      errorMsg.style.cssText = 'color: red; font-size: 0.8em; margin-top: 0.5em;';
      errorMsg.textContent = `Enhancement failed: ${error.message}`;
      block.appendChild(errorMsg);
    }
  }
}
```

### 4. Performance Considerations

**Lazy load expensive operations:**

```javascript
function addExpensiveFeature(block) {
  // Use Intersection Observer for lazy initialization
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        initializeExpensiveFeature(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(block);
}
```

### 5. Accessibility First

**Always include ARIA attributes and keyboard support:**

```javascript
function makeAccessible(element) {
  // ARIA attributes
  element.setAttribute('role', 'region');
  element.setAttribute('aria-label', 'Interactive component');
  
  // Keyboard navigation
  element.setAttribute('tabindex', '0');
  element.addEventListener('keydown', handleKeyboard);
  
  // Focus management
  element.addEventListener('focus', handleFocus);
  element.addEventListener('blur', handleBlur);
}
```

## Testing Your Blocks

### Manual Testing Checklist

- [ ] Block works with expected content structure
- [ ] Block handles empty/missing content gracefully
- [ ] Block preserves original content on error
- [ ] Enhancement classes are applied correctly
- [ ] Keyboard navigation works
- [ ] Screen reader announces changes
- [ ] Works on mobile devices
- [ ] Respects user preferences (reduced motion, high contrast)

### Development Testing

```javascript
// Add to your test file for debugging
window.testBlock = function(blockSelector) {
  const block = document.querySelector(blockSelector);
  if (!block) {
    console.error('Block not found:', blockSelector);
    return;
  }
  
  console.group('Block Test:', blockSelector);
  console.log('Original content:', block.innerHTML);
  
  try {
    decorate(block);
    console.log('✅ Enhancement successful');
    console.log('Enhanced content:', block.innerHTML);
  } catch (error) {
    console.error('❌ Enhancement failed:', error);
  }
  
  console.groupEnd();
};
```

## 🎯 Critical Takeaways: Common Pitfalls to Avoid

### 1. **NEVER use global selectors in decorate()**
```javascript
// ❌ WRONG - Breaks multi-block pages
const element = document.querySelector('.my-block');

// ✅ CORRECT - Always query from block parameter
const element = block.querySelector('.some-element');
```

### 2. **ALWAYS set dataset.blockName before loadBlock()**
```javascript
// ❌ WRONG - Results in 404 errors
await loadBlock(block);

// ✅ CORRECT - Set blockName first
block.dataset.blockName = 'bio';
await loadBlock(block);
```

### 3. **Use wrapper divs for blocks with external plugins**
```html
<!-- ❌ WRONG - Plugin will fail with null errors -->
<div class="bio">...</div>

<!-- ✅ CORRECT - Wrapper for plugin queries -->
<div class="bio-wrapper">
  <div class="bio">...</div>
</div>
```

### 4. **Use .replaceWith() for element replacement**
```javascript
// ❌ WRONG - Destroys all siblings
element.innerHTML = '';
element.appendChild(newElement);

// ✅ CORRECT - Surgical replacement
oldElement.replaceWith(newElement);
```

### 5. **Test with multiple blocks on the page**
```html
<!-- Always test with at least 2 blocks to catch selector bugs -->
<div class="my-block">First instance</div>
<div class="my-block">Second instance</div>
```

## Summary

Raw EDS blocks follow the **enhancement pattern** with these critical requirements:

1. **Extract** content safely using multiple strategies
2. **Enhance** existing DOM without destruction
3. **Add** functionality progressively
4. **Preserve** original content as fallback
5. **Handle** errors gracefully
6. **🔴 Always use `block` parameter** - Never use global selectors
7. **🔴 Set `dataset.blockName`** - Required before `loadBlock()`
8. **🔴 Include wrapper divs** - Required for external plugins
9. **🔴 Use `.replaceWith()`** - For surgical DOM manipulation
10. **🔴 Test multiple blocks** - Catch scoping bugs early

This approach maintains EDS's philosophy of simplicity while providing rich, interactive experiences that work reliably across all environments.

### Real-World Bug Examples from Production

These bugs were all found in production and fixed using the patterns above:

1. **Bio block image link bug**: Used global selectors → all blocks checked first block's configuration → image links showed as text on subsequent blocks
2. **Test.html 404 errors**: Missing `dataset.blockName` → `/blocks/undefined/undefined.js` errors
3. **Expressions plugin errors**: Missing wrapper divs → `Cannot read properties of null (reading 'firstChild')` errors

**Lesson learned**: Follow these patterns from the start to avoid production bugs.

### Real-World Content Authoring Issue

**Problem:** Author name was displaying as full URL instead of name

**Root cause:** In Google Docs, the hyperlink text was the image URL, and the code didn't handle this case

**JavaScript fix:** Smart URL detection in bio.js:
```javascript
// Check if link text is a URL (not a proper author name)
const linkText = link.textContent || '';
const isLinkTextUrl = linkText.startsWith('http://') || linkText.startsWith('https://');

// Only use link text as alt if it's NOT a URL
// If it's a URL, leave alt empty - author name will be extracted from meta tag
img.alt = isLinkTextUrl ? '' : linkText || 'Bio image';
```

**How it works:**
1. Detects if link text starts with `http://` or `https://`
2. If it's a URL → sets `alt=""` (empty)
3. Author name extraction falls back to `<meta name="author">` tag
4. Result: Author name from meta tag, not URL

**Best practice:** While the code now handles URL link text gracefully, it's still better to use the author name as the link text in Google Docs for better semantics.

## See Also

### Architecture & Standards
- **[Block Architecture Standards](block-architecture-standards.md)** - Comprehensive standards for EDS block development including naming conventions, file structure, and coding patterns
- **[EDS Overview](../eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[Project Structure](../project-structure.md)** - Understanding the overall EDS project organization and file conventions
- **[CSS Naming Convention Style Guide](../guidelines/style-guide.md)** - CSS naming conventions and standards for EDS blocks and components

### Advanced Development
- **[Complex EDS Blocks Guide](complex-eds-blocks-guide.md)** - Building sophisticated blocks with build tools, external dependencies, and advanced patterns
- **[Web Components with EDS](web-components-with-eds.md)** - Integrating modern web components within the EDS framework
- **[Performance Optimization](performance-optimization.md)** - Techniques for optimizing EDS block performance and loading

### Testing & Debugging
- **[Debug Guide](../testing/debug.md)** - Comprehensive debugging strategies for EDS blocks and common troubleshooting scenarios
- **[Testing Strategies](testing-strategies.md)** - Testing approaches for EDS blocks including unit tests and integration testing
- **[Browser Compatibility](browser-compatibility.md)** - Ensuring cross-browser compatibility for EDS implementations

### Implementation Examples
- **[Block Examples](block-examples.md)** - Real-world examples of successful EDS block implementations
- **[CSS Patterns](css-patterns.md)** - Common CSS patterns and styling approaches for EDS blocks
- **[JavaScript Patterns](javascript-patterns.md)** - Reusable JavaScript patterns for EDS block development

## Next Steps

### For New EDS Developers
1. **Start with [EDS Overview](../eds.md)** to understand the fundamental concepts and architecture
2. **Review [Block Architecture Standards](block-architecture-standards.md)** for essential development guidelines
3. **Follow this guide** to create your first simple block using the highlight-text example
4. **Debug issues** with [Debug Guide](../testing/debug.md) for troubleshooting EDS blocks
5. **Test your blocks** using [EDS Native Testing Standards](../testing/eds-native-testing-standards.md)

### For Experienced Developers
1. **Master the enhancement patterns** shown in this guide's advanced counter example
2. **Explore [Complex EDS Blocks Guide](complex-eds-blocks-guide.md)** for build tool integration and advanced features
3. **Implement [Performance Optimization](performance-optimization.md)** techniques in your blocks
4. **Contribute to [Testing Strategies](testing-strategies.md)** by developing comprehensive test suites

### For Architects & Team Leads
1. **Establish team standards** using [Block Architecture Standards](block-architecture-standards.md) as a foundation
2. **Plan complex implementations** with guidance from [Complex EDS Blocks Guide](complex-eds-blocks-guide.md)
3. **Design testing strategies** following [Testing Strategies](testing-strategies.md) recommendations
4. **Monitor performance** using [Performance Optimization](performance-optimization.md) metrics and techniques