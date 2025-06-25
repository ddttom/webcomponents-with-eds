# Counter Block

## Overview

A web component-based counter block that provides an interactive counter with increment and decrement functionality. The Counter block uses Shadow DOM encapsulation, CSS custom properties for theming, and provides accessible design with ARIA labels and event-based communication.

## Content Structure

To use the Counter block in your EDS project, create a block with the following structure:

### Example Table Structure

| Counter |
|---------|
| 5       |

The number in the cell represents the initial value of the counter. If no value is provided, the counter starts at 0.

### Authoring in Google Docs

When creating content for the Counter block in Google Docs or Microsoft Word:

1. Create a table with two rows
2. In the first cell of the first row, type "Counter"
3. In the cell below, optionally enter a number for the initial value
4. The block will automatically create an interactive counter component

## Variations

The Counter block supports customization through CSS custom properties but does not have built-in visual variations. All styling is controlled through theming variables.

### Variation Examples

| Counter |
|---------|
| 0       |

| Counter |
|---------|
| 10      |

| Counter |
|---------|
| -5      |

## Configuration Options

The Counter block uses CSS custom properties for easy theming and configuration:

### CSS Custom Properties

```css
.counter {
  --counter-button-bg: var(--color-primary, #007bff);
  --counter-button-color: var(--color-text-inverse, #ffffff);
  --counter-display-bg: var(--color-background, #f8f9fa);
  --counter-display-color: var(--color-text, #212529);
}
```

### Available Properties
- `--counter-button-bg`: Background color of buttons (default: var(--color-primary, #007bff))
- `--counter-button-color`: Text color of buttons (default: var(--color-text-inverse, #ffffff))
- `--counter-display-bg`: Background color of the counter display (default: var(--color-background, #f8f9fa))
- `--counter-display-color`: Text color of the counter display (default: var(--color-text, #212529))

### JavaScript Configuration

The Counter block dispatches a 'count-change' event when the count changes, allowing for custom event handling:

```javascript
document.addEventListener('count-change', (event) => {
  console.log('Counter value changed:', event.detail.value);
});
```

## Accessibility Considerations

The Counter block is designed with accessibility in mind:

- **Semantic HTML**: Uses semantic HTML elements for proper structure
- **ARIA Labels**: Includes ARIA labels for all interactive elements
- **Keyboard Navigation**: Supports full keyboard navigation and interaction
- **Focus Indicators**: Provides clear focus indicators for all interactive elements
- **Screen Reader Support**: Compatible with screen readers and assistive technologies
- **High Contrast**: Maintains proper contrast ratios for visibility
- **Heading Structure**: Uses appropriate heading levels for content hierarchy

### Accessibility Features
- Increment and decrement buttons have descriptive ARIA labels
- Current count value is announced to screen readers
- Focus management ensures logical tab order
- High contrast mode compatibility
- Keyboard shortcuts for increment/decrement functionality

## Performance Impact

The block is optimized for performance with several key characteristics:

- **Native Web Components**: Uses native web components for optimal performance
- **Shadow DOM**: Provides style isolation without performance overhead
- **Minimal DOM Manipulation**: Efficient event handling with minimal DOM updates
- **No External Dependencies**: Self-contained with no external library requirements
- **Lightweight**: Small footprint with efficient JavaScript and CSS
- **Event-Driven**: Uses efficient event-based communication patterns

### Performance Benefits
- Fast initialization and rendering
- Minimal memory footprint
- Efficient update cycles
- No framework overhead
- Optimized for mobile devices

## Dependencies

The Counter block has minimal dependencies and requirements:

### Browser Support Requirements
- **Custom Elements**: Modern browsers supporting Custom Elements v1
- **Shadow DOM**: Shadow DOM v1 support required
- **CSS Custom Properties**: CSS Variables support needed
- **ES6+ JavaScript**: Modern JavaScript features (classes, arrow functions, etc.)

### Supported Browsers
- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+

### EDS Framework Dependencies
- Standard EDS block structure and decoration pattern
- EDS CSS framework for base styling
- No additional EDS-specific dependencies required

## Known Limitations

Current limitations and troubleshooting information:

### Functional Limitations
1. **Initial Value Validation**: Counter only accepts numeric initial values
2. **Range Limits**: No built-in minimum or maximum value constraints
3. **Step Size**: Fixed increment/decrement of 1 (not configurable)
4. **Persistence**: Counter value resets on page reload
5. **Multiple Instances**: Each counter maintains independent state

### Common Issues and Solutions

**Counter not initializing:**
- Check that the initial value is a valid number
- Ensure the block name is exactly "Counter" (case-sensitive)
- Verify that the EDS framework is properly loaded

**Styling not applying:**
- Verify that CSS custom properties are defined in your theme
- Check browser support for Shadow DOM and CSS custom properties
- Ensure no conflicting CSS is overriding component styles

**Events not firing:**
- Ensure the block is properly loaded and initialized
- Check browser console for any JavaScript errors
- Verify event listeners are attached after component initialization

### Troubleshooting Steps
1. Verify browser compatibility with web components
2. Check console for JavaScript errors
3. Confirm proper EDS block structure in HTML
4. Validate CSS custom property definitions
5. Test with different initial values

### Enhancement Suggestions
- Consider adding a reset button for longer forms
- Add smooth animation for value changes
- Implement configurable min/max value constraints
- Add configurable step size for increments
- Support for custom button labels and icons
