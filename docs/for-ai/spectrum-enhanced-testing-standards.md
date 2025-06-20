# AI text for Spectrum-Enhanced EDS Pattern Testing Standards

## Overview

This document defines testing standards specifically for Spectrum-Enhanced pattern components like [`spectrum-card`](../blocks/spectrum-card/test.html). These components use a build process with Spectrum Web Components and require bundling for deployment.

## Pattern Characteristics

- **Build Process**: Development in `/build/{component-name}/`, deployment to `/blocks/{component-name}/`
- **Spectrum Web Components**: Uses `@spectrum-web-components` packages
- **Bundling Required**: Vite build process bundles dependencies
- **Theme Integration**: Uses `sp-theme` wrapper for consistent styling

## Test File Structure

### Development Test File Template (`/build/{component-name}/index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Component] Development Test - Spectrum Enhanced</title>
    <script type="module">
        import '@spectrum-web-components/theme/theme-light.js';
        import '@spectrum-web-components/theme/scale-medium.js';
        import '@spectrum-web-components/theme/sp-theme.js';
    </script>
    <style>
        body {
            background: #f5f5f5;
            font-family: var(--spectrum-sans-font-family-stack);
            margin: 0;
            padding: 20px;
        }
        .test-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .test-section {
            margin: 2rem 0;
            padding: 1rem;
            border: 1px solid var(--spectrum-gray-300);
            border-radius: 4px;
        }
        .test-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
    <sp-theme color="light" scale="medium" system="spectrum">
        <div class="test-container">
            <h1>[Component] Development Test - Spectrum Enhanced</h1>
            <p>Testing Spectrum-Enhanced component with build process and Spectrum Web Components.</p>
            
            <!-- Basic Component Test -->
            <div class="test-section">
                <h2>Basic Component Test</h2>
                <div class="test-grid">
                    <div class="[component] block">
                        <div>Basic test content</div>
                    </div>
                </div>
            </div>

            <!-- Error Handling Tests -->
            <div class="test-section">
                <h2>Error Handling Tests</h2>
                <sp-button onclick="testNetworkError()">Test Network Error</sp-button>
                <sp-button onclick="testDataError()">Test Data Error</sp-button>
                <sp-button onclick="testTimeoutError()">Test Timeout</sp-button>
            </div>

            <!-- Accessibility Tests -->
            <div class="test-section">
                <h2>Accessibility Tests</h2>
                <sp-button onclick="testKeyboardNavigation()">Test Keyboard Navigation</sp-button>
                <sp-button onclick="testScreenReader()">Test Screen Reader</sp-button>
                <sp-button onclick="testFocusManagement()">Test Focus Management</sp-button>
            </div>

            <!-- Spectrum Component Tests -->
            <div class="test-section">
                <h2>Spectrum Component Integration</h2>
                <sp-button onclick="testSpectrumComponents()">Test Spectrum Components</sp-button>
                <sp-button onclick="testThemeIntegration()">Test Theme Integration</sp-button>
                <sp-button onclick="testResponsiveDesign()">Test Responsive Design</sp-button>
            </div>

            <!-- Performance Tests -->
            <div class="test-section">
                <h2>Performance Tests</h2>
                <sp-button onclick="testLoadingStates()">Test Loading States</sp-button>
                <sp-button onclick="testBundleSize()">Test Bundle Size</sp-button>
                <sp-button onclick="testMemoryUsage()">Test Memory Usage</sp-button>
            </div>
        </div>
    </sp-theme>

    <script type="module">
        import decorate from './[component].js';
        
        // Wait for Spectrum components to be ready
        await customElements.whenDefined('sp-theme');
        await customElements.whenDefined('sp-button');
        
        // Initialize components
        document.addEventListener('DOMContentLoaded', () => {
            const blocks = document.querySelectorAll('.[component].block');
            blocks.forEach(decorate);
        });

        // Test functions
        window.testNetworkError = function() {
            console.log('Testing network error handling...');
            // Implement network error testing
        };

        window.testDataError = function() {
            console.log('Testing data error handling...');
            // Implement data error testing
        };

        window.testTimeoutError = function() {
            console.log('Testing timeout error handling...');
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

        window.testSpectrumComponents = function() {
            console.log('Testing Spectrum component integration...');
            // Implement Spectrum component testing
        };

        window.testThemeIntegration = function() {
            console.log('Testing theme integration...');
            // Implement theme testing
        };

        window.testResponsiveDesign = function() {
            console.log('Testing responsive design...');
            // Implement responsive testing
        };

        window.testLoadingStates = function() {
            console.log('Testing loading states...');
            // Implement loading state testing
        };

        window.testBundleSize = function() {
            console.log('Testing bundle size...');
            // Implement bundle size testing
        };

        window.testMemoryUsage = function() {
            console.log('Testing memory usage...');
            // Implement memory usage testing
        };
    </script>
</body>
</html>
```

### Production Block Test File Template (`/blocks/{component-name}/test.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Component] Production Test - Spectrum Enhanced</title>
    <style>
        body {
            background: #f5f5f5;
            font-family: var(--spectrum-sans-font-family-stack);
            margin: 0;
            padding: 20px;
        }
        .test-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .test-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
    <sp-theme color="light" scale="medium" system="spectrum">
        <div class="test-container">
            <h1>[Component] Production Test - Spectrum Enhanced</h1>
            <p>Testing bundled Spectrum-Enhanced component for EDS deployment.</p>
            
            <div class="test-grid">
                <div class="[component] block">
                    <div>Production test content</div>
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

