# Creating Complex EDS Blocks
## The Build-Enhanced Approach

**Related Documentation:** [Block Architecture Standards](block-architecture-standards.md) | [Raw EDS Blocks Guide](raw-eds-blocks-guide.md) | [EDS Overview](../eds.md) | [Debug Guide](../testing/debug.md)

This guide demonstrates how to create sophisticated EDS blocks that use **external libraries**, **modern tooling**, and **advanced features** while maintaining **EDS compatibility** and **safe DOM manipulation**.

# Creating Complex EDS Blocks
## The Build-Enhanced Approach

**Related Documentation:** [Block Architecture Standards](block-architecture-standards.md) | [Raw EDS Blocks Guide](raw-eds-blocks-guide.md) | [EDS Overview](../eds.md) | [Debug Guide](../testing/debug.md)

This guide demonstrates how to create sophisticated EDS blocks that use **external libraries**, **modern tooling**, and **advanced features** while maintaining **EDS compatibility** and **safe DOM manipulation**.

## **🔒 Critical EDS Constraint: Why Build Process Is Required**

**Understanding the fundamental limitation:** EDS dynamically generates file paths from HTML class names with **zero flexibility**.

### **The EDS Dynamic Loading Reality**

When you write this HTML:
```html
<div class="shoelace-card">Configuration data</div>
```

EDS **automatically and rigidly**:

1. **Transforms the element**:
   ```html
   <div class="shoelace-card block" data-block-name="shoelace-card" data-block-status="initialized">
   ```

2. **Generates non-negotiable import paths** (in `scripts/aem.js`):
   ```javascript
   // You cannot change this - it's hardcoded in EDS
   const mod = await import(`/blocks/shoelace-card/shoelace-card.js`);
   ```

3. **Demands exact file structure**:
   ```
   /blocks/shoelace-card/shoelace-card.js   ← Name MUST match class exactly
   /blocks/shoelace-card/shoelace-card.css  ← Name MUST match class exactly
   ```

### **Why This Forces Build Architecture**

You **cannot** develop complex components directly in `/blocks/` because:

❌ **Cannot use external imports in deployment:**
```javascript
// This works in development but fails in EDS deployment
import '@shoelace-style/shoelace/dist/components/card/card.js';
```

❌ **Cannot have flexible development file names:**
```javascript
// EDS requires shoelace-card.js - cannot be renamed
import './my-sophisticated-card-component.js';
```

❌ **Cannot redirect EDS imports:**
```javascript
// EDS hardcodes the import path - no redirection possible
const mod = await import(`/blocks/${blockName}/${blockName}.js`);
```

### **How Build Process Solves This**

The dual-directory architecture works **within** EDS constraints:

```
Development Phase (/build/shoelace-card/):
├── shoelace-card.js              ← Source with external imports
├── package.json                  ← External dependencies
├── modern-tooling.config.js      ← Development flexibility
└── any-helper-files.js           ← Creative freedom

         ↓ BUILD PROCESS ↓

Deployment Phase (/blocks/shoelace-card/):
├── shoelace-card.js              ← Bundled, self-contained
└── shoelace-card.css             ← EDS requirement satisfied
```

**The build process acts as a bridge between development freedom and EDS constraints.**

## When to Use This Approach

**Choose the build-enhanced pattern when:**
- ✅ Component requires external libraries (design systems, charting, etc.)
- ✅ Rich interactions provide significant user value
- ✅ Design system consistency is business-critical
- ✅ Modern development workflows improve team productivity
- ✅ Bundle size trade-off is acceptable for functionality gained

**Remember:** This approach sacrifices EDS simplicity for capability. Make this choice consciously.

## Project Structure

### Dual-Directory Architecture

```
/build/my-component/           # 🔧 Development workspace
├── my-component.js            # Source with imports
├── my-component.css           # Source styles  
├── package.json               # Dependencies & scripts
├── vite.config.js             # Build configuration
├── index.html                 # 🔧 DEVELOPMENT test file (Vite auto-serves)
├── deploy.js                  # Deployment automation
├── DEV-README.md              # Developer documentation
└── USER-README.md             # Author documentation

/blocks/my-component/          # 📦 Deployment artifacts
├── my-component.js            # Bundled, self-contained
├── my-component.css           # Stub file (styles in JS)
├── README.md                  # User documentation
└── test.html                  # 🧪 EDS test file (for EDS debug server)
```

### **Critical: Why Two Different HTML Test Files?**

The different file names serve different testing environments:

**`index.html` (Development Testing):**
- **Location**: `/build/my-component/index.html`
- **Purpose**: Development testing with modern tooling
- **Server**: Vite dev server (`npm run dev`)
- **Auto-served**: Development servers automatically serve `index.html`
- **Features**: Hot reload, source maps, unbundled imports
- **URL**: `http://localhost:5174/` (Vite auto-opens index.html)

**`test.html` (EDS Integration Testing):**
- **Location**: `/blocks/my-component/test.html` 
- **Purpose**: Testing final bundled component in EDS environment
- **Server**: EDS debug server (`npm run debug`)
- **Manual access**: Must navigate to specific URL
- **Features**: Tests actual deployed component, EDS structure validation
- **URL**: `http://localhost:3000/blocks/my-component/test.html`

