/**
 * IPynb Viewer Block
 * Displays Jupyter notebook (.ipynb) files with interactive JavaScript execution
 */

/**
 * Parse markdown text to HTML (enhanced implementation)
 * @param {string} markdown - Markdown text
 * @param {string} [repoUrl] - Optional repository URL for converting .md links
 * @param {string} [branch='main'] - GitHub branch to use for .md links
 * @param {string} [currentFilePath] - Optional current file path for resolving relative links
 * @returns {string} HTML string
 */
function parseMarkdown(markdown, repoUrl = null, branch = 'main', currentFilePath = null) {
  let html = markdown;

  // Code blocks (triple backticks) - MUST be processed first before other replacements
  const codeBlockPlaceholders = [];
  html = html.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
    const placeholder = `__CODEBLOCK_${codeBlockPlaceholders.length}__`;
    codeBlockPlaceholders.push(`<pre><code class="language-${lang || 'plaintext'}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
    return placeholder;
  });

  // Handle escaped HTML characters (e.g., \<img>, \:// in documentation examples)
  // These should be rendered as literal text, not actual HTML
  html = html.replace(/\\</g, '&lt;');
  html = html.replace(/\\>/g, '&gt;');
  html = html.replace(/\\:/g, ':');

  // Tables - must be before line breaks
  const lines = html.split('\n');
  const processedLines = [];
  let inTable = false;
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if line is a table row
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      // Skip separator rows (|---|---|) - must include | in character class
      if (/^\|[\s\-:|]+\|$/.test(line.trim())) {
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
  // Add IDs to h2 headers for navigation
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, (match, text) => {
    // Generate ID from text (lowercase, replace spaces with hyphens, remove special chars)
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters except word chars, spaces, hyphens
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, '')   // Remove leading and trailing hyphens
      .trim();

    return `<h2 id="${id}">${text}</h2>`;
  });
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Horizontal rules (must be before bold/italic to avoid conflicts)
  // Matches: ---, ***, or ___ (3 or more, with optional spaces)
  html = html.replace(/^(?:[-*_]\s*){3,}$/gim, '<hr>');

  // Code inline (before links to avoid conflicts)
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Links - convert .md files to repo URLs if repo is available
  // Process BEFORE bold/italic to handle constructs like **Text** → [link](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    // Check if it's a .md file and we have a repo URL
    if (repoUrl && url.endsWith('.md') && !url.startsWith('http://') && !url.startsWith('https://')) {
      let cleanPath = url;

      // Resolve relative paths based on current file location
      if (currentFilePath && !url.startsWith('/') && !url.startsWith('http')) {
        // This is a relative path - resolve it based on current file's directory
        console.log('🔍 Resolving relative path:', url, 'from:', currentFilePath);

        // Extract the directory path from the current file (remove filename)
        const currentDir = currentFilePath.substring(0, currentFilePath.lastIndexOf('/'));
        console.log('   Current directory:', currentDir);

        // Combine current directory with relative path
        const parts = currentDir ? currentDir.split('/') : [];
        const urlParts = url.replace(/^\.\//, '').split('/'); // Remove leading ./ if present

        // Process each part of the URL
        for (const part of urlParts) {
          if (part === '..') {
            // Go up one directory
            if (parts.length > 0) {
              parts.pop();
            }
          } else if (part !== '.' && part !== '') {
            // Add directory or filename
            parts.push(part);
          }
        }

        cleanPath = parts.join('/');
        console.log('   ✅ Resolved to:', cleanPath);
      } else if (url.startsWith('/')) {
        // Absolute path from repo root - remove leading /
        cleanPath = url.replace(/^\//, '');
        console.log('🔍 Absolute path from root:', cleanPath);
      } else {
        // No currentFilePath or already absolute URL
        cleanPath = url.replace(/^\.?\//, '');
        if ((url.startsWith('../') || url.includes('/../')) && !currentFilePath) {
          console.warn('⚠️  Relative path with ".." but no currentFilePath provided:', url);
        }
      }

      // Build full repo URL using the specified branch
      const fullUrl = `${repoUrl}/blob/${branch}/${cleanPath}`;
      console.log(`🔗 Creating GitHub md link: "${text}" -> ${cleanPath} (full: ${fullUrl})`);
      // Mark GitHub markdown links with special class for overlay handling
      // Use href="#" to prevent browser prefetching, store actual URL in data attribute
      return `<a href="#" class="ipynb-github-md-link" data-md-url="${fullUrl}" data-md-path="${cleanPath}" data-repo="${repoUrl}" data-branch="${branch}">${text}</a>`;
    }

    // External links (http/https) - display as non-clickable text with URL shown
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return `<span class="ipynb-external-link" title="${url}">${text} <code>${url}</code></span>`;
    }

    // Hash links - keep as-is for internal navigation
    if (url.startsWith('#')) {
      return `<a href="${url}">${text}</a>`;
    }

    // Other file types (.html, .htm, images, etc.) - display as non-clickable text
    // Show the filename/path for documentation purposes
    return `<span class="ipynb-non-md-link" title="${url}">${text} <code>(${url})</code></span>`;
  });

  // Bold (after links to preserve bold text before links like **Text** → [link])
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic (after bold)
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Lists - process line by line with nested list support
  const linesWithLists = html.split('\n');
  const processedWithLists = [];
  const listStack = []; // Track nested list state: [{type: 'ol'|'ul', indent: number}]
  let lastIndent = -1;

  for (const line of linesWithLists) {
    // Match list items with indentation
    const ulMatch = line.match(/^(\s*)[-*] (.+)$/);
    const olMatch = line.match(/^(\s*)\d+\. (.+)$/);

    if (ulMatch || olMatch) {
      const isUl = !!ulMatch;
      const indent = (ulMatch ? ulMatch[1] : olMatch[1]).length;
      const content = ulMatch ? ulMatch[2] : olMatch[2];
      const listType = isUl ? 'ul' : 'ol';

      // Handle nesting based on indentation
      if (indent > lastIndent) {
        // Starting a new nested list
        if (listStack.length > 0) {
          // Close the previous <li> and open nested list inside it
          const lastItem = processedWithLists[processedWithLists.length - 1];
          if (lastItem && lastItem.endsWith('</li>')) {
            // Remove the closing </li> tag
            processedWithLists[processedWithLists.length - 1] = lastItem.slice(0, -5);
          }
        }
        processedWithLists.push(`<${listType}>`);
        listStack.push({ type: listType, indent });
      } else if (indent < lastIndent) {
        // Closing nested lists
        while (listStack.length > 0 && listStack[listStack.length - 1].indent > indent) {
          const closed = listStack.pop();
          processedWithLists.push(`</${closed.type}>`);
          // Close the parent <li> that contained the nested list
          if (listStack.length > 0) {
            processedWithLists.push('</li>');
          }
        }

        // Check if we need to start a new list at this level
        if (listStack.length === 0 || listStack[listStack.length - 1].type !== listType) {
          if (listStack.length > 0) {
            // Close existing list at this level
            const closed = listStack.pop();
            processedWithLists.push(`</${closed.type}>`);
          }
          processedWithLists.push(`<${listType}>`);
          listStack.push({ type: listType, indent });
        }
      } else if (listStack.length > 0 && listStack[listStack.length - 1].type !== listType) {
        // Same indent but different list type - close and reopen
        const closed = listStack.pop();
        processedWithLists.push(`</${closed.type}>`);
        processedWithLists.push(`<${listType}>`);
        listStack.push({ type: listType, indent });
      } else if (listStack.length === 0) {
        // First list item
        processedWithLists.push(`<${listType}>`);
        listStack.push({ type: listType, indent });
      }

      processedWithLists.push(`<li>${content}</li>`);
      lastIndent = indent;
    } else {
      // Non-list line - close all open lists
      while (listStack.length > 0) {
        const closed = listStack.pop();
        processedWithLists.push(`</${closed.type}>`);
      }
      processedWithLists.push(line);
      lastIndent = -1;
    }
  }

  // Close any remaining open lists
  while (listStack.length > 0) {
    const closed = listStack.pop();
    processedWithLists.push(`</${closed.type}>`);
  }

  html = processedWithLists.join('\n');

  // Blockquotes - process line by line (must match raw > character, not &gt;)
  const linesWithBlockquotes = html.split('\n');
  const processedWithBlockquotes = [];
  let inBlockquote = false;

  for (const line of linesWithBlockquotes) {
    // Match lines starting with > (raw character, before any HTML encoding)
    const blockquoteMatch = line.match(/^>\s?(.*)$/);

    if (blockquoteMatch) {
      if (!inBlockquote) {
        processedWithBlockquotes.push('<blockquote>');
        inBlockquote = true;
      }
      // Add the line content (without the > prefix)
      processedWithBlockquotes.push(blockquoteMatch[1]);
    } else {
      // Close blockquote if we were in one
      if (inBlockquote) {
        processedWithBlockquotes.push('</blockquote>');
        inBlockquote = false;
      }
      processedWithBlockquotes.push(line);
    }
  }

  // Close any remaining open blockquote
  if (inBlockquote) processedWithBlockquotes.push('</blockquote>');

  html = processedWithBlockquotes.join('\n');

  // Restore code blocks
  codeBlockPlaceholders.forEach((codeBlock, index) => {
    html = html.replace(`__CODEBLOCK_${index}__`, codeBlock);
  });

  // Line breaks (convert remaining newlines to <br>)
  html = html.replace(/\n/g, '<br>');

  return html;
}

/**
 * Detect cell type based on content patterns
 * @param {string} content - Cell content
 * @param {number} index - Cell index
 * @returns {string} Cell type: 'hero', 'intro', 'transition', or 'content'
 */
function detectCellType(content, index) {
  // Hero cell is the first cell with large heading
  if (index === 0 && content.includes('# ')) {
    return 'hero';
  }

  // Intro cells have thick borders - typically cells with key introductory content
  // These are usually the first few content cells after hero
  if (index <= 2 && content.includes('## ')) {
    return 'intro';
  }

  // Transition cells are short (1-2 lines) and often centered text
  const lines = content.trim().split('\n').filter(line => line.trim());
  if (lines.length <= 3 && !content.includes('##') && !content.includes('###')) {
    return 'transition';
  }

  // Default to content card
  return 'content';
}

/**
 * Wrap markdown content with appropriate styling classes
 * @param {string} html - Parsed HTML content
 * @param {string} cellType - Cell type
 * @returns {string} Wrapped HTML
 */
function wrapMarkdownContent(html, cellType) {
  switch (cellType) {
    case 'hero':
      return `<div class="ipynb-hero-cell">${html}</div>`;
    case 'intro':
      return `<div class="ipynb-content-card">${html}</div>`;
    case 'transition':
      return `<div class="ipynb-transition-card">${html}</div>`;
    case 'content':
    default:
      return `<div class="ipynb-content-card-thin">${html}</div>`;
  }
}

/**
 * Style action cards in a cell content element
 * Detects <!-- action-cards --> marker and transforms following list into styled cards
 * Also fixes links at runtime by finding matching headings
 * @param {HTMLElement} contentElement - Cell content element
 */
function styleActionCards(contentElement) {
  // Find the ul element that follows the action-cards comment
  const ul = contentElement.querySelector('ul');
  if (!ul) return;

  // Add container class to the ul
  ul.classList.add('ipynb-action-cards');

  // Style each list item as an action card (all blue)
  const items = ul.querySelectorAll('li');
  items.forEach((li) => {
    li.classList.add('ipynb-action-card');
    li.classList.add('ipynb-action-card-blue');

    // Fix links at runtime by finding matching headings
    const link = li.querySelector('a');
    if (link && link.hash && link.hash !== '#') {
      // Extract the link text to search for matching heading
      const linkText = link.textContent.trim();

      // Find all headings in the document
      const allCells = document.querySelectorAll('.ipynb-cell');
      let targetCell = null;

      allCells.forEach((cell) => {
        const headings = cell.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading) => {
          // Check if heading text matches link text (case-insensitive, ignore emojis/special chars)
          const headingText = heading.textContent.trim().replace(/[^\w\s]/g, '').toLowerCase();
          const searchText = linkText.replace(/[^\w\s]/g, '').toLowerCase();

          if (headingText.includes(searchText)) {
            targetCell = cell;
            // Ensure the cell has a data-cell-index
            if (!heading.id && cell.dataset.cellIndex) {
              heading.id = `cell-${cell.dataset.cellIndex}`;
            }
          }
        });
      });

      // Update the link to point to the found cell
      if (targetCell && targetCell.dataset.cellIndex) {
        link.href = `#cell-${targetCell.dataset.cellIndex}`;
      }
    } else if (link && link.hash === '#') {
      // Link has placeholder # - resolve it now
      const linkText = link.textContent.trim();

      // Find all headings in the document
      const allCells = document.querySelectorAll('.ipynb-cell');
      let targetCell = null;

      allCells.forEach((cell) => {
        const headings = cell.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading) => {
          // Check if heading text matches link text (case-insensitive, ignore emojis/special chars)
          const headingText = heading.textContent.trim().replace(/[^\w\s]/g, '').toLowerCase();
          const searchText = linkText.replace(/[^\w\s]/g, '').toLowerCase();

          if (headingText.includes(searchText)) {
            targetCell = cell;
            // Ensure the cell has a data-cell-index
            if (!heading.id && cell.dataset.cellIndex) {
              heading.id = `cell-${cell.dataset.cellIndex}`;
            }
          }
        });
      });

      // Update the link to point to the found cell
      if (targetCell && targetCell.dataset.cellIndex) {
        link.href = `#cell-${targetCell.dataset.cellIndex}`;
      }
    }
  });
}

