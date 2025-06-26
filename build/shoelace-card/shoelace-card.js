// Import Shoelace components for bundling
import "@shoelace-style/shoelace/dist/components/card/card.js";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/badge/badge.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";

// Import styles for bundling
import shoelaceStyles from "@shoelace-style/shoelace/dist/themes/light.css?inline";
import componentStyles from "./shoelace-card.css?inline";

// Configuration
const SHOELACE_CARD_CONFIG = {
  QUERY_INDEX_PATH: "/slides/query-index.json",
  BADGE_COLOR: "primary",
  DEFAULT_BUTTON_TEXT: "Learn More",
};



// Auto-inject styles when component loads
function injectStyles() {
  if (!document.querySelector("#shoelace-card-styles")) {
    const style = document.createElement("style");
    style.id = "shoelace-card-styles";
    style.textContent = shoelaceStyles + "\n" + componentStyles;
    document.head.appendChild(style);
  }
}

// Extract content using EDS pattern (like columns block)
function extractQueryPath(block) {
  // Strategy 1: Check nested EDS structure (most reliable)
  const nestedDiv = block.querySelector("div div");
  if (nestedDiv?.textContent?.trim()) {
    const path = nestedDiv.textContent.trim();
    if (isValidPath(path)) {
      return path;
    }
  }

  // Strategy 2: Check direct text content
  const directText = block.textContent?.trim();
  if (directText && isValidPath(directText)) {
    return directText;
  }

  // Strategy 3: Check data attributes
  const dataPath = block.dataset.queryPath;
  if (dataPath && isValidPath(dataPath)) {
    return dataPath;
  }

  // Strategy 4: Use default
  return SHOELACE_CARD_CONFIG.QUERY_INDEX_PATH;
}

function isValidPath(path) {
  if (!path || path.length < 3) return false;
  return path.startsWith("/") || path.includes(".json") || path.includes("/");
}

