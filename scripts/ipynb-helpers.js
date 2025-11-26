/**
 * IPYNB Helper Functions for Browser Testing
 *
 * Simple helper functions for testing EDS blocks in Jupyter notebooks.
 * Just import and use - no initialization needed!
 *
 * Usage in any cell:
 * ```javascript
 * const { testBlock, showPreview, getRepoUrl } = await import('/scripts/ipynb-helpers.js');
 * const block = await testBlock('accordion', '<div>content</div>');
 * await showPreview('accordion', '<div>content</div>');
 * const repo = getRepoUrl(); // Get repo URL from notebook metadata
 * return block.outerHTML;
 * ```
 *
 * **NOTE**: Cell code executes in async context automatically (via AsyncFunction).
 * Just write your code naturally with `await` and `return` - no IIFE wrapper needed!
 */

/**
 * Get repository URL from notebook metadata
 * Looks for 'repo' attribute in the ipynb-viewer block's data-* attributes
 * @returns {string|null} Repository URL or null if not found
 */
export function getRepoUrl() {
  // Find the ipynb-viewer block
  const ipynbBlock = document.querySelector('.ipynb-viewer.block');
  if (!ipynbBlock) {
    return null;
  }

  // Check for data-repo attribute
  const repo = ipynbBlock.getAttribute('data-repo');
  return repo || null;
}

/**
 * Test a block's decoration in browser
 * @param {string} blockName - Name of the block to test
 * @param {string} [innerHTML=''] - HTML content to place inside the block
 * @returns {Promise<HTMLElement>} The decorated block element
 */
export async function testBlock(blockName, innerHTML = '') {
  // Create block element
  const block = document.createElement('div');
  block.className = `${blockName} block`;
  block.innerHTML = innerHTML;

  try {
    // Import and run the block's decoration function
    const module = await import(`/blocks/${blockName}/${blockName}.js`);
    if (module.default) {
      await module.default(block);
    } else {
      throw new Error(`Block module ${blockName} does not export a default function`);
    }

    return block;
  } catch (error) {
    console.error(`Error testing block ${blockName}:`, error);
    throw error;
  }
}

/**
 * Create and show overlay preview with styled block
 *
 * IMPORTANT: This function detects notebook mode and adjusts behavior accordingly:
 * - In notebook mode (ipynb-viewer paged overlay): uses z-index 99999, shows only close button
 * - In normal mode: uses z-index 10000, shows mobile/tablet/desktop view buttons
 *
 * Fixed 2025-11-21: Enhanced to work properly in notebook mode paged overlays
 * See: docs/for-ai/fixes/showpreview-notebook-mode-fix.md
 *
 * @param {string} blockName - Name of the block (must exist in /blocks/)
 * @param {string} [innerHTML=''] - HTML content to place inside the block
 * @returns {Promise<string>} Success message
 * @throws {Error} If block module doesn't exist or fails to decorate
 */
