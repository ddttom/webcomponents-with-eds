# Building Advanced Glassmorphism Cards with Shoelace: A Complete Implementation Guide

## Introduction

In this comprehensive tutorial, we'll explore the development of a sophisticated card component using Shoelace Design System, featuring advanced glassmorphism effects, immersive modal overlays, and modern web development practices. This implementation demonstrates how to create visually stunning, accessible, and performant UI components that rival premium design systems.

## The AI-Assisted Development Challenge

### Why Traditional EDS Development Limits AI Assistance

Adobe Edge Delivery Services delivers exceptional performance and rapid development cycles. The platform itself is brilliant. However, the traditional development workflow creates significant barriers for AI assistance, limiting the potential for accelerated development and intelligent code suggestions.

The challenge stems from EDS's multi-system approach: creating branches, writing content in Google Docs or SharePoint, then coordinating between code repositories, documents, and deployment systems. While this workflow excels for human developers who can mentally juggle these interconnected pieces, it creates an impossible situation for AI assistants.

**The AI Assistance Problem:**
- AI can't access your Google Docs or SharePoint content
- It can't correlate branch changes with document updates  
- It can't test code against real data from multiple sources
- It lacks complete context about the development environment

Ask an AI to help debug your EDS block, and it drowns in confusion. The result? Developers work alone, missing out on AI's ability to accelerate development, catch bugs early, and suggest architectural improvements.

### A Local-First Solution Changes Everything

This Shoelace Card implementation demonstrates a better approach: **local-first development that enables meaningful AI assistance**. Instead of fragmenting workflows across multiple systems, we've created a unified environment where AI assistants can participate effectively.

**The Architecture:**
Our development server implements a **local-first, proxy-fallback approach**. It checks if a requested file exists locally first. If it does, it serves that file. If not, it fetches the file from your production server and passes it through. This simple but powerful pattern means you can develop individual blocks without juggling multiple systems while still accessing real EDS resources.

**AI-Friendly Benefits:**
- **Unified Environment**: AI sees code, content, and data in one place
- **Immediate Feedback**: Save a file and refresh - changes appear instantly
- **Complete Context**: Work on code and content together without system switching
- **Real-time Debugging**: Both you and AI see exactly what's happening with each request
- **Intelligent Assistance**: AI can analyze, test, and suggest improvements with full visibility

You still use branches for version control. You still create documents when needed. But now AI can participate meaningfully in your development process - suggesting code improvements, catching accessibility issues, and debugging problems as they happen.

This Shoelace Card component showcases what becomes possible when AI can see everything in one place: sophisticated glassmorphism effects, comprehensive error handling, and performance optimizations that would be difficult to achieve without intelligent assistance throughout the development process.

## Project Overview

The Shoelace Card component represents a significant advancement in web component design, combining:

- **Advanced Glassmorphism Effects**: Multi-layer backdrop blur with sophisticated shadow systems
- **Immersive Modal System**: Full-screen content display with background imagery integration and integrated title header design. Close by clicking the ESC button in the title header, pressing ESC key, or clicking outside modal
- **Modern Web Standards**: ES Modules, Web Components, and progressive enhancement
- **Accessibility First**: ARIA labels, keyboard navigation, and screen reader support
- **Performance Optimized**: Minimal runtime overhead with efficient DOM manipulation

## Architecture and Design Philosophy

### Component Structure

Our Shoelace Card implementation follows a modular architecture:

```bash
build/shoelace-card/
├── shoelace-card.js      # Core component logic
├── shoelace-card.css     # Advanced styling with glassmorphism
├── index.html            # Development test environment
├── package.json          # Dependencies and scripts
├── vite.config.js        # Build configuration
├── deploy.js             # Deployment script
├── shoelace-card-stub.css # Stub CSS for EDS deployment
├── USER-README.md        # User documentation
└── DEV-README.md         # Development documentation
```

### Design System Integration

The component leverages Shoelace's powerful design system while extending it with custom glassmorphism effects:

```javascript
// Import Shoelace components for bundling
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';

// Import styles for bundling
import shoelaceStyles from '@shoelace-style/shoelace/dist/themes/light.css?inline';
import componentStyles from './shoelace-card.css?inline';
```

### Multi-Component Assembly Architecture

One of the most powerful aspects of Shoelace is its modular component system. Our implementation demonstrates how to effectively assemble and coordinate multiple Shoelace components to create sophisticated user interfaces. The key components we utilize include:

