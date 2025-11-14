/**
 * IPYNB Helper Functions for Browser Testing
 *
 * Simple helper functions for testing EDS blocks in Jupyter notebooks.
 * Just import and use - no initialization needed!
 *
 * Usage in any cell:
 * ```javascript
 * const { testBlock, showPreview } = await import('/scripts/ipynb-helpers.js');
 * const block = await testBlock('accordion', '<div>content</div>');
 * await showPreview('accordion', '<div>content</div>');
 * return block.outerHTML;
 * ```
 *
 * **NOTE**: Cell code executes in async context automatically (via AsyncFunction).
 * Just write your code naturally with `await` and `return` - no IIFE wrapper needed!
 */

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
 * @param {string} blockName - Name of the block
 * @param {string} [innerHTML=''] - HTML content to place inside the block
 * @returns {Promise<string>} Success message
 */
export async function showPreview(blockName, innerHTML = '') {
  // Remove existing overlay if present
  document.querySelector('.ipynb-preview-overlay')?.remove();

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
  overlay.innerHTML = `
    <style>
      .ipynb-preview-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:10000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
      .ipynb-preview-container{background:#fff;border-radius:8px;width:95%;height:95vh;display:flex;flex-direction:column;box-shadow:0 8px 32px rgba(0,0,0,0.4);transition:width .3s ease,height .3s ease}
      .ipynb-preview-container.mobile{width:375px;height:667px}
      .ipynb-preview-container.tablet{width:768px;height:1024px}
      .ipynb-preview-container.desktop{width:95%;height:95vh}
      .ipynb-preview-header{background:#1e1e1e;color:#fff;padding:12px 20px;border-radius:8px 8px 0 0;display:flex;justify-content:space-between;align-items:center;flex-shrink:0}
      .ipynb-preview-title{font-size:14px;font-weight:500;margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
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
        <div class="ipynb-preview-title">${blockName} Block Preview</div>
        <div class="ipynb-preview-controls">
          <button class="ipynb-preview-btn ipynb-view-btn" data-view="mobile"><span class="btn-text-full">📱 Mobile</span><span class="btn-text-short">📱 M</span></button>
          <button class="ipynb-preview-btn ipynb-view-btn" data-view="tablet"><span class="btn-text-full">📱 Tablet</span><span class="btn-text-short">📱 T</span></button>
          <button class="ipynb-preview-btn ipynb-view-btn active" data-view="desktop"><span class="btn-text-full">🖥️ Desktop</span><span class="btn-text-short">🖥️ D</span></button>
          <div class="ipynb-preview-divider"></div>
          <button class="ipynb-preview-btn ipynb-close-btn">✕</button>
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

  // Handle view switching
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

  // Handle close button
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    overlay.remove();
  });

  // Close on ESC key or clicking backdrop
  overlay.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlay.remove();
    }
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  // Focus overlay for keyboard events
  overlay.tabIndex = -1;
  overlay.focus();

  // Decorate the block
  const block = overlay.querySelector(`.${blockName}.block`);
  try {
    const module = await import(`/blocks/${blockName}/${blockName}.js`);
    if (module.default) {
      await module.default(block);
      console.log('✓ Block decorated');
    }
  } catch (error) {
    console.error('Block decoration error:', error);
  }

  return `✓ Preview overlay opened for ${blockName}`;
}
