# CSS Naming Convention Style Guide

*Related: [Frontend Guidelines](guidelines/frontend-guidelines.md) | [EDS Appendix](eds-appendix.md) | [Block Architecture Standards](block-architecture-standards.md)*

## Overview

This style guide establishes consistent CSS selector naming conventions for EDS (Edge Delivery Services) blocks and components. Following these conventions ensures maintainable, predictable, and conflict-free styling across all components.

*See also: [Design Philosophy Guide](design-philosophy-guide.md) for EDS principles | [EDS Architecture Standards](eds-architecture-standards.md) for architectural patterns*

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

## Block Documentation Standards

### Documentation Structure Template

All block README files must follow the standardized template from [`EDS Appendix`](eds-appendix.md) to ensure consistency and completeness across the project.

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

## Conclusion

Following these naming conventions ensures:
- **Consistent developer experience** across all components
- **Predictable class names** that are easy to understand
- **Conflict-free styling** between different components
- **EDS compatibility** with proper block structure
- **Maintainable codebase** that scales with project growth

For questions or clarifications about these conventions, refer to the component examples in the `/blocks/` directory or consult the EDS documentation.

---

## See Also

### Core Development Standards & Guidelines
- **[Frontend Guidelines](guidelines/frontend-guidelines.md)** - Comprehensive frontend development standards including CSS best practices and component styling
- **[EDS Appendix](eds-appendix.md)** - Complete development reference guide with CSS patterns, naming conventions, and best practices
- **[Block Architecture Standards](block-architecture-standards.md)** - Architectural standards for EDS block development and component structure
- **[Design Philosophy Guide](design-philosophy-guide.md)** - Understanding the philosophical principles behind EDS architecture and styling decisions

### EDS Foundation & Architecture
- **[EDS Overview](eds.md)** - Complete introduction to Edge Delivery Services architecture and core concepts
- **[EDS Architecture Standards](eds-architecture-standards.md)** - Architectural patterns and standards for EDS-native block development
- **[Raw EDS Blocks Guide](raw-eds-blocks-guide.md)** - Step-by-step guide for creating simple EDS blocks with proper CSS structure
- **[Complex EDS Blocks Guide](complex-eds-blocks-guide.md)** - Advanced block development with build tools while maintaining CSS standards

### Implementation & Development
- **[Build Blocks Clarification](build_blocks_clarification.md)** - Understanding dual-directory architecture and CSS organization
- **[Build Component Template](build-component-template.md)** - Template for advanced components with CSS naming standards
- **[EDS Native Testing Standards](eds-native-testing-standards.md)** - Testing standards including CSS structure validation
- **[Server README](server-README.md)** - Development server setup for CSS and component development

### Advanced Topics & Quality Assurance
- **[EDS Architecture and Testing Guide](EDS-Architecture-and-Testing-Guide.md)** - Advanced testing including CSS validation and structure testing
- **[Debug Guide](debug.md)** - Debugging CSS issues and component styling problems
- **[Performance Optimization](performance-optimization.md)** - CSS performance optimization and efficient styling techniques
- **[Browser Compatibility](browser-compatibility.md)** - Ensuring CSS compatibility across browsers and devices

## Next Steps

### For Frontend Developers & Component Authors
1. **Master the CSS naming conventions** outlined in this guide for consistent and maintainable component styling
2. **Apply the EDS-specific guidelines** including proper block selectors, data attributes, and content structure
3. **Follow the CSS architecture guidelines** including container element rules, custom properties, and namespace isolation
4. **Use the validation checklist** before committing code to ensure adherence to naming standards
5. **Implement the documentation standards** for comprehensive block documentation with proper CSS examples

### For UX/UI Designers & Design System Teams
1. **Understand the naming conventions** to create design specifications that align with CSS implementation standards
2. **Learn the EDS block structure** to design components that work seamlessly with the established CSS architecture
3. **Collaborate on CSS custom properties** to create consistent design tokens that follow the naming patterns
4. **Create design documentation** that references the CSS naming conventions for seamless designer-developer handoff
5. **Establish design validation processes** that ensure designs can be implemented using the documented CSS standards

### For QA Engineers & Test Specialists
1. **Learn the CSS validation checklist** to create comprehensive tests that verify proper naming convention adherence
2. **Understand the EDS-specific guidelines** to validate proper block structure, data attributes, and CSS organization
3. **Test CSS architecture compliance** including container element usage, custom properties, and namespace isolation
4. **Create automated CSS validation** that can detect naming convention violations and structural issues
5. **Establish quality gates** that ensure all components meet the CSS naming and architecture standards

### For Team Leads & Project Managers
1. **Establish CSS coding standards** based on the comprehensive naming conventions and architecture guidelines
2. **Implement code review processes** that ensure adherence to the CSS naming patterns and EDS-specific requirements
3. **Plan training programs** that help team members understand and apply the CSS naming conventions consistently
4. **Monitor code quality metrics** using the validation checklist as benchmarks for CSS development practices
5. **Create governance processes** that ensure ongoing compliance with CSS naming and documentation standards

### For DevOps & Build Engineers
1. **Understand the CSS architecture requirements** and how they affect build processes and asset optimization
2. **Implement automated validation** that can detect CSS naming convention violations and structural issues
3. **Configure development environments** that support the CSS naming patterns and EDS block structure requirements
4. **Set up CSS linting and validation** that enforces the naming conventions and architecture guidelines
5. **Create deployment procedures** that ensure CSS naming standards are maintained in production environments

### For Security & Compliance Teams
1. **Review the CSS naming patterns** to ensure they don't introduce security vulnerabilities or naming conflicts
2. **Assess the documentation standards** to ensure they meet organizational requirements for code documentation
3. **Evaluate the validation processes** to ensure they provide adequate quality control for CSS development
4. **Establish security guidelines** that complement the CSS naming conventions and architecture standards
5. **Monitor compliance** with the documented CSS practices and ensure they align with organizational coding standards

### For AI Assistants & Automation
1. **Master the CSS naming conventions** for generating consistent and standards-compliant component styles
2. **Understand the EDS-specific guidelines** including block selectors, data attributes, and content structure requirements
3. **Apply the CSS architecture principles** when creating or modifying component styles and documentation
4. **Follow the documentation standards** to create comprehensive CSS documentation that meets project requirements
5. **Implement the validation checklist** in automated workflows to ensure generated CSS meets all naming and architecture standards