```javascript
// Core component assembly for rich UI experiences
const components = ['sl-card', 'sl-button', 'sl-badge', 'sl-icon-button', 'sl-spinner'];

// Components are imported at module level for bundling
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
```

#### Component Coordination Patterns

**1. Hierarchical Component Structure**
```javascript
// Primary container: sl-card provides the foundational structure
function createCardContainer(cardData) {
  const card = document.createElement('sl-card');
  card.className = 'shoelace-enhanced-card';
  
  // Secondary components: sl-badge for categorization
  const categoryBadge = document.createElement('sl-badge');
  categoryBadge.variant = 'primary';
  categoryBadge.textContent = cardData.category || 'Featured';
  
  // Interactive elements: sl-button for primary actions
  const actionButton = document.createElement('sl-button');
  actionButton.variant = 'primary';
  actionButton.size = 'medium';
  actionButton.textContent = cardData.buttonText || 'Learn More';
  
  // Utility components: sl-icon-button for secondary actions
  const favoriteButton = document.createElement('sl-icon-button');
  favoriteButton.name = 'heart';
  favoriteButton.label = 'Add to favorites';
  
  return { card, categoryBadge, actionButton, favoriteButton };
}
```

**2. State Management Across Components**
```javascript
// Coordinated state management for multiple components
class ShoelaceCardState {
  constructor() {
    this.isLoading = false;
    this.isFavorited = false;
    this.isModalOpen = false;
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
  
  // Favorite state coordination
  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
    
    const favoriteButton = this.components.get('favoriteButton');
    if (favoriteButton) {
      favoriteButton.name = this.isFavorited ? 'heart-fill' : 'heart';
      favoriteButton.setAttribute('aria-pressed', this.isFavorited.toString());
    }
    
    const badge = this.components.get('badge');
    if (badge && this.isFavorited) {
      badge.variant = 'success';
      badge.textContent = 'Favorited';
    }
  }
}
```

**3. Event Coordination Between Components**
```javascript
// Sophisticated event handling across multiple components
function setupComponentEventHandlers(cardState, components) {
  const { card, actionButton, favoriteButton, spinner } = components;
  
  // Primary action with loading coordination
  actionButton.addEventListener('click', async (event) => {
    event.preventDefault();
    
    try {
      // Coordinate loading state across components
      cardState.setLoadingState(true);
      
      // Show spinner while processing
      spinner.style.display = 'block';
      
      // Simulate async operation (modal opening, data fetching, etc.)
      await openAdvancedModal(cardState.cardData);
      
      // Update badge to show interaction
      const badge = components.categoryBadge;
      badge.variant = 'success';
      badge.textContent = 'Viewed';
      
    } catch (error) {
      console.error('[shoelace-card] Action failed:', error);
      
      // Error state coordination
      actionButton.variant = 'danger';
      actionButton.textContent = 'Try Again';
      
    } finally {
      cardState.setLoadingState(false);
      spinner.style.display = 'none';
    }
  });
  
  // Secondary action coordination
  favoriteButton.addEventListener('click', (event) => {
    event.stopPropagation();
    cardState.toggleFavorite();
    
    // Animate badge change
    const badge = components.categoryBadge;
    badge.style.transform = 'scale(1.1)';
    setTimeout(() => {
      badge.style.transform = 'scale(1)';
    }, 150);
  });
  
  // Card-level interactions
  card.addEventListener('mouseenter', () => {
    // Subtle hover effects across components
    actionButton.style.transform = 'translateY(-2px)';
    favoriteButton.style.opacity = '1';
  });
  
  card.addEventListener('mouseleave', () => {
    actionButton.style.transform = 'translateY(0)';
    favoriteButton.style.opacity = '0.7';
  });
}
```

