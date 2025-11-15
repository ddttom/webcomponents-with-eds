# Web Components with Adobe Edge Delivery Services

**A comprehensive development framework for building sophisticated EDS components with simple, dependency-free JavaScript**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-zero-success)](package.json)

## 🎯 Project Philosophy

This framework demonstrates that **sophisticated web development doesn't require complex tooling**. Built entirely with vanilla JavaScript and zero external dependencies, it provides enterprise-level capabilities through simple, maintainable code.

**Core Principles:**
- ✅ **Zero Dependencies** - Pure Node.js built-ins only
- ✅ **Simple Architecture** - Direct file editing, no compilation required
- ✅ **Sophisticated Results** - Advanced UI components and comprehensive documentation
- ✅ **EDS Native** - Purpose-built for Adobe Edge Delivery Services
- ✅ **AI-Friendly** - Extensive documentation designed for AI assistant development

## 🚀 Quick Start

```bash
# Clone and start developing immediately
git clone https://github.com/ddttom/webcomponents-with-eds.git
cd webcomponents-with-eds
node server.js

# Server running at http://localhost:3000
# No npm install required - zero dependencies!
```

## 📁 Project Architecture

```
webcomponents-with-eds/
├── 📄 server.js                  # Development server (150 lines, zero deps)
├── 📄 server.html                # Server documentation and testing interface
├── 🧱 blocks/                    # EDS-ready components (8 production blocks)
│   ├── ipynb-viewer/             # Interactive Jupyter notebook viewer ⭐
│   ├── accordion/                # Expandable FAQ/accordion component
│   ├── cards/                    # Card grid component
│   ├── columns/                  # Column layout block
│   ├── counter/                  # Counter component
│   ├── helloworld/               # Simple example block
│   ├── shoelace-card/            # Advanced glassmorphism component
│   └── shoelace/                 # Shoelace design system integration
├── 🔧 build/                     # Development workspace (when needed)
│   └── shoelace-card/            # Build environment for complex components
├── 🤖 .claude/                   # Claude Code AI integration ⭐
│   ├── commands/                 # 12 slash commands for workflows
│   ├── skills/                   # 21+ specialized AI capabilities
│   │   ├── jupyter-notebook-testing/  # Interactive testing framework
│   │   ├── eds-block-development/     # Block development patterns
│   │   ├── content-driven-development/  # CDD workflow orchestrator
│   │   └── skill-rules.json      # Automatic skill activation system
│   └── README.md                 # Complete Claude Code guide
└── 📚 docs/                      # Comprehensive development framework
    ├── server-README.md          # Development server guide
    └── for-ai/                   # 27 document development framework ⭐
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

### Advanced Components (When You Need External Libraries)
**Development in `/build/` with automatic deployment**

```javascript
// build/shoelace-card/shoelace-card.js
import { SlCard, SlButton } from '@shoelace-style/shoelace';

