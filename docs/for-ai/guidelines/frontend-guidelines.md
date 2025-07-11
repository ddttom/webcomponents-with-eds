# Frontend Development Guidelines

*Related: [EDS Overview](../eds.md) | [Block Architecture Standards](../block-architecture-standards.md) | [Design Philosophy Guide](../design-philosophy-guide.md)*

## Overview

This document outlines frontend development guidelines for EDS (Edge Delivery Services) projects, focusing on modern JavaScript, CSS best practices, and component architecture that aligns with EDS principles of simplicity and performance.

*See also: [EDS Overview](../eds.md) for foundational concepts | [Raw EDS Blocks Guide](../raw-eds-blocks-guide.md) for implementation examples*

## JavaScript Guidelines

### ES Modules and Modern JavaScript

Use modern JavaScript features with ES modules for clean, maintainable code:

```javascript
// Use ES modules for imports/exports
import { loadCSS } from '../utils/dom-utils.js';
export default function decorate(block) {
  // Component implementation
}

// Use modern JavaScript features
const config = {
  apiEndpoint: '/api/data',
  timeout: 5000,
  retries: 3
};

// Use async/await for asynchronous operations
async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Data fetch failed:', error);
    throw error;
  }
}
```

### Component Structure

Follow consistent patterns for EDS block components:

```javascript
export default function decorate(block) {
  // 1. Configuration and setup
  const config = {
    animationDuration: 300,
    maxItems: 10,
    errorMessage: 'Failed to load content'
  };

  // 2. Content extraction from EDS structure
  const content = extractBlockContent(block);
  
  // 3. DOM element creation
  const container = createComponentStructure(content, config);
  
  // 4. Event handling and interactivity
  setupEventHandlers(container, config);
  
  // 5. Accessibility enhancements
  setupAccessibility(container);
  
  // 6. Replace block content
  block.innerHTML = '';
  block.appendChild(container);
  
  // 7. Optional cleanup function
  return () => {
    // Cleanup event listeners, timers, etc.
  };
}
```

### Error Handling

Implement comprehensive error handling:

```javascript
// Graceful error handling with user feedback
async function loadComponent(block) {
  try {
    showLoadingState(block);
    const data = await fetchComponentData();
    renderComponent(block, data);
  } catch (error) {
    console.error('Component loading failed:', error);
    showErrorState(block, 'Unable to load content. Please try again.');
  } finally {
    hideLoadingState(block);
  }
}

// Input validation
function validateInput(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input: expected non-empty string');
  }
  return input.trim();
}
```

## CSS Guidelines

*Related: [CSS Naming Convention Style Guide](style-guide.md) for comprehensive CSS naming standards and EDS-specific conventions*

### Design System Integration

Use CSS custom properties for consistent theming:

```css
:root {
  /* Color palette */
  --color-primary: #1473e6;
  --color-secondary: #2680eb;
  --color-background: #ffffff;
  --color-text: #2c2c2c;
  --color-border: #e1e1e1;
  
  /* Typography */
  --font-family-primary: 'Adobe Clean', sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.5;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-s: 8px;
  --spacing-m: 16px;
  --spacing-l: 24px;
  --spacing-xl: 32px;
  
  /* Layout */
  --container-max-width: 1200px;
  --border-radius: 4px;
  --transition-duration: 0.3s;
}
```

### Component Styling

Follow BEM-like naming conventions for component styles:

```css
/* Block component */
.my-component {
  background: var(--color-background);
  border-radius: var(--border-radius);
  padding: var(--spacing-m);
}

/* Element within component */
.my-component__header {
  font-family: var(--font-family-primary);
  font-size: 1.25rem;
  margin-bottom: var(--spacing-s);
}

/* Modifier for component state */
.my-component--loading {
  opacity: 0.6;
  pointer-events: none;
}

/* Responsive design */
@media (min-width: 768px) {
  .my-component {
    padding: var(--spacing-l);
  }
}
```

### Performance Optimization

Optimize CSS for performance:

