# Adobe Edge Delivery Services (EDS) Development Reference Guide

*Related: [EDS Overview](eds.md) | [Block Architecture Standards](implementation/block-architecture-standards.md) | [Design Philosophy Guide](implementation/design-philosophy-guide.md)*

## Introduction

To ensure effective and efficient development within the EDS environment, it is essential to adhere to established best practices. These practices encompass a wide range of considerations, including document structuring, content optimization, metadata utilization, and adherence to platform-specific requirements.

*See also: [Raw EDS Blocks Guide](implementation/raw-eds-blocks-guide.md) for implementation examples | [Complex EDS Blocks Guide](implementation/complex-eds-blocks-guide.md) for advanced patterns*

**Document Structuring:** Clear and logical organization of content is paramount. Utilize headings, subheadings, and consistent formatting to enhance readability and navigation. Consider the target audience and their information needs when structuring documents.

**Content Optimization:** Craft concise and informative content that is tailored to the context of EDS delivery. Employ plain language and avoid jargon whenever possible. Incorporate multimedia elements strategically to enhance engagement and understanding.

**Metadata Utilization:** Leverage metadata effectively to improve content discoverability and searchability. Assign relevant keywords, descriptions, and tags to facilitate efficient information retrieval.

**Platform-Specific Requirements:** Adhere to any guidelines or specifications dictated by the EDS platform. This may include restrictions on file formats, image sizes, or other technical considerations.

**Accessibility:** Ensure that content is accessible to users of all abilities. Follow accessibility guidelines and provide alternative formats when necessary.

**Version Control:** Maintain version control of documents to track changes and facilitate collaboration among team members.

**Testing and Validation:** Thoroughly test and validate content prior to publication to ensure accuracy and functionality within the EDS environment.

**User Feedback:** Actively seek and incorporate user feedback to continuously improve the quality and relevance of EDS content.

By following these best practices, developers can create high-quality, user-centric content that maximizes the potential of the EDS platform.

## Configuration and Structure

*Related: [EDS Architecture Standards](implementation/eds-architecture-standards.md) for architectural patterns | [JavaScript Patterns](javascript-patterns.md) for reusable patterns*

### Configuration Constants Pattern

When developing blocks for EDS, it's recommended to use configuration constants at the top of your JavaScript files. This pattern improves code readability, maintainability, and prevents "magic numbers" or strings from being scattered throughout your code:

```javascript
const BLOCK_CONFIG = {
  // Visual appearance
  ANIMATION_DURATION: 300,
  COPY_BUTTON_RESET_DELAY: 2000,

  // Content thresholds
  MAX_ITEMS: 12,
  LONG_DOCUMENT_THRESHOLD: 40,
  SUMMARY_LENGTH: 150,

  // Content labels
  ERROR_MESSAGE: 'Error loading content. Please try again.',
  LOADING_MESSAGE: 'Loading content...',
  COPY_TEXT: 'Copy',
  COPIED_TEXT: 'Copied!',
  EXPAND_TEXT: 'Expand',
  COLLAPSE_TEXT: 'Collapse',

  // API endpoints
  API_ENDPOINT: '/query-index.json',
  CONTENT_ENDPOINT: '/content/pages.json',

  // Feature toggles
  ENABLE_TRACKING: true,
  SHOW_TIMESTAMPS: true
};
```

Using this pattern makes it easier for other developers to find and modify configuration values without digging through implementation details. It also centralizes configuration, making it clear what aspects of the component are customizable.

### Standard File Organization

EDS projects follow a consistent file organization pattern. Each block or component has its own directory with standardized files:

```
/blocks/{blockname}/
├── {blockname}.js           # Core block functionality
├── {blockname}.css          # Block styles
├── README.md                # Documentation
├── example.md               # Usage examples for content authors
├── demo.md                  # More comprehensive usage examples
├── example.json             # Sample data (if needed)
└── example.csv              # CSV version of sample data
```

This structure ensures that all blocks have complete documentation, clear examples for authors, and consistent organization that makes it easy for developers to understand how the block works.

## JavaScript Patterns

### ESLint Integration

EDS follows the Airbnb JavaScript Style Guide, which discourages console output in production code. When you need to use console logging for debugging, use the following pattern:

```javascript
// eslint-disable-next-line no-console
console.log('Debug information:', data);
```

