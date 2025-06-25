# CSS Naming Convention Style Guide

## Overview

This style guide establishes consistent CSS selector naming conventions for EDS (Edge Delivery Services) blocks and components. Following these conventions ensures maintainable, predictable, and conflict-free styling across all components.

## Core Principles

1. **Consistency**: Use the same naming pattern throughout the project
2. **Clarity**: Class names should clearly indicate their purpose and hierarchy
3. **EDS Compatibility**: Follow EDS block structure requirements
4. **Namespace Isolation**: Prevent conflicts between components

## Standard Naming Conventions

### 1. EDS Block Structure

#### Block Container (JavaScript Selector)
```css
.block-name.block
```
**Usage**: Primary selector for JavaScript decoration functions
**Example**: `.counter.block`, `.shoelace-card.block`

#### Block Element (CSS Styling)
```css
.block-name
```
**Usage**: Base styling for the block component
**Example**: `.counter`, `.shoelace-card`

### 2. Structural Elements

#### Container Elements
```css
.block-name-container
```
**Usage**: Structural wrapper elements (avoid styling directly)
**Example**: `.counter-container`, `.shoelace-card-container`

#### Wrapper Elements
```css
.block-name-wrapper
```
**Usage**: Layout and positioning containers
**Example**: `.counter-wrapper`, `.shoelace-card-wrapper`

### 3. Component Elements

#### Functional Elements
```css
.block-name-element
.block-name-button
.block-name-display
.block-name-header
.block-name-content
.block-name-footer
```
**Usage**: Specific functional parts of the component
**Examples**: 
- `.counter-button`, `.counter-display`
- `.shoelace-card-header`, `.shoelace-card-content`

#### State Modifiers
```css
.block-name-element-state
```
**Usage**: State variations of elements
**Examples**: 
- `.counter-button-active`
- `.shoelace-card-item-loading`

## Naming Pattern Rules

### ✅ Correct Patterns

```css
/* EDS Block Structure */
.block-name.block              /* JavaScript selector */
.block-name                    /* Base block styling */

/* Structural Elements */
.block-name-container          /* Structural wrapper */
.block-name-wrapper            /* Layout container */

/* Component Elements */
.block-name-header             /* Component parts */
.block-name-content
.block-name-footer
.block-name-button
.block-name-display

/* State Modifiers */
.block-name-element-active     /* Element states */
.block-name-element-loading
.block-name-element-disabled
```

### ❌ Incorrect Patterns

```css
/* Avoid these patterns */
.block-name-block              /* Wrong: conflicts with EDS .block class */
.blockname-container           /* Wrong: inconsistent hyphenation */
.block_name_container          /* Wrong: use hyphens, not underscores */
.BlockNameContainer            /* Wrong: use lowercase with hyphens */
.container                     /* Wrong: not namespaced */
.header                        /* Wrong: too generic, will conflict */
```

## Hyphenation Rules

### Multi-word Block Names
- **Always use hyphens** to separate words in block names
- **Maintain consistency** throughout all related classes

```css
/* Correct */
.shoelace-card.block
.shoelace-card-container
.shoelace-card-header
.shoelace-card-button-primary

/* Incorrect */
.shoelacecard.block
.shoelace_card-container
.shoelaceCard-header
```

### Single-word Block Names
- **Use lowercase** for single-word block names
- **Add hyphens** for element and modifier suffixes

```css
/* Correct */
.counter.block
.counter-container
.counter-button
.counter-display

/* Incorrect */
.Counter.block
.counter_container
.counterButton
```

## EDS-Specific Guidelines

### JavaScript Selectors
Always use the `.block-name.block` pattern for JavaScript selectors in EDS decoration functions:

```javascript
// Correct
export default function decorate(block) {
  // Target the block with both classes
  const container = block.querySelector('.my-component.block');
}

// In test files
document.querySelector('.my-component.block');
```

### Data Attributes
EDS blocks require specific data attributes:

```html
<div class="block-name block" 
     data-block-name="block-name" 
     data-block-status="initialized">
  <!-- content -->
</div>
```

### Content Structure
Follow EDS nested div structure:

```html
<div class="block-name block" data-block-name="block-name">
  <div>
    <div>
      <!-- Actual content here -->
    </div>
  </div>
</div>
```

## CSS Architecture Guidelines

### 1. Never Style Container Elements
```css
/* ❌ Avoid - containers are structural only */
.block-name-container {
  padding: 1rem; /* Don't do this */
}

/* ✅ Correct - style wrapper or content elements */
.block-name-wrapper {
  padding: 1rem;
}

.block-name-content {
  padding: 1rem;
}
```