### **Why This Naming Convention?**

1. **Development Tool Compatibility**: Vite, webpack, and other modern tools expect `index.html` as the default entry point
2. **Environment Isolation**: Different files prevent confusion about which environment you're testing
3. **No Conflicts**: `index.html` for development, `test.html` for deployment testing
4. **Clear Purpose**: File names indicate their intended testing environment

## Setup: Build Environment

### 1. Initialize the Build Environment

```bash
# Create build directory
mkdir -p build/my-component
cd build/my-component

# Initialize npm
npm init -y

# Install build tools
npm install --save-dev vite

# Install component library (example: Shoelace)
npm install @shoelace-style/shoelace
```

### 2. Configure Vite Build

```javascript
// build/my-component/vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  server: {
    port: 5174,
    strictPort: true,
    open: true,
    host: true,
    // 🔄 PROXY SYSTEM: Forward missing assets to production
    proxy: {
      '/slides': {
        target: 'https://allabout.network',  // Your production site
        changeOrigin: true,
        secure: true
      },
      '/media': {
        target: 'https://allabout.network',  // Your production site
        changeOrigin: true,
        secure: true
      },
      '/api': {
        target: 'https://allabout.network',  // Your production site
        changeOrigin: true,
        secure: true
      }
    }
  },
  build: {
    lib: {
      entry: 'my-component.js',
      name: 'MyComponent',
      fileName: () => 'my-component.js',
      formats: ['es']
    },
    outDir: 'dist',
    rollupOptions: {
      external: [], // Bundle everything
      output: {
        inlineDynamicImports: true,
        manualChunks: undefined // Single file output
      }
    },
    minify: 'esbuild',
    target: 'es2020',
    emptyOutDir: true
  }
});
```

### **🔄 Understanding the Dual Proxy Architecture**

The development workflow uses **two different proxy systems** for different testing environments:

#### **Vite Proxy (Development Testing)**
- **When**: Using `npm run dev` at `http://localhost:5174/`
- **Purpose**: Forwards missing assets to your production site during component development
- **Configuration**: In `vite.config.js` proxy settings
- **Example**: 
  ```javascript
  // Request: http://localhost:5174/slides/query-index.json
  // Proxied to: https://allabout.network/slides/query-index.json
  ```

#### **EDS Debug Server Proxy (Integration Testing)**
- **When**: Using `npm run debug` at `http://localhost:3000/`
- **Purpose**: Forwards missing EDS assets to production during block testing
- **Configuration**: Built into the EDS debug server (`server.js`)
- **Example**:
  ```javascript
  // Request: http://localhost:3000/media/image.jpg
  // Proxied to: https://allabout.network/media/image.jpg
  ```

#### **Why Two Proxy Systems Are Needed**

**Development Phase (`index.html` with Vite):**
```
Local Request → Vite Proxy → Production Site → Data/Assets
     ↓
Component Development with Real Data
```

**EDS Integration Phase (`test.html` with EDS server):**
```
Local Request → EDS Proxy → Production Site → EDS Assets
     ↓
Block Testing with Real EDS Environment
```

**This dual proxy system enables:**
- **Real data** during development without complex mocking
- **Production assets** during EDS testing without local setup
- **Seamless workflow** from development to integration testing

### 3. Package Configuration

```json
{
  "name": "my-component",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "deploy": "npm run build && node deploy.js",
    "test": "npm run build && npm run deploy && echo 'Test at: http://localhost:3000/blocks/my-component/test.html'"
  },
  "dependencies": {
    "@shoelace-style/shoelace": "^2.0.0"
  },
  "devDependencies": {
    "vite": "^4.0.0"
  }
}
```

## Implementation: Complex Component

### 1. Source Implementation

```javascript
// build/my-component/my-component.js

// Import external libraries for bundling
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

// Import styles for bundling
import shoelaceStyles from '@shoelace-style/shoelace/dist/themes/light.css?inline';
import componentStyles from './my-component.css?inline';

/**
 * Configuration with validation
 */
const COMPONENT_CONFIG = {
  // Data settings
  DEFAULT_API_ENDPOINT: '/api/data.json',
  FETCH_TIMEOUT: 8000,
  RETRY_ATTEMPTS: 2,
  
  // UI settings
  ANIMATION_DURATION: 300,
  CARDS_PER_PAGE: 6,
  LOADING_DELAY: 200,
  
  // Component settings
  BADGE_VARIANT: 'primary',
  BUTTON_VARIANT: 'default',
  
  // Error messages
  ERROR_MESSAGES: {
    FETCH_FAILED: 'Could not load data. Please try again.',
    INVALID_DATA: 'Data format is invalid.',
    COMPONENT_FAILED: 'Component could not be initialized.'
  }
};

/**
 * Debug mode detection
 */
const DEBUG_MODE = window.location.hostname === 'localhost';

function debugLog(message, data = null) {
  if (DEBUG_MODE) {
    console.log(`[my-component] ${message}`, data || '');
  }
}

/**
 * Style injection with deduplication
 */
function injectStyles() {
  const styleId = 'my-component-styles';
  
  if (!document.querySelector(`#${styleId}`)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = shoelaceStyles + '\n' + componentStyles;
    document.head.appendChild(style);
    debugLog('Styles injected');
  }
}

