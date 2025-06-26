# Shoelace Card Block

## Overview

A modern, self-contained card component for Adobe Edge Delivery Services that displays dynamic content with numbered badges and immersive modal overlays. The Shoelace Card block creates beautiful, interactive cards that load content dynamically from your published EDS pages, featuring professional loading states, FOUC elimination, and integrated modal headers with ESC buttons.

## Content Structure

To use the Shoelace Card block in your EDS project, create a block with the following structure:

### Example Table Structure

| shoelace-card |
| :------------ |

This will display cards using data from `/slides/query-index.json`.

### Custom Data Source

| shoelace-card              |
| :------------------------- |
| /products/query-index.json |

### Content Organization Structure

Organize your content in a folder structure:

```
/slides/
├── slide-1.md
├── slide-2.md  
├── slide-3.md
├── query-index.xlsx
└── media/
    ├── image1.jpg
    ├── image2.jpg
    └── image3.jpg
```

### Query Index Spreadsheet Structure

Create `index` sheet with these columns, and publish, or use automatic publishing as documented in https://allabout.network/blogs/ddt/integrations/building-headless-applications-with-edge-delivery-services


| path            | title            | description                  | image                    | buttonText   |
| --------------- | ---------------- | ---------------------------- | ------------------------ | ------------ |
| /slides/slide-1 | Amazing Product  | Discover incredible features | /slides/media/image1.jpg | Learn More   |
| /slides/slide-2 | Customer Success | Real stories from customers  | /slides/media/image2.jpg | Read Stories |
| /slides/slide-3 | Get Started      | Begin your journey today     | /slides/media/image3.jpg | Start Now    |

## Variations

The Shoelace Card block supports different content types and use cases:

### Content Type Variations
- **Product Showcase**: Display products with specifications and features
- **Team Profiles**: Show team member information and backgrounds
- **Case Studies**: Present customer success stories and results
- **Service Offerings**: Highlight different services and capabilities
- **Blog Articles**: Feature blog posts and articles

### Variation Examples

**Product Showcase**:
| shoelace-card              |
| :------------------------- |
| /products/query-index.json |

**Team Profiles**:
| shoelace-card          |
| :--------------------- |
| /team/query-index.json |

**Case Studies**:
| shoelace-card                  |
| :----------------------------- |
| /case-studies/query-index.json |

## Configuration Options

The Shoelace Card block offers extensive configuration through content structure and CSS customization:

### Content Configuration
- **Data Source Path**: Specify custom query-index.json location
- **Card Content**: Control title, description, image, and button text
- **Modal Content**: Full page content loaded dynamically
- **Image Optimization**: Support for responsive images and formats

### CSS Custom Properties
```css
.shoelace-card {
  --card-border-radius: 12px;
  --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --card-background: #ffffff;
  --card-text-color: #333333;
  --modal-background: rgba(0, 0, 0, 0.8);
  --modal-content-background: #ffffff;
  --loading-spinner-color: #007bff;
}
```

### Content Guidelines
**Titles**: Keep short and engaging (2-6 words), use action-oriented language
**Descriptions**: Limit to 1-2 sentences, focus on key benefits
**Images**: Use high-quality images (minimum 400px wide), optimize for web (under 500KB)
**Button Text**: Keep short and action-oriented ("Learn More", "Get Started", "Read Story")

### Performance Configuration
- **Image Preloading**: Advanced FOUC elimination with 5-second timeout
- **Loading States**: Professional animated spinner during content load
- **Atomic Rendering**: All cards appear simultaneously for polished experience
- **Graceful Fallbacks**: Automatic fallback for failed images or slow networks

## Accessibility Considerations

The Shoelace Card block is designed with comprehensive accessibility features:

### Keyboard Navigation
- **Tab Navigation**: Full keyboard navigation support
- **Enter/Space Activation**: Cards can be activated with keyboard
- **ESC Key Support**: Close modals with ESC key
- **Focus Management**: Proper focus indicators and management

### Screen Reader Support
- **Semantic HTML**: Uses proper heading structure and landmarks
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Alt Text Support**: Proper image alt text from content
- **Screen Reader Announcements**: Modal state changes announced

### Visual Accessibility
- **High Contrast**: Compatible with high contrast modes
- **Color Independence**: Information not conveyed by color alone
- **Focus Indicators**: Clear visual focus indicators
- **Scalable Text**: Supports browser zoom and text scaling

### Modal Accessibility
- **Focus Trapping**: Focus contained within modal when open
- **ESC Key Handling**: Standard modal close behavior
- **Background Interaction**: Prevents interaction with background content
- **Return Focus**: Focus returns to trigger element when modal closes

## Performance Impact

The Shoelace Card block is optimized for superior performance and user experience:

### FOUC Elimination
- **Image Preloading**: All card images preloaded in parallel before display
- **Atomic Rendering**: Cards appear as complete units, not progressively
- **Loading States**: Clean animated spinner during content loading
- **Timeout Handling**: 5-second timeout for slow networks with graceful fallback

### Loading Optimization
- **Parallel Loading**: Multiple images loaded simultaneously
- **Efficient Caching**: Proper cache headers for repeated visits
- **Lazy Modal Content**: Modal content loaded only when needed
- **Minimal DOM Manipulation**: Efficient rendering with minimal reflows