**4. Advanced Component Composition**
```javascript
// Complete card assembly with all components
async function assembleAdvancedCard(cardData, index) {
  try {
    // Ensure all components are loaded
    const componentsLoaded = await loadShoelaceComponents();
    if (!componentsLoaded) {
      throw new Error('Failed to load required components');
    }
    
    // Create component instances
    const card = document.createElement('sl-card');
    card.className = 'shoelace-enhanced-card';
    
    // Header section with badge
    const header = document.createElement('div');
    header.className = 'card-header';
    header.slot = 'header';
    
    const categoryBadge = document.createElement('sl-badge');
    categoryBadge.variant = 'primary';
    categoryBadge.pill = true;
    categoryBadge.textContent = cardData.category || `Slide ${index + 1}`;
    
    const favoriteButton = document.createElement('sl-icon-button');
    favoriteButton.name = 'heart';
    favoriteButton.label = 'Add to favorites';
    favoriteButton.className = 'favorite-button';
    
    header.appendChild(categoryBadge);
    header.appendChild(favoriteButton);
    
    // Content section
    const content = document.createElement('div');
    content.className = 'card-content';
    
    if (cardData.image) {
      const image = document.createElement('img');
      image.src = cardData.image;
      image.alt = cardData.title || 'Card image';
      image.className = 'card-image';
      content.appendChild(image);
    }
    
    const title = document.createElement('h3');
    title.textContent = cardData.title || SHOELACE_CARD_CONFIG.DEFAULT_TITLE;
    title.className = 'card-title';
    
    const description = document.createElement('p');
    description.textContent = cardData.description || SHOELACE_CARD_CONFIG.DEFAULT_DESCRIPTION;
    description.className = 'card-description';
    
    content.appendChild(title);
    content.appendChild(description);
    
    // Footer section with actions
    const footer = document.createElement('div');
    footer.className = 'card-footer';
    footer.slot = 'footer';
    
    const actionButton = document.createElement('sl-button');
    actionButton.variant = 'primary';
    actionButton.size = 'medium';
    actionButton.textContent = cardData.buttonText || SHOELACE_CARD_CONFIG.DEFAULT_BUTTON_TEXT;
    
    const spinner = document.createElement('sl-spinner');
    spinner.className = 'card-spinner';
    spinner.style.display = 'none';
    
    footer.appendChild(actionButton);
    footer.appendChild(spinner);
    
    // Assemble complete card
    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(footer);
    
    // Initialize state management
    const cardState = new ShoelaceCardState();
    cardState.cardData = cardData;
    cardState.components.set('card', card);
    cardState.components.set('badge', categoryBadge);
    cardState.components.set('favoriteButton', favoriteButton);
    cardState.components.set('buttons', [actionButton]);
    cardState.components.set('spinner', spinner);
    
    // Setup event coordination
    setupComponentEventHandlers(cardState, {
      card,
      actionButton,
      favoriteButton,
      categoryBadge,
      spinner
    });
    
    return card;
    
  } catch (error) {
    console.error('[shoelace-card] Card assembly failed:', error);
    return createFallbackCard(cardData);
  }
}
```

**5. Performance Optimization for Multiple Components**
```javascript
// Efficient batch operations for multiple components
function optimizeMultipleComponents(cards) {
  // Use DocumentFragment for efficient DOM manipulation
  const fragment = document.createDocumentFragment();
  
  // Batch component updates
  const updateBatch = [];
  
  cards.forEach((card, index) => {
    // Defer non-critical updates
    updateBatch.push(() => {
      const badge = card.querySelector('sl-badge');
      if (badge) {
        badge.textContent = `Item ${index + 1}`;
      }
    });
    
    fragment.appendChild(card);
  });
  
  // Execute batch updates after DOM insertion
  requestAnimationFrame(() => {
    updateBatch.forEach(update => update());
  });
  
  return fragment;
}
```

This multi-component approach demonstrates several key architectural principles:

- **Component Isolation**: Each Shoelace component maintains its own state and behavior
- **Coordinated Interactions**: Components communicate through a centralized state management system
- **Performance Optimization**: Batch loading and updates minimize DOM manipulation overhead
- **Error Resilience**: Graceful fallbacks when individual components fail to load
- **Accessibility Coordination**: ARIA attributes and keyboard navigation work across all components
- **Visual Consistency**: Unified styling and animation coordination across the component ensemble

The result is a sophisticated, interactive card system that leverages the full power of Shoelace's component ecosystem while maintaining excellent performance and user experience standards.

## FOUC Elimination and Performance Optimization

### The Flash of Unstyled Content Challenge

One of the most critical user experience issues in modern web components is the Flash of Unstyled Content (FOUC), where users see content building up progressively - text appearing first, followed by slowly loading images. This creates a jarring, unprofessional experience that undermines the sophisticated design.

### Image Preloading Solution

Our implementation addresses FOUC through a comprehensive **image preloading strategy** that ensures all visual content is ready before any cards are displayed:

```javascript
// Utility function to preload a single image
async function preloadImage(src, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const timer = setTimeout(() => {
      reject(new Error(`Image load timeout: ${src}`));
    }, timeout);
    
    img.onload = () => {
      clearTimeout(timer);
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timer);
      reject(new Error(`Image load failed: ${src}`));
    };
    
    img.src = src;
  });
}

// Preload all card images in parallel
async function preloadAllImages(cardData, timeout = 5000) {
  const imageUrls = cardData
    .map(card => card.image)
    .filter(Boolean);
    
  if (imageUrls.length === 0) {
    return [];
  }
  
  console.log(`[shoelace-card] Preloading ${imageUrls.length} images...`);
  
  const preloadPromises = imageUrls.map(url => 
    preloadImage(url, timeout).catch(error => {
      console.warn(`[shoelace-card] Failed to preload image: ${url}`, error);
      return null; // Return null for failed images
    })
  );
  
  const results = await Promise.all(preloadPromises);
  const successCount = results.filter(Boolean).length;
  console.log(`[shoelace-card] Preloaded ${successCount}/${imageUrls.length} images successfully`);
  
  return results;
}
```

### Atomic Content Rendering

The enhanced card generation process ensures all content appears simultaneously:

```javascript
// Enhanced generate cards with image preloading
async function generateCards(block, cardData) {
  if (!cardData || cardData.length === 0) {
    block.innerHTML = '<p class="shoelace-card-empty">No cards available.</p>';
    return;
  }
  
  // Show loading state
  block.classList.add('loading');
  
  try {
    // Preload all images first
    console.log('[shoelace-card] Preloading images...');
    await preloadAllImages(cardData);
    console.log('[shoelace-card] All images preloaded');
    
    // Create container and all cards
    const container = createCardContainer();
    const fragment = document.createDocumentFragment();
    
    // Build all cards with preloaded images
    cardData.forEach((data, index) => {
      const card = createShoelaceCard(data, index + 1);
      fragment.appendChild(card);
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
    
    attachCardEventListeners(block);
    
  } catch (error) {
    console.error('[shoelace-card] Image preloading failed:', error);
    // Fallback to progressive loading
    generateCardsProgressive(block, cardData);
  }
}
```

### Enhanced CSS Loading States

Sophisticated loading states and smooth transitions eliminate visual jarring:

```css
/* Enhanced loading state for the entire block */
.shoelace-card-block.loading {
  opacity: 0.7;
  pointer-events: none;
  position: relative;
  min-height: 200px;
}

.shoelace-card-block.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2rem;
  height: 2rem;
  margin: -1rem 0 0 -1rem;
  border: 2px solid var(--sl-color-neutral-300);
  border-top-color: var(--sl-color-primary-600);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 10;
}

/* Container starts hidden, fades in when loaded */
.shoelace-card-container {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease-out, transform 0.4s ease-out;
}

.shoelace-card-container.loaded {
  opacity: 1;
  transform: translateY(0);
}

/* Individual cards with staggered animation */
.shoelace-card-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.shoelace-card-container.loaded .shoelace-card-item {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delay for each card */
.shoelace-card-container.loaded .shoelace-card-item:nth-child(1) { transition-delay: 0.1s; }
.shoelace-card-container.loaded .shoelace-card-item:nth-child(2) { transition-delay: 0.2s; }
.shoelace-card-container.loaded .shoelace-card-item:nth-child(3) { transition-delay: 0.3s; }
.shoelace-card-container.loaded .shoelace-card-item:nth-child(4) { transition-delay: 0.4s; }
.shoelace-card-container.loaded .shoelace-card-item:nth-child(5) { transition-delay: 0.5s; }
.shoelace-card-container.loaded .shoelace-card-item:nth-child(n+6) { transition-delay: 0.6s; }
```

### Error Handling and Fallbacks

Robust error handling ensures graceful degradation:

```javascript
// Enhanced image creation with error handling
function createCardImage(imageSrc, title) {
  if (!imageSrc) return null;
  
  const img = document.createElement('img');
  img.slot = 'image';
  img.src = imageSrc;
  img.alt = title || 'Card image';
  img.loading = 'lazy'; // Keep as fallback
  
  // Add error handling with placeholder
  img.onerror = () => {
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
    img.alt = 'Image not found';
  };
  
  return img;
}

// Fallback function for when preloading fails
function generateCardsProgressive(block, cardData) {
  console.log('[shoelace-card] Using progressive loading fallback');
  
  const container = createCardContainer();
  
  cardData.forEach((data, index) => {
    const card = createShoelaceCard(data, index + 1);
    container.appendChild(card);
  });
  
  block.innerHTML = '';
  block.appendChild(container);
  block.classList.remove('loading');
  
  attachCardEventListeners(block);
}
```

### Performance Benefits

The FOUC elimination implementation provides significant performance and user experience improvements:

**✅ Eliminated FOUC**: No progressive text/image building - all content appears simultaneously
**✅ Smooth Loading**: Professional loading states with animated spinner
**✅ Fast Perceived Performance**: All content appears as complete units
**✅ Reliable Fallbacks**: Graceful handling of failed/slow images with placeholder graphics
**✅ Network Resilient**: 5-second timeout handling for slow connections
**✅ Memory Efficient**: Uses DocumentFragment for optimal DOM manipulation
**✅ Accessibility Maintained**: Proper loading states and alt text throughout

### Implementation Results

The implementation successfully transforms the user experience from a jarring progressive build-up to a smooth, professional loading experience. Users see a clean loading spinner while all images preload in parallel, followed by the simultaneous appearance of fully-formed cards with smooth staggered animations.

This approach demonstrates how modern web component development can achieve both visual sophistication and technical excellence through careful attention to loading states and user experience optimization.

## Core Implementation

### JavaScript Architecture

The component uses modern ES Module patterns with comprehensive error handling and optimized development environment setup:

```javascript
// Local utility functions for development environment
async function loadCSS(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

async function loadScript(src, options = {}) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    Object.assign(script, options);
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Configuration
const SHOELACE_CARD_CONFIG = {
  QUERY_INDEX_PATH: '/slides/query-index.json',
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
  if (!document.querySelector('#shoelace-card-styles')) {
    const style = document.createElement('style');
    style.id = 'shoelace-card-styles';
    style.textContent = shoelaceStyles + '\n' + componentStyles;
    document.head.appendChild(style);
  }
}

// Main decoration function with error handling
export default async function decorate(block) {
  try {
    // Inject styles first
    injectStyles();
    
    // Get query path and fetch data
    const queryPath = getQueryPath(block);
    const cardData = await fetchCardData(queryPath);
    
    // Clear block and add container class
    block.innerHTML = '';
    block.classList.add('shoelace-card-block');
    
    // Generate cards with preloading
    await generateCards(block, cardData);
    
  } catch (error) {
    console.error('[shoelace-card] Enhancement failed:', error);
    showFallbackContent(block);
  }
}
```

### Advanced Modal System

The modal implementation features sophisticated glassmorphism effects with an innovative integrated title header design:

```javascript
function createAdvancedModal(cardData, index) {
  try {
    // Create modal overlay with enhanced glassmorphism
    const overlay = document.createElement('div');
    overlay.className = 'shoelace-card-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    
    // Modal container with background image integration
    const modal = document.createElement('div');
    modal.className = 'shoelace-card-modal';
    modal.style.backgroundImage = `url(${cardData.image})`;
    
    // Content area with integrated title header
    const content = document.createElement('div');
    content.className = 'shoelace-card-modal-content';
    
    // Assemble modal structure
    modal.appendChild(content);
    overlay.appendChild(modal);
    
    // Add to DOM with animation
    document.body.appendChild(overlay);
    animateModalEntry(overlay);
    
    return overlay;
  } catch (error) {
    console.error('[shoelace-card] Modal creation failed:', error);
    throw error;
  }
}
```

### Integrated Title Header Design

One of the most significant UX improvements in our modal system is the **integrated title header** that combines the content title with the ESC button in a unified, professional interface:

```javascript
// Enhanced content processing with integrated title header
async function loadModalContent(modalContent, contentPath) {
  try {
    // Fetch content with enhanced error handling
    const htmlContent = await fetchPlainHtml(contentPath);
    
    if (htmlContent) {
      // Create content container
      const contentDiv = document.createElement('div');
      contentDiv.className = 'shoelace-card-modal-text';
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
      titleHeader.className = 'shoelace-card-modal-header';
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
      headerCloseButton.className = 'shoelace-card-modal-close';
      headerCloseButton.innerHTML = 'ESC';
      headerCloseButton.setAttribute('aria-label', 'Press ESC or click to close modal');
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
      modalContent.innerHTML = '';
      modalContent.appendChild(titleHeader);
      modalContent.appendChild(contentDiv);
    }
  } catch (error) {
    console.error('[shoelace-card] Content loading failed:', error);
    modalContent.innerHTML = createErrorContent(contentPath, error);
  }
}
```

#### Design Benefits

**Professional Interface Pattern**
- Follows standard modal design conventions with clear header/content separation
- Title and close button are logically grouped in a unified header area
- Eliminates floating UI elements that can obstruct content

**Enhanced Usability**
- ESC button is always visible and accessible, never hidden behind content
- Clear visual hierarchy with title prominently displayed
- Intuitive placement follows user expectations from other applications