export default function decorate(block) {
  // Modern JavaScript with external dependencies
  // Bundled into self-contained blocks/ output
}
```

## 🎓 Comprehensive Documentation Framework

The `docs/for-ai/` directory contains a **professional-grade development framework** with 27 documents totaling over 5,000 lines:

### 📊 Documentation by Audience

| **New Developers**                                                | **Experienced Developers**                                                       | **Architects & Tech Leads**                                                                  |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [`eds.md`](docs/for-ai/eds.md) - Complete EDS guide (1,937 lines) | [`block-architecture-standards.md`](docs/for-ai/block-architecture-standards.md) | [`design-philosophy-guide.md`](docs/for-ai/design-philosophy-guide.md)                       |
| [`raw-eds-blocks-guide.md`](docs/for-ai/raw-eds-blocks-guide.md)  | [`complex-eds-blocks-guide.md`](docs/for-ai/complex-eds-blocks-guide.md)         | [`eds-architecture-and-testing-guide.md`](docs/for-ai/eds-architecture-and-testing-guide.md) |
| [`server-README.md`](docs/server-README.md)                       | [`eds-native-testing-standards.md`](docs/for-ai/eds-native-testing-standards.md) | [`eds-webcomponents-review.md`](docs/for-ai/eds-webcomponents-review.md)                     |

### 📋 Project Management Suite

| **Product Requirements**                                            | **Technical Standards**                                                   | **Security & Compliance**                                               |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [`prd.md`](docs/for-ai/guidelines/prd.md) - Complete PRD            | [`tech-stack.md`](docs/for-ai/guidelines/tech-stack.md)                   | [`security-checklist.md`](docs/for-ai/guidelines/security-checklist.md) |
| [`app-flow.md`](docs/for-ai/guidelines/app-flow.md) - User journeys | [`frontend-guidelines.md`](docs/for-ai/guidelines/frontend-guidelines.md) | [`backend-structure.md`](docs/for-ai/guidelines/backend-structure.md)   |

### 🧪 Testing & Quality Assurance

- **[`debug.md`](docs/for-ai/debug.md)** - Debugging policies and procedures
- **[`eds-native-testing-standards.md`](docs/for-ai/eds-native-testing-standards.md)** - Testing frameworks
- **[`instrumentation-how-it-works.md`](docs/for-ai/instrumentation-how-it-works.md)** - Performance monitoring
- **[`investigation.md`](docs/for-ai/investigation.md)** - Performance analysis reports

**📍 Start Here:** [`docs/for-ai/index.md`](docs/for-ai/index.md) - Complete navigation hub with 48+ cross-references

## 🛠️ Development Server Features

**Simple but Powerful** - 150 lines of pure Node.js providing:

```bash
🚀 Server running at http://localhost:3000
📁 Serving files from: /current/directory
🔗 Proxying missing files to: https://allabout.network
📄 Main page: http://localhost:3000/server.html
```

### Key Capabilities
- **Local-first serving** - Your files take priority
- **Intelligent proxy fallback** - Missing files served from live EDS site
- **Real-time development** - No build process for simple components
- **Comprehensive logging** - Track file requests and proxy behavior
- **Zero configuration** - Works out of the box

### Advanced Development Workflow

```bash
# For complex components with dependencies
cd build/my-component/
npm install shoelace-design-system
# Develop with modern tooling

npm run build    # Bundle dependencies
npm run deploy   # Copy to blocks/my-component/

