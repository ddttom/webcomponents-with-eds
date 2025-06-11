# Counter Block

A web component-based counter block that provides an interactive counter with increment and decrement functionality.

## Features

- Interactive counter with increment/decrement buttons
- Customizable initial value
- Shadow DOM encapsulation
- CSS custom properties for theming
- Accessible design with ARIA labels
- Event-based communication
- Responsive design

## Usage

To use the Counter block in your EDS project, create a block with the following structure:

| Counter |
|---------|
| 5       |

The number in the cell represents the initial value of the counter. If no value is provided, the counter starts at 0.

## Authoring

When creating content for the Counter block in Google Docs or Microsoft Word:

1. Create a table with two rows
2. In the first cell of the first row, type "Counter"
3. In the cell below, optionally enter a number for the initial value
4. The block will automatically create an interactive counter component

## Styling

The Counter block uses CSS custom properties for easy theming:

- `--counter-button-bg`: Background color of buttons (default: var(--color-primary, #007bff))
- `--counter-button-color`: Text color of buttons (default: var(--color-text-inverse, #ffffff))
- `--counter-display-bg`: Background color of the counter display (default: var(--color-background, #f8f9fa))
- `--counter-display-color`: Text color of the counter display (default: var(--color-text, #212529))

## Behavior

The Counter block:

1. Initializes with the value provided in the content cell
2. Provides increment and decrement buttons for interaction
3. Dispatches a 'count-change' event when the count changes
4. Maintains state within the web component
5. Uses Shadow DOM for style encapsulation

## Accessibility

The Counter block is designed with accessibility in mind:

- Uses semantic HTML elements
- Includes ARIA labels for all interactive elements
- Supports keyboard navigation
- Provides focus indicators
- Maintains proper contrast ratios
- Uses appropriate heading levels

## Performance

The block is optimized for performance:

- Uses native web components
- Minimal DOM manipulation
- Efficient event handling
- Shadow DOM for style isolation
- No external dependencies

## Browser Support

This block uses modern web standards and should work in all modern browsers that support:

- Custom Elements
- Shadow DOM
- CSS Custom Properties
- ES6+ JavaScript features

## Troubleshooting

Common issues and solutions:

1. Counter not initializing
   - Check that the initial value is a valid number
   - Ensure the block name is exactly "Counter"

2. Styling not applying
   - Verify that CSS custom properties are defined in your theme
   - Check browser support for Shadow DOM

3. Events not firing
   - Ensure the block is properly loaded
   - Check browser console for any errors

## Suggestions

- Consider adding a reset button for longer forms
- Add animation for value changes
- Implement min/max value constraints
- Add step size configuration
- Support for custom button labels 