**Visual Excellence**
- Gradient text styling for the title creates visual impact
- Glassmorphism effects maintain design consistency
- Subtle border separation provides clear content organization

**Space Optimization**
- No wasted vertical space above content
- Efficient use of header area for both title and controls
- Content can utilize full available space below the header

```css
/* Integrated header styling */
.shoelace-card-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 0.5rem 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.shoelace-card-modal-header h1 {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex: 1;
}

.shoelace-card-modal-header .shoelace-card-modal-close {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  width: 3rem;
  height: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 1rem;
}

.shoelace-card-modal-header .shoelace-card-modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}
```

## Conclusion

The Shoelace Card component represents a significant advancement in modern web component development, demonstrating how to create sophisticated, accessible, and performant UI components. Key achievements include:

### Technical Excellence

- **Advanced Glassmorphism**: Multi-layer backdrop blur with sophisticated shadow systems
- **Integrated Title Header Design**: Professional modal interface with unified title and ESC button
- **Modern Architecture**: ES Modules, Web Components, and progressive enhancement
- **Performance Optimized**: Efficient DOM manipulation and lazy loading
- **Accessibility First**: Comprehensive ARIA support and keyboard navigation

### Development Quality

- **Comprehensive Testing**: Automated testing for functionality and accessibility
- **Error Handling**: Robust error boundaries with graceful fallbacks
- **Documentation**: Detailed implementation guides and API documentation
- **Maintainability**: Clean code architecture with configuration-driven design
- **Standalone Architecture**: Self-contained component with exported decorate function
- **Clean Dependencies**: No external framework dependencies beyond Shoelace

### User Experience

- **Visual Excellence**: Premium glassmorphism effects rivaling native applications
- **Professional Modal Interface**: Integrated title headers that follow industry standards
- **Smooth Interactions**: Sophisticated animation system with smooth transitions
- **Responsive Design**: Mobile-optimized with adaptive layouts
- **Content Integration**: Seamless EDS content management integration

This implementation serves as a blueprint for creating advanced web components that combine visual sophistication with technical excellence, demonstrating the potential of modern web technologies when applied with careful attention to performance, accessibility, and user experience.

The component successfully bridges the gap between design system consistency and creative visual expression, providing developers with a powerful tool for creating engaging, accessible, and performant web experiences.

## 🚀 Deployment and EDS Integration

### Deploy Command

The `npm run deploy` command is the key to deploying the finished built stubs and README to the blocks folder:

```bash
cd build/shoelace-card
npm run deploy
```

This command:
- **Builds the self-contained component** with Vite bundling all Shoelace dependencies
- **Copies built files** to `../../blocks/shoelace-card/` directory
- **Deploys stub CSS** (styles are bundled in JavaScript for performance)
- **Copies user documentation** as README.md for content authors
- **Creates production-ready files** optimized for EDS deployment

### Using the Built System in Your EDS Project

To actually use the built system in your EDS project, you need to copy the `blocks/shoelace-card/` contents to your own repository and push to git:

```bash
# Copy the built component to your EDS project
cp -r blocks/shoelace-card /path/to/your/eds-project/blocks/

# Navigate to your EDS project
cd /path/to/your/eds-project

# Add the component to git
git add blocks/shoelace-card/

# Commit the changes
git commit -m "Add Shoelace Card component with glassmorphism effects"

# Push to your repository
git push origin main
```

### Integration Workflow

1. **Development**: Work in `build/shoelace-card/` with hot reload and modern tooling
2. **Build & Deploy**: Run `npm run deploy` to create production files in `blocks/`
3. **Copy to EDS**: Copy `blocks/shoelace-card/` contents to your EDS repository
4. **Git Integration**: Commit and push the component files to your EDS project
5. **Content Creation**: Use the component in your documents and pages

The deploy command handles the technical build process, but the final step requires manual integration into your specific EDS repository to maintain proper version control and deployment workflows.

## ⚠️ **EDS Core Scripts Constraint**

### **Critical Development Constraint**

When working with EDS blocks, it's essential to understand that **EDS core scripts cannot be modified**:

- **[`scripts/scripts.js`](scripts/scripts.js)** - EDS main processing script
- **[`scripts/aem.js`](scripts/aem.js)** - Adobe licensed core functionality  
- **[`scripts/delayed.js`](scripts/delayed.js)** - EDS delayed loading functionality

These files belong to Adobe Edge Delivery Services and must remain untouched.

