# Web Components with Adobe Edge Delivery Services

A comprehensive development framework for building high-performance web components with Adobe Edge Delivery Services (EDS). This project provides advanced components, development infrastructure, and build automation for creating sophisticated EDS blocks with modern web technologies.

## 🚀 Quick Start

### For EDS Integration
```bash
# Clone the repository
git clone https://github.com/ddttom/webcomponents-with-eds.git
cd webcomponents-with-eds

# Copy blocks to your EDS project
cp -r blocks/* /path/to/your/eds-project/blocks/

# Commit to your EDS repository
cd /path/to/your/eds-project
git add blocks/
git commit -m "Add web components from webcomponents-with-eds"
git push
```

### For Development
```bash
# Install dependencies
npm install

# Start EDS development server
npm run debug  # http://localhost:3000

# Or start standalone development
cd build/shoelace-card && npm run dev  # http://localhost:5174
```

## 🏗️ Project Architecture

```
webcomponents-with-eds/
├── .github/                   # GitHub templates and workflows
├── blocks/                    # EDS-ready components
│   ├── counter/              # Interactive counter component
│   │   ├── counter.css       # Component styles
│   │   ├── counter.js        # Component logic
│   │   ├── example.md        # Usage examples
│   │   └── README.md         # Component documentation
│   ├── shoelace/             # Shoelace design system integration
│   │   ├── shoelace.css      # Integration styles
│   │   ├── shoelace.js       # Integration logic
│   │   └── README.md         # Integration documentation
│   └── shoelace-card/        # Advanced glassmorphism card component
│       ├── shoelace-card.css # Stub CSS (styles bundled in JS)
│       ├── shoelace-card.js  # Self-contained component bundle
│       ├── example.md        # Usage examples
│       ├── test.html         # Test page
│       └── README.md         # Component documentation
├── build/                    # Standalone build environments
│   └── shoelace-card/        # Vite-based development setup
│       ├── deploy.js         # Deployment script
│       ├── DEV-README.md     # Development documentation
│       ├── index.html        # Development test page
│       ├── package.json      # Build dependencies and scripts
│       ├── shoelace-card.css # Source styles
│       ├── shoelace-card.js  # Source component
│       ├── shoelace-card-stub.css # Stub CSS for deployment
│       ├── USER-README.md    # User documentation
│       └── vite.config.js    # Vite build configuration
├── docs/                     # Comprehensive documentation
│   ├── server-README.md      # Development server guide
│   └── for-ai/              # AI assistant development guidelines
├── scripts/                  # Build automation and utilities
│   ├── aem.js               # EDS integration utilities
│   ├── build-component.js   # Component build automation
│   ├── delayed.js           # Delayed loading utilities
│   └── scripts.js           # Core EDS scripts
├── styles/                   # Global EDS styles
│   ├── fonts.css            # Font definitions
│   ├── lazy-styles.css      # Lazy-loaded styles
│   └── styles.css           # Main stylesheet
├── server.js                 # Zero-dependency development server
├── server.html              # Development server interface
├── shoelace-card-blog.md    # Advanced implementation guide
├── favicon.ico              # Site favicon
├── eslint.config.js         # ESLint configuration
├── package.json             # Project dependencies and scripts
├── CODE_OF_CONDUCT.md       # Community guidelines
├── CONTRIBUTING.md          # Contribution guidelines
├── LICENSE                  # MIT license
└── SECURITY.md              # Security policy
```

### **📁 Architecture Philosophy**

> **Important**: This project demonstrates **two complementary development approaches**:
> 
> - **`/blocks/` Directory**: Contains EDS-native components following the core philosophy of simple JavaScript, no dependencies, and no build steps
> - **`/build/` Directory**: Contains complex components that use build processes, external dependencies, and modern tooling when sophisticated functionality is required
> 
> Both approaches are valid and designed to coexist, allowing developers to choose the right tool for each component's complexity and requirements.

## 🧩 Advanced Components

### Shoelace Card Component
**A sophisticated glassmorphism card component with advanced features:**

- **Advanced Glassmorphism Effects**: Multi-layer backdrop blur with sophisticated shadow systems
- **Immersive Modal System**: Full-screen content display with background imagery integration
- **Self-Contained Architecture**: Bundled component with all Shoelace dependencies included
- **Standalone Build System**: Vite-based development with hot reload and proxy support
- **EDS Compatibility**: Exported decorate function for seamless integration
- **Performance Optimized**: Minimal runtime overhead with efficient DOM manipulation
- **✅ Live Tested**: Successfully tested with real data, modal functionality, and proxy integration

```bash
# Standalone development
cd build/shoelace-card && npm run dev

# Build and deploy to EDS
cd build/shoelace-card && npm run deploy

# Copy to your EDS project and commit
cp -r blocks/shoelace-card /path/to/your/eds-project/blocks/
cd /path/to/your/eds-project && git add blocks/ && git commit -m "Add Shoelace Card component" && git push
```