/**
 * Create a markdown cell element
 * @param {object} cell - Notebook cell data
 * @param {number} index - Cell index
 * @param {string} [repoUrl] - Optional repository URL for converting .md links
 * @param {boolean} [autoWrap=false] - Whether to auto-wrap with styling classes (notebook mode)
 * @param {string} [helpRepoUrl] - Optional help repository URL
 * @param {string} [branch='main'] - GitHub branch to use for .md links
 * @param {Array} [parentHistory=null] - Optional parent overlay's history array
 * @returns {HTMLElement} Cell element
 */
function createMarkdownCell(cell, index, repoUrl = null, autoWrap = false, helpRepoUrl = null, branch = 'main', parentHistory = null) {
  const cellDiv = document.createElement('div');
  cellDiv.className = 'ipynb-cell ipynb-markdown-cell';
  cellDiv.dataset.cellIndex = index;

  const content = document.createElement('div');
  content.className = 'ipynb-cell-content';

  // Join source lines and parse markdown
  const markdownText = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
  let html = parseMarkdown(markdownText, repoUrl, branch);

  // Auto-wrap with styling classes if in notebook mode
  if (autoWrap) {
    const cellType = detectCellType(markdownText, index);
    html = wrapMarkdownContent(html, cellType);
  }

  content.innerHTML = html;

  // Detect and style action cards if marker comment is present
  if (html.includes('<!-- action-cards -->')) {
    styleActionCards(content);
  }

  // Add click handlers for GitHub markdown links to open in overlay
  const githubMdLinks = content.querySelectorAll('.ipynb-github-md-link');
  githubMdLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const githubUrl = link.dataset.mdUrl; // Get URL from data attribute
      const linkBranch = link.dataset.branch || branch; // Get branch from link or use default
      const title = link.textContent || 'GitHub Markdown';
      const overlay = createGitHubMarkdownOverlay(githubUrl, title, helpRepoUrl, linkBranch, parentHistory, hideTopbar);
      overlay.openOverlay();
    });
  });

  cellDiv.appendChild(content);
  return cellDiv;
}

/**
 * Create a code cell element with execution button
 * @param {object} cell - Notebook cell data
 * @param {number} index - Overall cell index
 * @param {boolean} autorun - Whether to hide run button (autorun mode)
 * @returns {HTMLElement} Cell element
 */
