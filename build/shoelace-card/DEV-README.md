# Shoelace Card Component - Development

This directory contains the development environment for building a self-contained Shoelace Card component for Adobe Edge Delivery Services (EDS). The component bundles all dependencies into a single JavaScript file that works universally in EDS, standalone, and development environments.

## Quick Start

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development**

   ```bash
   npm run dev
   ```

   Opens <http://localhost:5174> with hot reload and proxy support for allabout.network.

3. **Build & Deploy**

   ```bash
   npm run deploy
   ```

   This single command:
   - Builds the self-contained component with Vite
   - Bundles all Shoelace dependencies into one file
   - Copies the built component to `../../blocks/shoelace-card/`
   - Copies stub CSS file (styles are bundled in JS)
   - Copies user documentation as README.md
   - No code transformation or path modification needed

4. **EDS Integration**

   To use the built system in your EDS project:
   ```bash
   # Copy blocks to your EDS repository
   cp -r ../../blocks/shoelace-card /path/to/your/eds-project/blocks/
   
   # Commit and push to git
   cd /path/to/your/eds-project
   git add blocks/shoelace-card/
   git commit -m "Add Shoelace Card component"
   git push
   ```

## Architecture

## File Naming Conventions

### Development vs Testing HTML Files

This component follows the project's standard HTML file naming pattern, which separates development and testing environments:

#### Development: `index.html`
- **Location**: `build/shoelace-card/index.html`
- **Auto-loaded by Vite** when running `npm run dev`
- **Hot reload enabled** for rapid development iteration
- **Build tool integration** - expected entry point by modern bundlers
- **Development server**: `http://localhost:5174/` (automatically serves index.html)

#### Testing: `test.html` (in blocks directory)
- **Location**: `blocks/shoelace-card/test.html` (created during deployment)
- **Manual EDS testing** via `npm run debug`
- **Explicit file requests** to EDS development server
- **Multiple test scenarios** possible (test.html, test-advanced.html)
- **EDS server**: `http://localhost:3000/blocks/shoelace-card/test.html` (explicit path required)

### Development Workflow

```bash
# 1. Component Development
npm run dev
# Opens: http://localhost:5174/ (auto-loads index.html)
# Hot reload active for rapid iteration

# 2. Build & Deploy
npm run deploy
# Creates: ../../blocks/shoelace-card/test.html (among other files)

# 3. EDS Testing  
cd ../../  # Return to project root
npm run debug
# Navigate to: http://localhost:3000/blocks/shoelace-card/test.html
```

### Why This Pattern?

1. **Tool Compatibility**: Vite expects `index.html` as the default entry point
2. **Environment Isolation**: Development and testing use different file names
3. **Deployment Clarity**: Built files have appropriate names for their target environment
4. **Testing Flexibility**: EDS can support multiple test files without conflicts

### File Lifecycle

```
Development → Build → Deploy → Test
index.html  → dist/  → blocks/test.html → EDS Server
```

The `index.html` file is for development only and never gets deployed to the blocks directory. The `test.html` file is specifically created for EDS testing and uses the exact EDS block structure for accurate testing.

### Important Notes

- **Never modify** the deployed `test.html` directly - it gets overwritten by `npm run deploy`
- **Development changes** should be made in this directory's `index.html`
- **Testing structure** in both files should be identical for consistency
- **Different servers** serve different files: Vite serves `index.html`, EDS serves `test.html`

### Self-Contained Design

The component is built as a completely self-contained module:

- **Zero External Dependencies**: All Shoelace components bundled into the output
- **Bundled CSS**: Both Shoelace and component styles included inline
- **Universal Compatibility**: Works in EDS, standalone, and development environments
- **Single Export**: Clean `decorate` function ready for immediate use

### Build Process

```mermaid
graph LR
    A[shoelace-card.js] --> B[Vite Bundle]
    C[@shoelace-style/shoelace] --> B
    D[shoelace-card.css] --> B
    B --> E[dist/shoelace-card.js<br/>Self-contained]
    E --> F[blocks/shoelace-card.js<br/>Production Ready]
```

### Component Structure

```javascript
// Source imports (bundled at build time)
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import shoelaceStyles from '@shoelace-style/shoelace/dist/themes/light.css?inline';
import componentStyles from './shoelace-card.css?inline';

// Clean export for universal usage
export default async function decorate(block) {
  // Auto-inject styles, wait for components, render cards
}
```

## Development Features

### Enhanced Vite Configuration

