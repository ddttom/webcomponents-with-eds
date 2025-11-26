# IPynb Viewer - Usage Examples

## Example 1: Basic Notebook Display

### Google Docs Table

| IPynb Viewer |
|--------------|
| /notebooks/example.ipynb |

### Result

Displays the notebook with all cells rendered. Markdown cells show formatted text, code cells show syntax-highlighted code with Run buttons.

---

## Example 2: With Link

### Google Docs Table

| IPynb Viewer |
|--------------|
| [Interactive Tutorial](/notebooks/tutorial.ipynb) |

### Result

Same as Example 1, but the path is provided as a clickable link in the authoring environment.

---

## Example 2b: Notebook with Metadata (NEW)

### Google Docs Table

| IPynb Viewer |
|--------------|
| /notebooks/blog.ipynb |

### Notebook Metadata Structure

Add metadata to your .ipynb file to display title, author, and date:

```json
{
  "metadata": {
    "title": "My Interactive Blog Post",
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

### Result

Displays the notebook with a formatted header:
- **Title**: "My Interactive Blog Post" (large, bold, centered)
- **Author**: "By Tom Cranstoun" (italic, gray)
- **Date**: "November 14, 2025" (smaller, light gray)

All three fields are centered in the header section above the notebook cells.

**Notes:**
- `title` field defaults to "Jupyter Notebook" if not provided
- `author` and `date` are optional and only shown if present
- Metadata is defined in the .ipynb file, not in the Google Doc
- The Google Doc only contains the path to the notebook

---

## Example 3: Sample Notebook Content

### Create this file: `/notebooks/example.ipynb`

```json
{
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "# JavaScript Testing Example\n",
        "\n",
        "This notebook demonstrates **interactive JavaScript** execution in EDS.\n",
        "\n",
        "Click the **Run** button on any code cell to execute it."
      ]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": [
        "// Simple calculation\n",
        "const a = 10;\n",
        "const b = 20;\n",
        "console.log('Sum:', a + b);\n",
        "return a + b;"
      ]
    },
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "## Working with Arrays\n",
        "\n",
        "JavaScript arrays can be manipulated and results displayed inline."
      ]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": [
        "const numbers = [1, 2, 3, 4, 5];\n",
        "const doubled = numbers.map(n => n * 2);\n",
        "console.log('Original:', numbers);\n",
        "console.log('Doubled:', doubled);\n",
        "return doubled;"
      ]
    },
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "## Error Handling\n",
        "\n",
        "Errors are caught and displayed with helpful messages."
      ]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": [
        "try {\n",
        "  // This will cause an error\n",
        "  const result = undefinedVariable + 1;\n",
        "  return result;\n",
        "} catch (error) {\n",
        "  console.error('Caught error:', error.message);\n",
        "  return 'Error handled!';\n",
        "}"
      ]
    },
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "## DOM Manipulation\n",
        "\n",
        "You can interact with the page DOM (use with caution)."
      ]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": [
        "// Query DOM elements\n",
        "const blockCount = document.querySelectorAll('.block').length;\n",
        "console.log('Number of blocks on page:', blockCount);\n",
        "return blockCount;"
      ]
    }
  ],
  "metadata": {
    "kernelspec": {
      "display_name": "JavaScript (Node.js)",
      "language": "javascript",
      "name": "javascript"
    },
    "language_info": {
      "name": "javascript",
      "version": "14.0.0"
    },
    "title": "JavaScript Testing Example",
    "author": "Tom Cranstoun",
    "date": "November 14, 2025"
  },
  "nbformat": 4,
  "nbformat_minor": 4
}
```

---

## Example 4: Paged + Manual Variation (NEW)

### Google Docs Table

| IPynb Viewer (paged, manual) |
|-------------------------------|
| /notebooks/blog.ipynb |

### Result

Displays **two buttons** side by side:

**Buttons:**
1. **Start Reading** - Opens the notebook in full-screen paged mode
2. **Read the Manual** - Opens README.mdc documentation in a scrollable overlay

**Manual Overlay Features:**
- Full-screen overlay (90% viewport) with dark backdrop
- Fetches and displays `/blocks/ipynb-viewer/README.mdc`
- Beautiful markdown rendering:
  - Headings with proper hierarchy
  - Lists (ordered and unordered)
  - Tables with alternating row colors
  - Code blocks with syntax highlighting
  - Inline code with background
  - Links (clickable)
- Scrollable content for long documentation
- Close button (×) in top-right corner
- Escape key to close
- Independent from notebook overlay

**Use Case:**
Perfect for interactive tutorials or demos where users might need to reference the documentation while exploring the notebook.

---

## Example 4b: Notebook with Auto-Wrapping (NEW)

### Google Docs Table

| IPynb Viewer (notebook) |
|--------------------------|
| /notebooks/tutorial.ipynb |

### Result

When using the **notebook variation**, you can write **pure markdown** without HTML wrappers! The viewer automatically detects cell types and applies styling.

**Cell Type Detection:**
- **Hero Cell** - First cell (index 0) with `# ` heading → wrapped with `ipynb-hero-cell`
- **Intro Cell** - Early cells (index ≤ 2) with `## ` heading → wrapped with `ipynb-content-card` (thick 6px border)
- **Transition Cell** - Short cells (≤3 lines) without headers → wrapped with `ipynb-transition-card`
- **Content Cell** - All other cells → wrapped with `ipynb-content-card-thin` (thin 4px border)

