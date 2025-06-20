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

// Auto-inject styles when component loads
function injectStyles() {
  if (!document.querySelector('#shoelace-card-styles')) {
    const style = document.createElement('style');
    style.id = 'shoelace-card-styles';
    style.textContent = shoelaceStyles + '\n' + componentStyles;
    document.head.appendChild(style);
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

// Fetch plain HTML content for modal display
async function fetchPlainHtml(path) {
  try {
    const url = `${path}.plain.html`;
    
    const response = await fetch(url, {
      mode: 'cors',
      headers: { 'Accept': 'text/html' }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch plain HTML: ${response.status}`);
    }
    
    let html = await response.text();
    
    // Fix relative image paths
    html = html.replace(/src="\.\/media\//g, 'src="/media/');
    html = html.replace(/src="media\//g, 'src="/media/');
    html = html.replace(/src="\.\.\/media\//g, 'src="/media/');
    
    return html;
  } catch (error) {
    console.error('[shoelace-card] Plain HTML fetch error:', error);
    return null;
  }
}

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

// Close modal
function closeModal(modal) {
  modal.remove();
}

// Attach modal close listeners
function attachModalCloseListeners(modal) {
  const closeButton = modal.querySelector('.shoelace-card-modal-close');
  
  // Close button click
  if (closeButton) {
    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      closeModal(modal);
    });
  }
  
  // Click outside content
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
}

// Open immersive modal with content
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
    padding: 2rem !important;
    overflow-y: auto !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
    animation: modalSlideIn 0.3s ease-out !important;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.className = 'shoelace-card-modal-content';
  modalContent.style.cssText = `
    color: white !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
    min-height: 200px !important;
  `;
  
  // Create close button with fallback text
  const closeButton = document.createElement('button');
  closeButton.className = 'shoelace-card-modal-close';
  closeButton.innerHTML = '×';
  closeButton.setAttribute('aria-label', 'Close modal');
  closeButton.setAttribute('type', 'button');
  
  // Critical inline styles for close button
  closeButton.style.cssText = `
    position: absolute !important;
    top: 1rem !important;
    right: 1rem !important;
    background: rgba(255, 255, 255, 0.2) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    border-radius: 50% !important;
    border: 1px solid rgba(255, 255, 255, 0.3) !important;
    color: white !important;
    font-size: 2rem !important;
    z-index: 1003 !important;
    width: 3rem !important;
    height: 3rem !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    line-height: 1 !important;
  `;
  
  // Create loading state
  const loadingSpinner = document.createElement('sl-spinner');
  loadingSpinner.className = 'shoelace-card-modal-loading';
  modalContent.appendChild(loadingSpinner);
  
  // Assemble modal
  modalOverlay.appendChild(closeButton);
  modalOverlay.appendChild(modalContent);
  modal.appendChild(modalOverlay);
  
  // Add to DOM
  document.body.appendChild(modal);
  
  // Focus management - wait for DOM to be ready
  setTimeout(() => {
    try {
      closeButton.focus();
    } catch (error) {
      // Focus error is non-critical, ignore silently
    }
  }, 100);
  
  // Enhanced Modal Content Container
  modalContent.style.cssText = `
    color: white !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5) !important;
    min-height: 200px !important;
    position: relative !important;
    z-index: 1003 !important;
    display: block !important;
    overflow: visible !important;
  `;

  // Fetch and display content with enhanced visibility fixes
  try {
    const htmlContent = await fetchPlainHtml(contentPath);
    
    if (htmlContent) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'shoelace-card-modal-text';
      
      // Enhanced Content Container Positioning and Visibility
      contentDiv.style.cssText = `
        position: relative !important;
        z-index: 1002 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        font-size: 1.1rem !important;
        line-height: 1.6 !important;
        background: rgba(0, 0, 0, 0.85) !important;
        padding: 2rem !important;
        border-radius: 0.5rem !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        color: white !important;
        box-shadow: 
          0 4px 20px rgba(0, 0, 0, 0.5),
          inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        margin-top: 0 !important;
        max-height: 60vh !important;
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
      
      modalContent.appendChild(contentDiv);
    } else {
      throw new Error('Content not found');
    }
  } catch (error) {
    // Enhanced Error Handling with Visible Fallback
    console.error('[shoelace-card] Modal content error:', error);
    
    modalContent.innerHTML = `
      <div style="
        position: relative !important;
        z-index: 1003 !important;
        color: white !important;
        text-align: center !important;
        padding: 2rem !important;
        background: rgba(255, 0, 0, 0.8) !important;
        border-radius: 0.5rem !important;
        margin-top: 0 !important;
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
      </div>
    `;
  }
  
  // Attach modal close listeners
  attachModalCloseListeners(modal);
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
    
    // Clear block and add container class
    block.innerHTML = '';
    block.classList.add('shoelace-card-block');
    
    // Generate cards with preloading
    await generateCards(block, cardData);
  } catch (error) {
    console.warn('[shoelace-card] Enhancement failed, showing fallback:', error);
    showFallbackContent(block);
  }
}
