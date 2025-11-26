# Create Presentation Command

You are tasked with creating or converting a Jupyter notebook into presentation mode.

## Your Task

Create a beautiful, non-interactive presentation notebook using:
- **Markdown cells only** (no executable code cells)
- **Embedded EDS blocks** for visual appeal
- **Inline JavaScript** in markdown for block initialization
- **Convert any existing code cells** to informative markdown text

**STYLING APPROACH:** Choose based on display mode:
1. **Auto-wrapping** (pure markdown) - Use when notebook will be displayed in notebook mode
2. **Manual HTML styling** (inline styles) - Use when notebook will be displayed in other modes (paged, autorun, basic)

Note: "Presentation" = non-interactive design technique (applies to both styling approaches)

## User Request

The user wants to create a presentation about: {{prompt}}

## Requirements

### 1. Notebook Structure

**Metadata (required):**
```json
{
  "metadata": {
    "title": "Presentation Title",
    "description": "Brief description",
    "author": "Tom Cranstoun",
    "creation-date": "{{TODAY'S DATE IN YYYY-MM-DD FORMAT}}",
    "version": "1.0",
    "last-modified": "{{TODAY'S DATE IN YYYY-MM-DD FORMAT}}",
    "category": "presentation",
    "difficulty": "beginner",
    "duration": "10 minutes",
    "repo": "https://github.com/ddttom/allaboutV2",
    "help-repo": "https://github.com/ddttom/allaboutV2",
    "github-branch": "main"
  }
}
```

**GitHub Integration:**
- `repo`: Repository URL for .md file linking
- `help-repo`: Repository for help documentation (defaults to `repo`)
- `github-branch`: Branch to use for loading .md files (defaults to `"main"`)

**⚠️ CRITICAL - Version and Date Management:**
- **ALWAYS update both `version` AND `last-modified` whenever you make ANY change to an .ipynb file**
- **Version increments:**
  - Major changes (new slides, restructuring): 1.0 → 2.0
  - Minor changes (new content, edits): 1.0 → 1.1
  - Patch changes (typo fixes): 1.0 → 1.0.1
- **Last-modified**: Update to current date (YYYY-MM-DD) on every edit
- **Creation-date**: Never change after initial creation

**Cell Structure:**
1. Title cell with overview
2. Table of contents (if >5 sections)
3. Content cells with embedded blocks
4. Conclusion or call-to-action

### 2. No Executable Code Cells

**Convert code cells like this:**

Original code cell:
```javascript
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', content);
return block.outerHTML;
```

Becomes markdown cell:
```markdown
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 32px; margin: 0 0; border-left: 6px solid #0288d1; color: #212121;">

<h3 style="color: #0d47a1; font-size: 26px; font-weight: 700; margin-bottom: 16px;">Code Example: Testing Accordion</h3>

**Original code** (for reference):
\```javascript
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', content);
return block.outerHTML;
\```

**What it does:** Tests the accordion block with provided content

**Result:** See the working accordion below

<div class="accordion block">
  <!-- actual accordion content -->
</div>

<script type="module">
  const block = document.querySelector('.accordion.block');
  const module = await import('/blocks/accordion/accordion.js');
  await module.default(block);
</script>

</div>
```

### 3. Use EDS Blocks

Choose from available blocks based on content type:

**Available blocks:**
- `accordion` - Collapsible sections (FAQs, feature lists)
- `cards` - Card layouts (features, team, products)
- `tabs` - Tabbed content (code examples, comparisons)
- `hero` - Hero banners (title sections)
- `grid` - Grid layouts (flexible arrangements)
- `table` - Data tables (pricing, comparisons)
- `quote` - Pull quotes (testimonials, highlights)
- `columns` - Multi-column text
- `modal` - Dialog overlays
- `counter` - Animated counters

### 4. Block Embedding Pattern

For each block, use this pattern:

```markdown
<div class="block-name block">
  <!-- Block content structure -->
</div>

<script type="module">
  const block = document.querySelector('.block-name.block');
  const module = await import('/blocks/block-name/block-name.js');
  await module.default(block);
</script>
```

### 5. Visual Design

