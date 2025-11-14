/**
 * IPynb Viewer Block
 * Displays Jupyter notebook (.ipynb) files with interactive JavaScript execution
 */

/**
 * Parse markdown text to HTML (enhanced implementation)
 * @param {string} markdown - Markdown text
 * @returns {string} HTML string
 */
function parseMarkdown(markdown) {
  let html = markdown;

  // Code blocks (triple backticks) - MUST be processed first before other replacements
  const codeBlockPlaceholders = [];
  html = html.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
    const placeholder = `__CODEBLOCK_${codeBlockPlaceholders.length}__`;
    codeBlockPlaceholders.push(`<pre><code class="language-${lang || 'plaintext'}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
    return placeholder;
  });

  // Tables - must be before line breaks
  const lines = html.split('\n');
  const processedLines = [];
  let inTable = false;
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line is a table row
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      // Skip separator rows (|---|---|)
      if (/^\|[\s\-:]+\|$/.test(line.trim())) {
        continue;
      }

      if (!inTable) {
        inTable = true;
        tableRows = [];
      }

      const cells = line.split('|').filter(cell => cell.trim());
      const row = '<tr>' + cells.map((cell, idx) => {
        // First row is header
        const tag = tableRows.length === 0 ? 'th' : 'td';
        return `<${tag}>${cell.trim()}</${tag}>`;
      }).join('') + '</tr>';
      tableRows.push(row);
    } else {
      // Not a table row
      if (inTable) {
        // End of table, flush accumulated rows
        processedLines.push('<table>' + tableRows.join('') + '</table>');
        tableRows = [];
        inTable = false;
      }
      processedLines.push(line);
    }
  }

  // Flush any remaining table
  if (inTable && tableRows.length > 0) {
    processedLines.push('<table>' + tableRows.join('') + '</table>');
  }

  html = processedLines.join('\n');

  // Headers (process in order from most specific to least)
  // Add IDs to h2 headers for "Part X:" sections and special cases
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, (match, text) => {
    // Check if it's a "Part X:" heading
    const partMatch = text.match(/Part\s+(\d+):/i);
    if (partMatch) {
      const partNum = partMatch[1];
      return `<h2 id="part-${partNum}">${text}</h2>`;
    }
    // Special case: "What is ipynb-viewer?" is Part 1
    if (text.includes('What is ipynb-viewer?')) {
      return `<h2 id="part-1">${text}</h2>`;
    }
    return `<h2>${text}</h2>`;
  });
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold (before italic to handle ** before *)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Code inline (before links to avoid conflicts)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Lists - process line by line
  const linesWithLists = html.split('\n');
  const processedWithLists = [];
  let inUl = false;
  let inOl = false;

  for (const line of linesWithLists) {
    const ulMatch = line.match(/^[\s]*[-*] (.+)$/);
    const olMatch = line.match(/^[\s]*\d+\. (.+)$/);

    if (ulMatch) {
      if (!inUl) {
        processedWithLists.push('<ul>');
        inUl = true;
      }
      processedWithLists.push(`<li>${ulMatch[1]}</li>`);
    } else if (olMatch) {
      if (!inOl) {
        processedWithLists.push('<ol>');
        inOl = true;
      }
      processedWithLists.push(`<li>${olMatch[1]}</li>`);
    } else {
      // Close any open lists
      if (inUl) {
        processedWithLists.push('</ul>');
        inUl = false;
      }
      if (inOl) {
        processedWithLists.push('</ol>');
        inOl = false;
      }
      processedWithLists.push(line);
    }
  }

  // Close any remaining open lists
  if (inUl) processedWithLists.push('</ul>');
  if (inOl) processedWithLists.push('</ol>');

  html = processedWithLists.join('\n');

  // Restore code blocks
  codeBlockPlaceholders.forEach((codeBlock, index) => {
    html = html.replace(`__CODEBLOCK_${index}__`, codeBlock);
  });

  // Line breaks (convert remaining newlines to <br>)
  html = html.replace(/\n/g, '<br>');

  return html;
}

/**
 * Create a markdown cell element
 * @param {object} cell - Notebook cell data
 * @param {number} index - Cell index
 * @returns {HTMLElement} Cell element
 */
function createMarkdownCell(cell, index) {
  const cellDiv = document.createElement('div');
  cellDiv.className = 'ipynb-cell ipynb-markdown-cell';
  cellDiv.dataset.cellIndex = index;

  const content = document.createElement('div');
  content.className = 'ipynb-cell-content';

  // Join source lines and parse markdown
  const markdownText = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
  content.innerHTML = parseMarkdown(markdownText);

  cellDiv.appendChild(content);
  return cellDiv;
}

/**
 * Create a code cell element with execution button
 * @param {object} cell - Notebook cell data
 * @param {number} index - Overall cell index
 * @returns {HTMLElement} Cell element
 */
function createCodeCell(cell, index) {
  const cellDiv = document.createElement('div');
  cellDiv.className = 'ipynb-cell ipynb-code-cell';
  cellDiv.dataset.cellIndex = index;

  // Cell header with run button
  const header = document.createElement('div');
  header.className = 'ipynb-cell-header';

  const cellLabel = document.createElement('span');
  cellLabel.className = 'ipynb-cell-label';
  cellLabel.textContent = `[${index + 1}]:`;

  const runButton = document.createElement('button');
  runButton.className = 'ipynb-run-button';
  runButton.textContent = 'Run';
  runButton.setAttribute('aria-label', `Run code cell ${index + 1}`);

  header.appendChild(cellLabel);
  header.appendChild(runButton);

  // Code content
  const codeContent = document.createElement('pre');
  codeContent.className = 'ipynb-code-content';

  const code = document.createElement('code');
  const codeText = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
  code.textContent = codeText;

  codeContent.appendChild(code);

  // Output area (initially hidden)
  const output = document.createElement('div');
  output.className = 'ipynb-cell-output';
  output.style.display = 'none';

  // Store code for execution
  cellDiv.dataset.code = codeText;

  cellDiv.appendChild(header);
  cellDiv.appendChild(codeContent);
  cellDiv.appendChild(output);

  return cellDiv;
}

/**
 * Execute JavaScript code in a cell
 * @param {HTMLElement} cellDiv - Cell element
 */
async function executeCodeCell(cellDiv) {
  const code = cellDiv.dataset.code;
  const output = cellDiv.querySelector('.ipynb-cell-output');

  // Clear previous output
  output.innerHTML = '';
  output.style.display = 'block';

  // Create console capture
  const logs = [];
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;

  console.log = (...args) => {
    logs.push({ type: 'log', args });
    originalConsoleLog.apply(console, args);
  };

  console.error = (...args) => {
    logs.push({ type: 'error', args });
    originalConsoleError.apply(console, args);
  };

  try {
    // Execute code (with async support)
    // eslint-disable-next-line no-new-func
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
    const func = new AsyncFunction(code);
    const result = await func();

    // Restore console
    console.log = originalConsoleLog;
    console.error = originalConsoleError;

    // Display logs
    logs.forEach(log => {
      const logDiv = document.createElement('div');
      logDiv.className = `ipynb-output-${log.type}`;
      logDiv.textContent = log.args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ');
      output.appendChild(logDiv);
    });

    // Display result if not undefined
    if (result !== undefined) {
      const resultDiv = document.createElement('div');
      resultDiv.className = 'ipynb-output-result';

      // Check if result is a multi-line string (contains newlines)
      const resultString = typeof result === 'object'
        ? JSON.stringify(result, null, 2)
        : String(result);

      if (resultString.includes('\n')) {
        // Multi-line result: use pre-wrap to preserve formatting
        resultDiv.style.whiteSpace = 'pre-wrap';
      }

      resultDiv.textContent = resultString;
      output.appendChild(resultDiv);
    }

    // Show success indicator
    cellDiv.classList.add('ipynb-cell-executed');

  } catch (error) {
    // Restore console
    console.log = originalConsoleLog;
    console.error = originalConsoleError;

    // Display error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'ipynb-output-error';
    errorDiv.textContent = `Error: ${error.message}`;
    output.appendChild(errorDiv);

    // Show error indicator
    cellDiv.classList.add('ipynb-cell-error');
  }
}

/**
 * Load and parse notebook file
 * @param {string} notebookPath - Path to .ipynb file
 * @returns {Promise<object>} Parsed notebook data
 */
async function loadNotebook(notebookPath) {
  try {
    const response = await fetch(notebookPath);
    if (!response.ok) {
      throw new Error(`Failed to load notebook: ${response.status} ${response.statusText}`);
    }

    const notebook = await response.json();
    return notebook;
  } catch (error) {
    console.error('Error loading notebook:', error);
    throw error;
  }
}

/**
 * Check if a markdown cell should be grouped with the next code cell
 * @param {HTMLElement} cell - Current cell
 * @param {HTMLElement} nextCell - Next cell
 * @returns {boolean} True if cells should be grouped
 */
function shouldGroupWithNext(cell, nextCell) {
  if (!cell || !nextCell) return false;
  if (!cell.classList.contains('ipynb-markdown-cell')) return false;
  if (!nextCell.classList.contains('ipynb-code-cell')) return false;

  // Get markdown content
  const content = cell.textContent.trim();

  // Patterns that suggest the markdown is describing the following code
  const groupingPatterns = [
    /:\s*$/,                           // Ends with colon
    /below/i,                          // Contains "below"
    /following/i,                      // Contains "following"
    /try running/i,                    // Contains "try running"
    /click run/i,                      // Contains "click run"
    /run the cell/i,                   // Contains "run the cell"
    /let's test/i,                     // Contains "let's test"
    /let's try/i,                      // Contains "let's try"
    /example:/i,                       // Contains "example:"
    /here's how/i,                     // Contains "here's how"
  ];

  return groupingPatterns.some(pattern => pattern.test(content));
}

/**
 * Create page groups from cells for smart pagination
 * @param {Array<HTMLElement>} cells - Array of cell elements
 * @returns {Array<Object>} Array of page objects with grouped cells
 */
function createPageGroups(cells) {
  const pages = [];
  const MAX_CODE_GROUP_SIZE = 3; // Maximum number of consecutive code cells to group
  let i = 0;

  while (i < cells.length) {
    const cell = cells[i];
    const nextCell = cells[i + 1];

    if (shouldGroupWithNext(cell, nextCell)) {
      // Group markdown + code together
      const groupedCells = [cell, nextCell];
      let j = i + 2;

      // Check for additional consecutive code cells (up to MAX_CODE_GROUP_SIZE total)
      while (
        j < cells.length &&
        cells[j].classList.contains('ipynb-code-cell') &&
        groupedCells.filter(c => c.classList.contains('ipynb-code-cell')).length < MAX_CODE_GROUP_SIZE
      ) {
        groupedCells.push(cells[j]);
        j++;
      }

      pages.push({
        type: 'grouped',
        cells: groupedCells,
      });
      i = j; // Skip all grouped cells
    } else {
      // Single cell page
      pages.push({
        type: 'single',
        cells: [cell],
      });
      i++;
    }
  }

  return pages;
}

/**
 * Create full-screen overlay for paged variation
 * @param {HTMLElement} container - The notebook container
 * @param {HTMLElement} cellsContainer - Container with cells
 * @returns {object} Overlay controls
 */
function createPagedOverlay(container, cellsContainer) {
  const cells = Array.from(cellsContainer.querySelectorAll('.ipynb-cell'));

  if (cells.length === 0) return null;

  // Create page groups (smart grouping)
  const pages = createPageGroups(cells);
  const totalPages = pages.length;

  const paginationState = {
    currentPage: 0,
    totalPages,
    pages,
    isOverlayOpen: false,
  };

  // Create overlay structure
  const overlay = document.createElement('div');
  overlay.className = 'ipynb-paged-overlay';
  overlay.style.display = 'none';

  const overlayContent = document.createElement('div');
  overlayContent.className = 'ipynb-paged-overlay-content';

  // Close button
  const closeButton = document.createElement('button');
  closeButton.className = 'ipynb-paged-close';
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('aria-label', 'Close paged view');

  // Pagination controls
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'ipynb-pagination';

  const prevButton = document.createElement('button');
  prevButton.className = 'ipynb-pagination-button ipynb-prev-button';
  prevButton.textContent = 'Previous';
  prevButton.setAttribute('aria-label', 'Previous page');

  const pageIndicator = document.createElement('span');
  pageIndicator.className = 'ipynb-page-indicator';

  const nextButton = document.createElement('button');
  nextButton.className = 'ipynb-pagination-button ipynb-next-button';
  nextButton.textContent = 'Next';
  nextButton.setAttribute('aria-label', 'Next page');

  paginationDiv.appendChild(prevButton);
  paginationDiv.appendChild(pageIndicator);
  paginationDiv.appendChild(nextButton);

  // Cell content area
  const cellContentArea = document.createElement('div');
  cellContentArea.className = 'ipynb-paged-cell-area';

  // Assemble overlay
  overlayContent.appendChild(closeButton);
  overlayContent.appendChild(cellContentArea);
  overlayContent.appendChild(paginationDiv);
  overlay.appendChild(overlayContent);

  // Update page display
  function updatePageDisplay() {
    // Clear cell area
    cellContentArea.innerHTML = '';

    // Get current page group
    const currentPage = pages[paginationState.currentPage];

    // Clone and append all cells in this page
    currentPage.cells.forEach((cell) => {
      const clonedCell = cell.cloneNode(true);
      clonedCell.classList.add('active');
      cellContentArea.appendChild(clonedCell);

      // Re-attach run button handlers if it's a code cell
      if (clonedCell.classList.contains('ipynb-code-cell')) {
        const runButton = clonedCell.querySelector('.ipynb-run-button');
        if (runButton) {
          runButton.addEventListener('click', () => {
            executeCodeCell(clonedCell);
          });
        }
      }
    });

    // Add spacing between grouped cells for better readability
    if (currentPage.type === 'grouped' && currentPage.cells.length > 1) {
      const allCells = cellContentArea.querySelectorAll('.ipynb-cell');

      // Add spacing after markdown cell (first cell if markdown)
      if (allCells.length > 0 && allCells[0].classList.contains('ipynb-markdown-cell')) {
        allCells[0].style.marginBottom = '1.5rem';
      }

      // Add spacing between consecutive code cells
      for (let i = 1; i < allCells.length - 1; i++) {
        if (allCells[i].classList.contains('ipynb-code-cell')) {
          allCells[i].style.marginBottom = '1rem';
        }
      }
    }

    // Update controls
    pageIndicator.textContent = `${paginationState.currentPage + 1} / ${totalPages}`;
    prevButton.disabled = paginationState.currentPage === 0;
    nextButton.disabled = paginationState.currentPage === totalPages - 1;

    // Scroll to top of overlay
    overlayContent.scrollTop = 0;
  }

  // Navigation handlers
  function goToNextPage() {
    if (paginationState.currentPage < totalPages - 1) {
      paginationState.currentPage++;
      updatePageDisplay();
    }
  }

  function goToPrevPage() {
    if (paginationState.currentPage > 0) {
      paginationState.currentPage--;
      updatePageDisplay();
    }
  }

  // Open overlay
  function openOverlay() {
    paginationState.isOverlayOpen = true;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    updatePageDisplay();
  }

  // Close overlay
  function closeOverlay() {
    paginationState.isOverlayOpen = false;
    overlay.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Button event listeners
  prevButton.addEventListener('click', goToPrevPage);
  nextButton.addEventListener('click', goToNextPage);
  closeButton.addEventListener('click', closeOverlay);

  // Keyboard navigation
  const keyHandler = (e) => {
    if (!paginationState.isOverlayOpen) return;

    // Only handle if user isn't typing in an input
    if (!document.activeElement ||
        (document.activeElement.tagName !== 'INPUT' &&
         document.activeElement.tagName !== 'TEXTAREA')) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevPage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeOverlay();
      }
    }
  };

  document.addEventListener('keydown', keyHandler);

  // Append overlay to body
  document.body.appendChild(overlay);

  return {
    openOverlay,
    closeOverlay,
  };
}

/**
 * Create start button for paged variation
 * @returns {HTMLElement} Start button element
 */
function createPagedStartButton() {
  const startButton = document.createElement('button');
  startButton.className = 'ipynb-paged-start-button';
  startButton.textContent = 'Start Reading';
  startButton.setAttribute('aria-label', 'Start paged reading mode');
  return startButton;
}

/**
 * Decorate the ipynb-viewer block
 * @param {HTMLElement} block - Block element
 */
export default async function decorate(block) {
  // Configuration
  const config = {
    errorMessage: 'Failed to load notebook',
    loadingMessage: 'Loading notebook...',
  };

  // Detect paged variation
  const isPaged = block.classList.contains('paged');

  try {
    // Extract notebook path from block content
    const rows = Array.from(block.children);
    if (rows.length === 0) {
      throw new Error('No notebook path provided');
    }

    // First cell should contain the notebook path
    const firstCell = rows[0].children[0];
    let notebookPath = firstCell.textContent.trim();

    // Check if it's a link
    const link = firstCell.querySelector('a');
    if (link) {
      notebookPath = link.href;
    }

    // Show loading state
    block.innerHTML = `<div class="ipynb-loading">${config.loadingMessage}</div>`;

    // Load notebook
    const notebook = await loadNotebook(notebookPath);

    // Clear block
    block.textContent = '';

    // Create container
    const container = document.createElement('div');
    container.className = 'ipynb-viewer-container';

    // Create header
    const header = document.createElement('div');
    header.className = 'ipynb-viewer-header';

    const title = document.createElement('h2');
    title.className = 'ipynb-viewer-title';
    title.textContent = notebook.metadata?.title || 'Jupyter Notebook';

    header.appendChild(title);

    // Add author if available
    if (notebook.metadata?.author) {
      const author = document.createElement('div');
      author.className = 'ipynb-viewer-author';
      author.textContent = `By ${notebook.metadata.author}`;
      header.appendChild(author);
    }

    // Add date if available
    if (notebook.metadata?.date) {
      const date = document.createElement('div');
      date.className = 'ipynb-viewer-date';
      date.textContent = notebook.metadata.date;
      header.appendChild(date);
    }

    // Create cells container
    const cellsContainer = document.createElement('div');
    cellsContainer.className = 'ipynb-cells-container';

    // Process cells
    if (!notebook.cells || notebook.cells.length === 0) {
      throw new Error('Notebook has no cells');
    }

    notebook.cells.forEach((cell, index) => {
      let cellElement;

      if (cell.cell_type === 'markdown') {
        cellElement = createMarkdownCell(cell, index);
      } else if (cell.cell_type === 'code') {
        cellElement = createCodeCell(cell, index);

        // Add click handler for run button
        const runButton = cellElement.querySelector('.ipynb-run-button');
        runButton.addEventListener('click', () => {
          executeCodeCell(cellElement);
        });
      }

      if (cellElement) {
        cellsContainer.appendChild(cellElement);
      }
    });

    // Assemble container
    container.appendChild(header);

    // Handle paged variation differently
    if (isPaged) {
      // Hide cells initially in paged mode
      cellsContainer.style.display = 'none';
      container.appendChild(cellsContainer);

      // Create start button
      const startButton = createPagedStartButton();
      container.appendChild(startButton);

      // Create overlay
      const overlay = createPagedOverlay(container, cellsContainer);

      // Start button opens overlay
      startButton.addEventListener('click', () => {
        overlay.openOverlay();
      });
    } else {
      // Default mode: show all cells
      container.appendChild(cellsContainer);
    }

    block.appendChild(container);

  } catch (error) {
    console.error('Block decoration failed:', error);
    block.innerHTML = `<div class="ipynb-error">${config.errorMessage}: ${error.message}</div>`;
  }
}
