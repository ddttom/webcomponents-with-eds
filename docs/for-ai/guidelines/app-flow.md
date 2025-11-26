# EDS Application Flow Document

*Related: [Backend Structure](backend-structure.md) | [Tech Stack](tech-stack.md) | [PRD](prd.md)*

## Overview

This document outlines the complete application flow for Edge Delivery Services (EDS) applications, detailing user journeys, conditional paths, and error handling across all system components. The application follows Adobe EDS architecture patterns with Google Docs as the primary content management interface.

*See also: [EDS Overview](../eds.md) for foundational concepts | [Server README](../../Server-README.md) for development workflows*</search>

## Core User Journeys

### Content Author Journey

**Initial Content Creation**

1. **Document Creation**
   - Author opens Google Docs
   - Creates new document with structured content
   - Applies block syntax using tables and formatting
   - Saves document to designated Google Drive folder

2. **Content Preview**
   - EDS automatically detects new document
   - Generates preview URL
   - Author reviews content rendering
   - Makes adjustments if needed

3. **Publication Process**
   - Author publishes document
   - EDS processes content and generates static pages
   - Updates query index for dynamic content
   - Deploys changes to production environment

**Content Updates**

1. **Document Editing**
   - Author opens existing Google Doc
   - Makes content modifications
   - EDS detects changes automatically
   - Preview updates in real-time

2. **Version Management**
   - Google Drive maintains version history
   - EDS tracks publication states
   - Rollback capabilities through document history
   - Change notifications to relevant team members

### Developer Journey

**Local Development**

1. **Environment Setup**
   - Clone repository from GitHub
   - Install minimal dependencies (`npm install`)
   - Start development server (`npm run dev`)
   - Access local environment at `http://localhost:3000`

2. **Block Development**
   - Create new block directory structure
   - Implement JavaScript functionality
   - Add CSS styling
   - Create test files for isolated testing

3. **Testing and Validation**
   - Test blocks in isolation using test files
   - Validate cross-browser compatibility
   - Run linting tools (`npm run lint`)
   - Verify performance metrics

**Deployment Process**

1. **Code Review**
   - Submit pull request through GitHub
   - Automated code quality checks
   - Team review and approval
   - Integration testing

2. **Production Deployment**
   - Merge to main branch
   - EDS automated deployment pipeline
   - Production environment updates
   - Monitoring and alerting activation

### End User Journey

**Page Loading Experience**

1. **Initial Request**
   - User navigates to website URL
   - CDN serves cached content if available
   - Critical CSS loaded first
   - JavaScript loads progressively

2. **Content Rendering**
   - HTML structure displays immediately
   - Images load with lazy loading
   - Interactive elements initialise
   - Performance metrics captured

3. **User Interaction**
   - Navigation between pages
   - Form submissions and interactions
   - Dynamic content loading
   - Search and filtering operations

## System Architecture Flow

### Content Processing Pipeline

**Google Docs to EDS Integration**

```
Google Docs → Drive API → EDS Parser → Static Generator → CDN
```

1. **Content Detection**
   - Google Drive webhooks monitor document changes
   - EDS identifies new or modified content
   - Queues processing tasks

2. **Content Transformation**
   - Parse Google Docs structure
   - Extract block configurations
   - Process images and media
   - Generate HTML markup

3. **Static Site Generation**
   - Create optimised HTML pages
   - Generate CSS bundles
   - Optimise JavaScript delivery
   - Update search indices

### Block System Flow

**Block Initialisation**

1. **Page Load**
   - HTML structure loads first
   - CSS applies styling
   - JavaScript initialises blocks sequentially

2. **Block Processing**
   - Identify block types on page
   - Load block-specific scripts
   - Process block configurations
   - Render dynamic content

3. **User Interactions**
   - Event handlers attach to elements
   - Form validation processes
   - AJAX requests for dynamic content
   - State management updates

### Development Server Flow

**Local Development Process**