### **EDS Body Visibility System Understanding**

**The EDS Visibility Control Flow:**
1. **Initial State**: CSS sets `body { display: none; }` by default
2. **Processing**: EDS [`scripts/scripts.js:80`](scripts/scripts.js:80) adds `document.body.classList.add('appear')`
3. **Final State**: CSS rule `body.appear { display: block; }` makes content visible

**When EDS Should Add `appear` Class:**
- **Trigger Condition**: When `<main>` element exists in DOM
- **Execution Point**: During `loadEager()` function in [`scripts/scripts.js:78-80`](scripts/scripts.js:78-80)
- **Expected Behavior**: Body becomes visible after EDS processing completes

### **Component-Level Visibility Solutions**

Since EDS scripts cannot be modified, components must ensure their own visibility:

```javascript
// Recommended pattern for component decorate() functions
export default async function decorate(block) {
  try {
    // Preserve EDS attributes after innerHTML clearing
    const blockStatus = block.getAttribute('data-block-status');
    const blockName = block.getAttribute('data-block-name');
    
    // Clear block and add container class
    block.innerHTML = '';
    block.classList.add('shoelace-card-block');
    
    // Restore EDS attributes to maintain visibility controls
    if (blockStatus) {
      block.setAttribute('data-block-status', blockStatus);
    }
    if (blockName) {
      block.setAttribute('data-block-name', blockName);
    }
    
    // Ensure body visibility for component rendering
    if (!document.body.classList.contains('appear')) {
      console.warn('[shoelace-card] EDS appear class missing, adding for visibility');
      document.body.classList.add('appear');
    }
    
    // ... rest of component logic
    
  } catch (error) {
    console.error('[shoelace-card] Enhancement failed:', error);
    showFallbackContent(block);
  }
}
```

### **Why This Approach Works**

**Respects EDS Architecture:**
- Doesn't modify Adobe's core scripts
- Maintains EDS processing lifecycle
- Preserves block status attributes
- Works with EDS section visibility system

**Provides Reliable Fallback:**
- Components ensure their own visibility
- Graceful handling of EDS script timing issues
- Self-contained component behavior
- No dependency on EDS script completion timing

**Maintains Performance:**
- Minimal overhead (single class check/addition)
- No interference with EDS processing
- Preserves EDS optimization benefits
- Compatible with EDS caching strategies

This constraint-aware approach ensures Shoelace Card components work reliably while respecting the boundaries of the EDS system architecture.
## Understanding EDS HTML Processing States

### Served vs Rendered HTML: A Critical Distinction

When working with EDS blocks, especially those incorporating Shadow DOM components like Shoelace, understanding the difference between **served HTML** and **rendered HTML** is crucial for effective debugging:

#### **Served HTML State** (`test2.html`)
- **Raw content** as delivered from CMS/authoring systems (Google Docs, SharePoint)
- **Minimal structure** before EDS processing scripts run
- **Example**: `<div class="shoelace-card"></div>`
- **Represents**: Initial state that EDS receives from content management
- **Use case**: Testing component behavior with minimal DOM structure

#### **Rendered HTML State** (`test.html`)
- **Processed content** after [`scripts/aem.js`](scripts/aem.js) and [`scripts/scripts.js`](scripts/scripts.js) transformation
- **Full block structure** with proper EDS attributes and nesting
- **Example**: `<div class="shoelace-card block" data-block-name="shoelace-card" data-block-status="initialized">`
- **Represents**: Final DOM state after complete EDS processing
- **Use case**: Testing component behavior in production-like environment

#### **Why This Distinction Matters for Shadow DOM Components**

The served vs rendered distinction is critical because:

1. **EDS Processing Lifecycle**: EDS adds `data-block-status="initialized"` and proper block structure during processing
2. **Shadow DOM Timing**: Custom elements may register before or after EDS processing completes
3. **Style Injection**: CSS may not penetrate Shadow DOM boundaries properly depending on timing
4. **Race Conditions**: Competition between custom element registration and EDS block loading
5. **Visibility Controls**: EDS section visibility may conflict with Shadow DOM component initialization

#### **Testing Strategy for Both States**

Create comprehensive test files covering both scenarios:
```bash
blocks/shoelace-card/
├── test.html      # Rendered HTML (EDS-processed state)
├── test2.html     # Served HTML (raw/minimal state)  
├── shoelace-card.js  # Component logic
└── shoelace-card.css # Component styles
```

