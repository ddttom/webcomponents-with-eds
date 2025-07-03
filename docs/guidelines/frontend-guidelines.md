# EDS Frontend Guidelines

## Overview

These guidelines establish coding standards and best practices for Edge Delivery Services (EDS) frontend development. The focus is on simplicity, performance, and maintainability through vanilla JavaScript, standard CSS, and semantic HTML.

## Core Principles

### Simplicity First
- Use vanilla JavaScript over frameworks
- Avoid unnecessary abstractions
- Write code that explains itself
- Keep dependencies minimal

### Performance Focus
- Prioritise Core Web Vitals
- Implement progressive enhancement
- Use lazy loading for non-critical resources
- Optimise for mobile-first experiences

### Maintainability
- Write self-documenting code
- Use consistent naming conventions
- Implement clear error handling
- Maintain comprehensive documentation

## HTML Guidelines

### Semantic Structure

**Use Semantic Elements**
```html
<!-- Good -->
<article class="blog-post">
  <header>
    <h1>Article Title</h1>
    <time datetime="2024-01-15">15 January 2024</time>
  </header>
  <main>
    <p>Article content here...</p>
  </main>
  <footer>
    <p>Author information</p>
  </footer>
</article>

<!-- Avoid -->
<div class="blog-post">
  <div class="header">
    <div class="title">Article Title</div>
    <div class="date">15 January 2024</div>
  </div>
</div>
```

**Accessibility Requirements**
- Use proper heading hierarchy (h1-h6)
- Include alt text for all images
- Provide skip links for navigation
- Use ARIA labels where appropriate

```html
<!-- Accessible navigation -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="#main" class="skip-link">Skip to main content</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
</nav>
```

### EDS Block Structure

**Standard Block Pattern**
```html
<!-- Block wrapper -->
<div class="block-name">
  <div class="block-name-wrapper">
    <!-- Block content -->
  </div>
</div>
```

**Variation Classes**
```html
<!-- Block with variations -->
<div class="hero hero-dark hero-centered">
  <div class="hero-wrapper">
    <!-- Hero content -->
  </div>
</div>
```

**Google Docs Table Structure**
```html
<!-- Original table from Google Docs -->
<table>
  <tbody>
    <tr>
      <td>Block Name</td>
      <td>Configuration</td>
    </tr>
    <tr>
      <td>Content A</td>
      <td>Content B</td>
    </tr>
  </tbody>
</table>

<!-- Transformed to block structure -->
<div class="block-name">
  <div>Content A</div>
  <div>Content B</div>
</div>
```

### Form Best Practices

**Accessible Forms**
```html
<form class="contact-form" novalidate>
  <div class="form-group">
    <label for="email">Email Address <span aria-label="required">*</span></label>
    <input
      type="email"
      id="email"
      name="email"
      required
      aria-describedby="email-error"
      autocomplete="email"
    >
    <div id="email-error" class="error-message" role="alert"></div>
  </div>
  <button type="submit">Send Message</button>
</form>
```

## CSS Guidelines

### Architecture

**Mobile-First Approach**
```css
/* Base styles for mobile */
.card {
  padding: 1rem;
  margin-bottom: 1rem;
}

/* Tablet styles */
@media (min-width: 600px) {
  .card {
    padding: 1.5rem;
  }
}

/* Desktop styles */
@media (min-width: 900px) {
  .card {
    padding: 2rem;
  }
}
```

**Standard Breakpoints**
- Mobile: Base styles (0-599px)
- Tablet: 600px and above
- Desktop: 900px and above
- Large Desktop: 1200px and above

### Naming Conventions

**Block-Element-Modifier (BEM) Style**
```css
/* Block */
.navigation {
  /* Block styles */
}

/* Element */
.navigation-item {
  /* Element styles */
}

/* Modifier */
.navigation-item--active {
  /* Modifier styles */
}
```

**CSS Custom Properties**
```css
:root {
  /* Colours */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-text: #333;
  --color-background: #fff;
  
  /* Typography */
  --font-family-base: 'System Font', -apple-system, sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.5;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;
}
```

### EDS-Specific CSS Patterns

**Block Styling**
```css
.block-name {
  /* Block container styles */
  margin: 2rem 0;
  padding: 0;
}

.block-name > div {
  /* Block content wrapper */
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.block-name.variation {
  /* Block variation styles */
  background-color: var(--color-primary);
  color: white;
}
```

**Performance Optimisation**

**Critical CSS**
```css
/* Above-the-fold styles */
.header,
.navigation,
.hero {
  /* Critical styles only */
}

/* Non-critical styles loaded separately */
@import url('non-critical.css') print;
```