**Example Notebook Content:**

```markdown
# 🎯 Tutorial Title

**Compelling tagline** with additional context about what this tutorial covers.

## What You'll Learn

In this tutorial, you'll learn:
- Key concept 1
- Key concept 2
- Key concept 3

---

Now let's dive into the first topic...

### First Topic Details

Here's the detailed content about the first topic with examples and explanations.
```

The viewer automatically wraps each cell with appropriate styling!

**Benefits:**
- ✅ **90% less code** - Write pure markdown, no HTML wrappers
- ✅ **Automatic styling** - Pattern-based detection handles wrapping
- ✅ **Clean content** - Easier to read and edit
- ✅ **Backward compatible** - Existing HTML-wrapped cells still work

**Mixing with Custom HTML:**

You can combine auto-wrapping with custom HTML for special cells:

```markdown
# Regular Title

This gets auto-wrapped...

## Regular Section

More auto-wrapped content...

<!-- Custom styled cell -->
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 48px; margin: 0; text-align: center; color: white;">

<h2 style="font-size: 36px; font-weight: 800; margin: 0;">Special Highlight</h2>

<p style="font-size: 20px;">Custom gradient for this important message</p>

</div>
```

This hybrid approach gives you speed (pure markdown) with flexibility (custom HTML) where needed!

---

## Example 5: Paged Variation with Full-Screen Overlay

### Google Docs Table

| IPynb Viewer (paged) |
|----------------------|
| /notebooks/tutorial.ipynb |

### Result

Displays a "Start Reading" button that opens a full-screen overlay showing notebook cells one at a time:

**Initial State:**
- Shows notebook title and "Start Reading" button
- Cells are hidden until overlay opens

**Overlay Experience:**
- Full-screen immersive reading mode (90% viewport)
- Dark backdrop (95% opacity black) for focus
- **Smart cell grouping** - Instructions shown with their code
- One page at a time (may contain multiple grouped cells)
- Close button (×) in top-right corner
- Previous/Next navigation buttons at bottom
- Page indicator showing logical pages (e.g., "3 / 8")
- Keyboard shortcuts:
  - Arrow Left/Right: Navigate pages
  - Escape: Close overlay
- No page jumping - overlay stays fixed in viewport
- Scrollable cell content area

**Perfect for:**
- Step-by-step tutorials
- Interactive presentations
- Guided learning experiences
- Focus-required content
- Mobile-friendly reading