This dual-testing approach enables debugging of:
- **Component initialization** in minimal DOM environments
- **EDS integration** with full block processing
- **Shadow DOM timing** issues across different lifecycle stages
- **Style application** in various DOM states

## Debugging and Development Guide

### Comprehensive Debugging Process

The project includes a sophisticated debugging environment designed specifically for AI-assisted development. Here's the complete debugging workflow:

#### **Step 1: Start the Debug Server**
```bash
npm run debug  # Starts on http://localhost:3000
```

**Key Features:**
- **Local-first, proxy-fallback architecture** - serves local files first, proxies missing assets from `https://allabout.network`
- **Real-time error reporting** with comprehensive server logs
- **EDS block structure validation**
- **AI-friendly environment** with complete context visibility

#### **Step 2: Access Test Pages**
Navigate to: [`http://localhost:3000/blocks/shoelace-card/test.html`](http://localhost:3000/blocks/shoelace-card/test.html)

**The test page includes:**
- **Multiple test scenarios** (default, custom path, error handling)
- **Self-contained component testing** with all Shoelace dependencies bundled
- **Built-in debug helpers** accessible via browser console
- **Professional glassmorphism styling** matching component aesthetic

#### **Step 3: Use Debug Tools**
**Browser Console Helpers:**
```javascript
// Test modal functionality
debugShoelaceCard.testModal()

// Check component loading status
debugShoelaceCard.checkShoelaceLoaded()
```

**Browser Developer Tools:**
- **Console**: Component initialization logs, success/failure messages
- **Network**: Asset loading (CSS, JS, JSON data, images)
- **Elements**: DOM structure and component rendering

### **✅ Verified Working Features**

#### **Component Loading**
- ✅ Self-contained Shoelace Card component loads successfully
- ✅ All Shoelace dependencies bundled (no external CDN required)
- ✅ CSS stub loads with styles bundled in JavaScript
- ✅ Multiple block instances initialize properly

#### **Data Fetching & Proxy**
- ✅ Default query path: `/slides/query-index.json` (proxied successfully)
- ✅ Custom query path: `/custom/query-index.json` (404 handled gracefully)
- ✅ Error handling: `/invalid/path/query-index.json` (proper fallback)
- ✅ Image preloading: 5/5 images loaded successfully

#### **Modal Functionality**
- ✅ Immersive glassmorphism modals open on "Learn More" clicks
- ✅ Background images load from proxied content
- ✅ Rich content loaded from `.plain.html` files
- ✅ Click-outside-to-close functionality works
- ✅ Comprehensive debug logging for modal operations

### **Common Issues & Solutions**

#### **Port Already in Use**
```bash
# Kill processes using port 3000
lsof -ti:3000 | xargs kill -9
npm run debug
```

#### **HTML Syntax Errors**
- Check for malformed tags (like `</link>` instead of `</style>`)
- Validate proper EDS block structure
- Ensure proper nesting of elements

#### **Component Not Loading**
- Verify ES module imports/exports
- Check browser console for JavaScript errors
- Ensure proper EDS block structure with correct class names and data attributes

### **Server Behavior**

#### **Local-First Architecture**
- **Local files** served first from project directory
- **Proxy fallback** to `https://allabout.network` for missing assets
- **Comprehensive logging** showing request flow and proxy status
- **CORS support** for cross-origin development

#### **Asset Management**
- **JSON data**: Query index files with graceful 404 handling
- **Images**: Automatic proxy with format optimization
- **HTML content**: Plain HTML files for modal content
- **CSS/JS**: Local files with proper MIME types

### **EDS Block Structure Requirements**
```html
<div class="shoelace-card block" data-block-name="shoelace-card" data-block-status="initialized">
    <div>
        <div>
            <!-- Content processed by decorate function -->
        </div>
    </div>
</div>
```

### **Quality Assurance Scripts**
```bash
npm run lint          # ESLint with automatic fixes
npm run lint:md       # Markdown linting  
npm run hint          # Webhint analysis
npm run security      # Security audit
npm run validate      # Complete quality check
```

## Current Implementation Status

The Shoelace Card component is actively maintained and continuously improved. For the most up-to-date implementation details, complete source code, and latest features, visit the GitHub repository at https://github.com/ddttom/webcomponents-with-eds.

**Recent Updates**: 
- The modal system now features an integrated title header design that combines the content title with the ESC button in a professional, unified interface
- Fixed HTML syntax error in test file that was preventing proper rendering
- Enhanced debugging environment with comprehensive test scenarios and built-in debug helpers
- Verified working modal functionality with click-outside-to-close and comprehensive error handling