export async function showPreview(blockName, innerHTML = '') {
  // Remove existing overlay if present
  document.querySelector('.ipynb-preview-overlay')?.remove();

  // Wait for DOM to be ready before checking for paged overlay
  // This fixes timing issues where the paged overlay hasn't fully rendered yet
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  // Check if we're in notebook mode
  const pagedOverlay = document.querySelector('.ipynb-paged-overlay[data-notebook-mode="true"]');
  const isNotebookMode = pagedOverlay !== null;

  // Helper function to load CSS if not already loaded
  const loadCSS = (href) => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  };

  // Load base EDS styles if not already loaded
  loadCSS('/styles/styles.css');

  // Load block-specific CSS if not already loaded
  loadCSS(`/blocks/${blockName}/${blockName}.css`);

  // Create overlay container
  const overlay = document.createElement('div');
  overlay.className = 'ipynb-preview-overlay';

  // Set data attribute to indicate notebook mode for z-index adjustment
  if (isNotebookMode) {
    overlay.setAttribute('data-notebook-context', 'true');
  }

  // Build controls HTML - in notebook mode, only show close button
  const controlsHTML = isNotebookMode
    ? '<button class="ipynb-preview-btn ipynb-close-btn">✕</button>'
    : `<button class="ipynb-preview-btn ipynb-view-btn" data-view="mobile"><span class="btn-text-full">📱 Mobile</span><span class="btn-text-short">📱 M</span></button>
          <button class="ipynb-preview-btn ipynb-view-btn" data-view="tablet"><span class="btn-text-full">📱 Tablet</span><span class="btn-text-short">📱 T</span></button>
          <button class="ipynb-preview-btn ipynb-view-btn active" data-view="desktop"><span class="btn-text-full">🖥️ Desktop</span><span class="btn-text-short">🖥️ D</span></button>
          <div class="ipynb-preview-divider"></div>
          <button class="ipynb-preview-btn ipynb-close-btn">✕</button>`;

  overlay.innerHTML = `
    <style>
      .ipynb-preview-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:${isNotebookMode ? '99999' : '10000'};display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
      .ipynb-preview-container{background:#fff;border-radius:8px;width:95%;height:75vh;display:flex;flex-direction:column;box-shadow:0 8px 32px rgba(0,0,0,0.4);transition:width .3s ease,height .3s ease}
      .ipynb-preview-container.mobile{width:375px;height:667px}
      .ipynb-preview-container.tablet{width:768px;height:1024px}
      .ipynb-preview-container.desktop{width:95%;height:75vh}
      .ipynb-preview-header{background:#1e1e1e;color:#fff;padding:12px 20px;border-radius:8px 8px 0 0;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
      .ipynb-preview-title{font-size:14px;font-weight:500;margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
      .ipynb-preview-left-controls{display:flex;gap:8px;align-items:center}
      .ipynb-preview-controls{display:flex;gap:8px;align-items:center}
      .ipynb-preview-btn{background:#2d2d2d;border:1px solid #3e3e3e;color:#fff;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;transition:all .2s;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
      .ipynb-preview-btn:hover{background:#3e3e3e}
      .ipynb-preview-btn.active{background:#0066cc;border-color:#0066cc}
      .ipynb-preview-btn .btn-text-full{display:inline}
      .ipynb-preview-btn .btn-text-short{display:none}
      .ipynb-preview-divider{width:1px;height:20px;background:#3e3e3e;margin:0 4px}
      .ipynb-preview-content{overflow:auto;padding:20px;flex:1;min-height:0}
      .ipynb-preview-container.mobile .ipynb-preview-btn .btn-text-full{display:none}
      .ipynb-preview-container.mobile .ipynb-preview-btn .btn-text-short{display:inline}
      .ipynb-preview-container.mobile .ipynb-preview-header{padding:8px 12px}
      .ipynb-preview-container.mobile .ipynb-preview-btn{padding:4px 8px;font-size:11px}
      .ipynb-preview-container.mobile .ipynb-preview-title{font-size:12px}
    </style>
    <div class="ipynb-preview-container desktop">
      <div class="ipynb-preview-header">
        <div class="ipynb-preview-left-controls">
          <button class="ipynb-preview-btn ipynb-home-btn" title="Go to cell 0">🏠</button>
        </div>
        <div class="ipynb-preview-title">${blockName} Block Preview</div>
        <div class="ipynb-preview-controls">
          ${controlsHTML}
        </div>
      </div>
      <div class="ipynb-preview-content">
        <div class="${blockName} block">${innerHTML}</div>
      </div>
    </div>
  `;

  // Add to page
  document.body.appendChild(overlay);

  // Get references
  const container = overlay.querySelector('.ipynb-preview-container');
  const viewBtns = overlay.querySelectorAll('.ipynb-view-btn');
  const closeBtn = overlay.querySelector('.ipynb-close-btn');
  const homeBtn = overlay.querySelector('.ipynb-home-btn');

  // Handle view switching (only if not in notebook mode)
  if (!isNotebookMode) {
    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const view = btn.dataset.view;

        // Update active state
        viewBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update container class
        container.className = `ipynb-preview-container ${view}`;

        console.log(`✓ Switched to ${view} view`);
      });
    });
  }

  // Handle close button
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cleanupAndClose();
  });

  // Handle home button - navigate to cell 0 if in notebook mode
  if (homeBtn && isNotebookMode) {
    homeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // Find the paged overlay which contains the navigateToAnchor function
      const pagedOverlay = document.querySelector('.ipynb-paged-overlay');
      if (pagedOverlay) {
        // Look for links in the paged overlay's content area that point to cell-0
        const cellContentArea = pagedOverlay.querySelector('.ipynb-paged-cell-content-area');
        if (cellContentArea) {
          const homeLinks = cellContentArea.querySelectorAll('a[href="#cell-0"]');
          if (homeLinks.length > 0) {
            // Trigger click on the first home link found
            homeLinks[0].click();
          }
        }
      }
    });
  }

  // ESC key handler attached to document for global capture
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      // Always close the preview overlay first when ESC is pressed
      // This fixes the hierarchy issue where preview overlay couldn't close
      // when opened from within a paged overlay
      cleanupAndClose();
    }
  };

  // Click backdrop to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      cleanupAndClose();
    }
  });

  // Cleanup function to remove overlay and event listener
  function cleanupAndClose() {
    document.removeEventListener('keydown', handleEscape);
    overlay.remove();
  }

  // Attach ESC handler to document
  document.addEventListener('keydown', handleEscape);

  // Decorate the block
  const block = overlay.querySelector(`.${blockName}.block`);
  try {
    const module = await import(`/blocks/${blockName}/${blockName}.js`);
    if (module.default) {
      await module.default(block);
      console.log('✓ Block decorated');
    } else {
      throw new Error(`Block module ${blockName} does not export a default function`);
    }
  } catch (error) {
    console.error(`❌ Block decoration error for ${blockName}:`, error);
    // Show user-friendly error message in the preview
    const contentArea = overlay.querySelector('.ipynb-preview-content');
    if (contentArea) {
      contentArea.innerHTML = `
        <div style="padding: 20px; color: #d32f2f; background: #ffebee; border-radius: 4px; border-left: 4px solid #d32f2f;">
          <h3 style="margin-top: 0;">❌ Failed to load block: ${blockName}</h3>
          <p><strong>Error:</strong> ${error.message}</p>
          <p style="margin-bottom: 0;"><em>Check the console for more details.</em></p>
        </div>
      `;
    }
    throw error; // Re-throw so caller knows there was an error
  }

  return `✓ Preview overlay opened for ${blockName}`;
}