/**
 * Safe content extraction with multiple strategies
 */
function extractConfiguration(block) {
  const config = { ...COMPONENT_CONFIG };
  
  try {
    // Strategy 1: EDS nested structure
    const nestedDiv = block.querySelector('div div');
    if (nestedDiv?.textContent?.trim()) {
      const configText = nestedDiv.textContent.trim();
      
      // Parse JSON configuration
      if (configText.startsWith('{')) {
        try {
          const parsed = JSON.parse(configText);
          Object.assign(config, parsed);
          debugLog('Parsed JSON configuration:', parsed);
        } catch (e) {
          debugLog('Invalid JSON configuration, using default');
        }
      } else if (configText.startsWith('/')) {
        // Simple endpoint path
        config.DEFAULT_API_ENDPOINT = configText;
      }
    }
    
    // Strategy 2: Data attributes
    Object.keys(block.dataset).forEach(key => {
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      if (config.hasOwnProperty(camelKey)) {
        config[camelKey] = block.dataset[key];
      }
    });
    
    return config;
  } catch (error) {
    debugLog('Configuration extraction failed:', error);
    return config;
  }
}

/**
 * Enhanced fetch with retry logic and timeout
 */
async function fetchData(endpoint, config) {
  for (let attempt = 1; attempt <= config.RETRY_ATTEMPTS; attempt++) {
    try {
      debugLog(`Fetching data (attempt ${attempt}):`, endpoint);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.FETCH_TIMEOUT);
      
      const response = await fetch(endpoint, {
        mode: 'cors',
        headers: { 'Accept': 'application/json' },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Validate data structure
      if (!data || (!Array.isArray(data) && !data.items && !data.data)) {
        throw new Error('Invalid data format');
      }
      
      const items = data.items || data.data || data;
      debugLog(`Fetched ${items.length} items`);
      return items;
      
    } catch (error) {
      debugLog(`Attempt ${attempt} failed:`, error.message);
      
      if (attempt === config.RETRY_ATTEMPTS) {
        throw error;
      }
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
}

/**
 * Wait for external components to be ready
 */
async function waitForComponents() {
  const components = ['sl-card', 'sl-button', 'sl-badge', 'sl-spinner', 'sl-dialog'];
  
  for (const componentName of components) {
    let attempts = 0;
    while (!customElements.get(componentName) && attempts < 100) {
      await new Promise(resolve => setTimeout(resolve, 10));
      attempts++;
    }
    
    if (!customElements.get(componentName)) {
      throw new Error(`Component ${componentName} failed to load`);
    }
  }
  
  debugLog('All external components ready');
}

/**
 * Create component structure using external library
 */
function createComponentStructure(items, config) {
  const container = document.createElement('div');
  container.className = 'my-component-container';
  
  // Create grid for cards
  const grid = document.createElement('div');
  grid.className = 'my-component-grid';
  
  items.slice(0, config.CARDS_PER_PAGE).forEach((item, index) => {
    const card = createCard(item, index, config);
    grid.appendChild(card);
  });
  
  container.appendChild(grid);
  
  // Add pagination if needed
  if (items.length > config.CARDS_PER_PAGE) {
    const pagination = createPagination(items, config);
    container.appendChild(pagination);
  }
  
  return container;
}

/**
 * Create individual card using external library components
 */
function createCard(item, index, config) {
  // Create Shoelace card
  const card = document.createElement('sl-card');
  card.className = 'my-component-card';
  card.setAttribute('data-index', index);
  
  // Add badge if category exists
  if (item.category) {
    const badge = document.createElement('sl-badge');
    badge.setAttribute('variant', config.BADGE_VARIANT);
    badge.setAttribute('pill', '');
    badge.textContent = item.category;
    card.appendChild(badge);
  }
  
  // Add image if provided
  if (item.image) {
    const img = document.createElement('img');
    img.slot = 'image';
    img.src = item.image;
    img.alt = item.title || 'Card image';
    img.loading = 'lazy';
    img.onerror = () => {
      img.style.display = 'none';
    };
    card.appendChild(img);
  }
  
  // Add content
  const content = document.createElement('div');
  content.className = 'card-content';
  
  if (item.title) {
    const title = document.createElement('h3');
    title.textContent = item.title;
    content.appendChild(title);
  }
  
  if (item.description) {
    const description = document.createElement('p');
    description.textContent = item.description;
    content.appendChild(description);
  }
  
  card.appendChild(content);
  
  // Add footer with button
  if (item.action || item.link) {
    const footer = document.createElement('div');
    footer.slot = 'footer';
    
    const button = document.createElement('sl-button');
    button.setAttribute('variant', config.BUTTON_VARIANT);
    button.textContent = item.actionText || 'Learn More';
    button.addEventListener('click', () => handleCardAction(item));
    
    footer.appendChild(button);
    card.appendChild(footer);
  }
  
  return card;
}

/**
 * Handle card interactions
 */
function handleCardAction(item) {
  if (item.link) {
    // Open link
    window.open(item.link, '_blank', 'noopener');
  } else if (item.modalContent) {
    // Open modal with content
    openModal(item);
  } else {
    // Custom action
    debugLog('Card action triggered:', item);
  }
}

/**
 * Create modal using external library
 */
function openModal(item) {
  const dialog = document.createElement('sl-dialog');
  dialog.setAttribute('label', item.title || 'Details');
  dialog.setAttribute('class', 'my-component-modal');
  
  const content = document.createElement('div');
  content.innerHTML = item.modalContent || item.description || 'No additional details available.';
  
  dialog.appendChild(content);
  document.body.appendChild(dialog);
  
  // Show dialog
  dialog.show();
  
  // Auto-cleanup
  dialog.addEventListener('sl-after-hide', () => {
    dialog.remove();
  });
}

/**
 * Create pagination controls
 */
function createPagination(items, config) {
  const pagination = document.createElement('div');
  pagination.className = 'my-component-pagination';
  
  const totalPages = Math.ceil(items.length / config.CARDS_PER_PAGE);
  
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('sl-button');
    button.textContent = i;
    button.setAttribute('variant', 'default');
    button.setAttribute('size', 'small');
    
    if (i === 1) {
      button.setAttribute('variant', 'primary');
    }
    
    button.addEventListener('click', () => {
      // Handle pagination
      debugLog(`Page ${i} clicked`);
    });
    
    pagination.appendChild(button);
  }
  
  return pagination;
}

/**
 * Create loading state
 */
function createLoadingState() {
  const loading = document.createElement('div');
  loading.className = 'my-component-loading';
  
  const spinner = document.createElement('sl-spinner');
  spinner.setAttribute('style', '--track-width: 4px; --indicator-color: var(--sl-color-primary-600);');
  
  const text = document.createElement('p');
  text.textContent = 'Loading content...';
  
  loading.appendChild(spinner);
  loading.appendChild(text);
  
  return loading;
}

/**
 * Create error state
 */
function createErrorState(message, onRetry = null) {
  const error = document.createElement('div');
  error.className = 'my-component-error';
  
  const text = document.createElement('p');
  text.textContent = message;
  
  error.appendChild(text);
  
  if (onRetry) {
    const button = document.createElement('sl-button');
    button.textContent = 'Retry';
    button.setAttribute('variant', 'primary');
    button.addEventListener('click', onRetry);
    error.appendChild(button);
  }
  
  return error;
}

/**
 * Build complete component structure safely in memory
 */
async function buildComponent(config) {
  try {
    // Fetch data
    const items = await fetchData(config.DEFAULT_API_ENDPOINT, config);
    
    if (!items || items.length === 0) {
      return createErrorState('No data available');
    }
    
    // Build structure
    const structure = createComponentStructure(items, config);
    
    return structure;
  } catch (error) {
    debugLog('Component build failed:', error);
    return createErrorState(
      config.ERROR_MESSAGES.FETCH_FAILED,
      () => window.location.reload()
    );
  }
}

/**
 * Main decoration function - EDS compatible
 * This is the required export for EDS blocks
 */
export default async function decorate(block) {
  try {
    debugLog('Starting component decoration');
    
    // Step 1: Extract configuration BEFORE any DOM changes
    const config = extractConfiguration(block);
    
    // Step 2: Inject styles
    injectStyles();
    
    // Step 3: Wait for external components
    await waitForComponents();
    
    // Step 4: Show loading state immediately
    const loadingState = createLoadingState();
    
    // Step 5: Preserve EDS attributes
    const blockStatus = block.getAttribute('data-block-status');
    const blockName = block.getAttribute('data-block-name');
    const blockClasses = Array.from(block.classList);
    
    // Step 6: Add loading state
    block.innerHTML = '';
    block.appendChild(loadingState);
    block.classList.add('my-component-loading-state');
    
    // Step 7: Build component structure in memory
    const componentStructure = await buildComponent(config);
    
    // Step 8: ATOMIC replacement when ready
    block.innerHTML = '';
    block.appendChild(componentStructure);
    
    // Step 9: Restore EDS attributes and classes
    if (blockStatus) block.setAttribute('data-block-status', blockStatus);
    if (blockName) block.setAttribute('data-block-name', blockName);
    
    // Ensure critical classes are maintained
    block.classList.add('my-component-enhanced');
    blockClasses.forEach(cls => {
      if (cls.includes('block') || cls.includes('my-component')) {
        block.classList.add(cls);
      }
    });
    
    // Step 10: Ensure EDS visibility
    if (!document.body.classList.contains('appear')) {
      document.body.classList.add('appear');
    }
    
    const section = block.closest('.section');
    if (section && section.style.display === 'none') {
      section.style.display = null;
      section.dataset.sectionStatus = 'loaded';
    }
    
    // Step 11: Trigger load animations
    requestAnimationFrame(() => {
      componentStructure.classList.add('loaded');
    });
    
    debugLog('Component decoration completed successfully');
    
  } catch (error) {
    console.error('[my-component] Enhancement failed:', error);
    
    // Fallback: minimal error display without destroying original content
    const fallback = createErrorState(
      COMPONENT_CONFIG.ERROR_MESSAGES.COMPONENT_FAILED,
      () => window.location.reload()
    );
    
    // Only show fallback if block is empty
    if (!block.textContent.trim()) {
      block.appendChild(fallback);
    }
  }
}
```

### 2. Component Styles

```css
/* build/my-component/my-component.css */

/* Component container */
.my-component-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Loading state */
.my-component-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 1rem;
}

.my-component-loading p {
  margin: 0;
  color: var(--sl-color-neutral-600);
  font-size: 0.9rem;
}

/* Error state */
.my-component-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
  border: 2px dashed var(--sl-color-neutral-300);
  border-radius: 8px;
}