```css
/* Use efficient selectors */
.component-class { /* Good: class selector */ }
#unique-id { /* Good: ID selector */ }
div.component { /* Avoid: unnecessary tag qualifier */ }

/* Minimize reflows and repaints */
.animated-element {
  /* Use transform and opacity for animations */
  transform: translateX(0);
  opacity: 1;
  transition: transform var(--transition-duration), 
              opacity var(--transition-duration);
}

.animated-element.hidden {
  transform: translateX(-100%);
  opacity: 0;
}

/* Use containment for performance */
.component-container {
  contain: layout style paint;
}
```

## Accessibility Guidelines

### Semantic HTML

Use semantic HTML elements for better accessibility:

```html
<!-- Good: Semantic structure -->
<article class="blog-post">
  <header>
    <h1>Article Title</h1>
    <time datetime="2024-01-15">January 15, 2024</time>
  </header>
  <main>
    <p>Article content...</p>
  </main>
  <footer>
    <nav aria-label="Article navigation">
      <a href="#previous">Previous</a>
      <a href="#next">Next</a>
    </nav>
  </footer>
</article>

<!-- Avoid: Generic divs without semantic meaning -->
<div class="blog-post">
  <div class="header">
    <div class="title">Article Title</div>
  </div>
</div>
```

### ARIA Attributes

Implement proper ARIA attributes:

```javascript
// Dynamic content updates
function updateContent(container, newContent) {
  container.setAttribute('aria-live', 'polite');
  container.textContent = newContent;
}

// Interactive elements
function createButton(text, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.setAttribute('aria-describedby', 'button-help');
  button.addEventListener('click', onClick);
  return button;
}

// Form controls
function createFormField(label, type = 'text') {
  const id = `field-${Date.now()}`;
  const labelEl = document.createElement('label');
  labelEl.setAttribute('for', id);
  labelEl.textContent = label;
  
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.setAttribute('aria-required', 'true');
  
  return { labelEl, input };
}
```

### Keyboard Navigation

Ensure full keyboard accessibility:

```javascript
// Keyboard event handling
function setupKeyboardNavigation(container) {
  container.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'Escape':
        closeModal();
        break;
      case 'Tab':
        handleTabNavigation(event);
        break;
      case 'Enter':
      case ' ':
        if (event.target.matches('[role="button"]')) {
          event.preventDefault();
          event.target.click();
        }
        break;
    }
  });
}

// Focus management
function trapFocus(container) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  container.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  });
}
```

## Performance Guidelines

### Lazy Loading

Implement efficient lazy loading:

```javascript
// Image lazy loading
function setupLazyImages() {
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

// Component lazy loading
function loadComponentWhenVisible(element, loadFunction) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadFunction(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(element);
}
```

### Resource Optimization

Optimize resource loading:

```javascript
// Preload critical resources
function preloadCriticalResources() {
  const criticalCSS = document.createElement('link');
  criticalCSS.rel = 'preload';
  criticalCSS.as = 'style';
  criticalCSS.href = '/styles/critical.css';
  document.head.appendChild(criticalCSS);
}

// Defer non-critical JavaScript
function loadNonCriticalScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  document.head.appendChild(script);
}

// Optimize font loading
function optimizeFontLoading() {
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.href = '/fonts/primary-font.woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
}
```

## Testing Guidelines

### Unit Testing

Write testable, modular code:

```javascript
// Testable function with clear inputs/outputs
export function formatDate(date, locale = 'en-US') {
  if (!date || !(date instanceof Date)) {
    throw new Error('Invalid date provided');
  }
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Testable component with dependency injection
export function createUserCard(userData, { dateFormatter = formatDate } = {}) {
  const card = document.createElement('div');
  card.className = 'user-card';
  
  const name = document.createElement('h3');
  name.textContent = userData.name;
  
  const joinDate = document.createElement('p');
  joinDate.textContent = `Joined: ${dateFormatter(userData.joinDate)}`;
  
  card.appendChild(name);
  card.appendChild(joinDate);
  
  return card;
}
```

