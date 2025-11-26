# Adobe Edge Delivery Services - Full Guide for Devs, Architects and AI

**Related Documentation:** [Block Architecture Standards](implementation/block-architecture-standards.md) | [Raw EDS Blocks Guide](implementation/raw-eds-blocks-guide.md) | [Complex EDS Blocks Guide](implementation/complex-eds-blocks-guide.md) | [Project Structure](project-structure.md)

> **📋 Style Guide**: For CSS naming conventions and standards, see the [CSS Naming Convention Style Guide](../guidelines/style-guide.md)

# The Developer, Architect or AI Guide to Edge Delivery Services (EDS): From Document to Website

## Introduction

Edge Delivery Services (EDS, formerly known as Franklin or Project Helix) represents a paradigm shift in content management systems. Unlike traditional CMSs that require content authors to adapt to the system's rigid structures, EDS flips this relationship—the system adapts to how authors naturally create content. This comprehensive guide examines how EDS transforms documents into high-performance websites, with a special focus on extending functionality without modifying core files.

This post [formatted as markdown](https://allabout.network/blogs/ddt/adobe-edge-delivery-services-full-guide-for-devs-architects-and-ai.md)  can assist in building EDS Components using AI tools like cursor and claude.

## Core Philosophy and Requirements

### The Content-First Philosophy

At its core, EDS embraces a content-first approach that radically simplifies the authoring process. Content creators work in familiar tools like Documents or Microsoft Word, while the system handles the technical transformation into structured web pages. This separation of concerns allows:

- Content authors to focus on writing in familiar environments
- Developers to build functionality without disrupting content workflows
- Both teams to work simultaneously, accelerating delivery

As a developer working with EDS, understanding this philosophy is crucial—your job isn't to build a website from scratch, but to enhance how documents transform into web experiences.

### Development Requirements and Constraints

Before diving into EDS, it's important to understand its core development philosophy and constraints. These aren't limitations but deliberate design choices that promote simplicity, performance, and maintainability (see [Design Philosophy Guide](implementation/design-philosophy-guide.md) for detailed architectural principles):

- **Modern JavaScript without TypeScript**: EDS relies on vanilla JavaScript, avoiding transpilation complexity
- **Pure CSS without preprocessors**: Direct CSS keeps things simple and performant
- **No build-heavy frameworks**: Skip React, Vue, and other frameworks that add complexity
- **Focus on simplicity and performance**: Every decision prioritizes page speed and core web vitals
- **Clear code organization**: Structured, well-documented code is essential
- **No dependencies and no build steps**: Zero build process means faster development and fewer points of failure

These requirements enable EDS to achieve perfect Core Web Vitals scores (100/100/100/100) by eliminating the overhead traditionally associated with modern web development. This approach is increasingly rare but remarkably effective—letting developers focus on solving real problems rather than managing toolchains.

> **📁 Important Architecture Note**: The simple JavaScript philosophy described above applies to **files outside the `/build/` directory**. Files within `/build/` directories are for complex components that require build processes and may use external dependencies. This separation allows for both simple blocks (no build) and advanced components (with build systems) to coexist in the same project. For detailed explanation of this dual-directory architecture, see [Build Blocks Clarification](implementation/build-blocks-clarification.md).

## The Document Transformation Journey

Let's follow a document's complete journey from creation to final rendered webpage. This transformation process is at the heart of how EDS works, and understanding it will help you see where and how to extend functionality as a developer.

### Stage 1: Document Creation

The journey begins with a content author creating or editing a document in Google Docs (or Microsoft Word). In this familiar environment, authors naturally structure their content using:

- Headings and subheadings (H1-H6) to organize information hierarchically
- Paragraphs with rich text formatting (bold, italic, underline)
- Lists (ordered and unordered) for structured information
- Images embedded directly in the document
- Links to internal and external resources
- Text formatting for emphasis and organization

Authors can also use EDS-specific features:

- Section breaks (horizontal rules with ---) to divide content into logical sections
- Tables with specific headers to create specialized blocks like "Columns" or "Cards"
- Metadata tables with key-value pairs to define page properties for SEO and configuration

For example, a typical document might include a hero section with a main heading, followed by several content sections divided by horizontal rules, and special blocks created with tables.

### Stage 2: Document to Markdown Conversion (Server-Side)

When an author presses "Preview" in the Sidekick tool, the transformation begins:

**Document Retrieval**

- EDS accesses the document via Google Docs or SharePoint API
- The raw document content is extracted for processing

**Structural Analysis**

- The system analyzes the document structure
- It identifies headings, paragraphs, tables, and other elements
- Special elements like metadata tables are recognized

**Markdown Conversion**

- The document is systematically converted to Markdown format
- Document structure is preserved in Markdown syntax
- Tables are specially processed as potential block components
- Images are extracted and stored separately

**Markdown Storage**

- The generated Markdown becomes the source of truth for page content
- It's stored in the "content bus" for versioning and future access
- This separation allows content and code to evolve independently

The Markdown representation serves as an intermediate format that bridges the gap between the document-based authoring experience and web delivery.

### Stage 3: Markdown to Initial HTML Generation (Server-Side)

Once the Markdown is prepared, EDS transforms it into basic HTML:

**HTML Structure Creation**

- The server processes the Markdown to generate HTML
- A semantic document structure is created with appropriate HTML elements
- Headings become `<h1>` through `<h6>` elements
- Paragraphs become `<p>` elements
- Lists become `<ul>` or `<ol>` with nested `<li>` elements

**Metadata Application**

- Metadata from the metadata table is extracted and applied
- Title, description, and other SEO elements are added to the `<head>`
- Open Graph and other social sharing tags are generated

**Section Organization**

- Content is divided into sections based on horizontal rules
- Each section is wrapped in a `<div class="section">` element
- This creates the foundation for the page's visual structure

**Block Identification**

- Tables marked as blocks are converted to `<div>` elements with appropriate classes
- Each block is given a data-block-name attribute for later processing
- Block structure is preserved but not yet fully processed

This initial HTML is minimal and lacks styling or interactive features, but it contains all the content and structural information needed for the next steps.

Just a little bit more detail might help.

## Table Transformation: From Docs to Div Elements

One of the most important structural transformations in the EDS pipeline involves how tables created in Documents are converted into HTML div elements. Understanding this process is crucial for developers creating blocks that interact with table-based content.

### Table Structure in Documents

In Documents, authors create tables with rows and columns. These tables have a semantic structure consisting of:

- Table containers
- Rows
- Cells within rows

Authors often use tables for:

- Structured data presentation
- Layout organization
- Creating specialized block components

### The Transformation Process

When an author creates a table in Documents and publishes it through EDS, the following transformation process occurs:

1. **Document Retrieval**: The system accesses the Google Doc via API
2. **Table Identification**: Tables in the document are identified and parsed
3. **Structure Conversion**: The table structure is converted into a nested div structure

### How Tables Become Divs

A table structured in Documents:

```
| Block Name |            |            |
|------------|------------|------------|
| Cell 1     | Cell 2     | Cell 3     |
| Cell 4     | Cell 5     | Cell 6     |
```

Will be transformed into this nested div structure in the final HTML:

```
 <div class="block-name">
          <div>
            <div>Cell 1</div>
            <div>Cell 2</div>
            <div>Cell 3</div>
          </div>
          <div>
            <div>Cell 4</div>
            <div>Cell 5</div>
            <div>Cell 6</div>
          </div>
        </div>
</div>
```

### Recognizing Table-Originated Content in JavaScript

When writing JavaScript for an EDS block that processes table-originated content, you'll need to identify the div structure that was originally a table. Here's how to identify and work with these structures:

```
export default function decorate(block) {

  // The block will contain a div structure that was originally a table
  // Each row of the original table is a direct child div of the block
  const rows = block.children;
 
  // Each cell of the original table is a child of the row div

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.children;
    
      // Process data rows

      for (let j = 0; j < cells.length; j++) {
        const cellContent = cells[j].textContent.trim();
        // Process cell content
      }
    }
  }
}
```

### Special Considerations for Table Content

1. **Lists in Tables**: When an author creates a bulleted or numbered list inside a table cell in Documents, it will be transformed into proper `<ul>` or `<ol>` elements inside the div that represents that cell.
2. **Rich Text in Tables**: Rich text formatting (bold, italic, links) within table cells is preserved in the resulting divs.
3. **Images in Tables**: Images placed inside table cells will be wrapped in `<picture>` elements within the corresponding div.
4. **Complex Content**: For cells containing multiple paragraphs or mixed content types, the structure is preserved within the div representing that cell.

### Working with Block-Specific Tables<br>

In EDS, tables are used to define special block components. For example, a table with "Columns" in the first cell would be transformed into a columns block. When writing JavaScript for such blocks, you can rely on the consistent transformation from table to div structure.

By understanding this table-to-div transformation process, you can effectively develop blocks that leverage Document tables as a content creation mechanism while maintaining the performance and flexibility advantages of EDS's div-based rendering approach.\
\
Lets us get a bit more specific

### Stage 4: Initial HTML Delivery and Browser Processing

The server delivers this basic HTML to the browser, where the transformation continues:

**Initial Browser Rendering**

- The browser receives and parses the HTML
- Initial DOM construction begins
- Critical CSS (in styles.css) is loaded for basic styling
- The page appears in a simplified but structured form

**Core Script Loading**

- Key JavaScript files (aem.js and scripts.js) are loaded
- These scripts orchestrate the remaining transformation

**DOM Enhancement (Client-Side JavaScript)**

- The decorateTemplateAndTheme() function applies page-level structure
- The decorateSections() function processes each section
- The decorateBlocks() function identifies blocks for enhancement
- Text nodes are wrapped in appropriate elements with wrapTextNodes()
- Links are transformed into buttons where appropriate with decorateButtons()

**Block Loading and Processing**

- Each block is loaded with its CSS and JavaScript
- Blocks are processed in order, starting with the first visible section
- The loadBlock() function imports block-specific JS and CSS
- Each block's decorate() function transforms its DOM

During this phase, the HTML undergoes significant transformation through JavaScript. What starts as basic markup becomes rich, interactive content with proper styling and behavior.

### Stage 5: Final DOM Transformation and Rendering

The final stage involves completing the page enhancement with dramatic transformations to the DOM structure:

**Block Status Tracking and Wrapper Elements**

When examining the browser-rendered DOM, you'll see significant differences from the raw HTML output. For example, a simple block:

`<!-- Initial server-rendered HTML -->`

```
<div class="hero block" data-block-name="hero">
  <div>
    <picture>...</picture>
  </div>
  <div>
    <h1>Page Title</h1>
  </div>
</div>
```

Gets transformed into:

```
<!-- Final browser-processed DOM -->

<div class="hero-wrapper">
  <div class="hero block" data-block-name="hero" data-block-status="loaded">
    <div>
      <picture>...</picture>
    </div>
    <div>
      <h1>Page Title</h1>
    </div>
  </div>
</div>
```

Note the key changes:

- Addition of data-block-status="loaded" to indicate JavaScript processing is complete
- Creation of a parent wrapper element with -wrapper suffix
- The DOM structure becomes more complex but more capable

**Section Enhancement**

Sections undergo similar transformations:

```
<!-- Initial server-rendered HTML -->
<div class="section">
  <div>Content here</div>
</div>
```

Becomes:

```
<!-- Final browser-processed DOM -->
<div class="section hero-container" data-section-status="loaded">
  <div class="default-content-wrapper">
    Content here
  </div>
</div>
```

Key transformations include:

- Addition of container-specific classes (e.g., hero-container)
- Addition of data-section-status="loaded" tracking attribute
- Wrapping of general content in a `<div class="default-content-wrapper">`

**Button Styling Enhancement**

Simple links written by authors:

```
<!-- Initial link -->
<p><a href="https://example.com">Get in touch</a></p>
```

Are automatically enhanced into styled buttons:

```
<!-- Enhanced button -->
<p class="button-container">
  <a href="https://example.com" class="button primary" target="_blank" title="Get in touch">Get in touch</a>
</p>
```

The system automatically:

- Adds appropriate button classes
- Adds parent container classes
- Enhances with additional attributes like title and target

**Media Optimization**

Perhaps the most dramatic transformation happens with images. A simple image in a document:

```
<!-- Basic image reference -->
<img src="./image.png" alt="Description">
```

Is transformed into a fully optimized, responsive picture element:

```
<!-- Optimized responsive image -->
<picture>
  <source type="image/webp" srcset="./image.png?width=2000&format=webply&optimize=medium" media="(min-width: 600px)">
  <source type="image/webp" srcset="./image.png?width=750&format=webply&optimize=medium">
  <source type="image/png" srcset="./image.png?width=2000&format=png&optimize=medium" media="(min-width: 600px)">
  <img loading="lazy" alt="Description" src="./image.png?width=750&format=png&optimize=medium" width="1600" height="400">
</picture>
```

This sophisticated transformation:

- Automatically generates multiple image sizes (750px, 2000px)
- Creates WebP versions with appropriate fallbacks
- Adds responsive breakpoints using media queries
- Implements appropriate loading strategy
- Preserves image dimensions for layout stability
- Applies medium optimization for quality/size balance

**Head Section Transformation**

The metadata table from the Google Doc:\
\
![][image1]

Is expanded into a comprehensive set of SEO and social sharing tags:

```
<!-- Enhanced head section -->

<title>My Page Title</title>
<meta name="description" content="This is a description of my page">
<meta property="og:title" content="My Page Title">
<meta property="og:description" content="This is a description of my page">
<meta property="og:image" content="/path/to/image.jpg">
<meta property="og:url" content="https://example.com/current-path">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="My Page Title">
<meta name="twitter:description" content="This is a description of my page">
<meta name="twitter:image" content="/path/to/image.jpg">
<link rel="canonical" href="https://example.com/current-path">
<meta name="author" content="Author Name">
```

This transformation creates all the metadata needed for proper SEO and social sharing from a simple table in the document.

**Resource Loading Optimization**

The system automatically applies sophisticated resource loading strategies:

\<!-- Script and style loading -->

```
<script src="/scripts/aem.js" type="module"></script>
<script src="/scripts/scripts.js" type="module"></script>
<link rel="stylesheet" href="/styles/styles.css">
And component-specific resources are loaded only when needed:
<link rel="stylesheet" href="/blocks/header/header.css">
<link rel="stylesheet" href="/blocks/footer/footer.css">
```

The hero image loading is specifically optimized for performance:

```
<!-- Before optimization -->

<img loading="lazy" alt="Hero image" src="...">

<!-- After optimization -->

<img loading="eager" alt="Hero image" src="...">
```

This change ensures the above-the-fold hero image loads as early as possible for better LCP (Largest Contentful Paint) performance.

Through these multiple transformations, what started as a simple document becomes a fully-featured, high-performance web page with sophisticated optimization techniques applied automatically.

This multi-stage process allows content authors to focus on content while the system handles the technical implementation, creating a clean separation of concerns that is central to EDS's document-based authoring philosophy.

## EDS's Three-Phase Loading Strategy

A cornerstone of EDS's performance optimization is its sophisticated three-phase loading strategy, often referred to as E-L-D (Eager-Lazy-Delayed). This strategy is key to maintaining perfect Core Web Vitals scores (100/100/100/100) by carefully managing resource loading.

### Phase E (Eager)

**Purpose**: Loads critical content needed for Largest Contentful Paint (LCP)\
**Timeline**: Begins immediately on page load\
**Components**:

- First section (typically hero)
- Main heading and hero image
- Critical CSS in styles.css
- Core scripts (aem.js and scripts.js)
- Essential functions

It's recommended to keep the aggregate payload before LCP below 100KB for optimal performance. This stringent requirement ensures pages load quickly even on slower connections.

In the code, this is implemented in scripts.js:

```
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    document.body.classList.add('appear');
    await loadSection(main.querySelector('.section'), waitForFirstImage);
  }

  sampleRUM.enhance();

  try {
    // if desktop (proxy for fast connection) or fonts already loaded, load fonts.css
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}
```

Note how it only loads the first section and waits for the first image before proceeding. This targeted approach ensures critical content appears quickly.

### Phase L (Lazy)

**Purpose**: Loads important but non-critical elements\
**Timeline**: Begins after first section is loaded\
**Components**:

- Remaining sections
- Header and footer components
- Non-critical CSS (lazy-styles.css)
- Below-the-fold images
- Additional fonts

The implementation in scripts.js shows this phased approach:

```
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadSections(main);
  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();
  loadHeader(doc.querySelector('header'));
  loadFooter(doc.querySelector('footer'));
  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}
```

This function loads all remaining sections, header, footer, and non-critical CSS only after the eager phase completes.

### Phase D (Delayed)

**Purpose**: Handles lowest-priority elements\
**Timeline**: Begins after a 3-second delay\
**Components**:

- Analytics
- Third-party scripts
- Marketing tools
- Social widgets
- Chat functionality
- Anything loaded through delayed.js

This implementation is deceptively simple:

```
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}
```

The 3-second delay is crucial—it ensures the main content is fully loaded and interactive before any non-essential scripts run. As the documentation notes: "The delayed phase should be at least three seconds after the LCP event to leave enough time for the rest of the experience to get settled."

This is where teams often add their analytics, personalization, cookie consent, and other secondary functionality:

```
// In delayed.js
// Add analytics

(function loadAnalytics() {
  // Load analytics script
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X';
  script.async = true;
  document.head.appendChild(script);
  
  // Initialize analytics

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXXX-X');
})();

// Add cookie consent banner

(function loadCookieConsent() {
  // Cookie consent implementation
})();
```

This E-L-D pattern ensures the most critical content loads quickly for good user experience, while deferring less important resources to maintain performance scores. It's a key reason why EDS sites can consistently achieve perfect Lighthouse scores even while incorporating sophisticated functionality.

## Core Components of Edge Delivery Services

The EDS system relies on three core JavaScript files that orchestrate the page loading and enhancement process:

### aem.js

This is the foundation of EDS functionality, providing utility functions and core behavior. Without aem.js, your EDS site would be static and unresponsive. Key components include:

- **Initial Setup**: init() function sets up the environment and initializes RUM (Real User Monitoring)
- **Core Utility Functions**: Tools like toClassName(), readBlockConfig(), loadCSS(), and getMetadata()
- **Image Handling**: createOptimizedPicture() creates responsive picture elements
- **DOM Manipulation**: Functions for decorating templates, wrapping text nodes, and processing buttons
- **Section and Block Handling**: Methods for decorating, building, and loading sections and blocks
- **Performance Monitoring**: RUM sampling and tracking for performance analysis

### scripts.js

This file orchestrates the page loading process with the three phases described above:

- **Imports and Utility Functions**: Imports useful functions from aem.js and defines additional utilities
- **Auto Blocking**: Functions that programmatically create blocks from content patterns
- **Loading Phases**:
  - loadEager(): Handles critical elements needed for initial page view
  - loadLazy(): Manages important but non-critical elements
  - loadDelayed(): Deals with the lowest-priority elements after a delay
- **Page Load Orchestration**: Coordinates the entire page loading process

### delayed.js

A simple file meant for custom code that should load after a delay:

`// add delayed functionality here`

This file is intentionally minimal, serving as a location where developers can add non-critical functionality without modifying the core files.

## Understanding Blocks in EDS

Blocks are the fundamental building units for custom functionality in EDS. They allow documents to include specialized components and layouts while maintaining the content-first philosophy that makes EDS unique.

### Block Creation in Documents

Authors create blocks using tables in the document:

- The first cell in the first row defines the block type (e.g., "Columns")
- The remaining cells provide the block content
- For variations, authors can specify options in parentheses: "Columns (wide)"

For example, a columns block in a Google Doc might look like this:

![| Columns | | | -------------------- | --------------------- | | Text in first column | Text in second column |][image2]

When authors want a variation, they simply add it in parentheses:

![| Columns (dark, wide) | | | -------------------- | ------------- | | Left content | Right content |][image3]

The document structure is transformed into HTML, with the table element removed and replaced with appropriate divs and semantic elements.

### Autoblocking in Detail

Beyond manual block creation via tables, EDS offers "autoblocking" — a system where the platform automatically applies styling and structure to content from Documents without requiring developers to create custom components for every scenario.

Here's how autoblocking works:

- **Pattern Recognition**: The system identifies common content patterns (like an image followed by a heading)
- **Automatic Transformation**: These patterns are automatically transformed into appropriate blocks
- **Consistent Styling**: The resulting blocks get consistent styling without author intervention

For example, when an author includes an image followed by a heading at the beginning of a document, the autoblocking system might automatically convert this into a hero block without the author needing to create a table.

This is configured in the buildAutoBlocks function in scripts.js:

```
function buildAutoBlocks(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');

  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {

    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}
```

Autoblocking allows EDS to provide a rich web experience while minimizing the use of tables in documents, which can interrupt the reading flow for authors.

Here are several paragraphs you can add to the EDS (Edge Delivery Services) rules in the knowledge base to explain the bullet point behavior and validation best practices:

## Handling Bullet Points in EDS

When working with bullet points in Edge Delivery Services, it's important to understand how Document content is transformed into HTML. EDS will generate different HTML structures for bullet points depending on how the author formats them in the source document.

If bullet points are created as a continuous list in the Document, EDS generates a single `<ul>` element containing multiple `<li>` elements. However, if the author includes blank lines between bullet points, EDS will generate separate `<ul>` elements, each containing a single `<li>` element. Your code should be flexible enough to handle both structures.

The most robust approach is to query for all `<li>` elements directly rather than making assumptions about the enclosing `<ul>` structure. This allows your block to work consistently regardless of the author's formatting choices in the source document.

## Block Validation Best Practices

When developing custom blocks for EDS, it's unnecessary to check if a block has the correct class name or structure within your block's JavaScript. The system only calls your block's `decorate` function for elements that match your block's name. By the time your JavaScript executes, you can be certain you're working with the correct block type.

Validating whether the HTML element is the expected block type (e.g., checking for a class name or specific structure) is redundant and can lead to false negatives if the structure changes. Instead, focus your validation on ensuring the block contains the necessary content for your functionality, such as checking for required rows or data points.

This approach makes your code more concise and less brittle in the face of minor HTML structure changes that might occur as the EDS platform evolves or as authors create content with different formatting choices.

# Edge Delivery Services (EDS): Icon System and SVG Handling

## Understanding the EDS Icon System

Edge Delivery Services provides an elegant system for incorporating SVG icons into content, allowing authors to work in document formats while the system handles all technical implementation details.

### Icon Syntax and Transformation

When content authors place an item name between two colons like `:training:` in their document, EDS transforms this pattern into structured HTML markup:

`<div><span class="icon icon-training"></span></div>`

This simple syntax abstracts away HTML complexity server-side during the document-to-HTML conversion process.

### Processing Flow

When EDS encounters the icon pattern:

1. The system identifies the icon name (the text between colons)
2. It creates a `<span>` element with two key classes:
   - `icon` (indicates this is an SVG icon requiring special handling)
   - `icon-{name}` (identifies which specific icon to use, e.g., `icon-training`)
3. EDS looks for the corresponding SVG file (e.g., `training.svg`) in the root icons folder
4. During final rendering, the span is replaced with an image tag pointing to the fully qualified domain:

\<img src="https\://yourdomain.com/icons/training.svg" alt="Training icon">

### Contextual Awareness

EDS demonstrates sophisticated contextual awareness when handling icons. When an icon appears within a content block with specific meaning (like a slide or illustration), the system enhances the markup with additional context:

```
<h2 class="slide-title">How AI Generates Text</h2>

<p><span class="icon icon-generates"><img data-icon-name="eulersnumber" src="/icons/generates.svg" alt="" loading="eager"></span></p>
```

## Benefits for Content Authors and Developers

### For Content Authors

- Simple syntax (`:iconname:`) that's easy to remember and use
- No need to understand HTML, SVG, or image paths
- Focus remains on content creation, not technical implementation

### For Developers

- Consistent icon implementation across the site
- Centralized icon management in a single folder
- Semantic HTML with appropriate accessibility attributes
- Clean separation between content and presentation

## Implementation Notes

When implementing this system in your EDS project:

1. Create an `/icons/` directory at the root of your project, if using boilerplate its there already
2. Place all SVG icons in this directory, named according to their function (e.g., `training.svg`)
3. Ensure SVGs are optimized for web use (remove unnecessary metadata)
4. Document available icons for content authors to reference
5. Consider creating an icon library page that displays all available icons

This icon system exemplifies EDS's philosophy of adapting to how authors naturally create content, while maintaining high standards for web performance and accessibility.

## Styling Rules

Never apply styling to elements with -container suffix in their class names (e.g. blockname-container, section-container). All styling should be applied to either the -wrapper or the block class itself. This rule is crucial because in EDS (for detailed CSS standards and naming conventions, see [CSS Naming Convention Style Guide](guidelines/style-guide.md)):

Container elements (.block-name-container) are structural elements that should never receive styling  Wrapper elements (.block-name-wrapper) are the appropriate place for layout and positioning styles. Block elements (.block-name) are for block-specific styling

In our current CSS file.

### Block Development in Code

Each block corresponds to a specific folder and files in your project structure (for comprehensive standards and conventions, see [Block Architecture Standards](implementation/block-architecture-standards.md)):

```
/blocks/{blockname}/
├── {blockname}.js           # Core block functionality
├── {blockname}.css          # Block styles
├── README.md                # Documentation
├── example.md               # Usage examples
├── demo.md                  # Demo content
├── example.json             # Sample data (if needed)
└── example.csv              # CSV version of sample data
```

This structured organization ensures consistency across blocks and makes maintenance easier. Each file serves a specific purpose:

- **JS file**: Contains the block's logic and DOM manipulation
- **CSS file**: Contains block-specific styling
- **README.md**: Documents the block's purpose and configuration options
- **example.md**: Provides simple examples for content authors
- **demo.md**: Shows more comprehensive, real-world usage

When documenting code examples in markdown files, remember to use single backticks (not triple backticks) to enclose code snippets for better compatibility.

A basic block implementation looks like:

```
export default function decorate(block) {
  // Transform the block DOM as needed
  // 'block' is a DOM element with the class 'blockname'
}
```

CSS for blocks should be isolated to prevent affecting other elements:

```
.blockname {
  /* Block-specific styles */
}

/* Don't style the container directly */
.block-name-container {
  /* AVOID putting styles here */
}

/* Handle variations through class combinations */
.blockname.variation {
  /* Variation-specific styles */
}
/* Ensure responsiveness */

@media (min-width: 768px) {
  .blockname {
    /* Desktop styles */
  }
}
```

EDS passes the block's DOM element to the decorate function, allowing you to transform it as needed. This is where you can add interactivity, fetch data, or reorganize the content.

### Block Variations

A powerful feature of EDS blocks is the ability to create variations with minimal additional code. When authors add parenthetical options to a block:

\| Columns (dark, wide) |

These options become additional CSS classes:

`<div class="columns dark wide">`

This allows you to create styling variations through CSS without needing separate JavaScript implementations. For example:

```
/* Base block styling */

.columns {
  display: grid;
  gap: 20px;
}

/* Width variation */

.columns.wide {
  max-width: 1200px;
}

/* Color theme variation */

.columns.dark {
  background-color: #333;
  color: white;
}

/* Combined variations create unique looks */

.columns.dark.wide {
  border: 1px solid #555;
}
```

This approach provides tremendous flexibility while keeping the codebase maintainable.

#### Single JavaScript File for All Variations

**CRITICAL RULE: Each block must have exactly ONE JavaScript file, regardless of how many variations it supports.**

EDS blocks should NEVER have multiple JavaScript files like `blockname.js`, `blockname-variation1.js`, `blockname-variation2.js`. Instead, all variation logic must be handled within the single JavaScript file using class detection:

```javascript
export default async function decorate(block) {
  // Detect variation by checking for class
  const isVariationA = block.classList.contains('variation-a');
  const isVariationB = block.classList.contains('variation-b');

  // Apply variation-specific logic
  if (isVariationA) {
    // Handle variation A logic
    const data = await fetchAndFilterData();
    renderVariationA(block, data);
  } else if (isVariationB) {
    // Handle variation B logic
    renderVariationB(block);
  } else {
    // Handle default/standard variation
    renderStandard(block);
  }
}
```

**Why Single File Architecture:**
- **Maintainability**: All logic for a block is in one place
- **EDS Convention**: The system expects one JS file per block
- **Performance**: Avoids loading multiple files for the same block
- **Consistency**: Follows the same pattern as CSS variations
- **Simplicity**: Easier to understand and debug

**Real-World Example:**
A blog block with an AI filter variation should have:
- ✅ `view-myblog.js` - Single file with both standard and AI filtering logic
- ❌ NOT `view-myblog.js` + `view-myblog-ai.js` - Two files is incorrect

The JavaScript detects the variation and applies appropriate logic:
```javascript
export default async function decorate(block) {
  const isAIVariation = block.classList.contains('ai');
  const data = await fetchData();

  // Filter or transform data based on variation
  const processedData = isAIVariation ? filterAIContent(data) : data;

  // Render with variation-aware logic
  render(block, processedData, isAIVariation);
}
```

### Data Integration with Blocks

If your block requires external data, you should follow consistent patterns for data structure. Here's an example of the expected JSON structure for data integration:

```
{
  "total": 1,
  "offset": 0,
  "limit": 1,
  "data": [
    {
      "path": "/example-path",
      "title": "Example Title",
      "image": "/path/to/image.jpg",
      "description": "Example description",
      "lastModified": "1724942455"
    }
  ],
  "type": "sheet"
}
```

To access EDS pages dynamically, you can use the query-index.json file available in every folder. This powerful feature enables you to create dynamic components that pull content from across your EDS site.

## Extending Functionality Without Modifying Core Files

A key challenge in EDS development is how to extend functionality without modifying the core files. Many teams face common requirements that tempt them to directly edit aem.js or scripts.js:

- Analytics tracking: Adding Google Analytics, Adobe Analytics, or other measurement tools
- Personalization: Implementing user-specific content or A/B testing (see [Testing Strategies](testing-strategies.md) for implementation approaches)
- Cookie acceptance prompts: Meeting regulatory requirements for user consent
- GDPR/privacy law compliance: Adding privacy controls and notices
- Dynamic content: Pulling content from third-party APIs or from EDS's query-index.json

As the documentation explains: "All of these code elements must be seamlessly integrated into the browser output while maintaining Edge Delivery Services' perfect Core Web Vitals score (100/100/100/100)."

However, modifying core files directly has significant downsides:

- Upgrade difficulties: When a new version of aem.js is released, your modifications must be carefully reapplied
- Maintenance challenges: Custom modifications become harder to track and maintain
- Knowledge transfer: New team members struggle to understand custom core changes
- Stability risks: Core file modifications may interact unexpectedly with other features

### The Expander Block Pattern - My Approach

Instead of modifying core files, my approach is to create an "expander block"—a normal block that doesn't modify containing content but includes JavaScript that enhances specific elements after the page is rendered.

For example, here's an implementation of a "code-expander" block that enhances `<pre><code>` elements on the page:

```
/**
 * Minimal Code Expander Block
 * This component enhances pre/code elements on the page with:
 * Copy to clipboard functionality - One-click copy with visual feedback
 * Expand/collapse for long code blocks - Toggles visibility for better readability
 * The component works by finding all pre/code elements, wrapping them in a custom
 * container with controls, and adding event listeners for the interactive features.
 * No syntax highlighting is applied - all code is displayed as plain text.
 */

export default async function decorate(block) {
  // Configuration values for the component.
  // Control appearance, behavior thresholds, and text labels.
  const THRESHOLD = 40; // Line count for a "long" code block.
  const COPY_TEXT = 'Copy';
  const COPIED_TEXT = 'Copied!';
  const EXPAND_TEXT = 'Expand';
  const COLLAPSE_TEXT = 'Collapse';

  // Locate all code blocks on the page.
  const codeElements = document.querySelectorAll('pre code');
  if (codeElements.length === 0) return;

  Array.from(codeElements).forEach((codeElement, index) => {
    // Skip if the element is already processed.
    if (codeElement.closest('.code-expander-wrapper')) return;

    // Extract code content and determine if it's a long document.
    const code = codeElement.textContent;
    const isLongDocument = code.split('\n').length > THRESHOLD;

    // Create a wrapper for the enhanced code block.
    const wrapper = document.createElement('div');
    wrapper.className = 'code-expander-wrapper';
    wrapper.dataset.codeIndex = index;

    // Create a header that will contain control buttons.
    const header = document.createElement('div');
    header.className = 'code-expander-header';

    // Create a container for control buttons.
    const buttonGroup = document.createElement('div');
    buttonGroup.className = 'code-expander-buttons';

    // Conditionally add expand/collapse button for long code blocks.
    let expandButton = null;
    if (isLongDocument) {
      expandButton = document.createElement('button');
      expandButton.className = 'code-expander-expand-collapse';
      expandButton.textContent = EXPAND_TEXT;

      // Toggle expansion state on button click.
      expandButton.onclick = () => {
        newPreElement.classList.toggle('expanded');
        expandButton.textContent = newPreElement.classList.contains('expanded')
          ? COLLAPSE_TEXT
          : EXPAND_TEXT;
      };
      buttonGroup.appendChild(expandButton);
    }

    // Add a copy button with clipboard functionality.
    const copyButton = document.createElement('button');
    copyButton.className = 'code-expander-copy';
    copyButton.textContent = COPY_TEXT;
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code);
        copyButton.textContent = COPIED_TEXT;
        setTimeout(() => {
          copyButton.textContent = COPY_TEXT;
        }, 2000);
      } catch (err) {
        console.error('Error copying content:', err);
      }
    });
    buttonGroup.appendChild(copyButton);

    // Assemble header and wrapper.
    header.appendChild(buttonGroup);
    wrapper.appendChild(header);

    // Create a new pre element for the enhanced display.
    const newPreElement = document.createElement('pre');
    if (isLongDocument) newPreElement.classList.add('collapsible');

    const newCodeElement = document.createElement('code');
    newCodeElement.textContent = code;
    newPreElement.appendChild(newCodeElement);
    wrapper.appendChild(newPreElement);

    // Replace the original code block with the enhanced version.
    const preElement = codeElement.parentNode;
    const container = document.createElement('div');
    preElement.parentNode.replaceChild(container, preElement);
    container.appendChild(wrapper);
  });
}
```

Note the key aspects of this implementation:

- Non-invasive approach: It enhances existing elements without modifying core files
- Configuration at the top: All configurable values are defined as constants at the top
- Thorough documentation: Clear comments explain the purpose and function
- Robust error handling: Try/catch blocks prevent failures from breaking the page
- Clean modularity: Each function has a single responsibility
- Performance consciousness: Uses modern APIs and efficient DOM operations

This pattern allows you to extend functionality without the risks associated with modifying core files.

When developing with EDS, you should follow specific coding standards to ensure your code is maintainable and compatible with future updates:

```
// Use configuration constants at the top of your code

const BLOCKNAME_CONFIG = {
  BOOK_TITLE: 'Code',
  ERROR_MESSAGE: 'Error loading content. Please try again.',
  COPY_BUTTON_RESET_DELAY: 2000,
  LONG_DOCUMENT_THRESHOLD: 40,
  // Add other configuration options here
};
```

When writing code that uses console output, remember to precede it with:

```
// eslint-disable-next-line no-console

console.log('Debug information');
```

This prevents ESLint errors while maintaining the ability to use console logging for debugging purposes.

## Common Implementation Challenges and Solutions

Teams developing with EDS often encounter similar challenges. Here are practical solutions to common problems (for comprehensive debugging strategies, see [Debug Guide](testing/debug.md)):

### Challenge: Analytics Implementation

**Problem**: Adding analytics without modifying core files.

**Solution**: Use the delayed.js file for analytics scripts:

```
// In delayed.js

(function() {
  // Create script element
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X';
  document.head.appendChild(script);

  // Initialize analytics

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'UA-XXXXXXXX-X');
  

  // Add custom event tracking

  document.addEventListener('click', e => {
    const target = e.target.closest('a, button');
    if (!target) return;

    

    const trackingData = {
      event_category: target.tagName.toLowerCase(),
      event_label: target.innerText || target.textContent,
    };

    if (target.href) {
      trackingData.outbound = !target.href.includes(window.location.hostname);
    }
    
    gtag('event', 'click', trackingData);
  });
})();
```

### Challenge: Dynamic Content from External APIs

**Problem**: Incorporating content from external services.

When integrating with external data sources or the EDS query-index.json, you should follow a consistent pattern for data structures. Here's an example of the expected JSON structure for data integration:

```
{

  "total": 1,
  "offset": 0,
  "limit": 1,
  "data": [
    {
      "path": "/example-path",
      "title": "Example Title",
      "image": "/path/to/image.jpg",
      "description": "Example description",
      "lastModified": "1724942455"
    }
  ],
  "type": "sheet"
}
```

**Solution**: Create a specialized block that fetches and formats the content:

```
import readBlockConfig from 'scripts/aem.js';

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const apiUrl = config.apiUrl || 'https://api.example.com/data';
  try {
    // Clear initial content.
    block.textContent = '';

    // Show loading state.
    const loading = document.createElement('div');
    loading.className = 'loading-indicator';
    loading.textContent = 'Loading content...';
    block.appendChild(loading);

    // Fetch data from the API.
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }
    const data = await response.json();

    // Remove loading state.
    loading.remove();

    // Render dynamic content.
    const container = document.createElement('div');
    container.className = 'dynamic-content';
    data.items.forEach((item) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'dynamic-item';

      const title = document.createElement('h3');
      title.textContent = item.title;
      itemEl.appendChild(title);

      const desc = document.createElement('p');
      desc.textContent = item.description;
      itemEl.appendChild(desc);

      container.appendChild(itemEl);
    });

    block.appendChild(container);
  } catch (error) {
    console.error('Error loading dynamic content:', error);
    // Clear block and display error state.
    block.textContent = '';
    const errorEl = document.createElement('div');
    errorEl.className = 'error-state';
    errorEl.textContent = 'Unable to load content. Please try again later.';
    block.appendChild(errorEl);
  }
}
```

### Challenge: Cookie Consent Implementation

**Problem**: Implementing cookie consent without modifying core files.

**Solution**: Create a cookie-consent block that's included in the template:

```
export default function decorate(block) {

  // Hide the original block
  block.style.display = 'none';

  // Check if consent already given
  if (localStorage.getItem('cookie-consent') === 'accepted') {
    // Consent already given, enable cookies/tracking
    enableTracking();
    return;
  }

  // Create consent banner
  const banner = document.createElement('div');
  banner.className = 'cookie-consent-banner';
  banner.innerHTML = `
    <div class="cookie-content">
      <p>This website uses cookies to ensure you get the best experience. 
      <a href="/privacy-policy">Learn more</a></p>
      <div class="cookie-buttons">
        <button class="accept-button">Accept</button>
        <button class="decline-button">Decline</button>
      </div>
    </div>
  `;

  // Add event listeners

  banner.querySelector('.accept-button').addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    banner.remove();
    enableTracking();
  });

  
  banner.querySelector('.decline-button').addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'declined');
    banner.remove();
  });

    // Add to page
  document.body.appendChild(banner);
}

function enableTracking() {
  // Load analytics and other tracking scripts
  const script = document.createElement('script');
  script.src = '/scripts/tracking.js';
  document.head.appendChild(script);
}
```

### Challenge: Personalization

**Problem**: Implementing personalization without complex frameworks.

**Solution**: Use local storage for simple personalization:

```
export default function decorate(block) {
  // Get or create user profile
  let userProfile = JSON.parse(localStorage.getItem('user-profile')) || {}; 

  // Track page visits
  userProfile.pageVisits = userProfile.pageVisits || [];
  userProfile.pageVisits.push({
    path: window.location.pathname,
    timestamp: Date.now(),
  });

  // Limit history length
  if (userProfile.pageVisits.length > 20) {
    userProfile.pageVisits = userProfile.pageVisits.slice(-20);
  }

  // Determine interests based on page visits
  const interests = determineInterests(userProfile.pageVisits);
  userProfile.interests = interests;

  // Save updated profile
  localStorage.setItem('user-profile', JSON.stringify(userProfile));

  // Personalize content
  personalizeContent(block, userProfile);
}
function determineInterests(pageVisits) {
  // Simple interest determination based on URL patterns
  const interests = {};
  pageVisits.forEach(visit => {
    if (visit.path.includes('/products/')) {
      interests.products = true;
    } else if (visit.path.includes('/services/')) {
      interests.services = true;
    } else if (visit.path.includes('/blog/')) {
      interests.blog = true;
    }
  });
  return interests;
}

function personalizeContent(block, userProfile) {

  // Clear block contents
  block.textContent = '';

  // Generate personalized content based on interests
  const heading = document.createElement('h2');
  heading.textContent = userProfile.interests.products 
    ? 'Products You Might Like' 
    : 'Our Popular Products';
  block.appendChild(heading);
 
  // ... additional personalized content ...
}
```

These practical solutions demonstrate how to implement common requirements within EDS's architectural constraints, without modifying core files or compromising performance.

### CSS Best Practices<br>

## CSS Injection and Selector Patterns

When developing blocks in EDS, remember that block-specific CSS is injected only when the block is present on the page. This means you don't need to use complex selectors like \`:has()\` or sibling selectors (\`\~\`, \`+\`) to target elements when the block is present. Instead, use direct selectors since the CSS will only be loaded when the block exists. For example, if you need to hide the header and footer when your block is present, simply use \`header, footer { display: none; }\` rather than complex selectors like \`header:has(+ .your-block)\`. This approach is more maintainable, performs better, and follows the principle that block CSS is scoped to its specific use case.

### More CSS Rules

- **Block Isolation**: Every CSS selector in a block's CSS should only apply to that block
- **Structure with Flexbox/Grid**: Modern CSS layout techniques create responsive designs
- **Mobile-First Approach**: Base styles for mobile, then add media queries for larger screens
- **Consistent Class Naming**: Follow patterns like .blockname-element-state
- **Use CSS Variables**: Leverage custom properties for consistent theming
- **Never Style Container**: Don't apply styles directly to .block-name-container
- **Support Variations**: Handle block variations through class combinations
- **Ensure Responsiveness**: Include responsive design for different screen sizes

```
/* Block-specific styles should be isolated */

.myblock {
  /* Only apply to elements within .myblock */
  padding: 20px;
}

/* Don't let selectors become too complex */

.myblock > div > div > p {
  /* AVOID: Too specific and fragile */
}

/* Mobile-first approach without initial media queries */
myblock.columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

/* Standard breakpoints at 600px, 900px, 1200px */

@media (min-width: 600px) {
  .columns {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .columns {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Use CSS variables for theming and configuration */

:root {
  --primary-color: #1473e6;
  --heading-font: 'Adobe Clean', sans-serif;
  --body-font: 'Adobe Clean', sans-serif;
  --spacing-m: 16px;
}

myblock.button {
  background-color: var(--primary-color);
  font-family: var(--body-font);
  padding: var(--spacing-m);
}
```

Key principles to follow:

- **Simplicity**: "Don't let your CSS Selectors become complex and unreadable"
- **Mobile First**: "Your CSS without media query should render a mobile site"
- **Standard Breakpoints**: "Generally use 600px, 900px and 1200px as your breakpoints, all min-width"
- **Variable-Based Configuration**: Use CSS variables for theme colors, spacing, and other configurable values
- **Block Isolation:** Every CSS selector in the .css of a block only applies to the block Container elements in EDS must never have styles applied to them directly. While containers (elements with class names ending in -container) are an expected part of the EDS architecture and serve important structural purposes, applying CSS to these elements violates core EDS principles and creates maintenance challenges. Developers should treat the -container suffix as a signal that an element is for structure only and should remain visually unstyled.
- **Create properly named elements** inside containers instead of styling the containers themselves, when styles need to be applied to large content areas,. For example, rather than styling a blockname-container, create a blockname-area or blockname-content element within it to hold those styles. This pattern maintains clean separation between document structure and visual presentation, making blocks more maintainable and compatible with future EDS updates.  A class name blockname is obviously ok, it will not conflict.
- **Always namespace class names with the block's name to prevent conflicts** with other components or global styles. Avoid using generic class names like .header, .content, or .area, which could easily conflict with other blocks or page elements. Instead, follow the pattern of blockname-feature-state (e.g., slideshow-button-active rather than just button-active). This namespacing ensures your styles remain isolated to your block and prevents unexpected behavior when multiple blocks are used on the same page.

### EDS JavaScript Best Practices

The JavaScript approach in EDS emphasizes simplicity and performance. It's recommended to adhere to Airbnb's JavaScript Style Guide to ensure clean, maintainable code. This widely-adopted style guide provides consistent conventions for variable naming, function declarations, object creation, conditional statements, error handling, and comments.

```
// Configuration variables at the top

const CONFIG = {
  ANIMATION_DURATION: 300,
  MAX_ITEMS: 12,
  API_ENDPOINT: '/query-index.json',
};

// Use async/await for cleaner asynchronous code
export default async function decorate(block) {
  try {
    // Fetch data asynchronously

    const response = await fetch(CONFIG.API_ENDPOINT);
    const data = await response.json();
 
    // Process data

    const filteredItems = data.data
      .filter(item => item.type === 'blog')
      .slice(0, CONFIG.MAX_ITEMS);
    // Update UI
    renderItems(block, filteredItems);
  } catch (error) {
    // Handle errors gracefully
    // eslint-disable-next-line no-console
    console.error('Error loading content:', error);
    renderErrorState(block);
  }
}

// Break logic into focused functions

function renderItems(block, items) {
  // Clear existing content
  block.textContent = '';

  // Create container
  const container = document.createElement('div');
  container.className = 'items-container';
```

```
  // Add items
  items.forEach(item => {
    container.appendChild(createItemElement(item));
  });
```

```
  // Add to DOM
  block.appendChild(container);
}

function createItemElement(item) {
  // Create element for single item
  // ...
}

function renderErrorState(block) {
  // Show user-friendly error state
  // ...
}
```

Key principles:

- **Keep It Simple**: "Frameworks often introduce web performance issues... while trying to address trivial problems"
- **Modern Features**: "Make sure the features you are using are well supported by evergreen browsers"
- **Configuration at Top**: Place all configurable values in a config object at the top
- **Function Separation**: Each function should have a single responsibility
- **Error Handling**: Always include robust error handling
- **Asynchronous Best Practices**: Use async/await for cleaner asynchronous code

### Content Structure Best Practices

How content is structured in documents significantly impacts both authoring experience and website performance:

- **Minimize Blocks**: "Blocks are not great for authoring... It is definitely an anti-pattern to have things that are represented natively as default content and put them into a block." Use blocks only when necessary for specialized components.

* **No Nested Blocks**: "Nested blocks are definitely a lot worse" for authoring experience. Keep block structure flat for easier authoring.

- **Use Full URLs**: "Authors (and most humans) often think of a URL as an opaque token... It is always advisable to just let authors work with fully qualified URLs." Don't try to normalize or transform URLs unnecessarily.

* **Reuse Standards**: "The EDS Block Collection is a great source for well designed content models." Don't reinvent the wheel—use existing patterns when possible.

- **Progressive Enhancement**: Start with the simplest possible implementation and enhance as needed, rather than building complex solutions from the start.

### Documentation Best Practices

Comprehensive documentation is crucial for block maintainability:

```
/blocks/myblock/
├── myblock.js
├── myblock.css
├── README.md           # Comprehensive documentation
├── example.md          # Simple copy-paste example for devs
└── demo.md             # More complex real-world usage examples
```

README.md should include:

- Purpose and functionality
- Configuration options
- Usage instructions for authors
- Accessibility considerations
- Performance impact
- Variations and examples

This comprehensive documentation approach ensures both developers and content authors can effectively work with your blocks.

## Advanced Techniques

### Dynamic Content with Query Index

EDS provides a powerful indexing system for creating dynamic content:

```
async function loadContent() {
  try {
    // Fetch the indexed content from the endpoint.
    const response = await fetch('/query-index.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    // Await the parsing of the JSON response.
    const data = await response.json();

    // Filter for items with a '/blogs/' path.
    const filteredItems = data.data.filter((item) =>
      item.path.includes('/blogs/')
    );

    // Sort items based on the lastModified date in descending order.
    const sortedItems = filteredItems.sort((a, b) =>
      new Date(b.lastModified) - new Date(a.lastModified)
    );

    // Generate HTML for each item.
    const html = sortedItems
      .map(
        (item) => `
      <article>
        <h3><a href="${item.path}">${item.title}</a></h3>
        <p>${item.description}</p>
      </article>
    `
      )
      .join('');

    // Update the container's innerHTML with the generated content.
    container.innerHTML = html;
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

loadContent();
```

This technique is used in the BlogList block to create dynamic content listings without requiring authors to manually update links.

### Auto Blocking

Auto blocking programmatically creates blocks based on content patterns:

```
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // If h1 follows picture in the DOM
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}
```

This allows you to automatically enhance document patterns without requiring authors to create block tables.

## Important note

When creating, or modifying blocks, treat the following files as read-only

```
styles/
├── fonts.css
├── lazy-styles.css
└── styles.css
fonts/
├── roboto-bold.woff2
└── roboto-regular.woff2
scripts/
├── aem.js
├── delayed.js
└── scripts.js
```

## Block  Examples

To help you get started with EDS development, here are some additional block implementations showcasing different patterns and techniques.

### Fortune Cookie Block

A simple block that fetches and displays random quotes:

```
export default async function decorate(block) {
    const fortuneCookieElement = document.querySelector('.fortunecookie');
    const url = '/data/cookies.json';
    try {
        const response = await fetch(url);
        const data = await response.json();
        const dataArray = data.data;
        const randomIndex = Math.floor(Math.random() * dataArray.length);
        const randomItem = dataArray[randomIndex];
        const content = `<p><strong>${randomItem.key}:</strong> ${randomItem.value}</p>`;
        fortuneCookieElement.innerHTML = content;
    } catch (error) {

        // eslint-disable-next-line no-console
        console.error('Error fetching the JSON data:', error);
    }
}
```

This block demonstrates fetching JSON data and using it to update content dynamically.

### Index Block

A block that builds a table of contents for the page:

```
export default function decorate(block) {
  const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const indexBlock = document.querySelector('.index');

  // Create the index header
  const indexHeader = document.createElement('div');
  indexHeader.className = 'index-header';
  indexHeader.innerHTML = `
    <span>Index</span>
    <i class='arrow down'></i>
  `;
  

  // Create the index content container
  const indexContent = document.createElement('div');
  indexContent.className = 'index-content';

  // Append the index header and content container to the index block
  indexBlock.appendChild(indexHeader);
  indexBlock.appendChild(indexContent);
  let isIndexBuilt = false; // Flag to track if the index has been built
  indexHeader.addEventListener('click', () => {
    if (!isIndexBuilt) {
      buildIndex();
      isIndexBuilt = true; // Set the flag to true after building the index
      indexContent.style.display = 'none';
    }

    if (indexContent.style.display === 'none') {
      indexContent.style.display = 'block';
      indexHeader.querySelector('.arrow').style.transform = 'rotate(-135deg)';
    } else {
      indexContent.style.display = 'none';
      indexHeader.querySelector('.arrow').style.transform = 'rotate(45deg)';
    }
  });

  function buildIndex() {
    const indexContent2 = document.querySelector('.index-content');

    const ul = document.createElement('ul');
    headers.forEach((header, index) => {
      const id = `header-${index}`;
      header.id = id;
      const li = document.createElement('li');
      li.style.marginLeft = `${(parseInt(header.tagName[1], 10) - 1) * 20}px`;
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = header.textContent;
      li.appendChild(a);
      ul.appendChild(li);
    });
    indexContent2.innerHTML = '';
    indexContent2.appendChild(ul);
  }
}
```

The CSS for this block creates a collapsible interface:

```
.index {
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
}

.index-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.arrow {
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transition: transform 0.3s;
}

.down {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

.index-content {
    display: none;
    margin-top: 10px;
}

.index-content ul {
    list-style-type: none;
    padding: 0;
}

.index-content ul li {
    margin-bottom: 5px;
}

.index-content ul li a {
    text-decoration: none;
    color: #333;
}
```

This block demonstrates:

- Lazy initialization (only building the index when needed)
- Dynamic DOM manipulation
- Interactive UI elements
- Content discovery enhancement

### Return To Top Block

A utility block that provides a "scroll to top" button:

```
export default async function decorate(block) {
  const returnToTopButton = document.querySelector('.returntotop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      returnToTopButton.style.display = 'block';
    } else {
      returnToTopButton.style.display = 'none';
    }
  });

  // Scroll to top when the button is clicked
  returnToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
```

}