### 2. Use CSS Custom Properties
```css
.block-name {
  --block-name-primary-color: #007bff;
  --block-name-spacing: 1rem;
  --block-name-border-radius: 0.375rem;
}

.block-name-button {
  background-color: var(--block-name-primary-color);
  padding: var(--block-name-spacing);
  border-radius: var(--block-name-border-radius);
}
```

### 3. Namespace All Classes
```css
/* ✅ Correct - namespaced with block name */
.counter-button { }
.counter-display { }
.counter-wrapper { }

/* ❌ Incorrect - generic names will conflict */
.button { }
.display { }
.wrapper { }
```

## Quick Reference

| Element Type | Pattern | Example |
|--------------|---------|---------|
| JavaScript Selector | `.block-name.block` | `.counter.block` |
| Base Block | `.block-name` | `.counter` |
| Container | `.block-name-container` | `.counter-container` |
| Wrapper | `.block-name-wrapper` | `.counter-wrapper` |
| Element | `.block-name-element` | `.counter-button` |
| State | `.block-name-element-state` | `.counter-button-active` |

## Common Mistakes to Avoid

1. **Inconsistent hyphenation**: Mixing `.block-name` and `.blockname` patterns
2. **Wrong block selector**: Using `.block-name-block` instead of `.block-name.block`
3. **Styling containers**: Applying styles to `-container` elements
4. **Generic class names**: Using non-namespaced classes like `.header` or `.button`
5. **Underscore usage**: Using underscores instead of hyphens
6. **CamelCase**: Using camelCase instead of kebab-case

## Validation Checklist

Before committing code, verify:

- [ ] All CSS classes follow the hyphenated naming convention
- [ ] JavaScript selectors use `.block-name.block` pattern
- [ ] No styles are applied to `-container` elements
- [ ] All class names are namespaced with the block name
- [ ] Multi-word block names use consistent hyphenation
- [ ] No generic class names that could conflict
- [ ] EDS data attributes are properly set

## Examples by Component Type

### Simple EDS Block
```css
.banner.block { }
.banner-container { }
.banner-wrapper { }
.banner-content { }
.banner-title { }
.banner-description { }
```

### Interactive Component
```css
.counter.block { }
.counter-container { }
.counter-wrapper { }
.counter-display { }
.counter-button { }
.counter-button-increment { }
.counter-button-decrement { }
.counter-button-active { }
```

### Complex Multi-word Component
```css
.shoelace-card.block { }
.shoelace-card-container { }
.shoelace-card-wrapper { }
.shoelace-card-header { }
.shoelace-card-content { }
.shoelace-card-footer { }
.shoelace-card-button-primary { }
.shoelace-card-item-loading { }
```

## Conclusion

Following these naming conventions ensures:
- **Consistent developer experience** across all components
- **Predictable class names** that are easy to understand
- **Conflict-free styling** between different components
- **EDS compatibility** with proper block structure
- **Maintainable codebase** that scales with project growth

For questions or clarifications about these conventions, refer to the component examples in the `/blocks/` directory or consult the EDS documentation.
## Block Documentation Standards

### Documentation Structure Template

All block README files must follow the standardized template from [`docs/for-ai/eds-appendix.md`](for-ai/eds-appendix.md) to ensure consistency and completeness across the project.

#### Required Sections

```markdown
# Block Name
## Overview
## Content Structure
### Example Table Structure
## Variations
### Variation Examples
## Configuration Options
## Accessibility Considerations
## Performance Impact
## Dependencies
## Known Limitations
```

#### Section Guidelines

**Overview**: Brief description of what the block does and its primary use cases.

**Content Structure**: Explain how authors should structure content in Google Docs to use this block, including table structures and content organization.

**Variations**: List all supported variations with examples, including CSS class variations and configuration options.

**Configuration Options**: Any custom configuration options available for developers, including CSS custom properties and JavaScript configuration.

**Accessibility Considerations**: Notes on accessibility features, ARIA attributes, keyboard navigation, and screen reader compatibility.

**Performance Impact**: Any notable performance considerations, optimizations, loading behavior, and resource usage.

**Dependencies**: List any dependencies, requirements, browser support, and external resources.

**Known Limitations**: Document any known issues, limitations, or troubleshooting information.

#### Content Preservation

When standardizing existing documentation:
- Preserve all existing valuable content and technical details
- Maintain working examples and usage instructions
- Keep unique features and implementation details
- Reorganize content to fit the standard template structure

#### Quality Standards

- Use consistent heading levels (H1, H2, H3)
- Include working table examples for content authors
- Provide clear code examples with proper formatting
- Use relative links between documentation files
- Ensure all sections are complete and accurate