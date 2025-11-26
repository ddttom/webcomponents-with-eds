# EDS Architecture Standards Guide

**Related Documentation:** [Block Architecture Standards](block-architecture-standards.md) | [EDS Overview](../eds.md) | [Raw EDS Blocks Guide](raw-eds-blocks-guide.md) | [Design Philosophy Guide](design-philosophy-guide.md)

## Executive Summary

This document, created for an AI assistant,  establishes architectural patterns and standards for EDS-native block development, focusing on simplicity, performance, and maintainability. These standards ensure consistency across EDS components while maintaining the platform's core principles of minimal dependencies and direct DOM manipulation.

## Architecture Overview

**EDS-Native Architecture Decision Flow:**

The EDS-Native architecture follows a streamlined decision-making process focused on simplicity and performance:

1. **Component Initiation**
   - Begin with a new EDS component requirement
   - Proceed to evaluate component complexity and requirements

2. **Complexity Assessment Decision Point**
   - Analyze the component's functional requirements and complexity level
   - Determine if the component fits the EDS-Native pattern criteria:
     - Simple or minimal state management needs
     - Custom styling requirements
     - Performance-critical applications
     - Preference for minimal dependencies
     - No build process requirements

3. **EDS-Native Pattern Selection**
   - Components meeting the assessment criteria follow the **EDS-Native Pattern for Simple Components**
   - This pattern emphasizes vanilla JavaScript, direct DOM manipulation, and minimal external dependencies
   - Focus on lightweight, performant solutions that align with EDS core principles

4. **Common Standards Layer Integration**
   - All EDS-Native components must implement the unified Common Standards Layer
   - This layer ensures consistency and quality across all EDS components
   - Standards apply regardless of component simplicity or complexity

5. **Four Pillars of Standards Implementation**
   - **Error Handling**: Robust error management with graceful degradation, user-friendly error states, and comprehensive logging
   - **Accessibility**: Full WCAG 2.1 AA compliance, keyboard navigation support, screen reader compatibility, and inclusive design principles
   - **Performance**: Optimized loading strategies, efficient DOM manipulation, responsive behavior, and minimal resource consumption
   - **Testing**: Comprehensive validation procedures, quality assurance protocols, cross-browser compatibility, and accessibility testing

6. **Final Implementation Convergence**
   - All four standards areas must be satisfied before component completion
   - Error Handling, Accessibility, Performance, and Testing requirements converge into the final implementation
   - This ensures every EDS-Native component meets established quality benchmarks while maintaining the platform's simplicity principles

## EDS-Native Pattern

### Use When

- Simple or no state management required
- Custom styling needs
- Performance is critical
- Minimal dependencies preferred
- No build process required

### File Structure

```bash
/blocks/{component-name}/
├── {component-name}.js
├── {component-name}.css
├── test.html
├── README.md
└── example.md
```

### Examples

floating-alert, banners, simple cards, content blocks, text components

## JavaScript Architecture Standards

### Configuration Constants Pattern

```javascript
const COMPONENT_CONFIG = {
  // Performance settings
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 250,
  
  // Error handling
  MAX_RETRY_ATTEMPTS: 3,
  TIMEOUT_DURATION: 5000,
  
  // Accessibility
  FOCUS_TRAP_ENABLED: true,
  ARIA_LIVE_REGION: 'polite',
  
  // User messages
  LOADING_MESSAGE: 'Loading content...',
  ERROR_MESSAGE: 'Unable to load content. Please try again.',
  SUCCESS_MESSAGE: 'Content loaded successfully',
  
  // Feature flags
  ENABLE_ANALYTICS: true,
  ENABLE_DEBUG_LOGGING: false
};
```

### Standard Decorate Function Structure