.my-component-error p {
  margin: 0;
  color: var(--sl-color-danger-600);
}

/* Grid layout */
.my-component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* Card enhancements */
.my-component-card {
  --border-radius: 12px;
  --border-width: 1px;
  --border-color: var(--sl-color-neutral-200);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  opacity: 0;
  transform: translateY(20px);
}

.my-component-container.loaded .my-component-card {
  opacity: 1;
  transform: translateY(0);
}

.my-component-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Card content */
.my-component-card .card-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--sl-color-neutral-900);
}

.my-component-card .card-content p {
  margin: 0;
  color: var(--sl-color-neutral-600);
  line-height: 1.5;
}

/* Pagination */
.my-component-pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Modal customization */
.my-component-modal {
  --width: 90vw;
  --header-spacing: var(--sl-spacing-large);
  --body-spacing: var(--sl-spacing-large);
}

.my-component-modal [slot='label'] {
  font-size: 1.5rem;
  font-weight: 600;
}

/* Responsive design */
@media (max-width: 768px) {
  .my-component-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .my-component-container {
    padding: 0.5rem;
  }
}

/* Animation delays for staggered loading */
.my-component-card:nth-child(1) { transition-delay: 0.1s; }
.my-component-card:nth-child(2) { transition-delay: 0.2s; }
.my-component-card:nth-child(3) { transition-delay: 0.3s; }
.my-component-card:nth-child(4) { transition-delay: 0.4s; }
.my-component-card:nth-child(5) { transition-delay: 0.5s; }
.my-component-card:nth-child(6) { transition-delay: 0.6s; }