- Use emojis in headers (🎯, 📊, 🚀, ✨, 💡, ❓, 💰)
- Break content into chunks (don't overwhelm)
- Use horizontal rules (`---`) between sections
- Bold and italic for emphasis
- Clear heading hierarchy (# → ## → ###)

### 6. Visual Consistency Standards

**CRITICAL: All presentations must follow these exact styling standards for consistency.**

**Typography:**
- All H2 headings (major sections): `color: #0d47a1; font-size: 28px; font-weight: 700; margin-bottom: 24px;`
- All H3 headings (subsections): `color: #0d47a1; font-size: 26px; font-weight: 700; margin-bottom: 20px;`
  - H3 emoji span: `font-size: 28px;`
  - Use flexbox pattern: `display: flex; align-items: center; gap: 12px;`
- All body text: `color: #212121;`
- **IMPORTANT**: Use HTML headings with explicit styling, NOT markdown syntax (`##`, `###`)
- Markdown headings render with default grey colors - always use HTML

**Backgrounds:**
- Standard gradient: `background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);`
- All content divs MUST include: `color: #212121;` to prevent text fading
- Margin: `margin: 0 0;` (no vertical gaps that expose dark ipynb-viewer background)
- Border radius: `border-radius: 12px;`
- Padding: `padding: 32px;`

**Border Hierarchy:**
- H2 major sections: `border-left: 6px solid #0288d1;` (thick border for main sections)
- H3 subsections: `border-left: 4px solid #0288d1;` (thinner border for content)

**Standard Container Patterns:**

**H2 Major Section (no section tag):**
```html
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 32px; margin: 0 0; border-left: 6px solid #0288d1; color: #212121;">

  <h2 style="color: #0d47a1; font-size: 28px; font-weight: 700; margin-bottom: 24px;">🎯 Section Title</h2>

  <p>Body text content here...</p>

</div>
```

**H3 Subsection:**
```html
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 32px; margin: 0 0; border-left: 4px solid #0288d1; color: #212121;">

  <h3 style="color: #0d47a1; font-size: 26px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 12px;">
    <span style="font-size: 28px;">✨</span>
    Subsection Title
  </h3>

  <p>Body text content here...</p>

</div>
```

**Block Wrapping Pattern:**
- All EDS blocks MUST be wrapped INSIDE styled divs, not as siblings
- Blocks inherit dark background from ipynb-viewer if not properly wrapped
- Pattern:
```html
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 32px; margin: 0 0; border-left: 6px solid #0288d1; color: #212121;">

  <h2 style="color: #0d47a1; font-size: 28px; font-weight: 700; margin-bottom: 24px;">Section Title</h2>

  <!-- Optional explanation box -->
  <div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 20px; margin: 0 0 24px 0; border-left: 4px solid #0288d1; color: #212121;">
    Explanation text about the block demonstration
  </div>

  <!-- Block INSIDE the container -->
  <div class="block-name block">
    <!-- block content -->
  </div>

  <script type="module">
    const block = document.querySelector('.block-name.block');
    const module = await import('/blocks/block-name/block-name.js');
    await module.default(block);
  </script>

</div> <!-- Close container AFTER block -->
```

**Common Mistakes to Avoid:**
1. ❌ Using markdown headings (`##`, `###`) - they render grey
2. ❌ Using `<section>` tags - causes overlay jumping between slides
3. ❌ Placing blocks as siblings to styled divs - they inherit dark background
4. ❌ Forgetting `color: #212121;` on gradient divs - text fades
5. ❌ Using vertical margins (`margin: 32px 0;`) - creates black gaps
6. ❌ Inconsistent H3 margin-bottom (always use 20px, not 24px)

### 7. Navigation

- Add table of contents for presentations with >5 sections
- Use hash links: `[Section Name](#section-name)`
- H2 headers automatically get IDs (lowercase, hyphens)

### 8. Choosing Between Auto-Wrapping and Manual HTML

**Auto-wrapping (pure markdown):**
- ✅ Available when displayed in notebook mode (`| IPynb Viewer (notebook) |`)
- ✅ 90% less code to write
- ✅ Fast content creation
- ✅ Consistent default styling
- ❌ ONLY works in notebook mode
- ❌ Limited design control

**Manual HTML styling (inline styles):**
- ✅ Works in ALL display modes (basic, paged, autorun, notebook)
- ✅ Full design control and customization
- ✅ Complex layouts with nested blocks
- ✅ Professional polish
- ❌ More verbose (10x more code)
- ❌ Slower authoring

**Recommendation for presentation notebooks:**
- If displaying in **notebook mode**: Use auto-wrapping (pure markdown) for speed
- If displaying in **other modes** (paged, autorun, basic): Use manual HTML for compatibility
- Both approaches work for "presentation style" (non-interactive) notebooks

**Mixing both approaches:**
You can combine auto-wrapping with custom HTML in the same notebook:
- Most cells use pure markdown (auto-wrapped in notebook mode)
- Specific cells use custom HTML for special styling needs
- Example: Custom gradient for a key message or highlight section

```markdown
<!-- Custom HTML for special styling on this cell -->
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 48px; margin: 0; text-align: center; color: white;">

<h2 style="font-size: 36px; font-weight: 800; margin: 0;">Call to Action</h2>

<p style="font-size: 20px; margin: 16px 0;">Custom purple gradient for emphasis</p>

</div>
```

## Block Structure Examples

### Accordion Example

```markdown
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 32px; margin: 0 0; border-left: 6px solid #0288d1; color: #212121;">

<h2 style="color: #0d47a1; font-size: 28px; font-weight: 700; margin-bottom: 24px;">❓ Frequently Asked Questions</h2>

<div class="accordion block">
  <div>
    <div>How does this work?</div>
    <div>This presentation uses embedded EDS blocks in markdown cells...</div>
  </div>
  <div>
    <div>Can users run code?</div>
    <div>No, this is presentation-only. All code is converted to text...</div>
  </div>
</div>

<script type="module">
  const block = document.querySelector('.accordion.block');
  const module = await import('/blocks/accordion/accordion.js');
  await module.default(block);
</script>

</div>
```

### Cards Example

```markdown
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 32px; margin: 0 0; border-left: 6px solid #0288d1; color: #212121;">

<h2 style="color: #0d47a1; font-size: 28px; font-weight: 700; margin-bottom: 24px;">🚀 Key Features</h2>

<div class="cards block">
  <div>
    <div><strong>📊 Feature 1</strong></div>
    <div>Description of first feature with details...</div>
  </div>
  <div>
    <div><strong>⚡ Feature 2</strong></div>
    <div>Description of second feature with details...</div>
  </div>
  <div>
    <div><strong>🎨 Feature 3</strong></div>
    <div>Description of third feature with details...</div>
  </div>
</div>

<script type="module">
  const block = document.querySelector('.cards.block');
  const module = await import('/blocks/cards/cards.js');
  await module.default(block);
</script>

</div>
```

### Table Example

```markdown
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 32px; margin: 0 0; border-left: 6px solid #0288d1; color: #212121;">

<h2 style="color: #0d47a1; font-size: 28px; font-weight: 700; margin-bottom: 24px;">💰 Pricing Plans</h2>

<div class="table block">
  <div>
    <div>Plan</div>
    <div>Price</div>
    <div>Features</div>
  </div>
  <div>
    <div>Basic</div>
    <div>$10/month</div>
    <div>Core features included</div>
  </div>
  <div>
    <div>Pro</div>
    <div>$29/month</div>
    <div>All features + priority support</div>
  </div>
</div>

<script type="module">
  const block = document.querySelector('.table.block');
  const module = await import('/blocks/table/table.js');
  await module.default(block);
</script>

</div>
```

## Workflow

1. **Analyze the request** - Identify topic, sections, appropriate blocks
2. **Create/update notebook** - Set up metadata and cell structure
3. **Convert code cells** - Transform to informative markdown
4. **Add blocks** - Embed EDS blocks with inline scripts
5. **Add navigation** - Table of contents and hash links
6. **Verify** - Ensure no executable code cells remain

## Output

Create or update the .ipynb file with:
- Proper JSON structure
- All markdown cells (no code cells with language "javascript")
- Embedded blocks with initialization scripts
- Complete metadata
- Beautiful visual design

## Important Notes

- **No code cells with `"cell_type": "code"` and `"language": "javascript"`**
- All interactivity must be in `<script>` tags within markdown
- Convert existing code cells to explanatory markdown
- Use blocks to make content visually engaging
- Test that the notebook works in both default and paged modes

Now proceed with creating the presentation notebook based on the user's request!
