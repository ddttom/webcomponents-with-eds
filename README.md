# Web Components with Adobe Edge Delivery Services

**A development framework for building EDS components with simple, dependency-free JavaScript**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-zero-success)](package.json)

> **🍒 Cherry-Picker Repository**: This is a **reference and learning project** showcasing patterns, utilities, and approaches for Adobe Edge Delivery Services development. Take what you need and adapt it for your projects. **Always use the latest Adobe EDS boilerplate files from [https://aem.live](https://aem.live) for production work.**

## 🎯 Project Philosophy

This framework demonstrates that **web development doesn't require complex tooling**. Built entirely with vanilla JavaScript and zero external dependencies, it provides enterprise-level capabilities through simple, maintainable code.

**Core Principles:**
- ✅ **Zero Dependencies** - Pure Node.js built-ins only
- ✅ **Simple Architecture** - Direct file editing, no compilation required
- ✅ **Production-Ready** - UI components with detailed documentation
- ✅ **EDS Native** - Purpose-built for Adobe Edge Delivery Services
- ✅ **AI-Friendly** - Documentation designed for AI assistant development

## 🚀 Quick Start

```bash
# Clone and start developing immediately
git clone https://github.com/ddttom/webcomponents-with-eds.git
cd webcomponents-with-eds
node server.js

# Server running at http://localhost:3000
# No npm install required - zero dependencies!
```

## ⚙️ Requirements

### Minimum Versions
```bash
Node.js >= 18.0.0
npm >= 8.0.0
```

### Runtime Dependencies
- **Zero production dependencies** - Pure vanilla JavaScript
- **jsdom** (dev dependency) - For Jupyter notebook testing in Node.js environment

### Development Dependencies (Optional)
- **eslint** - Code quality and linting
- **markdownlint-cli** - Documentation consistency

**Note**: The core framework requires zero external dependencies. Development tools are optional and only needed for testing and quality assurance.

## 🆕 Recent Updates (November 2024)

### 🔥 Major Features Added (Nov 19, 2024)

#### ⚡ Live Reload Server
The development server now includes automatic browser refresh on file changes - no configuration required.

#### 🧪 Native Testing Framework
New zero-dependency testing framework ([scripts/test-framework.js](scripts/test-framework.js)) with simple API and test reporting.

#### 📓 Enhanced Jupyter Integration
Expanded notebook testing with [ipynb-helpers.js](scripts/ipynb-helpers.js) and overlay preview system for responsive testing.

#### 🔧 Simplified Architecture
Removed custom markdown parser, added native testing utilities, enhanced performance monitoring.

### 📚 Documentation Expansion
Since July 2024: +5 files (27→32), +19,000 lines (5,000→24,000), enhanced cross-referencing and architectural patterns.

## 📁 Project Architecture

```
webcomponents-with-eds/
├── 📄 server.js                  # Development server (209 lines, live reload)
├── 📄 server.html                # Server documentation and testing interface
├── 🧱 blocks/                    # EDS-ready components (8 production blocks)
│   ├── ipynb-viewer/             # Interactive Jupyter notebook viewer ⭐
│   │   ├── EXAMPLE.md            # Usage examples
│   │   └── explaining-attributes.md  # Block attributes guide
│   ├── accordion/                # Expandable FAQ/accordion component
│   ├── cards/                    # Card grid component
│   ├── columns/                  # Column layout block
│   ├── counter/                  # Counter component
│   │   └── example.md            # Usage examples
│   ├── helloworld/               # Simple example block
│   ├── shoelace-card/            # Glassmorphism component
│   │   └── example.md            # Usage examples
│   └── shoelace/                 # Shoelace design system integration
├── 🔧 build/                     # Development workspace (when needed)
│   └── shoelace-card/            # Build environment for complex components
├── 🔨 scripts/                   # Custom utilities + Adobe EDS reference files ⭐
│   ├── test-framework.js         # ✨ Custom: Testing framework (115 lines)
│   ├── ipynb-helpers.js          # ✨ Custom: Jupyter helpers (273 lines)
│   ├── instrumentation.js        # ✨ Custom: Performance monitoring (550 lines)
│   ├── build-component.js        # ✨ Custom: Build automation (127 lines)
│   ├── *-instrumented.js         # ✨ Custom: Instrumented versions (785 lines)
│   ├── aem.js                    # 📋 Reference: Get latest from aem.live
│   ├── scripts.js                # 📋 Reference: Get latest from aem.live
│   └── delayed.js                # 📋 Reference: Get latest from aem.live
├── 🤖 .claude/                   # Claude Code AI integration ⭐
│   ├── agents/                   # 10 autonomous task specialists ⭐
│   │   ├── README.md             # Agent integration guide
│   │   ├── code-architecture-reviewer.md
│   │   ├── code-refactor-master.md
│   │   ├── documentation-architect.md
│   │   ├── frontend-error-fixer.md
│   │   ├── auto-error-resolver.md
│   │   └── [5 more specialized agents]
│   ├── commands/                 # 12 slash commands for workflows
│   ├── skills/                   # 21+ specialized AI capabilities
│   │   ├── jupyter-notebook-testing/  # Interactive testing framework
│   │   ├── eds-block-development/     # Block development patterns
│   │   ├── content-driven-development/  # CDD workflow orchestrator
│   │   ├── document-skills/      # 40+ Python scripts (docx, pdf, pptx, xlsx)
│   │   └── skill-rules.json      # Automatic skill activation system
│   └── README.md                 # Claude Code guide
└── 📚 docs/                      # Development framework
    ├── server-README.md          # Development server guide
    └── for-ai/                   # 32 document development framework ⭐
        ├── 📖 index.md           # Navigation hub (48+ cross-references)
        ├── 📋 guidelines/        # Project management & architecture (7 files)
        ├── 🔧 implementation/    # Component development guides (7 files)
        └── 🧪 testing/           # Testing, debugging & performance (5 files)
```

## 🏗️ Development Approaches

### Simple Components (Recommended Starting Point)
**Direct editing in `/blocks/` - No build process needed**

```javascript
// blocks/text-formatter/text-formatter.js
export default function decorate(block) {
  const button = block.querySelector('button');
  button.addEventListener('click', () => {
    block.classList.toggle('active');
  });
}
```

### Components with External Libraries
**Development in `/build/` with automatic deployment**

```javascript
// build/shoelace-card/shoelace-card.js
import { SlCard, SlButton } from '@shoelace-style/shoelace';

export default function decorate(block) {
  // Modern JavaScript with external dependencies
  // Bundled into self-contained blocks/ output
}
```

## 🎓 Documentation Framework

The `docs/for-ai/` directory contains a development framework with 32 documents totaling over 24,000 lines:

### 📊 Documentation by Audience

| **New Developers**                                                | **Experienced Developers**                                                       | **Architects & Tech Leads**                                                                  |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`eds.md`](docs/for-ai/eds.md) - EDS guide (1,937 lines) | [`block-architecture-standards.md`](docs/for-ai/block-architecture-standards.md) | [`design-philosophy-guide.md`](docs/for-ai/design-philosophy-guide.md)                       |
| [`raw-eds-blocks-guide.md`](docs/for-ai/raw-eds-blocks-guide.md)  | [`complex-eds-blocks-guide.md`](docs/for-ai/complex-eds-blocks-guide.md)         | [`eds-architecture-and-testing-guide.md`](docs/for-ai/eds-architecture-and-testing-guide.md) |
| [`server-README.md`](docs/server-README.md)                       | [`eds-native-testing-standards.md`](docs/for-ai/eds-native-testing-standards.md) | [`eds-webcomponents-review.md`](docs/for-ai/eds-webcomponents-review.md)                     |