### Shoelace Integration
**Complete integration layer for Shoelace Design System:**

- Progressive enhancement with Shoelace web components
- Custom styling support and theming
- Performance optimized loading
- EDS-compatible implementation

### Counter Component
**Interactive counter demonstrating modern EDS patterns:**

- Vanilla JavaScript implementation
- Accessible keyboard navigation
- Event-driven architecture
- State management patterns

## 🤖 AI-Assisted EDS Development

### The Challenge with Traditional EDS Workflows

Adobe Edge Delivery Services delivers exceptional performance and fast development cycles. However, the traditional development workflow creates barriers for AI assistance. The multi-system approach - coordinating between code repositories, Google Docs, SharePoint, and deployment branches - works well for human developers but creates an impossible situation for AI assistants.

When you ask an AI to help debug your EDS block, it struggles because:
- **It can't access your Google Docs or SharePoint content**
- **It can't correlate branch changes with document updates**
- **It can't test code against real data from multiple sources**
- **It lacks context about the complete development environment**

This fragmentation means developers miss out on AI's ability to accelerate development, catch bugs early, and suggest architectural improvements.

### The Solution: Local-First Development

This framework transforms EDS development into an AI-friendly environment through a unified local-first approach. Instead of splitting workflows across multiple systems, everything runs locally where AI assistants can participate meaningfully.

**Key Benefits:**
- **Unified Environment**: AI sees code, content, and data in one place
- **Real-time Feedback**: Instant testing and debugging without system switching
- **Intelligent Assistance**: AI can suggest improvements with full context
- **Immediate Changes**: Save and refresh - no build delays or deployment waits

### How It Works

The development server implements a **local-first, proxy-fallback architecture**:

1. **Local Priority**: Serves your development files first
2. **Smart Proxying**: Fetches missing assets from production/staging
3. **Unified Testing**: Test blocks with real data without system juggling
4. **AI Visibility**: Complete transparency for AI assistants

This approach maintains all the benefits of EDS (branches, documents, deployment) while enabling AI to participate effectively in your development process.

### AI-Friendly Development Features

**Immediate Feedback Loop:**
- Save a file and refresh your browser - changes appear instantly
- No build process, deployment wait, or document synchronization delays
- AI assistants can test suggestions and see results immediately

**Complete Context Visibility:**
- Work on code and content together in one environment
- Test edge cases without switching between systems
- Debug with full context available to both you and AI
- Server logs show exactly what's happening with each request

**Intelligent Development Assistance:**
- AI can analyze code, test changes, and provide suggestions with full context
- Catch accessibility issues and performance problems in real-time
- Get architectural recommendations based on complete project visibility
- Debug problems as they happen with AI seeing the same environment you do

**Unified Resource Management:**
- Local files take priority for active development
- Production/staging assets automatically proxied when needed
- Choose your data source (staging or production) without configuration changes
- Maintain version control workflow while enabling AI collaboration

## 🛠️ Development Infrastructure

### Zero-Dependency Development Server
**Advanced Node.js server for EDS development:**

```bash
npm run debug  # Start on http://localhost:3000
```

**Features:**
- **Local-first, proxy-fallback architecture**
- **EDS block structure validation**
- **Automatic asset proxying to remote servers**
- **Comprehensive MIME type support**
- **Real-time error reporting and debugging**

### EDS Testing Framework
**Proper EDS block structure testing:**

```html
<!-- Required EDS Structure -->
<div class="component-name block" data-block-name="component-name" data-block-status="initialized">
    <div>
        <div>
            <p>Content goes here</p>
        </div>
    </div>
</div>
```

### Build Automation System
**NPX-powered build and deployment:**

```bash
# Build and deploy components
cd build/shoelace-card && npm run deploy

# Development workflows
npm run debug     # EDS testing environment
npm run serve     # Basic HTTP server
npm run validate  # Code quality checks
```

## 📦 Multi-Environment Support

### Standalone Development
```bash
cd build/shoelace-card
npm run dev  # Vite dev server with hot reload
```

### EDS Integration Testing
```bash
npm run debug  # Node.js server with EDS structure validation
```

### Production Deployment
```bash
# Using package script (recommended)
cd build/shoelace-card && npm run deploy
# Builds self-contained component and copies to blocks/ directory
```

## 🚀 Deployment Workflow

### Deploy Command
The `npm run deploy` command builds finished components and deploys stubs and README to the blocks folder:

```bash
cd build/shoelace-card
npm run deploy
```

This command:
- **Builds self-contained component** with all dependencies bundled
- **Copies to blocks/ directory** for EDS compatibility
- **Creates stub CSS** (styles bundled in JavaScript)
- **Copies documentation** for content authors

### EDS Integration
To use the built system in your EDS project, copy the `blocks/` contents to your repository:

```bash
# Copy built components to your EDS project
cp -r blocks/* /path/to/your/eds-project/blocks/

# Navigate to your EDS project
cd /path/to/your/eds-project

# Commit and push to git
git add blocks/
git commit -m "Add web components with advanced features"
git push origin main
```

