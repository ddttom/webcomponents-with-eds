# EDS Development Server Guide

*Related: [EDS Overview](eds.md) | [Debug Guide](debug.md) | [EDS Architecture and Testing Guide](eds-architecture-and-testing-guide.md)*

## Overview

This guide covers the development server setup and configuration for EDS (Edge Delivery Services) block development and testing. The server provides a local development environment with proxy capabilities for seamless integration with external EDS resources.

*See also: [EDS Native Testing Standards](eds-native-testing-standards.md) for testing approaches | [Design Philosophy Guide](design-philosophy-guide.md) for minimal tooling principles*

## Quick Start

### Starting the Development Server

```bash
# Standard development server
node server.js

# Alternative using npm script
npm run debug
```

The server will start on `http://localhost:3000` by default.

### Server Configuration

The development server uses the following configuration:

- **Port**: 3000 (configurable via PORT environment variable)
- **Proxy Target**: `https://allabout.network` (configurable via PROXY_HOST)
- **Local Files**: Served from project root directory
- **Fallback**: Missing files proxied to external server

## Server Architecture

### Local-First, Proxy-Fallback Pattern

The development server implements a sophisticated local-first architecture:

1. **Local File Priority**: Files in the project directory are served first
2. **Proxy Fallback**: Missing files are automatically proxied from external server
3. **MIME Type Handling**: Proper content types for all file formats
4. **Error Handling**: Graceful degradation when resources are unavailable

*See also: [Raw EDS Blocks Guide](raw-eds-blocks-guide.md) for simple components | [Complex EDS Blocks Guide](complex-eds-blocks-guide.md) for advanced components*

### File Serving Logic

```javascript
// Simplified server logic
if (localFileExists(requestPath)) {
  serveLocalFile(requestPath);
} else {
  proxyToExternalServer(requestPath);
}
```

This pattern enables:
- **Rapid Development**: Edit local files and see changes immediately
- **External Resource Access**: Seamless integration with remote EDS assets
- **Flexible Testing**: Test components with both local and remote dependencies

## Development Workflow

### Standard Development Process

1. **Start Server**: `node server.js`
2. **Edit Files**: Modify blocks, styles, or scripts locally
3. **Test Changes**: Refresh browser to see updates
4. **Debug Issues**: Use browser dev tools and server logs

### File Organization

The server serves files from the project root with this structure:

```
/
├── blocks/                  # EDS blocks (components)
├── styles/                  # Global styles and fonts
├── scripts/                 # Core EDS scripts
├── docs/                    # Documentation
├── server.js               # Development server
└── *.html                  # Test pages
```

### Testing Workflow

**Important**: The EDS development server uses `test.html` files, not `index.html`. This is an intentional architectural decision, not an inconsistency.

```bash
# Access test files at:
http://localhost:3000/blocks/[component]/test.html

# Example:
http://localhost:3000/blocks/floating-alert/test.html
```

## Server Features

### Automatic MIME Type Detection

The server automatically sets correct MIME types for:

- **JavaScript**: `text/javascript`
- **CSS**: `text/css`
- **HTML**: `text/html`
- **Images**: `image/jpeg`, `image/png`, `image/webp`, etc.
- **Fonts**: `font/woff2`, `font/woff`, etc.
- **JSON**: `application/json`

### Proxy Configuration

The server proxies missing files to `https://allabout.network` by default. This can be configured:

```bash
# Set custom proxy target
PROXY_HOST=https://your-eds-site.com node server.js

# Set custom port
PORT=8080 node server.js
```

### CORS Support

The server includes CORS headers for cross-origin requests:

```javascript
'Access-Control-Allow-Origin': '*'
'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
'Access-Control-Allow-Headers': 'Content-Type, Authorization'
```

## Debugging and Troubleshooting

### Server Logs

The server provides detailed logging:

```
🚀 Server running at http://localhost:3000
📁 Serving files from: /path/to/project
🔗 Proxying missing files to: https://allabout.network
📄 Main page: http://localhost:3000/server.html
```

### Common Issues

