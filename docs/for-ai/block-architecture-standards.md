# EDS Block Architecture Standards Guide

> **📋 Style Guide**: For CSS naming conventions and standards, see the [CSS Naming Convention Style Guide](../style-guide.md)

> **🏗️ Architecture Distinction**: This document covers **two distinct development approaches**:
> - **Simple Blocks** (outside `/build/` directories): Follow EDS core philosophy of simple JavaScript, no dependencies, no build steps
> - **Complex Components** (inside `/build/` directories): May use build processes, external dependencies, and modern tooling
> 
> The choice between approaches depends on component complexity and requirements.

## Executive Summary

This document establishes two complementary architectural patterns for EDS block development, ensuring consistency while providing flexibility based on component complexity. Both patterns share common standards for error handling, accessibility, and performance.

### AI-Assisted Development Philosophy

This architecture embraces **local-first development that enables meaningful AI assistance**. Traditional EDS development workflows create barriers for AI assistance by fragmenting work across multiple systems (Google Docs, SharePoint, code repositories). Our approach implements a **local-first, proxy-fallback development server** that:

- **Unifies Environment**: AI sees code, content, and data in one place
- **Enables Real-time Feedback**: Save a file and refresh - changes appear instantly  
- **Provides Complete Context**: Work on code and content together without system switching
- **Supports Intelligent Assistance**: AI can analyze, test, and suggest improvements with full visibility

The development server checks if requested files exist locally first. If they do, it serves that file. If not, it fetches from your production server and passes it through. This simple but powerful pattern enables individual block development without juggling multiple systems while still accessing real EDS resources.

## Architecture Overview

```mermaid
graph TD
    A[New Component] --> B{Complexity Assessment}
    
    B --> C[EDS-Native Pattern<br/>Simple Components]
    B --> D[External-Library-Enhanced Pattern<br/>Complex Components]
    
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

## HTML File Naming Conventions

### Development vs Testing Files

The project uses two distinct HTML file naming patterns for different purposes, addressing the needs of different development tools and testing environments:

#### `index.html` - Development Files
- **Location**: `/build/{component-name}/index.html`
- **Purpose**: Automatically loaded by development tools (Vite, webpack, Parcel, etc.)
- **Usage**: Hot reload development and component building
- **Auto-discovery**: Development servers automatically serve `index.html` when accessing the root directory
- **Environment**: Build/development environment with modern tooling
- **Tool Integration**: Expected default entry point for bundlers and dev servers

#### `test.html` - EDS Testing Files  
- **Location**: `/blocks/{component-name}/test.html`
- **Purpose**: Manual testing within EDS environment
- **Usage**: User-chosen testing with EDS development server (`npm run debug`)
- **Manual loading**: Must be explicitly requested (`/blocks/component/test.html`)
- **Environment**: EDS testing environment
- **Flexibility**: Allows multiple test scenarios (test.html, test-advanced.html, test-error.html)

### File Structure Example

```bash
/build/shoelace-card/           # Development environment
├── index.html                 # Auto-loaded by Vite dev server
├── package.json               # Contains "dev": "vite" script
├── vite.config.js             # Vite expects index.html as entry
└── shoelace-card.js

/blocks/shoelace-card/          # EDS environment  
├── test.html                  # Manual: localhost:3000/blocks/shoelace-card/test.html
├── test-advanced.html         # Optional: Advanced test scenarios
├── shoelace-card.js           # Deployed component
└── shoelace-card.css
```

### Why Two Different Files?

1. **Tool Integration**: Modern development tools (Vite, webpack) expect `index.html` as the default entry point
2. **EDS Compatibility**: EDS testing requires explicit file names to avoid conflicts with auto-serving behavior
3. **Environment Separation**: Clear distinction between development and testing phases prevents confusion
4. **Multiple Test Scenarios**: EDS can have multiple test files without interfering with development auto-loading
5. **Deployment Clarity**: Build outputs go to different locations with appropriate naming for each environment

### Development Workflow

```bash
# 1. Development (auto-loads index.html)
cd build/component-name
npm run dev  # Vite serves index.html at localhost:5174

# 2. Build and deploy
npm run deploy  # Copies built files to blocks/ directory

# 3. EDS testing (explicit file request)
npm run debug  # Start EDS server
# Navigate to: localhost:3000/blocks/component-name/test.html
```

### Best Practices

- **Never rename `index.html`** in build directories - breaks tool integration
- **Always use `test.html`** for EDS testing - maintains consistency
- **Create multiple test files** if needed (test-error.html, test-advanced.html)
- **Document test scenarios** in each test file's comments
- **Keep test structure identical to EDS** for accurate testing

This naming convention ensures smooth integration with both modern development tools and the EDS testing environment while maintaining clear separation of concerns.

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

### External-Library-Enhanced Pattern (Complex Components)

**Use When:**

- Component has 5+ interactive elements
- Complex state management required
- Rich UI components needed
- Advanced visual effects and immersive overlays required
- Multi-component assembly and coordination needed
- Consistent external design system appearance critical
- Advanced interactions required
- External dependencies need bundling
- FOUC elimination and performance optimization critical

**File Structure:**

```bash
/build/{component-name}/           # Source files for development
├── {component-name}.js           # Source implementation
├── {component-name}.css          # Source styles
├── {component-name}-stub.css     # Stub CSS file for deployment
├── index.html                    # Development test file
├── package.json                  # Dependencies and build scripts
├── vite.config.js               # Build configuration
├── deploy.js                     # Deployment script
├── DEV-README.md                 # Development documentation
├── USER-README.md                # User documentation for deployment
└── dist/                         # Build output directory
    └── {component-name}.js       # Bundled implementation

