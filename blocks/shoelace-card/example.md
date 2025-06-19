# Shoelace Card Examples

This document provides examples for content authors on how to use the Shoelace Card block in Adobe Edge Delivery Services.

## Basic Usage

### Default Configuration

The simplest way to use the Shoelace Card block:

```
| shoelace-card |
| :---- |
```

This will:
- Fetch data from `/slides/query-index.json`
- Display cards with numbered badges
- Open immersive modals when buttons are clicked

### Custom Data Source

To use a different data source:

```
| shoelace-card |
| :---- |
| /products/query-index.json |
```

This will fetch card data from `/products/query-index.json` instead of the default slides endpoint.

## Setting Up Your Content

### 1. Create Your Content Structure

Create a folder for your cards (e.g., `/slides/` or `/products/`):

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

### 2. Create Individual Card Pages

Each card should have its own page with content that will be displayed in the modal:

**slide-1.md:**
```markdown
# Amazing Product Features

![Product Image](./media/image1.jpg)

Discover the incredible features that make our product stand out from the competition.

## Key Benefits

- **Performance**: Lightning-fast processing
- **Reliability**: 99.9% uptime guarantee
- **Support**: 24/7 customer assistance

Learn more about how these features can transform your workflow.
```

### 3. Create Query Index Spreadsheet

Create a `query-index.xlsx` file with these columns:

| path | title | description | image | buttonText |
|------|-------|-------------|-------|------------|
| /slides/slide-1 | Amazing Product | Discover incredible features that stand out | /slides/media/image1.jpg | Learn More |
| /slides/slide-2 | Customer Success | Real stories from satisfied customers | /slides/media/image2.jpg | Read Stories |
| /slides/slide-3 | Get Started | Begin your journey with our platform | /slides/media/image3.jpg | Start Now |

### 4. Publish Your Content

1. Save and publish your individual slide pages
2. Save and publish the query-index.xlsx file
3. The system will automatically generate the JSON endpoint

## Content Guidelines

### Titles
- Keep titles concise (2-6 words)
- Use action-oriented language
- Make them descriptive and engaging

### Descriptions
- Limit to 1-2 sentences
- Focus on key benefits or value proposition
- Use clear, compelling language

### Images
- Use high-quality images (minimum 400px wide)
- Optimize for web (JPEG/PNG, under 500KB)
- Ensure images work as modal backgrounds
- Use descriptive alt text in your content pages

### Button Text
- Keep it short and action-oriented
- Examples: "Learn More", "Get Started", "Read Story", "View Details"
- Match the tone of your content

## Advanced Examples

### Product Showcase

```
| shoelace-card |
| :---- |
| /products/query-index.json |
```

**Query Index Content:**
| path | title | description | image | buttonText |
|------|-------|-------------|-------|------------|
| /products/laptop-pro | Laptop Pro | Professional performance for demanding workflows | /products/media/laptop.jpg | View Specs |
| /products/tablet-air | Tablet Air | Lightweight design meets powerful functionality | /products/media/tablet.jpg | Explore Features |
| /products/phone-max | Phone Max | Maximum performance in a compact design | /products/media/phone.jpg | See Details |

### Team Profiles

```
| shoelace-card |
| :---- |
| /team/query-index.json |
```

**Query Index Content:**
| path | title | description | image | buttonText |
|------|-------|-------------|-------|------------|
| /team/john-doe | John Doe | Lead Developer with 10+ years experience | /team/media/john.jpg | View Profile |
| /team/jane-smith | Jane Smith | UX Designer passionate about user experience | /team/media/jane.jpg | See Work |
| /team/mike-wilson | Mike Wilson | Product Manager driving innovation | /team/media/mike.jpg | Learn More |

### Case Studies

```
| shoelace-card |
| :---- |
| /case-studies/query-index.json |
```

**Query Index Content:**
| path | title | description | image | buttonText |
|------|-------|-------------|-------|------------|
| /case-studies/acme-corp | ACME Corp | 300% increase in productivity with our solution | /case-studies/media/acme.jpg | Read Case Study |
| /case-studies/tech-startup | Tech Startup | From idea to IPO in 18 months | /case-studies/media/startup.jpg | View Success |
| /case-studies/enterprise | Enterprise Co | Scaling operations across 50+ countries | /case-studies/media/enterprise.jpg | See Results |

## Best Practices

### Content Organization
- Use consistent naming conventions
- Keep folder structures simple and logical
- Group related content together

### Performance
- Optimize images for web delivery
- Keep descriptions concise
- Use descriptive but short file names

### Accessibility
- Provide meaningful alt text for images
- Use clear, descriptive titles
- Ensure good color contrast in images

### SEO
- Use descriptive page titles
- Include relevant keywords naturally
- Structure content with proper headings

## Troubleshooting

### Cards not displaying
- Check that your query-index.xlsx file is published
- Verify all paths in the spreadsheet are correct
- Ensure images are accessible and properly sized

### Modal content not loading
- Confirm individual pages are published
- Check that paths match exactly between query-index and actual pages
- Verify `.plain.html` endpoints are accessible

### Images not showing
- Check image paths are correct and absolute
- Ensure images are published and accessible
- Verify image file formats are supported (JPEG, PNG, GIF, SVG)

## Tips for Success

1. **Start Simple**: Begin with basic cards and add complexity gradually
2. **Test Regularly**: Use the test page to verify your content displays correctly
3. **Optimize Images**: Use appropriate sizes and formats for best performance
4. **Keep Content Fresh**: Regular updates keep your cards engaging
5. **Monitor Performance**: Check loading times and user engagement

## Support

For technical issues or questions about implementation, refer to:
- [Block Documentation](README.md)
- [Implementation Plan](../../docs/shoelace-card-implementation-plan.md)
- [EDS Documentation](https://www.aem.live/docs/)