### Smart Cell Grouping (Automatic)

The paged variation automatically detects when markdown cells reference code cells and groups them together:

**Detection Patterns:**
- Markdown ending with colon (`:`)
- Contains phrases like:
  - "below", "following"
  - "try running", "click run"
  - "let's test", "let's try"
  - "example:", "here's how"

**Single Code Cell Example:**
```markdown
## Testing a Block

Let's test an accordion block:
```

```javascript
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', content);
return block.outerHTML;
```

These two cells will be **automatically grouped** and shown together on one page, so the instruction stays with the code!

**Multiple Code Cells Example (NEW):**
```markdown
## Try These Examples

Run these cells in any order:
```

```javascript
// Cell A: Test accordion
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', content);
return block.outerHTML;
```

```javascript
// Cell B: Calculate sum
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);
return sum;
```

```javascript
// Cell C: Show preview
const { showPreview } = await import('/scripts/ipynb-helpers.js');
await showPreview('accordion', content);
return 'Preview opened!';
```

When instructional markdown is followed by **multiple consecutive code cells**, up to **3 code cells** are grouped together on one page! This keeps related examples together while maintaining good readability.

**Spacing:**
- 1.5rem after the markdown instruction
- 1rem between each code cell
- Clean visual separation for clarity

### When to Use Paged Variation

**Use paged overlay mode when:**
- Creating step-by-step tutorials that require focus
- Building interactive presentations
- Guiding users through sequential content
- Each cell represents a distinct concept or step
- You want distraction-free, immersive reading
- Content is consumed linearly (not reference material)
- Instructions reference "the cell below" (smart grouping handles this!)

**Use default mode when:**
- Users need to see all content at once
- Content is reference documentation
- Users need to compare cells side-by-side
- Quick scanning of content is important
- Users may jump between different sections

---

## Example 5: EDS Block Testing Notebook

### Create this file: `/notebooks/block-test.ipynb`

```json
{
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "# EDS Block Testing\n",
        "\n",
        "Use this notebook to test EDS blocks interactively."
      ]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": [
        "// Find all blocks on the page\n",
        "const blocks = document.querySelectorAll('.block');\n",
        "console.log('Total blocks:', blocks.length);\n",
        "\n",
        "blocks.forEach((block, index) => {\n",
        "  console.log(`Block ${index + 1}:`, block.className);\n",
        "});\n",
        "\n",
        "return `Found ${blocks.length} blocks`;"
      ]
    },
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "## Check Block Properties"
      ]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": [
        "// Inspect the first block\n",
        "const firstBlock = document.querySelector('.block');\n",
        "\n",
        "if (firstBlock) {\n",
        "  const info = {\n",
        "    className: firstBlock.className,\n",
        "    childCount: firstBlock.children.length,\n",
        "    hasDataAttributes: Object.keys(firstBlock.dataset).length > 0\n",
        "  };\n",
        "  \n",
        "  console.log('Block info:', info);\n",
        "  return info;\n",
        "} else {\n",
        "  console.log('No blocks found');\n",
        "  return null;\n",
        "}"
      ]
    }
  ],
  "metadata": {
    "title": "EDS Block Testing",
    "author": "Tom Cranstoun",
    "date": "November 14, 2025"
  }
}
```

---

## Example 5: Mathematical Calculations

### Create this file: `/notebooks/math-demo.ipynb`

