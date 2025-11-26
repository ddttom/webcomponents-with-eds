# Educational Jupyter Notebooks Guide

## Overview

Educational Jupyter notebooks are interactive Single Page Applications (SPAs) designed to explain concepts, teach topics, and create engaging content for end users, learners, and clients. They are displayed via the ipynb-viewer block and focus on education rather than technical testing.

> **📚 Notebook Types Reference:** For complete classification of all three notebook types (Testing, Educational, Presentation), see [Explaining Jupyter - Notebook Types Reference](explaining-jupyter.md#notebook-types-reference).

## Purpose and Use Cases

### What Are Educational Notebooks?

Educational notebooks transform static documentation into interactive learning experiences where readers can:

- **Read explanations** in beautifully formatted markdown
- **Run code examples** directly in the browser
- **See results immediately** with inline output
- **Experiment with code** by modifying and re-running cells
- **Progress through content** at their own pace

### When to Use Educational Notebooks

✅ **Use educational notebooks for:**

- **Blog posts** - Engaging articles with live demonstrations
- **Tutorials** - Step-by-step learning with hands-on practice
- **Concept explanations** - Deep dives into technical topics
- **Reference guides** - Documentation with runnable examples
- **Interactive demos** - Showcasing features and capabilities
- **Onboarding materials** - Team training and documentation
- **Client presentations** - Professional, interactive demonstrations

❌ **Do NOT use educational notebooks for:**

- Testing EDS blocks (use `jupyter-notebook-testing` skill instead)
- Debugging block decoration
- Creating test.html files
- Technical QA and verification
- Development testing workflows

### Key Distinction: Educational vs Testing

| Aspect | Testing Notebooks | Educational Notebooks |
|--------|-------------------|----------------------|
| **Primary audience** | Developers testing blocks | End users, learners, clients |
| **Main purpose** | Verify block functionality works | Teach concepts and demonstrate ideas |
| **Content ratio** | 30% markdown, 70% code | 60% markdown, 40% code |
| **Code focus** | Block decoration, jsdom testing | Demonstrations, explanations, examples |
| **Language style** | Technical, developer-focused | Engaging, accessible, pedagogical |
| **Helper functions** | testBlock(), saveBlockHTML() | Pure JavaScript, sometimes helpers |
| **Structure** | Ad-hoc test scenarios | Narrative flow with progressive parts |
| **File naming** | test.ipynb, test-*.ipynb | blog.ipynb, tutorial.ipynb, guide.ipynb |
| **Keywords** | testing, debug, testBlock, jsdom | tutorial, explain, teach, interactive guide |

## Getting Started

### Creating Your First Educational Notebook

There are two ways to create educational notebooks:

#### Option 1: Use the Slash Command

The `/create-notebook` command provides guided creation:

```
/create-notebook
```

You'll be asked:
1. What topic or content to cover
2. Who the target audience is
3. What notebook type to create
4. What should be included

The command will guide you through the entire creation process.

#### Option 2: Invoke the Skill Directly

Activate the skill for comprehensive guidance:

```
Use the jupyter-educational-notebook skill to help me create a tutorial about [topic]
```

The skill provides:
- Complete creation guidelines
- Content organization strategies
- Templates and examples
- Best practices

### Sample Prompts

Here are example prompts that trigger the educational notebook skill:

**Blog post creation:**
```
Create an educational notebook as a blog post explaining how EDS blocks work
```

**Tutorial creation:**
```
I want to create an interactive tutorial notebook teaching JavaScript array methods
```

**Transforming existing content:**
```
Transform this article about React hooks into an interactive notebook with examples
```

**Concept explanation:**
```
Create a notebook that explains the decorator pattern with live demonstrations
```

**Reference guide:**
```
Build a reference notebook documenting all the helper functions with examples
```

**Interactive demo:**
```
Make an interactive demo notebook showcasing the tabs block capabilities
```

**From text content:**
```
I have a long document about CSS grid. Help me turn it into an engaging notebook.
```

## Notebook Types and Structures

### 1. Blog Post Notebook

**Best for:** Engaging content optimized for shareability

**Characteristics:**
- 30-45 cells total
- 65% markdown, 35% code
- Professional and polished
- Call-to-action at the end

**Structure:**
```markdown
Cell 1: Title, hook, "what is this?"
Cell 2: Table of Contents
Cells 3-40: Progressive Parts (Part 1 through Part 8)
Cell 41: Call-to-action, contact information
```

**Example:** `blog.ipynb` - Interactive blog post about ipynb-viewer

**When to use:**
- Publishing thought leadership
- Showcasing product features
- Sharing tutorials publicly
- Marketing and outreach

### 2. Tutorial Notebook

**Best for:** Step-by-step learning with practice

**Characteristics:**
- 20-30 cells total
- 70% markdown, 30% code
- Clear learning objectives
- Exercises and solutions

**Structure:**
```markdown
Cell 1: Tutorial header, objectives, prerequisites
Cell 2: Table of Contents
Part 1: Foundation (understand basics)
Part 2: Building (create something)
Part 3: Testing (verify it works)
Part 4: Advanced (power features)
Summary: Recap, next steps, resources
```

**When to use:**
- Teaching new skills
- Onboarding team members
- Training materials
- Course content

### 3. Concept Explanation Notebook

**Best for:** Deep technical dives

**Characteristics:**
- 15-25 cells total
- 55% markdown, 45% code
- Problem/solution framing
- Technical depth

**Structure:**
```markdown
Cell 1: Concept introduction
Cells 2-3: Problem statement
Cells 4-10: How it works (theory + demonstrations)
Cells 11-15: Technical details and edge cases
Cells 16-20: Best practices
Cells 21-25: Summary and applications
```

**Example:** `explain.ipynb` - System architecture explanation

**When to use:**
- Explaining complex systems
- Architectural documentation
- Technical deep dives
- Knowledge sharing

### 4. Reference Guide Notebook

**Best for:** API documentation and quick lookup

**Characteristics:**
- 25-40 cells total
- 40% markdown, 60% code
- Comprehensive coverage
- Organized by feature

**Structure:**
```markdown
Cell 1: Reference header, quick reference table
Cell 2: Table of Contents
Cells 3-35: Function/feature docs (pairs of markdown + code)
Cells 36-40: Common patterns, summary
```

**When to use:**
- API documentation
- Function libraries
- Command references
- Quick lookup guides

### 5. Interactive Demo Notebook

**Best for:** Quick capability showcasing

**Characteristics:**
- 15-20 cells total
- 30% markdown, 70% code
- Minimal explanation
- Maximum demonstration

**Structure:**
```markdown
Cell 1: Demo introduction
Cells 2-15: Rapid demonstrations (mostly code)
Cells 16-18: "Try it yourself" prompts
Cells 19-20: Next steps, links
```

**When to use:**
- Product demos
- Feature showcases
- Quick proofs of concept
- Client presentations

## Content Creation Workflow

### Step 1: Define Your Goal

Ask yourself:
- **What** do I want to teach or explain?
- **Who** is my target audience?
- **Why** should they care about this?
- **How** can I make it interactive?

### Step 2: Choose Your Notebook Type

Based on your goal, select:
- **Blog** → Engaging, shareable content
- **Tutorial** → Step-by-step learning
- **Explanation** → Deep technical dive
- **Reference** → Documentation and lookup
- **Demo** → Quick showcasing

### Step 3: Organize Your Content

**If starting from text:**
1. Identify 3-5 main topics
2. Find natural section breaks
3. Spot opportunities for code examples
4. Group related content into parts

**If creating from scratch:**
1. Outline your key points
2. Order from simple to complex
3. Plan demonstrations for each point
4. Design progressive learning path

### Step 4: Structure Your Notebook

**Always include:**
- ✅ Title cell with hook
- ✅ Table of Contents
- ✅ Clear part/section headers
- ✅ Progressive complexity
- ✅ Summary and next steps

**Content balance:**
- 60% markdown / 40% code (typical)
- Adjust based on notebook type
- Pair explanations with demonstrations
- Use console.log() for visibility

### Step 5: Write Engaging Content

**Markdown best practices:**
- Use emojis in headers (sparingly)
- Create tables for comparisons
- Use lists for key points
- Add code blocks for syntax examples
- Include links for navigation

**Code best practices:**
- Clear, explanatory comments
- console.log() for visibility
- Return meaningful values
- Encourage experimentation
- Start simple, build complexity

### Step 6: Add Interactivity

Transform static content into interactive experiences:

**Strategy 1: Use Visual Block Demonstrations (RECOMMENDED)**
```javascript
// Import showPreview to display beautiful overlays
const { showPreview } = await import('/scripts/ipynb-helpers.js');

// Create content for the block
const content = '<div><div>Option 1</div><div>Description of option 1</div><div>Option 2</div><div>Description of option 2</div></div>';

console.log('✨ Showing visual comparison...');
await showPreview('accordion', content);

return '✓ Beautiful visual demonstration';
```

**Available blocks for engagement:**
- **accordion** - Collapsible comparisons, Q&A
- **cards** - Feature showcases, categories
- **tabs** - Multiple options, step-by-step
- **grid** - Organized layouts
- **table** - Data comparisons
- **hero** - Key messages, highlights
- **quote** - Inspirational text
- **code-expander** - Expandable code

**Strategy 1b: Use Action Cards for Navigation (NEW)**

Action cards provide beautiful navigation links in any cell using pure markdown:

```markdown
# Getting Started Guide

Learn the fundamentals step by step.

<!-- action-cards -->

- [Installation](#)
- [Your First Block](#)
- [Advanced Topics](#)
```

**Features:**
- ✅ Pure markdown - no HTML required
- ✅ Works in any cell type (hero, content, intro)
- ✅ **Smart link resolution** - Automatically finds matching headings at runtime
- ✅ No hardcoded cell IDs needed - just descriptive link text
- ✅ Consistent blue design - professional appearance
- ✅ Hover effects and animated arrows
- ✅ Perfect for navigation in hero cells

**How it works:**
1. Add `<!-- action-cards -->` HTML comment in your markdown cell
2. Follow with a markdown list of links using `(#)` as placeholder
3. Write link text that matches heading text somewhere in your notebook
4. JavaScript automatically finds the matching cell and updates href
5. No maintenance needed when cells move or headings change

**Important:** The `<!-- action-cards -->` marker only applies to the **first list** that follows it. Any subsequent lists in the same cell will remain as normal bullet lists.

**Example matching:**
- `[Installation](#)` finds heading containing "Installation" (like "## Installation" or "### Installation Guide")
- `[Basic Concepts](#)` finds heading containing "Basic Concepts" (like "## Part 1: Basic Concepts")
- Link text doesn't need exact match - searches for headings that *contain* your link text

**Best Practices:**
- ✅ Use specific link text: `[Part 1: Introduction](#)` instead of just `[Introduction](#)`
- ✅ Make link text unique to avoid ambiguity
- ⚠️ If multiple headings match, it picks the **first one found** (in cell order)
- 💡 Tip: Use part numbers or descriptive prefixes to ensure unique matches

**When to use action cards:**
- Hero cells with navigation options
- Section introductions with links
- Quick reference sections
- Tutorial navigation
- Multi-part content flow

### Understanding Link Types in Educational Notebooks

Educational notebooks use two independent link systems for different purposes:

#### Smart Navigation Links (Internal Navigation)

Smart linking works for **any link with `(#)` as the href**, not just action cards. This makes internal navigation resilient to notebook changes.

**How it works:**
- Use `(#)` as href placeholder: `[Topic Name](#)`
- JavaScript searches all cells for headings matching the link text
- Matching is case-insensitive and ignores emojis/special characters
- Link resolves to `#cell-{index}` automatically at runtime
- No hardcoded cell IDs - links adapt when cells are reordered

**Examples in educational content:**
```markdown
# Table of Contents
- [📖 Introduction](#)
- [🔧 Setup Guide](#)
- [💡 Advanced Topics](#)
- [🎯 Practice Exercises](#)

# In tutorial flow
Continue to [Next Lesson](#) or go back to [Previous Lesson](#).

# Action cards (same smart linking)
<!-- action-cards -->
- [Chapter 1: Basics](#)
- [Chapter 2: Intermediate](#)
- [Chapter 3: Advanced](#)
```

**Best practices for educational content:**
- Use clear, descriptive heading text that students can understand
- Include emojis in headings for visual learning (they're ignored in matching)
- Create natural "next" and "previous" navigation flows
- Keep link text concise but unique enough to match correctly
- Works everywhere: action cards, inline text, tables, lists

#### Repository Links (External Resources)

Links ending in `.md` automatically convert to GitHub URLs using the notebook's `repo` metadata. Perfect for linking to comprehensive documentation while keeping the notebook focused.

**How it works:**
- Link to `.md` files: `[guide.md](docs/guide.md)`
- ipynb-viewer reads `repo` from notebook metadata
- Converts to: `{repo}/blob/main/docs/guide.md`
- Opens in new tab with GitHub's markdown renderer

**Setup in notebook metadata:**
```json
{
  "metadata": {
    "repo": "https://github.com/username/project"
  }
}
```

**Educational examples:**
```markdown
# 📚 Additional Resources

Learn more in these detailed guides:
- [Complete API Reference](docs/api-reference.md)
- [Architecture Deep Dive](docs/architecture.md)
- [Testing Guidelines](docs/testing-guide.md)

For troubleshooting, see [FAQ.md](docs/FAQ.md)
```

**When to use repository links in educational content:**
- Link to comprehensive documentation
- Reference external tutorials
- Point to API documentation
- Provide "deep dive" resources
- Link to code examples in the repo

#### Combining Both Link Types in Tutorials

Both systems work together seamlessly for effective educational content:

```markdown
# 🎓 Lesson 3: Advanced Concepts

<!-- action-cards -->
- [Back to Lesson 2](#)       <!-- Smart link: previous lesson -->
- [Continue to Lesson 4](#)   <!-- Smart link: next lesson -->
- [Back to Start](#)          <!-- Smart link: intro cell -->

## What You'll Learn
In this lesson, we'll explore advanced patterns...

## Need More Details?
- [Architecture Guide](docs/for-ai/implementation/architecture.md)  <!-- Repo link -->
- [Best Practices](docs/for-ai/guidelines/best-practices.md)       <!-- Repo link -->

## Practice Exercise
Try implementing what you learned, then [check the solution](#).   <!-- Smart link -->
```

**Benefits for learners:**
- **Smart links** keep them in the learning flow (same page, instant navigation)
- **Repo links** provide optional deep dives (new tab, comprehensive docs)
- Clear separation between tutorial content and reference material
- Students can explore at their own pace

**Strategy 2: Add "try it yourself" moments**
```javascript
// Try changing these values!
const yourName = 'World';  // <-- Change this!
const emoji = '👋';        // <-- Try different emojis!

const greeting = emoji + ' Hello, ' + yourName + '!';
console.log(greeting);

return greeting;
```

**Strategy 3: Combine interactivity with visual display**
```javascript
const { showPreview } = await import('/scripts/ipynb-helpers.js');

// User can modify these
const title = 'My Project';
const description = 'Description here';

const content = '<div><div>' + title + '</div><div>' + description + '</div></div>';
await showPreview('hero', content);

return 'Try changing the title and description!';
```

**Strategy 4: Include edge case testing**
```javascript
// Test different scenarios
const testCases = [
  { name: 'Empty', data: '' },
  { name: 'Single', data: [1] },
  { name: 'Many', data: [1,2,3,4,5] }
];

testCases.forEach(test => {
  const result = process(test.data);
  console.log(`${test.name}: ${result}`);
});
```

### Step 7: Test and Refine

**Before publishing:**
1. ✅ Run all code cells to verify they work
2. ✅ Check markdown formatting renders correctly
3. ✅ Verify Table of Contents links work
4. ✅ Test narrative flow (does it make sense?)
5. ✅ Get feedback from target audience
6. ✅ Refine based on feedback

## Code Patterns

### Pure JavaScript Examples

Use for general concepts that don't require EDS blocks:

```javascript
// Demonstrating a concept
const fibonacci = (n) => n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);
const sequence = Array.from({ length: 10 }, (_, i) => fibonacci(i));

console.log('Fibonacci sequence:', sequence);
return sequence;
```

### EDS Block Demonstrations (RECOMMENDED)

Use blocks to create beautiful visual demonstrations:

```javascript
// Import showPreview (no initialization needed!)
const { showPreview } = await import('/scripts/ipynb-helpers.js');

// Create content for the block
const content = '<div><div>Tab 1</div><div>Content for tab 1</div><div>Tab 2</div><div>Content for tab 2</div></div>';

console.log('✨ Displaying interactive tabs...');
await showPreview('tabs', content);

return '✓ Check the overlay preview!';
```

**Choosing the right block:**

| Content Type | Best Block | Example Use |
|--------------|-----------|-------------|
| Comparisons, Q&A | `accordion` | Before/After, FAQ sections |
| Features, tips | `cards` | Pro tips, feature showcase |
| Steps, options | `tabs` | Tutorial steps, variations |
| Organized data | `grid` | Multiple examples, gallery |
| Structured data | `table` | Comparison tables, specs |
| Key messages | `hero` | Important announcements |
| Quotes, inspiration | `quote` | Final messages, key insights |
| Long code | `code-expander` | Complete examples |

**Example - Using cards for pro tips:**
```javascript
const { showPreview } = await import('/scripts/ipynb-helpers.js');

const content = '<div><div><strong>Tip 1: Start Simple</strong></div><div>Begin with basic examples before adding complexity</div><div><strong>Tip 2: Use Console</strong></div><div>Always log intermediate steps for visibility</div><div><strong>Tip 3: Return Values</strong></div><div>Return meaningful results from each cell</div></div>';

await showPreview('cards', content);
return '✓ Visual tips displayed';
```

### Interactive Calculations

Use for demonstrating algorithms or computations:

```javascript
// Interactive calculation - modify inputs!
const principal = 10000;  // Initial investment
const rate = 0.05;        // 5% annual return
const years = 10;         // Investment period

const futureValue = principal * Math.pow(1 + rate, years);
const totalGain = futureValue - principal;

console.log(`Investment: $${principal}`);
console.log(`After ${years} years: $${futureValue.toFixed(2)}`);
console.log(`Total gain: $${totalGain.toFixed(2)}`);

return {
  initial: principal,
  final: futureValue,
  gain: totalGain
};
```

### Comparison Demonstrations

Use to show differences between approaches:

```javascript
// Compare two approaches
const traditional = [1,2,3,4,5].filter(x => x > 2).map(x => x * 2);
const modern = [1,2,3,4,5].flatMap(x => x > 2 ? [x * 2] : []);

console.log('Traditional approach:', traditional);
console.log('Modern approach:', modern);
console.log('Same result?', JSON.stringify(traditional) === JSON.stringify(modern));

return { traditional, modern };
```

## Markdown Formatting

### Headers with Emojis

Use emojis to add visual interest (sparingly):

```markdown
## 🚀 Getting Started
## 💡 Key Insights
## ⚠️ Common Pitfalls
## ✅ Best Practices
## 📚 Resources
## 🎯 Summary
```

### Tables for Comparisons

Great for showing differences:

```markdown
| Feature | Before | After |
|---------|--------|-------|
| Speed | Slow | Fast |
| Code | Complex | Simple |
| Learning Curve | Steep | Gentle |
```

### Lists for Key Points

Use for enumeration:

```markdown
**Benefits:**
✅ Easy to use
✅ Fast performance
✅ Great documentation
✅ Active community

**Common mistakes:**
❌ Skipping error handling
❌ Not testing edge cases
❌ Ignoring performance
```

### Code Blocks (Not Executable)

For syntax reference in markdown:

````markdown
Here's the syntax:

```javascript
const example = 'This shows syntax, not execution';
function demo() {
  return example;
}
```
````

### Links and Navigation

Internal navigation:

```markdown
[Jump to Part 3](#part-3-advanced-topics)
```

External resources:

```markdown
[Documentation](https://example.com/docs)
[GitHub Repository](https://github.com/user/repo)
```

## Validation Requirements for Navigation Notebooks

**CRITICAL:** Educational navigation notebooks (with multi-part structures) require specific validation to ensure production readiness.

### Action Cards in Transition Cells (REQUIRED)

Navigation notebooks with numbered parts MUST include action cards in transition cells between parts. This is the **#1 validation failure** (catches 80% of issues).

**What are transition cells?**
Cells that appear between major parts or lessons with this structure:
- Part/Lesson X heading (e.g., `### Lesson 2: Advanced Concepts`)
- Progress indicator with dots (e.g., `**Progress: 2 of 5** 🔵🔵⚪⚪⚪`)
- Reading time estimate (e.g., `**Reading time: 4 minutes**`)
- Contextual text explaining what's coming next

**Required format:**
```markdown
### Lesson 2: Intermediate Patterns
**Progress: 2 of 5** 🔵🔵⚪⚪⚪
**Reading time: 4 minutes**

Now that you've mastered the basics, let's explore more advanced patterns...

<!-- action-cards -->

- [Array Methods](#)
- [Object Manipulation](#)
- [Functional Patterns](#)
- [Error Handling](#)
```

**Validation checks:**
- ✅ Every transition cell MUST have `<!-- action-cards -->` marker
- ✅ Must have 3-6 action card links (markdown list)
- ✅ Each link must use `(#)` placeholder pattern
- ✅ Links must resolve to actual headings in the notebook

**Common failure:**
```markdown
### Lesson 2: Intermediate Patterns
**Progress: 2 of 5** 🔵🔵⚪⚪⚪
**Reading time: 4 minutes**

Now that you've mastered the basics...
<!-- Missing action cards marker and links! -->
```

**Before deployment, run validation:**
```bash
/validate-notebook your-tutorial.ipynb
```

Expected score: ≥90/100 for production ready

**See also:**
- `.claude/skills/ipynb-validator/SKILL.md` - Complete validation guide
- `.claude/commands/validate-notebook.md` - Validation command details
- `docs/for-ai/templates/ipynb/README.md` - Template structure and validation

### When Validation is Required

Run `/validate-notebook` for multi-part educational notebooks with numbered lessons or sections before deployment. For simple tutorials without parts, validation may not be necessary.

**Multi-part tutorials have:**
- Numbered lessons/parts (Lesson 1, Part 2, etc.)
- Transition cells between major sections
- Multi-lesson structure with progress tracking

**Simple tutorials have:**
- Single-flow content without numbered parts
- No transition cells
- No progress indicators

### Action Cards for Navigation (Beyond Validation)

While validation focuses on transition cells, action cards can enhance any educational content. Use them in hero cells, section introductions, or anywhere you want to provide clear navigation options.

**Example in hero cell:**
```markdown
# 🎓 JavaScript Mastery Tutorial

Master JavaScript from basics to advanced concepts.

<!-- action-cards -->

- [Getting Started](#)
- [Core Concepts](#)
- [Advanced Topics](#)
- [Practice Exercises](#)
```

This provides learners with clear navigation choices from the start.

## Cell Ordering Best Practices

**CRITICAL:** Proper cell ordering creates smooth learning progression and prevents confusion.

### Correct Structure Pattern for Educational Notebooks

```
Header Cell (Cell 0)
  → Title with hook
  → "What is this?"
  → Table of Contents

Introduction Section
  → Learning objectives
  → Prerequisites
  → What you'll build

Part 1: Foundation
  → Concept explanation (markdown)
  → Code demonstration
  → "What just happened?" (markdown)
  → Practice exercise (optional)

Part 2: Building
  → Next concept (markdown)
  → Code demonstration
  → Explanation (markdown)
  → Practice exercise (optional)

Part 3-N: Progressive Complexity
  → Continue pattern above
  → Build on previous concepts

Summary Section
  → Recap key points
  → Next steps
  → Additional resources
  → Call-to-action
```

### Common Cell Ordering Mistakes

❌ **WRONG:** Code before explanation
```markdown
Cell 5: [CODE] Complex implementation
Cell 6: [MARKDOWN] What this code does ← Explanation comes too late
```

✅ **CORRECT:** Explain, then demonstrate
```markdown
Cell 5: [MARKDOWN] We'll use map() to transform arrays
Cell 6: [CODE] const doubled = [1,2,3].map(x => x * 2);
Cell 7: [MARKDOWN] Notice how map() returns a new array
```

❌ **WRONG:** Advanced before basics
```markdown
Cell 3: [CODE] Advanced async/await patterns
Cell 10: [CODE] Basic Promise syntax ← Should come first
```

✅ **CORRECT:** Progressive complexity
```markdown
Cell 3: [CODE] Basic Promise syntax
Cell 5: [CODE] Promise.then() chains
Cell 8: [CODE] async/await patterns
```

❌ **WRONG:** Summary in the middle
```markdown
Cell 15: Summary of Part 1
Cell 16: More Part 1 content ← Out of order
Cell 17: Part 2 starts
```

✅ **CORRECT:** Summary at end of section
```markdown
Cell 15: Last Part 1 content
Cell 16: Summary of Part 1 ← Proper ending
Cell 17: Part 2 transition
Cell 18: Part 2 starts
```

### Tutorial-Specific Ordering

For step-by-step tutorials:

```
Setup Section
  → Installation instructions
  → Environment setup
  → Verification

Lesson 1
  → Concept introduction
  → Step 1: Basic example
  → Step 2: Add complexity
  → Step 3: Complete example
  → Lesson 1 recap

Lesson 2
  → Build on Lesson 1
  → Follow same pattern

Practice Section
  → Exercises
  → Solutions (separate cells)

Conclusion
  → What you've learned
  → Projects to try
  → Resources
```

### Reference Guide Ordering

For API/function documentation:

```
Introduction
  → Overview
  → Quick reference table

Function Group 1
  → Function 1 description
  → Function 1 code example
  → Function 2 description
  → Function 2 code example

Function Group 2
  → Continue pattern

Common Patterns
  → Real-world examples
  → Best practices

Summary
  → When to use what
  → Links to related docs
```

### Validation Before Publishing

Check learning progression:
1. ✅ Concepts build logically (simple → complex)
2. ✅ Each code cell has preceding explanation
3. ✅ "What just happened?" follows demonstrations
4. ✅ Exercises come after relevant concepts
5. ✅ Summary at end of each major section
6. ✅ No orphaned or out-of-sequence cells

Test the learning flow:
```python
# Ask yourself:
# - Can a beginner follow this order?
# - Does each cell build on previous knowledge?
# - Are there any jumps in complexity?
# - Is the pacing appropriate?
```

### Navigation Notebooks (Advanced)

For comprehensive multi-part educational systems:

```
Introduction
  → Hero with navigation
  → Overview
  → How to use this guide

Part 1-N: Main Content
  → Each part follows educational pattern above
  → Part summaries after content

Reference Section (END of notebook)
  → Resources & Quick Reference
  → Essential Bookmarks
  → Troubleshooting
  → Additional Learning

Final Wrap-Up
  → Congratulations message
  → What you've accomplished
  → Next steps
```

**Key principle:** Keep learners in the flow. Reference materials at the end prevent interruption of the learning journey.

See [docs/for-ai/templates/ipynb/README.md](../templates/ipynb/README.md) for comprehensive cell ordering guidelines and validation checks.

---

## Display and Deployment

### Adding to EDS Pages

To display a notebook on your EDS site:

```markdown
| IPynb Viewer |
|--------------|
| /your-notebook.ipynb |
```

### Display Modes

The ipynb-viewer block supports multiple display modes:

**1. Basic Mode (default)**
```
| IPynb Viewer |
|--------------|
| /notebook.ipynb |
```
- All cells visible, scroll through content
- Manual Run buttons on code cells
- Good for reference guides and quick scanning

**2. Paged Mode**
```
| IPynb Viewer (paged) |
|----------------------|
| /notebook.ipynb |
```
- Full-screen overlay with Start Reading button
- Previous/Next navigation with smart cell grouping
- Keyboard shortcuts (arrows, ESC)
- Good for tutorials and presentations

**3. Autorun Mode (NEW)**
```
| IPynb Viewer (autorun) |
|------------------------|
| /notebook.ipynb |
```
- Code cells execute automatically when displayed
- No Run buttons (cleaner, presentation-focused interface)
- Output visible by default
- Good for live demonstrations and pre-validated content

**4. Notebook Mode (NEW)**
```
| IPynb Viewer (notebook) |
|--------------------------|
| /notebook.ipynb |
```
- Complete educational experience
- Combines paged overlay + autorun functionality
- Start Reading button opens paged mode with automatic execution
- Built-in help button (❓) provides integrated documentation from `help-repo`
- Good for complete tutorials and courses with built-in help system

**5. Index Mode (NEW)**
```
| IPynb Viewer (index) |
|----------------------|
| /notebook.ipynb |
```
- **Auto-opens immediately** - No "Start Reading" button required
- Full-screen overlay launches on page load
- Perfect for landing pages and documentation hubs
- Includes navigation tree and all overlay features
- Good for immediate engagement and zero-click access

**When to Use Index:**
- ✅ Landing pages that should open immediately
- ✅ Documentation hub homepages
- ✅ Tutorial entry points
- ✅ Any content requiring instant access
- ✅ Marketing and showcase pages

**Index vs Other Modes:**

| Mode | Button Required | Auto-Execute | Use Case |
|------|----------------|--------------|----------|
| `paged` | Yes | No | Standard tutorials |
| `autorun` | Yes | Yes | Live demonstrations |
| `notebook` | Yes | Yes | Complete courses |
| `index` | No (auto-opens) | No | Landing pages |
| `no-topbar` | Depends on mode | Depends on mode | Immersive, distraction-free |

**6. No-Topbar Variation (NEW)**
```
| IPynb Viewer (paged no-topbar) |
|---------------------------------|
| /notebook.ipynb |
```
- **Hides top bar** - No title, buttons, or navigation tree toggle visible
- **Hides navigation tree** - Tree automatically hidden (no toggle available)
- **Maximum content area** - Content extends from top to pagination controls
- **ESC key still works** - Keyboard shortcuts and backdrop click remain functional
- **Combines with any mode** - Use with `paged`, `autorun`, `notebook`, or `index`
- **Perfect for immersive learning** - Minimal UI for focused content consumption

**Combinations:**
```
| IPynb Viewer (index no-topbar) |
```
Auto-opens with no UI - perfect for immersive tutorial landing pages.

```
| IPynb Viewer (autorun no-topbar) |
```
Auto-executes with no distractions - ideal for recorded demos or kiosk displays.

**When to Use No-Topbar:**
- ✅ Immersive, distraction-free learning experiences
- ✅ Kiosk displays or public installations
- ✅ Embedded tutorials in other applications
- ✅ Video recordings or screencasts
- ✅ When content should be the sole focus
- ⚠️ Not ideal for complex tutorials needing navigation controls
- ❌ Don't use if learners need access to help or table of contents

### Navigation Tree Panel (NEW)

All paged, notebook, and index modes include a **navigation tree panel** for hierarchical navigation:

**Tree Structure:**

The navigation tree has two main sections:

**1. Notebook Section** - Shows your tutorial's structure:
```
📓 Notebook
├── Frontmatter (if Part headings exist)
│   └── Introduction
├── Part 1: Getting Started
│   ├── Setup
│   └── First Steps
├── Part 2: Core Concepts
│   ├── Fundamentals
│   └── Examples
└── Summary (if "completed final" heading)
    └── Recap
```

**Structure Rules:**
- **Frontmatter** - Cells before first "Part" heading (only when Parts exist)
- **Parts** - Major sections with "Part" in heading text
- **Summary** - Heading containing BOTH "completed" AND "final"
- **Direct cells** - When no Parts exist, cells appear directly under Notebook node

**2. Repository Section** - Shows linked documentation:
```
📁 Repository
├── 📁 docs/
│   ├── api-reference.md
│   └── troubleshooting.md
└── README.md
```

**Features:**
- Automatically discovers all `.md` links in notebook cells
- Opens markdown files in GitHub-styled overlay
- Organizes by directory structure
- Hidden when no `.md` files are present

**Tree Features:**

- **Toggle visibility** - Click arrow button (◄/►) to hide/show tree
- **Smart navigation** - Click sections to jump directly
- **State management** - Expansion state preserved across navigation
- **Shared state** - Single tree state across all overlays

**Using the Tree in Educational Content:**

```markdown
# Typical learner workflow:
1. Open tutorial (tree shows all sections)
2. Click "Part 2: Advanced" to skip ahead
3. Click "api-reference.md" for detailed docs
4. Close markdown overlay, return to tutorial
5. Tree remembers expansion state throughout
```

**Best Practices:**
- Structure tutorials with clear "Part" headings for tree organization
- Link to relevant `.md` documentation files for reference
- Use meaningful section titles (they appear in tree)
- Keep tree visible for long tutorials
- Hide tree when learners need to focus on content

### Link Navigation (NEW)

All paged modes support **hash link navigation** for non-linear exploration:

```markdown
## 📋 Table of Contents

- [Part 1: Introduction](#part-1-introduction)
- [Part 2: Core Concepts](#part-2-core-concepts)
- [Part 3: Advanced Topics](#part-3-advanced-topics)

See also: [Error Handling](#error-handling) | [Best Practices](#best-practices)
```

**How it works:**
- Click links with `#target` to jump between pages
- Automatically finds and navigates to the page containing the target
- Hash IDs are auto-generated from h2 headers
- Smooth transitions without page reload
- Perfect for creating interactive table of contents and cross-references

**ID Generation Rules:**
All `## h2` headers automatically get IDs:
1. Convert to lowercase
2. Remove special characters (emojis, punctuation)
3. Replace spaces with hyphens
4. Remove leading/trailing hyphens

**Examples:**
- `## 🚀 Getting Started` → `#getting-started`
- `## Part 1: Introduction` → `#part-1-introduction`
- `## Resources & Next Steps` → `#resources-next-steps`
- `## What's New?` → `#whats-new`

Configure the display mode in your block markup.

### Testing Locally

Before deploying:

1. **Open in VS Code** - Use Jupyter extension
2. **Preview markdown** - Click cells to see rendering
3. **Run code cells** - Verify functionality
4. **Check flow** - Read through entire notebook
5. **Test links** - Verify Table of Contents works

## Best Practices

### Content Quality

✅ **Do:**
- Start with a strong hook
- Use clear, accessible language
- Build complexity progressively
- Provide context before code
- Include "try it yourself" moments
- End with actionable next steps
- Credit sources and inspiration

❌ **Don't:**
- Use jargon without explanation
- Jump complexity levels abruptly
- Show code without context
- Overwhelm with too much at once
- Forget the target audience
- Leave readers without next steps

### Structure

✅ **Do:**
- Always include Table of Contents
- Use clear part/section headers
- Maintain consistent cell order
- Create logical flow
- Group related content

❌ **Don't:**
- Create notebooks without structure
- Mix unrelated topics in one part
- Skip section introductions
- Assume prior knowledge
- Forget transitions between parts

### Code Examples

✅ **Do:**
- Write clear, explanatory comments
- Use console.log() for visibility
- Return meaningful values
- Encourage experimentation
- Start simple, add complexity

❌ **Don't:**
- Write cryptic, uncommented code
- Assume the code is self-explanatory
- Use complex examples first
- Skip error handling
- Forget to show output

### Engagement

✅ **Do:**
- Tell a story
- Ask rhetorical questions
- Use emojis strategically
- Create visual interest with tables
- Make content interactive

❌ **Don't:**
- Write dry, academic prose
- Overuse emojis (looks unprofessional)
- Make it one-way (read-only)
- Forget about pacing
- Lose the narrative thread

## Common Use Cases

### Use Case 1: Transforming Documentation

**Scenario:** You have a 2000-word technical document that needs to be more engaging.

**Approach:**
1. Use `/create-notebook` command
2. Choose "Tutorial" or "Explanation" type
3. Extract main topics from document
4. Add interactive examples for each topic
5. Create "try it yourself" moments
6. Add visual comparisons with tables

**Result:** Static docs become interactive learning experience.

### Use Case 2: Creating Client Demos

**Scenario:** You need to demonstrate product capabilities to a client.

**Approach:**
1. Choose "Interactive Demo" type
2. Focus on quick, impressive demonstrations
3. Minimal explanation, maximum showing
4. Professional presentation with paged mode
5. Include contact info at end

**Result:** Impressive, interactive client presentation.

### Use Case 3: Team Onboarding

**Scenario:** New developers need to learn your codebase patterns.

**Approach:**
1. Choose "Tutorial" type
2. Progressive learning (simple → advanced)
3. Hands-on exercises
4. Real code examples from codebase
5. Best practices section

**Result:** Self-paced onboarding materials.

### Use Case 4: Technical Blog Posts

**Scenario:** You want to publish a blog post with live examples.

**Approach:**
1. Choose "Blog Post" type
2. Engaging hook and introduction
3. Mix of explanation and demonstration
4. Professional formatting
5. Call-to-action at end

**Result:** Shareable, engaging blog post.

### Use Case 5: API Documentation

**Scenario:** You need comprehensive API documentation with examples.

**Approach:**
1. Choose "Reference Guide" type
2. Document each function/method
3. Include runnable examples for each
4. Show error handling
5. Create quick reference table

**Result:** Living documentation that developers trust.

## Resources

### Skill and Command Files

**Main skill documentation:**
- [SKILL.md](file://../.claude/skills/jupyter-educational-notebook/SKILL.md) - Complete guidance
- [EXAMPLES.md](file://../.claude/skills/jupyter-educational-notebook/EXAMPLES.md) - Real patterns
- [TEMPLATES.md](file://../.claude/skills/jupyter-educational-notebook/TEMPLATES.md) - Copy-paste templates
- [CONTENT_PATTERNS.md](file://../.claude/skills/jupyter-educational-notebook/CONTENT_PATTERNS.md) - Organization strategies

**Slash command:**
- [create-notebook.md](file://../.claude/commands/create-notebook.md) - Guided creation

### Example Notebooks

**In project root:**
- [blog.ipynb](file://../../blog.ipynb) - Blog post example (41 cells)
- [explain.ipynb](file://../../explain.ipynb) - System explanation example

**ipynb-viewer block:**
- [blocks/ipynb-viewer/README.md](file://../../blocks/ipynb-viewer/README.md) - Display documentation

### Templates

Ready-to-use notebook templates are available:

- **Educational Template:** [docs/for-ai/templates/ipynb/educational-template.ipynb](file://../templates/ipynb/educational-template.ipynb) - Interactive learning template with runnable code cells and auto-wrapping support
- **Unstyled Template:** [docs/for-ai/templates/ipynb/unstyled-template.ipynb](file://../templates/ipynb/unstyled-template.ipynb) - Basic markdown structure for quick content-first authoring
- **Presentation Template:** [docs/for-ai/templates/ipynb/presentation-template.ipynb](file://../templates/ipynb/presentation-template.ipynb) - Non-interactive presentation template (no runnable code)

**Recommendation:** Start with the educational template for tutorials and interactive learning content. Use pure markdown with auto-wrapping in notebook mode for fastest authoring (90% less code).

### Related Documentation

- [explaining-jupyter.md](file://./explaining-jupyter.md) - General Jupyter testing guide
- [CLAUDE.md](file://../../CLAUDE.md) - Project overview

## Quick Reference

### Triggering the Skill

**Keywords that activate:**
- educational notebook, tutorial notebook, blog notebook
- interactive guide, interactive tutorial
- explain topic, illustrate concept, teach interactively
- transform text, notebook from text
- SPA notebook, learning notebook

**Prompts that work:**
- "Create an educational notebook about [topic]"
- "Transform this text into an interactive tutorial"
- "Make a blog post notebook explaining [concept]"
- "Build a reference guide for [API]"
- "Create an interactive demo of [feature]"

### Content Ratio Guidelines

| Notebook Type | Markdown | Code | Cells |
|---------------|----------|------|-------|
| Blog Post | 65% | 35% | 30-45 |
| Tutorial | 70% | 30% | 20-30 |
| Explanation | 55% | 45% | 15-25 |
| Reference | 40% | 60% | 25-40 |
| Demo | 30% | 70% | 15-20 |

### Cell Structure Pattern

```markdown
Header Cell (markdown): Title, hook, TOC
Part 1 Intro (markdown): Explanation
Part 1 Demo (code): Example code
Part 1 Explain (markdown): What happened?
Part 2 Intro (markdown): Next concept
Part 2 Demo (code): Example code
...
Summary Cell (markdown): Recap, next steps
```

## Troubleshooting

### Issue: Skill Not Triggering

**Problem:** The skill doesn't activate when expected.

**Solution:**
- Use explicit keywords: "educational notebook", "tutorial", "interactive guide"
- Try the slash command instead: `/create-notebook`
- Manually invoke: "Use the jupyter-educational-notebook skill"

### Issue: Wrong Skill Activates

**Problem:** Testing skill activates instead of educational skill.

**Solution:**
- Avoid testing keywords: "test block", "debug", "jsdom"
- Use clear educational keywords: "tutorial", "explain", "teach"
- Be specific: "Create an educational notebook" not just "create notebook"

### Issue: Unclear Notebook Structure

**Problem:** Not sure how to organize content.

**Solution:**
- Review EXAMPLES.md for real patterns
- Use TEMPLATES.md for copy-paste structure
- Consult CONTENT_PATTERNS.md for organization strategies
- Use `/create-notebook` for guided creation

### Issue: Content Too Technical

**Problem:** Notebook feels too much like developer documentation.

**Solution:**
- Remember your audience (end users, not developers)
- Use accessible language, define technical terms
- Increase markdown ratio (60% MD / 40% code)
- Add more explanation, less dense code
- Include "what just happened?" cells after code

### Issue: Not Engaging Enough

**Problem:** Content feels dry or boring.

**Solution:**
- Start with a strong hook
- Tell a story or solve a problem
- Add "try it yourself" moments
- Use emojis strategically in headers
- Create visual tables for comparisons
- Make examples interactive and modifiable

## Summary

Educational Jupyter notebooks transform static content into interactive learning experiences. They're perfect for tutorials, blog posts, documentation, and demos aimed at end users and learners.

**Key takeaways:**

✅ Focus on teaching, not testing
✅ Use 60% markdown, 40% code (typically)
✅ Build complexity progressively
✅ Make it interactive and engaging
✅ Always include Table of Contents
✅ End with actionable next steps

**Get started:**
1. Use `/create-notebook` for guided creation
2. Or invoke the skill for comprehensive guidance
3. Choose your notebook type based on goal
4. Follow content organization patterns
5. Use templates as starting points
6. Test and refine before publishing

**Need help?** Consult the skill files in `.claude/skills/jupyter-educational-notebook/` for detailed guidance, examples, templates, and content organization strategies.

Happy notebook creating! 📓✨