## Testing Requirements

### 1. Build Process Testing

```javascript
// Test build process integration
function testBuildProcess() {
    // Verify bundled files exist
    const jsFile = '/blocks/component-name/component-name.js';
    const cssFile = '/blocks/component-name/component-name.css';
    
    fetch(jsFile).then(response => {
        assert(response.ok, 'Bundled JS file should be accessible');
        return response.text();
    }).then(content => {
        assert(content.includes('spectrum-web-components'), 'Bundle should include Spectrum components');
    });
    
    fetch(cssFile).then(response => {
        assert(response.ok, 'Bundled CSS file should be accessible');
    });
}

// Test development vs production consistency
function testDevProdConsistency() {
    const devComponent = document.querySelector('.dev-component');
    const prodComponent = document.querySelector('.prod-component');
    
    // Compare rendered output
    assert(devComponent.innerHTML === prodComponent.innerHTML, 
           'Development and production components should render identically');
}
```

### 2. Spectrum Component Integration Testing

```javascript
// Test Spectrum Web Components integration
async function testSpectrumIntegration() {
    // Wait for Spectrum components to be defined
    await customElements.whenDefined('sp-theme');
    await customElements.whenDefined('sp-button');
    await customElements.whenDefined('sp-card');
    
    const theme = document.querySelector('sp-theme');
    assert(theme !== null, 'sp-theme should be present');
    assert(theme.color === 'light', 'Theme should be set to light');
    assert(theme.scale === 'medium', 'Theme should be set to medium scale');
    
    // Test Spectrum component functionality
    const buttons = document.querySelectorAll('sp-button');
    buttons.forEach(button => {
        assert(button.shadowRoot !== null, 'Spectrum buttons should have shadow DOM');
    });
}

// Test theme integration
function testThemeIntegration() {
    const component = document.querySelector('.component-name');
    const computedStyle = window.getComputedStyle(component);
    
    // Verify Spectrum design tokens are applied
    const fontFamily = computedStyle.getPropertyValue('font-family');
    assert(fontFamily.includes('adobe-clean'), 'Component should use Spectrum font family');
    
    // Test theme switching
    const theme = document.querySelector('sp-theme');
    theme.color = 'dark';
    
    // Verify theme change affects component
    setTimeout(() => {
        const newStyle = window.getComputedStyle(component);
        assert(newStyle.backgroundColor !== computedStyle.backgroundColor, 
               'Theme change should affect component styling');
    }, 100);
}
```

### 3. Advanced Error Handling Testing

```javascript
// Test network error handling with retry
async function testNetworkErrorHandling() {
    const originalFetch = window.fetch;
    let attemptCount = 0;
    
    // Mock fetch to fail first two attempts, succeed on third
    window.fetch = (url) => {
        attemptCount++;
        if (attemptCount < 3) {
            return Promise.reject(new Error('Network error'));
        }
        return originalFetch(url);
    };
    
    const block = createTestBlock();
    await decorate(block);
    
    assert(attemptCount === 3, 'Component should retry failed requests');
    assert(block.querySelector('.component-error') === null, 'Error should be resolved after retry');
    
    window.fetch = originalFetch; // Restore
}

// Test timeout handling
function testTimeoutHandling() {
    const originalFetch = window.fetch;
    
    // Mock fetch to never resolve
    window.fetch = () => new Promise(() => {}); // Never resolves
    
    const block = createTestBlock();
    const startTime = Date.now();
    
    decorate(block).catch(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        assert(duration >= 5000 && duration < 6000, 
               'Component should timeout after configured duration');
        assert(block.querySelector('.component-error') !== null, 
               'Timeout should display error state');
        
        window.fetch = originalFetch; // Restore
    });
}
```

### 4. Advanced Accessibility Testing

