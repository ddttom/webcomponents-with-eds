# EDS Application Technology Stack Document

*Related: [EDS Overview](../eds.md) | [Frontend Guidelines](frontend-guidelines.md) | [Backend Structure](backend-structure.md)*

## Stack Overview

This document outlines the technology stack for Edge Delivery Services (EDS) applications, using a deliberately minimal approach focused on web standards, performance, and maintainability. This approach reduces complexity while maximising reliability and development speed.

*See also: [Design Philosophy Guide](../design-philosophy-guide.md) for EDS principles | [Block Architecture Standards](../block-architecture-standards.md) for development standards*</search>

**Core Philosophy**: Simple JavaScript with limited dependencies, prioritising native web technologies over frameworks.

## Frontend Technologies

### Core Languages

**JavaScript (ES2020+)**
- Pure JavaScript without TypeScript
- ES modules for code organisation
- Async/await for asynchronous operations
- Native DOM manipulation

*Rationale*: Eliminates build complexity while maintaining modern development practices.

**CSS3**
- Custom properties for theming
- CSS Grid and Flexbox for layouts
- Media queries for responsive design
- No preprocessors (Sass, Less)

*Rationale*: Direct CSS provides clear debugging and eliminates build steps.

**HTML5**
- Semantic markup standards
- Progressive enhancement approach
- Accessibility-first structure
- Valid HTML5 standards compliance

### JavaScript Frameworks and Libraries

**None - Vanilla JavaScript**
- No React, Vue, or Angular
- No UI component libraries
- Custom DOM helper utilities
- Event-driven architecture

*Rationale*: Reduces bundle size, eliminates framework dependencies, and simplifies debugging.

### Build Tools

**Minimal Build Process**
- ESLint for code quality
- Stylelint for CSS standards
- No bundlers (Webpack, Vite, Rollup)
- No transpilers (Babel, TypeScript)

*Configuration*:
```json
{
  "scripts": {
    "lint": "eslint . && stylelint '**/*.css'",
    "lint:js": "eslint .",
    "lint:css": "stylelint '**/*.css'",
    "dev": "node server.js"
  }
}
```

### Development Tools

**Local Development Server**
- Custom Node.js server
- Zero external dependencies
- Local-first with proxy fallback
- Automatic MIME type detection

*Key Features*:
- Serves local files first
- Proxies missing assets from production
- CORS headers for cross-origin requests
- Comprehensive error logging

**Code Quality Tools**
- ESLint with Airbnb base configuration
- Stylelint with standard configuration
- JSDoc for function documentation
- Git hooks for pre-commit validation

## Backend Architecture

### Adobe Edge Delivery Services

**Core Platform**
- Adobe Helix/Franklin architecture
- Static site generation from Google Docs
- CDN-first content delivery
- Automatic performance optimisation

**Content Processing**
- Google Docs as content source
- Automatic HTML generation
- Image optimisation pipeline
- Search index generation

### Server Infrastructure

**Hosting Platform**
- Adobe Edge Delivery Services
- Global CDN distribution
- Automatic scaling
- Performance monitoring

**Domain Management**
- Custom domain configuration
- SSL certificate management
- DNS configuration
- Traffic routing

### APIs and Services

**Google Workspace Integration**
- Google Docs API for content retrieval
- Google Drive API for file management
- Google Sheets API for data sources
- Real-time collaboration features

**Adobe Services**
- Edge Delivery Services for hosting
- Adobe Analytics for tracking
- Adobe Target for personalisation
- Adobe Experience Manager integration

## Database Solutions

### Content Storage

**Google Drive**
- Primary content storage
- Version control through Google Drive history
- Collaborative editing capabilities
- Automatic backup and synchronisation

**Static File Generation**
- HTML files generated from Google Docs
- JSON files for dynamic content queries
- Optimised images and media assets
- Search indices and metadata

### Data Management

**Query Index System**
- Automatically generated from published content
- JSON format for JavaScript consumption
- Filtered by content type and metadata
- Updated on content publication

*Structure*:
```json
{
  "total": 150,
  "offset": 0,
  "limit": 500,
  "data": [
    {
      "path": "/blog/article-title",
      "title": "Article Title",
      "description": "Article description",
      "lastModified": "2024-01-15"
    }
  ]
}
```

**No Traditional Database**
- No SQL databases required
- No NoSQL databases needed
- File-based data storage
- Git-based version control