1. **Request Handling**
   - Server receives HTTP request
   - Attempts to serve local files first
   - Falls back to proxy for missing assets
   - Returns appropriate MIME types

2. **File Processing**
   - Detect file changes automatically
   - Apply transformations if needed
   - Serve updated content
   - Log requests for debugging

3. **Error Handling**
   - Capture and log errors
   - Provide meaningful error messages
   - Maintain server stability
   - Enable rapid debugging

## Conditional Paths

### Content Publishing Conditions

**Document Validation**

- **Valid Structure**: Process normally → Generate pages → Deploy
- **Invalid Structure**: Show validation errors → Prevent publication → Notify author
- **Missing Assets**: Queue for processing → Retry with backoff → Notify if failed

**Publication States**

- **Draft**: Available in preview only
- **Published**: Live on production site
- **Archived**: Removed from navigation, accessible by direct URL
- **Deleted**: Removed from all systems

### User Experience Conditions

**Network Conditions**

- **Fast Connection**: Load all content immediately
- **Slow Connection**: Prioritise critical content → Progressive enhancement
- **Offline**: Show cached content → Indicate offline state

**Device Capabilities**

- **Modern Browser**: Full feature set available
- **Limited Browser**: Fallback experiences → Progressive enhancement
- **Mobile Device**: Responsive layout → Touch-optimised interactions

### Development Conditions

**Local Development**

- **File Exists Locally**: Serve from filesystem
- **File Missing**: Proxy to remote server
- **Network Error**: Show clear error message

**Production Deployment**

- **Tests Pass**: Deploy to production
- **Tests Fail**: Block deployment → Notify developers
- **Build Errors**: Rollback to previous version

## Error Handling

### Content Errors

**Document Processing Errors**

```javascript
try {
  const content = await processDocument(doc);
  return generatePage(content);
} catch (error) {
  logger.error('Document processing failed', { doc, error });
  return generateErrorPage('Content temporarily unavailable');
}
```

**Common Error Scenarios**

- **Invalid Block Syntax**: Show validation errors in preview
- **Missing Media**: Display placeholder → Retry loading
- **Malformed Tables**: Apply default formatting → Log warning

### System Errors

**Server Errors**

- **500 Internal Server Error**: Log details → Show generic error page
- **503 Service Unavailable**: Display maintenance message → Retry automatically
- **404 Not Found**: Show custom 404 page → Suggest alternatives

**Client Errors**

- **JavaScript Errors**: Log to console → Graceful degradation
- **Network Timeouts**: Show retry option → Cache partial content
- **Form Validation**: Display inline errors → Prevent submission

### Recovery Mechanisms

**Automatic Recovery**

- **Retry Logic**: Exponential backoff for failed requests
- **Fallback Content**: Cached versions when live content fails
- **Graceful Degradation**: Core functionality remains available

**Manual Recovery**

- **Error Reporting**: Clear error messages for users
- **Support Channels**: Contact information for critical issues
- **Documentation**: Troubleshooting guides for common problems

## Performance Considerations

### Loading Strategies

**Critical Path Optimisation**

1. **HTML**: Minimal structure loads first
2. **Critical CSS**: Above-the-fold styling
3. **JavaScript**: Progressive enhancement
4. **Images**: Lazy loading with placeholders

**Caching Strategy**

- **Static Assets**: Long-term caching with versioning
- **Dynamic Content**: Short-term caching with validation
- **API Responses**: Intelligent caching based on content type

### Monitoring and Alerts

**Performance Metrics**

- **Core Web Vitals**: Continuous monitoring
- **Error Rates**: Threshold-based alerting
- **User Experience**: Real user monitoring
- **System Health**: Infrastructure monitoring

**Alert Conditions**

- **High Error Rate**: Immediate notification
- **Performance Degradation**: Trending alerts
- **Security Issues**: Critical alerts
- **System Outages**: Immediate escalation

## Integration Points

### External Services