### 📋 Project Management Suite

| **Product Requirements**                                            | **Technical Standards**                                                   | **Security & Compliance**                                               |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [`prd.md`](docs/for-ai/guidelines/prd.md) - Product requirements document | [`tech-stack.md`](docs/for-ai/guidelines/tech-stack.md)                   | [`security-checklist.md`](docs/for-ai/guidelines/security-checklist.md) |
| [`app-flow.md`](docs/for-ai/guidelines/app-flow.md) - User journeys | [`frontend-guidelines.md`](docs/for-ai/guidelines/frontend-guidelines.md) | [`backend-structure.md`](docs/for-ai/guidelines/backend-structure.md)   |

### 🧪 Testing & Quality Assurance

- **[`debug.md`](docs/for-ai/debug.md)** - Debugging policies and procedures
- **[`eds-native-testing-standards.md`](docs/for-ai/eds-native-testing-standards.md)** - Testing frameworks
- **[`instrumentation-how-it-works.md`](docs/for-ai/instrumentation-how-it-works.md)** - Performance monitoring
- **[`investigation.md`](docs/for-ai/investigation.md)** - Performance analysis reports

**📍 Start Here:** [`docs/for-ai/index.md`](docs/for-ai/index.md) - Navigation hub with 48+ cross-references

## 🛠️ Development Server Features

**Simple and Effective** - 209 lines of pure Node.js providing:

```bash
🚀 Server running at http://localhost:3000
📁 Serving files from: /current/directory
🔗 Proxying missing files to: https://allabout.network
📄 Main page: http://localhost:3000/server.html
```

### Key Capabilities
- **Local-first serving** - Your files take priority
- **Intelligent proxy fallback** - Missing files served from live EDS site
- **Live reload** - Automatic browser refresh on file changes (added Nov 2024)
- **Real-time development** - No build process for simple components
- **Request logging** - Track file requests and proxy behavior
- **Zero configuration** - Works out of the box

### Development Workflow for Complex Components

```bash
# For complex components with dependencies
cd build/my-component/
npm install shoelace-design-system
# Develop with modern tooling

npm run build    # Bundle dependencies
npm run deploy   # Copy to blocks/my-component/

# Result: Self-contained EDS component with zero external dependencies
```

## 🔧 Scripts & Utilities

The `scripts/` directory contains **custom development utilities** plus reference copies of Adobe EDS boilerplate files.

