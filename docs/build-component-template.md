# [Component Name] - Advanced Build Component

> **⚙️ Build Component Notice**: This component uses a build process and external dependencies, which differs from the core EDS philosophy of simple JavaScript. Build components are designed for complex functionality that requires sophisticated tooling while maintaining EDS compatibility.

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