This approach prevents ESLint errors while maintaining the ability to use console logging for debugging. Remember to:

1. Keep the comment on the line immediately before the console statement
2. Be specific about which rule you're disabling
3. Remove or comment out debug logging before committing to production

### Asynchronous Data Fetching

When fetching data from APIs or the EDS query index, follow this pattern for clean, error-handled asynchronous requests:

```javascript
export default async function decorate(block) {
  try {
    // Show loading state
    block.innerHTML = '<div class="loading">Loading content...</div>';
    
    // Fetch data with proper error handling
    const response = await fetch('/query-index.json');

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();

    // Process successful response
    block.innerHTML = ''; // Clear loading state
    
    // Create and append content elements
    const container = document.createElement('div');
    container.className = 'content-container';
    
    // Add content to container
    // ...
    
    block.appendChild(container);

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching content:', error);
    
    // Show user-friendly error state
    block.innerHTML = `
      <div class="error-state">
        <p>We couldn't load this content. Please try again later.</p>
      </div>
    `;
  }
}
```

This pattern includes:

1. Clear loading states to improve user experience
2. Proper error handling with try/catch blocks
3. Response validation with specific error messages
4. User-friendly error states when things go wrong
5. Clean DOM manipulation to update the UI

### Standard Data Structure

When integrating with external data sources or the EDS query-index.json, follow this consistent pattern for JSON data structures:

```json
{
  "total": 100,          // Total items available
  "offset": 0,           // Starting position for pagination
  "limit": 10,           // Maximum items returned in this response
  "data": [              // Array of actual content items
    {
      "path": "/example-path",
      "title": "Example Title",
      "image": "/path/to/image.jpg",
      "description": "Example description",
      "lastModified": "1724942455",
      "tags": ["tag1", "tag2"],
      "author": "Author Name"
    }
  ],
  "type": "sheet"        // Content type identifier
}
```

This structure works well with EDS's built-in query functionality and makes it easier to create consistent data handling patterns across your site.

### Event Handling

For event handling, use this pattern to maintain clean separation and avoid memory leaks:

```javascript
export default function decorate(block) {
  // Create elements
  const button = document.createElement('button');
  button.textContent = 'Click me';
  button.className = 'action-button';
  
  // Define handler functions separately for clarity
  function handleClick(event) {
    // Handle the click event
    console.log('Button clicked', event);
    // Example: Toggle state
    button.classList.toggle('active');
  }

  // Add event listeners
  button.addEventListener('click', handleClick);
  
  // Append elements to the block
  block.appendChild(button);
  
  // Optional: Return a cleanup function for SPA environments
  return () => {
    button.removeEventListener('click', handleClick);
  };
}
```

Key benefits of this pattern:

1. Handler functions are defined separately for better readability
2. Event listeners are clearly attached in one section
3. Optional cleanup function helps prevent memory leaks in single-page applications

## CSS Best Practices

### CSS Variables for Theming

Define configuration through CSS variables to create consistent, flexible theming:

```css
:root {
  /* Color palette */
  --color-primary: #1473e6;
  --color-secondary: #2680eb;
  --color-background: #ffffff;
  --color-text: #2c2c2c;
  --color-text-light: #707070;
  --color-border: #e1e1e1;
  --color-error: #d7373f;
  --color-success: #268e6c;

  /* Typography */
  --font-family-heading: 'Adobe Clean', sans-serif;
  --font-family-body: 'Adobe Clean', sans-serif;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-loose: 1.8;
  
  /* Spacing system */
  --spacing-xs: 4px;
  --spacing-s: 8px;
  --spacing-m: 16px;
  --spacing-l: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;

  /* UI elements */
  --border-radius-small: 4px;
  --border-radius-medium: 8px;
  --border-radius-large: 16px;
  --shadow-small: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-medium: 0 4px 6px rgba(0,0,0,0.12);
  --shadow-large: 0 10px 20px rgba(0,0,0,0.12);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;

  /* Layout */
  --container-width-small: 600px;
  --container-width-medium: 900px;
  --container-width-large: 1200px;
  --content-width: 72ch;
}

/* Using variables in components */
.button {
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-s) var(--spacing-m);
  border-radius: var(--border-radius-small);
  font-family: var(--font-family-body);
  font-weight: var(--font-weight-bold);
  transition: background-color var(--transition-fast);
}

.button:hover {
  background-color: var(--color-secondary);
}

.card {
  background-color: var(--color-background);
  border-radius: var(--border-radius-medium);
  padding: var(--spacing-m);
  box-shadow: var(--shadow-medium);
  max-width: var(--container-width-small);
}
```