/blocks/{component-name}/          # Built files for EDS deployment
├── {component-name}.js           # Bundled implementation (copied from dist/)
├── {component-name}.css          # Stub CSS file (styles bundled in JS)
├── test.html                     # EDS test file
├── README.md                     # Usage documentation (copied from USER-README.md)
└── example.md                    # Content author examples
```

**Build Process:**

- Development happens in `/build/{component-name}/`
- `npm run build` bundles dependencies using Vite into `dist/` directory
- `npm run deploy` runs the complete build and deployment process:
  - Builds the self-contained component with Vite
  - Bundles all dependencies into a single JavaScript file
  - Copies built component from `dist/` to `../../blocks/{component-name}/`
  - Copies stub CSS file (styles are bundled in JS)
  - Copies user documentation from `USER-README.md` to `README.md`
- Uses `deploy.js` script for automated file copying and deployment

**Examples:** advanced card components, data tables, complex forms, dashboards, interactive modals, media galleries

### Multi-Component Assembly Architecture

The External-Library-Enhanced pattern demonstrates sophisticated **multi-component assembly** where multiple external library components are coordinated to create rich user interfaces:

```javascript
// Core component assembly for rich UI experiences
const components = ['{ui-card}', '{ui-button}', '{ui-badge}', '{ui-icon-button}', '{ui-spinner}'];

// Components are imported at module level for bundling
import '{external-library}/components/card/card.js';
import '{external-library}/components/button/button.js';
import '{external-library}/components/badge/badge.js';
import '{external-library}/components/icon-button/icon-button.js';
import '{external-library}/components/spinner/spinner.js';
```

#### Component Coordination Patterns

**1. Hierarchical Component Structure**
```javascript
// Primary container: ui-card provides the foundational structure
function createComponentContainer(componentData) {
  const container = document.createElement('{ui-card}');
  container.className = 'external-library-enhanced-component';
  
  // Secondary components: ui-badge for categorization
  const categoryBadge = document.createElement('{ui-badge}');
  categoryBadge.variant = 'primary';
  categoryBadge.textContent = componentData.category || 'Featured';
  
  // Interactive elements: ui-button for primary actions
  const actionButton = document.createElement('{ui-button}');
  actionButton.variant = 'primary';
  actionButton.size = 'medium';
  actionButton.textContent = componentData.buttonText || 'Learn More';
  
  // Utility components: ui-icon-button for secondary actions
  const utilityButton = document.createElement('{ui-icon-button}');
  utilityButton.name = 'heart';
  utilityButton.label = 'Add to favorites';
  
  return { container, categoryBadge, actionButton, utilityButton };
}
```

**2. State Management Across Components**
```javascript
// Coordinated state management for multiple components
class ComponentState {
  constructor() {
    this.isLoading = false;
    this.isActive = false;
    this.isExpanded = false;
    this.components = new Map();
  }
  
  // Loading state coordination
  setLoadingState(isLoading) {
    this.isLoading = isLoading;
    
    // Update spinner visibility
    const spinner = this.components.get('spinner');
    if (spinner) {
      spinner.style.display = isLoading ? 'block' : 'none';
    }
    
    // Update button states
    const buttons = this.components.get('buttons') || [];
    buttons.forEach(button => {
      button.loading = isLoading;
      button.disabled = isLoading;
    });
  }
}
```

### Build & Deploy Commands

```bash
# Development server with hot reload
npm run dev

# Build component into dist/ directory
npm run build

# Complete build and deployment to blocks/ directory
npm run deploy

