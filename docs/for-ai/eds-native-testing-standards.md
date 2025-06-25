# AI text for EDS-Native Pattern Testing Standards

## Overview

This document defines testing standards specifically for EDS-Native pattern components like [`floating-alert`](../blocks/floating-alert/test.html). These components use direct implementation without build processes and focus on simplicity and performance.

## Pattern Characteristics

- **Direct Implementation**: Components live directly in `/blocks/{component-name}/`
- **No Build Process**: Files are used as-is without bundling
- **Pure Vanilla JS**: ES modules without external dependencies
- **Custom CSS**: Component-specific styling without preprocessors

## Test File Structure

### Standard Test File Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component Test - EDS Native Pattern</title>
    
    <!-- EDS Native Styles (root-based paths for server.js) -->
    <link rel="stylesheet" href="/styles/styles.css">
    <link rel="stylesheet" href="/styles/fonts.css">
    <link rel="stylesheet" href="/styles/lazy-styles.css">
    <!-- Note: Component CSS is loaded dynamically by EDS, not manually linked -->
    
    <style>
        /* Test-specific styling using EDS design tokens - just for nice looking background */
        body {
            padding: 2rem;
            background: var(--light-color);
        }
        
        .test-content {
            max-width: 1200px;
            margin: 0 auto;
            background: var(--background-color);
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .test-section {
            margin: 2rem 0;
            padding: 1rem;
            border: 1px solid var(--dark-color, #505050);
            border-radius: 4px;
            background: var(--background-color);
        }
        
        .test-section h2 {
            color: var(--text-color);
            font-family: var(--heading-font-family);
            font-size: var(--heading-font-size-m);
            margin-top: 0;
        }
        
        .test-button {
            background: var(--link-color);
            color: var(--background-color);
            border: 2px solid transparent;
            border-radius: 2.4em;
            padding: 0.5em 1.2em;
            font-family: var(--body-font-family);
            font-weight: 500;
            cursor: pointer;
            margin: 0.5rem;
            text-decoration: none;
            display: inline-block;
        }
        
        .test-button:hover {
            background: var(--link-hover-color);
        }
        
        .test-button:focus {
            outline: 2px solid var(--link-color);
            outline-offset: 2px;
        }
        
        /* Ensure body appears (EDS pattern) */
        body.appear {
            display: block;
        }
    </style>
</head></search>
<body>
    <div class="test-content">
        <h1>Component Test Page - EDS Native Pattern</h1>
        <p>Testing EDS-Native component with direct implementation.</p>
        
        <!-- Standard EDS Block Structure -->
        <div class="test-section">
            <h2>Basic Component Test</h2>
            <div class="component-name block" data-block-name="component-name" data-block-status="initialized">
                <div>
                    <div>
                        <!-- Test content here -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Error Handling Tests -->
        <div class="test-section">
            <h2>Error Handling Tests</h2>
            <button class="test-button" onclick="testErrorScenario()">Test Error Scenario</button>
            <button class="test-button" onclick="testNetworkError()">Test Network Error</button>
            <button class="test-button" onclick="testTimeoutError()">Test Timeout</button>
        </div>

        <!-- Accessibility Tests -->
        <div class="test-section">
            <h2>Accessibility Tests</h2>
            <button class="test-button" onclick="testKeyboardNavigation()">Test Keyboard Navigation</button>
            <button class="test-button" onclick="testScreenReader()">Test Screen Reader</button>
            <button class="test-button" onclick="testFocusManagement()">Test Focus Management</button>
        </div>

        <!-- Performance Tests -->
        <div class="test-section">
            <h2>Performance Tests</h2>
            <button class="test-button" onclick="testLoadingStates()">Test Loading States</button>
            <button class="test-button" onclick="testMemoryLeaks()">Test Memory Leaks</button>
        </div>
    </div>

    <script type="module">
        import decorate from '/blocks/component-name/component-name.js';
        
        // EDS Native initialization pattern
        document.addEventListener('DOMContentLoaded', () => {
            // Make body appear (EDS pattern)
            document.body.classList.add('appear');
            
            // Initialize components
            const blocks = document.querySelectorAll('.component-name.block');
            blocks.forEach(decorate);
        });

        // Test functions
        window.testErrorScenario = function() {
            console.log('Testing error scenario...');
            // Implement error testing
        };

        window.testNetworkError = function() {
            console.log('Testing network error...');
            // Implement network error testing
        };

        window.testTimeoutError = function() {
            console.log('Testing timeout error...');
            // Implement timeout testing
        };

        window.testKeyboardNavigation = function() {
            console.log('Testing keyboard navigation...');
            // Implement keyboard testing
        };

        window.testScreenReader = function() {
            console.log('Testing screen reader compatibility...');
            // Implement screen reader testing
        };

        window.testFocusManagement = function() {
            console.log('Testing focus management...');
            // Implement focus testing
        };

        window.testLoadingStates = function() {
            console.log('Testing loading states...');
            // Implement loading state testing
        };

        window.testMemoryLeaks = function() {
            console.log('Testing memory leaks...');
            // Implement memory leak testing
        };
    </script>
</body>
</html>
```

## EDS Native Style Integration

### Using Native EDS Styles

EDS-Native components should leverage the existing style system in `/styles/`:

- **`styles.css`**: Core EDS design tokens and base styles
- **`fonts.css`**:  font definitions
- **`lazy-styles.css`**: Post-LCP global styles

### Design Tokens Available

```css
/* Colors */
--background-color: white;
--light-color: #f8f8f8;
--dark-color: #505050;
--text-color: #131313;
--link-color: #3b63fb;
--link-hover-color: #1d3ecf;

/* Typography */
--body-font-family: roboto, roboto-fallback, sans-serif;
--heading-font-family: roboto-condensed, roboto-condensed-fallback, sans-serif;

/* Font Sizes */
--body-font-size-m: 22px;
--body-font-size-s: 19px;
--body-font-size-xs: 17px;
--heading-font-size-xxl: 55px;
--heading-font-size-xl: 44px;
--heading-font-size-l: 34px;
--heading-font-size-m: 27px;
--heading-font-size-s: 24px;
--heading-font-size-xs: 22px;
```

### Test File Style Integration

```html
<!-- EDS native styles (served by server.js) - proper loading order -->
<link rel="stylesheet" href="/styles/styles.css">
<link rel="stylesheet" href="/styles/fonts.css">
<link rel="stylesheet" href="/styles/lazy-styles.css">
<!-- Component CSS is loaded dynamically by EDS - no manual linking needed -->
```

**Style Loading Order:**

1. **`styles.css`** - Core EDS design tokens, base styles, and critical CSS
2. **`fonts.css`** - Font face definitions
3. **`lazy-styles.css`** - Post-LCP (Largest Contentful Paint) global styles
4. **Custom `<style>` block** - Test-specific styling for nice looking background and layout (not part of component functionality)

### EDS Dynamic CSS Loading

EDS automatically loads component CSS files from `/blocks/{component-name}/{component-name}.css` when the component is initialized. This means:

- **No manual CSS linking required** in test files
- **CSS is loaded on-demand** when the component is used
- **Consistent with production EDS behavior**
- **Server.js serves all files** from root-based paths

### Server.js Development Workflow

The project uses `server.js` for local development which:

1. **Serves local files first** from the project root
2. **Proxies missing files** to `https://allabout.network`
3. **Uses root-based paths** (e.g., `/styles/styles.css`, `/blocks/component/component.js`)
4. **Handles MIME types** for all file types (JS, CSS, fonts, etc.)

**Testing Workflow:**

```bash
# Start the development server
node server.js

# Access test files at:
# http://localhost:3000/blocks/[component]/test.html
```

**File Serving Priority:**

1. Local files in project directory
2. Proxy to external server if not found locally
3. 404 if neither source has the file

### Component CSS Best Practices

```css
/* Use EDS design tokens in component styles */
.my-component {
  font-family: var(--body-font-family);
  color: var(--text-color);
  background: var(--background-color);
}

.my-component h2 {
  font-family: var(--heading-font-family);
  font-size: var(--heading-font-size-m);
}

.my-component .button {
  background: var(--link-color);
  color: var(--background-color);
}

.my-component .button:hover {
  background: var(--link-hover-color);
}
```

## Testing Requirements

### 1. Component Initialization Testing

```javascript
// Test basic component initialization
function testComponentInitialization() {
    const block = document.querySelector('.component-name.block');
    
    // Verify block exists
    assert(block !== null, 'Component block should exist');
    
    // Verify data attributes
    assert(block.getAttribute('data-block-name') === 'component-name', 'Block name should be set');
    assert(block.getAttribute('data-block-status') === 'initialized', 'Block status should be initialized');
    
    // Verify component was decorated
    assert(block.children.length > 0, 'Component should have content after decoration');
}
```

### 2. Error Handling Testing

```javascript
// Test error handling scenarios
function testErrorHandling() {
    // Test invalid block structure
    const invalidBlock = document.createElement('div');
    invalidBlock.className = 'component-name block';
    
    try {
        decorate(invalidBlock);
        // Should handle gracefully
        assert(invalidBlock.querySelector('.component-error') !== null, 'Error state should be displayed');
    } catch (error) {
        assert(false, 'Component should handle errors gracefully');
    }
}

// Test network error handling
function testNetworkErrorHandling() {
    // Mock fetch to simulate network error
    const originalFetch = window.fetch;
    window.fetch = () => Promise.reject(new Error('Network error'));
    
    // Test component behavior
    const block = createTestBlock();
    decorate(block).then(() => {
        assert(block.querySelector('.component-error') !== null, 'Network error should be handled');
        window.fetch = originalFetch; // Restore
    });
}
```

### 3. Accessibility Testing

```javascript
// Test keyboard navigation
function testKeyboardNavigation() {
    const component = document.querySelector('.component-name');
    
    // Test Tab navigation
    const focusableElements = component.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    assert(focusableElements.length > 0, 'Component should have focusable elements');
    
    // Test Escape key handling
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    component.dispatchEvent(escapeEvent);
    
    // Verify expected behavior
}

// Test ARIA attributes
function testAriaAttributes() {
    const component = document.querySelector('.component-name');
    
    // Check required ARIA attributes
    assert(component.getAttribute('role') !== null, 'Component should have role attribute');
    assert(component.getAttribute('aria-label') !== null || 
           component.getAttribute('aria-labelledby') !== null, 
           'Component should have accessible name');
}

// Test screen reader compatibility
function testScreenReaderCompatibility() {
    const component = document.querySelector('.component-name');
    
    // Check for live regions
    const liveRegions = component.querySelectorAll('[aria-live]');
    assert(liveRegions.length > 0, 'Component should have live regions for dynamic content');
    
    // Check for proper heading structure
    const headings = component.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length > 0) {
        // Verify heading hierarchy
        assert(headings[0].tagName.toLowerCase() !== 'h1' || 
               document.querySelectorAll('h1').length === 1, 
               'Only one h1 should exist on page');
    }
}
```

### 4. Performance Testing

```javascript
// Test loading states
function testLoadingStates() {
    const block = createTestBlock();
    
    // Mock slow operation
    const slowDecorate = async (block) => {
        const loader = showLoadingState(block);
        await new Promise(resolve => setTimeout(resolve, 100));
        hideLoadingState(loader);
    };
    
    const startTime = performance.now();
    slowDecorate(block).then(() => {
        const endTime = performance.now();
        assert(endTime - startTime >= 100, 'Loading state should be shown for slow operations');
    });
}

// Test memory leaks
function testMemoryLeaks() {
    const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    
    // Create and destroy multiple components
    for (let i = 0; i < 100; i++) {
        const block = createTestBlock();
        const cleanup = decorate(block);
        
        // Clean up
        if (cleanup && typeof cleanup === 'function') {
            cleanup();
        }
        block.remove();
    }
    
    // Force garbage collection if available
    if (window.gc) {
        window.gc();
    }
    
    const finalMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    const memoryIncrease = finalMemory - initialMemory;
    
    // Memory increase should be reasonable (less than 1MB for 100 components)
    assert(memoryIncrease < 1024 * 1024, 'Memory usage should not increase significantly');
}
```

## Testing Checklist

### Pre-Test Setup

- [ ] Test file follows standard template structure
- [ ] Component CSS is properly linked
- [ ] Test styling is consistent and accessible
- [ ] All test functions are implemented

### Component Initialization

- [ ] Component initializes without errors
- [ ] EDS block structure is properly recognized
- [ ] Data attributes are correctly set
- [ ] Component content is rendered

### Error Handling

- [ ] Invalid block structure is handled gracefully
- [ ] Network errors display user-friendly messages
- [ ] Timeout errors are caught and handled
- [ ] Error states include retry mechanisms
- [ ] Console errors are logged appropriately

### Accessibility

- [ ] All interactive elements are keyboard accessible
- [ ] Tab navigation works correctly
- [ ] Escape key closes modals/overlays
- [ ] ARIA attributes are properly set
- [ ] Screen reader announcements work
- [ ] Focus management is implemented
- [ ] Color contrast meets WCAG standards
- [ ] Component works without JavaScript

### Performance

- [ ] Loading states appear for operations > 200ms
- [ ] No memory leaks detected
- [ ] Event listeners are properly cleaned up
- [ ] Animations use transform/opacity
- [ ] No layout thrashing occurs
- [ ] Component loads quickly

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Mobile Testing

- [ ] Touch interactions work correctly
- [ ] Component is responsive
- [ ] Text is readable on small screens
- [ ] Buttons are appropriately sized
- [ ] No horizontal scrolling

## Test Automation

### Unit Testing Framework

```javascript
// Simple assertion framework for EDS-Native components
class EDSTestFramework {
    constructor() {
        this.tests = [];
        this.results = [];
    }
    
    test(name, testFunction) {
        this.tests.push({ name, testFunction });
    }
    
    async runAll() {
        for (const test of this.tests) {
            try {
                await test.testFunction();
                this.results.push({ name: test.name, status: 'PASS' });
                console.log(`✅ ${test.name}`);
            } catch (error) {
                this.results.push({ name: test.name, status: 'FAIL', error });
                console.error(`❌ ${test.name}: ${error.message}`);
            }
        }
        
        this.printSummary();
    }
    
    printSummary() {
        const passed = this.results.filter(r => r.status === 'PASS').length;
        const failed = this.results.filter(r => r.status === 'FAIL').length;
        
        console.log(`\n📊 Test Summary: ${passed} passed, ${failed} failed`);
    }
}

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
```

### Usage Example

```javascript
const testFramework = new EDSTestFramework();

testFramework.test('Component initializes correctly', testComponentInitialization);
testFramework.test('Error handling works', testErrorHandling);
testFramework.test('Keyboard navigation works', testKeyboardNavigation);
testFramework.test('No memory leaks', testMemoryLeaks);

// Run all tests
testFramework.runAll();
```

## Best Practices

1. **Keep Tests Simple**: EDS-Native components should have straightforward tests
2. **Test Real Scenarios**: Focus on actual user interactions and edge cases
3. **Verify Cleanup**: Ensure event listeners and resources are properly cleaned up
4. **Test Without Dependencies**: Components should work independently
5. **Document Test Cases**: Each test should clearly explain what it's verifying
6. **Use Real Data**: Test with realistic content and data structures
7. **Test Progressive Enhancement**: Ensure components work without JavaScript
8. **Validate HTML**: Use valid, semantic HTML structure
9. **Test Accessibility**: Include comprehensive accessibility testing
10. **Monitor Performance**: Track loading times and memory usage

This testing standard ensures EDS-Native components are robust, accessible, and performant while maintaining the simplicity that defines this pattern.