With accompanying CSS:

```
.returntotop {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
    text-align: center;
    border-radius: 5px;
    text-decoration: none;
    font-size: 14px;
    display: none;
}

.returntotop:hover {
    background-color: #0056b3;
}
```

This simple utility block demonstrates:

- Event handling
- Fixed positioning
- User experience enhancement
- Conditional display based on scroll position

These examples showcase the variety of functionality that can be implemented as blocks in Edge Delivery Services, from content enhancement to user interface improvements, all without modifying core files.

## Conclusion

### Document-First Content Management

EDS fundamentally reverses the traditional CMS paradigm—instead of forcing authors to adapt to technical constraints, it adapts technical implementation to how authors naturally work. This philosophical shift has profound implications:

- **Natural Authoring Flow**: Authors use familiar tools (Google Docs, Word) without needing to understand web technologies
- **Separation of Concerns**: Content creation and technical implementation remain cleanly separated
- **Focus on Content**: The emphasis stays on the content itself, not on the technical container

As the documentation states: "In an ideal situation the majority of content is authored outside of blocks, as introducing tables into a document makes it harder to read and edit." This content-first approach challenges the component-first mentality that dominates most CMS platforms.

### Simplicity Over Complexity

Throughout EDS's implementation, there's a relentless focus on simplicity:

- **No Build Process**: Direct JavaScript and CSS without transpilation or processing
- **No Dependencies**: No external libraries or frameworks to manage
- **Clear Structure**: Well-defined roles for each part of the codebase
- **Minimal Core**: Small, focused JavaScript files that do specific jobs well

This simplicity-first approach delivers tremendous benefits in terms of maintainability, performance, and developer onboarding. Rather than relying on complex toolchains and frameworks, EDS pushes developers to solve problems directly with fundamental web technologies.

### Performance by Design

EDS doesn't treat performance as an afterthought or something to be optimized later—it's built into the core architecture:

- **Three-Phase Loading**: The E-L-D pattern ensures critical content loads first
- **Resource Optimization**: Automatic image optimization, responsive images, and format selection
- **Minimal JavaScript**: No heavy frameworks or unnecessary code
- **Progressive Enhancement**: Core content works even before enhancement scripts run
- **Smart Prioritization**: Resources load based on visibility and importance

This architecture consistently delivers perfect Lighthouse scores (100/100/100/100), something many development teams struggle to achieve even with significant optimization efforts.

### Empowering Both Authors and Developers

The EDS approach creates a system where:

- Authors can focus on creating great content in familiar tools
- Developers can build powerful functionality without disrupting content workflows
- Both teams can work simultaneously without blocking each other

