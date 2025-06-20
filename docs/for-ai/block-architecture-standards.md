# EDS Block Architecture Standards Guide

## Executive Summary

This document establishes two complementary architectural patterns for EDS block development, ensuring consistency while providing flexibility based on component complexity. Both patterns share common standards for error handling, accessibility, and performance.

## Architecture Overview

```mermaid
graph TD
    A[New Component] --> B{Complexity Assessment}
    
    B --> C[EDS-Native Pattern<br/>Simple Components]
    B --> D[Spectrum-Enhanced Pattern<br/>Complex Components]
    
    C --> E[Common Standards Layer]
    D --> E
    
    E --> F[Error Handling]
    E --> G[Accessibility]
    E --> H[Performance]
    E --> I[Testing]
    
    F --> J[Implementation]
    G --> J
    H --> J
    I --> J
```

## Pattern Selection Criteria

### EDS-Native Pattern (Simple Components)

**Use When:**

- Simple or no state management required
- Custom styling needs
- Performance is critical
- Minimal dependencies preferred
- No build process required

**File Structure:**

```bash
/blocks/{component-name}/
├── {component-name}.js
├── {component-name}.css
├── test.html
├── README.md
└── example.md
```

**Examples:** floating-alert, banners, simple cards, content blocks, text components

### Spectrum-Enhanced Pattern (Complex Components)

**Use When:**

- Component has 5+ interactive elements
- Complex state management required
- Rich UI components needed
- Consistent design system appearance critical
- Advanced interactions required
- External dependencies need bundling

**File Structure:**

```bash
/build/{component-name}/           # Source files for development
├── {component-name}.js           # Source implementation
├── {component-name}.css          # Source styles
├── index.html                    # Development test file
├── package.json                  # Dependencies and build scripts
├── vite.config.js               # Build configuration
└── README.md                     # Development documentation

/blocks/{component-name}/          # Built files for EDS deployment
├── {component-name}.js           # Bundled implementation
├── {component-name}.css          # Processed styles
├── test.html                     # EDS test file
├── README.md                     # Usage documentation
└── example.md                    # Content author examples
```

**Build Process:**

- Development happens in `/build/{component-name}/`
- `npm run build` bundles dependencies using Vite
- Built files are copied to `/blocks/{component-name}/` for EDS deployment
- Use `scripts/build-component.js` for automated building

**Examples:** spectrum-card, data tables, complex forms, dashboards, interactive modals

## Common Standards (Both Patterns)

### 1. File Structure

```bash
/blocks/{component-name}/
├── {component-name}.js          # Core functionality
├── {component-name}.css         # Component styles
├── test.html                    # Standardized test file
├── README.md                    # Documentation
├── example.md                   # Content author examples
└── {component-name}.test.js     # Unit tests (optional)
```

### 2. JavaScript Architecture Standards

#### Configuration Constants Pattern

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

#### Standard Decorate Function Structure

```javascript
export default async function decorate(block) {
  try {
    // 1. Early validation and setup
    if (!block || !block.children.length) {
      throw new Error('Invalid block structure');
    }
    
    // 2. Configuration and state initialization
    const config = { ...COMPONENT_CONFIG };
    
    // 3. Content extraction (pattern-specific)
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

### 3. Error Handling Standards

#### Standard Error Handling Pattern

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

### 4. Accessibility Standards

#### Required Accessibility Implementation

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

### 5. Performance Standards

#### Loading States and Optimization

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

## Pattern-Specific Implementation

### EDS-Native Pattern Implementation

#### HTML Structure

```html
<div class="component-name block" data-block-name="component-name" data-block-status="initialized">
  <div>
    <div>
      <!-- EDS-standard nested content structure -->
    </div>
  </div>
</div>
```

#### Content Extraction Pattern

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

#### Test File Template (EDS-Native)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Component] Test - EDS Structure</title>
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
        <h1>[Component] Test Page</h1>
        
        <div class="[component] block" data-block-name="[component]" data-block-status="initialized">
            <div>
                <div>
                    <!-- Test content here -->
                </div>
            </div>
        </div>
    </div>

    <script type="module">
        import decorate from './[component].js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const blocks = document.querySelectorAll('.[component].block');
            blocks.forEach(decorate);
        });
    </script>
</body>
</html>
```