The deploy command handles the build process, but final integration requires copying to your EDS repository and committing the changes.

## 🧪 Testing & Quality Assurance

### EDS Compatibility Testing
- **Proper block structure validation**
- **EDS environment replication**
- **Component isolation testing**
- **Performance monitoring**

### Development Scripts
```bash
npm run lint          # ESLint with automatic fixes
npm run lint:md       # Markdown linting
npm run hint          # Webhint analysis
npm run security      # Security audit
npm run validate      # Complete quality check
```

## 📚 Comprehensive Documentation

### Developer Resources
- **[Development Server Guide](docs/server-README.md)** - Complete server documentation
- **[Shoelace Card Implementation](shoelace-card-blog.md)** - Advanced component guide
- **[AI Assistant Guidelines](docs/for-ai/)** - Development standards and patterns

### Component Documentation
- **[Counter Component](blocks/counter/README.md)** - Basic interactive component
- **[Shoelace Integration](blocks/shoelace/README.md)** - Design system integration
- **[Shoelace Card](blocks/shoelace-card/README.md)** - Advanced card component

## 🎯 Design Principles

### Technical Excellence
- **Modern JavaScript (ES modules)** without TypeScript complexity
- **Pure CSS** without preprocessors
- **Zero heavy frameworks** - focus on web standards
- **Performance first** - optimized for Core Web Vitals
- **Security hardened** - CSP compliant implementations

### Development Quality
- **Comprehensive testing** for functionality and accessibility
- **Error boundaries** with graceful fallbacks
- **Clean architecture** with configuration-driven design
- **Standalone capabilities** with exported decorate functions
- **Build tool integration** without warnings or conflicts

### User Experience
- **Visual excellence** with premium glassmorphism effects
- **Smooth interactions** with sophisticated animation systems
- **Responsive design** optimized for all devices
- **Accessibility first** with comprehensive ARIA support

## 🔧 Advanced Features

### Component Build System
```bash
# Vite-based standalone development
cd build/shoelace-card && npm run dev

# Build and deploy to blocks directory
cd build/shoelace-card && npm run deploy
```

### Development Server Features
- **Automatic proxy fallback** to remote assets
- **EDS structure validation** and error reporting
- **Hot reload support** for rapid development
- **Comprehensive logging** for debugging
- **CORS support** for cross-origin development

### NPX Command Workflows
```bash
# Development server
npm run debug

# Component builds
cd build/shoelace-card && npm run deploy

# Quality assurance
npm run validate

# Security auditing
npm run security
```

## 📋 Prerequisites

- **Node.js 18+** (for built-in fetch and ES modules)
- **Modern Browser** with ES module support
- **Adobe Edge Delivery Services** project setup
- **Understanding of EDS block architecture**

## 🚀 Performance Standards

- **Lighthouse Performance Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Zero external dependencies** for core functionality

## 🤝 Contributing

We welcome contributions that align with our principles of simplicity, performance, and modern web standards.

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-component`
3. Follow our development guidelines
4. Test with both standalone and EDS environments
5. Submit a pull request with comprehensive documentation

### Development Guidelines
- Use vanilla JavaScript (ES6+) only
- Maintain EDS block structure compatibility
- Include comprehensive documentation
- Ensure accessibility compliance
- Follow performance standards
- Add proper testing

## 📚 Additional Resources

- **[Contributing Guidelines](CONTRIBUTING.md)** - Detailed contribution process
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Community guidelines
- **[Security Policy](SECURITY.md)** - Security reporting and policies
- **[Original Blog Post](https://allabout.network/blogs/ddt/integrations/using-web-components-in-adobe-edge-delivery-services-blocks)** - Implementation background

## 🔒 Security & Compliance

- **CSP compliant** implementations
- **Security audit** integration with npm audit
- **Vulnerability reporting** through GitHub Security Advisories
- **Safe defaults** with no directory traversal risks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tom Cranstoun**
- Email: tom.cranstoun@gmail.com
- GitHub: [@ddttom](https://github.com/ddttom)
- Blog: [Using Web Components in Adobe Edge Delivery Services](https://allabout.network/blogs/ddt/integrations/using-web-components-in-adobe-edge-delivery-services-blocks)

## 🙏 Acknowledgments

- Adobe Edge Delivery Services team for the excellent platform
- Shoelace Design System for outstanding web components
- The web components community for inspiration and best practices
- AI assistant developers who benefit from our comprehensive documentation

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ddttom/webcomponents-with-eds/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ddttom/webcomponents-with-eds/discussions)
- **Documentation**: [Comprehensive Docs](docs/)
- **Email**: tom.cranstoun@gmail.com

---

**Ready to build sophisticated EDS components?** This framework provides everything you need - from basic components to advanced glassmorphism effects, complete with development infrastructure, build automation, and comprehensive testing capabilities. Start with our development server and explore the advanced Shoelace Card component to see the full potential of modern EDS development.
