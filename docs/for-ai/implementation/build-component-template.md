# [Component Name] - Advanced Build Component

*Related: [Complex EDS Blocks Guide](complex-eds-blocks-guide.md) | [Build Blocks Clarification](build-blocks-clarification.md) | [Block Architecture Standards](block-architecture-standards.md)*

> **⚙️ Build Component Notice**: This component uses a build process and external dependencies, which differs from the core EDS philosophy of simple JavaScript. Build components are designed for complex functionality that requires sophisticated tooling while maintaining EDS compatibility.

*See also: [Design Philosophy Guide](design-philosophy-guide.md) for EDS principles | [Server README](../../../Server-README.md) for development setup*

## Development Workflow

### Local Development
```bash
cd build/[component-name]
npm install
npm run dev  # Start development server with hot reload
```

### Build and Deploy
```bash
cd build/[component-name]
npm run build    # Build component with dependencies
npm run deploy   # Deploy to blocks/ directory
```

## Architecture

This build component follows the **External-Library-Enhanced Pattern** for complex components that require:

- Build processes and bundling
- External dependencies and libraries
- Advanced tooling and development workflows
- Sophisticated functionality beyond simple EDS blocks

## File Structure

```
/build/[component-name]/
├── [component-name].js      # Source implementation
├── [component-name].css     # Source styles
├── [component-name]-stub.css # Stub CSS for deployment
├── index.html               # Development test file
├── package.json             # Dependencies and build scripts
├── vite.config.js          # Build configuration
├── deploy.js               # Deployment script
├── DEV-README.md           # Development documentation
├── USER-README.md          # User documentation
└── dist/                   # Build output directory
    └── [component-name].js # Bundled implementation
```

## Deployment Process

The build and deployment process:

1. **Development**: Work in `/build/[component-name]/` with modern tooling
2. **Build**: `npm run build` bundles all dependencies using Vite
3. **Deploy**: `npm run deploy` copies built files to `/blocks/[component-name]/`
4. **Integration**: Copy from `/blocks/` to your EDS project

## EDS Integration

After deployment, the component is available in `/blocks/[component-name]/` with:

- **Bundled JavaScript**: Self-contained component with all dependencies
- **Stub CSS**: Minimal CSS file (styles bundled in JS)
- **Documentation**: User-facing README and examples
- **Test Files**: EDS-compatible test files

## Development vs Production

- **Development**: `/build/[component-name]/` - Source files with build tooling
- **Production**: `/blocks/[component-name]/` - Built, bundled, EDS-ready files

This separation allows for sophisticated development workflows while maintaining EDS compatibility and performance standards.

---

## See Also

### Core Development & Architecture
- **[Complex EDS Blocks Guide](complex-eds-blocks-guide.md)** - Comprehensive guide for advanced block development with build tools and external dependencies
- **[Build Blocks Clarification](build-blocks-clarification.md)** - Understanding the dual-directory architecture and development workflows
- **[Block Architecture Standards](block-architecture-standards.md)** - Comprehensive standards for EDS block development and architectural patterns
- **[Design Philosophy Guide](design-philosophy-guide.md)** - Understanding the philosophical principles behind EDS architecture decisions

### Development Environment & Tools
- **[Server README](../../../Server-README.md)** - Development server setup and configuration for EDS block development and testing
- **[EDS Overview](../eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[EDS Architecture Standards](eds-architecture-standards.md)** - Architectural patterns and standards for EDS-native block development
- **[Raw EDS Blocks Guide](raw-eds-blocks-guide.md)** - Step-by-step guide for creating simple EDS blocks as an alternative approach

### Testing & Quality Assurance
- **[EDS Native Testing Standards](../testing/eds-native-testing-standards.md)** - Testing standards specifically for EDS-native pattern components
- **[EDS Architecture and Testing Guide](../testing/eds-architecture-and-testing-guide.md)** - Advanced testing workflows and file replacement strategies
- **[Debug Guide](../testing/debug.md)** - Complete debugging policy and approval requirements for development troubleshooting
- **[Instrumentation Guide](../testing/instrumentation-how-it-works.md)** - Advanced instrumentation techniques and performance monitoring

### Advanced Topics & Patterns
- **[Investigation](../testing/investigation.md)** - Advanced investigation techniques and analysis methods for complex components
- **[JavaScript Patterns](javascript-patterns.md)** - Reusable JavaScript patterns for EDS block development
- **[Error Handling Patterns](error-handling-patterns.md)** - Comprehensive error handling strategies for build components
- **[Performance Optimization](performance-optimization.md)** - Techniques for optimizing build component performance and loading

## Next Steps

### For Frontend Developers & Component Authors
1. **Master the build workflow** by understanding the development-to-production pipeline and how it differs from simple EDS blocks
2. **Learn the dual-directory architecture** and when to choose build components over simple blocks for complex functionality
3. **Set up efficient development environments** using the provided build tools and hot reload capabilities
4. **Implement proper testing strategies** that work with both development and production versions of build components
5. **Create comprehensive documentation** for both development workflows and end-user integration

### For DevOps & Build Engineers
1. **Understand the build and deployment process** including bundling, dependency management, and EDS integration
2. **Set up CI/CD pipelines** that can handle the build-to-blocks deployment workflow for automated component delivery
3. **Configure development infrastructure** that supports both simple and complex component development patterns
4. **Implement monitoring and validation** for build processes and ensure consistent deployment to blocks directories
5. **Create backup and recovery procedures** for build artifacts and deployment processes

### for Team Leads & Project Managers
1. **Understand the complexity trade-offs** between simple EDS blocks and build components for project planning
2. **Plan development timelines** that account for build processes, testing, and deployment workflows
3. **Establish component architecture guidelines** that help teams choose between simple and complex development approaches
4. **Monitor development velocity** and track how build components impact team productivity and delivery timelines
5. **Create governance processes** for approving complex components that require build processes

### For QA Engineers & Test Specialists
1. **Learn the testing requirements** for build components including both development and production testing scenarios
2. **Understand the deployment pipeline** and how to validate components at each stage of the build-to-blocks process
3. **Create comprehensive test suites** that cover both bundled and unbundled versions of components
4. **Implement automated testing** that can validate build components in EDS environments
5. **Establish quality gates** that ensure build components meet performance and compatibility standards

### For System Administrators & Infrastructure Teams
1. **Understand the build tool requirements** including Node.js, npm, and build dependencies for development environments
2. **Configure build infrastructure** that supports the development-to-production workflow for complex components
3. **Set up monitoring** for build processes, deployment pipelines, and component performance in production
4. **Implement security policies** for build dependencies, external libraries, and deployment processes
5. **Create maintenance procedures** for build tools, dependencies, and deployment infrastructure

### For Security & Compliance Teams
1. **Review the build process security** including dependency scanning, vulnerability assessment, and supply chain security
2. **Assess external dependencies** and ensure they meet organizational security and compliance requirements
3. **Establish approval processes** for complex components that introduce external dependencies and build processes
4. **Monitor build artifacts** and ensure they meet security standards before deployment to production environments
5. **Create security guidelines** for teams developing build components with external libraries and dependencies

### For AI Assistants & Automation
1. **Master the build component template** and understand how to create complex components that require sophisticated tooling
2. **Learn the development workflow** including build processes, dependency management, and deployment procedures
3. **Understand the architecture decisions** that determine when to use build components vs simple EDS blocks
4. **Implement automated workflows** that can assist with build component development, testing, and deployment
5. **Create comprehensive documentation** that helps users understand build component development and integration