# Build, deploy, and show testing instructions
npm run test
```

- **npm run dev**: Starts development server with hot reload and proxy support
- **npm run build**: Bundles component with all dependencies into `dist/` directory
- **npm run deploy**: Runs build + copies files to `../../blocks/{component-name}/`
- **npm run test**: Runs deploy + provides testing instructions

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

#### FOUC Elimination and Advanced Performance Optimization

**Flash of Unstyled Content (FOUC) Challenge**: Modern web components often suffer from progressive content building where users see text appearing first, followed by slowly loading assets. This creates a jarring, unprofessional experience.

**Asset Preloading Solution**: Our implementation addresses FOUC through comprehensive **asset preloading strategy** that ensures all visual content is ready before any components are displayed:

```javascript
// Utility function to preload a single asset (image, font, etc.)
async function preloadAsset(src, type = 'image', timeout = 5000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Asset load timeout: ${src}`));
    }, timeout);
    
    if (type === 'image') {
      const img = new Image();
      img.onload = () => {
        clearTimeout(timer);
        resolve(img);
      };
      img.onerror = () => {
        clearTimeout(timer);
        reject(new Error(`Asset load failed: ${src}`));
      };
      img.src = src;
    } else if (type === 'font') {
      // Font preloading logic
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = src;
      link.onload = () => {
        clearTimeout(timer);
        resolve(link);
      };
      link.onerror = () => {
        clearTimeout(timer);
        reject(new Error(`Asset load failed: ${src}`));
      };
      document.head.appendChild(link);
    }
  });
}

// Preload all component assets in parallel
async function preloadAllAssets(componentData, timeout = 5000) {
  const assetUrls = componentData
    .map(item => item.asset || item.image)
    .filter(Boolean);
    
  if (assetUrls.length === 0) {
    return [];
  }
  
  console.log(`[component] Preloading ${assetUrls.length} assets...`);
  
  const preloadPromises = assetUrls.map(url => 
    preloadAsset(url, 'image', timeout).catch(error => {
      console.warn(`[component] Failed to preload asset: ${url}`, error);
      return null; // Return null for failed assets
    })
  );
  
  const results = await Promise.all(preloadPromises);
  const successCount = results.filter(Boolean).length;
  console.log(`[component] Preloaded ${successCount}/${assetUrls.length} assets successfully`);
  
  return results;
}
```

#### Atomic Content Rendering

Enhanced component generation ensures all content appears simultaneously:

```javascript
// Enhanced generate components with asset preloading
async function generateComponents(block, componentData) {
  if (!componentData || componentData.length === 0) {
    block.innerHTML = '<p class="component-empty">No content available.</p>';
    return;
  }
  
  // Show loading state
  block.classList.add('loading');
  
  try {
    // Preload all assets first
    console.log('[component] Preloading assets...');
    await preloadAllAssets(componentData);
    console.log('[component] All assets preloaded');
    
    // Create container and all components
    const container = createComponentContainer();
    const fragment = document.createDocumentFragment();
    
    // Build all components with preloaded assets
    componentData.forEach((data, index) => {
      const component = createComponent(data, index + 1);
      fragment.appendChild(component);
    });
    
    container.appendChild(fragment);
    
    // Atomic replacement
    block.innerHTML = '';
    block.appendChild(container);
    block.classList.remove('loading');
    
    // Trigger fade-in animation
    requestAnimationFrame(() => {
      container.classList.add('loaded');
    });
    
    attachComponentEventListeners(block);
    
  } catch (error) {
    console.error('[component] Asset preloading failed:', error);
    // Fallback to progressive loading
    generateComponentsProgressive(block, componentData);
  }
}
```

#### Enhanced CSS Loading States

```css
/* Enhanced loading state for the entire block */
.component-block.loading {
  opacity: 0.7;
  pointer-events: none;
  position: relative;
  min-height: 200px;
}

.component-block.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2rem;
  height: 2rem;
  margin: -1rem 0 0 -1rem;
  border: 2px solid var(--component-neutral-300);
  border-top-color: var(--component-primary-600);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 10;
}

/* Container starts hidden, fades in when loaded */
.component-container {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.component-container.loaded {
  opacity: 1;
  transform: translateY(0);
}

/* Individual items with staggered animation */
.component-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.component-container.loaded .component-item {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delay for each item */
.component-container.loaded .component-item:nth-child(1) { transition-delay: 0.1s; }
.component-container.loaded .component-item:nth-child(2) { transition-delay: 0.2s; }
.component-container.loaded .component-item:nth-child(3) { transition-delay: 0.3s; }
.component-container.loaded .component-item:nth-child(4) { transition-delay: 0.4s; }
.component-container.loaded .component-item:nth-child(5) { transition-delay: 0.5s; }
.component-container.loaded .component-item:nth-child(n+6) { transition-delay: 0.6s; }
```

#### Performance Benefits

**✅ Eliminated FOUC**: No progressive text/image building - all content appears simultaneously  
**✅ Smooth Loading**: Professional loading states with animated spinner  
**✅ Fast Perceived Performance**: All content appears as complete units  
**✅ Reliable Fallbacks**: Graceful handling of failed/slow assets with placeholder content  
**✅ Network Resilient**: 5-second timeout handling for slow connections  
**✅ Memory Efficient**: Uses DocumentFragment for optimal DOM manipulation  
**✅ Accessibility Maintained**: Proper loading states and alt text throughout

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

### External-Library-Enhanced Pattern Implementation

#### External Library HTML Structure

```html
<div class="component-name block">
  <div>
    <!-- Content structure with external library components -->
  </div>
</div>
```

#### External Library Integration Pattern

```javascript
// Import external library components for bundling
import '{external-library}/components/card/card.js';
import '{external-library}/components/button/button.js';
import '{external-library}/components/badge/badge.js';
import '{external-library}/components/icon-button/icon-button.js';
import '{external-library}/components/spinner/spinner.js';

// Import styles for bundling
import libraryStyles from '{external-library}/themes/light.css?inline';
import componentStyles from './{component-name}.css?inline';

// Configuration with debug mode detection
const COMPONENT_CONFIG = {
  DATA_SOURCE_PATH: '/data/component-data.json',
  BADGE_COLOR: 'primary',
  DEFAULT_BUTTON_TEXT: 'Learn More'
};

// Debug mode detection and logging
const DEBUG_MODE = window.location.hostname === 'localhost' && 
                   window.location.port === '3000';

function debugLog(message, data = null) {
  if (DEBUG_MODE) {
    console.log(`[MODAL-DEBUG] ${message}`, data || '');
  }
}

// Auto-inject styles when component loads
function injectStyles() {
  if (!document.querySelector('#{component-name}-styles')) {
    const style = document.createElement('style');
    style.id = '{component-name}-styles';
    style.textContent = libraryStyles + '\n' + componentStyles;
    document.head.appendChild(style);
  }
}

export default async function decorate(block) {
  try {
    // Inject styles first
    injectStyles();
    
    // Wait for external library components to be ready
    await waitForLibraryComponents();
    
    // Get data path and fetch data
    const dataPath = getDataPath(block);
    const componentData = await fetchComponentData(dataPath);
    
    // Clear block and add container class
    block.innerHTML = '';
    block.classList.add('{component-name}-block');
    
    // Generate components with preloading
    await generateComponents(block, componentData);
    
  } catch (error) {
    console.warn('[{component-name}] Enhancement failed, showing fallback:', error);
    showFallbackContent(block);
  }
}
```

#### Advanced Overlay System with Integrated Title Header

The overlay implementation features sophisticated visual effects with an innovative **integrated title header design**:

```javascript
// Enhanced content processing with integrated title header
async function loadOverlayContent(overlayContent, contentPath) {
  try {
    // Fetch content with enhanced error handling
    const htmlContent = await fetchPlainHtml(contentPath);
    
    if (htmlContent) {
      // Create content container
      const contentDiv = document.createElement('div');
      contentDiv.className = 'component-overlay-text';
      contentDiv.innerHTML = htmlContent;
      
      // Extract title from content and create header with ESC button
      const titleElement = contentDiv.querySelector('h1');
      const titleText = titleElement ? titleElement.textContent : 'Content';
      
      // Remove original title from content
      if (titleElement) {
        titleElement.remove();
      }
      
      // Create title header with ESC button
      const titleHeader = document.createElement('div');
      titleHeader.className = 'component-overlay-header';
      titleHeader.style.cssText = `
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 1rem 1rem 0.5rem 1rem !important;
        margin-bottom: 1rem !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
      `;
      
      // Create title element
      const title = document.createElement('h1');
      title.textContent = titleText;
      title.style.cssText = `
        color: white !important;
        font-size: 2rem !important;
        font-weight: 700 !important;
        margin: 0 !important;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8) !important;
        background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
        flex: 1 !important;
      `;
      
      // Create ESC button for header
      const headerCloseButton = document.createElement('button');
      headerCloseButton.className = 'component-overlay-close';
      headerCloseButton.innerHTML = 'ESC';
      headerCloseButton.setAttribute('aria-label', 'Press ESC or click to close overlay');
      headerCloseButton.style.cssText = `
        background: rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(10px) !important;
        border-radius: 0.5rem !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        color: white !important;
        font-size: 0.875rem !important;
        font-weight: 600 !important;
        width: 3rem !important;
        height: 2rem !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
        margin-left: 1rem !important;
      `;
      
      // Assemble header
      titleHeader.appendChild(title);
      titleHeader.appendChild(headerCloseButton);
      
      // Clear all content and add new structure
      overlayContent.innerHTML = '';
      overlayContent.appendChild(titleHeader);
      overlayContent.appendChild(contentDiv);
    }
  } catch (error) {
    console.error('[component] Content loading failed:', error);
    overlayContent.innerHTML = createErrorContent(contentPath, error);
  }
}
```