```json
{
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "# Mathematical Calculations\n",
        "\n",
        "Demonstrate JavaScript math capabilities."
      ]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": [
        "// Calculate factorial\n",
        "function factorial(n) {\n",
        "  if (n <= 1) return 1;\n",
        "  return n * factorial(n - 1);\n",
        "}\n",
        "\n",
        "const result = factorial(5);\n",
        "console.log('5! =', result);\n",
        "return result;"
      ]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": [
        "// Generate Fibonacci sequence\n",
        "function fibonacci(n) {\n",
        "  const seq = [0, 1];\n",
        "  for (let i = 2; i < n; i++) {\n",
        "    seq[i] = seq[i - 1] + seq[i - 2];\n",
        "  }\n",
        "  return seq;\n",
        "}\n",
        "\n",
        "const fib = fibonacci(10);\n",
        "console.log('First 10 Fibonacci numbers:', fib);\n",
        "return fib;"
      ]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": [
        "// Statistical calculations\n",
        "const data = [12, 15, 18, 20, 22, 25, 28, 30];\n",
        "\n",
        "const sum = data.reduce((a, b) => a + b, 0);\n",
        "const avg = sum / data.length;\n",
        "const min = Math.min(...data);\n",
        "const max = Math.max(...data);\n",
        "\n",
        "console.log('Data:', data);\n",
        "console.log('Sum:', sum);\n",
        "console.log('Average:', avg);\n",
        "console.log('Min:', min);\n",
        "console.log('Max:', max);\n",
        "\n",
        "return { sum, avg, min, max };"
      ]
    }
  ],
  "metadata": {
    "title": "Mathematical Calculations",
    "author": "Tom Cranstoun",
    "date": "November 14, 2025"
  }
}
```

---

## Example 6: String Manipulation

### Create this file: `/notebooks/strings.ipynb`

```json
{
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "# String Manipulation Examples\n",
        "\n",
        "Working with text in JavaScript."
      ]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": [
        "// Text transformations\n",
        "const text = 'hello world from javascript';\n",
        "\n",
        "console.log('Original:', text);\n",
        "console.log('Uppercase:', text.toUpperCase());\n",
        "console.log('Title Case:', text.replace(/\\b\\w/g, c => c.toUpperCase()));\n",
        "console.log('Reversed:', text.split('').reverse().join(''));\n",
        "\n",
        "return text.toUpperCase();"
      ]
    },
    {
      "cell_type": "code",
      "metadata": {},
      "source": [
        "// Word counting\n",
        "const paragraph = 'This is a sample paragraph. It has multiple sentences. Let\\'s count the words!';\n",
        "\n",
        "const wordCount = paragraph.split(/\\s+/).length;\n",
        "const sentenceCount = paragraph.split(/[.!?]+/).filter(s => s.trim()).length;\n",
        "const charCount = paragraph.length;\n",
        "\n",
        "console.log('Words:', wordCount);\n",
        "console.log('Sentences:', sentenceCount);\n",
        "console.log('Characters:', charCount);\n",
        "\n",
        "return { wordCount, sentenceCount, charCount };"
      ]
    }
  ],
  "metadata": {
    "title": "String Manipulation",
    "author": "Tom Cranstoun",
    "date": "November 14, 2025"
  }
}
```

---

## How to Use These Examples

1. **Create the notebook file** in your project's `/notebooks/` directory
2. **Add the IPynb Viewer block** to your Google Doc with the path
3. **Publish your page** through EDS
4. **Click Run buttons** to execute code interactively

## Tips for Creating Notebooks

- Keep code cells focused on single tasks
- Use markdown cells to explain what the code does
- Include error handling in complex code
- Test notebooks locally before deploying
- Use console.log() for debugging output
- Return meaningful values from code cells

## Best Practices

1. **Documentation**: Add markdown cells explaining each step
2. **Error Handling**: Wrap risky operations in try-catch
3. **Console Output**: Use console.log() to show intermediate values
4. **Return Values**: Return results you want displayed
5. **Code Organization**: Keep cells short and focused
6. **Testing**: Verify notebooks work before sharing

## Advanced Use Cases

### Interactive Tutorials
Create step-by-step coding tutorials where users execute each step.

### Data Exploration
Allow users to run calculations and see results without backend code.

### Documentation with Examples
Combine explanatory text with runnable code examples.

### Testing Tools
Provide interactive testing utilities for your EDS blocks.

### Educational Content
Teach JavaScript concepts with executable examples.