### Performance Characteristics
- **Self-Contained**: No external dependencies or network requests
- **Lightweight**: Minimal JavaScript and CSS footprint
- **Efficient Rendering**: Optimized DOM updates and animations
- **Memory Management**: Proper cleanup of event listeners and resources

### Loading Behavior Sequence
1. **Initial Load**: Component shows loading spinner
2. **Image Preloading**: All images load in parallel (5-second timeout)
3. **Atomic Display**: All cards appear simultaneously with smooth fade-in
4. **Staggered Animation**: Cards animate in with subtle delays for polish

## Dependencies

The Shoelace Card block has minimal dependencies and broad compatibility:

### Browser Requirements
- **Modern JavaScript**: ES6+ support (classes, async/await, fetch API)
- **CSS Features**: CSS Grid, Flexbox, Custom Properties, Transforms
- **DOM APIs**: querySelector, addEventListener, fetch API
- **No Framework Dependencies**: Pure JavaScript implementation

### Browser Compatibility
- **Chrome 57+**: Full support for all features
- **Firefox 52+**: Complete compatibility
- **Safari 10.1+**: Full feature support
- **Edge 16+**: Modern Edge compatibility

### EDS Framework Dependencies
- **EDS Block Structure**: Standard EDS block decoration pattern
- **Query Index**: EDS query-index.json data structure
- **Published Content**: EDS content publishing and delivery
- **No External Libraries**: Self-contained with zero external dependencies

### Component Architecture
> **⚙️ Build Component Notice**: This component uses a build process and external dependencies, which differs from the core EDS philosophy of simple JavaScript. Build components are designed for complex functionality that requires sophisticated tooling while maintaining EDS compatibility. The source development happens in [`/build/shoelace-card/`](../../build/shoelace-card/) with the built output deployed to this directory.

- **Web Components**: Uses Shoelace design system components
- **ES Modules**: Modern JavaScript module system
- **Self-Contained**: All dependencies bundled into single file
- **Zero Configuration**: Works immediately when imported

## Known Limitations

Current limitations and troubleshooting information:

### Functional Limitations
1. **Static Data Source**: Data source path set at authoring time, not dynamic
2. **Image Dependency**: Requires images for optimal visual experience
3. **Content Structure**: Expects specific query-index.json structure
4. **Modal Content**: Requires individual pages for modal content
5. **Network Dependency**: Requires network access for content loading

### Content Limitations
- **Query Index Structure**: Must follow specific column structure
- **Image Requirements**: Images must be web-accessible and optimized
- **Path Dependencies**: All paths must be absolute and published
- **Content Format**: Modal content must be valid HTML/Markdown

### Performance Considerations
- **Image Loading**: Large images can impact preloading performance
- **Network Speed**: Slow networks may trigger timeout fallbacks
- **Content Size**: Large modal content may impact loading times
- **Memory Usage**: Multiple large images may impact memory on low-end devices

### Common Issues and Solutions

**Cards Not Displaying**:
- Check that your query-index.xlsx file is published
- Verify all paths in the spreadsheet are correct and absolute
- Ensure images are accessible and properly formatted
- Check browser console for network or parsing errors

**Modal Content Not Loading**:
- Confirm individual pages are published and accessible
- Check that paths match between query-index and actual pages
- Verify content is valid HTML/Markdown format
- Ensure proper EDS content structure

**Images Not Showing**:
- Check image paths are correct and absolute
- Ensure images are published and web-accessible
- Verify image formats are supported (JPEG, PNG, GIF, SVG)
- Check for proper image optimization and file sizes

**Performance Issues**:
- Optimize images for web delivery (compress and resize)
- Check network connectivity and speed
- Monitor browser console for loading errors
- Consider reducing number of cards for better performance

### Modal Interface Features

**Integrated Title Header Design**: The modal features a professional integrated title header that combines the content title with the close button:

```
┌─────────────────────────────────────┐
│ Content Title               ESC     │ ← Integrated Header
├─────────────────────────────────────┤
│                                     │
│ Your content appears here...        │ ← Modal Content
│                                     │
└─────────────────────────────────────┘
```

**Modal Closing Options**:
- **ESC Button**: Click the ESC button in the title header
- **Keyboard**: Press the ESC key
- **Click Outside**: Click anywhere outside the modal content
- **Double-click**: Double-click anywhere on the modal background

### Technical Features Summary
- **Self-Contained**: No external dependencies or network requests required
- **Numbered Badges**: Visual hierarchy with automatic numbering
- **Integrated Modal Headers**: Professional title headers with built-in ESC buttons
- **Immersive Modals**: Full-screen content display with background imagery
- **Responsive Design**: Works perfectly on all devices and screen sizes
- **Dynamic Loading**: Content loads from your published EDS pages
- **FOUC Elimination**: Advanced image preloading prevents flash of unstyled content
- **Smooth Loading**: Professional loading states with animated spinner
- **Atomic Rendering**: All content appears simultaneously for polished experience
- **Universal Compatibility**: Works in EDS, standalone, and development environments

### Support Resources
For technical questions about implementation:
- [Developer Documentation](DEV-README.md)
- [Component Testing](test.html)
- [EDS Documentation](https://www.aem.live/docs/)