# Result: Self-contained EDS component with zero external dependencies
```

## 🎨 Component Examples

### 📓 ipynb-viewer Block ⭐
**Interactive Jupyter Notebook Viewer with Browser Execution**
- Parse and display Jupyter notebooks (.ipynb files) directly in your EDS site
- **Execute JavaScript code cells** interactively in the browser with async/await support
- **Overlay preview system** with responsive device testing (Mobile 375×667, Tablet 768×1024, Desktop)
- **Smart cell grouping** - Automatically combines instruction markdown with following code cells
- **Paged variation** - Display cells one at a time with keyboard navigation
- **Direct ES6 imports** - Each cell imports what it needs independently
- **Helper functions**: `testBlock()` for testing block decoration, `showPreview()` for visual overlay previews
- **607-line comprehensive documentation** in [blocks/ipynb-viewer/README.md](blocks/ipynb-viewer/README.md)
- **Key innovation**: Generated HTML previews link to actual CSS files for instant live reload without rebuilding

### 🃏 Shoelace Card Component
**Advanced glassmorphism design with animations**
- External Shoelace Design System integration
- Bundled into self-contained EDS block
- Sophisticated styling with CSS custom properties
- Modern JavaScript with async/await patterns

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

### 💡 The Essential Convergence: Skills + Documentation

**A crucial insight about AI-assisted development:**

Anthropic developed **Claude Skills**, and Adobe created **EDS-specific skills**. However, a fundamental challenge emerged: **skills are lightweight orchestrators that rely on comprehensive documentation for effective operation**. Without detailed implementation knowledge, they function merely as process guides, instructing the AI on *what* to do. To achieve true efficacy, they must also guide the AI on *how* to do it.

#### The 2 AM Debugging Problem

When I created [`docs/for-ai/`](docs/for-ai/), I was solving the 2 AM debugging problem—creating comprehensive documentation that AI could understand with implementation details, patterns, and real-world solutions. Adobe's skills provide the orchestration layer that makes this knowledge actionable. **The convergence isn't just beneficial—it's essential.**

#### Why Both Pieces Matter

- **My contribution** makes Adobe's innovation complete by providing the implementation knowledge
- **Adobe's skills** make my documentation actionable through structured workflows
- **Together**, we've created the complete AI development environment with both orchestration AND implementation

**The Result:** AI transforms from confused observer to knowledgeable partner with both the workflows (skills) AND the implementation details (comprehensive docs).

#### For Your Next EDS Project

1. **Use Adobe's Skills** for workflow orchestration (21+ skills in this project)
2. **Add comprehensive docs/for-ai** for actual implementation knowledge (27 files, 5,000+ lines)
3. **Watch as AI development becomes** genuinely productive with both pieces in place

**The future of AI-assisted EDS development requires both orchestration and knowledge. This repository shows how to provide both.**

### 📖 AI-Ready Documentation
- **Comprehensive context** - 27 files with 5,000+ lines of development guidelines
- **Cross-referenced structure** - 48+ bidirectional links between documents
- **Audience-targeted guidance** - Specific instructions for different developer types
- **Implementation patterns** - Real-world examples and best practices

### 🎮 Claude Code Integration

The project includes **full Claude Code configuration** in the [`.claude/`](.claude/) directory with 21+ skills and 12 workflow commands:

#### ⚡ Slash Commands (12 Total)
Quick access to common workflows - comprehensive command reference:

##### Block Development Commands
- **`/new-block`** - Create new EDS block following Content Driven Development (CDD) process with content model design
- **`/start-cdd`** - Start Content Driven Development workflow for creating or modifying blocks
- **`/check-block`** - Analyze a block and provide architecture review with improvement suggestions
- **`/deploy-block`** - Deploy a block from build/ directory to blocks/ directory for production

##### Testing & Quality Commands
- **`/test-block`** - Run comprehensive tests for a specific EDS block (unit, browser, visual)
- **`/jupyter-notebook`** - Create or edit Jupyter notebooks for interactive block testing with jsdom and ipynb-viewer
- **`/lint-all`** - Run all linting checks (JavaScript and CSS) across the entire project
- **`/check-security`** - Run security checklist validation based on EDS security guidelines

##### Documentation & Planning Commands
- **`/review-docs`** - Review and understand the EDS documentation structure in docs/for-AI
- **`/dev-docs`** - Create a comprehensive strategic plan with structured task breakdown
- **`/dev-docs-update`** - Update development documentation before context compaction
- **`/find-block-content`** - Find pages in the site that use a specific block

**[Complete documentation in .claude/README.md](.claude/README.md)**

#### 🧠 Specialized Skills (21+ Total)
AI-powered development workflows organized by category:

##### 🏗️ Core EDS Development Skills
- **content-driven-development** - Content-first workflow orchestrator for all EDS development
- **building-blocks** - EDS block implementation guide with JavaScript decoration, CSS styling, and content models
- **content-modeling** - Design author-friendly content structures that are easy to work with
- **eds-block-development** - Comprehensive vanilla JavaScript and block decoration patterns (641 lines)
- **eds-block-testing** - Testing with test.html files and development server
- **eds-performance-debugging** - Performance optimization, debugging, error handling, and Core Web Vitals

##### 🧪 Testing & Quality Assurance
- **testing-blocks** - Comprehensive testing guide covering unit tests, browser tests, linting, and performance validation (296 lines)
- **jupyter-notebook-testing** - Interactive browser-based block testing with jsdom and ipynb-viewer integration (285 lines, 5 supporting docs)

##### 🔍 Resource Discovery
- **block-collection-and-party** - Search Adobe Block Collection and Block Party repositories for existing blocks, build tools, code snippets, and integration patterns (413 lines)
- **docs-search** - Search official aem.live documentation for platform features and implementation guidance (214 lines)

##### 📄 Document Processing
- **document-skills/docx** - Working with Microsoft Word .docx files in OOXML format
- **document-skills/pdf** - Working with PDF files including fillable forms
- **document-skills/pptx** - Working with PowerPoint .pptx presentations

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

**[Complete documentation in .claude/README.md](.claude/README.md)**

#### 📓 Jupyter Notebook Testing ⭐
**Complete Interactive Testing System with Browser Execution**

This project features a **comprehensive Jupyter notebook testing framework** that revolutionizes EDS block development:

##### 🎯 Two Execution Environments

**1. Node.js Testing (jsdom)** - Fast isolated testing without browser
```bash
# Launch interactive testing environment in VS Code/Jupyter
/jupyter-notebook

