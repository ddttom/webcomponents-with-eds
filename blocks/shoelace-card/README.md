# Shoelace Card Block

A modern, self-contained card component for Adobe Edge Delivery Services that displays dynamic content with numbered badges and immersive modal overlays. This component requires no external dependencies and works immediately when the decorate function is called.

## What It Does

The Shoelace Card block creates beautiful, interactive cards that:
- Display content from your EDS query-index data
- Show numbered badges for easy navigation
- Open full-screen modals with integrated title headers and ESC buttons
- Adapt to any screen size automatically
- Load content dynamically from your published pages
- Work completely self-contained with zero external dependencies

## How to Use

### Basic Usage

Add this block to any EDS document:

```
| shoelace-card |
| :---- |
```

This will display cards using data from `/slides/query-index.json`.

### Custom Data Source

To use different content, specify a custom path:

```
| shoelace-card |
| :---- |
| /products/query-index.json |
```

## Setting Up Your Content

### 1. Create Your Content Structure

Organize your content in a folder (e.g., `/slides/` or `/products/`):

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

### 2. Create Individual Pages

Each card needs its own page with the content that appears in the modal:

**Example: slide-1.md**
```markdown
# Amazing Product Features

![Product Image](./media/image1.jpg)

Discover the incredible features that make our product stand out.

## Key Benefits
- Lightning-fast performance
- 99.9% uptime guarantee  
- 24/7 customer support
```

### 3. Create Query Index Spreadsheet

Create `query-index.xlsx` with these columns:

| path | title | description | image | buttonText |
|------|-------|-------------|-------|------------|
| /slides/slide-1 | Amazing Product | Discover incredible features | /slides/media/image1.jpg | Learn More |
| /slides/slide-2 | Customer Success | Real stories from customers | /slides/media/image2.jpg | Read Stories |
| /slides/slide-3 | Get Started | Begin your journey today | /slides/media/image3.jpg | Start Now |

### 4. Publish Your Content

1. Save and publish each individual page
2. Save and publish the query-index.xlsx file
3. The system automatically generates the JSON endpoint

## Content Guidelines

### Titles
- Keep short and engaging (2-6 words)
- Use action-oriented language
- Make them descriptive

### Descriptions  
- Limit to 1-2 sentences
- Focus on key benefits
- Use clear, compelling language

### Images
- Use high-quality images (minimum 400px wide)
- Optimize for web (under 500KB)
- Ensure they work as modal backgrounds
- Use descriptive alt text

### Button Text
- Keep short and action-oriented
- Examples: "Learn More", "Get Started", "Read Story"
- Match your content tone

## Examples

### Product Showcase

```
| shoelace-card |
| :---- |
| /products/query-index.json |
```

**Content Setup:**
| path | title | description | image | buttonText |
|------|-------|-------------|-------|------------|
| /products/laptop-pro | Laptop Pro | Professional performance for demanding workflows | /products/media/laptop.jpg | View Specs |
| /products/tablet-air | Tablet Air | Lightweight design meets powerful functionality | /products/media/tablet.jpg | Explore Features |

### Team Profiles

```
| shoelace-card |
| :---- |
| /team/query-index.json |
```

**Content Setup:**
| path | title | description | image | buttonText |
|------|-------|-------------|-------|------------|
| /team/john-doe | John Doe | Lead Developer with 10+ years experience | /team/media/john.jpg | View Profile |
| /team/jane-smith | Jane Smith | UX Designer passionate about user experience | /team/media/jane.jpg | See Work |

### Case Studies

```
| shoelace-card |
| :---- |
| /case-studies/query-index.json |
```

**Content Setup:**
| path | title | description | image | buttonText |
|------|-------|-------------|-------|------------|
| /case-studies/acme-corp | ACME Corp | 300% increase in productivity | /case-studies/media/acme.jpg | Read Case Study |
| /case-studies/tech-startup | Tech Startup | From idea to IPO in 18 months | /case-studies/media/startup.jpg | View Success |

## Best Practices

### Content Organization
- Use consistent naming conventions
- Keep folder structures simple
- Group related content together

### Performance
- Optimize images for web delivery
- Keep descriptions concise
- Use descriptive file names

### Accessibility
- Provide meaningful alt text for images
- Use clear, descriptive titles
- Ensure good color contrast

## Troubleshooting

### Cards Not Displaying
- Check that your query-index.xlsx file is published
- Verify all paths in the spreadsheet are correct
- Ensure images are accessible

