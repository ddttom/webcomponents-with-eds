# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Type

This is a **reference/learning repository** (cherry-picker project) for Adobe Edge Delivery Services (EDS) development. It demonstrates patterns and approaches, not a production boilerplate. Users should always get the latest Adobe EDS boilerplate files from [https://aem.live](https://aem.live) for production work.

## Core Philosophy

**Zero Dependencies** - The entire framework runs on pure vanilla JavaScript and Node.js built-ins. There are NO production dependencies. The only runtime dependency (jsdom) is for Jupyter notebook testing in Node.js environments.

**Simple Architecture** - Direct file editing, no compilation required for simple components. Build process only needed for components with external dependencies.

## Development Commands

### Server
```bash
# Start development server (zero dependencies, includes live reload)
node server.js
# Server runs at http://localhost:3000
# Automatically proxies missing files to https://allabout.network
```

### Linting
```bash
npm run lint              # Auto-fix JavaScript issues
npm run lint:check        # Check JavaScript without fixing
npm run lint:md           # Check markdown files
npm run lint:md:fix       # Auto-fix markdown issues
npm run validate          # Run all linting checks
```

### Testing
Tests are run in browsers. Start the development server with `node server.js`, then:
- Navigate to block directories and open test.html files
- Use Jupyter notebooks (.ipynb files) for interactive testing via ipynb-viewer block
- Use `/test-block <name>` slash command for automated testing

## Architecture Overview

### Dual-Directory Pattern

This repository uses a unique dual-directory architecture for component development:

**`/blocks/`** - Production-ready EDS components
- Vanilla JavaScript only (or bundled outputs)
- Direct deployment to EDS
- No external dependencies in source
- Examples: accordion, counter, helloworld, columns, cards

**`/build/`** - Development workspace for complex components
- Modern JavaScript with external dependencies
- Build process bundles everything into `/blocks/` output
- Use Vite for bundling
- Example: shoelace-card (uses Shoelace Design System)

**Decision Criteria:**
- **Use `/blocks/` direct editing** when: Simple interactions, vanilla JS sufficient, no external libraries needed
- **Use `/build/` workflow** when: Complex UI libraries needed (Shoelace, Chart.js), modern bundling required, external dependencies

### Key Directories

**`scripts/`** - Custom utilities + Adobe EDS reference files
- ✨ **Custom utilities** (1,850 lines):
  - `test-framework.js` - Native testing framework (115 lines)
  - `ipynb-helpers.js` - Jupyter notebook browser testing helpers (273 lines)
  - `instrumentation.js` - Performance monitoring (550 lines)
  - `build-component.js` - Component build automation (127 lines)
  - `*-instrumented.js` - Instrumented versions of EDS files for performance analysis (785 lines)
- 📋 **Adobe EDS reference files** (864 lines) - Get latest from aem.live:
  - `aem.js` - EDS platform core with RUM integration (734 lines)
  - `scripts.js` - Document initialization (129 lines)
  - `delayed.js` - Lazy loading (1 line)

**`docs/for-ai/`** - AI-optimized development framework (32 files, 24,000+ lines)
- Navigation hub: `docs/for-ai/index.md`
- New developer start: `docs/for-ai/getting-started-guide.md`
- EDS guide: `docs/for-ai/eds.md` (1,937 lines)
- Architecture patterns organized by complexity
- Cross-referenced with 48+ bidirectional links

**`.claude/`** - Claude Code AI integration
- `commands/` - 12 slash commands for common workflows
- `skills/` - 21+ specialized capabilities (Adobe, Anthropic, Custom)
- `agents/` - 10 autonomous task specialists
- See `.claude/README.md` for complete documentation

### Content-Driven Development (CDD) Workflow

This repository follows Adobe's Content-Driven Development pattern. **Always create content before code:**

1. **Content First**: Design the content model and create example content
2. **Then Code**: Implement the block decoration to match the content structure
3. **Test**: Validate with real content

**Use the `/new-block` or `/start-cdd` commands** - These invoke the content-driven-development skill which orchestrates the entire workflow and auto-invokes other skills (content-modeling, building-blocks, testing-blocks) at appropriate times.

## EDS Block Development

### Block Structure
Every EDS block follows this pattern with a recommended 5-step approach:
```javascript
// blocks/my-block/my-block.js
/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  // 1. Load dependencies
  // 2. Extract configuration, if applicable
  // 3. Transform DOM
  // 4. Add event listeners
  // 5. Set loaded status
}
```

### Block Decoration Flow
1. **Content transformation**: EDS calls your `decorate(block)` function
2. **DOM manipulation**: Modify the block element's structure and styling
3. **Enhancement**: Add interactivity, load resources, register events
4. **Return**: Function completes, block is visible to user

### Content Structure Contract
The initial content structure is the **contract between authors and developers**:
- Authors create content following this structure
- Developers write code that expects this structure
- **Decide on structure before writing code**
- Be careful when changing structure assumptions (can break existing pages)
- Authors may omit or add fields - code must handle gracefully

**Use `curl` and `console.log` to inspect HTML before making assumptions:**
```bash
curl http://localhost:3000/path/to/page
curl http://localhost:3000/path/to/page.md
```

### Three-Phase Page Loading
Pages load in three phases to maximize performance (initiated by `loadPage` in scripts.js):

1. **Eager** - Load only what's required for LCP (Largest Contentful Paint)
   - Decorate page content (sections, blocks, buttons)
   - Load first section only

2. **Lazy** - Load remaining page content
   - Header and footer
   - Below-the-fold sections

3. **Delayed** - Load non-critical resources
   - Analytics/martech
   - Resources that would hurt performance if loaded earlier

### Auto-Blocking
Auto-blocking creates blocks automatically based on content patterns (not explicitly authored). See `buildAutoBlocks` function in `scripts.js`.

### Styling Pattern
- Each block has `my-block.css` that styles `.my-block` selector
- CSS loads automatically when block is used
- Avoid FOUC by ensuring critical styles are inline or load early
- **Mobile-first**: Declare styles for mobile, use media queries for tablet/desktop
- **Breakpoints**: 600px / 900px / 1200px

## Jupyter Notebook Testing

This repository features an advanced Jupyter notebook testing system that's unique to this project:

**Dual Environment Support:**
1. **Node.js (jsdom)**: Fast isolated testing without browser
2. **Browser (ipynb-viewer block)**: Full browser testing with real DOM

**Key Helper Functions** (in `scripts/ipynb-helpers.js`):
- `testBlock(blockName, innerHTML)` - Test block decoration in browser
- `showPreview(html, blockName)` - Display overlay preview with device testing

**Usage:**
```javascript
// In Jupyter notebook cell
import { testBlock, showPreview } from '/scripts/ipynb-helpers.js';
const block = await testBlock('accordion', '<div>content</div>');
await showPreview(block.outerHTML, 'accordion');
```

**Commands:**
- `/jupyter-notebook` - Create/edit Jupyter notebooks for testing
- `/create-notebook` - Create educational notebooks as interactive tutorials

## Special Features

### Live Reload Server
The development server (`server.js`) automatically refreshes the browser when files change. No configuration needed.

### Skills System
The `.claude/skills/skill-rules.json` file defines automatic skill activation based on:
- Keywords in user messages
- File paths being worked on
- Content patterns in files
- Intent patterns (regex matching)

This means relevant EDS expertise activates automatically when you work on blocks, content models, or testing.

### Performance Monitoring
Swap standard EDS files with instrumented versions for detailed performance analysis:
- Use `aem-instrumented.js` instead of `aem.js`
- Use `scripts-instrumented.js` instead of `scripts.js`
- Use `delayed-instrumented.js` instead of `delayed.js`

Then use `scripts/instrumentation.js` to capture and analyze performance metrics.

## Attribution

**Sources of code/content:**
- **Adobe**: EDS boilerplate files (aem.js, scripts.js, delayed.js), 6 EDS workflow skills from [helix-website](https://github.com/adobe/helix-website)
- **Anthropic**: 8 general-purpose skills (document-skills, skill-developer, etc.), Claude Code framework
- **Custom (this repo)**:
  - 7 custom EDS skills (jupyter-notebook-testing, eds-block-development, etc.)
  - docs/for-ai/ documentation (32 files, 24,000+ lines)
  - 5 custom utility scripts (1,850 lines)
  - 10 autonomous agents
  - ipynb-viewer block

## Important Patterns

### Never Edit These Files Directly
The following are **reference copies** from Adobe EDS - always get latest from aem.live:
- `scripts/aem.js`
- `scripts/scripts.js`
- `scripts/delayed.js`

### When Building Components with Dependencies
1. Create workspace in `/build/my-component/`
2. Add dependencies: `npm install`
3. Develop with modern tooling
4. Build: `node scripts/build-component.js` or `npm run build` in component directory
5. Output automatically goes to `/blocks/my-component/`

### Documentation Navigation Strategy
Start with `docs/for-ai/index.md` which provides:
- Role-based learning paths (New Developer, Experienced Developer, Architect)
- Quick start by component type
- Cross-reference mapping
- Progressive learning recommendations

## Code Style Guidelines

### JavaScript
- **ES6+ features** - Use arrow functions, destructuring, async/await, etc.
- **ESLint** - Follow Airbnb ESLint rules (already configured)
- **File extensions** - Always include `.js` file extensions in imports
- **Line endings** - Use Unix line endings (LF)

### CSS
- **Stylelint** - Follow Stylelint standard configuration
- **Modern CSS** - Use CSS Grid, Flexbox, CSS Custom Properties
- **Mobile-first** - Declare styles for mobile, use media queries for larger screens
- **Breakpoints** - Use 600px, 900px, 1200px
- **No frameworks** - No Tailwind or other CSS frameworks

### HTML
- **Semantic HTML5** - Use proper semantic elements
- **Accessibility** - Ensure ARIA labels, proper heading hierarchy
- **EDS conventions** - Follow AEM markup conventions for blocks and sections

### Performance Best Practices
- **Keep it 100** - Follow https://www.aem.live/developer/keeping-it-100
- **Optimize images** - All git-committed images must be optimized
- **Lazy loading** - Use lazy-styles.css and delayed.js for non-critical resources
- **Avoid dependencies** - Minimize JavaScript bundle size

### Accessibility Standards
- **WCAG 2.1 AA** - Follow Web Content Accessibility Guidelines
- **Heading hierarchy** - Ensure proper heading order
- **Alt text** - Include descriptive alt text for images
- **Screen readers** - Test with screen readers

## Requirements
- Node.js >= 18.0.0
- npm >= 8.0.0
- Zero production dependencies
- jsdom (dev dependency for Jupyter testing)