**Efficient Selectors**
```css
/* Good - specific and efficient */
.button {
  /* button styles */
}

.button--primary {
  /* primary button styles */
}

/* Avoid - overly complex selectors */
.header .navigation ul li a.active {
  /* inefficient selector */
}
```

### Layout Patterns

**CSS Grid for Complex Layouts**
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

@media (min-width: 900px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Flexbox for Component Layout**
```css
.flex-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 600px) {
  .flex-container {
    flex-direction: row;
    align-items: center;
  }
}
```

## JavaScript Guidelines

### ES Module Structure

**File Organisation**
```javascript
// block-name.js
import { createOptimizedPicture } from '../../scripts/aem.js';
import { div, p, a } from '../../scripts/dom-helpers.js';

// Configuration constants
const CONFIG = {
  maxItems: 8,
  animationDuration: 300,
  breakpoints: {
    mobile: 600,
    tablet: 900,
    desktop: 1200
  }
};

// Utility functions
function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

// Main block function
export default function decorate(block) {
  // Implementation here
}
```

### EDS Block Development

**Block Decoration Pattern**
```javascript
export default function decorate(block) {
  // Extract content from block
  const rows = Array.from(block.children);
  
  // Process each row
  rows.forEach((row, index) => {
    const cells = Array.from(row.children);
    
    // Transform content
    const content = cells.map(cell => cell.textContent.trim());
    
    // Create new structure
    const newElement = createBlockElement(content);
    row.replaceWith(newElement);
  });
  
  // Add event listeners
  setupEventListeners(block);
}
```

**Content Processing**
```javascript
function processBlockContent(block) {
  const content = [];
  
  // Extract table content
  const rows = block.querySelectorAll('tr');
  rows.forEach(row => {
    const cells = Array.from(row.children);
    const rowData = cells.map(cell => ({
      text: cell.textContent.trim(),
      html: cell.innerHTML
    }));
    content.push(rowData);
  });
  
  return content;
}
```

### Error Handling

**Graceful Degradation**
```javascript
async function loadContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Content loading failed:', error);
    // Return fallback content
    return { items: [], total: 0 };
  }
}
```

**User-Friendly Error Messages**
```javascript
function displayError(container, message) {
  const errorDiv = div({ class: 'error-message' },
    p('Unable to load content. Please try again later.')
  );
  container.appendChild(errorDiv);
}
```

### Event Handling

**Delegation Pattern**
```javascript
function attachEventListeners(container) {
  container.addEventListener('click', (event) => {
    const { target } = event;
    
    if (target.matches('.button')) {
      handleButtonClick(event);
    } else if (target.matches('.link')) {
      handleLinkClick(event);
    }
  });
}
```

**Debouncing and Throttling**
```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedSearch = debounce(handleSearch, 300);
```

### DOM Manipulation

**Use EDS DOM Helpers**
```javascript
import { div, p, a, img } from '../../scripts/dom-helpers.js';

// Create elements using helpers
const card = div({ class: 'card' },
  img({ src: imageUrl, alt: imageAlt }),
  div({ class: 'card-content' },
    p({ class: 'card-title' }, title),
    p({ class: 'card-description' }, description)
  )
);
```

**Performance Considerations**
```javascript
// Batch DOM updates
function updateCards(items) {
  const fragment = document.createDocumentFragment();
  
  items.forEach(item => {
    const card = createCard(item);
    fragment.appendChild(card);
  });
  
  container.appendChild(fragment);
}
```

### Async/Await Patterns

**Proper Error Handling**
```javascript
async function initializeBlock(block) {
  try {
    const [content, config] = await Promise.all([
      loadContent('/query-index.json'),
      loadConfig('/config.json')
    ]);
    
    renderContent(block, content, config);
  } catch (error) {
    console.error('Block initialization failed:', error);
    renderErrorState(block);
  }
}
```

## Code Quality Standards

### ESLint Configuration

**Extended Rules**
```javascript
// .eslintrc.js
module.exports = {
  extends: ['airbnb-base'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/extensions': ['error', 'always'],
    'function-paren-newline': 'off',
    'no-alert': 'error'
  }
};
```

### JSDoc Comments

**Function Documentation**
```javascript
/**
 * Processes query results and creates HTML elements
 * 
 * @param {Array} items - Array of content items from query
 * @param {Object} options - Configuration options
 * @param {number} options.limit - Maximum items to display
 * @param {string} options.layout - Layout type ('grid' or 'list')
 * @returns {DocumentFragment} Fragment containing rendered elements
 */
function renderItems(items, options = {}) {
  const { limit = 10, layout = 'grid' } = options;
  // Implementation
}
```

### Testing Guidelines

**Unit Testing**
```javascript
// tests/block-name.test.js
import { expect } from 'chai';
import decorate from '../blocks/block-name/block-name.js';

describe('Block Name', () => {
  it('should render correctly with valid data', () => {
    const mockBlock = document.createElement('div');
    mockBlock.innerHTML = '<div>Test content</div>';
    
    decorate(mockBlock);
    
    expect(mockBlock.children.length).to.be.greaterThan(0);
  });
});
```

**Integration Testing**
```javascript
// Test with actual DOM
describe('Block Integration', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div class="test-container"></div>';
  });
  
  it('should handle user interactions', () => {
    const container = document.querySelector('.test-container');
    decorate(container);
    
    const button = container.querySelector('button');
    button.click();
    
    // Assert expected behaviour
  });
});
```

## Performance Best Practices

### Image Optimisation

**Responsive Images**
```javascript
// Use the createOptimizedPicture helper
const picture = createOptimizedPicture(imageUrl, imageAlt, false, [
  { media: '(min-width: 600px)', width: '800' },
  { media: '(min-width: 900px)', width: '1200' }
]);
```

**Lazy Loading**
```javascript
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}
```

### Script Loading

**Progressive Enhancement**
```javascript
// Load non-critical scripts after page load
window.addEventListener('load', () => {
  import('./non-critical-feature.js').then(module => {
    module.initialize();
  });
});
```

**Conditional Loading**
```javascript
// Load features based on user interaction
function loadFeatureOnDemand() {
  if (!window.advancedFeatureLoaded) {
    import('./advanced-feature.js').then(module => {
      window.advancedFeatureLoaded = true;
      module.initialize();
    });
  }
}
```

## Accessibility Standards

### ARIA Implementation

**Screen Reader Support**
```javascript
function createAccessibleButton(text, handler) {
  const button = document.createElement('button');
  button.textContent = text;
  button.setAttribute('aria-label', text);
  button.addEventListener('click', handler);
  return button;
}
```

**Live Regions**
```javascript
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}
```

### Keyboard Navigation

**Focus Management**
```javascript
function initKeyboardNavigation(container) {
  const focusableElements = container.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  container.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      manageFocus(event, focusableElements);
    }
  });
}
```

## EDS-Specific Guidelines

### Block Development

**Block Structure Standards**
```javascript
// Standard block export
export default function decorate(block) {
  // Extract configuration from block classes
  const config = getBlockConfig(block);
  
  // Process content
  const content = processContent(block);
  
  // Apply variations
  applyVariations(block, config);
  
  // Initialize functionality
  initializeBlock(block, content, config);
}
```

**Configuration Handling**
```javascript
function getBlockConfig(block) {
  const classes = Array.from(block.classList);
  const config = {};
  
  classes.forEach(cls => {
    if (cls.startsWith('block-')) {
      config[cls.replace('block-', '')] = true;
    }
  });
  
  return config;
}
```

### Content Processing

**Table to Block Conversion**
```javascript
function convertTableToBlock(table) {
  const rows = Array.from(table.rows);
  const content = rows.map(row => {
    return Array.from(row.cells).map(cell => ({
      text: cell.textContent.trim(),
      html: cell.innerHTML
    }));
  });
  
  return content;
}
```

## Browser Compatibility

### Feature Detection

**Progressive Enhancement**
```javascript
function initIntersectionObserver() {
  if ('IntersectionObserver' in window) {
    // Use Intersection Observer
    const observer = new IntersectionObserver(callback);
    return observer;
  }
  
  // Fallback for older browsers
  return {
    observe: () => {},
    unobserve: () => {}
  };
}
```

**Polyfill Strategy**
```javascript
// Load polyfills only when needed
if (!window.fetch) {
  import('./polyfills/fetch.js');
}

if (!Array.prototype.includes) {
  import('./polyfills/array-includes.js');
}
```

## Deployment Considerations

### Code Splitting

**Dynamic Imports**
```javascript
// Load components on demand
async function loadComponent(componentName) {
  try {
    const module = await import(`./components/${componentName}.js`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load component: ${componentName}`, error);
    return null;
  }
}
```

### Environment-Specific Code

**Configuration Management**
```javascript
// config/environment.js
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    debug: true
  },
  production: {
    apiUrl: 'https://your-domain.com',
    debug: false
  }
};

export default config[process.env.NODE_ENV] || config.development;
```

## Conclusion

These frontend guidelines provide a foundation for consistent, maintainable, and performant code in EDS applications. Regular review and updates ensure these standards evolve with web technologies and project requirements.

The emphasis on simplicity, performance, and accessibility ensures that EDS applications deliver exceptional user experiences while maintaining developer productivity and code quality within the Adobe Edge Delivery Services ecosystem.