### Modal Content Not Loading
- Confirm individual pages are published
- Check that paths match between query-index and actual pages
- Verify content is accessible

### Images Not Showing
- Check image paths are correct and absolute
- Ensure images are published and accessible
- Verify image formats are supported (JPEG, PNG, GIF, SVG)

## Performance & User Experience

### FOUC Elimination

This component implements advanced **Flash of Unstyled Content (FOUC) elimination** to ensure a professional loading experience:

**Image Preloading**: All card images are preloaded in parallel before any content is displayed, preventing the jarring effect of text appearing before images.

**Atomic Rendering**: Cards appear as complete units rather than building up progressively, creating a polished, professional experience.

**Loading States**: Users see a clean animated spinner while content loads, providing clear feedback about the loading process.

**Graceful Fallbacks**: If image preloading fails or times out, the component gracefully falls back to progressive loading while maintaining functionality.

**Performance Benefits**:
- ✅ No progressive text/image building
- ✅ Smooth loading with professional spinner
- ✅ All content appears simultaneously
- ✅ 5-second timeout for slow networks
- ✅ Automatic fallback for failed images

### Loading Behavior

1. **Initial Load**: Component shows loading spinner
2. **Image Preloading**: All images load in parallel (5-second timeout)
3. **Atomic Display**: All cards appear simultaneously with smooth fade-in
4. **Staggered Animation**: Cards animate in with subtle delays for polish

## Tips for Success

1. **Start Simple**: Begin with basic cards and add complexity gradually
2. **Test Regularly**: Preview your content to verify it displays correctly
3. **Optimize Images**: Use appropriate sizes and formats for best performance
4. **Keep Content Fresh**: Regular updates keep your cards engaging
5. **Monitor Performance**: Check loading times and user engagement
6. **Image Optimization**: Smaller images load faster and improve the preloading experience</search>
</search_and_replace>

## Modal Interface

### Integrated Title Header Design

The modal features a professional **integrated title header** that combines the content title with the close button in a unified interface:

**Header Layout:**
```
┌─────────────────────────────────────┐
│ Content Title               ESC     │ ← Integrated Header
├─────────────────────────────────────┤
│                                     │
│ Your content appears here...        │ ← Modal Content
│                                     │
└─────────────────────────────────────┘
```

**Key Benefits:**
- **Always Visible**: ESC button never gets hidden behind content
- **Professional Design**: Follows standard modal interface patterns
- **Space Efficient**: No wasted space above content
- **Clear Hierarchy**: Title and controls are logically grouped
- **Intuitive Navigation**: Users immediately understand how to close the modal

### Closing the Modal

You can close any modal using:
- **ESC Button**: Click the ESC button in the title header
- **Keyboard**: Press the ESC key
- **Click Outside**: Click anywhere outside the modal content
- **Double-click**: Double-click anywhere on the modal background

### Content Display

- **Title Extraction**: The H1 from your content becomes the modal title
- **Gradient Styling**: Titles use beautiful gradient text effects
- **Content Flow**: Remaining content flows naturally below the header
- **Responsive**: Header adapts perfectly to all screen sizes

## Technical Features

- **Self-Contained**: No external dependencies or network requests required
- **Numbered Badges**: Visual hierarchy with automatic numbering
- **Integrated Modal Headers**: Professional title headers with built-in ESC buttons
- **Immersive Modals**: Full-screen content display with background imagery
- **Responsive Design**: Works perfectly on all devices
- **Dynamic Loading**: Content loads from your published EDS pages
- **Accessibility**: Screen reader compatible with keyboard navigation
- **Modern Styling**: Beautiful glassmorphism effects and animations
- **Universal Compatibility**: Works in EDS, standalone, and development environments
- **FOUC Elimination**: Advanced image preloading prevents flash of unstyled content
- **Smooth Loading**: Professional loading states with animated spinner
- **Atomic Rendering**: All content appears simultaneously for polished experience</search>
</search_and_replace>

## Component Architecture

This component is built using modern web standards:
- **Web Components**: Uses Shoelace design system components
- **ES Modules**: Modern JavaScript module system
- **Self-Contained**: All dependencies bundled into single file
- **Zero Configuration**: Works immediately when imported

## Support

For technical questions about implementation:
- [Developer Documentation](DEV-README.md)
- [Component Testing](test.html)
- [EDS Documentation](https://www.aem.live/docs/)