## Services and Integrations

### Content Management

**Google Workspace**
- Google Docs for content authoring
- Google Drive for file storage
- Google Sheets for data management
- Google Analytics for tracking

**Adobe Ecosystem**
- Edge Delivery Services for hosting
- Adobe Analytics for advanced metrics
- Adobe Target for personalisation
- Adobe Experience Manager integration

### Development Services

**Version Control**
- GitHub for code repository
- Git-based workflow
- Pull request reviews
- Automated testing

**Monitoring and Analytics**
- Core Web Vitals monitoring
- Error tracking and logging
- Performance metrics collection
- User behaviour analysis

### Third-Party Services

**Performance Monitoring**
- Real User Monitoring (RUM)
- Synthetic testing
- Core Web Vitals tracking
- Performance budgets

**Security Services**
- SSL certificate management
- Content Security Policy
- DDoS protection
- Security headers configuration

## Development Environment

### Local Development Setup

**Requirements**
- Node.js 18+ (for built-in fetch support)
- Git for version control
- Modern web browser for testing
- Text editor with ESLint support

**Setup Process**
```bash
# Clone repository
git clone https://github.com/your-org/your-eds-app.git
cd your-eds-app

# Install dependencies
npm install

# Start development server
npm run dev

# Access local environment
open http://localhost:3000
```

### Development Server Architecture

**Core Components**
```javascript
// server.js structure
import { createServer } from 'http';
import { readFile, access } from 'fs/promises';
import { join, extname } from 'path';

const server = createServer(async (req, res) => {
  // Local file serving with proxy fallback
  const filePath = join(process.cwd(), req.url);
  const served = await serveLocalFile(filePath, res);
  
  if (!served) {
    await proxyToRemote(req, res);
  }
});
```

**Key Features**
- Zero external dependencies
- Automatic MIME type detection
- Comprehensive error handling
- Request logging for debugging

## EDS-Specific Architecture

### Block System

**Block Structure**
```
blocks/
├── block-name/
│   ├── block-name.js
│   ├── block-name.css
│   └── README.md
```

**Block Implementation**
```javascript
// block-name.js
export default function decorate(block) {
  // Block functionality
  const content = block.querySelector('div');
  content.classList.add('block-name-content');
  
  // Add interactive features
  setupEventListeners(block);
  processContent(block);
}
```

### Content Processing

**Document Structure Recognition**
- Table-based block definition
- Block name and configuration parsing
- Content extraction and processing
- Metadata and SEO handling

**Automatic Optimisation**
- Image compression and format conversion
- CSS minification and critical path
- JavaScript optimisation
- HTML semantic enhancement

## Deployment Pipeline

### Build Process

**No Build Required**
- Direct file serving
- No compilation steps
- No bundling process
- No asset optimisation needed

**Quality Assurance**
- ESLint validation
- Stylelint validation
- Unit test execution
- Performance testing

### Deployment Strategy

**Continuous Integration**
- GitHub Actions for automation
- Automated testing on pull requests
- Code quality checks
- Performance regression testing

**EDS Deployment Process**
1. Code review and approval
2. Merge to main branch
3. EDS automatic processing
4. Content generation and optimisation
5. CDN distribution and caching

## Performance Optimisation

### Asset Delivery

**Image Optimisation**
- Automatic WebP conversion
- Responsive image sizing
- Lazy loading implementation
- Progressive enhancement

**CSS Optimisation**
- Critical CSS inlining
- Non-blocking CSS loading
- CSS custom properties for theming
- Minimal CSS footprint

**JavaScript Optimisation**
- ES modules for tree shaking
- Async loading for non-critical scripts
- Progressive enhancement
- Minimal JavaScript footprint

### Caching Strategy

**Static Assets**
- Long-term caching with versioning
- CDN-based distribution
- Browser caching optimisation
- Cache invalidation strategies

**Dynamic Content**
- Short-term caching for dynamic data
- Edge-side includes for personalisation
- Cache warming strategies
- Intelligent cache invalidation

## Security Considerations

### Content Security

**Content Security Policy**
- Strict CSP headers
- Script source restrictions
- Style source limitations
- Image source controls

**HTTPS Enforcement**
- SSL/TLS encryption
- HTTP to HTTPS redirects
- Secure cookie configuration
- HSTS headers

### Code Security

**Dependency Management**
- Minimal external dependencies
- Regular security audits
- Automated vulnerability scanning
- Dependency version pinning