> **🍒 Cherry-Picker Project**: This is a reference/learning repository. For production projects, always use the latest Adobe EDS boilerplate files from **[https://aem.live](https://aem.live)**. Take what you need from the custom utilities and patterns demonstrated here.

### Custom Development Utilities

#### 🧪 test-framework.js (115 lines)
**Native EDS Testing Framework**
- Zero-dependency testing utility for EDS components
- Simple test registration with `test()` method
- Test reporting with pass/fail summary
- Performance timing for all test suites

```javascript
import { EDSTestFramework } from '/scripts/test-framework.js';
const framework = new EDSTestFramework();
framework.test('Component renders', async () => {
  // Test logic here
});
await framework.runAll();
```

**Use case**: Unit testing for blocks without external frameworks

---

#### 📓 ipynb-helpers.js (273 lines)
**Jupyter Notebook Browser Testing Helpers**
- `testBlock(blockName, innerHTML)` - Test block decoration in browser
- `showPreview(html, blockName)` - Display overlay preview with responsive device testing
- `getRepoUrl()` - Extract repository URL from notebook metadata
- Zero initialization required - direct ES6 imports

```javascript
import { testBlock, showPreview } from '/scripts/ipynb-helpers.js';
const block = await testBlock('accordion', '<div>content</div>');
await showPreview(block.outerHTML, 'accordion');
```

**Use case**: Interactive testing in Jupyter notebooks via ipynb-viewer block

---

#### 📊 instrumentation.js (550 lines)
**Performance Monitoring**
- Function call tracking and execution timing
- Memory snapshots and resource loading metrics
- DOM event monitoring and error tracking
- Call stack analysis with depth tracking
- Variable change monitoring
- Execution flow recording

**Use case**: Performance debugging and optimization analysis

**Related**: `aem-instrumented.js`, `scripts-instrumented.js`, `delayed-instrumented.js` - Instrumented versions of core EDS files for performance analysis

---

#### 🔨 build-component.js (127 lines)
**Component Build Automation**
- Automated Vite build process for complex components
- Dependency bundling from `/build/` to `/blocks/` directory
- Directory management and file copying
- Build verification and error handling

```bash
node scripts/build-component.js
```

**Use case**: Building components with external dependencies (like Shoelace Design System)

---

### Adobe EDS Platform Files (Reference)

The following are **reference copies** of Adobe EDS boilerplate files. **For production use, always get the latest versions from [https://aem.live](https://aem.live)**:

#### 🏗️ aem.js (734 lines)
**Adobe EDS Platform Core** - Reference copy from Adobe boilerplate
- RUM (Real User Monitoring) integration
- Block decoration and loading system
- Section and fragment loading
- LCP tracking and performance optimization

**Get latest from**: [https://aem.live](https://aem.live)

---

#### ⚡ scripts.js (129 lines)
**EDS Core Scripts** - Reference copy from Adobe boilerplate
- Document initialization and decoration
- Block loading orchestration
- Standard EDS patterns

**Get latest from**: [https://aem.live](https://aem.live)

---

#### ⏱️ delayed.js (1 line)
**EDS Delayed Loading** - Reference copy from Adobe boilerplate
- Lazy loading for non-critical resources

**Get latest from**: [https://aem.live](https://aem.live)

---

### Custom Instrumented Versions (This Repository)

Custom instrumented versions of EDS files for performance monitoring:
- **aem-instrumented.js** (653 lines) - Custom instrumented version with performance tracking
- **scripts-instrumented.js** (117 lines) - Custom instrumented version with monitoring
- **delayed-instrumented.js** (15 lines) - Custom instrumented version with analysis

**Custom utilities** - Swap standard EDS files with these to capture performance metrics during development.

---

### 📋 Scripts Summary

| Script | Lines | Source | Purpose |
|--------|-------|--------|---------|
| **Custom Development Utilities** ||||
| test-framework.js | 115 | This repo | Native testing framework |
| ipynb-helpers.js | 273 | This repo | Jupyter notebook testing |
| instrumentation.js | 550 | This repo | Performance monitoring |
| build-component.js | 127 | This repo | Build automation |
| *-instrumented.js | 785 | This repo | Instrumented EDS files |
| **Adobe EDS Platform Files** ||||
| aem.js | 734 | Adobe EDS | Platform core |
| scripts.js | 129 | Adobe EDS | EDS initialization |
| delayed.js | 1 | Adobe EDS | Lazy loading |

**Custom utilities**: 1,850 lines of development tools created for this framework
**Adobe EDS platform**: 864 lines (standard files included with every EDS project)

## 🎨 Component Examples

### 📓 ipynb-viewer Block ⭐
**Interactive Jupyter Notebook Viewer with Browser Execution**
- Parse and display `.ipynb` files directly in your EDS site with interactive JavaScript execution
- Execute code cells in browser with async/await support and direct ES6 imports
- Overlay preview system with responsive device testing (Mobile/Tablet/Desktop)
- Helper functions: `testBlock()` and `showPreview()` for block testing and visual previews
- Smart cell grouping and paged variation for better reading experience

**📚 Documentation**: [README.md](blocks/ipynb-viewer/README.md) (607 lines) | [EXAMPLE.md](blocks/ipynb-viewer/EXAMPLE.md) | [explaining-attributes.md](blocks/ipynb-viewer/explaining-attributes.md)

### 🃏 Shoelace Card Component
**Glassmorphism design with animations**
- External Shoelace Design System integration
- Bundled into self-contained EDS block
- Styling with CSS custom properties
- Modern JavaScript with async/await patterns
- **[Example usage in shoelace-card/example.md](blocks/shoelace-card/example.md)**

### 📋 Accordion Block
**Expandable FAQ/Accordion Component**
- Pure JavaScript, no external dependencies
- Smooth animations and transitions
- Accessible keyboard navigation
- Direct editing workflow

### 🎴 Cards Block
**Card Grid Component**
- Responsive card layout with CSS Grid
- Clean, semantic markup
- Mobile-first design approach

### 📐 Columns Block
**Column Layout Component**
- Flexible multi-column layouts
- Responsive breakpoints
- Simple content structure

### 🔢 Counter Block
**Counter Component**
- Lightweight animation effects
- Customizable styling
- Educational example
- **[Example usage in counter/example.md](blocks/counter/example.md)**

### 👋 HelloWorld Block
**Simple Example Block**
- Minimal implementation for learning
- Clear code structure
- Starting point for new developers

### 🎨 Shoelace Block
**Shoelace Design System Integration**
- Web components library integration
- Demonstrates external dependency bundling
- Production-ready component library

## 🤖 AI Assistant Integration

This framework is **specifically designed for AI-assisted development**:

### 💡 Skills + Documentation

**About AI-assisted development:**

Anthropic developed **Claude Code Skills** as a framework, Adobe created **EDS-specific workflow skills**, and this repository adds **custom EDS testing and documentation skills**. **Skills are lightweight orchestrators that rely on detailed documentation for effective operation**. Without detailed implementation knowledge, they function merely as process guides, instructing the AI on *what* to do. To achieve efficacy, they must also guide the AI on *how* to do it.

#### The 2 AM Debugging Problem

When I created [`docs/for-ai/`](docs/for-ai/) (32 files, 24,000+ lines), I was solving the 2 AM debugging problem—creating documentation that AI could understand with implementation details, patterns, and real-world solutions. Combined with skills from multiple sources, this provides an effective development environment.

#### What This Repository Provides

**Skills (21+ Total from 3 Sources):**
- **Adobe's 6 EDS Skills** ([helix-website](https://github.com/adobe/helix-website)) - Core workflow orchestration (content-driven-development, building-blocks, etc.)
- **Anthropic's 8 Skills** - General capabilities (document processing, skill development, MCP, testing)
- **7 Custom Skills** - EDS-specific testing and documentation (jupyter-notebook-testing, eds-block-development, etc.)

**Implementation Knowledge:**
- **Custom `docs/for-ai/`** (32 files, 24,000+ lines) - Implementation knowledge that makes skills effective
- **Custom Utilities** (1,850 lines) - Testing frameworks, Jupyter helpers, performance monitoring, build automation

**Together**, these create an AI development environment with orchestration, capabilities, and implementation knowledge.

**The Result:** AI gains workflows, tools, and implementation details for effective assistance.

#### For Your Next EDS Project

1. **Use the skill framework** - Adobe's EDS skills ([helix-website](https://github.com/adobe/helix-website)) + Anthropic's capabilities + custom EDS innovations
2. **Reference this docs/for-ai** for implementation knowledge patterns (32 files, 24,000+ lines)
3. **Adapt the custom utilities** to your needs (testing, Jupyter integration, instrumentation)
4. **Get latest Adobe EDS boilerplate** from [https://aem.live](https://aem.live)

AI-assisted EDS development requires both orchestration and knowledge. This repository provides both.

### 📖 AI-Ready Documentation
- **Development context** - 32 files with 24,000+ lines of development guidelines
- **Cross-referenced structure** - 48+ bidirectional links between documents
- **Audience-targeted guidance** - Specific instructions for different developer types
- **Implementation patterns** - Real-world examples and best practices

### 🎮 Claude Code Integration

The project includes **full Claude Code configuration** in the [`.claude/`](.claude/) directory with **21+ skills from three sources** (Adobe's EDS workflows, Anthropic's general capabilities, and custom EDS innovations) plus **custom slash commands**:

#### ⚡ Slash Commands (12 Total)
Quick access to common workflows:

##### Block Development Commands
- **`/new-block`** - Create new EDS block following Content Driven Development (CDD) process with content model design
- **`/start-cdd`** - Start Content Driven Development workflow for creating or modifying blocks
- **`/check-block`** - Analyze a block and provide architecture review with improvement suggestions
- **`/deploy-block`** - Deploy a block from build/ directory to blocks/ directory for production

##### Testing & Quality Commands
- **`/test-block`** - Run tests for a specific EDS block (unit, browser, visual)
- **`/jupyter-notebook`** - Create or edit Jupyter notebooks for interactive block testing with jsdom and ipynb-viewer
- **`/lint-all`** - Run all linting checks (JavaScript and CSS) across the entire project
- **`/check-security`** - Run security checklist validation based on EDS security guidelines

##### Documentation & Planning Commands
- **`/review-docs`** - Review and understand the EDS documentation structure in docs/for-AI
- **`/dev-docs`** - Create a strategic plan with structured task breakdown
- **`/dev-docs-update`** - Update development documentation before context compaction
- **`/find-block-content`** - Find pages in the site that use a specific block

**[Documentation in .claude/README.md](.claude/README.md)**

#### 🤖 Autonomous Claude Agents (10 Total)

The [`.claude/agents/`](.claude/agents/) directory contains autonomous agents for complex, multi-step tasks:

##### Development & Architecture
- **code-architecture-reviewer** - Review code for architectural consistency and best practices
- **code-refactor-master** - Plan and execute refactoring
- **refactor-planner** - Create refactoring strategies
- **documentation-architect** - Create documentation

##### Debugging & Quality
- **frontend-error-fixer** - Debug and fix frontend errors (browser console, TypeScript, React, build failures)
- **auto-error-resolver** - Automatically fix TypeScript compilation errors
- **auth-route-debugger** - Debug authentication issues (JWT cookie-based auth)

##### Testing & Research
- **auth-route-tester** - Test authenticated API endpoints
- **plan-reviewer** - Review development plans before implementation
- **web-research-specialist** - Research technical issues online

**[Documentation in .claude/agents/README.md](.claude/agents/README.md)**

##### Agents vs Skills

| Use Agents When... | Use Skills When... |
|-------------------|-------------------|
| Task requires multiple steps | Need inline guidance |
| Complex analysis needed | Checking best practices |
| Autonomous work preferred | Want to maintain control |
| Task has clear end goal | Ongoing development work |
| Example: "Review all controllers" | Example: "Creating a new route" |

**Integration**: Agents are **standalone** - just copy the `.md` file and use immediately!

#### 🧠 Claude Code Skills (21+ Total)
**Multi-source integration** - Skills from Adobe, Anthropic, and custom development:

##### 🏗️ Core EDS Development Skills
- **content-driven-development** - Content-first workflow orchestrator for all EDS development
- **building-blocks** - EDS block implementation guide with JavaScript decoration, CSS styling, and content models
- **content-modeling** - Design author-friendly content structures that are easy to work with
- **eds-block-development** - Vanilla JavaScript and block decoration patterns (641 lines)
- **eds-block-testing** - Testing with test.html files and development server
- **eds-performance-debugging** - Performance optimization, debugging, error handling, and Core Web Vitals

##### 🧪 Testing & Quality Assurance
- **testing-blocks** - Testing guide covering unit tests, browser tests, linting, and performance validation (296 lines)
- **jupyter-notebook-testing** - Interactive browser-based block testing with jsdom and ipynb-viewer integration (285 lines, 5 supporting docs)

##### 🔍 Resource Discovery
- **block-collection-and-party** - Search Adobe Block Collection and Block Party repositories for existing blocks, build tools, code snippets, and integration patterns (413 lines)
- **docs-search** - Search official aem.live documentation for platform features and implementation guidance (214 lines)

##### 📄 Document Processing (40+ Python Scripts)
The `document-skills` suite provides document manipulation capabilities:

**Microsoft Office Suite**
- **docx** - Create, edit, and analyze Word documents with OOXML format support
  - Tracked changes and comments
  - Text extraction and formatting
  - Style manipulation
- **pptx** - PowerPoint presentation creation and editing
  - Slide layouts and masters
  - Animations and transitions
  - HTML to PPTX conversion
- **xlsx** - Excel spreadsheet processing with formulas
  - Cell formatting and data analysis
  - Formula recalculation
  - Charts and visualization

**PDF Suite**
- **pdf** - PDF manipulation
  - Text and table extraction
  - Document merging and splitting
  - Fillable form processing
  - PDF generation from scratch

**40+ specialized Python scripts** power these capabilities, providing enterprise-grade document processing without external services.

##### 🛠️ Meta Skills (Skill Development)
- **skill-developer** - Meta-skill for creating and managing Claude Code skills following Anthropic best practices
- **skill-creator** - Guide for creating effective skills that extend Claude's capabilities
- **template-skill** - Template for creating new skills

##### 🎨 Specialized Utilities
- **brand-guidelines** - Apply Anthropic's official brand colors and typography to artifacts
- **internal-comms** - Write internal communications (status reports, updates, newsletters, FAQs)
- **slack-gif-creator** - Create animated GIFs optimized for Slack with size validators
- **theme-factory** - Toolkit for styling artifacts with 10 pre-set themes or custom themes
- **mcp-builder** - Create MCP (Model Context Protocol) servers for LLM integration with external services
- **webapp-testing** - Interact with and test local web applications using Playwright

##### 📊 Skills by Source

| Source | Count | Examples |
|--------|-------|----------|
| **[Adobe EDS](https://github.com/adobe/helix-website)** | 6 | content-driven-development, building-blocks, content-modeling, block-collection-and-party, docs-search, testing-blocks |
| **Anthropic** | 8 | document-skills (docx/pptx/xlsx/pdf), skill-developer, skill-creator, template-skill, mcp-builder, webapp-testing, slack-gif-creator, theme-factory |
| **Custom (This Repo)** | 7 | jupyter-notebook-testing, eds-block-development, eds-block-testing, eds-performance-debugging, jupyter-educational-notebook, create-presentation, ipynb-validator |

**Total: 21+ skills** combining Adobe's EDS expertise ([helix-website](https://github.com/adobe/helix-website)), Anthropic's general capabilities, and custom EDS-specific innovations.

**[Documentation in .claude/README.md](.claude/README.md)**

#### 📓 Jupyter Notebook Testing ⭐

**Interactive testing system** with dual-environment support (Node.js + Browser) - EDS block development with live CSS reload, responsive device testing, and zero build steps.

**Quick Start**: Use `/jupyter-notebook` command to launch the interactive testing environment.

**📚 Documentation** (5 files, 1,000+ lines):
- [Main Guide](.claude/skills/jupyter-notebook-testing/SKILL.md) - 285-line guide following Anthropic best practices
- [Installation](jupyter-notebook-testing/INSTALLATION.md) - Platform-specific setup
- [Examples](jupyter-notebook-testing/EXAMPLES.md) - Content patterns for all block types
- [Techniques](jupyter-notebook-testing/ADVANCED_TECHNIQUES.md) - Performance testing, visual regression, snapshots
- [Troubleshooting](jupyter-notebook-testing/TROUBLESHOOTING.md) - Common issues and solutions

### 🎯 Skill Activation System

The project includes a **skill activation system** via [`.claude/skills/skill-rules.json`](.claude/skills/skill-rules.json) that automatically triggers skills based on context:

#### Activation Triggers
Skills can be triggered by:
- **Keywords** - Specific terms that activate skills (e.g., "create block", "test block", "jupyter notebook")
- **Intent Patterns** - Regex patterns matching user intent (e.g., `/test.*block/i`, `/create.*skill/i`)
- **File Triggers** - Path patterns and content patterns in files being worked on
  - Path patterns: `blocks/**/*.js`, `.claude/skills/**/*.md`
  - Content patterns: Regex patterns matching file content

#### Enforcement Levels
- **suggest** - Recommends the skill when conditions match
- **block** - Prevents actions until skill requirements are met (used for critical workflows)
- **warn** - Warns about potential issues while allowing continuation

#### Priority Levels
Skills are prioritized as: **critical** > **high** > **medium** > **low**

#### Currently Configured Skills
The system is configured for automatic activation of:
1. **skill-developer** - When working with `.claude/skills/` files or creating skills
2. **eds-block-development** - When creating or modifying EDS blocks
3. **eds-block-testing** - When testing blocks or working with test files
4. **eds-performance-debugging** - When debugging performance or Core Web Vitals issues
5. **jupyter-notebook-testing** - When working with `.ipynb` files or testing workflows

This system ensures that the right expertise is available at the right time without manual invocation.

### 🔧 AI Development Workflow
1. **Reference [`docs/for-ai/index.md`](docs/for-ai/index.md)** for navigation
2. **Use slash commands** for common tasks (e.g., `/new-block my-component`)
3. **Invoke skills** for specialized workflows (or let the skill activation system trigger them automatically)
4. **Test interactively** with Jupyter notebooks for rapid feedback in both Node.js and browser
5. **Follow audience-specific guides** based on experience level
6. **Use documented patterns** for consistent code generation
7. **Leverage testing standards** for quality assurance
8. **Let skill triggers** automatically activate relevant expertise based on your work context

### 🎯 AI Prompt Engineering
The documentation includes specific guidance for:
- **Code generation patterns** for EDS components
- **Testing strategy implementation** for quality assurance
- **Performance optimization techniques** for Core Web Vitals
- **Accessibility implementation** for inclusive design
- **Interactive development workflows** with Jupyter notebooks

## 🔥 Features

### Dual-Directory Architecture
- **`/build/`** - Development workspace for complex components
- **`/blocks/`** - EDS-ready deployment target
- **Automatic deployment** - Build process copies optimized files

### Performance Optimization
- **Core Web Vitals focus** - Documented optimization strategies
- **Lazy loading patterns** - Efficient resource management
- **Bundle optimization** - Self-contained components with minimal footprint

### Documentation
- **32 guides** organized by audience and function
- **Cross-reference mapping** with 48+ bidirectional links
- **Quality standards** with documented best practices
- **Security guidelines** and compliance checklists
- **Skills + Documentation synergy** - Orchestration (21+ skills) + Implementation knowledge (5,000+ lines)

## 📊 Project Statistics

| Metric                    | Value                                    |
| ------------------------- | ---------------------------------------- |
| **Total Documentation**   | 32 files, 24,000+ lines                  |
| **Blocks (Components)**   | 8 production-ready blocks                |
| **Custom Utility Scripts** | 5 scripts, 1,850 lines (+ 864 Adobe EDS) |
| **Skills**                | 21+ specialized AI capabilities          |
| **Claude Agents**         | 10 autonomous task specialists           |
| **Slash Commands**        | 12 workflow commands                     |
| **Cross-References**      | 48+ bidirectional links                  |
| **Code Complexity**       | 209 lines (server.js)                    |
| **External Dependencies** | 0 (zero runtime)                         |
| **Development Patterns**  | 2 (direct-edit, build-enhanced)          |
| **Testing Framework**     | Native EDS + Jupyter notebook integration |

## 🚀 Getting Started Paths

### 👨‍💻 **For Developers**
1. Start with [`docs/for-ai/eds.md`](docs/for-ai/eds.md) - EDS guide
2. Follow [`docs/for-ai/raw-eds-blocks-guide.md`](docs/for-ai/raw-eds-blocks-guide.md) for simple components
3. Progress to [`docs/for-ai/complex-eds-blocks-guide.md`](docs/for-ai/complex-eds-blocks-guide.md) for complex features

### 🏗️ **For Architects**
1. Review [`docs/for-ai/design-philosophy-guide.md`](docs/for-ai/design-philosophy-guide.md)
2. Study [`docs/for-ai/block-architecture-standards.md`](docs/for-ai/block-architecture-standards.md)
3. Analyze [`docs/for-ai/eds-webcomponents-review.md`](docs/for-ai/eds-webcomponents-review.md)

### 📋 **For Project Managers**
1. Begin with [`docs/for-ai/guidelines/prd.md`](docs/for-ai/guidelines/prd.md)
2. Review [`docs/for-ai/guidelines/tech-stack.md`](docs/for-ai/guidelines/tech-stack.md)
3. Implement [`docs/for-ai/guidelines/security-checklist.md`](docs/for-ai/guidelines/security-checklist.md)

### 🤖 **For AI Assistants**
1. **Start here:** [`docs/for-ai/index.md`](docs/for-ai/index.md) - Navigation and context
2. **Claude Code Setup:** [`.claude/README.md`](.claude/README.md) - Commands, skills, and workflows
3. **Code Generation:** [`docs/for-ai/block-architecture-standards.md`](docs/for-ai/block-architecture-standards.md)
4. **Quality Standards:** [`docs/for-ai/guidelines/frontend-guidelines.md`](docs/for-ai/guidelines/frontend-guidelines.md)
5. **Interactive Testing:** [`.claude/skills/jupyter-notebook-testing.md`](.claude/skills/jupyter-notebook-testing.md)

## 🏆 Why This Framework?

### ✅ **Philosophy**
- **Simple tools** - Vanilla JavaScript creating production UI
- **Zero dependencies** - No npm vulnerabilities or update fatigue
- **Direct development** - Edit files, see changes immediately

### ✅ **Production Ready**
- **Documentation** - 32 files with development guides
- **Security** - Built-in security guidelines and best practices
- **Performance** - Core Web Vitals and accessibility standards
- **8 blocks** - From simple examples to complex components

### ✅ **AI Integration**
- **Documentation** - 32 files with 24,000+ lines of development guidance
- **21+ skills** - AI-powered workflows for development tasks
- **10 autonomous agents** - Complex task specialists for refactoring, debugging, and analysis
- **12 slash commands** - Quick access to common workflows
- **Custom utility scripts** - 1,850 lines of development tools
- **Pattern-based** - Consistent, reusable development patterns
- **Skill activation system** - Automatic context-aware expertise
- **Interactive testing** - Jupyter notebook integration with dual environment testing

## 🎯 AI Development Environment

This repository demonstrates **multi-source skills with implementation knowledge**:

### 🏢 Adobe's Contributions
- **6 EDS-specific skills** ([helix-website](https://github.com/adobe/helix-website)) - Core workflow orchestration (content-driven-development, building-blocks, content-modeling, block-collection-and-party, docs-search, testing-blocks)
- **EDS Boilerplate** - Platform foundation (aem.js, scripts.js, delayed.js from [https://aem.live](https://aem.live))

### 🔷 Anthropic's Contributions
- **8 general-purpose skills** - Document processing (docx/pptx/xlsx/pdf), skill development (skill-developer, skill-creator, template-skill), integration tools (mcp-builder, webapp-testing, slack-gif-creator, theme-factory)
- **Claude Code framework** - Context-based skill activation system

### 📚 This Repository's Custom Contributions
- **7 custom EDS skills** - Testing and documentation (jupyter-notebook-testing, eds-block-development, eds-block-testing, eds-performance-debugging, jupyter-educational-notebook, create-presentation, ipynb-validator)
- **32 `docs/for-ai/` files** - 24,000+ lines of implementation knowledge
- **5 custom utility scripts** - 1,850 lines (testing frameworks, Jupyter helpers, instrumentation, build automation)
- **Real-world patterns and examples** - Shows *how* to implement features
- **Cross-referenced structure** - 48+ bidirectional links enabling AI navigation
- **2 AM debugging solutions** - Knowledge AI can understand and apply

### ✨ The Result

The AI development environment includes:

**Orchestration Layer (21+ Skills from 3 Sources)**
- **Adobe's 6 EDS skills** - Core workflow orchestration
- **Anthropic's 8 skills** - General capabilities and tools
- **7 custom skills** - EDS testing and documentation innovations
- **10 Agents** - Autonomous specialists for complex multi-step operations
- **12 Slash Commands** - Quick access to common workflows
- **Automatic activation** - Context-aware skill triggers

**Implementation Layer**
- **32 docs** - 24,000+ lines of implementation knowledge
- **5 custom utility scripts** - 1,850 lines of development tools
- **Real-world patterns** - Proven examples and best practices
- **Cross-referenced structure** - 48+ bidirectional links

**Testing & Quality Layer**
- **Native testing framework** - Zero-dependency test utilities
- **Jupyter integration** - Interactive browser-based testing
- **Performance monitoring** - Instrumentation tools
- **Build automation** - Component bundling and deployment

Skills from Adobe, Anthropic, and custom development provide orchestration. Documentation provides knowledge. Custom utilities provide tools. **Together, they create an AI development environment for EDS.**

**Your next project needs all three layers.** Clone this repository to get the solution.

## 📚 Additional Reading

Deep-dive articles explaining the philosophy and innovations behind this framework:

### 🎯 Reading: The Skills + Documentation Convergence

**[AI-Powered Adobe EDS Development](https://allabout.network/blogs/ddt/integrations/ai-powered-adobe-eds-development)**

Overview of AI-assisted EDS development, including the framework architecture, skills system, and how to leverage AI for production development.

**[The Convergence: Completing Adobe's Claude Skills for EDS AI Development](https://allabout.network/blogs/ddt/integrations/the-convergence-completing-adobe-s-claude-skills-for-perfect-eds-ai-development)**

Explores why skills need documentation to be effective, and how this repository completes Adobe's innovation by providing the implementation knowledge layer.

### 📓 Interactive Testing Innovation Series

**[Building Interactive Notebooks for EDS: A Journey in Context-Aware Design](https://allabout.network/blogs/ddt/integrations/building-interactive-notebooks-for-eds-a-journey-in-context-aware-design)**

The story of creating the jupyter-notebook-testing skill and ipynb-viewer block, focusing on the design decisions that enable context-aware, browser-based testing.

**[Living Documentation: Browser-Based Jupyter Notebooks for Adobe EDS](https://allabout.network/blogs/ddt/integrations/living-documentation-browser-based-jupyter-notebooks-for-adobe-eds)**

How interactive notebooks transform from testing tools into living documentation that's executable, maintainable, and AI-friendly.

### 🏗️ Original Implementation
**[Using Web Components in Adobe Edge Delivery Services Blocks](https://allabout.network/blogs/ddt/integrations/using-web-components-in-adobe-edge-delivery-services-blocks)**

The original post that started this framework, showing how to integrate web components with EDS using zero-dependency vanilla JavaScript.

## 📞 Support & Resources

- **📋 Issues:** [GitHub Issues](https://github.com/ddttom/webcomponents-with-eds/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/ddttom/webcomponents-with-eds/discussions)
- **📚 Documentation:** [Framework Docs](docs/for-ai/index.md)
- **📧 Contact:** tom.cranstoun@gmail.com

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Adobe Edge Delivery Services** team for the platform
- **Shoelace Design System** for web components
- **AI development community** for inspiration and feedback
- **Simple JavaScript philosophy** advocates

---

**Ready to build EDS components with simple tools?** This framework proves that zero dependencies doesn't mean zero capabilities. With 8 production-ready blocks, custom utility scripts (1,850 lines), 32 documentation files (24,000+ lines), 21+ AI-powered skills, 10 autonomous agents, and an interactive testing system, you have what's needed for professional EDS development.

**🎯 For developers who believe that elegance comes from simplicity, not complexity.**

### 🚀 Quick Feature Highlights
- **Zero Dependencies** - Pure vanilla JavaScript, no npm packages required
- **8 Production Blocks** - Including the ipynb-viewer for interactive testing
- **Custom Utility Scripts** - 1,850 lines of development tools (plus 864 lines Adobe EDS platform files)
- **21+ AI Skills** - AI-assisted development workflows
- **10 Claude Agents** - Autonomous specialists for complex tasks
- **12 Slash Commands** - Quick access to common development tasks
- **32 Documentation Files** - 24,000+ lines of guides
- **Live Reload Server** - Automatic browser refresh on file changes
- **Native Testing Framework** - Zero-dependency testing with test reporting
- **Dual Environment Testing** - Test in both Node.js (jsdom) and browser (ipynb-viewer)
- **Skill Activation System** - Automatic context-aware AI assistance
- **Interactive Notebooks** - Jupyter notebook testing with overlay previews
- **Performance Monitoring** - Instrumentation for optimization