function createCodeCell(cell, index, autorun = false) {
  const cellDiv = document.createElement('div');
  cellDiv.className = 'ipynb-cell ipynb-code-cell';
  cellDiv.dataset.cellIndex = index;

  if (autorun) {
    cellDiv.classList.add('ipynb-autorun');
  }

  // Cell header with run button
  const header = document.createElement('div');
  header.className = 'ipynb-cell-header';

  const cellLabel = document.createElement('span');
  cellLabel.className = 'ipynb-cell-label';
  cellLabel.textContent = `[${index + 1}]:`;

  header.appendChild(cellLabel);

  // Only add run button if not in autorun mode
  if (!autorun) {
    const runButton = document.createElement('button');
    runButton.className = 'ipynb-run-button';
    runButton.textContent = 'Run';
    runButton.setAttribute('aria-label', `Run code cell ${index + 1}`);
    header.appendChild(runButton);
  }

  // Code content
  const codeContent = document.createElement('pre');
  codeContent.className = 'ipynb-code-content';

  const code = document.createElement('code');
  const codeText = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
  code.textContent = codeText;

  codeContent.appendChild(code);

  // Output area (initially hidden, unless autorun)
  const output = document.createElement('div');
  output.className = 'ipynb-cell-output';
  output.style.display = autorun ? 'block' : 'none';

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
 * Maximum number of history entries to track per overlay instance
 */
const MAX_HISTORY_ENTRIES = 25;

/**
 * Add entry to navigation history for a specific overlay instance
 * @param {Array} historyArray - The history array for this overlay instance
 * @param {string} title - Title of the entry
 * @param {string} type - Type: 'cell' or 'markdown'
 * @param {number} [cellIndex] - Cell index for cell entries
 * @param {string} [url] - URL for markdown entries
 */
function addToHistory(historyArray, title, type, cellIndex = null, url = null) {
  const entry = {
    title,
    type,
    cellIndex,
    url,
    timestamp: Date.now(),
  };

  // Remove duplicate if exists (same title and type)
  const existingIndex = historyArray.findIndex(
    h => h.title === title && h.type === type
  );
  if (existingIndex !== -1) {
    historyArray.splice(existingIndex, 1);
  }

  // Add to front of history
  historyArray.unshift(entry);

  // Limit to MAX_HISTORY_ENTRIES
  if (historyArray.length > MAX_HISTORY_ENTRIES) {
    historyArray.pop();
  }
}

/**
 * Bookmark Management - localStorage-based bookmarks per notebook
 */

/**
 * Get localStorage key for bookmarks based on notebook path/title
 * @param {string} notebookId - Unique identifier for the notebook
 * @returns {string} localStorage key
 */
function getBookmarkStorageKey(notebookId) {
  return `ipynb-bookmarks-${notebookId}`;
}

/**
 * Get all bookmarks for a notebook
 * @param {string} notebookId - Unique identifier for the notebook
 * @returns {Array<{title: string, type: string, pageIndex: number|null, url: string|null, timestamp: number}>}
 */
function getBookmarks(notebookId) {
  try {
    const key = getBookmarkStorageKey(notebookId);
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get bookmarks:', error);
    return [];
  }
}

/**
 * Save a bookmark for the current page or markdown file
 * @param {string} notebookId - Unique identifier for the notebook
 * @param {string} title - Title of the page
 * @param {string} type - Type: 'cell' or 'markdown'
 * @param {number|null} pageIndex - Page index to bookmark (for cells)
 * @param {string|null} url - URL to bookmark (for markdown)
 * @returns {boolean} Success status
 */
function saveBookmark(notebookId, title, type, pageIndex = null, url = null) {
  try {
    const bookmarks = getBookmarks(notebookId);

    // Create unique identifier based on type
    const identifier = type === 'cell' ? `cell-${pageIndex}` : `md-${url}`;

    // Remove existing bookmark for same item
    const existingIndex = bookmarks.findIndex(b => {
      const bookmarkId = b.type === 'cell' ? `cell-${b.pageIndex}` : `md-${b.url}`;
      return bookmarkId === identifier;
    });
    if (existingIndex !== -1) {
      bookmarks.splice(existingIndex, 1);
    }

    // Add new bookmark
    bookmarks.unshift({
      title,
      type,
      pageIndex,
      url,
      timestamp: Date.now(),
    });

    // Save to localStorage
    const key = getBookmarkStorageKey(notebookId);
    localStorage.setItem(key, JSON.stringify(bookmarks));
    return true;
  } catch (error) {
    console.error('Failed to save bookmark:', error);
    return false;
  }
}

/**
 * Remove a specific bookmark
 * @param {string} notebookId - Unique identifier for the notebook
 * @param {string} type - Type: 'cell' or 'markdown'
 * @param {number|null} pageIndex - Page index to remove (for cells)
 * @param {string|null} url - URL to remove (for markdown)
 * @returns {boolean} Success status
 */
function removeBookmark(notebookId, type, pageIndex = null, url = null) {
  try {
    const bookmarks = getBookmarks(notebookId);
    const identifier = type === 'cell' ? `cell-${pageIndex}` : `md-${url}`;

    const filtered = bookmarks.filter(b => {
      const bookmarkId = b.type === 'cell' ? `cell-${b.pageIndex}` : `md-${b.url}`;
      return bookmarkId !== identifier;
    });

    const key = getBookmarkStorageKey(notebookId);
    localStorage.setItem(key, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to remove bookmark:', error);
    return false;
  }
}

/**
 * Clear all bookmarks for a notebook
 * @param {string} notebookId - Unique identifier for the notebook
 * @returns {boolean} Success status
 */
function clearAllBookmarks(notebookId) {
  try {
    const key = getBookmarkStorageKey(notebookId);
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Failed to clear bookmarks:', error);
    return false;
  }
}

/**
 * Navigation Tree Building Functions
 */

/**
 * Extract heading text from markdown cell
 * @param {HTMLElement} cell - Cell element
 * @returns {Object|null} Heading object with text and level, or null
 */
function extractHeading(cell) {
  const content = cell.querySelector('.ipynb-cell-content');
  if (!content) return null;

  const heading = content.querySelector('h1, h2, h3');
  if (!heading) return null;

  return {
    text: heading.textContent.trim(),
    level: parseInt(heading.tagName.substring(1)),
  };
}

/**
 * Extract all markdown file paths from cells
 * @param {HTMLElement} cellsContainer - Container with all cells
 * @returns {Array<string>} Array of unique .md file paths
 */
function extractMarkdownPaths(cellsContainer) {
  const paths = new Set(); // Automatic deduplication

  // Find all GitHub markdown links
  const mdLinks = cellsContainer.querySelectorAll('.ipynb-github-md-link');

  mdLinks.forEach((link) => {
    const mdUrl = link.dataset.mdUrl;
    if (mdUrl) {
      // Extract path from URL (remove blob/branch parts)
      const pathMatch = mdUrl.match(/\/blob\/[^/]+\/(.+)$/);
      if (pathMatch) {
        paths.add(pathMatch[1]);
      }
    }
  });

  return Array.from(paths).sort(); // Sort alphabetically
}

/**
 * Extract markdown paths from a specific element (for dynamic scanning)
 * @param {HTMLElement} element - Element to scan for markdown links
 * @returns {Array<string>} Array of markdown file paths
 */
function extractMarkdownPathsFromElement(element) {
  const paths = new Set();

  // Find all GitHub markdown links
  const mdLinks = element.querySelectorAll('.ipynb-github-md-link');

  console.log(`📋 Extracting markdown paths from element - found ${mdLinks.length} links`);

  mdLinks.forEach((link) => {
    const mdUrl = link.dataset.mdUrl;
    const mdPath = link.dataset.mdPath;
    console.log(`   Link: data-md-url="${mdUrl}", data-md-path="${mdPath}"`);
    if (mdUrl) {
      // Extract path from URL (remove blob/branch parts)
      const pathMatch = mdUrl.match(/\/blob\/[^/]+\/(.+)$/);
      if (pathMatch) {
        const extractedPath = pathMatch[1];
        console.log(`   ✅ Extracted path: ${extractedPath}`);
        paths.add(extractedPath);
      }
    }
  });

  return Array.from(paths).sort();
}

/**
 * Add new markdown paths to the navigation tree dynamically
 * @param {Array} tree - Navigation tree array
 * @param {Array<string>} newPaths - New markdown file paths to add
 */
function addMarkdownPathsToTree(tree, newPaths) {
  // Find the Repository root node
  const repoNode = tree.find(node => node.id === 'repository');
  if (!repoNode) {
    return; // No repository node exists yet
  }

  // Get existing paths AND filenames from the tree
  const existingPaths = new Set();
  const existingFilenames = new Set();
  const collectPaths = (node) => {
    if (node.type === 'markdown' && node.path) {
      existingPaths.add(node.path);
      // Extract just the filename from the path
      const filename = node.path.split('/').pop();
      existingFilenames.add(filename);
    }
    if (node.children) {
      node.children.forEach(collectPaths);
    }
  };
  collectPaths(repoNode);

  // Filter out paths that already exist OR have matching filenames
  const pathsToAdd = newPaths.filter(path => {
    // Skip if exact path already exists
    if (existingPaths.has(path)) {
      console.log(`   ⏭️  Skipping ${path} - exact path already exists`);
      return false;
    }

    // Skip if a file with the same name already exists (prevents duplicates)
    const filename = path.split('/').pop();
    if (existingFilenames.has(filename)) {
      console.log(`   ⏭️  Skipping ${path} - file "${filename}" already exists in tree`);
      return false;
    }

    return true;
  });

  if (pathsToAdd.length === 0) {
    console.log('📝 No new paths to add - all files already exist in tree');
    return; // No new paths to add
  }

  console.log(`📝 Adding ${pathsToAdd.length} new markdown file(s) to navigation tree:`, pathsToAdd);

  // Rebuild the entire file tree with all paths using the existing buildFileTree function
  // This ensures consistent structure and no duplicates
  const allPaths = [...existingPaths, ...pathsToAdd].sort();
  const helpPath = 'docs/help.md';
  repoNode.children = buildFileTree(allPaths, helpPath);
}

/**
 * Build hierarchical file tree from markdown paths
 * @param {Array<string>} paths - Array of file paths (e.g., 'docs/help.md')
 * @param {string} helpPath - Path to help.md (prioritized at start)
 * @returns {Array} Tree nodes for files with folder hierarchy
 */
function buildFileTree(paths, helpPath) {
  const tree = [];
  const folderMap = new Map(); // Track folder nodes by full path
  const pathMap = new Set(); // Deduplicate files

  // Helper to get or create folder node and its parent hierarchy
  const getOrCreateFolderHierarchy = (folderPath) => {
    if (folderMap.has(folderPath)) {
      return folderMap.get(folderPath);
    }

    const parts = folderPath.split('/');
    const folderName = parts[parts.length - 1];
    const level = parts.length;

    const folderNode = {
      id: `folder-${folderPath}`,
      label: folderName,
      type: 'folder',
      path: null,
      cellIndex: null,
      children: [],
      expanded: false,
      level,
    };

    folderMap.set(folderPath, folderNode);

    // If this folder has a parent, create parent hierarchy and add this as child
    if (parts.length > 1) {
      const parentPath = parts.slice(0, -1).join('/');
      const parentNode = getOrCreateFolderHierarchy(parentPath);
      if (!parentNode.children.includes(folderNode)) {
        parentNode.children.push(folderNode);
      }
    } else {
      // Top-level folder - add to tree root
      if (!tree.includes(folderNode)) {
        tree.push(folderNode);
      }
    }

    return folderNode;
  };

  // Helper to add file to tree
  const addFileToTree = (filePath, prioritized = false) => {
    if (pathMap.has(filePath)) return; // Skip if already added
    pathMap.add(filePath);

    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    const level = parts.length;

    const fileNode = {
      id: filePath,
      label: fileName,
      type: 'markdown',
      path: filePath,
      cellIndex: null,
      children: [],
      expanded: false,
      level,
    };

    if (parts.length === 1) {
      // Root level file
      if (prioritized) {
        tree.unshift(fileNode); // Add at start
      } else {
        tree.push(fileNode);
      }
    } else {
      // File in folder(s) - create full folder hierarchy
      const folderPath = parts.slice(0, -1).join('/');
      const folderNode = getOrCreateFolderHierarchy(folderPath);

      if (prioritized) {
        folderNode.children.unshift(fileNode);
      } else {
        folderNode.children.push(fileNode);
      }
    }
  };

  // Process help.md first if specified
  if (helpPath) {
    const helpFileName = helpPath.split('/').pop();
    const fullHelpPath = paths.find((p) => p.endsWith(helpPath) || p.endsWith(helpFileName));
    if (fullHelpPath) {
      addFileToTree(fullHelpPath, true);
    }
  }

  // Process remaining paths
  paths.forEach((path) => {
    addFileToTree(path, false);
  });

  // Recursive sort function
  const sortNode = (node) => {
    if (node.children && node.children.length > 0) {
      node.children.sort((a, b) => a.label.localeCompare(b.label));
      node.children.forEach(sortNode);
    }
  };

  // Sort root level
  tree.sort((a, b) => a.label.localeCompare(b.label));
  tree.forEach(sortNode);

  return tree;
}

/**
 * Build navigation tree from notebook cells and repository files
 * @param {Array<HTMLElement>} cells - Array of cell elements
 * @param {HTMLElement} cellsContainer - Container for extracting markdown paths
 * @param {string} helpRepoUrl - Help repository URL
 * @returns {Array} Root tree nodes
 */
function buildNavigationTree(cells, cellsContainer, helpRepoUrl) {
  const tree = [];

  // 1. Create "Notebook" root node
  const notebookNode = {
    id: 'notebook',
    label: 'Notebook',
    type: 'root',
    path: null,
    cellIndex: null,
    children: [],
    expanded: true, // Open by default
    level: 0,
  };

  // 2. First pass: Check if there are any Part headings at all
  const partRegex = /^Part\s+\d+/i; // Matches "Part 1", "Part 2", etc.
  const completedRegex = /completed.*final|final.*completed/i; // Matches both "completed" and "final" in any order

  let hasPartHeadings = false;
  cells.forEach((cell) => {
    if (cell.classList.contains('ipynb-markdown-cell')) {
      const heading = extractHeading(cell);
      if (heading && partRegex.test(heading.text.trim())) {
        hasPartHeadings = true;
      }
    }
  });

  console.log(`🌲 Building tree - notebook has Part headings: ${hasPartHeadings}`);

  // 3. Add cells based on whether Part headings exist
  let currentPartNode = null;
  let frontmatterNode = null;
  let summaryNode = null;

  cells.forEach((cell, index) => {
    if (cell.classList.contains('ipynb-markdown-cell')) {
      const heading = extractHeading(cell);
      if (heading) {
        const headingText = heading.text.trim();

        if (hasPartHeadings) {
          // WITH Part headings: Use Frontmatter/Parts/Summary structure

          // Check if this marks the end of Parts (completion cell)
          if (completedRegex.test(headingText) && currentPartNode) {
            // Create Summary node and switch to collecting there
            summaryNode = {
              id: 'summary',
              label: 'Summary',
              type: 'part',
              path: null,
              cellIndex: null,
              children: [],
              expanded: false,
              level: 1,
            };
            notebookNode.children.push(summaryNode);
            currentPartNode = null; // Stop adding to Parts

            // Add the completion cell to Summary
            summaryNode.children.push({
              id: `cell-${index}`,
              label: headingText,
              type: 'cell',
              path: null,
              cellIndex: index,
              children: [],
              expanded: false,
              level: 2,
            });
          } else if (summaryNode) {
            // After Parts ended, add to Summary
            summaryNode.children.push({
              id: `cell-${index}`,
              label: headingText,
              type: 'cell',
              path: null,
              cellIndex: index,
              children: [],
              expanded: false,
              level: 2,
            });
          } else if (partRegex.test(headingText)) {
            // Check if this is a Part heading
            currentPartNode = {
              id: `part-${index}`,
              label: headingText,
              type: 'part',
              path: null,
              cellIndex: index,
              children: [],
              expanded: false, // Parts start collapsed
              level: 1,
            };
            notebookNode.children.push(currentPartNode);
          } else if (currentPartNode) {
            // Add cell to current Part
            currentPartNode.children.push({
              id: `cell-${index}`,
              label: headingText,
              type: 'cell',
              path: null,
              cellIndex: index,
              children: [],
              expanded: false,
              level: 2,
            });
          } else {
            // No Part yet - add to Frontmatter
            if (!frontmatterNode) {
              // Create Frontmatter node on first pre-Part cell
              frontmatterNode = {
                id: 'frontmatter',
                label: 'Frontmatter',
                type: 'part',
                path: null,
                cellIndex: null,
                children: [],
                expanded: false,
                level: 1,
              };
              notebookNode.children.push(frontmatterNode);
            }

            // Add cell to Frontmatter
            frontmatterNode.children.push({
              id: `cell-${index}`,
              label: headingText,
              type: 'cell',
              path: null,
              cellIndex: index,
              children: [],
              expanded: false,
              level: 2,
            });
          }
        } else {
          // WITHOUT Part headings: Add cells directly under Notebook node
          notebookNode.children.push({
            id: `cell-${index}`,
            label: headingText,
            type: 'cell',
            path: null,
            cellIndex: index,
            children: [],
            expanded: false,
            level: 1, // Level 1 since they're direct children of Notebook
          });
        }
      }
    }
  });

  tree.push(notebookNode);

  // 3. Extract markdown paths from cells
  const markdownPaths = extractMarkdownPaths(cellsContainer);

  // 4. Create "Repository" root node if we have markdown files
  if (markdownPaths.length > 0) {
    const repoNode = {
      id: 'repository',
      label: 'Repository',
      type: 'root',
      path: null,
      cellIndex: null,
      children: [],
      expanded: true, // Open by default
      level: 0,
    };

    // Build file tree with help.md prioritized (always look for it)
    const helpPath = 'docs/help.md';
    repoNode.children = buildFileTree(markdownPaths, helpPath);

    tree.push(repoNode);
  }

  return tree;
}

/**
 * Navigation Tree Rendering Functions
 */

/**
 * Render navigation tree
 * @param {Array} tree - Tree data structure
 * @param {HTMLElement} container - Tree container element
 * @param {Object} treeState - State object with expandedNodes Set and selectedNode
 * @param {Function} onNodeClick - Click handler for tree nodes
 */
function renderNavigationTree(tree, container, treeState, onNodeClick) {
  container.innerHTML = '';

  // Filter out Repository node if it has no children (no .md files found)
  const filteredTree = tree.filter((node) => {
    if (node.id === 'repository') {
      const hasChildren = node.children && node.children.length > 0;
      if (!hasChildren) {
        console.log('🌲 Hiding Repository node - no .md files found');
        return false; // Don't render this node
      }
    }
    return true; // Render all other nodes
  });

  filteredTree.forEach((node) => {
    renderTreeNode(node, container, container, treeState, onNodeClick);
  });
}

/**
 * Render single tree node recursively
 * @param {Object} node - Tree node
 * @param {HTMLElement} parentElement - Parent DOM element
 * @param {HTMLElement} treeContainer - Root tree container (for re-rendering)
 * @param {Object} treeState - State object
 * @param {Function} onNodeClick - Click handler
 */
function renderTreeNode(node, parentElement, treeContainer, treeState, onNodeClick) {
  const isExpanded = treeState.expandedNodes.has(node.id);
  const isSelected = treeState.selectedNode === node.id;
  const hasChildren = node.children && node.children.length > 0;

  // Create node element
  const nodeEl = document.createElement('div');
  nodeEl.className = 'ipynb-nav-tree-item';
  nodeEl.dataset.type = node.type;
  nodeEl.dataset.nodeId = node.id;
  nodeEl.dataset.leaf = !hasChildren;
  nodeEl.style.setProperty('--level', node.level);

  if (isSelected) {
    nodeEl.classList.add('active');
  }

  // Expand/collapse icon (only for non-leaf nodes)
  if (hasChildren) {
    const icon = document.createElement('span');
    icon.className = 'ipynb-nav-tree-icon';
    if (isExpanded) {
      icon.classList.add('expanded');
    }
    icon.textContent = '▶'; // Right arrow
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTreeNode(node.id, treeState, treeContainer, onNodeClick);
    });
    nodeEl.appendChild(icon);
  } else {
    // Empty space for alignment
    const spacer = document.createElement('span');
    spacer.className = 'ipynb-nav-tree-icon';
    nodeEl.appendChild(spacer);
  }

  // Label
  const label = document.createElement('span');
  label.textContent = node.label;
  label.className = 'ipynb-nav-tree-label';
  nodeEl.appendChild(label);

  // Add tooltip showing full path/name
  if (node.type === 'markdown' && node.path) {
    nodeEl.setAttribute('title', node.path);
  } else if (node.type === 'folder' && node.id) {
    // Extract folder path from id (format: 'folder-path/to/folder')
    const folderPath = node.id.replace('folder-', '');
    nodeEl.setAttribute('title', folderPath);
  } else if (node.label) {
    // For cells, parts, and root nodes - show full label
    nodeEl.setAttribute('title', node.label);
  }

  // Click handler for navigation
  nodeEl.addEventListener('click', () => {
    onNodeClick(node);
  });

  parentElement.appendChild(nodeEl);

  // Render children if expanded
  if (isExpanded && hasChildren) {
    node.children.forEach((child) => {
      renderTreeNode(child, parentElement, treeContainer, treeState, onNodeClick);
    });
  }
}