/* High contrast mode support */
@media (prefers-contrast: high) {
  .my-component-card {
    --border-width: 2px;
    --border-color: var(--sl-color-neutral-900);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .my-component-card {
    transition: none;
    opacity: 1;
    transform: none;
  }
  
  .my-component-card:hover {
    transform: none;
  }
}
```

### 3. Development Test File

```html
<!-- build/my-component/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Component - Development</title>
    <style>
        body {
            font-family: system-ui, sans-serif;
            margin: 0;
            padding: 2rem;
            background: #f8f9fa;
        }
        .test-container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .test-section {
            background: white;
            border-radius: 8px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>
    <div class="test-container">
        <h1>My Component - Development Testing</h1>
        
        <div class="test-section">
            <h2>Default Configuration</h2>
            <div class="my-component block" data-block-name="my-component" data-block-status="initialized">
                <div>
                    <div>/api/sample-data.json</div>
                </div>
            </div>
        </div>
        
        <div class="test-section">
            <h2>JSON Configuration</h2>
            <div class="my-component block" data-block-name="my-component" data-block-status="initialized">
                <div>
                    <div>{"DEFAULT_API_ENDPOINT": "/api/custom-data.json", "CARDS_PER_PAGE": 4}</div>
                </div>
            </div>
        </div>
        
        <div class="test-section">
            <h2>Data Attributes Configuration</h2>
            <div class="my-component block" 
                 data-block-name="my-component" 
                 data-block-status="initialized"
                 data-cards-per-page="3"
                 data-badge-variant="success">
                <div>
                    <div>/api/products.json</div>
                </div>
            </div>
        </div>
    </div>

    <script type="module">
        import decorate from './my-component.js';
        
        // Mock API responses for development
        const mockData = [
            {
                title: "Sample Card 1",
                description: "This is a sample card with mock data for development testing.",
                category: "Development",
                image: "https://picsum.photos/400/200?random=1",
                actionText: "View Details",
                modalContent: "<p>This is detailed content for card 1.</p>"
            },
            {
                title: "Sample Card 2", 
                description: "Another sample card showing different content types.",
                category: "Testing",
                image: "https://picsum.photos/400/200?random=2",
                actionText: "Learn More",
                link: "https://example.com"
            },
            {
                title: "Sample Card 3",
                description: "Final sample card demonstrating the component capabilities.",
                category: "Demo",
                image: "https://picsum.photos/400/200?random=3",
                actionText: "Explore",
                modalContent: "<p>Detailed information about card 3 with <strong>rich content</strong>.</p>"
            }
        ];
        
        // Mock fetch for development
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
            if (url.includes('/api/')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ data: mockData })
                });
            }
            return originalFetch.call(this, url, options);
        };
        
        // Initialize components
        document.addEventListener('DOMContentLoaded', () => {
            const blocks = document.querySelectorAll('.my-component.block');
            blocks.forEach(block => {
                console.log('Decorating component:', block);
                decorate(block);
            });
        });
    </script>