```javascript
// Test complex keyboard navigation
function testComplexKeyboardNavigation() {
    const component = document.querySelector('.component-name');
    const cards = component.querySelectorAll('sp-card');
    
    // Test arrow key navigation between cards
    cards[0].focus();
    
    const rightArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    cards[0].dispatchEvent(rightArrowEvent);
    
    assert(document.activeElement === cards[1], 'Arrow right should focus next card');
    
    const leftArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    cards[1].dispatchEvent(leftArrowEvent);
    
    assert(document.activeElement === cards[0], 'Arrow left should focus previous card');
}

// Test modal accessibility
function testModalAccessibility() {
    const card = document.querySelector('sp-card');
    const button = card.querySelector('sp-button');
    
    // Open modal
    button.click();
    
    const modal = document.querySelector('.spectrum-card-modal');
    assert(modal !== null, 'Modal should be created');
    assert(modal.getAttribute('role') === 'dialog', 'Modal should have dialog role');
    assert(modal.getAttribute('aria-modal') === 'true', 'Modal should have aria-modal');
    
    // Test focus trap
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    assert(focusableElements.length > 0, 'Modal should have focusable elements');
    assert(document.activeElement === focusableElements[0], 'First element should be focused');
    
    // Test escape key
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    modal.dispatchEvent(escapeEvent);
    
    setTimeout(() => {
        assert(document.querySelector('.spectrum-card-modal') === null, 
               'Modal should close on escape key');
    }, 100);
}
```

### 5. Performance Testing

```javascript
// Test bundle size
async function testBundleSize() {
    const jsResponse = await fetch('./component-name.js');
    const jsSize = parseInt(jsResponse.headers.get('content-length'));
    
    const cssResponse = await fetch('./component-name.css');
    const cssSize = parseInt(cssResponse.headers.get('content-length'));
    
    const totalSize = jsSize + cssSize;
    
    // Bundle should be reasonable size (adjust threshold as needed)
    assert(totalSize < 500 * 1024, 'Total bundle size should be less than 500KB');
    
    console.log(`Bundle size: JS ${jsSize} bytes, CSS ${cssSize} bytes, Total ${totalSize} bytes`);
}

// Test loading performance
function testLoadingPerformance() {
    const startTime = performance.now();
    
    const block = createTestBlock();
    decorate(block).then(() => {
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        
        assert(loadTime < 1000, 'Component should load in less than 1 second');
        console.log(`Component load time: ${loadTime}ms`);
    });
}

// Test memory usage with Spectrum components
function testSpectrumMemoryUsage() {
    const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    
    // Create multiple Spectrum components
    for (let i = 0; i < 50; i++) {
        const theme = document.createElement('sp-theme');
        const card = document.createElement('sp-card');
        const button = document.createElement('sp-button');
        
        theme.appendChild(card);
        card.appendChild(button);
        document.body.appendChild(theme);
        
        // Clean up
        theme.remove();
    }
    
    // Force garbage collection
    if (window.gc) {
        window.gc();
    }
    
    const finalMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    const memoryIncrease = finalMemory - initialMemory;
    
    assert(memoryIncrease < 5 * 1024 * 1024, 'Memory increase should be less than 5MB');
}
```

## Testing Checklist

### Pre-Test Setup

- [ ] Development environment set up in `/build/{component-name}/`
- [ ] `npm install` completed successfully
- [ ] `npm run dev` starts development server
- [ ] All Spectrum Web Components are imported correctly
- [ ] Theme integration is working

### Build Process Testing

- [ ] `npm run build` completes without errors
- [ ] Bundled files are created in `dist/` directory
- [ ] `scripts/build-component.js` copies files to `/blocks/` successfully
- [ ] Production test file loads bundled component correctly
- [ ] Bundle size is within acceptable limits
- [ ] No build warnings or errors

### Component Initialization

- [ ] Spectrum Web Components load correctly
- [ ] `customElements.whenDefined()` resolves for all components
- [ ] Theme wrapper (`sp-theme`) is properly configured
- [ ] Component initializes without errors
- [ ] Data fetching works correctly

### Error Handling

- [ ] Network errors are handled with retry logic
- [ ] Timeout errors display appropriate messages
- [ ] Data parsing errors are caught
- [ ] User-friendly error states are shown
- [ ] Error recovery mechanisms work
- [ ] Console errors are properly logged

### Accessibility

- [ ] All Spectrum components are keyboard accessible
- [ ] Custom keyboard navigation works (arrow keys, etc.)
- [ ] Modal dialogs have proper focus management
- [ ] ARIA attributes are correctly set
- [ ] Screen reader compatibility verified
- [ ] Color contrast meets WCAG standards
- [ ] Focus indicators are visible
- [ ] Tab order is logical

### Spectrum Integration

- [ ] All required Spectrum components are imported
- [ ] Theme tokens are properly applied
- [ ] Component styling matches Spectrum design system
- [ ] Theme switching works correctly
- [ ] Responsive behavior follows Spectrum patterns
- [ ] Icons and typography are consistent

