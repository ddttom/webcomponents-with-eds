# Shoelace Block

## Overview

A web component integration block that provides seamless integration with Shoelace design system components in Adobe Edge Delivery Services (EDS) projects. The Shoelace block enables progressive enhancement with modern web components, lazy loading of the Shoelace library, and performance-optimized delivery of accessible design system components.

## Content Structure

To use the Shoelace block in your EDS project, create a block with the following structure:

### Example Table Structure

| Shoelace |
|----------|
| button   |

The content cell specifies which Shoelace component to render. Supported components include buttons, inputs, cards, and other Shoelace elements.

### Authoring in Google Docs

When creating content for the Shoelace block in Google Docs or Microsoft Word:

1. Create a table with two rows
2. In the first cell of the first row, type "Shoelace"
3. In the cell below, specify the component type (e.g., "button", "input", "card")
4. The block will automatically load and render the appropriate Shoelace component

### Supported Component Examples

| Shoelace |
|----------|
| button   |

| Shoelace |
|----------|
| input    |

| Shoelace |
|----------|
| card     |

## Variations

The Shoelace block supports various component types and can be configured through content authoring and data attributes:

### Component Variations
- **button**: Renders `sl-button` components
- **input**: Renders `sl-input` components  
- **card**: Renders `sl-card` components
- **icon**: Renders `sl-icon` components
- **badge**: Renders `sl-badge` components

### Variation Examples

| Shoelace (primary) |
|--------------------|
| button             |

| Shoelace (large) |
|------------------|
| input            |

## Configuration Options

The Shoelace block can be configured through multiple methods:

### Content Authoring Configuration
- **Component Type**: Specified in the content cell
- **Variations**: Added as parameters in parentheses
- **Data Attributes**: Component properties via data attributes

### CSS Custom Properties
```css
.shoelace {
  --sl-color-primary-600: #1473e6;
  --sl-color-neutral-0: #ffffff;
  --sl-border-radius-medium: 0.375rem;
  --sl-spacing-medium: 1rem;
}
```

### JavaScript Configuration
```javascript
// Advanced usage with custom configuration
const shoelaceBlock = document.querySelector('.shoelace.block');
shoelaceBlock.setAttribute('data-component-props', JSON.stringify({
  variant: 'primary',
  size: 'large',
  disabled: false
}));
```

### Theming Integration
- **Shoelace Design Tokens**: Full access to Shoelace's design token system
- **EDS Theme Integration**: Seamless integration with EDS theme variables
- **Custom CSS Overrides**: Support for custom styling and brand customization

## Accessibility Considerations

The Shoelace block maintains high accessibility standards through:

### Built-in Accessibility Features
- **Shoelace Accessibility**: Leverages Shoelace's comprehensive accessibility features
- **ARIA Attributes**: Proper ARIA attributes automatically applied
- **Keyboard Navigation**: Full keyboard navigation support across all components
- **Screen Reader Compatibility**: Optimized for screen readers and assistive technologies
- **Focus Management**: Proper focus indicators and management
- **High Contrast Support**: Compatible with high contrast modes and themes

### Accessibility Standards
- WCAG 2.1 AA compliance through Shoelace components
- Semantic HTML structure maintained
- Color contrast ratios meet accessibility guidelines
- Keyboard shortcuts and navigation patterns
- Screen reader announcements and labels

## Performance Impact

The Shoelace block is optimized for performance with several key strategies:

### Loading Optimization
- **Lazy Loading**: Shoelace library loaded only when needed
- **Component-Specific Loading**: Only loads required components, not entire library
- **CDN Delivery**: Efficient delivery via Shoelace CDN
- **Caching Strategy**: Proper caching headers for optimal performance
- **Progressive Enhancement**: Works without JavaScript, enhanced with components

### Performance Characteristics
- **Minimal Bundle Impact**: No impact on initial page load
- **Efficient DOM Manipulation**: Optimized component rendering
- **Memory Management**: Proper cleanup and memory management
- **Network Optimization**: Reduced network requests through intelligent loading

### Performance Metrics
- First Contentful Paint: No impact (lazy loaded)
- Largest Contentful Paint: Minimal impact
- Cumulative Layout Shift: Prevented through proper sizing
- Time to Interactive: Enhanced through progressive loading

## Dependencies

The Shoelace block has specific dependencies and requirements:

### External Dependencies
- **Shoelace Library**: Loaded from CDN (https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace)
- **Web Components Support**: Modern browser support for Custom Elements
- **ES6+ JavaScript**: Modern JavaScript features required
- **CSS Custom Properties**: CSS Variables support needed

### Browser Support
- **Chrome 54+**: Full support for all features
- **Firefox 63+**: Complete compatibility
- **Safari 10.1+**: Full web components support
- **Edge 79+**: Modern Edge with Chromium engine

### EDS Framework Requirements
- Standard EDS block structure and decoration pattern
- EDS CSS framework for base styling
- Compatible with EDS lazy loading and performance patterns

### Network Requirements
- **CDN Access**: Requires access to Shoelace CDN
- **CSP Headers**: Proper Content Security Policy headers for external resources
- **HTTPS**: Secure delivery of external components

## Known Limitations

Current limitations and troubleshooting information:

### Functional Limitations
1. **CDN Dependency**: Requires external CDN access for Shoelace library
2. **Component Subset**: Not all Shoelace components may be supported
3. **Version Lock**: Tied to specific Shoelace library version
4. **Customization Limits**: Some deep customization may require additional CSS
5. **Bundle Size**: Adds external dependency weight when components are used

### Build Process and Development Workflows

#### Standalone Implementations

The Shoelace block includes standalone implementations for complex components:

**Shoelace Card Component**: A standalone version has been created in [`build/shoelace-card/`](../../build/shoelace-card/) that exports a `decorate` function for direct use.

> **🔧 Development Approach Note**: The [`build/shoelace-card/`](../../build/shoelace-card/) directory represents a **complex component approach** that uses build processes and external dependencies, which differs from the standard EDS philosophy of simple JavaScript. This dual approach allows for both simple EDS blocks and sophisticated components when advanced functionality is required.

#### Development Workflows

**Standalone Development**:
```bash
# Vite development server for component development
cd build/shoelace-card
npm run dev  # http://localhost:5174
```

**EDS Integration Testing**:
```bash
# Node.js server for EDS compatibility testing
npm run debug  # http://localhost:3000 (from project root)
```

**Build and Deployment**:
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

### Common Issues and Solutions

**Component not rendering:**
- Check that the component name is valid and supported
- Ensure network connectivity for CDN resources
- Verify browser support for web components
- Check console for loading errors

**Styling not applying:**
- Check CSS custom properties are properly defined
- Verify Shoelace theme is properly loaded
- Ensure no conflicting styles override component CSS
- Validate CSP headers allow external stylesheets

**Performance issues:**
- Verify lazy loading is working correctly
- Check network tab for unnecessary resource loading
- Ensure proper caching headers are set
- Monitor for memory leaks in long-running applications

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

### Testing Workflow
1. **Start EDS Server**: `npm run debug`
2. **Access Test**: `http://localhost:3000/blocks/shoelace-card/test.html`
3. **Verify Structure**: Component works with EDS block structure
4. **Deploy**: `npx node scripts/build-component.js shoelace-card`

### Integration Requirements
To integrate with your EDS project:
1. Copy the shoelace block files to your blocks directory
2. Ensure proper CSP headers for Shoelace CDN
3. Configure any custom styling or theming
4. Test components in your target browsers
5. Verify performance impact in production environment