# Features:
# ✅ Test blocks in isolated jsdom environment (no browser needed)
# ✅ Generate styled HTML previews with live CSS reload
# ✅ Rapid iteration without page reloads or build steps
# ✅ Support for both simple and complex blocks
# ✅ Helper functions: testBlock(), saveBlockHTML(), loadBlockStyles()
```

**2. Browser Execution (ipynb-viewer block)** - Full browser testing with real DOM
- **View and execute notebooks** directly in your EDS site via the ipynb-viewer block
- **Interactive JavaScript execution** with native browser APIs and async/await support
- **Overlay preview system** with responsive device testing (Mobile/Tablet/Desktop views)
- **Direct ES6 imports** - Each cell imports what it needs independently
- **No initialization required** - Run any cell at any time in any order
- **Helper functions**: `testBlock()` for block decoration testing, `showPreview()` for visual overlay previews
- **Smart cell grouping** - Automatically combines instruction markdown with following code cells for better reading

##### 📚 Comprehensive Documentation (5 Files, 1,000+ Lines)

- **Main Guide:** [`.claude/skills/jupyter-notebook-testing/SKILL.md`](.claude/skills/jupyter-notebook-testing/SKILL.md) (285 lines, follows Anthropic best practices)
- **Installation:** [INSTALLATION.md](.claude/skills/jupyter-notebook-testing/INSTALLATION.md) - Platform-specific setup for tslab, Jupyter, jsdom
- **Examples:** [EXAMPLES.md](.claude/skills/jupyter-notebook-testing/EXAMPLES.md) - Content patterns for accordion, tabs, cards, hero, carousel, modal, etc.
- **Advanced Techniques:** [ADVANCED_TECHNIQUES.md](.claude/skills/jupyter-notebook-testing/ADVANCED_TECHNIQUES.md) - Performance testing, visual regression, snapshot testing, batch testing
- **Troubleshooting:** [TROUBLESHOOTING.md](.claude/skills/jupyter-notebook-testing/TROUBLESHOOTING.md) - Solutions for common issues with module loading, DOM manipulation, async operations

##### 🔑 Key Innovations

1. **Dual Environment Testing** - Test in both Node.js (fast) and browser (accurate)
2. **Live CSS Reload** - Generated HTML previews link to actual CSS files instead of embedding them - edit CSS and refresh browser for instant updates
3. **Responsive Testing** - Built-in device preview modes (Mobile 375×667, Tablet 768×1024, Desktop)
4. **Zero Build Step** - Direct execution in browser without compilation or bundling
5. **Cell Independence** - No setup cells required, each cell is self-contained with imports
6. **Visual Overlays** - Full-screen overlay previews with backdrop for realistic testing

##### 🚀 Complete Workflow Example

```javascript
// In a Jupyter notebook cell - executes in browser via ipynb-viewer
import { testBlock, showPreview } from '/scripts/ipynb-helpers.js';

// Test your block
const result = await testBlock('accordion', `
  <div>
    <div><h3>Question 1</h3></div>
    <div><p>Answer 1</p></div>
  </div>
`);

