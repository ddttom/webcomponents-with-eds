# IPynb Viewer Block

Display and execute Jupyter notebook (.ipynb) files directly in your EDS site with interactive JavaScript execution capabilities.

## Features

- **Parse and Display Notebooks**: Renders both markdown and code cells from .ipynb files
- **Interactive Execution**: Run JavaScript code cells individually with a click (async/await support)
- **Cell Independence**: Run any cell at any time in any order - no initialization required
- **Browser Execution**: Runs JavaScript code directly in the browser with native APIs
- **Direct ES6 Imports**: Each cell imports what it needs independently
- **Output Display**: Shows console logs, results, and errors inline
- **Overlay Previews**: Full-screen overlays for visual testing (no popup blockers)
- **Paged Variation**: Display cells one at a time with navigation controls (NEW)
- **Responsive Design**: Mobile-friendly layout
- **Syntax Highlighting**: Clear code formatting with monospace fonts
- **Error Handling**: Graceful error messages and visual indicators

## Usage

### Basic Usage

Add the block to your page with a link to your notebook file:

```
| IPynb Viewer |
|--------------|
| /path/to/notebook.ipynb |
```

### With a Clickable Link

```
| IPynb Viewer |
|--------------|
| [View Notebook](/path/to/notebook.ipynb) |
```

### Paged Variation

Display notebook cells one at a time in a full-screen overlay with Previous/Next navigation:

```
| IPynb Viewer (paged) |
|----------------------|
| /path/to/notebook.ipynb |
```

**Features:**
- **Start Reading button** - Click to enter full-screen reading mode
- **Full-viewport overlay** - Immersive, distraction-free reading experience
- **Smart cell grouping** (NEW) - Automatically combines instruction markdown with following code cells
- **One page at a time** - Focus on current content without page jumping
- **Previous/Next navigation** - Navigate between logical pages with buttons
- **Page indicator** - Shows logical page count (e.g., "1 / 8" instead of raw cell count)
- **Close button (×)** - Exit overlay and return to page
- **Keyboard shortcuts**:
  - Arrow Left/Right - Navigate between pages
  - Escape - Close overlay
- **No page jumping** - Overlay stays fixed in viewport
- **Responsive design** - Adapts to mobile, tablet, and desktop
- **Dark backdrop** - Reduces distractions (95% opacity black)

## Notebook Structure Support

The block supports standard Jupyter notebook JSON format with **enhanced markdown rendering** and **metadata display**.

### Metadata Fields

The notebook metadata is displayed in the header section:

**Supported Fields:**
- `title` - Main notebook title (required, defaults to "Jupyter Notebook")
- `author` - Author name (optional)
- `date` - Publication or creation date (optional)

**Example metadata in .ipynb file:**
```json
{
  "metadata": {
    "title": "My Interactive Tutorial",
    "author": "Tom Cranstoun",
    "date": "November 14, 2025",
    "kernelspec": {
      "display_name": "JavaScript",
      "language": "javascript",
      "name": "jslab"
    }
  }
}
```

