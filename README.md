# Web Components with Adobe Edge Delivery Services

A collection of lightweight, high-performance web components built with vanilla JavaScript and modern ES modules for Adobe Edge Delivery Services (EDS). This project provides reusable blocks that can be easily integrated into any AEM EDS project.

## 🚀 Quick Start

**Deployment is straightforward** - simply copy the contents of the `blocks/` folder to your own AEM EDS blocks folder.

```bash
# Clone the repository
git clone https://github.com/ddttom/webcomponents-with-eds.git
cd webcomponents-with-eds

# Copy blocks to your EDS project
cp -r blocks/* /path/to/your/eds-project/blocks/
```

## 📋 Prerequisites

- **Node.js** (v18.0.0 or higher) - for development tools and linting
- **Modern Browser** - Chrome, Firefox, Safari, or Edge
- **AEM Edge Delivery Services** project setup
- Basic understanding of ES6+ JavaScript and CSS

## 🏗️ Project Structure

```
webcomponents-with-eds/
├── blocks/                     # EDS blocks (web components)
│   ├── counter/               # Interactive counter component
│   │   ├── counter.js         # Component logic
│   │   ├── counter.css        # Component styles
│   │   ├── example.md         # Usage example
│   │   └── README.md          # Component documentation
│   └── shoelace/              # Shoelace web components integration
│       ├── shoelace.js        # Integration logic
│       ├── shoelace.css       # Custom styles
│       └── README.md          # Integration documentation
├── .github/                   # GitHub templates and workflows
├── package.json               # Project configuration
├── CONTRIBUTING.md            # Contribution guidelines
├── CODE_OF_CONDUCT.md         # Community guidelines
├── SECURITY.md                # Security policy
└── README.md                  # This file
```

## 🧩 Available Components

### Counter Component
An interactive counter with increment/decrement functionality, demonstrating state management and event handling in vanilla JavaScript.

**Features:**
- Vanilla JavaScript implementation
- Accessible keyboard navigation
- Customizable styling
- Event-driven architecture

### Shoelace Integration
Integration layer for Shoelace web components, providing a bridge between EDS and the Shoelace design system.

**Features:**
- Progressive enhancement
- Custom styling support
- Performance optimized loading
- EDS-compatible implementation

## 🛠️ Development

### Installation

```bash
# Install development dependencies
npm install
```

### Development Scripts

```bash
# Lint JavaScript files
npm run lint

# Check linting without fixing
npm run lint:check

# Lint Markdown files
npm run lint:md

# Run webhint analysis
npm run hint

# Security audit
npm run security

# Validate all code quality checks
npm run validate

# Start local development server
npm run serve
```

### Local Development

Since this is a vanilla JavaScript project, you can:

1. **Direct file access**: Open HTML files directly in your browser
2. **Local server**: Use `npm run serve` to start a local HTTP server on port 3000
3. **EDS integration**: Copy blocks to your EDS project for testing

## 📦 Deployment

### To AEM Edge Delivery Services

1. **Copy blocks**: Copy the entire `blocks/` directory to your EDS project
2. **Update references**: Ensure any custom configurations match your project structure
3. **Test integration**: Verify components work within your EDS environment

### Example Integration

```bash
# In your EDS project root
cp -r /path/to/webcomponents-with-eds/blocks/* ./blocks/

# Or copy specific components
cp -r /path/to/webcomponents-with-eds/blocks/counter ./blocks/
```

## 🎯 Design Principles

This project maintains focus on:

- **Simplicity**: No TypeScript, no preprocessors, no heavy frameworks
- **Performance**: Lightweight, fast-loading components
- **Modern Standards**: ES modules, modern JavaScript features
- **Accessibility**: WCAG compliant implementations
- **Security**: Secure coding practices and CSP compliance
- **Maintainability**: Clear code organization and comprehensive documentation

## 🔧 Technical Requirements

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### JavaScript Features Used
- ES Modules (`import`/`export`)
- Modern DOM APIs
- Fetch API
- CSS Custom Properties
- Intersection Observer API

### Performance Standards
- Lighthouse Performance Score: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## 🤝 Contributing

We welcome contributions that align with our core principles! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-component`
3. Make your changes following our coding standards
4. Test thoroughly across browsers and devices
5. Submit a pull request with a clear description

### Development Guidelines

- Use vanilla JavaScript (ES6+) only
- Follow existing code patterns and naming conventions
- Include comprehensive documentation
- Ensure accessibility compliance
- Maintain performance standards
- Add tests where applicable

## 📚 Documentation

- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [Component Documentation](blocks/)

## 🔒 Security

Security is a priority. Please review our [Security Policy](SECURITY.md) and report vulnerabilities responsibly.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tom Cranstoun**
- Email: tom.cranstoun@gmail.com
- GitHub: [@ddttom](https://github.com/ddttom)

## 🙏 Acknowledgments

- Adobe Edge Delivery Services team for the excellent platform
- The web components community for inspiration and best practices
- Contributors who help improve this project

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ddttom/webcomponents-with-eds/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ddttom/webcomponents-with-eds/discussions)
- **Email**: tom.cranstoun@gmail.com

---

**Ready to enhance your EDS project with modern web components?** Start by copying the blocks you need and integrating them into your project. The components are designed to work seamlessly with Adobe Edge Delivery Services while maintaining excellent performance and accessibility standards.