</body>
</html>
```

## Deployment Automation

### Deploy Script

```javascript
// build/my-component/deploy.js
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const COMPONENT_NAME = 'my-component';
const BUILD_DIR = __dirname;
const DIST_DIR = join(BUILD_DIR, 'dist');
const BLOCKS_DIR = join(BUILD_DIR, '..', '..', 'blocks', COMPONENT_NAME);

function ensureDirectory(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
}

function copyBuiltFiles() {
  // Copy bundled JavaScript - NAME MUST MATCH CLASS NAME EXACTLY
  const jsSource = join(DIST_DIR, `${COMPONENT_NAME}.js`);
  const jsTarget = join(BLOCKS_DIR, `${COMPONENT_NAME}.js`);  // ← EDS requires this exact name
  
  if (existsSync(jsSource)) {
    copyFileSync(jsSource, jsTarget);
    console.log(`✅ Copied ${COMPONENT_NAME}.js`);
  } else {
    throw new Error(`Built JavaScript file not found: ${jsSource}`);
  }
  
  // Create stub CSS file - NAME MUST MATCH CLASS NAME EXACTLY
  const cssTarget = join(BLOCKS_DIR, `${COMPONENT_NAME}.css`);  // ← EDS requires this exact name
  const stubCSS = '/* Styles are bundled in the JavaScript file for performance */\n';
  writeFileSync(cssTarget, stubCSS);
  console.log(`✅ Created stub CSS file`);
}

function copyDocumentation() {
  // Copy user documentation
  const userReadme = join(BUILD_DIR, 'USER-README.md');
  const targetReadme = join(BLOCKS_DIR, 'README.md');
  
  if (existsSync(userReadme)) {
    copyFileSync(userReadme, targetReadme);
    console.log(`✅ Copied README.md`);
  } else {
    console.warn(`⚠️  USER-README.md not found, creating basic README`);
    const basicReadme = `# ${COMPONENT_NAME}\n\nA complex EDS block built with external dependencies.\n\n## Usage\n\nAdd the block to your document and configure as needed.\n`;
    writeFileSync(targetReadme, basicReadme);
  }
}

function createTestFile() {
  // Primary test file - rendered HTML (standard EDS structure)
  const testHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${COMPONENT_NAME} - EDS Test</title>
    <link rel="stylesheet" href="${COMPONENT_NAME}.css">
    <style>
        body { font-family: system-ui, sans-serif; padding: 2rem; }
        .test-container { max-width: 1200px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="test-container">
        <h1>${COMPONENT_NAME} - EDS Test (Rendered HTML)</h1>
        
        <!-- ✅ RENDERED HTML: Full EDS structure (what decorate() receives) -->
        <div class="${COMPONENT_NAME} block" data-block-name="${COMPONENT_NAME}" data-block-status="initialized">
            <div>
                <div>/api/test-data.json</div>
            </div>
        </div>
    </div>

    <script type="module">
        import decorate from './${COMPONENT_NAME}.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const block = document.querySelector('.${COMPONENT_NAME}.block');
            if (block) {
                decorate(block);
            }
        });
    </script>
</body>
</html>`;

  writeFileSync(join(BLOCKS_DIR, 'test.html'), testHTML);
  console.log(`✅ Created test.html (rendered HTML)`);

  // Optional: Create test2.html for served HTML testing
  const test2HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${COMPONENT_NAME} - Served HTML Test</title>
    <link rel="stylesheet" href="${COMPONENT_NAME}.css">
    <style>
        body { font-family: system-ui, sans-serif; padding: 2rem; }
        .test-container { max-width: 1200px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="test-container">
        <h1>${COMPONENT_NAME} - Served HTML Test</h1>
        <p><strong>Note:</strong> This tests the minimal HTML structure before EDS processing.</p>
        
        <!-- 📄 SERVED HTML: Minimal structure (what CMS delivers) -->
        <div class="${COMPONENT_NAME}">
            /api/test-data.json
        </div>
    </div>

    <!-- EDS scripts would normally process this, but for testing we'll manually decorate -->
    <script type="module">
        import decorate from './${COMPONENT_NAME}.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            const block = document.querySelector('.${COMPONENT_NAME}');
            
            // Manually add what EDS would add
            block.classList.add('block');
            block.setAttribute('data-block-name', '${COMPONENT_NAME}');
            block.setAttribute('data-block-status', 'initialized');
            
            // Create EDS nested structure
            const content = block.textContent.trim();
            block.innerHTML = \`<div><div>\${content}</div></div>\`;
            
            // Now decorate
            decorate(block);
        });
    </script>
</body>
</html>`;

  writeFileSync(join(BLOCKS_DIR, 'test2.html'), test2HTML);
  console.log(`✅ Created test2.html (served HTML)`);
}

function main() {
  try {
    console.log(`🚀 Deploying ${COMPONENT_NAME} to blocks directory...`);
    
    // Ensure blocks directory exists
    ensureDirectory(BLOCKS_DIR);
    
    // Copy built files
    copyBuiltFiles();
    
    // Copy documentation
    copyDocumentation();
    
    // Create test file
    createTestFile();
    
    console.log(`🎉 Deployment complete! Files available in: ${BLOCKS_DIR}`);
    console.log(`📝 Test at: http://localhost:3000/blocks/${COMPONENT_NAME}/test.html`);
    
  } catch (error) {
    console.error(`❌ Deployment failed:`, error.message);
    process.exit(1);
  }
}

