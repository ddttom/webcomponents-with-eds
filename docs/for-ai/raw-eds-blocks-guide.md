# Creating Raw EDS Blocks
## The Simple, EDS-Native Approach

This guide demonstrates how to create effective EDS blocks using **vanilla JavaScript**, **minimal dependencies**, and **additive enhancement** patterns that preserve content and follow EDS philosophy.

# Creating Raw EDS Blocks
## The Simple, EDS-Native Approach

This guide demonstrates how to create effective EDS blocks using **vanilla JavaScript**, **minimal dependencies**, and **additive enhancement** patterns that preserve content and follow EDS philosophy.

## **🔒 Critical EDS Constraint: Block Names Are Fixed**

**Before you start:** Understand that EDS automatically generates file paths from your HTML class names. This is non-negotiable.

### **How EDS Dynamic Loading Works**

When your HTML contains:
```html
<div class="highlight-text">**Important** content here</div>
```

EDS automatically:

1. **Adds block attributes**:
   ```html
   <div class="highlight-text block" data-block-name="highlight-text" data-block-status="initialized">
   ```

2. **Generates import paths** (you cannot change this):
   ```javascript
   // This happens in scripts/aem.js - completely automatic
   const mod = await import(`/blocks/highlight-text/highlight-text.js`);
   ```

3. **Requires exact file structure**:
   ```
   /blocks/highlight-text/highlight-text.js   ← MUST match class name
   /blocks/highlight-text/highlight-text.css  ← MUST match class name
   ```

### **What You Cannot Do**

❌ **Different file names:**
```
HTML: <div class="highlight-text">
Files: /blocks/highlight-text/text-highlighter.js  ← EDS won't find this
```

❌ **Import redirection:**
```javascript
// This won't work - EDS controls the import path
import('./my-better-implementation.js');
```

❌ **Flexible naming:**
```
HTML: <div class="my-component">
Files: /blocks/my-component/enhanced-version.js  ← Impossible
```

### **What You Must Do**

✅ **Exact name matching:**
```
HTML: <div class="highlight-text">
Files: /blocks/highlight-text/highlight-text.js  ← Perfect match required
```

This constraint affects every decision in EDS block development.

## **Understanding EDS HTML States** 📄

### **Served vs Rendered HTML**

Before writing your first block, understand that EDS processes HTML in two states:

#### **Served HTML** (What CMS Delivers)
```html
<!-- Raw content from authoring system -->
<div class="highlight-text">
  **Important** words need highlighting
</div>
```

#### **Rendered HTML** (What EDS Creates)
```html
<!-- After EDS scripts process it -->
<div class="highlight-text block" data-block-name="highlight-text" data-block-status="initialized">
  <div>
    <div>**Important** words need highlighting</div>
  </div>
</div>
```

### **Why This Matters for Block Development**

**Your `decorate` function receives the RENDERED HTML**, which means:

1. **Content is nested**: Look for content in `<div><div>` structure
2. **EDS attributes exist**: `data-block-name`, `data-block-status` are present  
3. **Block class added**: `.block` class is automatically added
4. **Extraction strategy**: Use `block.querySelector('div div')` pattern

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

### 2. Progressive Enhancement

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

### 3. Error Boundaries

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

## Summary

Raw EDS blocks follow the **enhancement pattern**:

1. **Extract** content safely using multiple strategies
2. **Enhance** existing DOM without destruction
3. **Add** functionality progressively
4. **Preserve** original content as fallback
5. **Handle** errors gracefully

This approach maintains EDS's philosophy of simplicity while providing rich, interactive experiences that work reliably across all environments.