**File Not Found (404)**
- Check file path and spelling
- Verify file exists in project directory
- Check proxy server availability

**MIME Type Issues**
- Server automatically detects most types
- Add custom MIME types if needed
- Check browser console for warnings

**Proxy Failures**
- Verify internet connection
- Check proxy target server status
- Review server logs for error details

### Performance Monitoring

The server logs resource loading:

```
📄 Serving local: /styles/styles.css
🔗 Proxying: /blocks/header/header.js (5,677 characters)
❌ Failed proxy: /fonts/missing-font.woff2 (404)
```

## Advanced Configuration

### Custom Server Setup

For advanced use cases, you can modify `server.js`:

```javascript
// Custom configuration
const config = {
  port: process.env.PORT || 3000,
  proxyHost: process.env.PROXY_HOST || 'https://allabout.network',
  staticDir: process.cwd(),
  enableLogging: true
};
```

### Environment Variables

Supported environment variables:

- `PORT`: Server port (default: 3000)
- `PROXY_HOST`: Proxy target URL
- `NODE_ENV`: Environment mode (development/production)

### SSL/HTTPS Support

For HTTPS development:

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Modify server.js to use HTTPS
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(3000);
```

## Integration with EDS

### Block Development

The server integrates seamlessly with EDS block development:

1. **CSS Loading**: EDS automatically loads block CSS files
2. **JavaScript Modules**: ES modules work without build processes
3. **Asset Proxying**: External assets load transparently
4. **Hot Reload**: Changes appear immediately on refresh

### Testing Integration

The server supports comprehensive testing:

- **Unit Tests**: Individual block testing
- **Integration Tests**: Multi-block scenarios
- **Performance Tests**: Load time and memory usage
- **Accessibility Tests**: WCAG compliance validation

## Best Practices

### Development Workflow

1. **Start Clean**: Always start server fresh for testing
2. **Check Logs**: Monitor server output for issues
3. **Test Incrementally**: Test changes frequently
4. **Use Browser DevTools**: Leverage debugging capabilities
5. **Validate Structure**: Ensure proper EDS block structure

### Performance Optimization

1. **Minimize Proxy Requests**: Keep frequently used files local
2. **Optimize Images**: Use appropriate formats and sizes
3. **Cache Static Assets**: Leverage browser caching
4. **Monitor Network**: Watch for unnecessary requests

### Security Considerations

1. **Development Only**: Never use in production
2. **Local Network**: Restrict access to development network
3. **Sensitive Data**: Avoid committing credentials
4. **HTTPS**: Use HTTPS for sensitive development

---

## See Also

### Core Development & Testing
- **[EDS Overview](eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[Debug Guide](debug.md)** - Complete debugging policy and approval requirements for development troubleshooting
- **[EDS Architecture and Testing Guide](eds-architecture-and-testing-guide.md)** - Advanced testing workflows and file replacement strategies
- **[EDS Native Testing Standards](eds-native-testing-standards.md)** - Testing standards specifically for EDS-native pattern components

### Block Development & Architecture
- **[Raw EDS Blocks Guide](raw-eds-blocks-guide.md)** - Step-by-step guide for creating simple EDS blocks using vanilla JavaScript
- **[Complex EDS Blocks Guide](complex-eds-blocks-guide.md)** - Advanced block development with build tools and external dependencies
- **[Block Architecture Standards](block-architecture-standards.md)** - Comprehensive standards for EDS block development and architectural patterns
- **[EDS Architecture Standards](eds-architecture-standards.md)** - Architectural patterns and standards for EDS-native block development

### Development Philosophy & Patterns
- **[Design Philosophy Guide](design-philosophy-guide.md)** - Understanding the philosophical principles behind EDS architecture decisions
- **[Build Blocks Clarification](build-blocks-clarification.md)** - Understanding the dual-directory architecture and development workflows
- **[Build Component Template](build-component-template.md)** - Template for advanced build components with external dependencies
- **[JavaScript Patterns](javascript-patterns.md)** - Reusable JavaScript patterns for EDS block development

### Advanced Topics & Tools
- **[Instrumentation Guide](instrumentation-how-it-works.md)** - Advanced instrumentation techniques and performance monitoring
- **[Investigation](investigation.md)** - Advanced investigation techniques and analysis methods
- **[Performance Optimization](performance-optimization.md)** - Techniques for optimizing EDS block performance and loading
- **[Browser Compatibility](browser-compatibility.md)** - Ensuring cross-browser compatibility for EDS implementations

### Reference & Documentation
- **[EDS Appendix](eds-appendix.md)** - Comprehensive development reference guide with patterns and best practices
- **[Error Handling Patterns](error-handling-patterns.md)** - Comprehensive error handling strategies for EDS blocks
- **[Project Structure](project-structure.md)** - Understanding the overall EDS project organization and file conventions
- **[Build Tools Configuration](build-tools-configuration.md)** - Advanced build tool setup and configuration

## Next Steps

### For Frontend Developers & Component Authors
1. **Master the development workflow** using the local-first, proxy-fallback server architecture for efficient EDS block development
2. **Learn the file organization patterns** and understand how the server serves local files while proxying external resources
3. **Implement proper testing procedures** using the server's test.html file convention and debugging capabilities
4. **Optimize development efficiency** by leveraging the server's automatic MIME type detection and hot reload capabilities
5. **Create comprehensive test scenarios** that work with both local and proxied resources

### For DevOps & Build Engineers
1. **Understand the server architecture** and how it supports both simple and complex EDS development workflows
2. **Configure development environments** that leverage the proxy capabilities for seamless integration with external EDS resources
3. **Set up automated testing pipelines** that can use the development server for comprehensive component validation
4. **Implement monitoring and logging** that captures the server's resource loading patterns and performance metrics
5. **Create deployment procedures** that transition from development server testing to production EDS environments

### For QA Engineers & Test Specialists
1. **Learn the testing workflow** using the development server's test.html convention and proxy capabilities
2. **Understand the debugging features** including server logs, CORS support, and error handling for comprehensive testing
3. **Create test scenarios** that validate both local component functionality and external resource integration
4. **Implement performance testing** that leverages the server's monitoring capabilities to track resource loading
5. **Establish testing standards** that ensure components work correctly in both development and production environments

### For Team Leads & Project Managers
1. **Understand the development workflow** and how the server architecture supports efficient EDS block development
2. **Plan development timelines** that account for the server setup, testing procedures, and debugging workflows
3. **Establish development standards** that leverage the server's capabilities for consistent team productivity
4. **Monitor development velocity** and track how the server architecture impacts team efficiency and delivery timelines
5. **Create governance processes** for server configuration, proxy settings, and development environment management

### For System Administrators & Infrastructure Teams
1. **Understand the server requirements** including Node.js dependencies, port configuration, and proxy setup
2. **Configure development infrastructure** that supports the local-first, proxy-fallback architecture across team environments
3. **Set up monitoring** for development server performance, proxy availability, and resource loading patterns
4. **Implement security policies** for development server access, proxy configuration, and local file serving
5. **Create maintenance procedures** for server updates, proxy configuration changes, and development environment consistency

### For Security & Compliance Teams
1. **Review the server architecture** to ensure it meets security requirements for development environments
2. **Assess the proxy configuration** and ensure external resource access complies with organizational security policies
3. **Establish approval processes** for proxy targets, development server access, and local file serving policies
4. **Monitor security implications** of the CORS configuration and cross-origin resource access
5. **Create security guidelines** for development server usage, proxy configuration, and local development practices

### For AI Assistants & Automation
1. **Master the development server setup** and understand how to configure and use it for EDS block development and testing
2. **Learn the proxy architecture** and how it enables seamless integration between local development and external EDS resources
3. **Understand the testing workflow** including the test.html convention and debugging capabilities for comprehensive component validation
4. **Implement automated workflows** that can leverage the development server for testing, validation, and development assistance
5. **Create comprehensive documentation** that helps users understand and effectively use the development server for EDS projects