main();
```

## Development Workflow

### **Two-Stage Testing Process**

The dual-directory architecture requires two different testing approaches:

#### **Stage 1: Development Testing (`index.html`)**

```bash
cd build/my-component
npm run dev
```

**What happens:**
- Vite automatically serves `index.html` at `http://localhost:5174/`
- **Vite proxy forwards missing assets** to `https://allabout.network`
- Hot reload for rapid development
- Source maps for debugging
- Real production data via proxy (no complex mocking needed)
- Unbundled imports (external libraries loaded separately)

**Proxy behavior example:**
```
Request: http://localhost:5174/slides/query-index.json
Proxied: https://allabout.network/slides/query-index.json
Result:  Component gets real production data during development
```

**Use for:**
- Rapid component development with real data
- Styling and interaction testing
- External library integration debugging
- Development workflow optimization

#### **Stage 2: EDS Integration Testing (`test.html`)**

```bash
cd build/my-component
npm run deploy  # Build and deploy to /blocks/

# Then test in EDS environment
cd ../../  # Back to project root
npm run debug  # Start EDS debug server
```

**What happens:**
- Navigate manually to `http://localhost:3000/blocks/my-component/test.html`
- **EDS server proxy forwards missing assets** to `https://allabout.network`
- Tests bundled, production-ready component
- Validates EDS block structure and decoration
- Real EDS environment with production assets
- Verifies deployment process worked correctly

**Proxy behavior example:**
```
Request: http://localhost:3000/media/hero-image.jpg
Proxied: https://allabout.network/media/hero-image.jpg
Result:  Block tests with real production images and assets
```

**Use for:**
- Final integration testing with real EDS assets
- EDS compatibility validation
- Bundle size and performance testing
- Production deployment verification

**Additional Testing (if test2.html exists):**
```
Navigate to: http://localhost:3000/blocks/my-component/test2.html
Purpose: Test served HTML → rendered HTML transformation
Validates: Content extraction handles various CMS output formats
```

### **File Lifecycle**

```
Development → Build → Deploy → Test
index.html  → dist/  → blocks/test.html → EDS Server
```

**Important:** The `index.html` file is for development only and never gets deployed to the blocks directory. The `test.html` file is specifically created for EDS testing and uses the exact EDS block structure.

### 1. Development Mode

```bash
cd build/my-component
npm run dev
```

- Hot reload development server
- Mock API responses
- Component library debugging
- Real-time style changes

### 2. Build and Deploy

```bash
cd build/my-component
npm run deploy
```

- Builds self-contained component
- Copies to `/blocks/` directory
- Creates stub CSS file
- Generates test files

### 3. EDS Integration

```bash
# Test in EDS environment
npm run debug  # From project root
# Navigate to: http://localhost:3000/blocks/my-component/test.html
```

### 4. Production Integration

```bash
# Copy to your EDS project
cp -r blocks/my-component /path/to/your-eds-project/blocks/
cd /path/to/your-eds-project
git add blocks/my-component/
git commit -m "Add my-component block"
git push
```

## Best Practices

### 1. **Understanding the EDS Import Constraint**

**This is the most important constraint to understand:** You cannot change how EDS loads your files.

