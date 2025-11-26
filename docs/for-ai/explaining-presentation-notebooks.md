# Explaining Presentation Notebooks

## Overview

Presentation notebooks are Jupyter notebooks designed for **viewing and presentation** rather than code execution. They transform complex content into beautiful, interactive experiences using embedded HTML, inline styling, and EDS blocks—all within markdown cells. No executable code cells, just pure presentation.

> **📚 Notebook Types Reference:** For complete classification of all three notebook types (Testing, Educational, Presentation), see [Explaining Jupyter - Notebook Types Reference](explaining-jupyter.md#notebook-types-reference).

**Key Distinction:**
- **Testing Notebooks** - Interactive browser execution for testing EDS blocks
- **Educational Notebooks** - Interactive, executable, for learning and tutorials
- **Presentation Notebooks** (this guide) - Non-executable, for presenting, showcasing, and client demos

## Purpose

Create stunning visual presentations using Jupyter notebooks that:
- Display content beautifully with inline HTML/CSS styling
- Embed interactive EDS blocks directly in markdown
- Present information without user-executable code
- Work perfectly with the ipynb-viewer block for web display
- Provide consistent, professional design across all cells

## When to Use Presentation Notebooks

### Perfect For:
- **Client presentations** - Professional demos without code execution risk
- **Product showcases** - Feature highlights with beautiful visuals
- **Documentation presentations** - Navigable guides with interactive elements
- **Marketing materials** - Branded content with consistent styling
- **Training slides** - Non-technical presentations with interactivity
- **Status reports** - Visual updates with data displays

### NOT For:
- Developer testing (use `test.ipynb` instead)
- Interactive tutorials where users run code (use educational notebooks)
- Live code demonstrations (use educational notebooks with `autorun`)

## Core Concepts

### 1. Markdown-Only Cells

**All content lives in markdown cells**—no code cells with executable JavaScript:

```markdown
## Section Title

Content with **formatting** and [links](url)

<div class="cards block">
  <!-- EDS block HTML -->
</div>

<script type="module">
  // Inline script for block initialization
  const block = document.querySelector('.cards.block');
  const module = await import('/blocks/cards/cards.js');
  await module.default(block);
</script>
```

### 1a. Auto-Wrapping in Notebook Mode (NEW)

**When using the notebook variation** (`| IPynb Viewer (notebook) |`), you can write **pure markdown** without HTML wrappers! The viewer automatically detects cell types and applies styling:

**Pure Markdown (Auto-Wrapped):**
```markdown
# 🎯 Presentation Title

**Compelling tagline** with additional context
```

Automatically becomes:
```html
<div class="ipynb-hero-cell">
  <h1>🎯 Presentation Title</h1>
  <p><strong>Compelling tagline</strong> with additional context</p>
</div>
```

**Detection Rules:**
- **Hero Cell**: First cell with `# ` heading → `ipynb-hero-cell`
- **Intro Cell**: Early cells (index ≤ 2) with `## ` heading → `ipynb-content-card` (thick border)
- **Transition Cell**: Short cells (≤3 lines) without headers → `ipynb-transition-card`
- **Content Cell**: All other cells → `ipynb-content-card-thin` (thin border)

**Benefits:**
- ✅ **90% less code** - Just write markdown
- ✅ **Cleaner notebooks** - Easier to read and edit
- ✅ **Version control friendly** - Smaller diffs
- ✅ **Backward compatible** - HTML wrappers still work

**Note:** Auto-wrapping only works in **notebook mode**. For other modes (paged, autorun), use manual HTML wrappers as shown in the rest of this document.

### 1b. Action Cards for Navigation (NEW)

**Create beautiful navigation links using pure markdown with action cards:**

```markdown
# 🎯 Product Launch Presentation

Discover our revolutionary new features.

<!-- action-cards -->

- [Overview](#)
- [Key Features](#)
- [Pricing](#)
```

**How it works:**
1. Add `<!-- action-cards -->` HTML comment in your markdown cell
2. Follow with a markdown list of links using `(#)` as placeholder
3. Write link text that matches heading text somewhere in your notebook
4. **Links are automatically resolved at runtime** - JavaScript searches all cells for matching headings and updates hrefs
5. All cards use consistent blue styling

**Important:** The `<!-- action-cards -->` marker only applies to the **first list** that follows it. Any subsequent lists in the same cell will remain as normal bullet lists.

**Example matching:**
- `[Overview](#)` finds heading containing "Overview" (like "## Overview" or "### 📊 Overview Section")
- `[Key Features](#)` finds heading containing "Key Features" (like "## Section 2: Key Features")
- Link text doesn't need exact match - searches for headings that *contain* your link text

**Best Practices:**
- ✅ Use specific link text: `[Section 1: Overview](#)` instead of just `[Overview](#)`
- ✅ Make link text unique to avoid ambiguity
- ⚠️ If multiple headings match, it picks the **first one found** (in cell order)
- 💡 Tip: Use section numbers or descriptive prefixes to ensure unique matches

**Features:**
- ✅ Pure markdown - no HTML required
- ✅ Works in any cell type (hero, content, intro, transition)
- ✅ **Smart link resolution** - No hardcoded cell IDs needed
- ✅ Automatically finds matching headings at runtime
- ✅ Consistent blue design - professional appearance
- ✅ Hover effects with animated arrows (→)
- ✅ Perfect for presentation navigation

**When to use action cards:**
- Hero cells with section navigation
- Agenda or table of contents
- Call-to-action sections
- Multi-section flow navigation
- Quick reference menus

**Example in presentation:**
```markdown
# 📊 Quarterly Review

<!-- action-cards -->

- [Q3 Results](#)
- [Team Growth](#)
- [Next Quarter Goals](#)
```

### 2. Understanding Link Types in Presentations

The ipynb-viewer block supports two independent link systems, each serving different purposes:

#### Smart Navigation Links (Internal Notebook Navigation)

Smart linking activates for **any link with `(#)` as the href**, not just action cards. The JavaScript automatically finds matching headings in the notebook and resolves the link at runtime.

**How it works:**
- Link uses `(#)` as placeholder: `[Section Name](#)`
- JavaScript searches all cells for headings matching the link text
- Matching is case-insensitive and ignores emojis/special characters
- Link resolves to `#cell-{index}` automatically
- No hardcoded cell IDs needed - links adapt if cells are reordered

**Examples:**
```markdown
# Navigation Links (anywhere in the notebook)
[Introduction](#)
[🌍 Part 1: The Big Picture](#)
[Back to Top](#)

# Action Cards (same smart linking behavior)
<!-- action-cards -->
- [Q3 Results](#)
- [Team Growth](#)
- [Next Quarter Goals](#)
```

**Best practices:**
- Use descriptive heading text that matches link text
- Include emojis in headings for visual appeal (they're ignored in matching)
- Keep link text concise but unique enough to match correctly
- Works in action cards, regular markdown, or any link element

#### Repository Links (External Documentation)

Links ending in `.md` automatically convert to full GitHub URLs using the notebook's `repo` metadata. This system is completely separate from smart linking.

**How it works:**
- Link to any `.md` file: `[index.md](docs/for-ai/index.md)`
- ipynb-viewer reads `repo` from notebook metadata
- Converts to: `{repo}/blob/main/docs/for-ai/index.md`
- Opens in new tab with GitHub's markdown viewer

**Setup:**
```json
{
  "metadata": {
    "repo": "https://github.com/username/repository"
  }
}
```

**Examples:**
```markdown
# Repository Links
[Main Documentation](docs/for-ai/index.md)
[Getting Started Guide](docs/for-ai/getting-started-guide.md)
[Block Standards](docs/for-ai/implementation/block-architecture-standards.md)
```

**When to use repository links:**
- Link to external documentation files
- Reference README files
- Point to comprehensive guides
- Create "learn more" resources

#### Using Both Link Types Together

Both systems work independently and can be mixed freely:

```markdown
# 📚 Resources

<!-- action-cards -->
- [Next Section](#)          <!-- Smart link: finds heading in this notebook -->
- [Previous Section](#)      <!-- Smart link: finds heading in this notebook -->

## Learn More
- [Complete Guide](docs/for-ai/index.md)                  <!-- Repo link: opens GitHub -->
- [Architecture Docs](docs/for-ai/implementation/block-architecture-standards.md)  <!-- Repo link -->
```

### 3. Inline HTML Styling

Every cell gets beautiful inline styling for consistency:

```html
<div style="background: white; border-radius: 12px; padding: 28px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
<h3 style="color: #1976d2; font-size: 24px; font-weight: 700; margin-bottom: 20px;">
Section Title
</h3>
<div style="color: #212121; line-height: 1.8; font-size: 16px;">
Your content with proper typography and spacing
</div>
</div>
```

### 3. EDS Blocks in Markdown

Embed fully functional EDS blocks directly:

```markdown
<div class="accordion block">
  <div>
    <div>Question or Title</div>
    <div>Answer or detailed content</div>
  </div>
</div>

<script type="module">
  const block = document.querySelector('.accordion.block');
  const module = await import('/blocks/accordion/accordion.js');
  await module.default(block);
</script>
```

### 4. Converting Educational to Presentation

Transform existing educational notebooks:

**Educational (Code Cell):**
```javascript
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', content);
return block.outerHTML;
```

**Presentation (Markdown Cell):**
```markdown
### Code Example: Testing Accordion Block

This demonstrates testing the accordion block:

**Original code:**
\```javascript
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', content);
return block.outerHTML;
\```

**Result:** See the live demonstration below:

<div class="accordion block">
  <!-- Working accordion HTML -->
</div>

<script type="module">
  const block = document.querySelector('.accordion.block');
  const module = await import('/blocks/accordion/accordion.js');
  await module.default(block);
</script>
```

## Visual Consistency Standards

**CRITICAL: All presentations must follow these exact styling standards for consistency across all cells.**

### Standard Color Palette

```javascript
{
  // PRIMARY COLORS (use these for consistency)
  heading: '#0d47a1',        // Dark Blue (all headings)
  text: '#212121',           // Dark Gray (all body text)
  border: '#0288d1',         // Blue (left borders)
  gradient_start: '#e3f2fd', // Light Blue (gradient start)
  gradient_end: '#bbdefb',   // Medium Blue (gradient end)

  // LEGACY/OPTIONAL COLORS (for specific use cases)
  primary: '#1976d2',        // Material Blue
  secondary: '#dc004e',      // Material Pink
  success: '#2e7d32',        // Green
  warning: '#ed6c02',        // Orange
  background: '#f5f5f5',     // Light Gray
  surface: '#ffffff'         // White
}
```

### Typography Standards

**IMPORTANT: Use HTML headings with explicit styling, NOT markdown syntax (`##`, `###`)**

Markdown headings render with default grey colors—always use HTML:

- **All H2 headings**: `color: #0d47a1; font-size: 28px; font-weight: 700; margin-bottom: 24px;`
- **All H3 headings**: `color: #0d47a1; font-size: 26px; font-weight: 700; margin-bottom: 16px;`
- **All body text**: `color: #212121;`

### Background Standards

- **Standard gradient**: `background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);`
- **All content divs MUST include**: `color: #212121;` to prevent text fading
- **Margin**: `margin: 0 0;` (no vertical gaps that expose dark ipynb-viewer background)
- **Border radius**: `border-radius: 12px;`
- **Padding**: `padding: 32px;`

### Border Hierarchy

- **H2 major sections**: `border-left: 6px solid #0288d1;` (thick border for main sections)
- **H3 subsections**: `border-left: 4px solid #0288d1;` (thinner border for content)

### Standard Container Patterns

**H2 Major Section (NO section tag):**

```html
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 32px; margin: 0 0; border-left: 6px solid #0288d1; color: #212121;">

  <h2 style="color: #0d47a1; font-size: 28px; font-weight: 700; margin-bottom: 24px;">🎯 Section Title</h2>

  <p>Body text content here...</p>

</div>
```

**IMPORTANT:** Do NOT wrap cells in `<section>` tags - they cause overlay jumping between slides.

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

### Block Wrapping Pattern

**CRITICAL: All EDS blocks MUST be wrapped INSIDE styled divs, not as siblings.**

Blocks inherit dark background from ipynb-viewer if not properly wrapped:

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

### Common Mistakes to Avoid

1. ❌ Using markdown headings (`##`, `###`) - they render grey
2. ❌ Using `<section>` tags to wrap cells - causes overlay jumping between slides
3. ❌ Placing blocks as siblings to styled divs - they inherit dark background
4. ❌ Forgetting `color: #212121;` on gradient divs - text fades
5. ❌ Using vertical margins (`margin: 32px 0;`) - creates black gaps
6. ❌ Inconsistent H3 margin-bottom (always use 20px, not 24px)
7. ❌ Inconsistent colors across cells

## Design System (Legacy Patterns)

### Typography Hierarchy

| Element | Size | Weight | Use Case |
|---------|------|--------|----------|
| Hero Title | 48px | 800 | Main presentation title |
| H2 Section | 28-32px | 700 | Major sections |
| H3 Subsection | 24px | 700 | Subsections |
| Body Text | 16-18px | 400 | Paragraphs, line-height: 1.8 |
| Small Text | 14px | 400 | Captions, notes |
| Code | 14px | - | Courier New, monospace |

### Spacing System

- **Section Margin:** 24-32px
- **Card Padding:** 24-32px (outer), 20-28px (inner)
- **Content Gap:** 12-16px
- **Border Radius:** 8-16px (larger for containers, smaller for buttons)
- **Box Shadow:** `0 2px 8px rgba(0,0,0,0.08)` (subtle depth)

## Styling Patterns

### Pattern 1: Hero Header

Use at the top of your presentation for maximum impact:

```html
<div style="background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: white; border-radius: 16px; padding: 48px; text-align: center; margin: 32px 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">
<h1 style="font-size: 48px; font-weight: 800; margin: 0 0 16px 0; display: flex; align-items: center; justify-content: center; gap: 16px;">
<span style="font-size: 56px;">🎯</span>
<span>Your Presentation Title</span>
</h1>
<p style="font-size: 20px; margin: 16px 0; opacity: 0.95; font-weight: 300;">
<strong style="font-weight: 600;">Compelling tagline</strong> with additional context
</p>
</div>
```

**Result:** Full-width gradient header with large title and emoji

### Pattern 2: Content Card

Use for standard content sections:

```html
<div style="background: white; border-radius: 12px; padding: 28px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
<h3 style="color: #1976d2; font-size: 24px; font-weight: 700; margin-bottom: 20px;">
Section Title
</h3>
<div style="color: #212121; line-height: 1.8; font-size: 16px;">

Your content with **markdown formatting** supported:
- Bullet points work
- [Links work](url)
- **Bold** and *italic* work

</div>
</div>
```

**Result:** Clean white card with shadow and proper typography

### Pattern 3: EDS Block Wrapper

Use to highlight and explain EDS blocks:

```html
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #0288d1;">

### What this demonstrates

Explanatory text before the block explaining what users will see.

---

<div class="cards block">
  <div>
    <div><strong>Feature 1</strong></div>
    <div>Description of feature 1</div>
  </div>
  <div>
    <div><strong>Feature 2</strong></div>
    <div>Description of feature 2</div>
  </div>
</div>

<script type="module">
  const block = document.querySelector('.cards.block');
  if (block) {
    const module = await import('/blocks/cards/cards.js');
    await module.default(block);
  }
</script>

</div>
```

**Result:** Light blue gradient background with left border accent containing EDS block

### Pattern 4: Highlight Box (Info/Warning/Success)

Use for callouts and important information:

```html
<!-- Info Box -->
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 6px solid #0288d1;">
<h4 style="color: #0288d1; font-size: 20px; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
<span style="font-size: 24px;">ℹ️</span>
Information
</h4>
<p style="color: #212121; line-height: 1.8; margin: 0;">
Your informational content here
</p>
</div>

<!-- Warning Box -->
<div style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 6px solid #ed6c02;">
<h4 style="color: #ed6c02; font-size: 20px; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
<span style="font-size: 24px;">⚠️</span>
Warning
</h4>
<p style="color: #212121; line-height: 1.8; margin: 0;">
Your warning content here
</p>
</div>

<!-- Success Box -->
<div style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 6px solid #2e7d32;">
<h4 style="color: #2e7d32; font-size: 20px; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
<span style="font-size: 24px;">✅</span>
Success
</h4>
<p style="color: #212121; line-height: 1.8; margin: 0;">
Your success content here
</p>
</div>
```

## Available EDS Blocks

All blocks from the EDS system work in presentation notebooks:

### Visual Layout Blocks
- **accordion** - Collapsible sections (FAQs, features)
- **cards** - Grid card layouts (features, team, products)
- **tabs** - Tabbed content (organize related info)
- **grid** - Flexible grid layouts (custom arrangements)
- **hero** - Hero banners (prominent headers)
- **table** - Data tables (pricing, comparisons)

### Content Blocks
- **quote** - Pull quotes (testimonials, highlights)
- **columns** - Multi-column layouts (side-by-side content)
- **modal** - Dialog overlays (detailed info on demand)
- **video** - Embedded videos (demos, tutorials)

### Interactive Blocks
- **code-expander** - Expandable code snippets
- **counter** - Animated counters (statistics)
- **floating-alert** - Dismissible alerts (notifications)

**See:** `.claude/skills/create-presentation/resources/blocks-reference.md` for complete details

## Block Usage Examples

### Accordion for FAQs

```markdown
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 32px; margin: 0 0; border-left: 6px solid #0288d1; color: #212121;">

<h2 style="color: #0d47a1; font-size: 28px; font-weight: 700; margin-bottom: 24px;">❓ Frequently Asked Questions</h2>

<h3 style="color: #0d47a1; font-size: 26px; font-weight: 700; margin-bottom: 16px;">Common questions about our product</h3>

<div class="accordion block">
  <div>
    <div>How does it work?</div>
    <div>Detailed explanation of how the product works with technical details...</div>
  </div>
  <div>
    <div>What are the pricing options?</div>
    <div>Complete pricing breakdown with different tiers...</div>
  </div>
  <div>
    <div>Is there a free trial?</div>
    <div>Yes! We offer a 30-day free trial with full features...</div>
  </div>
</div>

<script type="module">
  const block = document.querySelector('.accordion.block');
  if (block) {
    const module = await import('/blocks/accordion/accordion.js');
    await module.default(block);
  }
</script>

</div>
```

### Cards for Features

```markdown
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 32px; margin: 0 0; border-left: 6px solid #0288d1; color: #212121;">

<h2 style="color: #0d47a1; font-size: 28px; font-weight: 700; margin-bottom: 24px;">🚀 Key Features</h2>

<h3 style="color: #0d47a1; font-size: 26px; font-weight: 700; margin-bottom: 16px;">What makes our solution unique</h3>

<div class="cards block">
  <div>
    <div><strong>📊 Real-Time Analytics</strong></div>
    <div>Get instant insights with our powerful analytics dashboard that updates in real-time.</div>
  </div>
  <div>
    <div><strong>⚡ Lightning Fast</strong></div>
    <div>Optimized performance ensures your users get results in milliseconds, not seconds.</div>
  </div>
  <div>
    <div><strong>🔒 Enterprise Security</strong></div>
    <div>Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards.</div>
  </div>
  <div>
    <div><strong>🌍 Global Scale</strong></div>
    <div>Deploy across 15+ regions worldwide with automatic failover and load balancing.</div>
  </div>
</div>

<script type="module">
  const block = document.querySelector('.cards.block');
  if (block) {
    const module = await import('/blocks/cards/cards.js');
    await module.default(block);
  }
</script>

</div>
```

### Tabs for Product Comparison

```markdown
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 32px; margin: 0 0; border-left: 6px solid #0288d1; color: #212121;">

<h2 style="color: #0d47a1; font-size: 28px; font-weight: 700; margin-bottom: 24px;">📋 Product Tiers</h2>

<h3 style="color: #0d47a1; font-size: 26px; font-weight: 700; margin-bottom: 16px;">Compare our pricing tiers</h3>

<div class="tabs block">
  <div>
    <div>Starter</div>
    <div>
      <h3>$29/month</h3>
      <ul>
        <li>Up to 1,000 users</li>
        <li>5GB storage</li>
        <li>Email support</li>
        <li>Basic analytics</li>
      </ul>
    </div>
  </div>
  <div>
    <div>Professional</div>
    <div>
      <h3>$99/month</h3>
      <ul>
        <li>Up to 10,000 users</li>
        <li>50GB storage</li>
        <li>Priority support</li>
        <li>Advanced analytics</li>
        <li>Custom integrations</li>
      </ul>
    </div>
  </div>
  <div>
    <div>Enterprise</div>
    <div>
      <h3>Contact Sales</h3>
      <ul>
        <li>Unlimited users</li>
        <li>Unlimited storage</li>
        <li>24/7 dedicated support</li>
        <li>Real-time analytics</li>
        <li>White-label options</li>
        <li>SLA guarantee</li>
      </ul>
    </div>
  </div>
</div>

<script type="module">
  const block = document.querySelector('.tabs.block');
  if (block) {
    const module = await import('/blocks/tabs/tabs.js');
    await module.default(block);
  }
</script>

</div>
```

## Validation Requirements for Navigation Notebooks

**CRITICAL:** Navigation notebooks (with multi-part structures) require specific validation to ensure production readiness.

### Action Cards in Transition Cells (REQUIRED)

Navigation notebooks with numbered parts MUST include action cards in transition cells between parts. This is the **#1 validation failure** (catches 80% of issues).

**What are transition cells?**
Cells that appear between major parts with this structure:
- Part X heading (e.g., `### Part 2: By Your Role`)
- Progress indicator with dots (e.g., `**Progress: 2 of 7** 🔵🔵⚪⚪⚪⚪⚪`)
- Reading time estimate (e.g., `**Reading time: 3 minutes**`)
- Contextual text explaining what's next

**Required format:**
```markdown
### Part 2: By Your Role
**Progress: 2 of 7** 🔵🔵⚪⚪⚪⚪⚪
**Reading time: 3 minutes**

Now that you understand the structure, let's explore paths based on YOUR role...

<!-- action-cards -->

- [New Developer](#)
- [Experienced Developer](#)
- [Architect / Tech Lead](#)
```

**Validation checks:**
- ✅ Every transition cell MUST have `<!-- action-cards -->` marker
- ✅ Must have 3-6 action card links (markdown list)
- ✅ Each link must use `(#)` placeholder pattern
- ✅ Links must resolve to actual headings in the notebook

**Common failure:**
```markdown
### Part 2: By Your Role
**Progress: 2 of 7** 🔵🔵⚪⚪⚪⚪⚪
**Reading time: 3 minutes**

Now that you understand the structure...
<!-- Missing action cards marker and links! -->
```

**Before deployment, run validation:**
```bash
/validate-notebook your-notebook.ipynb
```

Expected score: ≥90/100 for production ready

**See also:**
- `.claude/skills/ipynb-validator/SKILL.md` - Complete validation guide
- `.claude/commands/validate-notebook.md` - Validation command details
- `docs/for-ai/templates/ipynb/README.md` - Template structure and validation

### When Validation is Required

Run `/validate-notebook` for all navigation notebooks before deployment. For simple presentation notebooks without numbered parts, validation may not be necessary.

**Navigation notebooks have:**
- Numbered parts (Part 1, Part 2, etc.)
- Transition cells between parts
- Multi-section structure with progress tracking

**Simple presentations have:**
- No numbered parts
- Single-flow content
- No progress indicators

## Cell Ordering Best Practices

**CRITICAL:** Proper cell ordering ensures smooth navigation and professional presentation flow.

### Correct Structure Pattern

```
Cell 0: Hero Header
  → Title with gradient background
  → Compelling subtitle

Cell 1: Overview/What You'll Learn
  → Key takeaways
  → Sets expectations

Cell 2: Table of Contents (optional for < 10 cells)
  → Navigation links

Cells 3-N: Content Sections
  → One topic per cell
  → Consistent styling
  → Mix of content and EDS blocks

Final Cell: Conclusion/Call to Action
  → Summary
  → Next steps
  → Contact info
```

### Common Cell Ordering Mistakes

❌ **WRONG:** Multiple topics in one cell
```markdown
Cell 3: Features + Pricing + Demo
<!-- Too much content in one cell -->
```

✅ **CORRECT:** One topic per cell
```markdown
Cell 3: Features (with cards block)
Cell 4: Pricing (with table block)
Cell 5: Demo (with video or accordion)
```

❌ **WRONG:** Conclusion in the middle
```markdown
Cell 5: Conclusion
Cell 6: Additional Features  ← Out of place
Cell 7: Contact
```

✅ **CORRECT:** Conclusion at end
```markdown
Cell 5: Additional Features
Cell 6: Advanced Topics
Cell 7: Conclusion + Call to Action
```

### Validation Before Deployment

Check presentation flow:
1. ✅ Hero header is first cell
2. ✅ One clear topic per cell
3. ✅ Logical progression (simple → complex)
4. ✅ Conclusion/CTA is last content cell
5. ✅ No orphaned or misplaced cells

Test in paged mode:
```bash
# Navigate through all cells
# Verify smooth transitions
# Check that Previous/Next makes sense
```

### Navigation Presentations

For multi-section documentation presentations with parts:

```
Introduction Cells (0-N)
  → Hero with action cards
  → Overview
  → Emergency reference

Part 1 Section
  → Part 1 content cells
  → Part 1 summary (optional)

Part 2 Section
  → Part 2 content cells
  → Part 2 summary (optional)

Reference Section (End)
  → Resources
  → Troubleshooting
  → Contact

Final Cell
  → Thank you
  → Next steps
```

**Key principle:** Reference materials belong at the END, not between parts.

See [docs/for-ai/templates/ipynb/README.md](../templates/ipynb/README.md) for comprehensive cell ordering guidelines.

---

## Notebook Structure

### Required Metadata

Every presentation notebook should have proper metadata:

```json
{
  "metadata": {
    "title": "Your Presentation Title",
    "description": "Brief description of the presentation",
    "author": "Your Name",
    "creation-date": "2025-01-19",
    "category": "presentation",
    "repo": "https://github.com/username/repo",
    "manual-path": "docs/for-ai/your-documentation.md"
  }
}
```

**Metadata Fields:**

- **`title`** (required) - Main presentation title
- **`description`** (optional) - One-line summary
- **`author`** (optional) - Author name
- **`creation-date`** (optional) - Creation/publication date (preferred; also supports deprecated `date` attribute)
- **`category`** (optional) - Content category (e.g., "presentation", "demo")
- **`repo`** (optional) - Repository URL for linking .md files automatically
- **`manual-path`** (optional) - Path to documentation for "Read the Manual" button
  - **REQUIRED for button:** The "Read the Manual" button only appears if `manual-path` is provided
  - **Plain .md filename:** With `repo` set, creates GitHub link: `{repo}/blob/main/{manual-path}`
  - **Absolute path:** Paths starting with `/` are used as-is (e.g., `/blocks/ipynb-viewer/README.mdc`)
  - **Relative path:** Other paths are made absolute from root (e.g., `docs/guide.md` → `/docs/guide.md`)
  - **Full URL:** Paths starting with `http://` or `https://` are used as-is
  - **No default:** If omitted, "Read the Manual" button will not appear (even with `manual` or `notebook` variations)
  - **Example:** `"manual-path": "docs/for-ai/explaining-presentation-notebooks.md"` with `repo` set creates GitHub link

### Recommended Cell Flow

**Cell 0: Hero Header**
- Large gradient background
- Main title with emoji
- Compelling subtitle

**Cell 1: What You'll Learn / Overview**
- Key takeaways
- Icon-enhanced list
- Sets expectations

**Cell 2: Table of Contents**
- Interactive navigation
- Hash links to sections
- Hover effects

**Cells 3+: Content Sections**
- One topic per cell
- Mix of content cards and EDS blocks
- Clear section headers
- Proper spacing

**Final Cell: Conclusion / Call to Action**
- Summary of key points
- Next steps
- Contact information or links

## Best Practices

### Visual Design

✅ **DO:**
- Use emojis for section headers (🎯, 📊, 🚀, ✨, 💡)
- Break content into digestible chunks (3-5 paragraphs per card)
- Use EDS blocks for interactive elements
- Add horizontal rules (`---`) between major sections
- Use **bold** and *italic* for emphasis
- Maintain consistent spacing throughout
- **NEW:** Use pure markdown with auto-wrapping in notebook mode to reduce code by 90%

❌ **DON'T:**
- Overcrowd cells with too much content
- Use more than 3 blocks per cell
- Mix too many colors or fonts
- Forget hover states on interactive elements
- Skip accessibility attributes

### Content Organization

✅ **DO:**
- Start with title and overview
- Include table of contents for presentations >10 cells
- Group related content in blocks
- End with call-to-action or summary
- Use hash links for internal navigation
- Add "Back to top" links in long presentations

❌ **DON'T:**
- Put multiple unrelated topics in one cell
- Create overly deep section hierarchies
- Skip section headers
- Forget to link sections together

### Performance

✅ **DO:**
- Limit to 1-3 blocks per cell
- Use simple inline scripts
- Keep markdown cells focused (one topic per cell)
- Test in paged mode for smooth navigation
- Check loading times on slower connections

❌ **DON'T:**
- Embed heavy libraries in inline scripts
- Create overly complex DOM structures
- Use high-resolution images without optimization
- Add unnecessary animations

### Accessibility

✅ **DO:**
- Use semantic HTML in blocks
- Provide alt text for images
- Maintain clear heading hierarchy (H1 → H2 → H3)
- Use descriptive link text
- Include ARIA attributes on navigation
- Ensure proper color contrast (WCAG AA minimum)

❌ **DON'T:**
- Skip heading levels (H1 → H3)
- Use color alone to convey meaning
- Create keyboard traps
- Forget focus indicators on interactive elements

## Creating Presentation Notebooks

### Method 1: Using Slash Command

```bash
/create-notebook "Presentation Title"
# Follow prompts to specify:
# - Main sections
# - Which EDS blocks to use
# - Styling preferences
```

The command will:
1. Create properly structured notebook
2. Add metadata
3. Apply inline styling to all cells (or use auto-wrapping in notebook mode)
4. Set up EDS blocks with proper initialization
5. Create table of contents with navigation

**NEW: Auto-Wrapping Option**

When creating notebooks for **notebook mode**, you can now use pure markdown without HTML wrappers:

```markdown
# Your Presentation Title

**Compelling tagline** that grabs attention

---

## What You'll Learn

- Key point 1
- Key point 2
- Key point 3
```

The viewer automatically wraps cells with appropriate styling classes based on content patterns. This reduces authoring work by 90% while maintaining beautiful, consistent styling.

### Method 2: Using Skill Directly

```markdown
Use the create-presentation skill to create a presentation notebook about:
- Topic: Product Launch
- Sections: Overview, Features, Pricing, Demo, Contact
- Use cards for features, accordion for FAQ, table for pricing
- Apply Material Design styling throughout
```

### Method 3: Converting Educational Notebook

If you have an existing educational notebook:

```markdown
Convert education-notebook.ipynb to presentation format:
- Remove all executable code cells
- Convert code examples to markdown with explanations
- Add inline HTML styling
- Keep EDS blocks but embed in markdown
- Add table of contents
```

## Converting Code Cells to Markdown

When converting educational notebooks to presentation format:

### Step 1: Show the Code

Display original code in fenced code block:

````markdown
### Code Example: Testing Block

This demonstrates how to test a block programmatically:

**Original code:**
```javascript
const { testBlock } = await import('/scripts/ipynb-helpers.js');
const block = await testBlock('accordion', content);
return block.outerHTML;
```
````

### Step 2: Explain the Purpose

```markdown
**What it does:**
1. Imports the testBlock helper function
2. Tests the accordion block with provided content
3. Returns the rendered HTML for display
```

### Step 3: Show the Result

```markdown
**Result:** The accordion block is decorated and ready for display.

---

**Live Demonstration:**

<div class="accordion block">
  <!-- Actual working accordion HTML -->
</div>

<script type="module">
  const block = document.querySelector('.accordion.block');
  const module = await import('/blocks/accordion/accordion.js');
  await module.default(block);
</script>
```

### Step 4: Add Context

```markdown
**Note:** In presentation mode, code is shown for reference only.
The working result is embedded directly in the presentation.
```

## Workflow

### Step 1: Plan Structure

Identify:
- **Main topic and title** - What's the core message?
- **Key sections** (3-7 sections ideal for presentations)
- **Which blocks fit each section** - accordion, cards, tabs?
- **Navigation needs** - Table of contents? Section links?

### Step 2: Create Metadata

Set up notebook metadata with:
- Title
- Description
- Author
- Date
- Category: "presentation"
- Repository URL

### Step 3: Build Cells

For each section:
1. Markdown header (## or ###)
2. Content explanation with inline styling
3. Embedded EDS block (if needed)
4. Inline script to activate block

### Step 4: Add Navigation

- Table of contents at start
- Hash links between sections
- "Back to top" or "Next section" links
- Hover effects on navigation elements

### Step 5: Apply Styling

Use design system consistently:
- Hero header at top
- Content cards for sections
- EDS block wrappers for blocks
- Interactive navigation for TOC
- Highlight boxes for callouts

### Step 6: Test

- **View in default mode** (scrollable)
- **View in paged mode** (with "Start Reading")
- **Test all interactive blocks** (click, expand, navigate)
- **Verify links work** (hash navigation, external links)
- **Check on mobile** (responsive design)
- **Test accessibility** (keyboard navigation, screen reader)

## Display Variations for Presentations

The ipynb-viewer block supports multiple display variations optimized for different presentation scenarios:

### Available Variations

| Variation | Button Required | Best For |
|-----------|----------------|----------|
| **Basic** (default) | No button | Quick reference, scrollable content |
| **Paged** | Yes ("Start Reading") | Standard presentations, step-by-step |
| **Notebook** | Yes ("Start Reading") | Read-only presentations with auto-wrapping |
| **Autorun** | Yes, auto-executes | Interactive demos with code execution |
| **Index** | No (auto-opens) | Landing pages, immediate engagement |
| **No-Topbar** | Depends on mode | Immersive, distraction-free presentations |

### Index Variation for Landing Pages

The **index variation** is perfect for presentation landing pages that should capture attention immediately:

```html
<div class="ipynb-viewer index block">
  <div>
    <div>presentation.ipynb</div>
  </div>
</div>
```

**Key Features:**
- ✅ **Auto-opens immediately** - No "Start Reading" button needed
- ✅ **Perfect for landing pages** - Immediate visual impact
- ✅ **Full navigation** - Includes navigation tree and all features
- ✅ **Professional UX** - Zero clicks to engagement

**When to Use Index:**
- Product showcase landing pages
- Marketing presentation entry points
- Documentation hub homepages
- Client demo start screens
- Any presentation where immediate viewing is desired

**Implementation:**
```html
<!-- Standard paged presentation -->
<div class="ipynb-viewer paged block">
  <div><div>quarterly-review.ipynb</div></div>
</div>
<!-- User must click "Start Reading" button -->

<!-- Index variation for landing page -->
<div class="ipynb-viewer index block">
  <div><div>quarterly-review.ipynb</div></div>
</div>
<!-- Opens immediately, no button -->
```

**Best Practices:**
- Use index variation for high-impact landing pages
- Ensure first cell (hero) is visually compelling
- Keep load times fast (optimize images)
- Test on various devices for immediate engagement

### Navigation Tree Panel

All paged, notebook, and index variations include a **navigation tree panel** for easy content access:

#### Tree Structure

The navigation tree displays two main sections:

**1. Notebook Section**
Shows your presentation's internal structure:

```
📓 Notebook
├── Frontmatter (if Part headings exist)
│   └── Introduction cells
├── Part 1: Product Overview
│   ├── Features
│   └── Benefits
├── Part 2: Pricing
│   ├── Tiers
│   └── Comparison
└── Summary (if "completed final" heading exists)
    └── Call to Action
```

**Structure Rules:**
- **Frontmatter** - Cells before first "Part" heading (only when Parts exist)
- **Parts** - Major sections with "Part" in heading text
- **Summary** - Section with heading containing BOTH "completed" AND "final"
- **Direct cells** - When no Parts exist, cells appear directly under Notebook

**2. Repository Section**
Shows linked markdown files discovered in your presentation:

```
📁 Repository
├── 📁 docs/
│   ├── product-details.md
│   └── pricing-guide.md
└── README.md
```

**Features:**
- Automatically discovers `.md` links in cells
- Opens markdown files in GitHub-styled overlay
- Organizes by directory structure
- Hidden when no `.md` files are present

#### Tree Features

**Toggle Visibility:**
- Click arrow button (◄/►) in top bar to hide/show tree
- Useful for focusing on content or wide displays
- Smooth transition animation

**Smart Navigation:**
- Click any notebook section to jump there
- Click `.md` files to view documentation
- Expansion state maintained across navigation
- Visual indicator shows current location

**State Management:**
- Single shared tree state across all overlays
- Expansion preferences preserved
- Seamless switching between notebook and markdown views

#### Using the Navigation Tree in Presentations

**For Multi-Section Presentations:**
```markdown
# When viewers navigate your presentation
# 1. Tree shows all sections in sidebar
# 2. Click sections to jump directly
# 3. Click .md links for supporting docs
# 4. Tree remembers expanded/collapsed state
```

**Best Practices:**
- Structure presentations with clear "Part" headings
- Link to relevant markdown documentation
- Use meaningful section titles (shown in tree)
- Keep tree visible for long presentations
- Hide tree for focused content viewing

**Navigation Workflow:**
```
Viewer opens presentation →
  Tree shows all sections →
    Click "Part 2: Pricing" →
      Jumps to pricing section →
        Click "pricing-guide.md" →
          Opens detailed guide in overlay →
            Close guide →
              Returns to presentation at same location
```

### No-Topbar Variation for Immersive Presentations

The **no-topbar variation** removes the top bar completely for a distraction-free, immersive viewing experience:

```html
<div class="ipynb-viewer paged no-topbar block">
  <div>
    <div>presentation.ipynb</div>
  </div>
</div>
```

**Key Features:**
- ✅ **Hidden top bar** - No title, buttons, or navigation controls visible
- ✅ **Hidden navigation tree** - Tree is automatically hidden (no toggle button available)
- ✅ **Maximum content area** - Content extends from top to bottom pagination
- ✅ **Keyboard shortcuts** - ESC key and backdrop click still work for closing
- ✅ **Combines with any mode** - Works with `paged`, `notebook`, `autorun`, or `index`

**Use Cases:**
- Formal presentations without UI distraction
- Kiosk displays or public installations
- Embedded presentations in other apps
- Marketing demos with clean aesthetics
- Training videos or recorded demos
- Full-screen immersive storytelling

**Powerful Combinations:**

```html
<!-- Immersive auto-opening landing page -->
<div class="ipynb-viewer index no-topbar block">
  <div><div>product-showcase.ipynb</div></div>
</div>
```
Opens immediately with zero UI - perfect for landing pages and showcases.

```html
<!-- Distraction-free presentation mode -->
<div class="ipynb-viewer notebook no-topbar block">
  <div><div>quarterly-review.ipynb</div></div>
</div>
```
Full presentation experience without any visual clutter.

```html
<!-- Kiosk or embedded display -->
<div class="ipynb-viewer autorun no-topbar block">
  <div><div>interactive-demo.ipynb</div></div>
</div>
```
Auto-executing demo with minimal UI - perfect for trade shows.

**When to Use:**
- ✅ Formal presentations or client meetings
- ✅ Public kiosks or digital signage
- ✅ Embedded content in other applications
- ✅ Marketing materials and product showcases
- ✅ When content should be the absolute focus
- ⚠️ Not recommended for complex multi-section presentations requiring navigation
- ❌ Don't use if users need access to help, history, or bookmarks

**Navigation Without Top Bar:**
- Use arrow keys or pagination controls at bottom
- ESC key closes overlay
- Backdrop click closes overlay
- Hash links within content still work for jumping between sections

## ipynb-viewer Integration

Presentation notebooks work perfectly with the ipynb-viewer block:

### Display Modes

**Paged Mode (Recommended for Presentations):**
```markdown
<div class="ipynb-viewer block" data-mode="paged">
  <div>
    <div>path/to/presentation.ipynb</div>
  </div>
</div>
```

Benefits:
- "Start Reading" button
- Page-by-page navigation
- Smooth transitions
- Focus on one section at a time

**Basic Mode (For Full Scrolling):**
```markdown
<div class="ipynb-viewer block">
  <div>
    <div>path/to/presentation.ipynb</div>
  </div>
</div>
```

Benefits:
- See entire presentation at once
- Scroll through content
- Better for quick reference

**See:** `blocks/ipynb-viewer/README.md` for complete display options

## Examples

### Complete Presentation Notebook

**Real example:** `docs-navigation-presentation-enhanced.ipynb`

This notebook demonstrates:
- Hero header with gradient and large typography
- Interactive table of contents with hover effects
- Content cards with consistent styling
- EDS block wrappers with light blue gradients
- Accordion blocks for navigation paths
- Cards blocks for statistics
- Tab blocks for comparisons
- Proper spacing and typography throughout

### Minimal Presentation Template

```markdown
# Cell 0: Hero Header
<div style="background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%); color: white; border-radius: 16px; padding: 48px; text-align: center; margin: 32px 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">
<h1 style="font-size: 48px; font-weight: 800; margin: 0 0 16px 0;">
🎯 Presentation Title
</h1>
<p style="font-size: 20px; margin: 16px 0; opacity: 0.95;">
Your compelling subtitle
</p>
</div>

# Cell 1: Overview
<div style="background: white; border-radius: 12px; padding: 28px; margin: 20px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
<h3 style="color: #1976d2; font-size: 24px; font-weight: 700; margin-bottom: 20px;">
What You'll Learn
</h3>
<div style="color: #212121; line-height: 1.8; font-size: 16px;">

- Key point 1
- Key point 2
- Key point 3

</div>
</div>

# Cell 2: Content Section
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #0288d1;">

## Section Title

Content explanation before the block

---

<div class="cards block">
  <div>
    <div><strong>Point 1</strong></div>
    <div>Description</div>
  </div>
</div>

<script type="module">
  const block = document.querySelector('.cards.block');
  if (block) {
    const module = await import('/blocks/cards/cards.js');
    await module.default(block);
  }
</script>

</div>
```

## Troubleshooting

### Blocks Not Rendering

**Problem:** EDS blocks show as plain HTML

**Solution:**
```javascript
// Check script tag is present and correct
<script type="module">
  const block = document.querySelector('.block-name.block');
  if (block) {
    const module = await import('/blocks/block-name/block-name.js');
    await module.default(block);
  }
</script>
```

### Styling Not Applied

**Problem:** Inline styles not showing

**Solution:**
- Check for unclosed HTML tags
- Verify style attribute syntax: `style="property: value;"`
- Ensure quotes are properly escaped in nested HTML

### Links Not Working

**Problem:** Hash links don't navigate

**Solution:**
- Use proper markdown heading IDs: `## My Section` becomes `#my-section`
- Or add explicit IDs: `<h2 id="custom-id">My Section</h2>`
- Test in ipynb-viewer on actual page (not just VS Code)

### Paged Mode Not Working

**Problem:** "Start Reading" button doesn't appear

**Solution:**
- Ensure `data-mode="paged"` attribute is set on ipynb-viewer block
- Check notebook has multiple cells (paged mode needs >1 cell)
- Verify ipynb-viewer block JavaScript is loading

### Inline JavaScript Not Working

**Problem:** Hover effects with `onmouseover`/`onmouseout` don't work in production

**Solution:**
- **Never use inline JavaScript event handlers** - They're blocked by browser security
- **Use CSS `:hover` pseudo-class** - Safe and reliable
- **Define classes with `<style>` tags** - Reusable and maintainable

**Example:**
```html
<!-- ❌ WRONG - Blocked by security -->
<a href="#section" onmouseover="this.style.background='#f5f5f5'">Link</a>

<!-- ✅ CORRECT - Use CSS :hover -->
<style>
.my-link:hover {
  background: #f5f5f5;
}
</style>
<a href="#section" class="my-link">Link</a>
```

**Why:** The ipynb-viewer uses `innerHTML` to render markdown cells. Browsers block inline JavaScript event handlers for security when content is inserted this way.

### Inconsistent Fonts in Overlay

**Problem:** Heading sizes change between slides, making text appear larger or smaller

**Solution:**
- The ipynb-viewer now respects inline font-size styles in overlay mode (fixed in v3, Jan 2025)
- Headings with inline styles (e.g., `style="font-size: 26px"`) display at correct sizes
- Base CSS heading sizes no longer override inline styles
- No action needed - this is now handled automatically

**Technical Details:**
```css
/* Applied automatically by ipynb-viewer.css */
.ipynb-paged-overlay .ipynb-markdown-cell h1,
.ipynb-paged-overlay .ipynb-markdown-cell h2,
.ipynb-paged-overlay .ipynb-markdown-cell h3 {
  font-size: revert !important;  /* Respects inline styles */
  font-family: inherit !important;  /* Inherits presentation font */
}
```

**Why:** Base CSS set h1 to 2rem, h2 to 1.5rem, etc. Using `revert` allows inline styles to take precedence.

### Overlay "Jumping" Between Slides

**Problem:** Overlay resizes or moves vertically when navigating, causing a "jumping" effect

**Solution:**
- Overlay is now completely locked in size and position (fixed in v3, Jan 2025)
- Vertically centered with fixed 85vh height using `!important` on all properties
- Content scrolls inside cell area, overlay container never resizes
- Flex layout explicitly constrained to prevent content from affecting size
- No action needed - this is now handled automatically

**Technical Details:**
```css
/* Applied automatically by ipynb-viewer.css */
.ipynb-paged-overlay {
  align-items: center;  /* Vertically centered */
}

.ipynb-paged-overlay-content {
  height: 85vh !important;
  min-height: 85vh !important;
  max-height: 85vh !important;
  overflow: hidden !important;
}

.ipynb-paged-cell-area {
  flex: 1 1 0 !important;
  overflow-y: auto !important;
  max-height: 100% !important;
}
```

**Why:** Using `!important` prevents any CSS specificity issues. Content that's too tall scrolls within the cell area.

### Multiple Overlays Appearing

**Problem:** Overlay appears duplicated or behaves unpredictably after page refresh or re-rendering

**Solution:**
- ipynb-viewer now removes existing overlays before creating new ones (fixed in v3, Jan 2025)
- Prevents overlay multiplication on page re-renders or block re-decoration
- No action needed - cleanup is automatic

**Technical Details:**
```javascript
// Applied automatically in ipynb-viewer.js
const existingOverlays = document.querySelectorAll('.ipynb-paged-overlay');
existingOverlays.forEach(overlay => overlay.remove());
```

**Why:** Each block decoration created a new overlay without removing old ones, causing stacking and unpredictable behavior.

**Note:** All fixes applied January 2025 (v3) - overlay is now completely stable with consistent sizing, typography, and no duplicate instances.

## Templates

Ready-to-use notebook templates are available:

- **Auto-Wrapped Template:** `docs/for-ai/templates/ipynb/presentation-template.ipynb` - Pure markdown template for notebook mode (90% less code)
- **Unstyled Template:** `docs/for-ai/templates/ipynb/unstyled-template.ipynb` - Basic markdown structure
- **Educational Template:** `docs/for-ai/templates/ipynb/educational-template.ipynb` - Interactive learning template

**Recommendation:** Start with the auto-wrapped template for fastest authoring in notebook mode. Use pure markdown and let auto-wrapping handle styling automatically.

## Related Documentation

- **Educational Notebooks:** `docs/for-ai/explaining-educational-notebooks.md` - Interactive, executable notebooks
- **Jupyter Testing:** `docs/for-ai/explaining-jupyter.md` - Testing EDS blocks with Jupyter
- **ipynb-viewer Block:** `blocks/ipynb-viewer/README.md` - Displaying notebooks on web pages
- **EDS Block Development:** `docs/for-ai/core/block-decoration.md` - How blocks work
- **Create Presentation Skill:** `.claude/skills/create-presentation/SKILL.md` - Skill documentation

## Related Skills

- **create-presentation** - Create or update presentation notebooks
- **jupyter-educational-notebook** - Create interactive educational content
- **frontend-dev-guidelines** - Styling and design best practices
- **eds-block-development** - Understanding block architecture

## Related Commands

- `/create-notebook` - Creates educational (interactive) notebooks
- `/create-presentation` - Creates presentation (non-interactive) notebooks (planned)

---

**Quick Tips:**

1. **Start with hero header** - Make first impressions count
2. **One topic per cell** - Keep focus clear
3. **Use blocks wisely** - 1-3 per cell maximum
4. **Test in paged mode** - Best presentation experience
5. **Consistent styling** - Use design system throughout
6. **Accessible navigation** - Hash links and hover effects
7. **Mobile-friendly** - Test responsive design
8. **NEW: Use auto-wrapping** - Write pure markdown in notebook mode (90% less code!)

**Remember:** Presentation notebooks are about **viewing**, not **executing**. Beautiful visuals + embedded interactivity = compelling presentations.

**Pro Tip:** For notebook mode, skip the HTML wrappers entirely and let the auto-wrapping feature handle styling automatically based on your markdown patterns!