This comprehensive approach to CSS variables provides several benefits:

1. Consistent visual design across the site
2. Easy updates to the design system by changing variable values
3. Better organization of design tokens
4. Simplified maintenance and theme switching

### Standard Breakpoints

EDS follows a common set of breakpoints for responsive design:

```css
/* Mobile (default) - 0-599px */
.component {
  /* Mobile styles */
  padding: var(--spacing-m);
  font-size: 16px;
}

/* Tablet - 600-899px */
@media (min-width: 600px) {
  .component {
    /* Tablet styles */
    padding: var(--spacing-l);
    font-size: 18px;
  }
}

/* Desktop - 900-1199px */
@media (min-width: 900px) {
  .component {
    /* Desktop styles */
    padding: var(--spacing-xl);
    font-size: 20px;
  }
}

/* Large Desktop - 1200px+ */
@media (min-width: 1200px) {
  .component {
    /* Large desktop styles */
    padding: var(--spacing-xxl);
    max-width: var(--container-width-large);
    margin: 0 auto;
  }
}
```

Key principles for responsive design in EDS:

1. Always use `min-width` queries for consistency
2. Design mobile-first, adding complexity for larger screens
3. Use standard breakpoints (600px, 900px, 1200px) for consistency
4. Test all components at each breakpoint

### Block Variation Pattern

For blocks that support variations, follow this pattern:

```css
/* Base block styling */
.blockname {
  /* Default styles */
  padding: var(--spacing-m);
  background: var(--color-background);
  color: var(--color-text);
}

/* Size variations */
.blockname.small {
  /* Small variation */
  padding: var(--spacing-s);
  font-size: 0.9em;
}

.blockname.large {
  /* Large variation */
  padding: var(--spacing-xl);
  font-size: 1.2em;
}

/* Color theme variations */
.blockname.dark {
  /* Dark theme */
  background: #333333;
  color: #ffffff;
}

.blockname.light {
  /* Light theme */
  background: #f5f5f5;
  color: #333333;
}

/* Layout variations */
.blockname.centered {
  /* Centered layout */
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.blockname.split {
  /* Split layout */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-m);
}

/* Combined variations */
.blockname.dark.centered {
  /* Special styles for dark+centered combination */
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

This approach allows authors to specify variations in the document (e.g., `Blockname (dark, centered)`) without requiring additional JavaScript logic. Content authors can easily mix and match variations to achieve their desired appearance.

---

## See Also

### Core EDS Foundation & Architecture
- **[EDS Overview](eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[Block Architecture Standards](implementation/block-architecture-standards.md)** - Comprehensive standards for EDS block development and architectural patterns
- **[EDS Architecture Standards](implementation/eds-architecture-standards.md)** - Architectural patterns and standards for EDS-native block development
- **[Design Philosophy Guide](implementation/design-philosophy-guide.md)** - Understanding the philosophical principles behind EDS architecture decisions
- **[CSS Naming Convention Style Guide](guidelines/style-guide.md)** - Comprehensive CSS naming standards and conventions for EDS block development

### Implementation Guides & Patterns
- **[Raw EDS Blocks Guide](implementation/raw-eds-blocks-guide.md)** - Step-by-step guide for creating simple EDS blocks using vanilla JavaScript
- **[Complex EDS Blocks Guide](implementation/complex-eds-blocks-guide.md)** - Advanced block development with build tools and external dependencies
- **[Build Blocks Clarification](implementation/build-blocks-clarification.md)** - Understanding the dual-directory architecture and development workflows
- **[Build Component Template](implementation/build-component-template.md)** - Template for advanced build components with external dependencies

### Development Environment & Tools
- **[Server README](../server-README.md)** - Development server setup and configuration for EDS block development and testing
- **[JavaScript Patterns](javascript-patterns.md)** - Reusable JavaScript patterns for EDS block development
- **[Error Handling Patterns](error-handling-patterns.md)** - Comprehensive error handling strategies for EDS blocks
- **[Performance Optimization](performance-optimization.md)** - Techniques for optimizing EDS block performance and loading

### Testing & Quality Assurance
- **[EDS Native Testing Standards](testing/eds-native-testing-standards.md)** - Testing standards specifically for EDS-native pattern components
- **[EDS Architecture and Testing Guide](testing/eds-architecture-and-testing-guide.md)** - Advanced testing workflows and file replacement strategies
- **[Debug Guide](testing/debug.md)** - Complete debugging policy and approval requirements for development troubleshooting
- **[Investigation](testing/investigation.md)** - Advanced investigation techniques and analysis methods

### Advanced Topics & Specialized Guides
- **[Instrumentation Guide](testing/instrumentation-how-it-works.md)** - Advanced instrumentation techniques and performance monitoring
- **[Browser Compatibility](browser-compatibility.md)** - Ensuring cross-browser compatibility for EDS implementations
- **[Build Tools Configuration](build-tools-configuration.md)** - Advanced build tool setup and configuration
- **[Project Structure](project-structure.md)** - Understanding the overall EDS project organization and file conventions

## Next Steps

### For Frontend Developers & Component Authors
1. **Master the configuration patterns** demonstrated in this reference guide for creating maintainable and scalable EDS components
2. **Implement the JavaScript patterns** including async data fetching, event handling, and error management in your block development
3. **Apply the CSS best practices** including variable usage, responsive design, and block variation patterns for consistent styling
4. **Follow the documentation standards** to create comprehensive README files and code comments for your components
5. **Use the resource loading patterns** for efficient CSS and JavaScript loading in your EDS blocks

### For Technical Writers & Documentation Teams
1. **Adopt the documentation template** provided in this guide for creating consistent block documentation across projects
2. **Implement the code commenting standards** using JSDoc-style comments for complex functions and clear CSS organization
3. **Create comprehensive examples** that content authors can copy and paste for immediate use
4. **Establish accessibility documentation** that ensures all components meet inclusive design standards
5. **Maintain performance documentation** that tracks the impact of components on site speed and user experience

### For Team Leads & Project Managers
1. **Establish coding standards** based on the patterns and practices outlined in this comprehensive reference guide
2. **Implement code review processes** that ensure adherence to the configuration, JavaScript, and CSS patterns
3. **Create development workflows** that incorporate the resource loading and performance optimization techniques
4. **Plan training programs** that help team members understand and apply the best practices documented here
5. **Monitor code quality** using the standards and patterns as benchmarks for consistent development practices

### For DevOps & Build Engineers
1. **Understand the resource loading patterns** and how they affect build processes and deployment strategies
2. **Implement automated testing** that validates adherence to the coding standards and patterns outlined
3. **Configure development environments** that support the JavaScript and CSS patterns demonstrated in this guide
4. **Set up performance monitoring** that tracks the effectiveness of the optimization techniques described
5. **Create deployment procedures** that ensure the patterns and standards are maintained in production environments

### For QA Engineers & Test Specialists
1. **Learn the implementation patterns** to create effective test scenarios that validate component functionality
2. **Understand the error handling patterns** to create comprehensive test cases for edge cases and failure scenarios
3. **Test the responsive design patterns** across all breakpoints and devices as outlined in the CSS standards
4. **Validate accessibility implementations** using the guidelines and considerations documented in this reference
5. **Create performance test suites** that ensure components meet the optimization standards described

### For Security & Compliance Teams
1. **Review the JavaScript patterns** to ensure they meet security standards for data handling and user interactions
2. **Assess the cookie consent and analytics patterns** for compliance with privacy regulations and data protection requirements
3. **Evaluate the personalization patterns** to ensure they handle user data appropriately and securely
4. **Establish security guidelines** for the implementation patterns and coding standards outlined in this guide
5. **Monitor compliance** with the documented best practices and ensure they align with organizational security policies

### For AI Assistants & Automation
1. **Master the comprehensive patterns** demonstrated in this reference guide for creating high-quality EDS components
2. **Understand the configuration and structure standards** to generate consistent and maintainable code
3. **Apply the JavaScript and CSS patterns** when creating or modifying EDS blocks and components
4. **Follow the documentation standards** to create comprehensive and useful documentation for generated components
5. **Implement the best practices** for resource loading, performance optimization, and error handling in automated development workflows