```javascript
// THIS IS HARDCODED IN EDS - YOU CANNOT MODIFY IT
// From scripts/aem.js:
const mod = await import(`${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.js`);
```

**Implications:**
- HTML class `shoelace-card` → MUST have file `/blocks/shoelace-card/shoelace-card.js`
- No aliases, no redirects, no alternative paths
- Build process must output to these exact paths
- Component names in HTML directly determine your file structure

**Why build process is the only solution:**
```javascript
// ❌ This doesn't work in EDS deployment:
import '@shoelace-style/shoelace/dist/components/card/card.js';

// ✅ This works after build process bundles everything:
// All external dependencies are bundled into shoelace-card.js
```

### 2. Safe DOM Manipulation

**Always extract content BEFORE DOM changes:**

```javascript
// ✅ CORRECT: Extract first, build in memory, replace atomically
export default async function decorate(block) {
  const config = extractConfiguration(block);  // Extract FIRST
  const structure = await buildStructure(config);  // Build in memory
  
  block.innerHTML = '';  // Clear only when ready
  block.appendChild(structure);  // Atomic replacement
}
```

### 2. Error Boundaries

**Never let complex components break the page:**

```javascript
export default async function decorate(block) {
  try {
    await enhanceComponent(block);
  } catch (error) {
    console.error('[component] Enhancement failed:', error);
    
    // Show minimal error state
    const fallback = createErrorState('Component temporarily unavailable');
    block.appendChild(fallback);
  }
}
```

### 3. EDS Compatibility

**Maintain EDS attributes and visibility:**

```javascript
// Preserve EDS metadata
const blockStatus = block.getAttribute('data-block-status');
const blockName = block.getAttribute('data-block-name');

// After DOM replacement
if (blockStatus) block.setAttribute('data-block-status', blockStatus);
if (blockName) block.setAttribute('data-block-name', blockName);

// Ensure EDS visibility
if (!document.body.classList.contains('appear')) {
  document.body.classList.add('appear');
}
```

### 4. Bundle Optimization

**Monitor and optimize bundle size:**

```bash
# Check bundle size
npm run build
ls -lh dist/

# Analyze bundle content
npx vite build --analyze
```

## Summary

Complex EDS blocks provide sophisticated functionality while maintaining EDS compatibility through:

1. **Dual-directory architecture** separating development from deployment
2. **Safe DOM manipulation** with atomic replacement patterns
3. **External library integration** via build process bundling
4. **EDS attribute preservation** maintaining framework compatibility
5. **Comprehensive error handling** ensuring graceful degradation
6. **Automated deployment** streamlining the build-to-blocks workflow

This approach enables modern development workflows while respecting EDS principles of self-contained, performant components.

## See Also

### Essential Foundation
- **[Block Architecture Standards](block-architecture-standards.md)** - Comprehensive standards for EDS block development including naming conventions, file structure, and coding patterns
- **[Raw EDS Blocks Guide](raw-eds-blocks-guide.md)** - Step-by-step guide to creating simple EDS blocks using vanilla JavaScript and minimal dependencies
- **[EDS Overview](../eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[Project Structure](../project-structure.md)** - Understanding the overall EDS project organization and file conventions
- **[CSS Naming Convention Style Guide](../guidelines/style-guide.md)** - CSS naming conventions and standards for EDS blocks and components

### Development & Testing
- **[Debug Guide](../testing/debug.md)** - Comprehensive debugging strategies for EDS blocks and common troubleshooting scenarios
- **[Testing Strategies](testing-strategies.md)** - Testing approaches for EDS blocks including unit tests and integration testing
- **[Performance Optimization](performance-optimization.md)** - Techniques for optimizing EDS block performance and loading
- **[Browser Compatibility](browser-compatibility.md)** - Ensuring cross-browser compatibility for EDS implementations

### Advanced Implementation
- **[Web Components with EDS](web-components-with-eds.md)** - Integrating modern web components within the EDS framework
- **[JavaScript Patterns](javascript-patterns.md)** - Reusable JavaScript patterns for EDS block development
- **[CSS Patterns](css-patterns.md)** - Common CSS patterns and styling approaches for EDS blocks
- **[Block Examples](block-examples.md)** - Real-world examples of successful EDS block implementations

### Build & Deployment
- **[Build Tools Configuration](build-tools-configuration.md)** - Advanced build tool setup and configuration for complex EDS blocks
- **[Deployment Strategies](deployment-strategies.md)** - Best practices for deploying complex EDS blocks to production
- **[CI/CD Integration](ci-cd-integration.md)** - Integrating complex EDS block builds into continuous integration pipelines

## Next Steps

### For Developers New to Complex EDS Blocks
1. **Master the fundamentals** by first completing the [Raw EDS Blocks Guide](raw-eds-blocks-guide.md)
2. **Understand EDS constraints** by thoroughly reading the [EDS Overview](../eds.md) and [Block Architecture Standards](block-architecture-standards.md)
3. **Set up your first build environment** following the setup instructions in this guide
4. **Start with a simple external library** (like Shoelace) before attempting more complex integrations
5. **Practice the dual-directory workflow** to understand development vs. deployment phases

### For Experienced EDS Developers
1. **Evaluate the trade-offs** between simple blocks and complex blocks for each use case
2. **Master the build process** by implementing the Vite configuration and deployment automation
3. **Optimize bundle sizes** using the techniques described in the bundle optimization section
4. **Implement comprehensive error handling** following the patterns shown in the advanced examples
5. **Explore advanced external libraries** like charting libraries, design systems, or data visualization tools

### For Architects & Technical Leads
1. **Establish build standards** for your team using this guide as a foundation
2. **Create reusable build configurations** that can be shared across multiple complex blocks
3. **Design testing strategies** that cover both development and EDS integration phases
4. **Plan performance budgets** for complex blocks to maintain EDS's performance advantages
5. **Document decision criteria** for when to use complex vs. simple block approaches

### For DevOps & Build Engineers
1. **Set up CI/CD pipelines** that handle the dual-directory build and deployment process
2. **Implement automated testing** for both development and EDS integration phases
3. **Create deployment automation** that handles the build → blocks directory workflow
4. **Monitor bundle sizes** and performance impact of complex blocks in production
5. **Establish rollback procedures** for complex block deployments

### For Performance Engineers
1. **Analyze bundle impact** on Core Web Vitals and EDS performance scores
2. **Implement lazy loading strategies** for complex blocks that aren't immediately visible
3. **Optimize external library usage** by tree-shaking and selective imports
4. **Monitor real-user performance** impact of complex blocks in production
5. **Create performance budgets** and alerts for complex block deployments

### For QA & Testing Teams
1. **Understand the dual testing approach** (development vs. EDS integration)
2. **Create test scenarios** that cover both simple and complex block functionality
3. **Validate EDS compatibility** using the test.html files and EDS debug server
4. **Test error handling** and graceful degradation scenarios
5. **Verify accessibility** of complex blocks with external library components