#### Test File Template (External-Library-Enhanced)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Component Test - External Library Enhanced</title>
    <link rel="stylesheet" href="[component].css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1 {
            text-align: center;
            color: white;
            margin-bottom: 2rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .test-section {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 1rem;
            padding: 2rem;
            margin-bottom: 2rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .test-section h2 {
            color: white;
            margin-top: 0;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .debug-info {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 0.5rem;
            padding: 1rem;
            margin: 1rem 0;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.8);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧩 Component - Development Test</h1>
        
        <div class="test-section">
            <h2>Default Configuration</h2>
            <p>Testing with default data path: <code>/data/component-data.json</code></p>
            <div class="debug-info">
                <strong>Expected behavior:</strong> Component loads with external library styling and functionality</div>
            
            <div class="component-name block">
                <div>
                    <!-- Default test content -->
                </div>
            </div>
        </div>
        
        <div class="test-section">
            <h2>Custom Data Path</h2>
            <p>Testing with custom data path</p>
            <div class="debug-info">
                <strong>Expected behavior:</strong> Component loads data from custom path
            </div>
            
            <div class="component-name block">
                <div>
                    <div>/custom/path/data.json</div>
                </div>
            </div>
        </div>
        
        <div class="test-section">
            <h2>Error Handling</h2>
            <p>Testing with invalid data path</p>
            <div class="debug-info">
                <strong>Expected behavior:</strong> Component shows error state gracefully
            </div>
            
            <div class="component-name block">
                <div>
                    <div>/invalid/path/data.json</div>
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

### 1. CSS Architecture

#### CSS Custom Properties (Variables)

```css
:root {
  /* Color system */
  --component-primary: #007bff;
  --component-secondary: #6c757d;
  --component-success: #28a745;
  --component-danger: #dc3545;
  --component-warning: #ffc107;
  --component-info: #17a2b8;
  
  /* Typography */
  --component-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --component-font-size-base: 1rem;
  --component-line-height-base: 1.5;
  
  /* Spacing */
  --component-spacing-xs: 0.25rem;
  --component-spacing-sm: 0.5rem;
  --component-spacing-md: 1rem;
  --component-spacing-lg: 1.5rem;
  --component-spacing-xl: 3rem;
  
  /* Borders */
  --component-border-radius: 0.375rem;
  --component-border-width: 1px;
  --component-border-color: #dee2e6;
  
  /* Shadows */
  --component-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --component-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --component-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --component-transition-fast: 0.15s ease-in-out;
  --component-transition-base: 0.3s ease-in-out;
  --component-transition-slow: 0.5s ease-in-out;
}
```

#### Component-Specific CSS Structure

```css
/* Component container */
.component-name {
  /* Base styles */
  font-family: var(--component-font-family);
  font-size: var(--component-font-size-base);
  line-height: var(--component-line-height-base);
}

/* Component states */
.component-name.loading {
  opacity: 0.7;
  pointer-events: none;
}

.component-name.error {
  border: 2px solid var(--component-danger);
  background-color: rgba(220, 53, 69, 0.1);
}

/* Component elements */
.component-name__header {
  padding: var(--component-spacing-md);
  border-bottom: var(--component-border-width) solid var(--component-border-color);
}

.component-name__content {
  padding: var(--component-spacing-md);
}

.component-name__footer {
  padding: var(--component-spacing-md);
  border-top: var(--component-border-width) solid var(--component-border-color);
}

/* Responsive design */
@media (max-width: 768px) {
  .component-name {
    font-size: 0.875rem;
  }
  
  .component-name__header,
  .component-name__content,
  .component-name__footer {
    padding: var(--component-spacing-sm);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .component-name {
    --component-border-color: #495057;
    background-color: #212529;
    color: #f8f9fa;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .component-name * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 2. Performance CSS Standards

#### Critical CSS Patterns

```css
/* Above-the-fold critical styles */
.component-name {
  /* Prevent layout shift */
  min-height: 200px;
  
  /* Optimize rendering */
  contain: layout style paint;
  
  /* GPU acceleration for animations */
  transform: translateZ(0);
  will-change: transform, opacity;
}

/* Loading states to prevent FOUC */
.component-name.loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading-shimmer 1.5s infinite;
}

@keyframes loading-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Efficient animations */
.component-name__item {
  transition: transform var(--component-transition-fast),
              opacity var(--component-transition-fast);
}

.component-name__item:hover {
  transform: translateY(-2px);
}
```

## Testing Standards

### 1. Manual Testing Checklist

#### Functionality Testing

- [ ] Component loads without errors
- [ ] All interactive elements respond correctly
- [ ] Data fetching works with valid and invalid URLs
- [ ] Error states display appropriately
- [ ] Loading states show during async operations

#### Accessibility Testing

- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader announces content changes
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] ARIA attributes are properly implemented

#### Performance Testing

- [ ] Component loads within 2 seconds on 3G connection
- [ ] No layout shift during loading
- [ ] Images are optimized and properly sized
- [ ] CSS and JavaScript are minified
- [ ] No console errors or warnings

#### Responsive Testing

- [ ] Component works on mobile devices (320px+)
- [ ] Component works on tablets (768px+)
- [ ] Component works on desktop (1024px+)
- [ ] Touch interactions work on mobile
- [ ] Text remains readable at all sizes

### 2. Automated Testing (Optional)

#### Unit Test Template

```javascript
// component-name.test.js
import { expect } from '@esm-bundle/chai';
import decorate from './component-name.js';

describe('Component Name', () => {
  let container;
  
  beforeEach(() => {
    container = document.createElement('div');
    container.className = 'component-name block';
    container.innerHTML = '<div><div>Test content</div></div>';
    document.body.appendChild(container);
  });
  
  afterEach(() => {
    document.body.removeChild(container);
  });
  
  it('should decorate the block without errors', async () => {
    await decorate(container);
    expect(container.children.length).to.be.greaterThan(0);
  });
  
  it('should handle empty content gracefully', async () => {
    container.innerHTML = '';
    await decorate(container);
    expect(container.classList.contains('error')).to.be.false;
  });
  
  it('should be accessible', async () => {
    await decorate(container);
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    expect(focusableElements.length).to.be.greaterThan(0);
  });
});
```

## Documentation Standards

### 1. README.md Template

```markdown
# Component Name

Brief description of what this component does and when to use it.

## Usage

### Basic Implementation

```html
<div class="component-name block">
  <div>
    <div>
      <!-- Content structure -->
    </div>
  </div>
</div>
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| option1 | string | 'default' | Description of option1 |
| option2 | boolean | true | Description of option2 |

### Examples

#### Example 1: Basic Usage

```html
<div class="component-name block">
  <div>
    <div>
      <h2>Welcome Message</h2>
      <p>This is a simple component with basic content.</p>
      <button>Click Me</button>
    </div>
  </div>
</div>
```

#### Example 2: Advanced Configuration

```html
<div class="component-name block">
  <div>
    <div>
      <h2>Advanced Component</h2>
      <p>This component includes custom data attributes and configuration.</p>
      <div data-config='{"theme": "dark", "animation": true}'>
        <button class="primary">Primary Action</button>
        <button class="secondary">Secondary Action</button>
      </div>
    </div>
  </div>
</div>
```

## Accessibility

This component follows WCAG 2.1 AA guidelines:

- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ High contrast mode support
- ✅ Focus management
- ✅ ARIA attributes

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Performance

- ✅ Lazy loading support
- ✅ Optimized for Core Web Vitals
- ✅ Minimal bundle size
- ✅ Efficient rendering

## Development

### Local Testing

1. Open `test.html` in your browser
2. Verify functionality across different screen sizes
3. Test keyboard navigation
4. Check console for errors

### Customization

The component can be customized through CSS custom properties and configuration options:

```css
.component-name {
  --component-primary: #your-brand-color;
  --component-spacing-md: 2rem;
  --component-border-radius: 8px;
}
```

You can also customize behavior through data attributes:

```html
<div class="component-name block" data-theme="dark" data-animation="fade">
  <!-- Component content -->
</div>
```

## Troubleshooting

### Common Issues

**Issue**: Component doesn't load
**Solution**: Check console for JavaScript errors

**Issue**: Styling looks incorrect
**Solution**: Ensure CSS file is properly linked

## Changelog

### v1.0.0
- Initial release
```

### 2. example.md Template

```markdown
# Component Name Examples

This document provides content authors with examples of how to use the Component Name block.

## Basic Example

```
Component Name
Content goes here
```

## Advanced Example

```
Component Name
Advanced content
With multiple lines
And special formatting
```

## Content Guidelines

- Keep content concise and focused
- Use clear, descriptive language
- Follow accessibility best practices
- Test content with screen readers

## Best Practices

1. **Content Structure**: Organize content logically
2. **Image Alt Text**: Always provide descriptive alt text
3. **Link Text**: Use descriptive link text, avoid "click here"
4. **Headings**: Use proper heading hierarchy

## Common Patterns

### Pattern 1: Simple Content

```
Component Name
Simple text content
Basic information display
```

### Pattern 2: Rich Content

```
Component Name
# Rich Content Example
This content includes **bold text**, *italic text*, and [links](https://example.com).

## Features
- Feature 1
- Feature 2
- Feature 3
```

### Pattern 3: Interactive Content

```
Component Name
Interactive Demo
Click to expand details
Button: Learn More | https://example.com/learn-more
Button: Contact Us | mailto:contact@example.com
```
```

## Implementation Timeline

### Phase 1: Planning (1-2 days)
- [ ] Analyze requirements and complexity
- [ ] Choose appropriate pattern (EDS-Native vs Shoelace-Enhanced)
- [ ] Create technical specification
- [ ] Set up development environment

### Phase 2: Core Development (3-5 days)
- [ ] Implement basic functionality
- [ ] Add error handling
- [ ] Implement accessibility features
- [ ] Create initial CSS styles
- [ ] Set up test file

### Phase 3: Enhancement (2-3 days)
- [ ] Add advanced features
- [ ] Optimize performance
- [ ] Implement responsive design
- [ ] Add loading states
- [ ] Polish animations and transitions

### Phase 4: Testing & Documentation (2-3 days)
- [ ] Manual testing across devices
- [ ] Accessibility testing
- [ ] Performance testing
- [ ] Write documentation
- [ ] Create usage examples

### Phase 5: Deployment (1 day)
- [ ] Final code review
- [ ] Deploy to staging
- [ ] User acceptance testing
- [ ] Deploy to production
- [ ] Monitor for issues

## Quality Assurance Checklist

### Code Quality
- [ ] Code follows project conventions
- [ ] No console errors or warnings
- [ ] Proper error handling implemented
- [ ] Code is well-commented
- [ ] No hardcoded values (use configuration)

### Performance
- [ ] Component loads in under 2 seconds
- [ ] No layout shift during loading
- [ ] Efficient DOM manipulation
- [ ] Optimized images and assets
- [ ] Minimal bundle size

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Proper ARIA attributes
- [ ] Color contrast meets standards

### Browser Compatibility
- [ ] Works in Chrome 90+
- [ ] Works in Firefox 88+
- [ ] Works in Safari 14+
- [ ] Works in Edge 90+
- [ ] Mobile browsers supported

### Documentation
- [ ] README.md is complete and accurate
- [ ] example.md provides clear usage examples
- [ ] Code is well-documented
- [ ] API documentation is current
- [ ] Troubleshooting guide is helpful

## Generic Debugging and Instrumentation Standards

### Component Debugging Patterns

All components should implement comprehensive debugging capabilities for development and troubleshooting:

#### **Standard Error Handling Pattern**
```javascript
export default async function decorate(block) {
  const componentName = block.dataset.blockName || 'unknown';
  
  try {
    console.group(`[${componentName.toUpperCase()}] Component decoration starting`);
    console.time(`[${componentName.toUpperCase()}] Decoration time`);
    
    // Ensure visibility (generic pattern)
    if (!document.body.classList.contains('appear')) {
      console.warn(`[${componentName.toUpperCase()}] Adding appear class for visibility`);
      document.body.classList.add('appear');
    }
    
    // Component logic here
    await enhanceComponent(block);
    
    console.log(`[${componentName.toUpperCase()}] Decoration completed successfully`);
    
  } catch (error) {
    console.error(`[${componentName.toUpperCase()}] Decoration failed:`, error);
    
    // Graceful degradation
    block.innerHTML = `<p>Component temporarily unavailable</p>`;
    
  } finally {
    console.timeEnd(`[${componentName.toUpperCase()}] Decoration time`);
    console.groupEnd();
  }
}
```

#### **Performance Monitoring Integration**
```javascript
// Add to any component for performance monitoring
export default function decorate(block) {
  const startTime = performance.now();
  const initialMemory = performance.memory?.usedJSHeapSize || 0;
  
  try {
    // Component logic here
    
    const endTime = performance.now();
    const finalMemory = performance.memory?.usedJSHeapSize || 0;
    const memoryIncrease = finalMemory - initialMemory;
    
    console.log(`[PERF] Execution time: ${(endTime - startTime).toFixed(2)}ms`);
    console.log(`[PERF] Memory increase: ${(memoryIncrease / 1024).toFixed(2)}KB`);
    
  } catch (error) {
    console.error(`[PERF] Performance monitoring failed:`, error);
  }
}
```

### File Replacement Testing Strategy

For testing enhanced or instrumented versions of components:

#### **Generic File Replacement Workflow**
```bash
# 1. Backup original component
cp blocks/your-component/your-component.js blocks/your-component/your-component-backup.js

# 2. Replace with enhanced/instrumented version
cp blocks/your-component/your-component-enhanced.js blocks/your-component/your-component.js

# 3. Run tests (system automatically loads enhanced version)
# Test your changes thoroughly

# 4. Restore original file
cp blocks/your-component/your-component-backup.js blocks/your-component/your-component.js

# Or use git to restore (recommended)
git restore blocks/your-component/your-component.js
```

#### **Automated Testing Script Template**
```bash
#!/bin/bash
# test-enhanced-component.sh

COMPONENT_NAME="$1"
COMPONENT_PATH="blocks/$COMPONENT_NAME"
ORIGINAL_FILE="${COMPONENT_PATH}/${COMPONENT_NAME}.js"
ENHANCED_FILE="${COMPONENT_PATH}/${COMPONENT_NAME}-enhanced.js"
BACKUP_FILE="${COMPONENT_PATH}/${COMPONENT_NAME}-backup.js"

# Validation
if [ ! -f "$ENHANCED_FILE" ]; then
    echo "❌ Enhanced file not found: $ENHANCED_FILE"
    exit 1
fi

echo "🔧 Testing enhanced $COMPONENT_NAME component..."

# 1. Backup original
cp "$ORIGINAL_FILE" "$BACKUP_FILE"
echo "✅ Original file backed up"

# 2. Replace with enhanced version
cp "$ENHANCED_FILE" "$ORIGINAL_FILE"
echo "✅ Enhanced version deployed"

# 3. Wait for user testing
echo "🌐 Open: http://localhost:3000/blocks/$COMPONENT_NAME/test.html"
echo "📊 Run tests, then press Enter to restore..."
read -r

# 4. Restore original
cp "$BACKUP_FILE" "$ORIGINAL_FILE"
rm "$BACKUP_FILE"
echo "✅ Original file restored and backup cleaned up"
```

### Browser Console Debug Tools

Implement comprehensive debugging tools accessible via browser console:

```javascript
// Add to test files for instant debugging access
window.debugComponents = {
  // Get all components on the page
  getComponents: () => document.querySelectorAll('[data-block-name]'),
  
  // Get status of specific component
  getComponentStatus: (componentName) => {
    const components = document.querySelectorAll(`[data-block-name="${componentName}"]`);
    return Array.from(components).map(component => ({
      element: component,
      status: component.dataset.blockStatus,
      name: component.dataset.blockName,
      classes: component.className
    }));
  },
  
  // Force reinitialize a component
  reinitComponent: async (componentName) => {
    const components = document.querySelectorAll(`[data-block-name="${componentName}"]`);
    for (const component of components) {
      const module = await import(`/blocks/${componentName}/${componentName}.js`);
      if (module.default) await module.default(component);
    }
  },
  
  // Check memory usage
  getMemoryUsage: () => {
    if (performance.memory) {
      const memory = performance.memory;
      return {
        used: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        total: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
        percentage: `${((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100).toFixed(1)}%`
      };
    }
    return 'Memory API not available';
  }
};

console.log('🔧 Component Debug Tools Available:');
console.log('- debugComponents.getComponents()');
console.log('- debugComponents.getComponentStatus("component-name")');
console.log('- debugComponents.reinitComponent("component-name")');
console.log('- debugComponents.getMemoryUsage()');
```

### Instrumentation Request Pattern

For comprehensive performance analysis, use this AI assistant prompt:

```
Please create comprehensive instrumentation for this project's JavaScript files. I need detailed performance metrics, function call traces, execution timing data, variable scope analysis, memory usage patterns, and program flow information during execution.

Requirements:
1. **Core Instrumentation Framework**: Create a reusable instrumentation.js file that can wrap any function with performance monitoring
2. **Instrumented Versions**: Create instrumented versions of all major JavaScript files and components
3. **Performance Metrics**: Capture function execution times, memory usage, DOM mutations, async operations
4. **Structured Output**: Generate telemetry data in a structured format suitable for analysis
5. **Minimal Impact**: Ensure instrumentation has minimal impact on execution performance
6. **File Replacement Strategy**: Create instrumented versions with "-instrumented" suffix for testing
7. **Browser Integration**: Include browser console integration for real-time monitoring

Please create instrumented versions of:
- All component JavaScript files
- Core application scripts
- Any utility or helper files

Include test files that demonstrate the instrumentation working with browser console integration.
```

### Performance Benchmarks

Target performance metrics for components:

- **Component Loading**: 15-20ms (including CSS/JS loading)
- **Component Decoration**: 1-3ms for simple components, 5-15ms for complex components
- **Memory Overhead**: <500KB per component
- **DOM Mutations**: <15 mutations per decoration cycle

### Common Debugging Scenarios

#### **Component Not Appearing**
1. Check if component file exists and loads correctly
2. Verify CSS class names match naming conventions
3. Ensure proper visibility classes are applied
4. Check for JavaScript errors in console

#### **Performance Issues**
1. Use instrumentation to identify bottlenecks
2. Monitor memory usage patterns
3. Check for excessive DOM mutations
4. Analyze async operation timing

#### **Integration Conflicts**
1. Verify attribute preservation during DOM manipulation
2. Check for styling conflicts
3. Monitor race conditions between processing stages
4. Validate error handling and recovery

### Debug Configuration

#### **Development Mode Settings**
```javascript
// Add to development configurations
const DEBUG_MODE = process.env.DEBUG === 'true' || window.location.search.includes('debug=true');

if (DEBUG_MODE) {
  console.log('🔧 Debug mode enabled');
  console.log('📊 Enhanced logging active');
  console.log('🔍 Performance monitoring enabled');
}
```

#### **Browser Debug Configuration**
```javascript
// Add to test files for debug mode
<script>
  // Enable debug mode
  window.DEBUG_MODE = true;
  
  // Enhanced error reporting
  window.addEventListener('error', (event) => {
    console.error('[GLOBAL-ERROR]', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    });
  });
  
  // Unhandled promise rejection tracking
  window.addEventListener('unhandledrejection', (event) => {
    console.error('[UNHANDLED-PROMISE]', event.reason);
  });
</script>
```

### Systematic Debugging Workflow

#### **5-Phase Debugging Process**
1. **Initial Assessment**: Check basic loading and file structure
2. **Network Analysis**: Monitor resource loading and requests
3. **DOM and Timing Analysis**: Track DOM changes and processing timing
4. **Performance Analysis**: Measure execution times and memory usage
5. **Error Resolution**: Implement error handling and recovery

#### **Debug Checklist**
- [ ] **Pre-Development Setup**: Debug tools available and configured
- [ ] **Component Loading**: Files exist and load correctly
- [ ] **Performance Monitoring**: Timing and memory tracking active
- [ ] **Error Handling**: Comprehensive error catching and logging
- [ ] **Recovery Testing**: Graceful degradation implemented
- [ ] **Documentation**: Debug procedures documented

## Conclusion

This architecture standards guide provides a comprehensive framework for developing consistent, accessible, and performant EDS blocks. By following these patterns and standards, teams can:

- **Reduce Development Time**: Standardized patterns and templates accelerate development
- **Ensure Quality**: Built-in accessibility, performance, and error handling standards
- **Maintain Consistency**: Unified approach across all components
- **Enable AI Assistance**: Local-first development environment supports intelligent assistance
- **Scale Effectively**: Clear patterns support team growth and knowledge transfer

The dual-pattern approach (EDS-Native and External-Library-Enhanced) provides flexibility while maintaining consistency, allowing teams to choose the right tool for each component's complexity and requirements.

### Key Takeaways

1. **Choose the Right Pattern**: Use EDS-Native for simple components, External-Library-Enhanced for complex ones
2. **Follow Common Standards**: All components share error handling, accessibility, and performance standards
3. **Test Thoroughly**: Use the provided checklists and templates for comprehensive testing
4. **Document Everything**: Clear documentation enables team collaboration and maintenance
5. **Optimize for AI**: Local-first development enables meaningful AI assistance throughout the process

By implementing these standards, development teams can create robust, accessible, and maintainable EDS blocks that provide excellent user experiences across all devices and use cases.