- **Complete Bundling**: All dependencies included in output
- **Proxy Support**: `/slides` and `/media` proxied to allabout.network
- **Modern Build**: ES2020 target with esbuild minification
- **Single File Output**: No external dependencies or chunks

### Development Server

```bash
npm run dev
```

- Hot reload for rapid development
- Proxy support for external APIs
- Modern ES module development
- Automatic browser opening

### Testing

```bash
npm run test
```

- Builds and deploys component
- Provides testing instructions
- Self-contained test environment

## Files

- **shoelace-card.js** - Source component with Shoelace imports
- **shoelace-card.css** - Component-specific styles (bundled)
- **vite.config.js** - Professional build configuration
- **package.json** - Dependencies and streamlined scripts
- **index.html** - Development testing page

## Enhanced Features

### Numbered Slide Badges
- Visual hierarchy with automatic numbering
- Shoelace badge styling with primary color
- Responsive positioning and accessibility

### Immersive Modal System
- Full-screen modals with background imagery and integrated title headers
- Professional header design with title and ESC button unified interface
- Glassmorphism effects with backdrop blur
- Dynamic content loading from `.plain.html` endpoints
- Multiple close methods: click ESC button in header, press ESC key, or click outside modal

### Content Loading Architecture
- Dual-loading: card data from `query-index.json`, full content from `.plain.html`
- Async operations with proper error handling
- Browser-level caching for performance

## Configuration

The component includes a configuration object:

```javascript
const SHOELACE_CARD_CONFIG = {
  QUERY_INDEX_PATH: '/slides/query-index.json',
  BADGE_COLOR: 'primary',
  DEFAULT_BUTTON_TEXT: 'Learn More'
};
```

## Usage Examples

### EDS Integration
```javascript
// In EDS environment - component auto-detects and works
import decorate from './shoelace-card.js';
await decorate(block);
```

### Standalone Usage
```javascript
// In any environment - completely self-contained
import decorate from './shoelace-card.js';
await decorate(document.querySelector('.my-container'));
```

## Build Output

The build process creates optimized files for deployment:

- **JavaScript**: ~130KB self-contained bundle with complete dependency bundling
- **CSS Stub**: Single comment line indicating styles are bundled in JS
- **Documentation**: Complete user guide copied from USER-README.md
- **Dependencies**: All Shoelace components and styles included
- **Styles**: CSS automatically injected when loaded
- **Compatibility**: Works in any modern browser environment
- **Testing**: Successfully tested with live data and modal functionality

## Professional Standards

### Code Quality
- Modern ES2020+ JavaScript
- Comprehensive error handling
- Clean separation of concerns
- Professional documentation

### Performance
- Lazy loading for images
- Efficient DOM manipulation
- Minimal reflows and repaints
- Browser-level caching

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management

### Browser Support
- ES Modules support required
- Web Components (Custom Elements)
- CSS Custom Properties
- Fetch API
- CSS Grid and Backdrop Filter

## Testing Results

### ✅ Successful Live Testing
The component has been successfully tested with the following results:

- **Self-contained Loading**: Component loads with all dependencies bundled (~130KB)
- **Data Fetching**: Successfully fetches from `/slides/query-index.json` via proxy
- **Card Display**: Beautiful responsive cards with York attractions data
- **Image Loading**: High-quality images load via allabout.network proxy
- **Modal Functionality**: Immersive full-screen modals open on button clicks
- **Error Handling**: Graceful 404 handling while maintaining functionality
- **Debug Features**: Comprehensive logging and helper functions available

### Testing Command
```bash
# Start the EDS development server
npm run debug

# Access test page
open http://localhost:3000/blocks/shoelace-card/test.html
```

## Troubleshooting

### Build Issues
- Ensure all dependencies are installed: `npm install`
- Clear node_modules and reinstall if needed
- Check Vite configuration for bundling issues

### Component Issues
- Check browser console for loading errors
- Verify Shoelace components are bundled correctly
- Test with simple HTML structure first
- Use debug helpers: `debugShoelaceCard.testModal()` and `debugShoelaceCard.checkShoelaceLoaded()`

### Development Server
- Ensure port 5174 is available for Vite dev server
- Ensure port 3000 is available for EDS testing server
- Check proxy configuration for external API access
- Verify hot reload is working

## Related Documentation

- [User Documentation](../../blocks/shoelace-card/README.md) - For content authors
- [Component Testing](../../blocks/shoelace-card/test.html) - Self-contained testing
- [EDS Documentation](https://www.aem.live/docs/) - Adobe Edge Delivery Services
