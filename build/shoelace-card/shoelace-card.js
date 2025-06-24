// Import Shoelace components for bundling
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';

// Import styles for bundling
import shoelaceStyles from '@shoelace-style/shoelace/dist/themes/light.css?inline';
import componentStyles from './shoelace-card.css?inline';

// Configuration
const SHOELACE_CARD_CONFIG = {
  QUERY_INDEX_PATH: '/slides/query-index.json',
  BADGE_COLOR: 'primary',
  DEFAULT_BUTTON_TEXT: 'Learn More'
};

// Debug mode detection and logging
const DEBUG_MODE = window.location.hostname === 'localhost' && 
                   window.location.port === '3000';

// Debug logging removed for production

// Auto-inject styles when component loads
function injectStyles() {
  if (!document.querySelector('#shoelace-card-styles')) {
    const style = document.createElement('style');
    style.id = 'shoelace-card-styles';
    style.textContent = shoelaceStyles + '\n' + componentStyles;
    document.head.appendChild(style);
    
  } else {
    
  }
}

// Get query path from block content or use default
function getQueryPath(block) {
  const customPath = block.textContent.trim();
  return customPath || SHOELACE_CARD_CONFIG.QUERY_INDEX_PATH;
}

// Fetch card data from query-index.json
async function fetchCardData(queryPath) {
  try {
    const response = await fetch(queryPath, {
      mode: 'cors',
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch card data: ${response.status}`);
    }
    
    const json = await response.json();
    return json.data || [];
  } catch (error) {
    console.error('[shoelace-card] Fetch error:', error);
    return [];
  }
}

// Fetch plain HTML content for modal display with enhanced error handling
async function fetchPlainHtml(path) {
  
  
  try {
    const url = `${path}.plain.html`;
    
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      
    }, 10000); // 10 second timeout
    
    
    const response = await fetch(url, {
      mode: 'cors',
      headers: { 'Accept': 'text/html' },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    let html = await response.text();
    
    
    // Fix relative image paths
    html = html.replace(/src="\.\/media\//g, 'src="/media/');
    html = html.replace(/src="media\//g, 'src="/media/');
    html = html.replace(/src="\.\.\/media\//g, 'src="/media/');
    
    return html;
  } catch (error) {
    
    console.error('[shoelace-card] Plain HTML fetch error:', error);
    throw error; // Re-throw to be handled by caller
  }
}

// Utility function to preload a single image
async function preloadImage(src, timeout = 5000) {
  console.log(`[shoelace-card] Starting preload for: ${src}`);
  return new Promise((resolve, reject) => {
    const img = new Image();
    const timer = setTimeout(() => {
      console.warn(`[shoelace-card] Image load TIMEOUT after ${timeout}ms: ${src}`);
      reject(new Error(`Image load timeout: ${src}`));
    }, timeout);
    
    img.onload = () => {
      clearTimeout(timer);
      console.log(`[shoelace-card] Image loaded successfully: ${src}`);
      resolve(img);
    };
    
    img.onerror = () => {
      clearTimeout(timer);
      console.error(`[shoelace-card] Image load ERROR: ${src}`);
      reject(new Error(`Image load failed: ${src}`));
    };
    
    console.log(`[shoelace-card] Setting img.src for: ${src}`);
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

// Create numbered badge element
function createNumberedBadge(slideNumber) {
  const badge = document.createElement('sl-badge');
  badge.className = 'shoelace-card-badge';
  badge.setAttribute('variant', SHOELACE_CARD_CONFIG.BADGE_COLOR);
  badge.setAttribute('pill', '');
  badge.textContent = slideNumber;
  return badge;
}

// Create card image element with enhanced error handling
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

// Create card content element
function createCardContent(data) {
  const content = document.createElement('div');
  content.className = 'shoelace-card-content';
  
  if (data.title) {
    const title = document.createElement('strong');
    title.textContent = data.title;
    content.appendChild(title);
    content.appendChild(document.createElement('br'));
  }
  
  if (data.description) {
    const description = document.createTextNode(data.description);
    content.appendChild(description);
    content.appendChild(document.createElement('br'));
  }
  
  return content;
}

// Create card footer with button
function createCardFooter(data) {
  const footer = document.createElement('div');
  footer.slot = 'footer';
  footer.className = 'shoelace-card-footer';
  
  const button = document.createElement('sl-button');
  button.setAttribute('variant', 'primary');
  button.setAttribute('pill', '');
  button.textContent = data.buttonText || SHOELACE_CARD_CONFIG.DEFAULT_BUTTON_TEXT;
  button.dataset.cardPath = data.path;
  button.dataset.cardImage = data.image;
  button.dataset.action = 'open-modal';
  
  footer.appendChild(button);
  return footer;
}

// Create individual Shoelace card element
function createShoelaceCard(data, slideNumber) {
  const card = document.createElement('sl-card');
  card.className = 'shoelace-card-item';
  card.setAttribute('data-slide', slideNumber);
  
  // Build card structure
  const elements = [
    createNumberedBadge(slideNumber),
    createCardImage(data.image, data.title),
    createCardContent(data),
    createCardFooter(data)
  ].filter(Boolean);
  
  elements.forEach(el => card.appendChild(el));
  return card;
}

// Create card container
function createCardContainer() {
  const container = document.createElement('div');
  container.className = 'shoelace-card-container';
  return container;
}

// Handle card click events
function handleCardClick(event) {
  const button = event.target.closest('[data-action="open-modal"]');
  if (button) {
    event.preventDefault();
    const cardPath = button.dataset.cardPath;
    const cardImage = button.dataset.cardImage;
    openImmersiveModal(cardPath, cardImage);
  }
}

// Handle modal keyboard events
function handleModalKeydown(event) {
  if (event.key === 'Escape') {
    const modal = document.querySelector('.shoelace-card-modal');
    if (modal) {
      
      closeModal(modal);
    }
  }
}

// Attach event listeners to block
function attachCardEventListeners(block) {
  // Event delegation for card clicks
  block.addEventListener('click', handleCardClick);
  
  // Global keyboard listener for modal
  document.addEventListener('keydown', handleModalKeydown);
}

// Enhanced close modal with cleanup
function closeModal(modal) {
  
  
  try {
    // Clean up event handlers
    if (modal._delegationHandler) {
      document.removeEventListener('click', modal._delegationHandler);
      
    }
    
    if (modal._keyHandler) {
      // Remove all keyboard event listeners
      document.removeEventListener('keydown', modal._keyHandler, { capture: true });
      document.removeEventListener('keyup', modal._keyHandler, { capture: true });
      modal.removeEventListener('keydown', modal._keyHandler, { capture: true });
      modal.removeEventListener('keyup', modal._keyHandler, { capture: true });
      
    }
    
    if (modal._emergencyHandler) {
      modal.removeEventListener('click', modal._emergencyHandler);
      
    }
    
    // Remove modal from DOM
    if (modal.parentNode) {
      modal.parentNode.removeChild(modal);
      
    }
    
  } catch (error) {
    
    // Force removal as fallback
    try {
      modal.remove();
    } catch (fallbackError) {
      
    }
  }
}

// Validate modal structure
function validateModalStructure(modal) {
  
  
  const overlay = modal.querySelector('.shoelace-card-modal-overlay');
  const closeButton = modal.querySelector('.shoelace-card-modal-close');
  const content = modal.querySelector('.shoelace-card-modal-content');
  
  const validation = {
    modal: !!modal,
    overlay: !!overlay,
    closeButton: !!closeButton,
    content: !!content,
    modalInDOM: document.body.contains(modal),
    closeButtonInDOM: closeButton ? document.body.contains(closeButton) : false
  };
  
  
  return validation;
}

// Enhanced close button creation
function createEnhancedCloseButton() {
  // ESC button is now created as part of the title header in loadModalContent
  // This function is kept for compatibility but returns null
  
  return null;
}

// Attempt event attachment with strategy
function attemptEventAttachment(modal, strategy) {
  
  
  const closeButton = modal.querySelector('.shoelace-card-modal-close');
  
  if (!closeButton) {
    
    return false;
  }
  
  try {
    // Multiple event attachment approaches for maximum compatibility
    const clickHandler = (event) => {
      
      event.preventDefault();
      event.stopPropagation();
      closeModal(modal);
    };
    
    // Approach 1: Standard click event
    closeButton.addEventListener('click', clickHandler, { capture: true });
    
    // Approach 2: Mouse events for broader compatibility
    closeButton.addEventListener('mouseup', clickHandler, { capture: true });
    
    // Approach 3: Touch events for mobile
    closeButton.addEventListener('touchend', clickHandler, { capture: true });
    
    // Approach 4: Pointer events for modern browsers
    if ('PointerEvent' in window) {
      closeButton.addEventListener('pointerup', clickHandler, { capture: true });
    }
    
    // Add visual feedback
    closeButton.addEventListener('mousedown', () => {
      closeButton.style.transform = 'scale(0.95)';
    });
    
    closeButton.addEventListener('mouseup', () => {
      closeButton.style.transform = 'scale(1)';
    });
    
    // Test event attachment by adding a test listener
    closeButton.addEventListener('mouseover', () => {
      
    }, { once: true });
    
    
    return true;
    
  } catch (error) {
    
    return false;
  }
}

// Document-level event delegation
function setupDocumentDelegation(modal) {
  
  
  const modalId = 'modal-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  modal.setAttribute('data-modal-id', modalId);
  
  // Create delegation handler
  const delegationHandler = (event) => {
    // Check if click is on close button within our modal
    const closeButton = event.target.closest('.shoelace-card-modal-close');
    if (closeButton) {
      const targetModal = closeButton.closest(`[data-modal-id="${modalId}"]`);
      if (targetModal === modal) {
        
        event.preventDefault();
        event.stopPropagation();
        closeModal(modal);
        
        // Clean up delegation handler
        document.removeEventListener('click', delegationHandler);
      }
    }
    
    // Check if click is outside modal
    if (event.target === modal) {
      
      closeModal(modal);
      document.removeEventListener('click', delegationHandler);
    }
  };
  
  // Add delegation handler
  document.addEventListener('click', delegationHandler);
  
  
  // Store handler reference for cleanup
  modal._delegationHandler = delegationHandler;
}

// Enhanced event attachment with multiple strategies
function attachModalCloseListenersRobust(modal) {
  
  
  // Strategy 1: Immediate attachment
  let attached = attemptEventAttachment(modal, 'immediate');
  
  if (!attached) {
    // Strategy 2: Delayed attachment
    setTimeout(() => {
      
      attached = attemptEventAttachment(modal, 'delayed');
      
      if (!attached) {
        // Strategy 3: Document delegation fallback
        
        setupDocumentDelegation(modal);
      }
    }, 100);
  }
  
  // Strategy 4: Always setup document delegation as backup
  setupDocumentDelegation(modal);
}

// Enhanced keyboard handling
function setupKeyboardHandling(modal) {
  const keyHandler = (event) => {
    
    if (event.key === 'Escape' || event.code === 'Escape' || event.keyCode === 27) {
      
      event.preventDefault();
      event.stopPropagation();
      closeModal(modal);
      document.removeEventListener('keydown', keyHandler);
      document.removeEventListener('keyup', keyHandler);
    }
  };
  
  // Add both keydown and keyup listeners for maximum compatibility
  document.addEventListener('keydown', keyHandler, { capture: true });
  document.addEventListener('keyup', keyHandler, { capture: true });
  
  // Also add to the modal element itself
  modal.addEventListener('keydown', keyHandler, { capture: true });
  modal.addEventListener('keyup', keyHandler, { capture: true });
  
  modal._keyHandler = keyHandler;
  
}

// Emergency close mechanism
function setupEmergencyClose(modal) {
  // Double-click anywhere on modal to close
  let clickCount = 0;
  const emergencyHandler = () => {
    clickCount++;
    if (clickCount === 2) {
      
      closeModal(modal);
    }
    setTimeout(() => { clickCount = 0; }, 500);
  };
  
  modal.addEventListener('click', emergencyHandler);
  modal._emergencyHandler = emergencyHandler;
}

// Wait for DOM readiness
function waitForDOMReady(modal) {
  return new Promise((resolve) => {
    if (document.body.contains(modal)) {
      // Use requestAnimationFrame to ensure rendering
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          
          resolve();
        });
      });
    } else {
      
      setTimeout(() => waitForDOMReady(modal).then(resolve), 10);
    }
  });
}

// Create error content for failed loads
function createErrorContent(contentPath, error) {
  return `
    <div style="
      position: relative !important;
      z-index: 2147483647 !important;
      color: white !important;
      text-align: center !important;
      padding: 1rem !important;
      background: rgba(255, 0, 0, 0.8) !important;
      border-radius: 0.5rem !important;
      margin: 0 !important;
      border: 2px solid white !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    ">
      <h2 style="color: white !important; margin-bottom: 1rem !important; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7) !important;">
        ⚠️ Content Loading Error
      </h2>
      <p style="color: rgba(255, 255, 255, 0.9) !important; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;">
        Failed to load content from: ${contentPath}.plain.html
      </p>
      <p style="color: rgba(255, 255, 255, 0.7) !important; font-size: 0.9rem !important; margin-top: 0 !important;">
        Error: ${error.message}
      </p>
      <button onclick="location.reload()" style="
        background: rgba(255, 255, 255, 0.2) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        color: white !important;
        padding: 0.5rem 1rem !important;
        border-radius: 0.25rem !important;
        cursor: pointer !important;
        margin-top: 1rem !important;
      ">
        🔄 Retry
      </button>
    </div>
  `;
}

// Enhanced modal content loading with guaranteed spinner replacement
async function loadModalContent(modalContent, contentPath) {
  
  
  // Set up timeout protection
  const LOADING_TIMEOUT = 8000; // 8 seconds max
  let timeoutReached = false;
  
  const timeoutId = setTimeout(() => {
    timeoutReached = true;
    
    
    modalContent.innerHTML = `
      <div style="
        position: relative !important;
        z-index: 2147483647 !important;
        color: white !important;
        text-align: center !important;
        padding: 1rem !important;
        background: rgba(255, 165, 0, 0.8) !important;
        border-radius: 0.5rem !important;
        margin: 0 !important;
        border: 2px solid white !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      ">
        <h2 style="color: white !important; margin-bottom: 1rem !important;">⏱️ Loading Timeout</h2>
        <p style="color: rgba(255, 255, 255, 0.9) !important;">
          Content is taking too long to load from: ${contentPath}.plain.html
        </p>
        <button onclick="location.reload()" style="
          background: rgba(255, 255, 255, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          color: white !important;
          padding: 0.5rem 1rem !important;
          border-radius: 0.25rem !important;
          cursor: pointer !important;
          margin-top: 1rem !important;
        ">
          🔄 Retry
        </button>
      </div>
    `;
  }, LOADING_TIMEOUT);
  
  try {
    // Ensure spinner exists
    const spinner = modalContent.querySelector('.shoelace-card-modal-loading');
    if (!spinner) {
      
    }
    
    // Fetch content with enhanced error handling
    const htmlContent = await fetchPlainHtml(contentPath);
    
    // Clear timeout if content loads successfully
    clearTimeout(timeoutId);
    
    if (timeoutReached) {
      
      return;
    }
    
    if (htmlContent) {
      // Create content container
      const contentDiv = document.createElement('div');
      contentDiv.className = 'shoelace-card-modal-text';
      
      // Enhanced Content Container Positioning and Visibility - Optimized Spacing
      contentDiv.style.cssText = `
        position: relative !important;
        z-index: 1002 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        font-size: 1.1rem !important;
        line-height: 1.6 !important;
        background: rgba(0, 0, 0, 0.85) !important;
        padding: 0.5rem 1rem 1rem 1rem !important;
        border-radius: 0.5rem !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        color: white !important;
        box-shadow: 
          0 4px 20px rgba(0, 0, 0, 0.5),
          inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        margin: 0 !important;
        max-height: 70vh !important;
        overflow-y: auto !important;
        backdrop-filter: blur(5px) !important;
        -webkit-backdrop-filter: blur(5px) !important;
      `;
      
      contentDiv.innerHTML = htmlContent;
      
      // Enhanced Text Element Styling for Visibility
      const allElements = contentDiv.querySelectorAll('*');
      
      allElements.forEach((el) => {
        // Force visibility for all elements
        el.style.cssText += `
          color: white !important;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8) !important;
          background-color: transparent !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          z-index: inherit !important;
        `;
        
        // Special handling for different element types
        if (el.tagName.match(/^H[1-6]$/)) {
          el.style.cssText += `
            font-weight: bold !important;
            margin-bottom: 1rem !important;
            font-size: ${2.5 - (parseInt(el.tagName[1]) * 0.2)}rem !important;
          `;
        }
        
        if (el.tagName === 'P') {
          el.style.cssText += `
            margin-bottom: 1rem !important;
            line-height: 1.6 !important;
          `;
        }
        
        if (el.tagName === 'IMG') {
          el.style.cssText += `
            max-width: 100% !important;
            height: auto !important;
            border-radius: 0.5rem !important;
            margin-bottom: 1rem !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
          `;
        }
      });
      
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
      headerCloseButton.setAttribute('type', 'button');
      headerCloseButton.setAttribute('tabindex', '0');
      headerCloseButton.style.cssText = `
        background: rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        border-radius: 0.5rem !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        color: white !important;
        font-size: 0.875rem !important;
        font-weight: 600 !important;
        font-family: monospace !important;
        z-index: 2147483647 !important;
        width: 3rem !important;
        height: 2rem !important;
        cursor: pointer !important;
        transition: all 0.2s ease !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin-left: 1rem !important;
      `;
      
      // Add hover effect
      headerCloseButton.addEventListener('mouseenter', () => {
        headerCloseButton.style.background = 'rgba(255, 255, 255, 0.3) !important';
        headerCloseButton.style.transform = 'scale(1.05)';
      });
      
      headerCloseButton.addEventListener('mouseleave', () => {
        headerCloseButton.style.background = 'rgba(255, 255, 255, 0.2) !important';
        headerCloseButton.style.transform = 'scale(1)';
      });
      
      // Assemble header
      titleHeader.appendChild(title);
      titleHeader.appendChild(headerCloseButton);
      
      // GUARANTEED SPINNER REPLACEMENT - Clear all content and add new structure
      modalContent.innerHTML = '';
      modalContent.appendChild(titleHeader);
      modalContent.appendChild(contentDiv);
      
      
    } else {
      throw new Error('Empty content received');
    }
    
  } catch (error) {
    // Clear timeout on error
    clearTimeout(timeoutId);
    
    if (timeoutReached) {
      
      return;
    }
    
    
    
    // GUARANTEED SPINNER REPLACEMENT - Always replace spinner with error message
    modalContent.innerHTML = createErrorContent(contentPath, error);
  }
}

// Enhanced modal creation with proper timing and guaranteed spinner replacement
async function openImmersiveModal(contentPath, backgroundImage) {
  
  
  // Ensure styles are injected before creating modal
  injectStyles();
  
  // Create modal structure
  const modal = document.createElement('div');
  modal.className = 'shoelace-card-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  
  // Critical inline styles for visibility
  modal.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 1000 !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: rgba(0, 0, 0, 0.8) !important;
    animation: modalFadeIn 0.3s ease-out !important;
  `;
  
  // Set background image with fallback
  if (backgroundImage) {
    modal.style.backgroundImage = `url(${backgroundImage})`;
  }
  
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'shoelace-card-modal-overlay';
  modalOverlay.style.cssText = `
    position: relative !important;
    width: 90% !important;
    max-width: 800px !important;
    max-height: 90vh !important;
    background: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
    border-radius: 1rem !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    padding: 1rem !important;
    overflow-y: auto !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
    animation: modalSlideIn 0.3s ease-out !important;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.className = 'shoelace-card-modal-content';
  modalContent.style.cssText = `
    color: white !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
    position: relative !important;
    z-index: 2147483647 !important;
    display: block !important;
    overflow: visible !important;
  `;
  
  // Create enhanced close button
  const closeButton = createEnhancedCloseButton();
  
  // Create loading state
  const loadingSpinner = document.createElement('sl-spinner');
  loadingSpinner.className = 'shoelace-card-modal-loading';
  modalContent.appendChild(loadingSpinner);
  
  // Assemble modal
  if (closeButton) {
    modalOverlay.appendChild(closeButton);
  }
  modalOverlay.appendChild(modalContent);
  modal.appendChild(modalOverlay);
  
  // Add to DOM first
  document.body.appendChild(modal);
  
  
  // Wait for DOM to be ready
  await waitForDOMReady(modal);
  
  // Validate structure
  const validation = validateModalStructure(modal);
  if (!validation.closeButton) {
    
  }
  
  // Attach event listeners with robust strategy
  attachModalCloseListenersRobust(modal);
  
  // Setup additional handlers
  setupKeyboardHandling(modal);
  setupEmergencyClose(modal);
  
  // Focus management - wait for DOM to be ready
  setTimeout(() => {
    try {
      const currentCloseButton = modal.querySelector('.shoelace-card-modal-close');
      if (currentCloseButton) {
        currentCloseButton.focus();
        
      }
    } catch (error) {
      debugLog('Focus error (non-critical):', error);
    }
  }, 150);

  // Load content with guaranteed spinner replacement
  await loadModalContent(modalContent, contentPath);
  
  
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
    
    
    
    
    
    // [DEBUG-COMPONENT] Shoelace Component Status
    console.group('[DEBUG-COMPONENT] Shoelace Component Status');
    console.log('[DEBUG-COMPONENT] Custom elements defined:', {
      'sl-card': !!customElements.get('sl-card'),
      'sl-button': !!customElements.get('sl-button'),
      'sl-icon': !!customElements.get('sl-icon')
    });
    const slCards = container.querySelectorAll('sl-card');
    console.log('[DEBUG-COMPONENT] sl-card elements found:', slCards.length);
    slCards.forEach((card, index) => {
      console.log(`[DEBUG-COMPONENT] sl-card ${index}:`, {
        tagName: card.tagName,
        shadowRoot: !!card.shadowRoot,
        innerHTML: card.innerHTML.substring(0, 100) + '...',
        computedDisplay: window.getComputedStyle(card).display,
        computedVisibility: window.getComputedStyle(card).visibility,
        offsetWidth: card.offsetWidth,
        offsetHeight: card.offsetHeight
      });
    });
    console.groupEnd();
    
    // Trigger fade-in animation
    requestAnimationFrame(() => {
      // Log initial state before adding loaded class
      const initialOpacity = window.getComputedStyle(container).opacity;
      
      
      container.classList.add('loaded');
      
      
      // Check immediately after adding class
      const immediateOpacity = window.getComputedStyle(container).opacity;
      
      
      // DIRECT FIX: Force visibility with !important override
      setTimeout(() => {
        const finalOpacity = window.getComputedStyle(container).opacity;
        
        
        if (finalOpacity !== '1') {
          
          
          // Create CSS rule with maximum specificity to override failed transition
          const forceVisibleCSS = `
            .shoelace-card-container.loaded {
              opacity: 1 !important;
              transform: translateY(0) !important;
              transition: none !important;
            }
            .shoelace-card-container.loaded .shoelace-card-item {
              opacity: 1 !important;
              transform: translateY(0) !important;
            }
          `;
          
          const style = document.createElement('style');
          style.id = 'shoelace-card-visibility-fix';
          style.textContent = forceVisibleCSS;
          document.head.appendChild(style);
          
          
        }
      }, 500);
    });
    
    attachCardEventListeners(block);
    
  } catch (error) {
    console.error('[shoelace-card] Image preloading failed:', error);
    // Fallback to progressive loading
    generateCardsProgressive(block, cardData);
  }
}

// Show fallback content when enhancement fails
function showFallbackContent(block) {
  block.innerHTML = `
    <div class="shoelace-card-fallback">
      <p>Cards are loading...</p>
    </div>
  `;
}

// Wait for Shoelace components to be ready
async function waitForShoelaceComponents() {
  const components = ['sl-card', 'sl-button', 'sl-badge', 'sl-icon-button', 'sl-spinner'];
  
  for (const component of components) {
    while (!customElements.get(component)) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
}

// Main decoration function (EDS standard)
export default async function decorate(block) {
  try {
    // Inject styles first
    injectStyles();
    
    // Wait for Shoelace components to be ready
    await waitForShoelaceComponents();
    
    // Get query path and fetch data
    const queryPath = getQueryPath(block);
    const cardData = await fetchCardData(queryPath);
    
    // Preserve EDS attributes before clearing innerHTML
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
      
      document.body.classList.add('appear');
    }
    
    // Ensure section visibility for component rendering
    const section = block.closest('.section');
    if (section && section.style.display === 'none') {
      
      section.style.display = null;
      section.dataset.sectionStatus = 'loaded';
    }
    
    // Generate cards with preloading
    await generateCards(block, cardData);
  } catch (error) {
    
    showFallbackContent(block);
  }
}
