// Import EDS utilities
import { loadCSS, loadScript } from '../../scripts/aem.js';

// Configuration
const SHOELACE_CARD_CONFIG = {
  QUERY_INDEX_PATH: '/slides/query-index.json',
  CARD_MAX_WIDTH: '400px',
  MODAL_ANIMATION_DURATION: '300ms',
  BADGE_COLOR: 'primary',
  DEFAULT_TITLE: 'Card Title',
  DEFAULT_DESCRIPTION: 'Card description',
  DEFAULT_BUTTON_TEXT: 'Learn More'
};

// Load Shoelace resources progressively
async function loadShoelaceResources() {
  try {
    await loadCSS('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/themes/light.css');
    await loadScript('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/shoelace-autoloader.js', {
      type: 'module'
    });
    
    // Wait a moment for components to register
    await new Promise(resolve => setTimeout(resolve, 100));
    
    console.debug('[shoelace-card] Shoelace resources loaded successfully');
  } catch (error) {
    console.error('[shoelace-card] Failed to load Shoelace resources:', error);
    throw error;
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
    console.debug('[shoelace-card] Fetching data from:', queryPath);
    
    const response = await fetch(queryPath, {
      mode: 'cors',
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch card data: ${response.status}`);
    }
    
    const json = await response.json();
    console.debug('[shoelace-card] Fetched data:', json);
    
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
    console.debug('[shoelace-card] Fetching plain HTML from:', url);
    
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

// Create numbered badge element
function createNumberedBadge(slideNumber) {
  const badge = document.createElement('sl-badge');
  badge.className = 'shoelace-card-badge';
  badge.setAttribute('variant', SHOELACE_CARD_CONFIG.BADGE_COLOR);
  badge.setAttribute('pill', '');
  badge.textContent = slideNumber;
  return badge;
}

// Create card image element
function createCardImage(imageSrc, title) {
  if (!imageSrc) return null;
  
  const img = document.createElement('img');
  img.slot = 'image';
  img.src = imageSrc;
  img.alt = title || 'Card image';
  img.loading = 'lazy';
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
    closeButton.addEventListener('click', () => closeModal(modal));
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
  // Create modal structure
  const modal = document.createElement('div');
  modal.className = 'shoelace-card-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  
  // Set background image
  if (backgroundImage) {
    modal.style.backgroundImage = `url(${backgroundImage})`;
  }
  
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'shoelace-card-modal-overlay';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'shoelace-card-modal-content';
  
  // Create close button
  const closeButton = document.createElement('sl-icon-button');
  closeButton.className = 'shoelace-card-modal-close';
  closeButton.setAttribute('name', 'x-lg');
  closeButton.setAttribute('label', 'Close modal');
  
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
  
  // Focus management
  closeButton.focus();
  
  // Fetch and display content
  try {
    const htmlContent = await fetchPlainHtml(contentPath);
    if (htmlContent) {
      modalContent.innerHTML = '';
      const contentDiv = document.createElement('div');
      contentDiv.className = 'shoelace-card-modal-text';
      contentDiv.innerHTML = htmlContent;
      modalContent.appendChild(contentDiv);
    } else {
      throw new Error('Content not found');
    }
  } catch (error) {
    modalContent.innerHTML = '<p>Content could not be loaded.</p>';
    console.error('[shoelace-card] Modal content error:', error);
  }
  
  // Attach modal close listeners
  attachModalCloseListeners(modal);
}

// Generate cards from data
async function generateCards(block, cardData) {
  if (!cardData || cardData.length === 0) {
    block.innerHTML = '<p class="shoelace-card-empty">No cards available.</p>';
    return;
  }
  
  const container = createCardContainer();
  
  cardData.forEach((data, index) => {
    const card = createShoelaceCard(data, index + 1);
    container.appendChild(card);
  });
  
  block.appendChild(container);
  attachCardEventListeners(block);
}

// Show fallback content when enhancement fails
function showFallbackContent(block) {
  block.innerHTML = `
    <div class="shoelace-card-fallback">
      <p>Cards are loading...</p>
    </div>
  `;
}

// Main decoration function (EDS standard)
export default async function decorate(block) {
  try {
    console.debug('[shoelace-card] Starting decoration');
    
    // Load Shoelace resources progressively
    await loadShoelaceResources();
    
    // Get query path and fetch data
    const queryPath = getQueryPath(block);
    const cardData = await fetchCardData(queryPath);
    
    // Clear block and add container class
    block.innerHTML = '';
    block.classList.add('shoelace-card-block');
    
    // Generate cards
    await generateCards(block, cardData);
    
    console.debug('[shoelace-card] Decoration completed successfully');
    
  } catch (error) {
    console.warn('[shoelace-card] Enhancement failed, showing fallback:', error);
    showFallbackContent(block);
  }
}
