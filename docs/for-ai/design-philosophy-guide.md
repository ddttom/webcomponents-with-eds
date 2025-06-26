# EDS Component Design Philosophy
## Bridging Simplicity and Sophistication

### The Fundamental Tension

Adobe Edge Delivery Services (EDS) champions a philosophy of **radical simplicity**:
- Vanilla JavaScript with minimal dependencies
- Direct DOM manipulation
- Performance-first architecture
- Files you can edit directly

But modern web development demands **sophisticated capabilities**:
- Rich design systems
- Complex interactions
- Advanced UI components
- Modern development workflows

This guide establishes a **conscious architectural approach** that respects both needs.

## **Critical EDS Concept: Served vs Rendered HTML** 📄

### **Understanding EDS HTML Transformation**

EDS processes HTML in two distinct states, and understanding this is crucial for block development:

#### **Served HTML** (Pre-EDS Processing)
**What CMS/authoring delivers to EDS:**
```html
<!-- Minimal structure from content management -->
<div class="shoelace-card">
  /slides/query-index.json
</div>
```

#### **Rendered HTML** (Post-EDS Processing) 
**What EDS creates after transformation:**
```html
<!-- Full structure after EDS scripts process it -->
<div class="shoelace-card block" data-block-name="shoelace-card" data-block-status="initialized">
  <div>
    <div>/slides/query-index.json</div>
  </div>
</div>
```

### **Why Both Matter for Development**

**Your `decorate` function receives the RENDERED HTML** - but understanding both states helps with:

1. **Content Extraction**: Knowing how EDS nests content in `<div><div>` structure
2. **Debugging**: Understanding what EDS added vs what was authored
3. **Compatibility**: Ensuring blocks work regardless of CMS output variations
4. **Testing**: Validating both pre and post-EDS processing states

### **Two Test Files Pattern**

Some complex blocks include both test files to validate different scenarios:

```
/blocks/shoelace-card/
├── test.html              # 🎯 Rendered HTML testing (standard)
└── test2.html             # 📄 Served HTML testing (edge cases)
```

**`test.html` (Rendered HTML Testing):**
- Tests component with full EDS structure
- Standard testing approach for block decoration
- What your `decorate` function actually receives

**`test2.html` (Served HTML Testing):**
- Tests component with minimal/raw HTML structure  
- Validates EDS processing works correctly
- Catches edge cases in content extraction

## **Critical EDS Constraint: Fixed Block Names** 🔒

### **Understanding EDS Dynamic Loading**

**EDS automatically generates file paths from HTML class names.** This is a fundamental architectural constraint that affects all development decisions.

When EDS encounters this HTML:
```html
<div class="my-component">Content here</div>
```

EDS **automatically and dynamically**:

1. **Transforms the element**:
   ```html
   <div class="my-component block" data-block-name="my-component" data-block-status="initialized">
   ```