// Show responsive preview with device testing
await showPreview(result.html, 'accordion');
// Click Mobile/Tablet/Desktop buttons to test responsive behavior
```

### 🎯 Skill Activation System

The project includes a **sophisticated skill activation system** via [`.claude/skills/skill-rules.json`](.claude/skills/skill-rules.json) that automatically triggers the right skills based on context:

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
1. **Reference [`docs/for-ai/index.md`](docs/for-ai/index.md)** for comprehensive navigation
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

## 🔥 Advanced Features

### Dual-Directory Architecture
- **`/build/`** - Development workspace for complex components
- **`/blocks/`** - EDS-ready deployment target
- **Automatic deployment** - Build process copies optimized files

### Performance Optimization
- **Core Web Vitals focus** - Documented optimization strategies
- **Lazy loading patterns** - Efficient resource management
- **Bundle optimization** - Self-contained components with minimal footprint

### Enterprise-Level Documentation
- **27 comprehensive guides** organized by audience and function
- **Cross-reference mapping** with 48+ bidirectional links
- **Quality standards** with documented best practices
- **Security guidelines** and compliance checklists
- **Skills + Documentation synergy** - Orchestration (21+ skills) + Implementation knowledge (5,000+ lines)

## 📊 Project Statistics

| Metric                    | Value                           |
| ------------------------- | ------------------------------- |
| **Total Documentation**   | 27 files, 5,000+ lines          |
| **Blocks (Components)**   | 8 production-ready blocks       |
| **Skills**                | 21+ specialized AI capabilities |
| **Slash Commands**        | 12 workflow commands            |
| **Cross-References**      | 48+ bidirectional links         |
| **Code Complexity**       | 150 lines (server.js)           |
| **External Dependencies** | 0 (zero)                        |
| **Development Patterns**  | 2 (direct-edit, build-enhanced) |

## 🚀 Getting Started Paths

### 👨‍💻 **For Developers**
1. Start with [`docs/for-ai/eds.md`](docs/for-ai/eds.md) - Comprehensive EDS guide
2. Follow [`docs/for-ai/raw-eds-blocks-guide.md`](docs/for-ai/raw-eds-blocks-guide.md) for simple components
3. Progress to [`docs/for-ai/complex-eds-blocks-guide.md`](docs/for-ai/complex-eds-blocks-guide.md) for advanced features

### 🏗️ **For Architects**
1. Review [`docs/for-ai/design-philosophy-guide.md`](docs/for-ai/design-philosophy-guide.md)
2. Study [`docs/for-ai/block-architecture-standards.md`](docs/for-ai/block-architecture-standards.md)
3. Analyze [`docs/for-ai/eds-webcomponents-review.md`](docs/for-ai/eds-webcomponents-review.md)

### 📋 **For Project Managers**
1. Begin with [`docs/for-ai/guidelines/prd.md`](docs/for-ai/guidelines/prd.md)
2. Review [`docs/for-ai/guidelines/tech-stack.md`](docs/for-ai/guidelines/tech-stack.md)
3. Implement [`docs/for-ai/guidelines/security-checklist.md`](docs/for-ai/guidelines/security-checklist.md)

### 🤖 **For AI Assistants**
1. **Essential:** [`docs/for-ai/index.md`](docs/for-ai/index.md) - Complete navigation and context
2. **Claude Code Setup:** [`.claude/README.md`](.claude/README.md) - Commands, skills, and workflows
3. **Code Generation:** [`docs/for-ai/block-architecture-standards.md`](docs/for-ai/block-architecture-standards.md)
4. **Quality Standards:** [`docs/for-ai/guidelines/frontend-guidelines.md`](docs/for-ai/guidelines/frontend-guidelines.md)
5. **Interactive Testing:** [`.claude/skills/jupyter-notebook-testing.md`](.claude/skills/jupyter-notebook-testing.md)

## 🏆 Why This Framework?

### ✅ **Proven Philosophy**
- **Simple tools, sophisticated results** - Vanilla JavaScript creating advanced UI
- **Zero dependencies** - No npm vulnerabilities or update fatigue
- **Direct development** - Edit files, see changes immediately

### ✅ **Enterprise Ready**
- **Comprehensive documentation** - 27 files with professional-grade development guides
- **Security focused** - Built-in security guidelines and best practices
- **Performance optimized** - Core Web Vitals and accessibility standards
- **8 production-ready blocks** - From simple examples to advanced components

### ✅ **AI Optimized**
- **Extensive context** - 27 files with 5,000+ lines of development guidance
- **21+ specialized skills** - AI-powered workflows for every development task
- **12 slash commands** - Quick access to common workflows
- **Pattern-based** - Consistent, reusable development patterns
- **Skill activation system** - Automatic context-aware expertise
- **Interactive testing** - Jupyter notebook integration with dual environment testing

## 🎯 The Complete AI Development Environment

This repository represents the **convergence of two essential innovations**:

### 🤝 Adobe's Contribution: Workflow Orchestration
- **21+ Claude Skills** providing structured workflows for every development task
- **Automatic skill activation** based on context and file patterns
- **Process guidance** that tells AI *what* to do at each step

### 📚 This Repository's Contribution: Implementation Knowledge
- **27 comprehensive documentation files** with 5,000+ lines of implementation details
- **Real-world patterns and examples** showing *how* to implement features
- **Cross-referenced structure** enabling AI to navigate complex topics
- **2 AM debugging solutions** that AI can understand and apply

### ✨ The Result: True AI Partnership
Without comprehensive docs, skills are empty orchestrators. Without skills, docs lack actionable workflows. **Together, they create the first truly effective AI development environment for EDS.**

**Your next project needs both pieces.** Clone this repository to get the complete solution.

## 📚 Additional Reading

Deep-dive articles explaining the philosophy and innovations behind this framework:

### 🎯 Essential Reading: The Skills + Documentation Convergence

**[AI-Powered Adobe EDS Development](https://allabout.network/blogs/ddt/integrations/ai-powered-adobe-eds-development)**

Comprehensive overview of AI-assisted EDS development, including the complete framework architecture, skills system, and how to leverage AI for professional-grade development.

**[The Convergence: Completing Adobe's Claude Skills for Perfect EDS AI Development](https://allabout.network/blogs/ddt/integrations/the-convergence-completing-adobe-s-claude-skills-for-perfect-eds-ai-development)**

Explores why skills need comprehensive documentation to be effective, and how this repository completes Adobe's innovation by providing the implementation knowledge layer.

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
- **📚 Documentation:** [Complete Framework](docs/for-ai/index.md)
- **📧 Contact:** tom.cranstoun@gmail.com

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Adobe Edge Delivery Services** team for the excellent platform
- **Shoelace Design System** for outstanding web components
- **AI development community** for inspiration and feedback
- **Simple JavaScript philosophy** advocates

---

**Ready to build sophisticated EDS components with simple tools?** This framework proves that zero dependencies doesn't mean zero capabilities. With 8 production-ready blocks, 27 comprehensive documentation files, 21+ AI-powered skills, and a revolutionary interactive testing system, you have everything needed for professional EDS development.

**🎯 Perfect for developers who believe that elegance comes from simplicity, not complexity.**

### 🚀 Quick Feature Highlights
- **Zero Dependencies** - Pure vanilla JavaScript, no npm packages required
- **8 Production Blocks** - Including the innovative ipynb-viewer for interactive testing
- **21+ AI Skills** - Comprehensive AI-assisted development workflows
- **12 Slash Commands** - Quick access to common development tasks
- **27 Documentation Files** - 5,000+ lines of professional-grade guides
- **Dual Environment Testing** - Test in both Node.js (jsdom) and browser (ipynb-viewer)
- **Skill Activation System** - Automatic context-aware AI assistance
- **Interactive Notebooks** - Revolutionary Jupyter notebook testing with overlay previews
