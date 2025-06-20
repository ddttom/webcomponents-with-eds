# Shoelace Card Component Development

This directory contains the source files for developing the Shoelace Card component for Adobe Edge Delivery Services (EDS). This component uses the EDS query-index.json pattern to fetch and display dynamic content with enhanced features including numbered slide badges and immersive modal overlay functionality using Shoelace design system components.

## Quick Start

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development**

   ```bash
   npm run dev
   ```

   Opens <http://localhost:5174> with hot reload for development.

3. **Build for Production**

   ```bash
   npm run build  # Creates bundled version in dist/
   npm run build:component  # Bundles dependencies and copies to blocks directory
   npm run deploy  # Build and deploy to blocks directory (recommended)
   ```

   This process:
   - Bundles all Shoelace components into a single file
   - Creates browser-compatible files in `dist/` directory
   - Copies bundled files to `/blocks/shoelace-card/` for EDS deployment
   - Ensures compatibility with direct browser usage (file:// protocol)

4. **Deploy to EDS Blocks**

   ```bash
   npm run deploy
   ```

   The deploy script automatically:
   - Builds the component using Vite
   - Copies all necessary files to `../../blocks/shoelace-card/`
   - Overwrites existing files (except preserved files like `test.html`)
   - Maintains proper file structure for EDS integration
   - Provides deployment summary and next steps

## Files

- **shoelace-card.js** - Main component with query-index.json integration and enhanced features
- **shoelace-card.css** - Component styles with glassmorphism effects
- **index.html** - Local testing page demonstrating the query-index pattern
- **package.json** - Dependencies, scripts, and proxy configuration
- **vite.config.js** - Development server configuration

## Enhanced Features

### Numbered Slide Badges

Each card displays a numbered badge in the top-left corner using Shoelace badge styling:

- **Visual Hierarchy**: Clear slide ordering and navigation
- **Shoelace Styling**: Consistent with Shoelace design system
- **Responsive Design**: Adapts to different card sizes
- **Accessibility**: Screen reader compatible numbering

### Immersive Modal Overlay System

Clicking "Learn More" opens a full-screen immersive modal with background imagery:

- **Immersive Design**: Full-screen modal with background image from card content
- **Glassmorphism Effects**: Translucent elements with backdrop blur for modern aesthetics
- **Hero Layout**: Large typography with gradient overlay for optimal readability
- **Dynamic Content**: Fetches complete `.plain.html` content and displays as styled text
- **Multiple Close Methods**: Glassmorphism close button, click outside, ESC key support
- **Responsive Layout**: Adapts to mobile screens with adjusted typography and spacing
- **Loading States**: Elegant loading feedback during content fetching
- **Error Handling**: Graceful fallbacks when content is unavailable

### Content Loading Architecture

The component uses a dual-loading approach:

- **Card Data**: From `query-index.json` for card previews and metadata
- **Full Content**: From `.plain.html` endpoints for modal display
- **Async Operations**: Non-blocking content loading with proper error handling
- **Caching**: Browser-level caching for improved performance

## EDS Native Implementation

This component follows EDS native patterns with:

- **Direct DOM Manipulation**: No React/Vue, pure DOM API usage
- **Progressive Enhancement**: Graceful fallbacks when Shoelace fails to load
- **Event Delegation**: Efficient event handling using EDS patterns
- **Standard Block Decoration**: Uses the standard `decorate(block)` function
- **EDS Utilities**: Leverages `loadCSS` and `loadScript` from `scripts/aem.js`

## Query-Index Pattern

This component follows the EDS query-index.json pattern described in `/docs/json-prd.md`. Instead of reading static content from the DOM, it fetches dynamic data from EDS query-index endpoints.

### Data Source

The component fetches data from query-index.json endpoints:

- **Default**: `/slides/query-index.json`
- **Custom**: Configurable via block content

### Expected Data Format

```json
{
  "total": 3,
  "offset": 0,
  "limit": 3,
  "data": [
    {
      "path": "/slides/slide-1",
      "title": "Slide Title",
      "description": "Slide description text",
      "image": "/slides/media_123.png",
      "buttonText": "Learn More",
      "lastModified": "1719573871"
    }
  ],
  "columns": ["path", "title", "description", "image", "buttonText", "lastModified"],
  ":type": "sheet"
}
```

## Usage in EDS

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
| /custom/query-index.json |
```

### Setting Up Content

1. **Create Content Folder**: Create a folder in your EDS project (e.g., `/slides/`, `/products/`)
2. **Add Content Pages**: Create individual pages for each slide
3. **Create Query Index**: Add a `query-index.xlsx` file to the folder
4. **Configure Metadata**: Ensure each page has the required metadata fields
5. **Publish**: Publish the query-index to generate the JSON endpoint

## Component Structure

The component expects content in this order from the query-index data:

1. **path** - Link destination when card is clicked
2. **title** - Card heading
3. **description** - Card body text
4. **image** (optional) - Card preview image
5. **buttonText** (optional) - Action button label

## Development Configuration

### Proxy Setup

The `vite.config.js` includes proxy configuration for development:

```javascript
export default defineConfig({
  server: {
    proxy: {
      '/slides': {
        target: 'https://allabout.network',
        changeOrigin: true,
        secure: true
      }
    }
  }
});
```

This handles CORS issues during development by proxying `/slides` requests to the EDS instance at `https://allabout.network`.

### Environment Handling

- **Development**: Uses proxy to avoid CORS issues
- **Production**: Uses relative paths for same-origin deployment

## Testing Different Content

Edit the `index.html` file to test different scenarios:

1. **Default endpoint**: Uses `/slides/query-index.json`
2. **Custom endpoint**: Uses custom path in block content
3. **Error handling**: Tests network failures and empty data

## Configuration

The component includes a configuration object:

```javascript
const SHOELACE_CARD_CONFIG = {
  QUERY_INDEX_PATH: '/slides/query-index.json',
  CARD_MAX_WIDTH: '400px',
  MODAL_ANIMATION_DURATION: '300ms',
  BADGE_COLOR: 'primary',
  DEFAULT_TITLE: 'Card Title',
  DEFAULT_DESCRIPTION: 'Card description',
  DEFAULT_BUTTON_TEXT: 'Learn More'
};
```

Modify these values to customize the component's appearance and behavior.

## Shoelace Components Used

- **sl-card** - Main card container with image, content, and footer slots
- **sl-button** - Action buttons with primary variant and pill styling
- **sl-badge** - Numbered slide indicators with primary color
- **sl-icon-button** - Close button for modals with x-lg icon
- **sl-spinner** - Loading indicator for modal content

## Features

### Enhanced User Experience

- **Numbered Slide Badges**: Visual hierarchy with Shoelace primary color styling
- **Immersive Modal System**: Full-screen content display with background imagery
- **Glassmorphism Design**: Modern translucent elements with backdrop blur effects
- **Hero Typography**: Large-scale text with gradient overlays for impact
- **Dynamic Content Loading**: Complete `.plain.html` content rendered as styled text
- **Multiple Close Methods**: Icon button, click outside, ESC key support
- **Cross-browser Compatibility**: Webkit prefixes for Safari support

### Performance Optimizations

- Lazy loading for images using native `loading="lazy"`
- Efficient DOM manipulation with minimal reflows
- Responsive grid layout using CSS Grid
- Error handling and loading states
- Async content loading with proper cleanup
- Browser-level caching for query-index and content
- Progressive enhancement with graceful fallbacks

### Accessibility

- Proper semantic structure with ARIA labels and roles
- Keyboard navigation support (ESC key, tab order)
- Screen reader compatibility with numbered slides
- Focus management in modal overlays
- ARIA attributes for interactive elements
- High contrast support with media queries
- Reduced motion support for users with vestibular disorders

### Responsive Design

- Mobile-friendly grid layout with auto-fit columns
- Flexible card sizing with max-width constraints
- Touch-friendly interactions with proper sizing
- Immersive modal adapts to screen size (full-screen with responsive typography)
- Mobile-optimized modal layout with adjusted padding and font sizes
- Responsive badge positioning and sizing

## Troubleshooting

### Component not loading data

- Check browser console for fetch errors
- Verify query-index.json endpoint is accessible
- Ensure proxy configuration is correct for development
- Check CORS headers for production deployment

### Cards not rendering

- Verify Shoelace resources are loaded from CDN
- Check that `decorate` function is being called
- Ensure web component support in browser
- Verify numbered badges are positioned correctly
- Test by opening development server directly

### Modal not opening

- Check browser console for JavaScript errors
- Verify `.plain.html` endpoints are accessible
- Check that modal event listeners are properly attached
- Ensure background images are loading correctly

### Modal content not loading

- Verify the `path` field in query-index data is correct
- Check that `.plain.html` endpoints return valid HTML
- Ensure proxy configuration handles content requests
- Check browser network tab for failed content requests
- Verify glassmorphism effects are rendering (backdrop-filter support)

### Modal styling issues

- Check browser support for backdrop-filter (webkit prefixes included)
- Verify background images are accessible and loading
- Ensure gradient overlays are rendering correctly
- Check responsive breakpoints for mobile devices

### Image not displaying

- Check image URL is valid and accessible
- Verify image path in query-index data
- Check browser network tab for failed image requests

### CORS Issues

- Development: Ensure proxy is configured in vite.config.js
- Production: Verify CORS headers or use same-origin deployment
- Check browser console for CORS-related errors
- Verify both query-index and .plain.html endpoints are accessible

### Numbered badges not showing

- Check CSS positioning and z-index values
- Verify Shoelace primary color is applied
- Ensure badge container has proper relative positioning
- Check that sl-badge component is loaded

## Debug Helpers

The development page includes debug helpers accessible via browser console:

- `debugShoelaceCard.testModal()` - Test modal functionality
- `debugShoelaceCard.checkShoelaceLoaded()` - Check component loading status

## Performance

The component is optimized for performance:

- **CDN Loading**: Shoelace components loaded from CDN
- **Lazy loading**: Images load only when needed
- **Efficient rendering**: Minimal DOM operations
- **Caching**: Browser caches query-index responses
- **Progressive enhancement**: Works without JavaScript for basic content
- **Event delegation**: Single event listener per block

## Browser Support

Supports all modern browsers that support:

- ES Modules
- Web Components (Custom Elements)
- CSS Custom Properties
- Fetch API
- CSS Grid
- Backdrop Filter (with webkit prefixes)

## Related Documentation

- [`/docs/shoelace-card-implementation-plan.md`](../../docs/shoelace-card-implementation-plan.md) - Complete implementation plan
- [`/docs/json-prd.md`](../../docs/json-prd.md) - Query-index.json pattern documentation
- [`/docs/for-ai/block-architecture-standards.md`](../../docs/for-ai/block-architecture-standards.md) - EDS block architecture standards