```javascript
export default async function decorate(block) {
  try {
    // 1. Early validation and setup
    if (!block || !block.children.length) {
      throw new Error('Invalid block structure');
    }
    
    // 2. Configuration and state initialization
    const config = { ...COMPONENT_CONFIG };
    
    // 3. Content extraction (EDS-specific)
    const content = extractContent(block);
    
    // 4. DOM element creation
    const container = createComponentStructure(content, config);
    
    // 5. Event handlers setup
    setupEventHandlers(container, config);
    
    // 6. Accessibility implementation
    setupAccessibility(container);
    
    // 7. Replace block content
    block.innerHTML = '';
    block.appendChild(container);
    
    // 8. Return cleanup function (optional)
    return () => cleanup(container);
    
  } catch (error) {
    handleComponentError(error, block);
  }
}
```

## Error Handling Standards

### Standard Error Handling Pattern

```javascript
function handleComponentError(error, block, config = {}) {
  // Log error for debugging
  console.error(`Component Error [${block.className}]:`, error);
  
  // Show user-friendly error state
  const errorContainer = document.createElement('div');
  errorContainer.className = 'component-error';
  errorContainer.setAttribute('role', 'alert');
  errorContainer.innerHTML = `
    <div class="error-content">
      <p>${config.ERROR_MESSAGE || 'Unable to load content. Please try again.'}</p>
      <button class="retry-button" onclick="location.reload()">Retry</button>
    </div>
  `;
  
  block.innerHTML = '';
  block.appendChild(errorContainer);
}

// Network request error handling
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(COMPONENT_CONFIG.TIMEOUT_DURATION)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}
```

## Accessibility Standards

### Required Accessibility Implementation

```javascript
function setupAccessibility(container) {
  // 1. Semantic HTML structure
  ensureSemanticStructure(container);
  
  // 2. ARIA attributes
  setupAriaAttributes(container);
  
  // 3. Keyboard navigation
  setupKeyboardNavigation(container);
  
  // 4. Focus management
  setupFocusManagement(container);
  
  // 5. Screen reader support
  setupScreenReaderSupport(container);
}

function setupKeyboardNavigation(container) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  container.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'Escape':
        handleEscapeKey(event, container);
        break;
      case 'Tab':
        handleTabNavigation(event, focusableElements);
        break;
      case 'Enter':
      case ' ':
        handleActivation(event);
        break;
    }
  });
}

function setupAriaAttributes(container) {
  // Set appropriate ARIA roles
  if (!container.getAttribute('role')) {
    container.setAttribute('role', 'region');
  }
  
  // Add aria-label if needed
  if (!container.getAttribute('aria-label') && !container.getAttribute('aria-labelledby')) {
    const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      heading.id = heading.id || `heading-${Date.now()}`;
      container.setAttribute('aria-labelledby', heading.id);
    }
  }
  
  // Set up live regions for dynamic content
  const liveRegion = container.querySelector('[data-live-region]');
  if (liveRegion) {
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
  }
}
```

## Performance Standards

### Loading States and Optimization

```javascript
function showLoadingState(container, message = 'Loading...') {
  const loader = document.createElement('div');
  loader.className = 'component-loader';
  loader.setAttribute('aria-live', 'polite');
  loader.innerHTML = `
    <div class="loader-content">
      <div class="spinner" aria-hidden="true"></div>
      <span class="loader-text">${message}</span>
    </div>
  `;
  
  container.appendChild(loader);
  return loader;
}

function hideLoadingState(loader) {
  if (loader && loader.parentNode) {
    loader.parentNode.removeChild(loader);
  }
}

// Debounced event handling
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
```

## EDS-Native Implementation Details

### HTML Structure

```html
<div class="component-name block" data-block-name="component-name" data-block-status="initialized">
  <div>
    <div>
      <!-- EDS-standard nested content structure -->
    </div>
  </div>
</div>
```

### Content Extraction Pattern

