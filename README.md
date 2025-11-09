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
├── 🧱 blocks/                    # EDS-ready components (deployment target)
│   ├── shoelace-card/            # Advanced glassmorphism component
│   ├── simple-table/             # Vanilla JS data table
│   └── text-formatter/           # Basic text processing
├── 🔧 build/                     # Development workspace (when needed)
│   └── shoelace-card/            # Build environment for complex components
├── 🤖 .claude/                   # Claude Code AI integration ⭐
│   ├── commands/                 # 10+ slash commands for workflows
│   ├── skills/                   # 15+ specialized AI capabilities
│   └── README.md                 # Complete Claude Code guide
└── 📚 docs/                      # Comprehensive development framework
    ├── server-README.md          # Development server guide
    └── for-ai/                   # 24+ document development framework ⭐
        ├── 📖 index.md           # Navigation hub (48+ cross-references)
        ├── 📋 guidelines/        # Project management & architecture
        ├── 🔧 implementation/   # Component development guides
        └── 🧪 testing/          # Testing, debugging & performance
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

The `docs/for-ai/` directory contains a **professional-grade development framework** with 24+ documents totaling over 5,000 lines:

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

### 🃏 Shoelace Card Component
**Advanced glassmorphism design with animations**
- External Shoelace Design System integration
- Bundled into self-contained EDS block
- Sophisticated styling with CSS custom properties
- Modern JavaScript with async/await patterns

### 📊 Simple Table Component  
**Vanilla JavaScript data processing**
- Pure JavaScript, no external dependencies
- Responsive design with CSS Grid
- Accessible markup and keyboard navigation
- Direct editing workflow

### ✍️ Text Formatter Component
**Basic text processing and formatting**
- Minimal JavaScript for text transformations
- Educational example for EDS development
- Clear, readable code structure

## 🤖 AI Assistant Integration

This framework is **specifically designed for AI-assisted development**:

### 📖 AI-Ready Documentation
- **Comprehensive context** - 5,000+ lines of development guidelines
- **Cross-referenced structure** - 48+ bidirectional links between documents
- **Audience-targeted guidance** - Specific instructions for different developer types
- **Implementation patterns** - Real-world examples and best practices

### 🎮 Claude Code Integration

The project includes **full Claude Code configuration** in the [`.claude/`](.claude/) directory:

#### ⚡ Slash Commands
Quick access to common workflows:
- `/new-block` - Create new EDS blocks with Content Driven Development
- `/test-block` - Run comprehensive block tests
- `/jupyter-notebook` - Interactive testing with Jupyter notebooks
- `/lint-all` - Code quality checks across the project
- `/check-security` - Security validation and compliance
- **[10+ commands total](.claude/README.md)** - See full command reference

#### 🧠 Specialized Skills
AI-powered development workflows:
- **content-driven-development** - Author-first block creation process
- **building-blocks** - EDS block implementation patterns
- **testing-blocks** - Comprehensive testing strategies
- **jupyter-notebook-testing** - Interactive browser-free testing
- **docs-search** - Search official aem.live documentation
- **[15+ skills total](.claude/README.md)** - Complete skill catalog

#### 📓 Jupyter Notebook Testing
**NEW:** Test EDS blocks interactively without a browser:
```bash
# Launch interactive testing environment
/jupyter-notebook

# Features:
# - Test blocks in isolated jsdom environment
# - Generate styled HTML previews
# - Rapid iteration without page reloads
# - Support for both simple and complex blocks
```

See [`.claude/skills/jupyter-notebook-testing.md`](.claude/skills/jupyter-notebook-testing.md) for complete guide.

### 🔧 AI Development Workflow
1. **Reference [`docs/for-ai/index.md`](docs/for-ai/index.md)** for comprehensive navigation
2. **Use slash commands** for common tasks (e.g., `/new-block my-component`)
3. **Invoke skills** for specialized workflows (e.g., Content Driven Development)
4. **Test interactively** with Jupyter notebooks for rapid feedback
5. **Follow audience-specific guides** based on experience level
6. **Use documented patterns** for consistent code generation
7. **Leverage testing standards** for quality assurance

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
- **24+ comprehensive guides** covering all aspects of development
- **Cross-reference mapping** for easy navigation
- **Quality standards** with documented best practices
- **Security guidelines** and compliance checklists

## 📊 Project Statistics

| Metric                    | Value                           |
| ------------------------- | ------------------------------- |
| **Total Documentation**   | 24+ files, 5,000+ lines         |
| **Cross-References**      | 48+ bidirectional links         |
| **Code Complexity**       | 150 lines (server.js)           |
| **External Dependencies** | 0 (zero)                        |
| **Component Examples**    | 3 (simple to advanced)          |
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
- **Comprehensive documentation** - Professional-grade development guides
- **Security focused** - Built-in security guidelines and best practices
- **Performance optimized** - Core Web Vitals and accessibility standards

### ✅ **AI Optimized**
- **Extensive context** - 5,000+ lines of development guidance
- **Pattern-based** - Consistent, reusable development patterns
- **Well-documented** - Clear examples and implementation details

## 📞 Support & Resources

- **📋 Issues:** [GitHub Issues](https://github.com/ddttom/webcomponents-with-eds/issues)
- **💬 Discussions:** [GitHub Discussions](https://github.com/ddttom/webcomponents-with-eds/discussions)
- **📚 Documentation:** [Complete Framework](docs/for-ai/index.md)
- **📧 Contact:** tom.cranstoun@gmail.com
- **🌐 Blog:** [Original Implementation Post](https://allabout.network/blogs/ddt/integrations/using-web-components-in-adobe-edge-delivery-services-blocks)

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Adobe Edge Delivery Services** team for the excellent platform
- **Shoelace Design System** for outstanding web components
- **AI development community** for inspiration and feedback
- **Simple JavaScript philosophy** advocates

---

**Ready to build sophisticated EDS components with simple tools?** This framework proves that zero dependencies doesn't mean zero capabilities. Start with our comprehensive documentation and join the simple-but-powerful development revolution.

**🎯 Perfect for developers who believe that elegance comes from simplicity, not complexity.**