### Performance

- [ ] Initial load time is acceptable (< 1 second)
- [ ] Bundle size is optimized
- [ ] No memory leaks with Spectrum components
- [ ] Smooth animations and transitions
- [ ] Efficient re-rendering
- [ ] Lazy loading implemented where appropriate

### Cross-Browser Testing

- [ ] Chrome (latest) - development and production
- [ ] Firefox (latest) - development and production
- [ ] Safari (latest) - development and production
- [ ] Edge (latest) - development and production
- [ ] Mobile browsers - production only

## Test Automation

### Build Process Testing Script

```javascript
// test-build-process.js
import { execSync } from 'child_process';
import { existsSync, statSync } from 'fs';
import { join } from 'path';

class BuildProcessTester {
    constructor(componentName) {
        this.componentName = componentName;
        this.buildDir = join(process.cwd(), 'build', componentName);
        this.blocksDir = join(process.cwd(), 'blocks', componentName);
    }
    
    async testFullBuildProcess() {
        console.log('🧪 Testing build process...');
        
        // Test development build
        this.testDevelopmentBuild();
        
        // Test production build
        this.testProductionBuild();
        
        // Test file copying
        this.testFileCopying();
        
        // Test bundle validation
        this.testBundleValidation();
        
        console.log('✅ Build process tests completed');
    }
    
    testDevelopmentBuild() {
        console.log('Testing development build...');
        
        try {
            execSync('npm run dev', { 
                cwd: this.buildDir, 
                stdio: 'pipe',
                timeout: 10000 
            });
            console.log('✅ Development server starts successfully');
        } catch (error) {
            throw new Error(`Development build failed: ${error.message}`);
        }
    }
    
    testProductionBuild() {
        console.log('Testing production build...');
        
        try {
            execSync('npm run build', { 
                cwd: this.buildDir, 
                stdio: 'pipe' 
            });
            
            const distDir = join(this.buildDir, 'dist');
            const jsFile = join(distDir, `${this.componentName}.js`);
            const cssFile = join(distDir, `${this.componentName}.css`);
            
            if (!existsSync(jsFile)) {
                throw new Error('JS bundle not created');
            }
            
            if (!existsSync(cssFile)) {
                console.warn('⚠️  CSS bundle not created');
            }
            
            console.log('✅ Production build successful');
        } catch (error) {
            throw new Error(`Production build failed: ${error.message}`);
        }
    }
    
    testFileCopying() {
        console.log('Testing file copying...');
        
        try {
            execSync('node ../../scripts/build-component.js', { 
                cwd: this.buildDir, 
                stdio: 'pipe' 
            });
            
            const jsFile = join(this.blocksDir, `${this.componentName}.js`);
            const cssFile = join(this.blocksDir, `${this.componentName}.css`);
            
            if (!existsSync(jsFile)) {
                throw new Error('JS file not copied to blocks directory');
            }
            
            console.log('✅ Files copied successfully');
        } catch (error) {
            throw new Error(`File copying failed: ${error.message}`);
        }
    }
    
    testBundleValidation() {
        console.log('Testing bundle validation...');
        
        const jsFile = join(this.blocksDir, `${this.componentName}.js`);
        const stats = statSync(jsFile);
        
        // Check file size (adjust threshold as needed)
        const maxSize = 1024 * 1024; // 1MB
        if (stats.size > maxSize) {
            console.warn(`⚠️  Bundle size (${stats.size} bytes) exceeds recommended maximum (${maxSize} bytes)`);
        }
        
        console.log(`✅ Bundle validation completed (${stats.size} bytes)`);
    }
}

// Usage
const tester = new BuildProcessTester('spectrum-card');
tester.testFullBuildProcess().catch(console.error);
```

## Best Practices

1. **Test Both Environments**: Always test in both development (`/build/`) and production (`/blocks/`) environments
2. **Verify Spectrum Integration**: Ensure all Spectrum Web Components are properly loaded and functional
3. **Test Build Process**: Validate the entire build pipeline from source to deployment
4. **Monitor Bundle Size**: Keep track of bundle size and optimize when necessary
5. **Test Theme Integration**: Verify components work with different Spectrum themes
6. **Validate Accessibility**: Ensure Spectrum components maintain accessibility standards
7. **Test Error Scenarios**: Verify error handling works with network issues and data problems
8. **Performance Testing**: Monitor loading times and memory usage with bundled dependencies
9. **Cross-Browser Validation**: Test bundled components across different browsers
10. **Automated Testing**: Use build process testing to catch issues early

This testing standard ensures Spectrum-Enhanced components are robust, performant, and properly integrated with the Spectrum Design System while maintaining the build process workflow.