### Integration Testing

Test component integration:

```javascript
// Test component in realistic environment
function testComponentIntegration() {
  // Create test container
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="test-component block" data-block-name="test-component">
      <div>
        <div>Test content</div>
      </div>
    </div>
  `;
  
  // Test component decoration
  const block = container.querySelector('.test-component');
  decorate(block);
  
  // Verify expected behavior
  assert(block.children.length > 0, 'Component should render content');
  assert(block.querySelector('.component-content'), 'Component should have content wrapper');
}
```

## Code Quality Guidelines

### Code Organization

Structure code for maintainability:

```javascript
// utils/dom-utils.js - Utility functions
export function createElement(tag, className, textContent) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

// components/user-profile.js - Component logic
import { createElement } from '../utils/dom-utils.js';

export default function decorate(block) {
  // Component implementation
}

// config/constants.js - Configuration
export const API_ENDPOINTS = {
  users: '/api/users',
  posts: '/api/posts'
};

export const UI_CONSTANTS = {
  animationDuration: 300,
  maxRetries: 3
};
```

### Documentation

Document code effectively:

```javascript
/**
 * Creates a responsive image component with lazy loading
 * @param {Object} config - Configuration object
 * @param {string} config.src - Image source URL
 * @param {string} config.alt - Alternative text for accessibility
 * @param {string} [config.className] - Optional CSS class name
 * @param {boolean} [config.lazy=true] - Enable lazy loading
 * @returns {HTMLImageElement} Configured image element
 */