**Input Validation**
- Content sanitisation
- XSS prevention
- CSRF protection
- Input validation

## Monitoring and Maintenance

### Performance Monitoring

**Core Web Vitals**
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)

**Error Tracking**
- JavaScript error monitoring
- Network error tracking
- Performance regression detection
- User experience monitoring

### Maintenance Procedures

**Regular Updates**
- Dependency security updates
- Browser compatibility testing
- Performance optimisation reviews
- Code quality improvements

**Backup and Recovery**
- Google Drive automatic backup
- Git-based version control
- Disaster recovery procedures
- Data integrity verification

## Technology Decisions Rationale

### Why Vanilla JavaScript?

**Benefits**
- Eliminates framework dependencies
- Reduces bundle size significantly
- Simplifies debugging process
- Improves long-term maintainability

**Trade-offs**
- More manual DOM manipulation
- No component lifecycle management
- Requires more boilerplate code
- Less community ecosystem

### Why No Build Process?

**Benefits**
- Faster development iterations
- Eliminates build complexity
- Reduces deployment time
- Simplifies debugging

**Trade-offs**
- No automatic optimisations
- Manual asset management
- No code splitting
- Limited development tooling

### Why Adobe EDS?

**Benefits**
- Excellent performance out-of-the-box
- Minimal infrastructure management
- Integrated content management
- Automatic optimisations

**Trade-offs**
- Platform lock-in
- Limited customisation options
- Specific workflow requirements
- Learning curve for new concepts

## EDS Best Practices

### Content Authoring

**Document Structure**
- Use table-based block definitions
- Follow semantic HTML principles
- Implement proper heading hierarchy
- Include alt text for images

**Block Configuration**
- Use consistent naming conventions
- Document block variations
- Implement responsive design
- Follow accessibility guidelines

### Development Workflow

**Block Development**
- Create comprehensive documentation
- Implement error handling
- Test across devices and browsers
- Follow performance best practices

**Code Quality**
- Use ESLint and Stylelint
- Write meaningful comments
- Implement unit tests
- Follow naming conventions

## Future Considerations

### Scalability Planning

**Traffic Growth**
- CDN scaling capabilities
- Performance monitoring thresholds
- Resource allocation planning
- Capacity planning procedures

**Feature Expansion**
- New block development
- Third-party integrations
- Advanced functionality additions
- Mobile application considerations

### Technology Evolution

**Web Standards**
- New JavaScript features adoption
- CSS specification updates
- HTML5 evolution
- Browser API improvements

**EDS Platform Updates**
- Adobe EDS feature updates
- Google Workspace API changes
- Third-party service updates
- Security standard evolution

## Conclusion

This EDS application technology stack reflects a deliberate choice to prioritise simplicity, performance, and maintainability over complexity. This approach enables rapid development while maintaining high-quality user experiences within the Adobe Edge Delivery Services ecosystem.

By focusing on web standards and minimal dependencies, the stack provides a solid foundation for future growth while reducing technical debt and maintenance overhead. The integration with Adobe EDS ensures excellent performance and scalability out-of-the-box.

---

## See Also

### Core EDS Architecture & Development
- **[EDS Overview](../eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[Frontend Guidelines](frontend-guidelines.md)** - Coding standards and best practices for EDS frontend development
- **[Backend Structure](backend-structure.md)** - EDS backend architecture and serverless implementation patterns
- **[Design Philosophy Guide](../design-philosophy-guide.md)** - Understanding the philosophical principles behind EDS architecture

### Development Standards & Implementation
- **[Block Architecture Standards](../block-architecture-standards.md)** - Comprehensive standards for EDS block development
- **[Raw EDS Blocks Guide](../raw-eds-blocks-guide.md)** - Step-by-step guide for creating simple EDS blocks
- **[Complex EDS Blocks Guide](../complex-eds-blocks-guide.md)** - Advanced block development with build tools
- **[Server README](../../Server-README.md)** - Development server setup and configuration

### Quality Assurance & Security
- **[Security Checklist](security-checklist.md)** - Security best practices and compliance requirements
- **[EDS Native Testing Standards](../eds-native-testing-standards.md)** - Testing standards for EDS components
- **[Debug Guide](../debug.md)** - Complete debugging policy and approval requirements
- **[Performance Optimization](../performance-optimization.md)** - Techniques for optimizing EDS performance