**Google Services**
- Google Docs API for content retrieval
- Google Drive API for file management
- Google Analytics for usage tracking

**Adobe Services**
- Edge Delivery Services for hosting
- Adobe Analytics for advanced metrics
- Adobe Target for personalisation

### Third-Party Integrations

**Development Tools**
- GitHub for version control
- ESLint for code quality
- Stylelint for CSS standards

**Monitoring Services**
- Performance monitoring tools
- Error tracking services
- Uptime monitoring systems

## EDS-Specific Workflows

### Content Authoring Flow

**Document Structure Processing**

1. **Table Recognition**
   - Identify block tables in Google Docs
   - Parse block names and configurations
   - Extract content and metadata

2. **Block Configuration**
   - Process block variations
   - Apply configuration options
   - Validate block structure

3. **Content Transformation**
   - Convert Google Docs formatting
   - Generate semantic HTML
   - Apply EDS conventions

### Development Workflow

**Block Development Cycle**

1. **Block Creation**
   - Generate block directory structure
   - Create JavaScript and CSS files
   - Implement block functionality

2. **Testing and Validation**
   - Test block in isolation
   - Validate EDS compatibility
   - Performance testing

3. **Integration**
   - Integrate with main application
   - Test cross-block interactions
   - Deployment verification

### Deployment Pipeline

**EDS Deployment Process**

1. **Code Integration**
   - Merge changes to main branch
   - Trigger automatic build process
   - Run automated tests

2. **Content Processing**
   - Process updated content
   - Generate static assets
   - Update search indices

3. **Distribution**
   - Deploy to global CDN
   - Update edge locations
   - Validate deployment

## Troubleshooting Flows

### Common Issues

**Content Not Appearing**

1. Check Google Doc permissions
2. Verify document structure
3. Review EDS processing logs
4. Validate block syntax

**Performance Issues**

1. Analyse Core Web Vitals
2. Review resource loading
3. Check CDN performance
4. Validate optimisation settings

**Development Issues**

1. Verify local server setup
2. Check proxy configuration
3. Review error logs
4. Validate development environment

### Debugging Process

**Systematic Debugging**

1. **Identify**: Define the problem scope
2. **Isolate**: Narrow down the cause
3. **Analyse**: Review logs and metrics
4. **Resolve**: Implement solution
5. **Verify**: Test fix effectiveness

## Conclusion

This application flow provides a comprehensive view of how EDS applications operate across all user types and system components. The design emphasises simplicity, performance, and reliability while maintaining flexibility for future enhancements.

Understanding these flows helps ensure consistent user experiences and enables effective troubleshooting when issues arise. Regular review and updates of these flows help maintain system quality as the application evolves within the EDS ecosystem.

---

## See Also

### Core EDS Architecture & Implementation
- **[Backend Structure](backend-structure.md)** - EDS backend architecture and serverless implementation patterns
- **[Tech Stack](tech-stack.md)** - Technology stack and development workflow considerations
- **[EDS Overview](../eds.md)** - Complete introduction to Edge Delivery Services architecture
- **[Server README](../../Server-README.md)** - Development server setup and local development workflows

### Development Guidelines & Standards
- **[Frontend Guidelines](frontend-guidelines.md)** - Frontend development standards and user experience patterns
- **[Block Architecture Standards](../block-architecture-standards.md)** - Block development and system integration patterns
- **[Debug Guide](../debug.md)** - Debugging workflows and troubleshooting procedures
- **[Security Checklist](security-checklist.md)** - Security considerations throughout application flows

### Project Management & Planning
- **[PRD](prd.md)** - Product requirements and project objectives that drive these application flows
- **[Design Philosophy Guide](../design-philosophy-guide.md)** - Philosophical principles behind EDS application design
- **[Performance Optimization](../performance-optimization.md)** - Performance considerations in application flow design
- **[EDS Native Testing Standards](../eds-native-testing-standards.md)** - Testing approaches for application flow validation