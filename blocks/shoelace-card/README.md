# Shoelace Card Block

A sophisticated card component for Adobe Edge Delivery Services (EDS) that uses Shoelace design system components to display dynamic content with advanced features including numbered slide badges and immersive modal overlays.

## Features

- **Dynamic Content Loading**: Fetches data from EDS query-index.json endpoints
- **Numbered Slide Badges**: Visual hierarchy with Shoelace badge components
- **Immersive Modal System**: Full-screen modals with glassmorphism effects
- **Progressive Enhancement**: Graceful fallbacks when Shoelace fails to load
- **Responsive Design**: Mobile-friendly grid layout
- **Accessibility**: Full keyboard navigation and screen reader support
- **EDS Native**: Uses standard EDS patterns with direct DOM manipulation

## Usage

### Basic Usage

Create a block in your EDS document:

```
| shoelace-card |
| :---- |
```

This will fetch data from the default `/slides/query-index.json` endpoint.

### Custom Query Path

Specify a custom query-index.json endpoint:

```
| shoelace-card |
| :---- |
| /products/query-index.json |
```

## Data Format

The component expects data from a query-index.json endpoint with this structure:

```json
{
  "total": 3,
  "offset": 0,
  "limit": 3,
  "data": [
    {
      "path": "/slides/slide-1",
      "title": "Card Title",
      "description": "Card description text",
      "image": "/slides/media_123.png",
      "buttonText": "Learn More",
      "lastModified": "1719573871"
    }
  ],
  "columns": ["path", "title", "description", "image", "buttonText", "lastModified"],
  ":type": "sheet"
}
```

### Required Fields

- **path**: Link destination for modal content (will fetch `{path}.plain.html`)
- **title**: Card heading text
- **description**: Card body text

### Optional Fields

- **image**: Card preview image URL
- **buttonText**: Custom button label (defaults to "Learn More")

## Setting Up Content

1. **Create Content Folder**: Create a folder in your EDS project (e.g., `/slides/`, `/products/`)
2. **Add Content Pages**: Create individual pages for each card
3. **Create Query Index**: Add a `query-index.xlsx` file to the folder with columns:
   - path
   - title
   - description
   - image
   - buttonText
4. **Publish**: Publish the query-index to generate the JSON endpoint

## Component Structure

Each card displays:

1. **Image** (optional): Card preview image with lazy loading
2. **Numbered Badge**: Slide number in top-left corner
3. **Title**: Bold heading text
4. **Description**: Body text content
5. **Button**: Action button that opens modal

## Modal System

Clicking the card button opens an immersive modal with:

- **Background Image**: Uses the card's image as full-screen background
- **Glassmorphism Effects**: Translucent overlay with backdrop blur
- **Dynamic Content**: Fetches and displays content from `{path}.plain.html`
- **Multiple Close Options**: Close button, click outside, or ESC key
- **Responsive Design**: Adapts to mobile screens

## Shoelace Components Used

- **sl-card**: Main card container with image, content, and footer slots
- **sl-button**: Action buttons with primary variant and pill styling
- **sl-badge**: Numbered slide indicators with primary color
- **sl-icon-button**: Close button for modals with x-lg icon
- **sl-spinner**: Loading indicator for modal content

## Styling

The component uses Shoelace's design tokens and includes:

- **Responsive Grid**: Auto-fit columns with minimum 300px width
- **Hover Effects**: Subtle transform and shadow on card hover
- **Glassmorphism**: Modern translucent effects with backdrop blur
- **High Contrast Support**: Adapts to user preferences
- **Reduced Motion**: Respects user motion preferences
- **Dark Mode**: Compatible with Shoelace dark theme

## Browser Support

Requires modern browsers with support for:

- ES Modules
- Web Components (Custom Elements)
- CSS Custom Properties
- Fetch API
- CSS Grid
- Backdrop Filter (with webkit prefixes for Safari)

## Performance

Optimized for performance with:

- **CDN Loading**: Shoelace components loaded from CDN
- **Lazy Loading**: Images load only when needed
- **Event Delegation**: Single event listener per block
- **Progressive Enhancement**: Works without JavaScript for basic content
- **Efficient DOM**: Minimal DOM operations and reflows

## Accessibility

Full accessibility support including:

- **ARIA Labels**: Proper roles and labels for screen readers
- **Keyboard Navigation**: Tab order and ESC key support
- **Focus Management**: Proper focus handling in modals
- **Screen Reader**: Compatible with assistive technologies
- **High Contrast**: Adapts to high contrast preferences
- **Reduced Motion**: Respects motion sensitivity preferences

## Testing

Test the component using:

- **test.html**: EDS integration test page
- **Browser Console**: Debug helpers available
  - `debugShoelaceCard.testModal()` - Test modal functionality
  - `debugShoelaceCard.checkShoelaceLoaded()` - Check component loading

## Troubleshooting

### Cards not displaying

- Check browser console for errors
- Verify query-index.json endpoint is accessible
- Ensure Shoelace components are loading from CDN
- Check that web components are supported

### Modal not opening

- Verify `.plain.html` endpoints are accessible
- Check browser console for JavaScript errors
- Ensure background images are loading correctly

### Styling issues

- Check browser support for backdrop-filter
- Verify Shoelace theme is loading correctly
- Ensure CSS custom properties are supported

### CORS Issues

- Verify CORS headers for query-index.json endpoints
- Check that `.plain.html` content is accessible
- Ensure same-origin policy compliance

## Development

For development and customization, see the source files in `/build/shoelace-card/`:

- **shoelace-card.js**: Main component implementation
- **shoelace-card.css**: Component styles
- **index.html**: Development test page
- **README.md**: Development documentation

## Related Documentation

- [Implementation Plan](../../docs/shoelace-card-implementation-plan.md)
- [EDS Block Architecture Standards](../../docs/for-ai/block-architecture-standards.md)
- [Query-Index Pattern](../../docs/json-prd.md)
- [Shoelace Design System](https://shoelace.style/)