```javascript
function extractContent(block) {
  // Navigate through EDS wrapper divs to find actual content
  let contentSource = block;
  
  const firstDiv = block.querySelector('div');
  if (firstDiv) {
    const secondDiv = firstDiv.querySelector('div');
    if (secondDiv && (secondDiv.children.length > 0 || secondDiv.textContent.trim())) {
      contentSource = secondDiv;
    } else if (firstDiv.children.length > 0 || firstDiv.textContent.trim()) {
      contentSource = firstDiv;
    }
  }
  
  return contentSource;
}
```

### Test File Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component Test - EDS Structure</title>
    <link rel="stylesheet" href="[component].css">
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 2rem;
            background: #f5f5f5;
        }
        .test-content {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="test-content">
        <h1>Component Test Page</h1>
        
        <div class="component-name block" data-block-name="component-name" data-block-status="initialized">
            <div>
                <div>
                    <!-- Test content here -->
                </div>
            </div>
        </div>
    </div>

    <script type="module">
        import decorate from './component-name.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const blocks = document.querySelectorAll('.component-name.block');
            blocks.forEach(decorate);
        });
    </script>
</body>
</html>
```

## CSS Standards

### CSS Custom Properties

```css
:root {
  /* Color system */
  --component-color-primary: #1473e6;
  --component-color-secondary: #2680eb;
  --component-color-background: #ffffff;
  --component-color-text: #2c2c2c;
  --component-color-border: #e1e1e1;
  --component-color-error: #d7373f;
  --component-color-success: #268e6c;
  
  /* Spacing system */
  --component-spacing-xs: 4px;
  --component-spacing-s: 8px;
  --component-spacing-m: 16px;
  --component-spacing-l: 24px;
  --component-spacing-xl: 32px;
  
  /* Typography */
  --component-font-family: 'Adobe Clean', sans-serif;
  --component-font-weight-normal: 400;
  --component-font-weight-bold: 700;
  --component-line-height: 1.5;
  
  /* UI elements */
  --component-border-radius: 8px;
  --component-shadow: 0 2px 10px rgba(0,0,0,0.1);
  --component-transition: 0.3s ease;
}
```

### Responsive Design Standards

```css
/* Mobile-first approach */
.component-name {
  /* Mobile styles (default) */
  padding: var(--component-spacing-m);
}

/* Tablet - 600px+ */
@media (min-width: 600px) {
  .component-name {
    padding: var(--component-spacing-l);
  }
}

/* Desktop - 900px+ */
@media (min-width: 900px) {
  .component-name {
    padding: var(--component-spacing-xl);
  }
}