### Spectrum-Enhanced Pattern Implementation

#### Spectrum HTML Structure

```html
<sp-theme color="light" scale="medium" system="spectrum">
  <div class="component-name block">
    <div>
      <!-- Content structure -->
    </div>
  </div>
</sp-theme>
```

#### Spectrum Integration Pattern

```javascript
// Import required Spectrum components at the top
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/sp-theme.js';

export default async function decorate(block) {
  try {
    // Ensure Spectrum theme is available
    await customElements.whenDefined('sp-theme');
    
    // Standard implementation with Spectrum components
    const content = extractContent(block);
    const container = createSpectrumStructure(content);
    
    // Apply Spectrum styling and behavior
    setupSpectrumComponents(container);
    
    block.innerHTML = '';
    block.appendChild(container);
    
  } catch (error) {
    handleComponentError(error, block);
  }
}
```

#### Test File Template (Spectrum-Enhanced)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Component] Test - Spectrum Enhanced</title>
    <script type="module">
        import '@spectrum-web-components/theme/theme-light.js';
        import '@spectrum-web-components/theme/scale-medium.js';
        import '@spectrum-web-components/theme/sp-theme.js';
    </script>
    <style>
        body {
            background: #f5f5f5;
            font-family: var(--spectrum-sans-font-family-stack);
        }
        .test-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
    </style>
</head>
<body>
    <sp-theme color="light" scale="medium" system="spectrum">
        <div class="test-container">
            <h1>[Component] Test Page</h1>
            
            <div class="[component] block">
                <div>
                    <!-- Test content here -->
                </div>
            </div>
        </div>
    </sp-theme>

    <script type="module">
        import decorate from './[component].js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const blocks = document.querySelectorAll('.[component].block');
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

- [ ] Component complexity assessed using decision criteria
- [ ] Appropriate pattern selected (EDS-Native vs Spectrum-Enhanced)
- [ ] File structure planned according to standards
- [ ] Dependencies identified and approved
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
- [ ] Bundle size impact assessed

### Pattern-Specific Checklists

#### EDS-Native Pattern Checklist

- [ ] EDS block structure with data-block-* attributes
- [ ] Content extraction handles nested div structure
- [ ] Pure CSS without external dependencies
- [ ] Manual DOM initialization implemented
- [ ] Custom styling follows design system
- [ ] Test file uses standard EDS structure

#### Spectrum-Enhanced Pattern Checklist

- [ ] Required Spectrum components imported
- [ ] sp-theme wrapper properly configured
- [ ] customElements.whenDefined() used for timing
- [ ] Spectrum design tokens utilized
- [ ] Component integration tested
- [ ] Test file includes Spectrum theme setup

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

## Implementation Timeline

### Phase 1: Foundation (Week 1)

- [ ] Finalize architecture standards document
- [ ] Create development templates and generators
- [ ] Set up validation tools and checklists
- [ ] Train development team on new standards

### Phase 2: Existing Component Audit (Week 2)

- [ ] Audit all existing components against standards
- [ ] Classify components by pattern type
- [ ] Identify components needing updates
- [ ] Prioritize updates based on usage and impact

### Phase 3: Standardization Implementation (Weeks 3-4)

- [ ] Update existing components to meet standards
- [ ] Implement missing error handling and accessibility
- [ ] Standardize test files and documentation
- [ ] Validate all components against checklists

### Phase 4: Quality Assurance (Week 5)

- [ ] Comprehensive testing of all components
- [ ] Accessibility audit of updated components
- [ ] Performance benchmarking
- [ ] Documentation review and updates

### Phase 5: Rollout and Training (Week 6)

- [ ] Deploy updated components
- [ ] Conduct team training sessions
- [ ] Update development workflows
- [ ] Monitor for issues and gather feedback

## Conclusion

This dual-pattern architecture provides a robust foundation for EDS block development while maintaining flexibility for different component types. By following these standards, we ensure consistency, accessibility, performance, and maintainability across all components.

The validation checklists serve as practical tools to ensure compliance and quality, while the common standards layer provides consistency regardless of which pattern is chosen.

Regular review and updates of these standards will ensure they continue to serve the project's evolving needs while maintaining the core principles of simplicity, performance, and accessibility.