**Display:**
- Title appears as large heading (1.8rem, bold, centered)
- Author appears below title (1rem, italic, gray #666)
- Date appears below author (0.9rem, light gray #999)

### Markdown Cells (Enhanced)

**Code Blocks (NEW):**
- Triple backtick code blocks with optional language specification
- Proper syntax highlighting and formatting
- Example: \`\`\`javascript\n...\n\`\`\`

**Tables (NEW):**
- Full markdown table support with headers
- Alternating row colors for readability
- Responsive table styling
- Example: `| Header 1 | Header 2 |`

**Lists (NEW):**
- Unordered lists with `-` or `*`
- Ordered lists with `1.`, `2.`, etc.
- Proper indentation and spacing

**Inline Formatting:**
- Headers (H1, H2, H3) with `#`, `##`, `###`
- **Bold** text with `**text**`
- *Italic* text with `*text*`
- `Inline code` with backticks
- [Links](url) with `[text](url)`
- Line breaks

### Code Cells
- JavaScript code execution
- Console output capture
- Result display
- Error handling

## Interactive Features

### Run Button
Each code cell has a "Run" button that:
1. Executes the JavaScript code (with async/await support)
2. Captures console.log() and console.error() output
3. Displays the return value
4. Shows visual indicators for success/error states

**Cell Independence:**
- Run any cell at any time in any order
- No initialization required
- Each cell imports what it needs independently

### Helper Functions

Import helper functions directly in any cell using ES6 imports:

```javascript
// Import what you need
const { testBlock } = await import('/scripts/ipynb-helpers.js');

// Test a block
const block = await testBlock('accordion', '<div>content</div>');

// Return result to display in output
return block.outerHTML;
```

**Available Helper Functions:**
- `testBlock(blockName, innerHTML)` - Test block decoration in browser
- `showPreview(blockName, innerHTML)` - Open overlay preview with full styling

**Example cell structure:**
```javascript
// Import helpers
const { testBlock, showPreview } = await import('/scripts/ipynb-helpers.js');

const content = '<div><div>Title</div><div>Description</div></div>';
const block = await testBlock('accordion', content);

// Show visual preview
await showPreview('accordion', content);

// Return result to display
return block.outerHTML;
```

### Live Preview with Overlay

When using `showPreview()` in code cells:
- **Overlay system**: Opens full-screen overlay on the same page (no popup blockers!)
- **Responsive preview**: Switch between Mobile (375×667), Tablet (768×1024), and Desktop (95%×95vh) views
- **Full styling**: All CSS loads properly with complete styling support
- **Full interactivity**: Block JavaScript executes with event handlers working
- **Easy dismissal**: Press ESC, click backdrop, or click close button
- **No popup blockers**: Stays on the same page - no new windows

**How it works:**
- Creates full-screen overlay with semi-transparent backdrop
- Includes all CSS and JavaScript for proper block rendering
- Decorates block using native browser APIs
- Interactive viewport switching for testing across device sizes
- Result: Fully functional styled blocks in overlay with responsive testing

**Responsive Preview Buttons:**
- 📱 **Mobile** (375px × 667px) - iPhone SE/8 size
- 📱 **Tablet** (768px × 1024px) - iPad size
- 🖥️ **Desktop** (95% × 95vh) - Full desktop view (default)

Switch between views with one click to test block responsiveness!

## Example Notebook Structure

```json
{
  "cells": [
    {
      "cell_type": "markdown",
      "source": [
        "# My Test Notebook\n",
        "This is a markdown cell with **bold** text."
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "console.log('Hello from Jupyter!');\n",
        "return 42;"
      ]
    }
  ],
  "metadata": {
    "title": "My Notebook"
  }
}
```

## Technical Details

### Code Execution
- Code runs in the browser using `AsyncFunction` constructor for async/await support
- Console methods are temporarily captured during execution
- Results are displayed in an output area below each cell
- Errors are caught and displayed with red styling
- Each cell runs independently with its own scope

### Paged Variation Implementation

The paged variation uses a full-screen overlay approach to eliminate page jumping:

**How it works:**

1. **Variation Detection**:
   ```javascript
   const isPaged = block.classList.contains('paged');
   ```

2. **Start Button**:
   - Creates "Start Reading" button in the block
   - Clicking opens the full-screen overlay
   - Original cells hidden until overlay opens

3. **Overlay Structure**:
   ```html
   <div class="ipynb-paged-overlay">
     <div class="ipynb-paged-overlay-content">
       <button class="ipynb-paged-close">×</button>
       <div class="ipynb-paged-cell-area">
         <!-- Current cell cloned here -->
       </div>
       <div class="ipynb-pagination">
         <!-- Previous, Page Indicator, Next -->
       </div>
     </div>
   </div>
   ```

4. **Full-Screen CSS**:
   ```css
   .ipynb-paged-overlay {
     position: fixed;
     top: 0; left: 0;
     width: 100vw; height: 100vh;
     background: rgba(0, 0, 0, 0.95);
     z-index: 10000;
   }
   ```

5. **Smart Cell Grouping**:
   - Automatically detects when markdown cells reference code cells
   - Groups them together on the same "page"
   - Detection patterns:
     - Markdown ending with colon (`:`)
     - Contains "below", "following", "try running", "click run"
     - Contains "let's test", "let's try", "example:", "here's how"
   - **Multi-code-cell grouping**: When instructional markdown is followed by multiple consecutive code cells, up to 3 code cells are grouped together on one page
   - Spacing: 1.5rem after markdown, 1rem between code cells
   - Page indicator shows logical pages, not raw cell count

6. **Navigation**:
   - Clones current page (single or grouped cells) into overlay
   - Button clicks navigate between logical pages
   - Scrolls to top on page change (no viewport jumping)
   - Keyboard events (Arrow Left/Right, Escape)

7. **Close Mechanisms**:
   - Close button (×) in top-right corner
   - Escape key
   - Restores body scroll on close

**Key Features:**
- Smart cell grouping for better context
- Instruction + code shown together
- Multiple consecutive code cells (up to 3) grouped with their instruction
- Logical page navigation
- No page jumping (fixed viewport position)
- Prevents background scrolling when open
- Smooth fade-in animation (0.3s)
- Responsive sizing (90vw × 90vh on desktop)
- Full-screen on mobile (100vw × 100vh)

**Grouping Examples:**

*Example 1: Single code cell*
```
Markdown: "Let's test an accordion:"
Code: testBlock('accordion', content)
→ One page with markdown + 1 code cell
```

*Example 2: Multiple code cells*
```
Markdown: "Try running these cells in any order:"
Code A: Test accordion
Code B: Calculate sum
Code C: Show preview
→ One page with markdown + 3 code cells (all grouped together)
```

*Example 3: More than 3 code cells*
```
Markdown: "Run these examples:"
Code 1, Code 2, Code 3, Code 4
→ One page with markdown + Code 1, 2, 3
→ Separate page with Code 4
```

### Overlay Preview System

**How it works:**

1. **Creates overlay element**:
   ```javascript
   const overlay = document.createElement('div');
   overlay.className = 'ipynb-preview-overlay';
   // Full-screen overlay with inline styles
   ```

2. **Minimal DOM structure** (EDS-compatible):
   ```html
   <div class="ipynb-preview-overlay">
     <div class="ipynb-preview-backdrop"></div>
     <div class="ipynb-preview-container">
       <div class="ipynb-preview-header">
         <button class="ipynb-preview-close">×</button>
       </div>
       <div class="ipynb-preview-content">
         <div class="blockname block">
           <!-- block content as direct children -->
         </div>
       </div>
     </div>
   </div>
   ```

3. **Appends to document body**:
   ```javascript
   document.body.appendChild(overlay);
   ```

4. **Decorates block**:
   ```javascript
   const block = overlay.querySelector(`.${blockName}.block`);
   const module = await import(`/blocks/${blockName}/${blockName}.js`);
   await module.default(block);
   ```

**Why overlay is better than popup windows:**
- No popup blockers
- Stays on the same page
- Better UX (ESC or backdrop click to close)
- Direct CSS access (no blob URL issues)
- Simpler implementation

**Why minimal DOM structure is critical:**

EDS blocks expect specific DOM patterns where they can iterate over `block.children` directly to find content rows. Many blocks (accordion, tabs, cards) use patterns like:

```javascript
[...block.children].forEach((row) => {
  // Process each content row
});
```

**Solution:**
- Block is properly structured within preview content area
- No extra wrapper divs between content area and block
- Blocks decorate correctly with full styling
- See [Raw EDS Blocks Guide](../../docs/for-ai/implementation/raw-eds-blocks-guide.md) for detailed patterns

### Markdown Parser (Enhanced)

The block includes a comprehensive markdown parser that supports:

**Processing Order:**
1. Code blocks (extracted first with placeholders)
2. Tables (multi-line processing with header detection)
3. Headers (H1, H2, H3)
4. Bold and italic text
5. Inline code
6. Links
7. Lists (unordered and ordered)
8. Code block restoration
9. Line break conversion

**Key Features:**
- **Code block protection**: Prevents markdown processing inside code blocks
- **Table parsing**: Supports markdown tables with `|` delimiters and header rows
- **List handling**: Properly closes and nests `<ul>` and `<ol>` tags
- **HTML escaping**: Safely escapes `<` and `>` in code blocks
- **Language tagging**: Preserves language hints from code fences

### Security Considerations
- Code execution happens in the user's browser context
- Be cautious with untrusted notebook files
- Code has access to the global scope and DOM
- Consider implementing additional sandboxing for public sites

### Supported Code
- Standard JavaScript (ES6+)
- Console methods (log, error)
- DOM manipulation
- Async code (with await)
- Return values

### Limitations
- Only JavaScript code cells are executable
- Python or other language cells are displayed but not executed
- No persistent state between page reloads

## Styling

The block uses CSS custom properties for theming:

```css
--background-color: Background color
--text-color: Text color
--primary-color: Primary accent (buttons, links, pagination)
--primary-hover-color: Hover state for primary buttons
--success-color: Success indicators
--error-color: Error indicators
--code-background: Code cell background
--light-color: Border colors
--disabled-color: Disabled button background
--focus-color: Focus outline color
```

### Header Styles

The header section includes CSS classes for metadata display:

```css
.ipynb-viewer-header: Header container (centered, padded, bordered)
.ipynb-viewer-title: Notebook title (1.8rem, bold, #333)
.ipynb-viewer-author: Author name (1rem, italic, #666)
.ipynb-viewer-date: Publication date (0.9rem, #999)
```

### Paged Variation Styles

The paged variation adds overlay-specific CSS:

```css
.ipynb-paged-start-button: Start Reading button
.ipynb-paged-overlay: Full-screen overlay container
.ipynb-paged-overlay-content: Content area (90vw × 90vh)
.ipynb-paged-close: Close button (top-right)
.ipynb-paged-cell-area: Scrollable cell content area
.ipynb-pagination: Pagination controls (in overlay footer)
.ipynb-pagination-button: Previous/Next button styles
.ipynb-page-indicator: Page number display
```

Overlay is fully responsive with breakpoints at 768px and 480px:
- **Desktop**: 90vw × 90vh with border radius
- **Tablet**: 95vw × 95vh
- **Mobile**: 100vw × 100vh (full screen, no border radius)

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive buttons
- Keyboard navigation support
- Focus indicators on buttons
- Screen reader friendly

## Mobile Support

- Responsive layout for all screen sizes
- Touch-friendly buttons
- Horizontal scrolling for long code
- Stacked layout on small screens

## Browser Compatibility

- Modern browsers with ES6+ support
- Fetch API required
- CSS custom properties support
- No IE11 support

## File Structure

```
blocks/ipynb-viewer/
├── ipynb-viewer.js       # Main block logic
├── ipynb-viewer.css      # Block styles
├── README.md             # This file
├── EXAMPLE.md            # Usage examples
└── test.html             # Development test file
```

## Development

### Testing Locally

1. Start the development server:
   ```bash
   npm run debug
   ```

2. Access the test file:
   ```
   http://localhost:3000/blocks/ipynb-viewer/test.html
   ```

### Creating Test Notebooks

Create a `.ipynb` file in JSON format:

```json
{
  "cells": [
    {
      "cell_type": "markdown",
      "source": ["# Test\n", "Content here"]
    },
    {
      "cell_type": "code",
      "source": ["console.log('test');\n", "return 123;"]
    }
  ],
  "metadata": {
    "title": "Test Notebook"
  }
}
```

## Related Documentation

- [EDS Block Development](../../.claude/skills/eds-block-development/SKILL.md)
- [Jupyter Notebook Testing](../../docs/for-ai/explaining-jupyter.md)
- [EDS Native Testing](../../docs/for-ai/testing/eds-native-testing-standards.md)

## Tips

1. **Test your notebooks**: Verify notebook JSON structure is valid
2. **Keep code simple**: Complex dependencies may not work in browser context
3. **Use console.log**: Helps debug execution issues
4. **Mobile testing**: Check layout on different screen sizes
5. **Error handling**: Wrap risky code in try-catch blocks

## Common Issues

### Notebook Won't Load
- Check file path is correct
- Verify JSON structure is valid
- Check browser console for fetch errors
- Ensure CORS headers allow notebook file access

### Code Won't Execute
- Verify code is JavaScript (not Python/other languages)
- Check for syntax errors in code cells
- Look for console errors during execution
- Ensure code doesn't rely on Node.js-specific APIs

### Styling Issues
- Check CSS custom properties are defined
- Verify block CSS is loaded
- Test with different viewport sizes
- Check for CSS conflicts with site styles

## Future Enhancements

Potential improvements for future versions:

- Syntax highlighting for code
- Cell execution order tracking
- Persistent cell outputs
- Export results to file
- Support for cell metadata (collapsed, hidden)
- Image output support
- Rich output display (HTML, SVG)
- Paged variation enhancements:
  - Group cells by headers (e.g., one H2 section per page)
  - Page jump navigation
  - URL hash support for deep linking to specific pages