This balance is rare in content management systems, which tend to prioritize either developer experience or author experience at the expense of the other.

### The Expander Pattern for Extension

Perhaps most importantly, EDS promotes the "expander" pattern for extending functionality without modifying core files. This pattern:

- **Preserves Upgradeability**: Core files remain untouched, allowing easy upgrades
- **Maintains Separation**: Custom functionality stays isolated and self-contained
- **Encourages Modularity**: Extensions are organized into distinct, focused blocks
- **Supports Selective Loading**: Extensions can be conditionally applied based on page type

By embracing this pattern, development teams can add sophisticated functionality—analytics, personalization, third-party integrations—without the risk and maintenance burden of modifying core files.

## Using this document with AI

This post [formatted as markdown](https://allabout.network/blogs/ddt/adobe-edge-delivery-services-full-guide-for-devs-architects-and-ai.md)  can assist in building EDS Components using AI tools like cursor and claude.  A shorter version is here <https://allabout.network/docs/eds.txt>

Add the MD file/ text file (your choice) to docs in cursor settings -> features -> docs.

\
![][image4]\
\
![][image5]

It will then be able to be referenced during Cursor Chats

![][image6]

If you prefer to use Claude Projects, add the markdown as project knowledge, other IDEs/AI use similar patterns.\
\
![][image7]

Now that you have the AI assistant setup you can create new block by setting up the block structure and populating it with a README.md explaining the functionality to the reader (The AI in this case)\
\
As an example we might want to create a markdown block

+------------------------------------------------------------------------------------------------------------------+
| markdown                                                                                                         |
+------------------------------------------------------------------------------------------------------------------+
| \# Markdown Block                                                                                                |
|                                                                                                                  |
| This block processes and displays markdown content within a styled container.                                    |
|                                                                                                                  |
| \## Usage                                                                                                        |
|                                                                                                                  |
| To use the Markdown block, create a table in your document with "Markdown" in the first cell. The content in the |
| cells below will be processed as markdown and displayed in a light blue box with rounded corners and a 2px thick |
| border.                                                                                                          |
|                                                                                                                  |
| \| Markdown \|                                                                                                   |
|                                                                                                                  |
| \|----------\|                                                                                                   |
|                                                                                                                  |
| \| Your markdown content here \|                                                                                 |
|                                                                                                                  |
| \## Authoring                                                                                                    |
|                                                                                                                  |
| When creating content for the Markdown block in Google Docs or Microsoft Word:                                   |
|                                                                                                                  |
| 1\. Create a table with at least two rows.                                                                       |
|                                                                                                                  |
| 2\. In the first cell of the first row, type "Markdown".                                                         |
|                                                                                                                  |
| 3\. In the cells below, add your markdown content.                                                               |
|                                                                                                                  |
| 4\. The block will automatically process and display the markdown content.                                       |
|                                                                                                                  |
| \## Styling                                                                                                      |
|                                                                                                                  |
| The Markdown block uses CSS variables for easy customization:                                                    |
|                                                                                                                  |
| \- \`--markdown-bg-color\`: Background color of the container (default: light blue)                              |
|                                                                                                                  |
| \- \`--markdown-border-color\`: Border color of the container (default: blue)                                    |
|                                                                                                                  |
| \- \`--markdown-border-radius\`: Border radius of the container (default: 8px)                                   |
|                                                                                                                  |
| \- \`--markdown-padding\`: Padding inside the container (default: 20px)                                          |
+------------------------------------------------------------------------------------------------------------------+

Create this in /blocks/markdown/README.md then ask the AI to implement it.

![][image8]

No doubt you will make adjustments as the AI does it work, at the end ask it to update/blocks/README.md and you will have developer and content author documentation.

### Final Thoughts

Edge Delivery Services represents a refreshing perspective in web development—one that challenges many contemporary assumptions about how websites should be built and managed. By embracing document-based authoring, prioritizing performance by design, and promoting clean separation between content and code, EDS delivers a compelling alternative to traditional CMS platforms.

For developers accustomed to component-based systems and complex build processes, EDS might initially feel constraining. However, these constraints often foster creativity and focus attention on solving real problems rather than managing tooling complexity. The result is websites that are faster, more maintainable, and more author-friendly.

As you implement your own EDS projects, remember these key principles:

- **Respect the Document**: Prioritize the natural flow of document-based authoring
- **Embrace Constraints**: Let EDS's limitations guide you toward simpler, more effective solutions
- **Performance First**: Consider performance implications in every decision
- **Don't Modify Core Files**: Use the expander pattern for extensions
- **Document Everything**: Create comprehensive documentation for blocks and systems
- Use **AIRBNB style guide:**  Keep everything clean

By following these principles, you'll create websites that achieve the rare combination of excellent performance, maintainable code, and superior authoring experience that Edge Delivery Services makes possible.

## See Also

### Essential Development Guides
- **[Block Architecture Standards](implementation/block-architecture-standards.md)** - Comprehensive standards for EDS block development including naming conventions, file structure, and coding patterns
- **[Raw EDS Blocks Guide](implementation/raw-eds-blocks-guide.md)** - Step-by-step guide to creating simple EDS blocks using vanilla JavaScript and minimal dependencies
- **[Complex EDS Blocks Guide](implementation/complex-eds-blocks-guide.md)** - Advanced block development with build tools, external dependencies, and sophisticated patterns
- **[Project Structure](project-structure.md)** - Understanding the overall EDS project organization and file conventions

### Implementation & Testing
- **[Debug Guide](testing/debug.md)** - Comprehensive debugging strategies for EDS blocks and common troubleshooting scenarios
- **[Testing Strategies](testing-strategies.md)** - Testing approaches for EDS blocks including unit tests and integration testing
- **[Performance Optimization](performance-optimization.md)** - Techniques for optimizing EDS block performance and loading
- **[Browser Compatibility](browser-compatibility.md)** - Ensuring cross-browser compatibility for EDS implementations

### Advanced Topics
- **[Web Components with EDS](web-components-with-eds.md)** - Integrating modern web components within the EDS framework
- **[CSS Patterns](css-patterns.md)** - Common CSS patterns and styling approaches for EDS blocks
- **[JavaScript Patterns](javascript-patterns.md)** - Reusable JavaScript patterns for EDS block development
- **[Block Examples](block-examples.md)** - Real-world examples of successful EDS block implementations

### Content & Authoring
- **[Content Authoring Guide](content-authoring-guide.md)** - Best practices for content authors working with EDS
- **[Document Structure Guide](document-structure-guide.md)** - Guidelines for structuring documents for optimal EDS transformation
- **[Metadata Management](metadata-management.md)** - Managing page metadata and SEO optimization in EDS

## Next Steps

### For New EDS Developers
1. **Master the fundamentals** by thoroughly understanding this comprehensive guide
2. **Set up your development environment** following [Project Structure](project-structure.md) guidelines
3. **Create your first simple block** using the [Raw EDS Blocks Guide](implementation/raw-eds-blocks-guide.md)
4. **Learn the standards** by studying [Block Architecture Standards](implementation/block-architecture-standards.md)
5. **Practice with examples** from [Block Examples](block-examples.md) to see different implementation patterns

### For Experienced Web Developers
1. **Understand the paradigm shift** from traditional CMS to document-first development
2. **Master the enhancement patterns** shown in the advanced examples throughout this guide
3. **Explore complex implementations** with [Complex EDS Blocks Guide](implementation/complex-eds-blocks-guide.md)
4. **Implement performance optimizations** using [Performance Optimization](performance-optimization.md) techniques
5. **Contribute to testing strategies** by developing comprehensive test suites following [Testing Strategies](testing-strategies.md)

### For Architects & Technical Leads
1. **Establish team development standards** using [Block Architecture Standards](implementation/block-architecture-standards.md) as a foundation
2. **Plan project structure** following [Project Structure](project-structure.md) recommendations
3. **Design testing and debugging workflows** using [Debug Guide](testing/debug.md) and [Testing Strategies](testing-strategies.md)
4. **Create performance monitoring strategies** with [Performance Optimization](performance-optimization.md) metrics
5. **Develop content authoring guidelines** for your team using [Content Authoring Guide](content-authoring-guide.md)

### For Content Authors & Editors
1. **Learn document structuring** with [Document Structure Guide](document-structure-guide.md)
2. **Master content authoring** using [Content Authoring Guide](content-authoring-guide.md) best practices
3. **Understand metadata management** through [Metadata Management](metadata-management.md)
4. **Collaborate effectively** with developers by understanding the EDS transformation process outlined in this guide

### For AI & Automation Specialists
1. **Use this guide as training data** for AI-assisted EDS development
2. **Implement automated testing** following [Testing Strategies](testing-strategies.md) patterns
3. **Create content generation workflows** that respect EDS document-first principles
4. **Develop performance monitoring** using the metrics and techniques described in [Performance Optimization](performance-optimization.md)