/* Large Desktop - 1200px+ */
@media (min-width: 1200px) {
  .component-name {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

## Validation Checklists

### Pre-Development Checklist

- [ ] EDS-Native pattern confirmed as appropriate choice
- [ ] File structure planned according to standards
- [ ] No external dependencies required
- [ ] Accessibility requirements defined

### Development Checklist

#### JavaScript Implementation

- [ ] Configuration constants defined at top of file
- [ ] Standard decorate function signature used
- [ ] Error handling implemented with try/catch
- [ ] Loading states implemented for async operations
- [ ] Cleanup function provided (if needed)
- [ ] ESLint rules followed (no-console with disable comments)
- [ ] Memory leaks prevented (event listener cleanup)

#### Error Handling

- [ ] Network requests use fetchWithRetry pattern
- [ ] User-friendly error messages displayed
- [ ] Error states include retry mechanisms
- [ ] Errors logged for debugging
- [ ] Graceful degradation implemented
- [ ] Timeout handling for async operations

#### Accessibility Implementation

- [ ] Semantic HTML structure used
- [ ] ARIA attributes properly set
- [ ] Keyboard navigation implemented
- [ ] Focus management working correctly
- [ ] Screen reader compatibility tested
- [ ] Color contrast meets WCAG standards
- [ ] Alternative text provided for images
- [ ] Live regions used for dynamic content

#### Performance

- [ ] Loading states shown for operations > 200ms
- [ ] Debouncing used for frequent events
- [ ] Images optimized and lazy-loaded
- [ ] CSS animations use transform/opacity
- [ ] No layout thrashing in animations
- [ ] Minimal DOM manipulation

### EDS-Native Specific Checklist

- [ ] EDS block structure with data-block-* attributes
- [ ] Content extraction handles nested div structure
- [ ] Pure CSS without external dependencies
- [ ] Manual DOM initialization implemented
- [ ] Custom styling follows design system
- [ ] Test file uses standard EDS structure
- [ ] No build process required
- [ ] Component works in isolation

### Testing Checklist

- [ ] Test file created with standard structure
- [ ] Component renders correctly in isolation
- [ ] All interactive elements functional
- [ ] Error states display properly
- [ ] Loading states work as expected
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified
- [ ] Mobile responsiveness confirmed
- [ ] Cross-browser compatibility checked

### Documentation Checklist

- [ ] README.md follows standard template
- [ ] example.md created for content authors
- [ ] Code comments added for complex logic
- [ ] Configuration options documented
- [ ] Accessibility features documented
- [ ] Known limitations listed
- [ ] Performance considerations noted

### Pre-Deployment Checklist

- [ ] All validation checklists completed
- [ ] Code review conducted
- [ ] Accessibility audit passed
- [ ] Performance benchmarks met
- [ ] Cross-browser testing completed
- [ ] Documentation reviewed and approved
- [ ] Integration testing with EDS completed

## Best Practices

### DOM Manipulation

- Use `document.createElement()` for new elements
- Minimize DOM queries by caching references
- Batch DOM updates to prevent layout thrashing
- Use `DocumentFragment` for multiple element creation

### Event Handling

- Use event delegation where appropriate
- Remove event listeners in cleanup functions
- Debounce frequent events (scroll, resize, input)
- Use passive event listeners for scroll events

### Performance Optimization

- Lazy load non-critical resources
- Use CSS transforms for animations
- Implement virtual scrolling for large lists
- Cache expensive calculations

### Code Organization

- Keep functions small and focused
- Use descriptive variable and function names
- Group related functionality together
- Comment complex logic and business rules

## Conclusion

EDS-Native architecture prioritizes simplicity, performance, and direct control over the DOM. By following these standards, developers can create consistent, accessible, and maintainable components that align with EDS platform principles.

The focus on minimal dependencies and pure JavaScript ensures components remain lightweight and performant while still meeting modern web standards for accessibility and user experience.

## See Also

### Core Architecture & Standards
- **[Block Architecture Standards](block-architecture-standards.md)** - Comprehensive standards for EDS block development including naming conventions, file structure, and coding patterns
- **[EDS Overview](../eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[Design Philosophy Guide](design-philosophy-guide.md)** - Understanding the philosophical principles behind EDS architecture decisions
- **[Build Blocks Clarification](build-blocks-clarification.md)** - Clarification on EDS block architecture and implementation approaches
- **[CSS Naming Convention Style Guide](../guidelines/style-guide.md)** - CSS naming conventions and standards for EDS blocks and components

### Implementation Guides
- **[Raw EDS Blocks Guide](raw-eds-blocks-guide.md)** - Step-by-step guide to creating simple EDS blocks using vanilla JavaScript and minimal dependencies
- **[Complex EDS Blocks Guide](complex-eds-blocks-guide.md)** - Advanced block development with build tools, external dependencies, and sophisticated patterns
- **[Build Component Template](build-component-template.md)** - Template and scaffolding for creating new EDS components
- **[Project Structure](../project-structure.md)** - Understanding the overall EDS project organization and file conventions

### Testing & Quality Assurance
- **[Debug Guide](../testing/debug.md)** - Comprehensive debugging strategies for EDS blocks and common troubleshooting scenarios
- **[EDS Native Testing Standards](../testing/eds-native-testing-standards.md)** - Testing approaches specifically designed for EDS-native components
- **[Testing Strategies](testing-strategies.md)** - Comprehensive testing approaches for EDS blocks including unit tests and integration testing
- **[Performance Optimization](performance-optimization.md)** - Techniques for optimizing EDS block performance and loading

### Development Environment & Tools
- **[Server README](../../../Server-README.md)** - Development server setup and configuration for EDS block development
- **[Browser Compatibility](browser-compatibility.md)** - Ensuring cross-browser compatibility for EDS implementations
- **[Accessibility Testing](accessibility-testing.md)** - Testing EDS blocks for accessibility compliance and best practices
- **[CSS Patterns](css-patterns.md)** - Common CSS patterns and styling approaches for EDS blocks

### Advanced Topics
- **[JavaScript Patterns](javascript-patterns.md)** - Reusable JavaScript patterns for EDS block development
- **[Error Handling Patterns](error-handling-patterns.md)** - Comprehensive error handling strategies for EDS blocks
- **[Block Examples](block-examples.md)** - Real-world examples of successful EDS block implementations
- **[Web Components with EDS](web-components-with-eds.md)** - Integrating modern web components within the EDS framework

## Next Steps

### For New EDS Developers
1. **Start with fundamentals** by reading the [EDS Overview](../eds.md) to understand the platform architecture
2. **Learn the standards** from [Block Architecture Standards](block-architecture-standards.md) for essential development guidelines
3. **Understand the philosophy** through [Design Philosophy Guide](design-philosophy-guide.md) to grasp EDS principles
4. **Practice with simple blocks** using the [Raw EDS Blocks Guide](raw-eds-blocks-guide.md) following these architecture standards
5. **Set up your environment** using [Server README](../../../Server-README.md) for proper development workflow

### For Experienced Developers
1. **Master the EDS-native patterns** shown in this guide's implementation examples
2. **Implement comprehensive error handling** using the patterns and standards defined here
3. **Focus on accessibility** by following the accessibility standards and testing with [Accessibility Testing](accessibility-testing.md)
4. **Optimize performance** using the performance standards and [Performance Optimization](performance-optimization.md) techniques
5. **Explore advanced patterns** with [Complex EDS Blocks Guide](complex-eds-blocks-guide.md) when simple patterns aren't sufficient

### For Architects & Technical Leads
1. **Establish team standards** using this guide as the foundation for your development practices
2. **Create component libraries** following the architecture patterns and standards defined here
3. **Design testing strategies** incorporating [EDS Native Testing Standards](../testing/eds-native-testing-standards.md) and [Testing Strategies](testing-strategies.md)
4. **Plan performance budgets** based on the performance standards and optimization techniques
5. **Document architectural decisions** using the patterns and principles outlined in this guide

### For QA Engineers & Testers
1. **Understand EDS architecture** to create effective testing strategies for EDS-native components
2. **Master the validation checklists** provided in this guide for comprehensive quality assurance
3. **Implement accessibility testing** following the accessibility standards and [Accessibility Testing](accessibility-testing.md) guidelines
4. **Create performance benchmarks** based on the performance standards defined here
5. **Develop debugging skills** using [Debug Guide](../testing/debug.md) for effective issue resolution

### For DevOps & Build Engineers
1. **Understand the no-build philosophy** of EDS-native components for proper CI/CD pipeline design
2. **Set up testing environments** that support the EDS-native architecture and testing requirements
3. **Implement quality gates** based on the validation checklists and standards defined in this guide
4. **Monitor performance** using the performance standards and optimization techniques
5. **Create deployment strategies** that respect the EDS-native architecture principles

### For UI/UX Designers
1. **Understand EDS constraints** to design components that work within the EDS-native architecture
2. **Learn the CSS standards** and design system principles defined in this guide
3. **Consider accessibility** from the design phase using the accessibility standards as guidelines
4. **Design for performance** keeping in mind the performance standards and optimization requirements
5. **Collaborate effectively** with developers by understanding the architecture patterns and limitations