// Enhanced fetch with timeout and retry
async function fetchCardData(queryPath, retries = 2) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(queryPath, {
        mode: "cors",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      const data = json.data || [];

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format: expected array");
      }

      return data;
    } catch (error) {
      if (attempt === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// Preload images for better UX
async function preloadAllImages(cardData, timeout = 5000) {
  const imageUrls = cardData.map((card) => card.image).filter(Boolean);

  if (imageUrls.length === 0) return [];

  const preloadPromises = imageUrls.map(
    (url) =>
      new Promise((resolve) => {
        const img = new Image();
        const timer = setTimeout(() => resolve(null), timeout);

        img.onload = () => {
          clearTimeout(timer);
          resolve(img);
        };

        img.onerror = () => {
          clearTimeout(timer);
          resolve(null);
        };

        img.src = url;
      })
  );

  const results = await Promise.all(preloadPromises);
  return results;
}

// Create Shoelace components
function createNumberedBadge(slideNumber) {
  const badge = document.createElement("sl-badge");
  badge.className = "shoelace-card-badge";
  badge.setAttribute("variant", SHOELACE_CARD_CONFIG.BADGE_COLOR);
  badge.setAttribute("pill", "");
  badge.textContent = slideNumber;
  return badge;
}

function createCardImage(imageSrc, title) {
  if (!imageSrc) return null;

  const img = document.createElement("img");
  img.slot = "image";
  img.src = imageSrc;
  img.alt = title || "Card image";
  img.loading = "lazy";
  img.onerror = () => {
    img.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+PC9zdmc+";
  };
  return img;
}

function createCardContent(data) {
  const content = document.createElement("div");
  content.className = "shoelace-card-content";

  if (data.title) {
    const title = document.createElement("strong");
    title.textContent = data.title;
    content.appendChild(title);
    content.appendChild(document.createElement("br"));
  }

  if (data.description) {
    const description = document.createTextNode(data.description);
    content.appendChild(description);
    content.appendChild(document.createElement("br"));
  }

  return content;
}

function createCardFooter(data) {
  const footer = document.createElement("div");
  footer.slot = "footer";
  footer.className = "shoelace-card-footer";

  const button = document.createElement("sl-button");
  button.setAttribute("variant", "primary");
  button.setAttribute("pill", "");
  button.textContent =
    data.buttonText || SHOELACE_CARD_CONFIG.DEFAULT_BUTTON_TEXT;
  button.dataset.cardPath = data.path;
  button.dataset.cardImage = data.image;
  button.dataset.action = "open-modal";

  footer.appendChild(button);
  return footer;
}

function createShoelaceCard(data, slideNumber) {
  const card = document.createElement("sl-card");
  card.className = "shoelace-card-item";
  card.setAttribute("data-slide", slideNumber);

  const elements = [
    createNumberedBadge(slideNumber),
    createCardImage(data.image, data.title),
    createCardContent(data),
    createCardFooter(data),
  ].filter(Boolean);

  elements.forEach((el) => card.appendChild(el));
  return card;
}

// Modal system
function handleCardClick(event) {
  const button = event.target.closest('[data-action="open-modal"]');
  
  if (button) {
    event.preventDefault();
    const cardPath = button.dataset.cardPath;
    const cardImage = button.dataset.cardImage;
    openModal(cardPath, cardImage);
  }
}

async function openModal(contentPath, cardImage) {
  try {
    const overlay = document.createElement("div");
    overlay.className = "shoelace-card-modal-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");

    const modal = document.createElement("div");
    modal.className = "shoelace-card-modal";
    if (cardImage) {
      modal.style.backgroundImage = `url(${cardImage})`;
    }

    const modalContent = document.createElement("div");
    modalContent.className = "shoelace-card-modal-content";

    modal.appendChild(modalContent);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    await loadModalContent(modalContent, contentPath);
    setupModalCloseHandlers(overlay);
  } catch (error) {
    console.error("[shoelace-card] Modal creation failed:", error);
  }
}

async function loadModalContent(modalContent, contentPath) {
  try {
    const plainPath = `${contentPath}.plain.html`;
    const response = await fetch(plainPath, {
      mode: "cors",
      headers: { Accept: "text/html" },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    let htmlContent = await response.text();

    // Fix relative media paths
    htmlContent = htmlContent.replace(/src="\.\/media\//g, 'src="/media/');
    htmlContent = htmlContent.replace(/src="media\//g, 'src="/media/');
    htmlContent = htmlContent.replace(/src="\.\.\/media\//g, 'src="/media/');

    const contentDiv = document.createElement("div");
    contentDiv.className = "shoelace-card-modal-text";
    contentDiv.innerHTML = htmlContent;

    // Extract title and create header
    const titleElement = contentDiv.querySelector("h1");
    const titleText = titleElement ? titleElement.textContent : "Details";

    if (titleElement) {
      titleElement.remove();
    }

    const header = document.createElement("div");
    header.className = "shoelace-card-modal-header";
    header.innerHTML = `
      <h1>${titleText}</h1>
      <button class="shoelace-card-modal-close" aria-label="Close">ESC</button>
    `;

    modalContent.appendChild(header);
    modalContent.appendChild(contentDiv);
  } catch (error) {
    modalContent.innerHTML = `
      <div class="shoelace-card-modal-header">
        <h1>Error</h1>
        <button class="shoelace-card-modal-close" aria-label="Close">ESC</button>
      </div>
      <div class="shoelace-card-modal-text">
        <p>Content could not be loaded. Please try again later.</p>
      </div>
    `;
  }
}

function setupModalCloseHandlers(overlay) {
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal(overlay);
    }
  };

  const handleClickOutside = (event) => {
    if (event.target === overlay) {
      closeModal(overlay);
    }
  };

  const handleCloseButton = (event) => {
    if (event.target.closest(".shoelace-card-modal-close")) {
      closeModal(overlay);
    }
  };

  document.addEventListener("keydown", handleKeyDown);
  overlay.addEventListener("click", handleClickOutside);
  overlay.addEventListener("click", handleCloseButton);

  overlay._cleanup = () => {
    document.removeEventListener("keydown", handleKeyDown);
    overlay.removeEventListener("click", handleClickOutside);
    overlay.removeEventListener("click", handleCloseButton);
  };
}

function closeModal(overlay) {
  if (overlay._cleanup) {
    overlay._cleanup();
  }

  overlay.style.opacity = "0";
  setTimeout(() => {
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }, 300);
}

// Wait for Shoelace components
async function waitForShoelaceComponents() {
  const components = [
    "sl-card",
    "sl-button",
    "sl-badge",
    "sl-icon-button",
    "sl-spinner",
  ];

  for (const component of components) {
    let attempts = 0;
    while (!customElements.get(component) && attempts < 50) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      attempts++;
    }

    if (!customElements.get(component)) {
      throw new Error(`Component ${component} failed to load`);
    }
  }
}

// Build complete card structure in memory BEFORE touching DOM
async function buildCardStructure(cardData) {
  const container = document.createElement("div");
  container.className = "shoelace-card-container";

  const fragment = document.createDocumentFragment();

  cardData.forEach((data, index) => {
    const card = createShoelaceCard(data, index + 1);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
  return container;
}

// Main decoration function - EDS-safe approach
export default async function decorate(block) {
  try {
    // Step 1: Extract content BEFORE any DOM changes (like columns block)
    const queryPath = extractQueryPath(block);

    // Step 2: Inject styles
    injectStyles();

    // Step 3: Wait for components
    await waitForShoelaceComponents();

    // Step 4: Fetch data
    const cardData = await fetchCardData(queryPath);

    if (!cardData || cardData.length === 0) {
      // Add empty state without destroying original content
      const emptyState = document.createElement("div");
      emptyState.className = "shoelace-card-empty";
      emptyState.innerHTML = "<p>No cards available.</p>";
      block.appendChild(emptyState);
      return;
    }

    // Step 5: Show loading state
    block.classList.add("loading");

    // Step 6: Preload images for better UX
    await preloadAllImages(cardData);

    // Step 7: Build complete structure in memory
    const cardContainer = await buildCardStructure(cardData);

    // Step 8: Preserve EDS attributes BEFORE replacement
    const blockStatus = block.getAttribute("data-block-status");
    const blockName = block.getAttribute("data-block-name");
    const blockClasses = Array.from(block.classList);

    // Step 9: ATOMIC replacement - only after everything is ready
    block.innerHTML = "";
    block.appendChild(cardContainer);

    // Step 10: Restore EDS attributes and classes
    if (blockStatus) block.setAttribute("data-block-status", blockStatus);
    if (blockName) block.setAttribute("data-block-name", blockName);

    // Ensure critical classes are maintained
    block.classList.add("shoelace-card-block");
    blockClasses.forEach((cls) => {
      if (cls.includes("block") || cls.includes("shoelace-card")) {
        block.classList.add(cls);
      }
    });

    // Step 11: Remove loading state and add interactivity
    block.classList.remove("loading");
    block.addEventListener("click", handleCardClick);

    // Step 12: Trigger animations
    requestAnimationFrame(() => {
      cardContainer.classList.add("loaded");
    });

    // Step 13: Ensure EDS visibility
    if (!document.body.classList.contains("appear")) {
      document.body.classList.add("appear");
    }

    const section = block.closest(".section");
    if (section && section.style.display === "none") {
      section.style.display = null;
      section.dataset.sectionStatus = "loaded";
    }
  } catch (error) {
    console.error("[shoelace-card] Enhancement failed:", error);

    // Simple fallback - don't destroy existing content
    const fallback = document.createElement("div");
    fallback.className = "shoelace-card-fallback";
    fallback.innerHTML = `
      <p>Cards are temporarily unavailable.</p>
      <button onclick="location.reload()">Retry</button>
    `;

    // Only add fallback if block is empty, otherwise leave original content
    if (!block.textContent.trim()) {
      block.appendChild(fallback);
    }
  }
}