export function createResponsiveImage(config) {
  const { src, alt, className, lazy = true } = config;
  
  if (!src || !alt) {
    throw new Error('Image source and alt text are required');
  }
  
  const img = document.createElement('img');
  img.alt = alt;
  
  if (className) {
    img.className = className;
  }
  
  if (lazy) {
    img.dataset.src = src;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNGNUY1RjUiLz48L3N2Zz4=';
  } else {
    img.src = src;
  }
  
  return img;
}
```

---

## See Also

### Core EDS Foundation & Architecture
- **[EDS Overview](../eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[Block Architecture Standards](../block-architecture-standards.md)** - Comprehensive standards for EDS block development and architectural patterns
- **[EDS Architecture Standards](../eds-architecture-standards.md)** - Architectural patterns and standards for EDS-native block development
- **[Design Philosophy Guide](../design-philosophy-guide.md)** - Understanding the philosophical principles behind EDS architecture decisions
- **[CSS Naming Convention Style Guide](style-guide.md)** - Comprehensive CSS naming standards and conventions for EDS block development

### Implementation Guides & Patterns
- **[Raw EDS Blocks Guide](../raw-eds-blocks-guide.md)** - Step-by-step guide for creating simple EDS blocks using vanilla JavaScript
- **[Complex EDS Blocks Guide](../complex-eds-blocks-guide.md)** - Advanced block development with build tools and external dependencies
- **[Build Blocks Clarification](../build-blocks-clarification.md)** - Understanding the dual-directory architecture and development workflows
- **[Build Component Template](../build-component-template.md)** - Template for advanced build components with external dependencies

### Development Environment & Tools
- **[Server README](../server-README.md)** - Development server setup and configuration for EDS block development and testing
- **[EDS Native Testing Standards](../eds-native-testing-standards.md)** - Testing standards specifically for EDS-native pattern components
- **[Performance Optimization](../performance-optimization.md)** - Techniques for optimizing EDS block performance and loading
- **[JavaScript Patterns](../javascript-patterns.md)** - Reusable JavaScript patterns for EDS block development

### Testing & Quality Assurance
- **[EDS Architecture and Testing Guide](../eds-architecture-and-testing-guide.md)** - Advanced testing workflows and file replacement strategies
- **[Debug Guide](../debug.md)** - Complete debugging policy and approval requirements for development troubleshooting
- **[Investigation](../investigation.md)** - Advanced investigation techniques and analysis methods
- **[Error Handling Patterns](../error-handling-patterns.md)** - Comprehensive error handling strategies for EDS blocks

### Advanced Topics & Reference Materials
- **[EDS Appendix](../eds-appendix.md)** - Comprehensive development reference guide with patterns and best practices
- **[Instrumentation Guide](../instrumentation-how-it-works.md)** - Advanced instrumentation techniques and performance monitoring
- **[Browser Compatibility](../browser-compatibility.md)** - Ensuring cross-browser compatibility for EDS implementations
- **[Project Structure](../project-structure.md)** - Understanding the overall EDS project organization and file conventions

## Next Steps

### For Frontend Developers & Component Authors
1. **Master the JavaScript guidelines** including ES modules, component structure patterns, and error handling for robust EDS block development
2. **Implement the CSS guidelines** using design system integration, component styling patterns, and performance optimization techniques
3. **Apply accessibility best practices** including semantic HTML, ARIA attributes, and keyboard navigation for inclusive component design
4. **Follow performance guidelines** implementing lazy loading, resource optimization, and efficient rendering for fast-loading components
5. **Adopt code quality practices** including proper organization, documentation, and testing for maintainable frontend code

### For UX/UI Designers & Design System Teams
1. **Understand the CSS guidelines** and how design tokens integrate with EDS component development for consistent visual design
2. **Learn the accessibility requirements** and ensure designs support semantic HTML, keyboard navigation, and screen reader compatibility
3. **Collaborate on performance optimization** by designing components that support lazy loading and efficient rendering patterns
4. **Create design system documentation** that aligns with the frontend guidelines for seamless designer-developer collaboration
5. **Establish design validation processes** that ensure components meet both visual and technical requirements outlined in these guidelines

### For QA Engineers & Test Specialists
1. **Learn the testing guidelines** including unit testing patterns and integration testing approaches for comprehensive component validation
2. **Understand the accessibility requirements** and create test scenarios that validate semantic HTML, ARIA attributes, and keyboard navigation
3. **Implement performance testing** that validates lazy loading, resource optimization, and rendering efficiency
4. **Create automated testing workflows** that can validate adherence to the JavaScript and CSS guidelines outlined
5. **Establish quality gates** that ensure components meet the code quality standards and best practices documented

### For Team Leads & Project Managers
1. **Establish development standards** based on the comprehensive guidelines outlined for consistent team practices
2. **Implement code review processes** that ensure adherence to JavaScript, CSS, accessibility, and performance guidelines
3. **Plan training programs** that help team members understand and apply the frontend development best practices
4. **Monitor code quality metrics** using the guidelines as benchmarks for consistent development practices
5. **Create governance processes** that ensure ongoing compliance with the frontend development standards

### For DevOps & Build Engineers
1. **Understand the performance guidelines** and how they affect build processes, asset optimization, and deployment strategies
2. **Implement automated testing** that validates adherence to the code quality and performance standards outlined
3. **Configure development environments** that support the JavaScript and CSS patterns demonstrated in these guidelines
4. **Set up performance monitoring** that tracks the effectiveness of the optimization techniques described
5. **Create deployment procedures** that ensure the guidelines and standards are maintained in production environments

### For Security & Compliance Teams
1. **Review the JavaScript patterns** to ensure they meet security standards for data handling and user interactions
2. **Assess the accessibility guidelines** for compliance with WCAG standards and organizational accessibility requirements
3. **Evaluate the performance optimization techniques** to ensure they don't introduce security vulnerabilities
4. **Establish security guidelines** that complement the frontend development practices outlined
5. **Monitor compliance** with the documented best practices and ensure they align with organizational security policies

### For AI Assistants & Automation
1. **Master the comprehensive guidelines** for creating high-quality frontend code that follows EDS best practices
2. **Understand the component patterns** including JavaScript structure, CSS organization, and accessibility requirements
3. **Apply the testing and quality guidelines** when generating or reviewing frontend code for EDS projects
4. **Follow the documentation standards** to create comprehensive and useful documentation for generated components
5. **Implement the best practices** for performance optimization, accessibility, and code quality in automated development workflows