/**
 * Toggle node expansion state
 * @param {string} nodeId - Node ID to toggle
 * @param {Object} treeState - State object
 * @param {HTMLElement} container - Tree container
 * @param {Function} onNodeClick - Click handler
 */
function toggleTreeNode(nodeId, treeState, container, onNodeClick) {
  if (treeState.expandedNodes.has(nodeId)) {
    treeState.expandedNodes.delete(nodeId);
  } else {
    treeState.expandedNodes.add(nodeId);
  }

  // Re-render tree
  const tree = treeState.tree;
  renderNavigationTree(tree, container, treeState, onNodeClick);
}

/**
 * Select node (highlight as active)
 * @param {string} nodeId - Node ID to select
 * @param {Object} treeState - State object
 * @param {HTMLElement} container - Tree container
 * @param {Function} onNodeClick - Click handler
 */
function selectTreeNode(nodeId, treeState, container, onNodeClick) {
  treeState.selectedNode = nodeId;

  // Re-render tree
  const tree = treeState.tree;
  renderNavigationTree(tree, container, treeState, onNodeClick);

  // Scroll to selected node
  setTimeout(() => {
    const selectedEl = container.querySelector(`[data-node-id="${nodeId}"]`);
    if (selectedEl) {
      selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

/**
 * Create full-screen overlay for paged variation
 * @param {HTMLElement} container - The notebook container
 * @param {HTMLElement} cellsContainer - Container with cells
 * @param {boolean} autorun - Whether to autorun code cells
 * @param {boolean} isNotebookMode - Whether this is notebook mode (close button always visible)
 * @param {string} [repoUrl] - Optional repository URL for markdown .md links
 * @param {string} [notebookTitle] - Optional notebook title for top bar
 * @param {string} [helpRepoUrl] - Optional help repository URL
 * @returns {object} Overlay controls
 */
function createPagedOverlay(container, cellsContainer, autorun = false, isNotebookMode = false, repoUrl = null, notebookTitle = 'Jupyter Notebook', helpRepoUrl = null, branch = 'main', hideTopbar = false) {
  const cells = Array.from(cellsContainer.querySelectorAll('.ipynb-cell'));

  if (cells.length === 0) return null;

  // Remove any existing overlays to prevent duplicates
  const existingOverlays = document.querySelectorAll('.ipynb-paged-overlay');
  existingOverlays.forEach(overlay => overlay.remove());

  // Create page groups (smart grouping)
  const pages = createPageGroups(cells);
  const totalPages = pages.length;

  // Create instance-specific navigation history (rooted in this overlay)
  const navigationHistory = [];

  // Build navigation tree (Phase 1 - Testing)
  const navigationTree = buildNavigationTree(cells, cellsContainer, helpRepoUrl);

  // TEST: Log tree structure to console
  console.log('=== Navigation Tree Structure ===');
  console.log('Tree roots:', navigationTree.length);
  navigationTree.forEach((root) => {
    console.log(`\n${root.label} (${root.type}):`);
    console.log(`  - Children: ${root.children.length}`);
    console.log(`  - Expanded: ${root.expanded}`);
    root.children.forEach((child) => {
      console.log(`    • ${child.label} (${child.type})`);
      if (child.type === 'cell') {
        console.log(`      Cell Index: ${child.cellIndex}`);
      } else if (child.type === 'markdown') {
        console.log(`      Path: ${child.path}`);
      }
    });
  });
  console.log('=================================\n');

  // Tree state management (shared across overlays)
  const treeState = {
    tree: navigationTree,
    expandedNodes: new Set(['notebook', 'repository']), // Start with root nodes expanded
    selectedNode: null,
  };

  const paginationState = {
    currentPage: 0,
    totalPages,
    pages,
    isOverlayOpen: false,
    autorun,
    navigationHistory, // Add history to state for easy access
    navigationTree, // Add tree to state
    treeState, // Add tree state to state for sharing across overlays
  };

  // Create overlay structure
  const overlay = document.createElement('div');
  overlay.className = 'ipynb-paged-overlay';
  overlay.style.display = 'none';

  // Mark overlay as notebook mode for helper functions to detect
  if (isNotebookMode) {
    overlay.setAttribute('data-notebook-mode', 'true');
  }

  const overlayContent = document.createElement('div');
  overlayContent.className = 'ipynb-paged-overlay-content';

  // Create top bar with title and controls
  const topBar = document.createElement('div');
  topBar.className = 'ipynb-overlay-top-bar';

  // Left controls section (for tree toggle and home button in notebook mode)
  const leftControlsSection = document.createElement('div');
  leftControlsSection.className = 'ipynb-overlay-controls ipynb-overlay-controls-left';

  // Tree toggle button - show/hide navigation tree
  const treeToggleButton = document.createElement('button');
  treeToggleButton.className = 'ipynb-overlay-button ipynb-tree-toggle-button';
  treeToggleButton.innerHTML = '&#9664;'; // Left arrow (◄) when open
  treeToggleButton.setAttribute('aria-label', 'Toggle navigation tree');
  treeToggleButton.setAttribute('aria-expanded', 'true');
  treeToggleButton.setAttribute('title', 'Hide Tree');

  // Title section
  const titleSection = document.createElement('div');
  titleSection.className = 'ipynb-overlay-title';
  titleSection.textContent = notebookTitle;
  titleSection.setAttribute('title', notebookTitle);

  // Right controls section
  const rightControlsSection = document.createElement('div');
  rightControlsSection.className = 'ipynb-overlay-controls ipynb-overlay-controls-right';

  // Close button (always visible, including notebook mode)
  const closeButton = document.createElement('button');
  closeButton.className = 'ipynb-overlay-button ipynb-paged-close';
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('aria-label', 'Close paged view');

  // Close button is now always visible (notebook mode fix)
  // Previously hidden in notebook mode, now always shown for better UX

  // Home button (notebook mode only) - Navigate to cell 0
  let homeButton;
  if (isNotebookMode) {
    homeButton = document.createElement('button');
    homeButton.className = 'ipynb-overlay-button ipynb-home-button';
    homeButton.innerHTML = '🏠';
    homeButton.setAttribute('aria-label', 'Go to first cell');
    homeButton.setAttribute('title', 'Home');

    // Add click handler to navigate to first page (which contains cell 0)
    homeButton.addEventListener('click', () => {
      paginationState.currentPage = 0;
      updatePageDisplay();
    });
  }

  // History button (notebook mode only) - Navigation History
  let historyButton, historyDropdown;
  if (isNotebookMode) {
    historyButton = document.createElement('button');
    historyButton.className = 'ipynb-overlay-button ipynb-history-button';
    historyButton.innerHTML = '&#128337;'; // Clock icon (🕘)
    historyButton.setAttribute('aria-label', 'Navigation History');
    historyButton.setAttribute('aria-expanded', 'false');
    historyButton.setAttribute('title', 'History');

    historyDropdown = document.createElement('div');
    historyDropdown.className = 'ipynb-history-dropdown';
    historyDropdown.setAttribute('role', 'menu');
    historyDropdown.style.display = 'none';

    // Function to update history dropdown
    const updateHistoryDropdown = () => {
      historyDropdown.innerHTML = '';

      if (navigationHistory.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'ipynb-history-empty';
        emptyMessage.textContent = 'No history yet';
        historyDropdown.appendChild(emptyMessage);
        return;
      }

      navigationHistory.forEach((entry) => {
        const menuItem = document.createElement('button');
        menuItem.className = 'ipynb-history-item';

        // Add icon based on type
        const icon = entry.type === 'cell' ? '📄' : '📝';
        menuItem.textContent = `${icon} ${entry.title}`;
        menuItem.setAttribute('role', 'menuitem');

        menuItem.addEventListener('click', () => {
          if (entry.type === 'cell' && entry.cellIndex !== null) {
            // Navigate to cell page
            // Find page containing this cell
            for (let i = 0; i < pages.length; i++) {
              const pageContainsCell = pages[i].cells.some(
                cell => parseInt(cell.dataset.cellIndex) === entry.cellIndex
              );
              if (pageContainsCell) {
                paginationState.currentPage = i;
                updatePageDisplay();
                break;
              }
            }
          } else if (entry.type === 'markdown' && entry.url) {
            // Re-open GitHub markdown overlay
            const mdOverlay = createGitHubMarkdownOverlay(entry.url, entry.title, helpRepoUrl, branch, paginationState, hideTopbar);
            mdOverlay.openOverlay();
          }
          historyDropdown.style.display = 'none';
          historyButton.setAttribute('aria-expanded', 'false');
        });

        historyDropdown.appendChild(menuItem);
      });
    };

    // Toggle history dropdown on button click
    historyButton.addEventListener('click', (e) => {
      e.stopPropagation();
      updateHistoryDropdown(); // Refresh before showing
      const isOpen = historyDropdown.style.display === 'block';
      historyDropdown.style.display = isOpen ? 'none' : 'block';
      historyButton.setAttribute('aria-expanded', !isOpen);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (historyDropdown && !historyDropdown.contains(e.target) && e.target !== historyButton) {
        historyDropdown.style.display = 'none';
        historyButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Hamburger menu (notebook mode only) - Table of Contents
  let hamburgerButton, tocDropdown;
  if (isNotebookMode) {
    hamburgerButton = document.createElement('button');
    hamburgerButton.className = 'ipynb-overlay-button ipynb-hamburger-menu';
    hamburgerButton.innerHTML = '&#9776;'; // Hamburger icon
    hamburgerButton.setAttribute('aria-label', 'Table of Contents');
    hamburgerButton.setAttribute('aria-expanded', 'false');
    hamburgerButton.setAttribute('title', 'Table of Contents');

    tocDropdown = document.createElement('div');
    tocDropdown.className = 'ipynb-toc-dropdown';
    tocDropdown.setAttribute('role', 'menu');
    tocDropdown.style.display = 'none';

    // Extract cell titles and create menu items
    const tocItems = [];
    cells.forEach((cell, index) => {
      let title = null;
      let itemType = 'content'; // 'content', 'divider', or 'skip'

      // Try to extract title from markdown cells
      if (cell.classList.contains('ipynb-markdown-cell')) {
        const content = cell.querySelector('.ipynb-cell-content');
        if (content) {
          // Check if this is a hero cell (auto-wrapped with ipynb-hero-cell class)
          const heroDiv = content.querySelector('.ipynb-hero-cell');
          const isHero = heroDiv !== null;

          // Check if this is a transition cell (auto-wrapped with ipynb-transition-card class)
          const transitionDiv = content.querySelector('.ipynb-transition-card');
          const isTransition = transitionDiv !== null;

          if (isHero) {
            itemType = 'skip'; // Don't show hero in TOC at all
          } else if (isTransition) {
            itemType = 'divider'; // Show as divider
          } else {
            // Look for headings (h1, h2, h3)
            const heading = content.querySelector('h1, h2, h3');
            if (heading) {
              title = heading.textContent.trim();
              itemType = 'content';
            } else {
              // Skip cells without headings (don't add them to TOC)
              itemType = 'skip';
            }
          }
        }
      }

      // Add to TOC based on type
      if (itemType === 'content' && title) {
        tocItems.push({ index, title, pageIndex: Math.floor(index / 1), type: 'content' });
      } else if (itemType === 'divider') {
        tocItems.push({ index, title: null, pageIndex: Math.floor(index / 1), type: 'divider' });
      }
      // Skip hero cells entirely
    });

    // Create dropdown menu items
    tocItems.forEach((item) => {
      if (item.type === 'divider') {
        // Create a horizontal divider
        const divider = document.createElement('hr');
        divider.className = 'ipynb-toc-divider';
        tocDropdown.appendChild(divider);
      } else {
        // Create a clickable menu item
        const menuItem = document.createElement('button');
        menuItem.className = 'ipynb-toc-item';
        menuItem.textContent = item.title;
        menuItem.setAttribute('role', 'menuitem');
        menuItem.setAttribute('data-page-index', item.pageIndex);

        menuItem.addEventListener('click', () => {
          paginationState.currentPage = item.pageIndex;
          updatePageDisplay();
          tocDropdown.style.display = 'none';
          hamburgerButton.setAttribute('aria-expanded', 'false');
        });

        tocDropdown.appendChild(menuItem);
      }
    });

    // Toggle dropdown on hamburger click
    hamburgerButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = tocDropdown.style.display === 'block';
      tocDropdown.style.display = isOpen ? 'none' : 'block';
      hamburgerButton.setAttribute('aria-expanded', !isOpen);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (tocDropdown && !tocDropdown.contains(e.target) && e.target !== hamburgerButton) {
        tocDropdown.style.display = 'none';
        hamburgerButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Bookmark button (notebook mode only) - Save and view bookmarks
  let bookmarkButton, bookmarkDropdown;
  if (isNotebookMode) {
    const notebookId = notebookTitle.toLowerCase().replace(/\s+/g, '-');

    bookmarkButton = document.createElement('button');
    bookmarkButton.className = 'ipynb-overlay-button ipynb-bookmark-button';
    bookmarkButton.innerHTML = '&#128278;'; // Bookmark icon (🔖)
    bookmarkButton.setAttribute('aria-label', 'Bookmarks');
    bookmarkButton.setAttribute('aria-expanded', 'false');
    bookmarkButton.setAttribute('title', 'Bookmarks');

    bookmarkDropdown = document.createElement('div');
    bookmarkDropdown.className = 'ipynb-bookmark-dropdown';
    bookmarkDropdown.setAttribute('role', 'menu');
    bookmarkDropdown.style.display = 'none';

    // Function to update bookmark dropdown
    const updateBookmarkDropdown = () => {
      bookmarkDropdown.innerHTML = '';

      const bookmarks = getBookmarks(notebookId);

      if (bookmarks.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'ipynb-bookmark-empty';
        emptyMessage.textContent = 'No bookmarks yet';
        bookmarkDropdown.appendChild(emptyMessage);
      } else {
        bookmarks.forEach((bookmark) => {
          const menuItem = document.createElement('button');
          menuItem.className = 'ipynb-bookmark-item';

          const titleSpan = document.createElement('span');
          // Display differently based on type
          if (bookmark.type === 'cell') {
            titleSpan.textContent = `📑 ${bookmark.title} (Page ${bookmark.pageIndex + 1})`;
          } else {
            // For markdown files, show just the file name
            const fileName = bookmark.url ? bookmark.url.split('/').pop() : bookmark.title;
            titleSpan.textContent = `📝 ${fileName}`;
          }

          const removeBtn = document.createElement('span');
          removeBtn.className = 'ipynb-bookmark-remove';
          removeBtn.innerHTML = '&times;';
          removeBtn.setAttribute('aria-label', 'Remove bookmark');
          removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeBookmark(notebookId, bookmark.type, bookmark.pageIndex, bookmark.url);
            updateBookmarkDropdown();
          });

          menuItem.appendChild(titleSpan);
          menuItem.appendChild(removeBtn);
          menuItem.setAttribute('role', 'menuitem');

          menuItem.addEventListener('click', () => {
            if (bookmark.type === 'cell') {
              // Navigate to cell page
              paginationState.currentPage = bookmark.pageIndex;
              updatePageDisplay();
            } else if (bookmark.type === 'markdown' && bookmark.url) {
              // Open markdown file in overlay
              const mdOverlay = createGitHubMarkdownOverlay(bookmark.url, bookmark.title, helpRepoUrl, branch, paginationState, hideTopbar);
              mdOverlay.openOverlay();
            }
            bookmarkDropdown.style.display = 'none';
            bookmarkButton.setAttribute('aria-expanded', 'false');
          });

          bookmarkDropdown.appendChild(menuItem);
        });

        // Add "Clear All" button if there are bookmarks
        const clearAllBtn = document.createElement('button');
        clearAllBtn.className = 'ipynb-bookmark-clear-all';
        clearAllBtn.textContent = 'Clear All Bookmarks';
        clearAllBtn.addEventListener('click', () => {
          if (confirm('Are you sure you want to clear all bookmarks?')) {
            clearAllBookmarks(notebookId);
            updateBookmarkDropdown();
          }
        });
        bookmarkDropdown.appendChild(clearAllBtn);
      }

      // Add "Bookmark This Page" button
      const addBookmarkBtn = document.createElement('button');
      addBookmarkBtn.className = 'ipynb-bookmark-add';
      addBookmarkBtn.textContent = '+ Bookmark This Page';
      addBookmarkBtn.addEventListener('click', () => {
        const currentPage = pages[paginationState.currentPage];
        const firstCell = currentPage.cells[0];
        let title = `Page ${paginationState.currentPage + 1}`;

        // Try to extract title from first cell
        if (firstCell && firstCell.classList.contains('ipynb-markdown-cell')) {
          const content = firstCell.querySelector('.ipynb-cell-content');
          if (content) {
            const heading = content.querySelector('h1, h2, h3');
            if (heading) {
              title = heading.textContent.trim();
            }
          }
        }

        if (saveBookmark(notebookId, title, 'cell', paginationState.currentPage, null)) {
          // Visual feedback
          bookmarkButton.style.transform = 'scale(1.2)';
          setTimeout(() => {
            bookmarkButton.style.transform = '';
          }, 200);
          updateBookmarkDropdown();
        }
      });
      bookmarkDropdown.insertBefore(addBookmarkBtn, bookmarkDropdown.firstChild);
    };

    // Toggle bookmark dropdown on button click
    bookmarkButton.addEventListener('click', (e) => {
      e.stopPropagation();
      updateBookmarkDropdown(); // Refresh before showing
      const isOpen = bookmarkDropdown.style.display === 'block';
      bookmarkDropdown.style.display = isOpen ? 'none' : 'block';
      bookmarkButton.setAttribute('aria-expanded', !isOpen);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (bookmarkDropdown && !bookmarkDropdown.contains(e.target) && e.target !== bookmarkButton) {
        bookmarkDropdown.style.display = 'none';
        bookmarkButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Help button (notebook mode only) - Opens help.md in GitHub overlay
  let helpButton;
  if (isNotebookMode && helpRepoUrl) {
    helpButton = document.createElement('button');
    helpButton.className = 'ipynb-overlay-button ipynb-help-button';
    helpButton.innerHTML = '&#10067;'; // Question mark icon (❓)
    helpButton.setAttribute('aria-label', 'Help');
    helpButton.setAttribute('title', 'Help');

    helpButton.addEventListener('click', () => {
      // Build GitHub URL using the specified branch from notebook metadata
      const helpPath = `${helpRepoUrl}/blob/${branch}/docs/help.md`;

      // Open using GitHub markdown overlay with branch parameter
      const helpOverlay = createGitHubMarkdownOverlay(helpPath, 'IPynb Viewer Help', helpRepoUrl, branch, paginationState, hideTopbar);
      helpOverlay.openOverlay();
    });
  }

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

  // Create navigation tree panel
  const navTreePanel = document.createElement('nav');
  navTreePanel.className = 'ipynb-nav-tree';
  navTreePanel.setAttribute('role', 'navigation');
  navTreePanel.setAttribute('aria-label', 'Content navigation');

  // Create main content wrapper (tree + cells)
  const mainContentWrapper = document.createElement('div');
  mainContentWrapper.className = 'ipynb-overlay-main';

  // Cell content area
  const cellContentArea = document.createElement('div');
  cellContentArea.className = 'ipynb-paged-cell-area';

  // Assemble main wrapper
  // Only add nav tree if top bar is visible (tree toggle button needs to be accessible)
  if (!hideTopbar) {
    mainContentWrapper.appendChild(navTreePanel);
  }
  mainContentWrapper.appendChild(cellContentArea);

  // Assemble top bar with left/center/right sections
  // Left section - home button first, then tree toggle
  if (isNotebookMode && homeButton) {
    leftControlsSection.appendChild(homeButton);
  }
  leftControlsSection.appendChild(treeToggleButton);

  // Right section - all other controls
  if (isNotebookMode && historyButton) {
    rightControlsSection.appendChild(historyButton);
  }
  if (isNotebookMode && bookmarkButton) {
    rightControlsSection.appendChild(bookmarkButton);
  }
  if (isNotebookMode && hamburgerButton) {
    rightControlsSection.appendChild(hamburgerButton);
  }
  if (isNotebookMode && helpButton) {
    rightControlsSection.appendChild(helpButton);
  }
  rightControlsSection.appendChild(closeButton);

  // Assemble top bar: left controls, title, right controls
  topBar.appendChild(leftControlsSection);
  topBar.appendChild(titleSection);
  topBar.appendChild(rightControlsSection);

  // Assemble overlay
  // Conditionally add top bar (hide if no-topbar variation is set)
  if (!hideTopbar) {
    overlayContent.appendChild(topBar);
  }
  if (isNotebookMode) {
    overlayContent.appendChild(historyDropdown);
    overlayContent.appendChild(bookmarkDropdown);
    overlayContent.appendChild(tocDropdown);
  }
  overlayContent.appendChild(mainContentWrapper); // Use wrapper instead of cellContentArea directly
  overlayContent.appendChild(paginationDiv);
  overlay.appendChild(overlayContent);

  // Update page display
  async function updatePageDisplay() {
    // Clear cell area
    cellContentArea.innerHTML = '';

    // Get current page group
    const currentPage = pages[paginationState.currentPage];

    // Track first cell in history (if it has a heading)
    const firstCell = currentPage.cells[0];
    if (firstCell && firstCell.classList.contains('ipynb-markdown-cell')) {
      const content = firstCell.querySelector('.ipynb-cell-content');
      if (content) {
        const heading = content.querySelector('h1, h2, h3');
        if (heading) {
          const title = heading.textContent.trim();
          const cellIndex = parseInt(firstCell.dataset.cellIndex);
          addToHistory(navigationHistory, title, 'cell', cellIndex);
        }
      }
    }

    // Clone and append all cells in this page
    for (const cell of currentPage.cells) {
      const clonedCell = cell.cloneNode(true);
      clonedCell.classList.add('active');
      cellContentArea.appendChild(clonedCell);

      // Re-attach run button handlers if it's a code cell
      if (clonedCell.classList.contains('ipynb-code-cell')) {
        const runButton = clonedCell.querySelector('.ipynb-run-button');

        // In autorun mode, automatically execute the cell
        if (paginationState.autorun) {
          await executeCodeCell(clonedCell);
        } else if (runButton) {
          // Otherwise, attach click handler
          runButton.addEventListener('click', () => {
            executeCodeCell(clonedCell);
          });
        }
      }
    }

    // Re-resolve ALL links with hash="#" in the current page (action cards, tables, lists, etc.)
    const allHashLinks = cellContentArea.querySelectorAll('a[href="#"]');
    allHashLinks.forEach(link => {
      // Re-resolve the link by finding matching heading
      const linkText = link.textContent.trim();

      // Search through ALL cells in the notebook (not just current page)
      const allCells = cellsContainer.querySelectorAll('.ipynb-cell');
      let targetCell = null;

      allCells.forEach((cell) => {
        if (targetCell) return; // Already found
        const headings = cell.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading) => {
          const headingText = heading.textContent.trim().replace(/[^\w\s]/g, '').toLowerCase();
          const searchText = linkText.replace(/[^\w\s]/g, '').toLowerCase();

          if (headingText.includes(searchText)) {
            targetCell = cell;
            if (!heading.id && cell.dataset.cellIndex) {
              heading.id = `cell-${cell.dataset.cellIndex}`;
            }
          }
        });
      });

      // Update the link
      if (targetCell && targetCell.dataset.cellIndex) {
        link.href = `#cell-${targetCell.dataset.cellIndex}`;
      }
    });

    // Add click handlers to links with hash targets for overlay navigation
    const links = cellContentArea.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        // Re-check href at click time (may have been updated by resolution)
        const target = link.getAttribute('href');

        // Only navigate if the link is resolved (not just "#" or empty)
        if (target && target !== '#' && target !== '') {
          navigateToAnchor(target);
        } else {
          // Link is unresolved - try to resolve it now
          const linkText = link.textContent.trim();
          const allCells = cellsContainer.querySelectorAll('.ipynb-cell');
          let targetCell = null;

          allCells.forEach((cell) => {
            if (targetCell) return;
            const headings = cell.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headings.forEach((heading) => {
              const headingText = heading.textContent.trim().replace(/[^\w\s]/g, '').toLowerCase();
              const searchText = linkText.replace(/[^\w\s]/g, '').toLowerCase();

              if (headingText.includes(searchText)) {
                targetCell = cell;
                if (!heading.id && cell.dataset.cellIndex) {
                  heading.id = `cell-${cell.dataset.cellIndex}`;
                }
              }
            });
          });

          // If we found a match, update the link and navigate
          if (targetCell && targetCell.dataset.cellIndex) {
            const newTarget = `#cell-${targetCell.dataset.cellIndex}`;
            link.href = newTarget;
            navigateToAnchor(newTarget);
          }
        }
      });
    });

    // Re-attach click handlers for GitHub markdown links (lost during cloning)
    const githubMdLinks = cellContentArea.querySelectorAll('.ipynb-github-md-link');
    githubMdLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const githubUrl = link.dataset.mdUrl; // Get URL from data attribute
        const linkBranch = link.dataset.branch || branch; // Get branch from link or use default
        const title = link.textContent || 'GitHub Markdown';
        const overlay = createGitHubMarkdownOverlay(githubUrl, title, helpRepoUrl, linkBranch, paginationState, hideTopbar);
        overlay.openOverlay();
      });
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

    // Update tree selection to match current page
    if (currentPage && currentPage.cells.length > 0) {
      const firstCellIndex = parseInt(currentPage.cells[0].dataset.cellIndex);
      const notebookRoot = navigationTree.find(root => root.id === 'notebook');

      // Search for cell in notebook tree (might be nested in Parts)
      let cellNode = null;
      const searchChildren = (nodes) => {
        for (const node of nodes) {
          if (node.cellIndex === firstCellIndex) {
            return node;
          }
          if (node.children && node.children.length > 0) {
            const found = searchChildren(node.children);
            if (found) return found;
          }
        }
        return null;
      };

      if (notebookRoot) {
        cellNode = searchChildren(notebookRoot.children);
      }

      if (cellNode) {
        selectTreeNode(cellNode.id, treeState, navTreePanel, handleTreeNodeClick);
      }
    }

    // Scroll to top of cell area (not overlayContent)
    cellContentArea.scrollTop = 0;
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

  // Tree state is now defined earlier and included in paginationState for sharing

  // Tree navigation handler
  function handleTreeNodeClick(node) {
    // Root nodes, folder nodes, and part nodes: do nothing on node click (only icon should toggle)
    if (node.type === 'root' || node.type === 'folder' || node.type === 'part') {
      return;
    }

    // Cell nodes: navigate to the page containing that cell
    if (node.type === 'cell' && node.cellIndex !== null) {
      // Find the page that contains this cell
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const hasCell = page.cells.some(cell => {
          return parseInt(cell.dataset.cellIndex) === node.cellIndex;
        });

        if (hasCell) {
          // Navigate to this page
          paginationState.currentPage = i;
          updatePageDisplay();

          // Select this node in tree
          selectTreeNode(node.id, treeState, navTreePanel, handleTreeNodeClick);
          return;
        }
      }
    }

    // Markdown nodes: open in overlay
    if (node.type === 'markdown' && node.path) {
      // Use repoUrl from closure scope (passed to createPagedOverlay)
      const mdRepoUrl = repoUrl || 'https://github.com/ddttom/allaboutV2';
      const fullUrl = `${mdRepoUrl}/blob/${branch}/${node.path}`;

      // Create extended history context with tree references
      const historyContext = {
        historyArray: navigationHistory, // Keep the actual array
        navigationTree, // Reference to the tree for dynamic updates
        navTreePanel, // Tree panel element for re-rendering
        treeState, // Tree state for expand/collapse
        handleTreeNodeClick, // Click handler for tree nodes
      };

      // Open using GitHub markdown overlay
      const mdOverlay = createGitHubMarkdownOverlay(fullUrl, node.label, mdRepoUrl, branch, historyContext);
      mdOverlay.openOverlay();

      // Select this node in tree
      selectTreeNode(node.id, treeState, navTreePanel, handleTreeNodeClick);
    }
  }

  // Open overlay
  function openOverlay() {
    paginationState.isOverlayOpen = true;
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    updatePageDisplay();

    // Render navigation tree
    renderNavigationTree(navigationTree, navTreePanel, treeState, handleTreeNodeClick);

    // Auto-select current page in tree
    const currentPage = pages[paginationState.currentPage];
    if (currentPage && currentPage.cells.length > 0) {
      const firstCellIndex = parseInt(currentPage.cells[0].dataset.cellIndex);
      const notebookRoot = navigationTree.find(root => root.id === 'notebook');

      // Search for cell in notebook tree (might be nested in Parts)
      const searchChildren = (nodes) => {
        for (const node of nodes) {
          if (node.cellIndex === firstCellIndex) {
            return node;
          }
          if (node.children && node.children.length > 0) {
            const found = searchChildren(node.children);
            if (found) return found;
          }
        }
        return null;
      };

      let cellNode = null;
      if (notebookRoot) {
        cellNode = searchChildren(notebookRoot.children);
      }

      if (cellNode) {
        selectTreeNode(cellNode.id, treeState, navTreePanel, handleTreeNodeClick);
      }
    }
  }

  // Close overlay
  function closeOverlay() {
    paginationState.isOverlayOpen = false;
    overlay.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
    // Remove keyboard event listener to prevent memory leaks
    document.removeEventListener('keydown', keyHandler);
  }

  // Button event listeners
  prevButton.addEventListener('click', goToPrevPage);
  nextButton.addEventListener('click', goToNextPage);
  closeButton.addEventListener('click', closeOverlay);

  // Tree toggle button handler
  treeToggleButton.addEventListener('click', () => {
    const isVisible = navTreePanel.style.display !== 'none';
    if (isVisible) {
      // Hide tree - show right arrow (►) to indicate it can be opened
      navTreePanel.style.display = 'none';
      treeToggleButton.innerHTML = '&#9654;'; // Right arrow (►)
      treeToggleButton.setAttribute('aria-expanded', 'false');
      treeToggleButton.setAttribute('title', 'Show Tree');
      console.log('🌲 Tree hidden');
    } else {
      // Show tree - show left arrow (◄) to indicate it can be closed
      navTreePanel.style.display = '';
      treeToggleButton.innerHTML = '&#9664;'; // Left arrow (◄)
      treeToggleButton.setAttribute('aria-expanded', 'true');
      treeToggleButton.setAttribute('title', 'Hide Tree');
      console.log('🌲 Tree shown');
    }
  });

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

  // Navigate to an anchor within the overlay
  function navigateToAnchor(target) {
    if (!paginationState.isOverlayOpen) return;

    // Find the page that contains an element with the target ID
    const targetId = target.replace('#', '');

    // If targetId is empty, don't navigate
    if (!targetId) {
      console.warn('Cannot navigate to empty target');
      return;
    }

    // Search through all pages to find the one containing the target ID
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      // Check if any cell in this page contains the target ID
      const hasTarget = page.cells.some(cell => {
        // Use both querySelector and textContent search for robustness
        const hasId = cell.querySelector(`#${targetId}`) !== null;

        // Also check if cell contains an h2 that would generate this ID
        const headers = cell.querySelectorAll('h2');
        const hasMatchingHeader = Array.from(headers).some(h2 => {
          const generatedId = h2.textContent
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')
            .trim();
          return generatedId === targetId || h2.id === targetId;
        });

        return hasId || hasMatchingHeader;
      });

      if (hasTarget) {
        // Navigate to this page
        paginationState.currentPage = i;
        updatePageDisplay();
        return;
      }
    }

    console.log(`Navigation target not found: ${targetId}`);
  }

  // Append overlay to body
  document.body.appendChild(overlay);

  return {
    openOverlay,
    closeOverlay,
    navigateToAnchor,
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
 * Convert GitHub blob URL to raw content URL, or return local path as-is
 * @param {string} blobUrl - GitHub blob URL or local path
 * @param {string} [branch='main'] - GitHub branch to use (only applies to GitHub URLs)
 * @returns {string} Raw content URL or local path
 */
function convertToRawUrl(blobUrl, branch = 'main') {
  // If it's a local path (starts with /), return as-is
  if (blobUrl.startsWith('/')) {
    return blobUrl;
  }

  // Convert: https://github.com/user/repo/blob/main/path/file.md
  // To: https://raw.githubusercontent.com/user/repo/{branch}/path/file.md
  const rawUrl = blobUrl
    .replace('github.com', 'raw.githubusercontent.com')
    .replace('/blob/', '/');

  // The branch is already in the URL from the calling code, so just return it
  // No need to do any branch replacement
  return rawUrl;
}

/**
 * Create GitHub markdown overlay for displaying markdown files from GitHub
 * @param {string} githubUrl - Full GitHub blob URL or local path
 * @param {string} title - Title to display in overlay header
 * @param {string} [helpRepoUrl] - Optional help repository URL
 * @param {string} [branch='main'] - GitHub branch to use
 * @param {Array} [parentHistory=null] - Optional parent overlay's history array
 * @returns {Object} Object with openOverlay and closeOverlay functions
 */
function createGitHubMarkdownOverlay(githubUrl, title, helpRepoUrl = null, branch = 'main', parentHistory = null, hideTopbar = false) {
  // Create overlay container
  const overlay = document.createElement('div');
  overlay.className = 'ipynb-manual-overlay ipynb-github-md-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'GitHub markdown viewer');

  // Create overlay content - full viewport
  const overlayContent = document.createElement('div');
  overlayContent.className = 'ipynb-manual-overlay-content ipynb-paged-overlay-content';

  // Create navigation tree panel (left side)
  const navTreePanel = document.createElement('div');
  navTreePanel.className = 'ipynb-nav-tree-panel';
  navTreePanel.setAttribute('role', 'navigation');
  navTreePanel.setAttribute('aria-label', 'Navigation tree');

  // Use parent's tree state if available (to maintain expand/collapse state across overlays)
  // Otherwise create a new one (fallback for when there's no parent)
  let treeState;
  if (parentHistory && typeof parentHistory === 'object' && parentHistory.treeState) {
    treeState = parentHistory.treeState;
    console.log('🌲 Using parent treeState - expandedNodes:', Array.from(treeState.expandedNodes));
  } else {
    treeState = {
      expandedNodes: new Set(['repository']), // Repository root expanded by default
      selectedNode: null,
    };
    console.log('🌲 Created new treeState');
  }

  // Create top bar with title and controls (three-section layout)
  const topBar = document.createElement('div');
  topBar.className = 'ipynb-overlay-top-bar';

  // Left controls section - tree toggle and home button
  const leftControlsSection = document.createElement('div');
  leftControlsSection.className = 'ipynb-overlay-controls ipynb-overlay-controls-left';

  // Tree toggle button - show/hide navigation tree
  const treeToggleButton = document.createElement('button');
  treeToggleButton.className = 'ipynb-overlay-button ipynb-tree-toggle-button';
  treeToggleButton.innerHTML = '&#9664;'; // Left arrow (◄) when open
  treeToggleButton.setAttribute('aria-label', 'Toggle navigation tree');
  treeToggleButton.setAttribute('aria-expanded', 'true');
  treeToggleButton.setAttribute('title', 'Hide Tree');

  // Home button - navigate to first opened markdown
  const homeButton = document.createElement('button');
  homeButton.className = 'ipynb-overlay-button ipynb-home-button';
  homeButton.innerHTML = '🏠';
  homeButton.setAttribute('aria-label', 'Go to first page');
  homeButton.setAttribute('title', 'Home');

  leftControlsSection.appendChild(homeButton);
  leftControlsSection.appendChild(treeToggleButton);

  // Title section
  const titleSection = document.createElement('div');
  titleSection.className = 'ipynb-overlay-title';
  titleSection.textContent = title;
  titleSection.setAttribute('title', title);

  // Right controls section
  const rightControlsSection = document.createElement('div');
  rightControlsSection.className = 'ipynb-overlay-controls ipynb-overlay-controls-right';

  // History button - Navigation History
  const historyButton = document.createElement('button');
  historyButton.className = 'ipynb-overlay-button ipynb-history-button';
  historyButton.innerHTML = '&#128337;'; // Clock icon (🕘)
  historyButton.setAttribute('aria-label', 'Navigation History');
  historyButton.setAttribute('aria-expanded', 'false');
  historyButton.setAttribute('title', 'History');

  const historyDropdown = document.createElement('div');
  historyDropdown.className = 'ipynb-history-dropdown';
  historyDropdown.setAttribute('role', 'menu');
  historyDropdown.style.display = 'none';

  // Bookmark button - Save GitHub markdown pages
  const bookmarkButton = document.createElement('button');
  bookmarkButton.className = 'ipynb-overlay-button ipynb-bookmark-button';
  bookmarkButton.innerHTML = '&#128278;'; // Bookmark icon (🔖)
  bookmarkButton.setAttribute('aria-label', 'Bookmarks');
  bookmarkButton.setAttribute('aria-expanded', 'false');
  bookmarkButton.setAttribute('title', 'Bookmarks');

  const bookmarkDropdown = document.createElement('div');
  bookmarkDropdown.className = 'ipynb-bookmark-dropdown';
  bookmarkDropdown.setAttribute('role', 'menu');
  bookmarkDropdown.style.display = 'none';

  // Hamburger menu (TOC) button - Table of contents
  const hamburgerButton = document.createElement('button');
  hamburgerButton.className = 'ipynb-overlay-button ipynb-hamburger-menu';
  hamburgerButton.innerHTML = '&#9776;'; // Hamburger icon (≡)
  hamburgerButton.setAttribute('aria-label', 'Table of Contents');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('title', 'TOC');

  const tocDropdown = document.createElement('div');
  tocDropdown.className = 'ipynb-toc-dropdown';
  tocDropdown.setAttribute('role', 'menu');
  tocDropdown.style.display = 'none';

  // Help button - Opens help.md
  let helpButton = null;
  if (helpRepoUrl) {
    helpButton = document.createElement('button');
    helpButton.className = 'ipynb-overlay-button ipynb-help-button';
    helpButton.innerHTML = '&#10067;'; // Question mark icon (❓)
    helpButton.setAttribute('aria-label', 'Help');
    helpButton.setAttribute('title', 'Help');
  }

  // Close button
  const closeButton = document.createElement('button');
  closeButton.className = 'ipynb-overlay-button';
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('aria-label', 'Close markdown viewer');

  // Assemble top bar: left controls, title, right controls
  rightControlsSection.appendChild(historyButton);
  rightControlsSection.appendChild(bookmarkButton);
  rightControlsSection.appendChild(hamburgerButton);
  if (helpButton) {
    rightControlsSection.appendChild(helpButton);
  }
  rightControlsSection.appendChild(closeButton);

  topBar.appendChild(leftControlsSection);
  topBar.appendChild(titleSection);
  topBar.appendChild(rightControlsSection);

  // Conditionally add top bar (hide if no-topbar variation is set)
  if (!hideTopbar) {
    overlayContent.appendChild(topBar);
  }

  // Append dropdowns (float above content)
  overlayContent.appendChild(historyDropdown);
  overlayContent.appendChild(bookmarkDropdown);
  overlayContent.appendChild(tocDropdown);

  // Create main wrapper (tree + content side by side)
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'ipynb-overlay-main';

  // Append navigation tree panel (left side, inside flex wrapper)
  // Only add tree if top bar is visible (tree toggle needs to be accessible)
  if (!hideTopbar) {
    mainWrapper.appendChild(navTreePanel);
  }

  // Create content area for markdown (right side, inside flex wrapper)
  const contentArea = document.createElement('div');
  contentArea.className = 'ipynb-manual-content-area ipynb-overlay-content ipynb-paged-cell-area';
  mainWrapper.appendChild(contentArea);

  overlayContent.appendChild(mainWrapper);
  overlay.appendChild(overlayContent);

  // Convert blob URL to raw URL (using specified branch)
  const rawUrl = convertToRawUrl(githubUrl, branch);

  // Storage key for bookmarks (based on GitHub URL)
  const bookmarkId = `github-md-${btoa(githubUrl).substring(0, 20)}`;

  // Home button handler - Navigate to initial markdown page
  const firstPageUrl = githubUrl;
  const firstPageTitle = title;
  homeButton.addEventListener('click', () => {
    // Close current overlay and open first page
    closeOverlay();
    const homeOverlay = createGitHubMarkdownOverlay(firstPageUrl, firstPageTitle, helpRepoUrl, branch, parentHistory);
    homeOverlay.openOverlay();
  });

  // History button handlers
  const updateHistoryDropdown = () => {
    historyDropdown.innerHTML = '';

    if (!parentHistory || parentHistory.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'ipynb-history-empty';
      emptyMessage.textContent = 'No history yet';
      historyDropdown.appendChild(emptyMessage);
      return;
    }

    parentHistory.forEach((entry) => {
      const menuItem = document.createElement('button');
      menuItem.className = 'ipynb-history-item';

      // Add icon based on type
      const icon = entry.type === 'markdown' ? '📝' : '📄';
      menuItem.textContent = `${icon} ${entry.title}`;
      menuItem.setAttribute('role', 'menuitem');

      menuItem.addEventListener('click', () => {
        if (entry.type === 'markdown' && entry.url) {
          // Close current overlay and open historical markdown
          closeOverlay();
          const histOverlay = createGitHubMarkdownOverlay(entry.url, entry.title, helpRepoUrl, branch, parentHistory);
          histOverlay.openOverlay();
        }
        historyDropdown.style.display = 'none';
        historyButton.setAttribute('aria-expanded', 'false');
      });

      historyDropdown.appendChild(menuItem);
    });
  };

  historyButton.addEventListener('click', (e) => {
    e.stopPropagation();
    updateHistoryDropdown();
    const isOpen = historyDropdown.style.display === 'block';
    historyDropdown.style.display = isOpen ? 'none' : 'block';
    historyButton.setAttribute('aria-expanded', !isOpen);
  });

  // Bookmark button handlers
  const updateBookmarkDropdown = () => {
    bookmarkDropdown.innerHTML = '';

    const bookmarks = getBookmarks(bookmarkId);

    // Add "Bookmark this page" button at the top
    const addBookmarkBtn = document.createElement('button');
    addBookmarkBtn.className = 'ipynb-bookmark-item ipynb-add-bookmark';
    addBookmarkBtn.textContent = '+ Bookmark this page';
    addBookmarkBtn.setAttribute('role', 'menuitem');

    addBookmarkBtn.addEventListener('click', () => {
      // Save markdown file as bookmark
      const success = saveBookmark(bookmarkId, title, 'markdown', null, githubUrl);
      if (success) {
        updateBookmarkDropdown();
      }
    });

    if (bookmarks.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'ipynb-bookmark-empty';
      emptyMessage.textContent = 'No bookmarks yet';
      bookmarkDropdown.appendChild(addBookmarkBtn);
      bookmarkDropdown.appendChild(emptyMessage);
      return;
    }

    // Add existing bookmarks
    bookmarks.forEach((bookmark) => {
      const menuItem = document.createElement('button');
      menuItem.className = 'ipynb-bookmark-item';
      menuItem.textContent = `🔖 ${bookmark.title}`;
      menuItem.setAttribute('role', 'menuitem');

      menuItem.addEventListener('click', () => {
        if (bookmark.url) {
          // Close current overlay and open bookmarked markdown
          closeOverlay();
          const bmOverlay = createGitHubMarkdownOverlay(bookmark.url, bookmark.title, helpRepoUrl, branch, parentHistory);
          bmOverlay.openOverlay();
        }
        bookmarkDropdown.style.display = 'none';
        bookmarkButton.setAttribute('aria-expanded', 'false');
      });

      bookmarkDropdown.appendChild(menuItem);
    });

    // Add "Bookmark this page" button at the top
    bookmarkDropdown.insertBefore(addBookmarkBtn, bookmarkDropdown.firstChild);
  };

  bookmarkButton.addEventListener('click', (e) => {
    e.stopPropagation();
    updateBookmarkDropdown();
    const isOpen = bookmarkDropdown.style.display === 'block';
    bookmarkDropdown.style.display = isOpen ? 'none' : 'block';
    bookmarkButton.setAttribute('aria-expanded', !isOpen);
  });

  // Hamburger (TOC) button handlers - will be populated after markdown is loaded
  const updateTocDropdown = () => {
    tocDropdown.innerHTML = '';

    // Find all headings in the content area
    const headings = contentArea.querySelectorAll('h1, h2, h3, h4, h5, h6');

    if (headings.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'ipynb-toc-empty';
      emptyMessage.textContent = 'No headings found';
      tocDropdown.appendChild(emptyMessage);
      return;
    }

    headings.forEach((heading) => {
      const menuItem = document.createElement('button');
      menuItem.className = `ipynb-toc-item ipynb-toc-${heading.tagName.toLowerCase()}`;
      menuItem.textContent = heading.textContent.trim();
      menuItem.setAttribute('role', 'menuitem');

      menuItem.addEventListener('click', () => {
        // Scroll to heading
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        tocDropdown.style.display = 'none';
        hamburgerButton.setAttribute('aria-expanded', 'false');
      });

      tocDropdown.appendChild(menuItem);
    });
  };

  hamburgerButton.addEventListener('click', (e) => {
    e.stopPropagation();
    updateTocDropdown();
    const isOpen = tocDropdown.style.display === 'block';
    tocDropdown.style.display = isOpen ? 'none' : 'block';
    hamburgerButton.setAttribute('aria-expanded', !isOpen);
  });

  // Help button handler
  if (helpButton && helpRepoUrl) {
    helpButton.addEventListener('click', () => {
      // Build GitHub URL using the specified branch
      const helpPath = `${helpRepoUrl}/blob/${branch}/docs/help.md`;
      // Close current overlay and open help
      closeOverlay();
      const helpOverlay = createGitHubMarkdownOverlay(helpPath, 'IPynb Viewer Help', helpRepoUrl, branch, parentHistory);
      helpOverlay.openOverlay();
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (historyDropdown && !historyDropdown.contains(e.target) && e.target !== historyButton) {
      historyDropdown.style.display = 'none';
      historyButton.setAttribute('aria-expanded', 'false');
    }
    if (bookmarkDropdown && !bookmarkDropdown.contains(e.target) && e.target !== bookmarkButton) {
      bookmarkDropdown.style.display = 'none';
      bookmarkButton.setAttribute('aria-expanded', 'false');
    }
    if (tocDropdown && !tocDropdown.contains(e.target) && e.target !== hamburgerButton) {
      tocDropdown.style.display = 'none';
      hamburgerButton.setAttribute('aria-expanded', 'false');
    }
  });

  // Open/close functions
  const openOverlay = async () => {
    // Fetch and display markdown
    try {
      contentArea.innerHTML = '<div class="ipynb-loading">Loading markdown...</div>';

      // Fetch from GitHub raw URL (single source of truth from repo metadata)
      // Local dev server will proxy to production or serve local file if available
      const response = await fetch(rawUrl);
      if (!response.ok) {
        throw new Error(`Failed to load markdown: ${response.status}`);
      }
      const markdownText = await response.text();

      // Extract current file path AND repo URL from GitHub URL for relative link resolution
      // GitHub URL format: https://github.com/user/repo/blob/branch/path/to/file.md
      let currentFilePath = null;
      let currentRepoUrl = helpRepoUrl; // Default to help repo as fallback

      if (githubUrl.includes('/blob/')) {
        // Extract file path
        const pathMatch = githubUrl.match(/\/blob\/[^/]+\/(.+)$/);
        if (pathMatch) {
          currentFilePath = pathMatch[1]; // Extract path after /blob/branch/
          console.log('📍 Current file path for relative resolution:', currentFilePath);
        }

        // Extract repo URL (everything before /blob/)
        const repoMatch = githubUrl.match(/^(https:\/\/github\.com\/[^/]+\/[^/]+)\/blob\//);
        if (repoMatch) {
          currentRepoUrl = repoMatch[1]; // Extract https://github.com/user/repo
          console.log('📍 Current repo URL:', currentRepoUrl);
        }
      } else {
        console.warn('⚠️  GitHub URL does not contain /blob/, cannot extract path:', githubUrl);
      }

      // Render markdown with CURRENT repo URL (not help repo!) to generate smart links
      console.log('🔗 Parsing markdown with:', { repoUrl: currentRepoUrl, branch, currentFilePath });
      contentArea.innerHTML = parseMarkdown(markdownText, currentRepoUrl, branch, currentFilePath);

      // Process smart links in the rendered markdown
      // 1. Resolve hash links (internal navigation)
      const hashLinks = contentArea.querySelectorAll('a[href^="#"]');
      hashLinks.forEach(link => {
        const linkText = link.textContent.trim();
        const headings = contentArea.querySelectorAll('h1, h2, h3, h4, h5, h6');

        headings.forEach(heading => {
          const headingText = heading.textContent.trim().replace(/[^\w\s]/g, '').toLowerCase();
          const searchText = linkText.replace(/[^\w\s]/g, '').toLowerCase();

          if (headingText.includes(searchText)) {
            // Generate ID if not present
            if (!heading.id) {
              heading.id = headingText.replace(/\s+/g, '-');
            }
            // Update link to point to heading
            link.href = `#${heading.id}`;
          }
        });

        // Add click handler for smooth scrolling
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').replace('#', '');
          if (targetId) { // Only try to scroll if there's an actual target ID
            const target = contentArea.querySelector(`#${targetId}`);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });

      // 2. Add click handlers for GitHub markdown links (.md files)
      const githubMdLinks = contentArea.querySelectorAll('.ipynb-github-md-link');
      githubMdLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const linkUrl = link.dataset.mdUrl; // Get URL from data attribute
          const linkBranch = link.dataset.branch || branch; // Get branch from link or use default
          const linkTitle = link.textContent || 'GitHub Markdown';
          const nestedOverlay = createGitHubMarkdownOverlay(linkUrl, linkTitle, helpRepoUrl, linkBranch, parentHistory);
          nestedOverlay.openOverlay();
        });
      });

      // 3. Scan for new markdown smart links and add to navigation tree
      const newMarkdownPaths = extractMarkdownPathsFromElement(contentArea);
      if (newMarkdownPaths.length > 0) {
        console.log('🌲 Found new markdown paths to add to tree:', newMarkdownPaths);
        // Check if parentHistory is a context object with tree references
        if (parentHistory && typeof parentHistory === 'object' && parentHistory.navigationTree) {
          console.log('🌲 Adding', newMarkdownPaths.length, 'new paths to navigation tree');
          addMarkdownPathsToTree(parentHistory.navigationTree, newMarkdownPaths);
          // Note: Don't re-render parent's tree here - it will be rendered in this overlay's tree
        }
      }

      // 4. Render navigation tree in this overlay (if we have tree context from parent)
      console.log('🌲 GitHub overlay - checking for tree context:', {
        hasParentHistory: !!parentHistory,
        isObject: typeof parentHistory === 'object',
        hasNavigationTree: parentHistory?.navigationTree ? true : false,
        treeLength: parentHistory?.navigationTree?.length
      });

      if (parentHistory && typeof parentHistory === 'object' && parentHistory.navigationTree) {
        console.log('🌲 Rendering tree in GitHub overlay with', parentHistory.navigationTree.length, 'root nodes');

        // Store tree reference in treeState if not already present (required for toggleTreeNode function)
        if (!treeState.tree) {
          treeState.tree = parentHistory.navigationTree;
        }

        // Create node click handler for this overlay's tree
        const handleTreeNodeClick = (node) => {
          if (node.type === 'markdown' && node.path) {
            const mdRepoUrl = helpRepoUrl || 'https://github.com/ddttom/allaboutV2';
            const fullUrl = `${mdRepoUrl}/blob/${branch}/${node.path}`;

            // Close current overlay and open new one
            closeOverlay();
            const newOverlay = createGitHubMarkdownOverlay(fullUrl, node.label, helpRepoUrl, branch, parentHistory);
            newOverlay.openOverlay();

            // Select this node in tree
            selectTreeNode(node.id, treeState, navTreePanel, handleTreeNodeClick);
          }
        };

        // Render the tree in THIS overlay's tree panel
        renderNavigationTree(parentHistory.navigationTree, navTreePanel, treeState, handleTreeNodeClick);
        console.log('✅ Tree rendered in GitHub overlay');
      } else {
        console.warn('⚠️  No tree context available for GitHub overlay');
      }

      // Add to history (use parent overlay's history if available)
      if (parentHistory) {
        const historyArray = parentHistory.historyArray || parentHistory; // Support both context object and direct array
        if (Array.isArray(historyArray)) {
          addToHistory(historyArray, title, 'markdown', null, githubUrl);
        }
      }

      // Show overlay
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    } catch (error) {
      console.error('Failed to load markdown:', error);
      contentArea.innerHTML = `<div class="ipynb-error">Failed to load markdown from GitHub: ${error.message}<br><br>URL: ${rawUrl}</div>`;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  };

  const closeOverlay = () => {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  };

  // Tree toggle button handler
  treeToggleButton.addEventListener('click', () => {
    const isVisible = navTreePanel.style.display !== 'none';
    if (isVisible) {
      // Hide tree - show right arrow (►) to indicate it can be opened
      navTreePanel.style.display = 'none';
      treeToggleButton.innerHTML = '&#9654;'; // Right arrow (►)
      treeToggleButton.setAttribute('aria-expanded', 'false');
      treeToggleButton.setAttribute('title', 'Show Tree');
      console.log('🌲 Tree hidden');
    } else {
      // Show tree - show left arrow (◄) to indicate it can be closed
      navTreePanel.style.display = '';
      treeToggleButton.innerHTML = '&#9664;'; // Left arrow (◄)
      treeToggleButton.setAttribute('aria-expanded', 'true');
      treeToggleButton.setAttribute('title', 'Hide Tree');
      console.log('🌲 Tree shown');
    }
  });

  // Close button handler
  closeButton.addEventListener('click', closeOverlay);

  // Close on overlay click (but not content click)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });

  // Escape key handler
  const keyHandler = (e) => {
    if (e.key === 'Escape' && overlay.style.display === 'flex') {
      closeOverlay();
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
 * Decorate the ipynb-viewer block
 * @param {HTMLElement} block - Block element
 */
export default async function decorate(block) {
  // Configuration
  const config = {
    errorMessage: 'Failed to load notebook',
    loadingMessage: 'Loading notebook...',
  };

  // Detect variations
  const isPaged = block.classList.contains('paged');
  const isAutorun = block.classList.contains('autorun');
  const isNotebook = block.classList.contains('notebook'); // Combines manual and paged (no autorun), close button visible
  const isIndex = block.classList.contains('index'); // Auto-opens overlay without button click
  const isNoTopbar = block.classList.contains('no-topbar'); // Hides the top bar (buttons and title)

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

    // Set repo attribute if available in metadata
    if (notebook.metadata?.repo) {
      block.setAttribute('data-repo', notebook.metadata.repo);
    }

    // Set github-branch attribute if available in metadata (defaults to 'main')
    const githubBranch = notebook.metadata?.['github-branch'] || 'main';
    block.setAttribute('data-github-branch', githubBranch);

    // Set help-repo attribute if available in metadata
    // Falls back to repo, then to allaboutV2 default
    if (notebook.metadata?.['help-repo']) {
      block.setAttribute('data-help-repo', notebook.metadata['help-repo']);
    } else if (notebook.metadata?.repo) {
      block.setAttribute('data-help-repo', notebook.metadata.repo);
    } else {
      block.setAttribute('data-help-repo', 'https://github.com/ddttom/allaboutV2');
    }

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

    // Add description if available
    if (notebook.metadata?.description) {
      const description = document.createElement('div');
      description.className = 'ipynb-viewer-description';
      description.textContent = notebook.metadata.description;
      header.appendChild(description);
    }

    // Add author if available
    if (notebook.metadata?.author) {
      const author = document.createElement('div');
      author.className = 'ipynb-viewer-author';
      author.textContent = `By ${notebook.metadata.author}`;
      header.appendChild(author);
    }

    // Add creation date if available (supports both 'creation-date' and 'date' for backward compatibility)
    const creationDate = notebook.metadata?.['creation-date'] || notebook.metadata?.date;
    if (creationDate) {
      const date = document.createElement('div');
      date.className = 'ipynb-viewer-creation-date';
      date.textContent = `Created: ${creationDate}`;
      header.appendChild(date);
    }

    // Add version if available
    if (notebook.metadata?.version) {
      const version = document.createElement('div');
      version.className = 'ipynb-viewer-version';
      version.textContent = `Version ${notebook.metadata.version}`;
      header.appendChild(version);
    }

    // Add last-modified if available
    if (notebook.metadata?.['last-modified']) {
      const lastModified = document.createElement('div');
      lastModified.className = 'ipynb-viewer-last-modified';
      lastModified.textContent = `Last modified: ${notebook.metadata['last-modified']}`;
      header.appendChild(lastModified);
    }

    // Create metadata row for category, difficulty, duration
    const metaRow = document.createElement('div');
    metaRow.className = 'ipynb-viewer-meta-row';
    let hasMetaRow = false;

    if (notebook.metadata?.category) {
      const category = document.createElement('span');
      category.className = 'ipynb-viewer-category';
      category.textContent = notebook.metadata.category;
      metaRow.appendChild(category);
      hasMetaRow = true;
    }

    if (notebook.metadata?.difficulty) {
      const difficulty = document.createElement('span');
      difficulty.className = 'ipynb-viewer-difficulty';
      difficulty.textContent = notebook.metadata.difficulty;
      metaRow.appendChild(difficulty);
      hasMetaRow = true;
    }

    if (notebook.metadata?.duration) {
      const duration = document.createElement('span');
      duration.className = 'ipynb-viewer-duration';
      duration.textContent = notebook.metadata.duration;
      metaRow.appendChild(duration);
      hasMetaRow = true;
    }

    if (hasMetaRow) {
      header.appendChild(metaRow);
    }

    // Add tags if available
    if (notebook.metadata?.tags && Array.isArray(notebook.metadata.tags) && notebook.metadata.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'ipynb-viewer-tags';

      notebook.metadata.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'ipynb-viewer-tag';
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
      });

      header.appendChild(tagsContainer);
    }

    // Add license if available
    if (notebook.metadata?.license) {
      const license = document.createElement('div');
      license.className = 'ipynb-viewer-license';
      license.textContent = `License: ${notebook.metadata.license}`;
      header.appendChild(license);
    }

    // Create cells container
    const cellsContainer = document.createElement('div');
    cellsContainer.className = 'ipynb-cells-container';

    // Process cells
    if (!notebook.cells || notebook.cells.length === 0) {
      throw new Error('Notebook has no cells');
    }

    // Determine if autorun should be enabled
    // Notebook mode no longer autoruns - user must manually run cells
    const shouldAutorun = isAutorun;

    // Extract repo URL from metadata for linking .md files
    const repoUrl = notebook.metadata?.repo || null;

    // Note: githubBranch already extracted above at line 2282

    // Extract help-repo URL from metadata for help button
    // Falls back to repo, then to allaboutV2 default
    const helpRepoUrl = notebook.metadata?.['help-repo'] ||
                        notebook.metadata?.repo ||
                        'https://github.com/ddttom/allaboutV2';

    notebook.cells.forEach(async (cell, index) => {
      let cellElement;

      if (cell.cell_type === 'markdown') {
        cellElement = createMarkdownCell(cell, index, repoUrl, isNotebook, helpRepoUrl, githubBranch);
      } else if (cell.cell_type === 'code') {
        cellElement = createCodeCell(cell, index, shouldAutorun);

        // Add click handler for run button (if not autorun)
        if (!shouldAutorun) {
          const runButton = cellElement.querySelector('.ipynb-run-button');
          if (runButton) {
            runButton.addEventListener('click', () => {
              executeCodeCell(cellElement);
            });
          }
        } else {
          // In autorun mode, execute immediately in default view
          if (!isPaged && !isNotebook) {
            await executeCodeCell(cellElement);
          }
        }
      }

      if (cellElement) {
        cellsContainer.appendChild(cellElement);
      }
    });

    // Assemble container
    container.appendChild(header);

    // Handle paged, autorun, notebook, and index variations
    if (isPaged || isNotebook || isIndex) {
      // Hide cells initially in paged mode
      cellsContainer.style.display = 'none';
      container.appendChild(cellsContainer);

      // Create overlay with autorun support and notebook mode flag
      const notebookTitle = notebook.metadata?.title || 'Jupyter Notebook';
      const overlay = createPagedOverlay(container, cellsContainer, shouldAutorun, isNotebook, repoUrl, notebookTitle, helpRepoUrl, githubBranch, isNoTopbar);

      // Index variation: Auto-open overlay without button
      if (isIndex) {
        // Auto-open after a brief delay to ensure DOM is ready
        setTimeout(() => {
          overlay.openOverlay();
        }, 100);
      } else {
        // Regular notebook/paged: Show start button
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'ipynb-button-container';

        // Create start button
        const startButton = createPagedStartButton();
        buttonContainer.appendChild(startButton);

        // Start button opens overlay
        startButton.addEventListener('click', () => {
          overlay.openOverlay();
        });

        container.appendChild(buttonContainer);
      }
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