2. **Constructs import paths** (in `scripts/aem.js`):
   ```javascript
   // This path is generated automatically - you cannot change it
   const mod = await import(`${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.js`);
   ```

3. **Requires EXACT file structure**:
   ```
   /blocks/my-component/my-component.js   ← MUST match class name exactly
   /blocks/my-component/my-component.css  ← MUST match class name exactly
   ```

### **What This Means for Development**

❌ **You CANNOT:**
- Use different file names than your class name
- Redirect imports to different files
- Have "prettier" or more descriptive file names
- Use aliases or alternative paths

✅ **You MUST:**
- Match file names exactly to HTML class names
- Accept EDS's rigid naming requirements
- Design your architecture within these constraints

### **Why the Dual-Directory Architecture Exists**

This constraint is precisely why the dual-directory approach is necessary:

```
HTML: <div class="shoelace-card">           ← Fixed class name
      
Build: /build/shoelace-card/              ← Flexible development
       ├── any-file-names.js              ← Freedom during development
       ├── package.json                   ← Modern tooling
       └── fancy-build-process.config.js  ← Complex workflows

Deploy: /blocks/shoelace-card/            ← EDS requirements
        ├── shoelace-card.js              ← MUST match class name
        └── shoelace-card.css             ← MUST match class name
```

The build process acts as a "translator" between flexible development and rigid deployment requirements.

## Core Principles

### 1. **Conscious Complexity**
> Never drift into complexity - choose it deliberately.

Every complex component should answer: **"What capability does this complexity enable that justifies the cost?"**

**Cost of Complexity:**
- Larger bundle sizes (130KB vs 10KB)
- Build process dependencies
- External library maintenance
- Debugging complexity

**Benefits of Complexity:**
- Professional design system consistency
- Advanced user interactions
- Rich component ecosystems
- Modern development tooling

### 2. **Enhancement Over Replacement**
> Preserve content, enhance experience.

**EDS-Native Pattern (Preferred):**
```javascript
// ✅ Enhance existing content
export default function decorate(block) {
  const content = block.querySelector('div div');
  const data = content.textContent.trim();
  
  // Add functionality without destroying structure
  block.classList.add('enhanced');
  content.appendChild(createEnhancement(data));
}
```

**Replacement Pattern (When Necessary):**
```javascript
// ⚠️ Replace only when enhancement is impossible
export default async function decorate(block) {
  // Extract content FIRST
  const data = extractContent(block);
  
  // Build COMPLETE structure in memory
  const newStructure = await buildStructure(data);
  
  // Replace ATOMICALLY when ready
  block.innerHTML = '';
  block.appendChild(newStructure);
}
```

### 3. **Fail Safely**
> If enhancement fails, preserve the original experience.

```javascript
export default async function decorate(block) {
  try {
    await enhanceBlock(block);
  } catch (error) {
    console.error('Enhancement failed:', error);
    // Original content remains intact
    // User gets basic experience, not broken experience
  }
}
```

## Architectural Decision Framework

### When to Choose Simple (EDS-Native) Pattern

**Choose Simple When:**
- ✅ Vanilla JavaScript suffices
- ✅ Basic styling meets requirements
- ✅ No external dependencies needed
- ✅ Quick development cycles essential
- ✅ Performance is critical
- ✅ Team prefers minimal tooling

**Examples:**
- Text formatters
- Basic cards
- Content blocks
- Simple layouts
- Utility components

### When to Choose Complex (Build-Enhanced) Pattern

**Choose Complex When:**
- ✅ Design system consistency is business-critical
- ✅ Rich interactions provide real user value
- ✅ Component has 5+ interactive elements
- ✅ External libraries significantly reduce development time
- ✅ Team has build process capabilities
- ✅ Maintenance overhead is acceptable

**Examples:**
- Data visualization components
- Rich media galleries
- Advanced form components
- Design system implementations
- Complex modal systems

### The Gray Zone: Progressive Enhancement

For components that fall between simple and complex:

```javascript
export default function decorate(block) {
  // Base functionality (always works)
  addBasicStyling(block);
  
  // Enhanced functionality (if possible)
  if (window.customElements) {
    enhanceWithWebComponents(block);
  }
  
  // Advanced functionality (if libraries available)
  if (window.SomeLibrary) {
    addAdvancedFeatures(block);
  }
}
```

## Implementation Patterns

### Pattern 1: EDS-Native (Simple)
```
/blocks/component-name/
├── component-name.js       # Vanilla JavaScript
├── component-name.css      # Pure CSS
├── test.html              # Test file
├── README.md              # Documentation
└── example.md             # Author examples
```

**Characteristics:**
- No build process
- Direct file editing
- Zero external dependencies
- Works immediately in EDS

### Pattern 2: Build-Enhanced (Complex)
```
/build/component-name/      # Development workspace
├── component-name.js       # Source with imports
├── component-name.css      # Source styles
├── package.json           # Dependencies
├── vite.config.js         # Build config + proxy to production
├── index.html             # 🔧 Development test (Vite auto-serves)
├── DEV-README.md          # Developer docs
├── USER-README.md         # Author docs
└── dist/                  # Build output

/blocks/component-name/     # Deployment artifacts
├── component-name.js       # Bundled file
├── component-name.css      # Stub file
├── README.md              # User docs
└── test.html              # 🧪 EDS integration test
```

**Characteristics:**
- Modern development workflow
- External dependencies bundled
- Build process required
- Self-contained deployment
- **Two-stage testing**: Development (`index.html`) + EDS integration (`test.html`)
- **Dual proxy system**: Vite proxy (dev) + EDS server proxy (integration)

### **🔄 Dual Proxy Architecture**

The build-enhanced pattern uses **two proxy systems** to enable development with real production data:

**Development Phase (Vite Proxy):**
```javascript
// vite.config.js
proxy: {
  '/slides': { target: 'https://allabout.network' },
  '/media': { target: 'https://allabout.network' },
  '/api': { target: 'https://allabout.network' }
}
```

**EDS Integration Phase (Server.js Proxy):**
```javascript
// Built into EDS debug server
// Automatically proxies missing assets to production site
```

**Benefits:**
- **Real data during development** - no complex mocking required
- **Production assets during testing** - images, fonts, content work immediately  
- **Seamless workflow** - from development to integration with consistent data

## Quality Standards

### All Components Must

**Technical Requirements:**
- ✅ Export `decorate` function as default
- ✅ Accept block element as parameter
- ✅ Maintain EDS attributes (`data-block-name`, `data-block-status`)
- ✅ Follow CSS naming conventions (`.block-name.block`)
- ✅ Include comprehensive error handling

**User Experience Requirements:**
- ✅ Provide loading states for async operations
- ✅ Graceful degradation on failure
- ✅ Accessible keyboard navigation
- ✅ Screen reader compatibility
- ✅ Mobile-responsive design

**Documentation Requirements:**
- ✅ Clear installation/usage instructions
- ✅ Content structure examples
- ✅ Configuration options
- ✅ Troubleshooting guide
- ✅ Browser compatibility notes

## Team Guidelines

### Development Workflow

1. **Start Simple**: Begin with EDS-native approach
2. **Validate Need**: Confirm complexity is justified
3. **Choose Pattern**: Select appropriate architecture
4. **Document Trade-offs**: Record why complexity was chosen
5. **Monitor Impact**: Track performance and maintenance costs

### Code Review Checklist

**For Simple Components:**
- [ ] No external dependencies
- [ ] Direct DOM enhancement only
- [ ] Preserves original content on failure
- [ ] Follows EDS naming conventions

**For Complex Components:**
- [ ] Complexity is justified by clear benefits
- [ ] Build process is documented
- [ ] Bundle size is acceptable
- [ ] Fallback behavior is defined
- [ ] Deployment process is automated

### Decision Documentation

For every component, document:

```markdown
## Architectural Decision

**Chosen Pattern**: [Simple/Complex]

**Justification**: [Why this pattern was selected]

**Trade-offs Accepted**:
- Performance: [Bundle size, load time impact]
- Maintenance: [Dependencies, build complexity]
- Development: [Tooling requirements, team skills]

**Success Metrics**: [How to measure if choice was correct]
```

## Evolution Strategy

### Migration Paths

**Simple → Complex (When Requirements Grow):**
1. Create `/build/component-name/` directory
2. Set up build process
3. Migrate code to build environment
4. Add external dependencies
5. Update documentation

**Complex → Simple (When Simplifying):**
1. Evaluate if external dependencies are still needed
2. Inline essential functionality
3. Remove build process
4. Move to direct editing model

### Continuous Evaluation

**Quarterly Review Questions:**
- Are complex components still providing value proportional to their cost?
- Can any complex components be simplified?
- Are simple components missing critical functionality?
- What new patterns have emerged in the industry?

## Success Patterns

### When Simple Works Best

**Example: Text Highlighter Block**
```javascript
export default function decorate(block) {
  const text = block.textContent.trim();
  const highlighted = text.replace(/\*\*(.*?)\*\*/g, '<mark>$1</mark>');
  block.innerHTML = highlighted;
}
```

**Why It Works:**
- Clear, single purpose
- No external dependencies
- Immediate functionality
- Easy to understand and modify

### When Complex Is Justified

**Example: Data Visualization Dashboard**
- Requires charting library (D3, Chart.js)
- Complex data processing
- Rich interactions
- Real-time updates

**Justification:**
- Would take months to build from scratch
- Library provides tested, accessible components
- Business value significantly exceeds complexity cost

## Conclusion

The goal isn't to avoid complexity - it's to **choose complexity consciously** and **implement it safely**. The dual-directory architecture provides the flexibility to make the right choice for each component while maintaining consistency and quality across the entire system.

**Remember**: The best code is often the code you don't write. Always question whether complexity is truly necessary, but don't hesitate to embrace it when the benefits are clear and the implementation is solid.

---

*This philosophy evolves with experience. Contribute feedback and learnings to keep it relevant and practical.*