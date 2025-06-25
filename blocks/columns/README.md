# Columns Block

## Overview

A responsive layout block that creates flexible column layouts with automatic image positioning and mobile-first responsive behavior. The Columns block automatically detects the number of columns and applies appropriate styling for optimal display across all device sizes.

## Content Structure

To use the Columns block in your EDS project, create a block with the following structure:

### Example Table Structure

| Columns |           |
| ------- | --------- |
| Content | Content   |
| Text    | Image     |

The block automatically detects the number of columns based on the table structure and applies responsive styling accordingly.

### Two-Column Layout
| Columns |                    |
| ------- | ------------------ |
| Text content goes here | ![Image](path/to/image.jpg) |

### Three-Column Layout
| Columns |           |           |
| ------- | --------- | --------- |
| Column 1 | Column 2 | Column 3 |
| Content | Content  | Content   |

### Four-Column Layout
| Columns |           |           |           |
| ------- | --------- | --------- | --------- |
| Column 1 | Column 2 | Column 3 | Column 4 |
| Content | Content  | Content   | Content   |

## Variations

The Columns block automatically applies variations based on content and screen size:

- **Dynamic Column Count**: Automatically detects and styles 2, 3, 4, or more columns
- **Image Column Detection**: Special styling for columns containing only images
- **Mobile-First**: Stacks columns vertically on mobile devices
- **Desktop Layout**: Horizontal layout with equal spacing on larger screens

### Variation Examples

The block uses CSS classes automatically applied based on content:

- `.columns-2-cols`: Applied when 2 columns are detected
- `.columns-3-cols`: Applied when 3 columns are detected  
- `.columns-4-cols`: Applied when 4 columns are detected
- `.columns-img-col`: Applied to columns containing only images

## Configuration Options

The Columns block uses CSS custom properties that can be customized:

```css
.columns {
  --columns-gap: 32px;           /* Gap between columns on desktop */
  --columns-mobile-gap: 16px;    /* Gap between columns on mobile */
  --columns-breakpoint: 900px;   /* Responsive breakpoint */
}
```

### CSS Variables
- `--columns-gap`: Controls spacing between columns on desktop (default: 32px)
- `--columns-mobile-gap`: Controls spacing between columns on mobile (default: 16px)
- `--columns-breakpoint`: Screen width where layout switches to horizontal (default: 900px)

## Accessibility Considerations

The Columns block is designed with accessibility in mind:

- **Semantic Structure**: Uses proper HTML structure for screen readers
- **Responsive Design**: Content remains accessible across all device sizes
- **Image Alt Text**: Supports proper alt text for images within columns
- **Reading Order**: Maintains logical reading order on mobile devices
- **Focus Management**: Preserves tab order and focus indicators
- **High Contrast**: Works with high contrast mode and custom themes

## Performance Impact

The block is optimized for performance:

- **CSS-Only Layout**: Uses pure CSS Grid and Flexbox for layout
- **No JavaScript Dependencies**: Layout handled entirely through CSS
- **Minimal DOM Manipulation**: Only adds CSS classes for column count
- **Efficient Responsive Design**: Uses CSS media queries for breakpoints
- **Image Optimization**: Supports responsive images with proper sizing
- **Lightweight**: Minimal CSS footprint with efficient selectors

## Dependencies

The Columns block has minimal dependencies:

- **Browser Support**: Modern browsers supporting CSS Flexbox and Grid
- **CSS Features**: Flexbox, CSS Grid, Media Queries
- **EDS Framework**: Standard EDS block structure and decoration pattern
- **No External Libraries**: Self-contained with no external dependencies

### Browser Compatibility
- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+

## Known Limitations

Current limitations and considerations:

1. **Column Count Detection**: Limited to detecting columns from first row only
2. **Image Column Logic**: Only detects images as sole content in a column
3. **Nested Content**: Complex nested structures may not be handled optimally
4. **Dynamic Content**: Column count is determined at page load, not dynamically updated
5. **Custom Breakpoints**: Responsive breakpoint is fixed at 900px via CSS

### Troubleshooting

**Columns not displaying correctly:**
- Verify table structure matches expected format
- Check that content is properly structured in cells
- Ensure images have proper paths and alt text

**Responsive layout issues:**
- Confirm CSS media queries are loading correctly
- Check for conflicting CSS that might override column styles
- Verify viewport meta tag is present in document head

**Image positioning problems:**
- Ensure images are the only content in their column cells
- Check that image paths are correct and accessible
- Verify image dimensions are appropriate for layout