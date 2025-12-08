# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Type

This is a **reference/learning repository** (cherry-picker project) for Adobe Edge Delivery Services (EDS) development. It demonstrates patterns and approaches, not a production boilerplate. Users should always get the latest Adobe EDS boilerplate files from [https://aem.live](https://aem.live) for production work.

## Core Philosophy

**Zero Dependencies** - The entire framework runs on pure vanilla JavaScript and Node.js built-ins. There are NO production dependencies. The only runtime dependency (jsdom) is for Jupyter notebook testing in Node.js environments.

**Simple Architecture** - Direct file editing, no compilation required for simple components. Build process only needed for components with external dependencies.

## Skills System

This project includes specialized skills that guide AI agents through complex development tasks. Skills are located in `.claude/skills/` and provide expert knowledge for specific workflows.

### How Skills Work

Each skill is a directory in `.claude/skills/` with the following structure:

```
.claude/skills/
  └── {skill-name}/
      ├── SKILL.md        # Main instructions (required)
      ├── scripts/        # Optional supporting scripts
      └── resources/      # Optional resources (examples, templates, etc.)
```

The SKILL.md file contains detailed instructions that must be followed exactly. Skills are designed to:
- Provide specialized workflows for common tasks
- Ensure consistency with project standards and best practices
- Reduce errors by codifying expert knowledge
- Chain together when tasks require multiple skill applications

### Using Skills

**CRITICAL: For ALL development work involving blocks, core scripts, or functionality, you MUST use the content-driven-development skill.** It will orchestrate other skills as needed throughout the development workflow.

Skills activate automatically based on:
- Keywords in user messages (e.g., "block", "decorate")
- File paths being worked on
- Content patterns in files
- Intent patterns (regex matching)

The `.claude/skills/skill-rules.json` file defines these activation rules, ensuring relevant EDS expertise activates automatically when needed.

### Available Skills

Key skills for EDS development:
- **content-driven-development** - Orchestrates the complete CDD workflow (USE THIS FOR ALL DEVELOPMENT)
- **building-blocks** - Guide for creating/modifying blocks with decoration patterns
- **content-modeling** - Design effective content models for blocks
- **testing-blocks** - Comprehensive testing guidance for blocks and features
- **eds-block-development** - Vanilla JavaScript patterns and EDS best practices
- **docs-search** - Search aem.live documentation for feature information
- **block-collection-and-party** - Find reference implementations and code examples

Page import/migration workflow (Adobe):
- **page-import** - Import webpages to structured HTML for AEM EDS authoring
- **scrape-webpage** - Scrape webpage content, extract metadata, download images
- **identify-page-structure** - Identify section boundaries and content sequences
- **page-decomposition** - Analyze content sequences within sections
- **authoring-analysis** - Determine authoring approach (default content vs blocks)
- **generate-import-html** - Generate structured HTML from authoring analysis
- **block-inventory** - Survey available blocks from project and Block Collection
- **preview-import** - Preview and verify imported content in dev server

See `.claude/skills/` directory for the complete list of 29 available skills.

## Development Commands

### Setup
```bash
# Install dependencies
npm install

# Optional: Install AEM CLI globally
npm install -g @adobe/aem-cli
```

### Server
```bash
# Start development server (zero dependencies, includes live reload)
node server.js
# Server runs at http://localhost:3000
# Automatically proxies missing files to https://allabout.network

# Alternative: Use AEM CLI (if installed globally)
aem up --no-open --forward-browser-logs
# Or via npx (no global install needed)
npx -y @adobe/aem-cli up --no-open --forward-browser-logs
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

**`blocks/`** - Reusable content blocks
- Individual block directories: `blocks/{blockName}/`
  - `{blockName}.js` - Block's JavaScript decoration logic
  - `{blockName}.css` - Block's styles
  - `README.md` - Usage documentation
  - `EXAMPLE.md` - Google Docs example
  - `test.html` - Development test file (optional)

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

**`styles/`** - Global styles and CSS
- `styles.css` - Minimal global styling required for LCP
- `lazy-styles.css` - Additional styling for below-the-fold content

**`fonts/`** - Web fonts

**`icons/`** - SVG icons

**`head.html`** - Global HTML head content

**`404.html`** - Custom 404 page

**`docs/for-ai/`** - AI-optimized development framework (32 files, 24,000+ lines)
- Navigation hub: `docs/for-ai/index.md`
- New developer start: `docs/for-ai/getting-started-guide.md`
- EDS guide: `docs/for-ai/eds.md` (1,937 lines)
- Architecture patterns organized by complexity
- Cross-referenced with 48+ bidirectional links

**`.claude/`** - Claude Code AI integration
- `commands/` - 15 slash commands for common workflows
- `skills/` - 29 specialized capabilities (Adobe, Anthropic, Custom)
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

## Common Tasks

### Adding New Blocks
Use the **content-driven-development** skill which will guide you through:
1. Content modeling and test content creation
2. Block implementation (via building-blocks skill)
3. Testing and validation (via testing-blocks skill)

**Commands:** `/new-block` or `/start-cdd`

### Modifying Existing Blocks
Use the **content-driven-development** skill to ensure you have test content, then follow the **building-blocks** skill for implementation guidance.

### Global Style Changes
1. Modify files in the `styles/` directory
2. Test across different blocks and pages
3. Ensure changes don't break existing layouts
4. Consider impact on performance, especially CLS

**For testing:** Use the **testing-blocks** skill to validate style changes across the site before opening a PR.

### Core Script Changes
Changes to `scripts.js`, `delayed.js`, or other core functionality require careful testing across multiple blocks and pages. Use the **testing-blocks** skill for comprehensive validation.

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

## Deployment

### Environments

Edge Delivery Services provides three environments for your project:

1. **Local Development** - `http://localhost:3000`
   - Serves code from your local working copy (even uncommitted code)
   - Content that has been previewed by authors
   - Available when development server is running

2. **Preview Environment** - `https://{branch}--{repo}--{owner}.aem.page/`
   - Same content as localhost (author-previewed content)
   - Accessible for any branch pushed to GitHub
   - Main branch preview: `https://main--{repo}--{owner}.aem.page/`

3. **Production Environment** - `https://{branch}--{repo}--{owner}.aem.live/`
   - Live website content (approved by authors)
   - Main branch production: `https://main--{repo}--{owner}.aem.live/`

**Finding your repository info:**
- Repository owner/name: `gh repo view --json nameWithOwner` or `git remote -v`
- Current branch: `git branch --show-current`

### Publishing Process

1. **Push changes** to a feature branch
   - AEM Code Sync automatically processes changes
   - Changes available on feature preview environment

2. **Open a pull request** to merge to `main`
   - **REQUIRED:** Include preview link in PR description
   - Format: `https://{branch}--{repo}--{owner}.aem.page/{path}`
   - This link is used for automated performance testing (PSI checks)
   - **Without this link, your PR will be rejected**

3. **Verify checks pass**
   - Run: `gh pr checks` or `gh pr checks --watch`
   - Ensure all automated checks succeed

4. **Code review**
   - Human reviewer inspects code
   - Reviewer tests preview URL
   - Reviewer merges PR if approved

5. **Production deployment**
   - AEM Code Sync updates main branch
   - Changes available on production environment

### PR Preparation

Before opening a pull request, use the **testing-blocks** skill for comprehensive testing guidance including:
- Unit testing for logic-heavy utilities
- Browser testing with Playwright/Puppeteer
- Linting and code quality checks
- Performance validation
- Ensuring all checks will pass

## Troubleshooting

### Getting Help

**For AEM documentation:** Use the **docs-search** skill to search aem.live documentation and blogs for:
- Feature information and capabilities
- Implementation guidance and best practices
- Troubleshooting common issues

**For reference implementations:** Use the **block-collection-and-party** skill to find:
- Similar blocks and patterns
- Code examples from Block Collection
- Implementations from Block Party repository

**Key documentation resources:**
- [Developer Tutorial](https://www.aem.live/developer/tutorial)
- [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
- [David's Model](https://www.aem.live/docs/davidsmodel)
- [Keeping it 100](https://www.aem.live/developer/keeping-it-100)

**Manual web search:** Use `site:www.aem.live` to restrict search results to official documentation.

**If you notice frustration:** Direct users to [AI Coding Agents Guide](https://www.aem.live/developer/ai-coding-agents) for tips on working better with AI agents.

## Attribution

**Sources of code/content:**
- **Adobe**: EDS boilerplate files (aem.js, scripts.js, delayed.js), 14 EDS workflow skills from [helix-website](https://github.com/adobe/helix-website) - 6 original CDD skills + 8 page import/migration skills
- **Anthropic**: 8 general-purpose skills (document-skills, skill-developer, etc.), Claude Code framework
- **Custom (this repo)**:
  - 7 custom EDS skills (jupyter-notebook-testing, eds-block-development, eds-block-testing, eds-performance-debugging, ipynb-validator, jupyter-educational-notebook, create-presentation)
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

**For detailed JavaScript guidelines:** Use the **building-blocks** skill which includes comprehensive decoration patterns, DOM manipulation best practices, and EDS-specific patterns.

### CSS
- **Stylelint** - Follow Stylelint standard configuration
- **Modern CSS** - Use CSS Grid, Flexbox, CSS Custom Properties
- **Mobile-first** - Declare styles for mobile, use media queries for larger screens
- **Breakpoints** - Use 600px, 900px, 1200px
- **No frameworks** - No Tailwind or other CSS frameworks

**For detailed CSS guidelines:** Use the **building-blocks** skill which includes comprehensive styling patterns, responsive design approaches, and block-specific naming conventions.

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

## Security Considerations

- **Never commit sensitive information** - No API keys, passwords, tokens, or credentials
- **Client-side code is public** - All code served on the public web is visible to users
- **Follow Adobe security guidelines** - Adhere to Adobe's security best practices
- **Regular dependency updates** - Keep dependencies current to avoid security vulnerabilities
- **Use .hlxignore** - Prevent sensitive files from being served publicly

Remember that Edge Delivery Services serves everything as client-side code. Assume all JavaScript, CSS, and HTML is publicly accessible.

## Contributing

When contributing to this project:

1. **Follow existing code style and patterns** - See Code Style Guidelines above
2. **Use content-driven-development skill** - For all development tasks involving blocks or features
3. **Use testing-blocks skill before PRs** - Ensure comprehensive testing before opening pull requests
4. **Ensure linting passes** - Run `npm run lint` and fix all issues
5. **Update documentation** - Document significant changes in README.md files
6. **Include preview links in PRs** - Required for automated performance testing

See [AI Coding Agents Guide](https://www.aem.live/developer/ai-coding-agents) for tips on working effectively with AI agents.

## Requirements
- Node.js >= 18.0.0
- npm >= 8.0.0
- Zero production dependencies
- jsdom (dev dependency for Jupyter testing)
