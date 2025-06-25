# Shoelace Block

A web component integration block that provides seamless integration with Shoelace design system components in Adobe Edge Delivery Services (EDS) projects.

## Features

- Progressive enhancement with Shoelace web components
- Lazy loading of Shoelace library
- Custom styling support
- EDS-compatible implementation
- Performance optimized loading
- Accessible design system components
- Modern web standards compliance

## Usage

To use the Shoelace block in your EDS project, create a block with the following structure:

| Shoelace |
|----------|
| button   |

The content cell specifies which Shoelace component to render. Supported components include buttons, inputs, cards, and other Shoelace elements.

## Authoring

When creating content for the Shoelace block in Google Docs or Microsoft Word:

1. Create a table with two rows
2. In the first cell of the first row, type "Shoelace"
3. In the cell below, specify the component type (e.g., "button", "input", "card")
4. The block will automatically load and render the appropriate Shoelace component

## Styling

The Shoelace block supports custom styling through:

- CSS custom properties for theming
- Shoelace's built-in design tokens
- Custom CSS overrides
- EDS theme integration

## Behavior

The Shoelace block:

1. Detects the requested component type from content
2. Lazy loads the Shoelace library when needed
3. Renders the appropriate web component
4. Applies custom styling and theming
5. Maintains accessibility standards
6. Provides progressive enhancement

## Performance

The block is optimized for performance:

- Lazy loading of Shoelace library
- Component-specific loading (only loads what's needed)
- Efficient DOM manipulation
- Minimal bundle size impact
- CDN-based delivery for Shoelace assets

## Browser Support

This block uses modern web standards and should work in all modern browsers that support:

- Custom Elements
- ES6+ JavaScript features
- CSS Custom Properties
- Dynamic imports

## Troubleshooting

Common issues and solutions:

1. Component not rendering
   - Check that the component name is valid
   - Ensure network connectivity for CDN resources
   - Verify browser support for web components

2. Styling not applying
   - Check CSS custom properties are defined
   - Verify Shoelace theme is properly loaded
   - Ensure no conflicting styles

3. Performance issues
   - Verify lazy loading is working correctly
   - Check network tab for unnecessary resource loading
   - Ensure proper caching headers

## Supported Components

The block supports various Shoelace components:

- Buttons (`sl-button`)
- Inputs (`sl-input`)
- Cards (`sl-card`)
- Icons (`sl-icon`)
- Badges (`sl-badge`)
- And many more from the Shoelace library

## Standalone Implementations

### Shoelace Card Component

A standalone version of the Shoelace Card component has been created in [`build/shoelace-card/`](../build/shoelace-card/) that exports a `decorate` function for direct use. This implementation:

> **🔧 Development Approach Note**: The [`build/shoelace-card/`](../build/shoelace-card/) directory represents a **complex component approach** that uses build processes and external dependencies, which differs from the standard EDS philosophy of simple JavaScript. This dual approach allows for both simple EDS blocks and sophisticated components when advanced functionality is required.

- **Self-contained**: Uses local utility functions instead of EDS dependencies
- **Development optimized**: Clean Vite integration without warnings
- **Production ready**: Maintains full compatibility with Adobe Edge Delivery Services
- **Standalone usage**: Can be imported and used independently

```javascript
import decorate from './build/shoelace-card/shoelace-card.js';

// Use directly on any DOM element
const cardBlock = document.querySelector('.my-card-container');
await decorate(cardBlock);
```

The standalone version demonstrates how to create reusable Shoelace components that work both within EDS projects and as independent modules.

## Build Process and EDS Testing

### Development Workflows

#### Standalone Development
```bash
# Vite development server for component development
cd build/shoelace-card
npm run dev  # http://localhost:5174
```
Perfect for rapid component development with hot reload and modern tooling.

#### EDS Integration Testing
```bash
# Node.js server for EDS compatibility testing
npm run debug  # http://localhost:3000 (from project root)
```
Tests component with proper EDS block structure using the development server that mimics EDS environment.

#### Build and Deployment
```bash
# Automated build and deploy to EDS
npx node scripts/build-component.js shoelace-card

# Alternative using npm scripts
cd build/shoelace-card && npm run build:component
```

### EDS Testing Requirements

**Critical: Test files must use exact EDS block structure**

```html
<!-- Required EDS Structure -->
<div class="shoelace-card block" data-block-name="shoelace-card" data-block-status="initialized">
    <div>
        <div>
            <p>Test content</p>
        </div>
    </div>
</div>

<!-- JavaScript must target .block-name.block -->
<script>
const blocks = document.querySelectorAll('.shoelace-card.block');
blocks.forEach(block => decorate(block));
</script>
```

### Testing Workflow

1. **Start EDS Server**: `npm run debug`
2. **Access Test**: `http://localhost:3000/blocks/shoelace-card/test.html`
3. **Verify Structure**: Component works with EDS block structure
4. **Deploy**: `npx node scripts/build-component.js shoelace-card`

### NPX Commands Reference

```bash
# Development server for EDS testing
npm run debug

# Build and deploy component
npx node scripts/build-component.js shoelace-card

# Standalone development
cd build/shoelace-card && npm run dev

# Alternative HTTP server (basic file serving)
npm run serve
```

## Configuration

The block can be configured through:

- Content authoring (component type)
- CSS custom properties (styling)
- Data attributes (component properties)
- JavaScript configuration (advanced usage)

## Accessibility

The Shoelace block maintains accessibility through:

- Shoelace's built-in accessibility features
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- High contrast support

## Integration

To integrate with your EDS project:

1. Copy the shoelace block files to your blocks directory
2. Ensure proper CSP headers for Shoelace CDN
3. Configure any custom styling or theming
4. Test components in your target browsers
