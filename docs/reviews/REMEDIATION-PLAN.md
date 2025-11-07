# Critical Issues Remediation Plan

**Project:** AllAbout V2
**Based On:** [PROJECT-REVIEW.md](PROJECT-REVIEW.md) Lines 19-26
**Date:** 2025-11-07
**Status:** Planning Phase - No Code Changes Yet

---

## Executive Summary

This document provides a detailed remediation plan for the five critical issues identified in the project review:

1. Inconsistent code quality across blocks
2. CSS organization needs standardization
3. Missing accessibility features in several blocks
4. Incomplete documentation for many blocks
5. Performance optimization opportunities not fully leveraged

Each issue is analyzed with specific findings, impact assessment, and a phased remediation approach.

---

## Issue 1: Inconsistent Code Quality Across Blocks

### Current State Analysis

**Blocks Inventory:** 45 blocks total

**File Structure Completeness:**
- 33 blocks (73%) have README files
- 45 blocks (100%) have JavaScript files
- 45 blocks (100%) have CSS files
- 12 blocks (27%) missing README files

**Code Quality Issues Identified:**

#### JavaScript Quality Issues:
1. **Unused Parameters** - Example: [hero.js](../../blocks/hero/hero.js:1)
   - `block` parameter passed but not used
   - Using global `document.querySelector` instead of scoped queries

2. **Missing Error Handling** - Multiple blocks
   - No null checks for DOM queries
   - No try/catch for async operations
   - Fragile selectors that can break easily

3. **Missing JSDoc Comments** - Majority of blocks
   - No function documentation
   - No parameter descriptions
   - No return value documentation

4. **Complex Selectors** - Multiple blocks
   - Example: `.hero > div:first-of-type > div:nth-of-type(2) picture`
   - Fragile and hard to maintain
   - Should use scoped queries

5. **Linting Infrastructure Issues:**
   - ESLint configuration exists but has errors
   - ESLint 9.0.0 compatibility issue with `.eslintrc.js`
   - Stylelint not installed (`stylelint: command not found`)
   - No pre-commit hooks to enforce quality

**Block Size Analysis:**
```
Largest blocks (lines of code):
- shoelace-card: 2,773 lines (may need refactoring)
- spectrum-card: 2,270 lines (may need refactoring)
- dps: 2,043 lines (complex, needs review)
- code-expander: 774 lines (acceptable complexity)
- dfs: 758 lines (acceptable complexity)
```

### Impact Assessment

**Severity:** HIGH

**Impacts:**
- Increased maintenance burden
- Higher risk of bugs and regressions
- Difficult onboarding for new developers
- Inconsistent user experience
- Technical debt accumulation

### Remediation Strategy

#### Phase 1: Foundation (Week 1-2)

**1.1 Fix Linting Infrastructure**
- Priority: CRITICAL
- Effort: 2-4 hours

Tasks:
- [ ] Upgrade ESLint configuration to v9.x flat config format
- [ ] Install stylelint locally: `npm install --save-dev stylelint`
- [ ] Verify linting scripts work: `npm run lint:js` and `npm run lint:css`
- [ ] Document any intentional ESLint rule overrides
- [ ] Run linting and establish baseline

**1.2 Create Code Quality Standards Document**
- Priority: HIGH
- Effort: 4-6 hours

Tasks:
- [ ] Document JavaScript patterns (scoped queries, error handling)
- [ ] Create JSDoc template for block functions
- [ ] Define selector complexity guidelines
- [ ] Create code review checklist
- [ ] Add to `docs/for-ai/guidelines/`

**1.3 Setup Pre-commit Hooks**
- Priority: MEDIUM
- Effort: 2-3 hours

Tasks:
- [ ] Install husky: `npm install --save-dev husky`
- [ ] Configure pre-commit hook for linting
- [ ] Add to project documentation
- [ ] Test with sample commit

#### Phase 2: Priority Block Fixes (Week 3-4)

**2.1 Fix Critical Blocks First**
- Priority: HIGH
- Effort: 16-24 hours

Blocks to fix (in order):
1. **hero** - Most visible, fragile code
   - Fix unused parameter
   - Add error handling
   - Use scoped queries
   - Add JSDoc

2. **header** - Complex but mostly good
   - Add JSDoc documentation
   - Simplify some complex sections

3. **footer** - Simple, needs documentation
   - Add README
   - Add JSDoc

4. **cards** - Missing README
   - Create comprehensive README
   - Add usage examples

5. **columns** - Missing README
   - Create comprehensive README
   - Document layout options

6. **grid** - Missing README, generated CSS
   - Create README explaining generation
   - Document source files

#### Phase 3: Systematic Block Improvement (Week 5-8)

**3.1 Batch Process Remaining Blocks**
- Priority: MEDIUM
- Effort: 40-60 hours

Process per block (2-3 hours each):
1. Run linting and fix errors
2. Add JSDoc to all functions
3. Add error handling where missing
4. Convert to scoped queries
5. Update or create README
6. Test functionality

Blocks grouped by complexity:
- **Simple blocks (15 blocks, ~1 hour each):** accordion, bio, embed, fragment, helloworld, index, modal, quote, raw, search, tabs, tags, text, video, returntotop
- **Medium blocks (20 blocks, ~2-3 hours each):** bloglist, blogroll, cards, centreblock, columns, comment, counter, dam, dashboard, dynamic, floating-alert, grid, inline-svg, markdown, react-slide-builder, remove-icon-styles, slide-builder, vue-slide-builder, table, 3dcube
- **Complex blocks (10 blocks, ~4-6 hours each):** code-expander, dfs, dps, header, hero, search, showcaser, shoelace, shoelace-card, spectrum-card

**3.2 Refactor Oversized Blocks**
- Priority: MEDIUM
- Effort: 20-30 hours

Candidates:
- **shoelace-card (2,773 lines)**
  - Assess if code can be split into modules
  - Consider if complexity is justified
  - Document architecture if keeping as-is

- **spectrum-card (2,270 lines)**
  - High !important usage indicates CSS conflicts
  - May need architectural review
  - Consider refactoring CSS approach

- **dps (2,043 lines)**
  - Review if all functionality is necessary
  - Consider breaking into smaller blocks
  - Document complex sections

#### Phase 4: Continuous Improvement (Ongoing)

**4.1 Establish Quality Gates**
- All new blocks must pass linting
- All blocks must have README
- All functions must have JSDoc
- All PRs must pass code review checklist

**4.2 Regular Code Reviews**
- Weekly review of changed blocks
- Monthly review of least-maintained blocks
- Quarterly comprehensive audit

---

## Issue 2: CSS Organization Needs Standardization

### Current State Analysis

**Detailed CSS Audit Results:**

**Mobile-First vs Desktop-First:**
- Desktop-first (wrong): 13 blocks (28%)
- Mobile-first (correct): 7 blocks (15%)
- No responsive design: 26 blocks (57%)

**Breakpoint Inconsistencies:**
```
768px  - 7 blocks (desktop-first, should be 600px or 900px)
767px  - 3 blocks (off-by-one of 768px)
480px  - 3 blocks (non-standard, should be 600px)
900px  - 6 blocks (correct EDS standard) ✓
600px  - 3 blocks (correct EDS standard) ✓
1200px - 1 block (correct EDS standard) ✓
700px  - 1 block (non-standard)
1023px - 1 block (non-standard)
```

**Unit Usage Analysis:**
- px-based sizing: Dominant (66 instances of 1px, 48 of 10px, 36 of 20px)
- rem-based sizing: Minimal (29 instances total)
- % responsive sizing: 55 instances (good)
- Other units: picas (pc) found in hero.css (unusual)

**CSS Custom Properties:**
- Only 10 of 46 blocks use CSS variables
- 120 total custom properties across those 10
- Best example: code-expander (51 variables) ✓
- Worst: Most blocks have zero variables

**Critical CSS Issues:**
1. **hero.css** - Desktop-first, 1000px min-height, uses picas
2. **spectrum-card.css** - 15 !important flags (CSS specificity war)
3. **grid.css** - Generated, minified, unreadable
4. **bio.css** - Desktop-first approach
5. **Multiple blocks** - Missing responsive breakpoints entirely

**Selector Specificity Issues:**
- Universal selector in hero: `.hero-wrapper *` (bad)
- Deep nesting: `.header nav .nav-sections .default-content-wrapper > ul > li`
- Body-scoped selectors: `body.techem .hero-wrapper`

**Typos Found:**
- hero.css:45 - `body.techem hero-wrapper a` (missing dot before hero-wrapper)

### Impact Assessment

**Severity:** HIGH

**Impacts:**
- Poor mobile user experience
- Inconsistent responsive behavior
- Difficult to maintain and theme
- Specificity conflicts requiring !important
- Accessibility issues (hard-coded px sizes)
- Not following EDS standards

### Remediation Strategy

#### Phase 1: Standards & Guidelines (Week 1)

**1.1 Create CSS Standards Document**
- Priority: CRITICAL
- Effort: 4-6 hours

Document must include:
- [ ] Mobile-first principles and examples
- [ ] EDS standard breakpoints (600px, 900px, 1200px)
- [ ] Unit usage guidelines (prefer rem for sizing)
- [ ] CSS custom property patterns
- [ ] Selector specificity best practices
- [ ] Media query syntax standard: `@media (width >= XXXpx)`
- [ ] Color contrast requirements

**1.2 Create CSS Template**
- Priority: HIGH
- Effort: 2-3 hours

Create template file: `docs/templates/block-styles-template.css`
```css
/* Mobile-first base styles */
.block-name {
  /* Use rem for spacing */
  padding: 1rem;
  /* Use CSS custom properties for colors */
  background-color: var(--block-name-bg, #fff);
}

/* Tablet breakpoint */
@media (width >= 600px) {
  .block-name {
    padding: 2rem;
  }
}

/* Desktop breakpoint */
@media (width >= 900px) {
  .block-name {
    padding: 3rem;
  }
}

/* Large desktop breakpoint */
@media (width >= 1200px) {
  .block-name {
    max-width: 1200px;
  }
}
```

#### Phase 2: Critical CSS Fixes (Week 2-3)

**2.1 Fix Hero Block (Priority 1)**
- Priority: CRITICAL
- Effort: 3-4 hours
- File: [blocks/hero/hero.css](../../blocks/hero/hero.css)

Tasks:
- [ ] Convert to mobile-first approach
- [ ] Replace 1000px min-height with responsive values
- [ ] Fix typo at line 45 (missing dot)
- [ ] Replace picas with rem
- [ ] Add proper breakpoints (600px, 900px, 1200px)
- [ ] Remove universal selector (`*`)
- [ ] Add CSS custom properties for theming
- [ ] Test across devices

**2.2 Fix Spectrum Card CSS (Priority 2)**
- Priority: HIGH
- Effort: 4-6 hours
- File: [blocks/spectrum-card/spectrum-card.css](../../blocks/spectrum-card/spectrum-card.css)

Tasks:
- [ ] Investigate why 15 !important flags needed
- [ ] Refactor to reduce specificity conflicts
- [ ] Consider if block-level reset is needed
- [ ] Replace !important with proper cascade
- [ ] Test thoroughly (likely fragile)

**2.3 Fix Bio Block (Priority 3)**
- Priority: HIGH
- Effort: 2-3 hours
- File: [blocks/bio/bio.css](../../blocks/bio/bio.css)

Tasks:
- [ ] Convert from desktop-first to mobile-first
- [ ] Update breakpoints to EDS standards
- [ ] Use rem instead of px for sizing
- [ ] Test responsive behavior

#### Phase 3: Standardization Sweep (Week 4-7)

**3.1 Batch Convert Desktop-First Blocks**
- Priority: HIGH
- Effort: 26-39 hours (13 blocks × 2-3 hours each)

Blocks to convert (13 total):
1. bio ✓ (done in Phase 2)
2. code-expander
3. accordion
4. bloglist
5. cards
6. columns
7. dam
8. embed
9. footer
10. fragment
11. header (partial)
12. search
13. tabs

Process per block:
- [ ] Identify all media queries
- [ ] Reverse logic (max-width → min-width)
- [ ] Update breakpoint values to standards
- [ ] Test mobile → tablet → desktop progression
- [ ] Document changes in commit

**3.2 Add Responsive Design to Non-Responsive Blocks**
- Priority: MEDIUM
- Effort: 52-78 hours (26 blocks × 2-3 hours each)

26 blocks currently lack responsive design:
- 3dcube, blogroll, centreblock, comment, counter, dashboard, dfs, dps, dynamic, floating-alert, grid, helloworld, hero (partial), index, inline-svg, markdown, modal, quote, raw, react-slide-builder, remove-icon-styles, returntotop, shoelace, shoelace-card, showcaser, slide-builder, spectrum-card, table, tags, text, video, vue-slide-builder

Process per block:
- [ ] Assess if responsiveness needed (some may be inherently responsive)
- [ ] Add mobile base styles
- [ ] Add tablet breakpoint (600px)
- [ ] Add desktop breakpoint (900px)
- [ ] Test across viewports
- [ ] Document responsive behavior in README

**3.3 Convert px to rem for Typography and Spacing**
- Priority: MEDIUM
- Effort: 20-30 hours

Process:
- [ ] Audit all blocks for px usage
- [ ] Convert font-size to rem
- [ ] Convert padding/margin to rem
- [ ] Keep borders at px (acceptable)
- [ ] Update CSS standards with conversion guide (16px = 1rem)
- [ ] Test with browser zoom
- [ ] Test with user font size preferences

**3.4 Add CSS Custom Properties**
- Priority: MEDIUM
- Effort: 30-40 hours

Process per block:
- [ ] Identify themeable values (colors, spacing, fonts)
- [ ] Create custom properties with fallbacks
- [ ] Update global styles with root variables
- [ ] Document variables in README
- [ ] Create theming guide

Example pattern:
```css
.block {
  --block-bg: var(--color-background, #fff);
  --block-text: var(--color-text, #000);
  --block-spacing: var(--spacing-base, 1rem);

  background: var(--block-bg);
  color: var(--block-text);
  padding: var(--block-spacing);
}
```

#### Phase 4: Special Cases (Week 8-9)

**4.1 Address Grid.css Generation**
- Priority: MEDIUM
- Effort: 4-8 hours

Tasks:
- [ ] Find source files for grid generation
- [ ] Document generation process
- [ ] Create readable source version
- [ ] Consider if generation is necessary
- [ ] Update build process if needed
- [ ] Add comments to generated file

**4.2 Stylelint Configuration Enhancement**
- Priority: LOW
- Effort: 2-4 hours

Tasks:
- [ ] Add stylelint rules for mobile-first
- [ ] Add rules for unit preferences
- [ ] Add rules for selector specificity
- [ ] Configure breakpoint linting
- [ ] Document exceptions

#### Phase 5: Validation & Documentation (Week 10)

**5.1 CSS Quality Audit**
- Priority: HIGH
- Effort: 8-12 hours

Tasks:
- [ ] Run stylelint on all blocks
- [ ] Verify all blocks are mobile-first
- [ ] Verify breakpoint consistency
- [ ] Check rem usage compliance
- [ ] Validate CSS custom properties
- [ ] Test responsive behavior on all blocks

**5.2 Update Documentation**
- Priority: HIGH
- Effort: 4-6 hours

Tasks:
- [ ] Update CLAUDE.md with CSS standards
- [ ] Update docs/for-ai/ with CSS guidelines
- [ ] Create CSS migration guide
- [ ] Document theming system
- [ ] Add CSS to code review checklist

---

## Issue 3: Missing Accessibility Features in Several Blocks

### Current State Analysis

**Accessibility Audit Summary:**

**Blocks with GOOD Accessibility (8 blocks):**
1. **tabs** - Full ARIA implementation (role, aria-controls, aria-selected, aria-labelledby, aria-hidden) ✓
2. **header** - Comprehensive keyboard support, ARIA labels, focus management ✓
3. **floating-alert** - Modal ARIA, ESC key, focus trap, aria-live regions ✓
4. **dfs** (FAQ) - ARIA expanded, keyboard navigation, live regions for search ✓
5. **counter** - ARIA labels on buttons, focus-visible styles ✓
6. **table** - ARIA describedby, proper table semantics, column headers ✓
7. **search** - ARIA labels, keyboard support (ESC key) ✓
8. **code-expander** - Keyboard navigation (arrows), ARIA tooltip, focus management ✓

**Blocks with POOR/MISSING Accessibility (9 blocks):**
1. **returntotop** - No ARIA, no keyboard support, only click handler ✗
2. **video** - Play button lacks ARIA, no keyboard handler ✗
3. **embed** - Play button lacks ARIA, no keyboard handler ✗
4. **accordion** - Relies on browser defaults, no explicit ARIA ✗
5. **inline-svg** - SVGs lack role/aria-label, generic alt text ✗
6. **cards** - No ARIA attributes, no semantic enhancements ✗
7. **bloglist** - Minimal accessibility, no ARIA ✗
8. **quote** - Semantic HTML only, no ARIA enhancements ✗
9. **tags** - No ARIA, no semantic structure ✗

**Critical Accessibility Gaps:**
1. **Missing Alt Text Validation** - No programmatic checking
2. **Limited Focus Management** - Most blocks don't restore focus
3. **Keyboard Navigation Gaps** - Many interactive elements lack keyboard support
4. **Insufficient Live Regions** - Only 1 block uses aria-live
5. **SVG Accessibility** - No role="img" or aria-label on SVGs
6. **Button Accessibility** - Some use div instead of button

**WCAG 2.1 Compliance Estimate:**
- Level A: ~70% compliance (basic semantic HTML)
- Level AA: ~40% compliance (missing ARIA, keyboard support)
- Level AAA: ~20% compliance (limited advanced features)

### Impact Assessment

**Severity:** HIGH

**Impacts:**
- Excludes screen reader users
- Poor keyboard navigation experience
- Legal compliance risk (ADA, Section 508)
- Reduced SEO performance
- Poor user experience for assistive technology users

### Remediation Strategy

#### Phase 1: Accessibility Standards (Week 1)

**1.1 Create Accessibility Guidelines Document**
- Priority: CRITICAL
- Effort: 6-8 hours

Document location: `docs/for-ai/guidelines/accessibility-standards.md`

Must include:
- [ ] WCAG 2.1 Level AA requirements
- [ ] ARIA attribute usage guide
- [ ] Keyboard navigation patterns
- [ ] Focus management best practices
- [ ] Alt text guidelines
- [ ] Color contrast requirements (4.5:1 ratio)
- [ ] Testing procedures
- [ ] Code examples for each pattern

**1.2 Create Accessibility Testing Checklist**
- Priority: HIGH
- Effort: 2-3 hours

Checklist items:
- [ ] All images have meaningful alt text
- [ ] All interactive elements have keyboard support
- [ ] All modals have focus traps
- [ ] All toggles have aria-expanded
- [ ] All buttons have aria-label if no text
- [ ] Color contrast meets 4.5:1 ratio
- [ ] Tab order is logical
- [ ] Screen reader testing completed

**1.3 Setup Accessibility Testing Tools**
- Priority: HIGH
- Effort: 2-4 hours

Tasks:
- [ ] Install axe-core: `npm install --save-dev axe-core`
- [ ] Configure automated accessibility testing
- [ ] Document testing process
- [ ] Add to CI/CD pipeline

#### Phase 2: Critical Accessibility Fixes (Week 2-4)

**2.1 Fix Return to Top Block**
- Priority: CRITICAL
- Effort: 1-2 hours
- File: [blocks/returntotop/returntotop.js](../../blocks/returntotop/returntotop.js)

Tasks:
- [ ] Add aria-label to button: `aria-label="Return to top of page"`
- [ ] Add keyboard support (Enter, Space)
- [ ] Add focus management (optional focus return)
- [ ] Test with keyboard only
- [ ] Test with screen reader

Code pattern:
```javascript
button.setAttribute('aria-label', 'Return to top of page');
button.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
```

**2.2 Fix Video Block Play Button**
- Priority: CRITICAL
- Effort: 1-2 hours
- File: [blocks/video/video.js](../../blocks/video/video.js)

Tasks:
- [ ] Add aria-label: `aria-label="Play video"`
- [ ] Add keyboard support
- [ ] Add loading state announcement
- [ ] Ensure iframe has proper title
- [ ] Test with keyboard and screen reader

**2.3 Fix Embed Block Play Button**
- Priority: CRITICAL
- Effort: 1-2 hours
- File: [blocks/embed/embed.js](../../blocks/embed/embed.js)

Tasks:
- [ ] Add aria-label: `aria-label="Play embedded content"`
- [ ] Add keyboard support
- [ ] Add content type announcement
- [ ] Test with keyboard and screen reader

**2.4 Fix Inline SVG Block**
- Priority: HIGH
- Effort: 2-3 hours
- File: [blocks/inline-svg/inline-svg.js](../../blocks/inline-svg/inline-svg.js)

Tasks:
- [ ] Add role="img" to decorative SVGs
- [ ] Add aria-label to meaningful SVGs
- [ ] Add aria-hidden to purely decorative SVGs
- [ ] Improve alt text (not generic "illustration")
- [ ] Document SVG accessibility pattern

Code pattern:
```javascript
// Meaningful SVG
svgElement.setAttribute('role', 'img');
svgElement.setAttribute('aria-label', 'Descriptive label');

// Decorative SVG
svgElement.setAttribute('aria-hidden', 'true');
```

#### Phase 3: Systematic Accessibility Enhancement (Week 5-8)

**3.1 Add Keyboard Support to Interactive Blocks**
- Priority: HIGH
- Effort: 18-27 hours (9 blocks × 2-3 hours each)

Blocks needing keyboard support:
1. accordion (enhance beyond browser defaults)
2. cards (if interactive)
3. bloglist (if interactive)
4. quote (likely not needed)
5. tags (if interactive)
6. modal (enhance)
7. carousel blocks (react-slide-builder, slide-builder, vue-slide-builder)

Standard keyboard patterns:
- Enter/Space: Activate
- ESC: Close/dismiss
- Arrow keys: Navigate
- Tab: Move between elements
- Shift+Tab: Reverse navigation

**3.2 Add ARIA Attributes to Interactive Elements**
- Priority: HIGH
- Effort: 18-27 hours (9 blocks × 2-3 hours each)

Process per block:
- [ ] Identify interactive elements
- [ ] Add appropriate roles
- [ ] Add aria-labels where needed
- [ ] Add aria-expanded for toggles
- [ ] Add aria-controls for relationships
- [ ] Add aria-hidden for decorative elements
- [ ] Test with screen reader

**3.3 Implement Focus Management**
- Priority: MEDIUM
- Effort: 12-18 hours (6 blocks × 2-3 hours each)

Blocks needing focus management:
1. modal
2. floating-alert (already good, verify)
3. accordion (if enhanced)
4. carousel blocks
5. search (enhance)
6. Any block with overlays

Pattern:
```javascript
// Save focus before opening
const previousFocus = document.activeElement;

// Open modal/overlay
// ... setup code ...

// Trap focus in modal
modal.focus();

// On close, restore focus
closeButton.addEventListener('click', () => {
  modal.remove();
  previousFocus.focus();
});
```

**3.4 Add Live Regions for Dynamic Content**
- Priority: MEDIUM
- Effort: 8-12 hours (4 blocks × 2-3 hours each)

Blocks needing live regions:
1. search (enhance)
2. bloglist (if filtered)
3. cards (if filtered)
4. Any block with dynamic updates

Pattern:
```javascript
const liveRegion = document.createElement('div');
liveRegion.setAttribute('aria-live', 'polite');
liveRegion.setAttribute('aria-atomic', 'true');
liveRegion.className = 'sr-only'; // Visually hidden

// On update
liveRegion.textContent = `${results.length} results found`;
```

**3.5 Validate and Enhance Alt Text**
- Priority: MEDIUM
- Effort: 8-12 hours

Tasks:
- [ ] Audit all blocks for image usage
- [ ] Create alt text validation utility
- [ ] Add warnings for missing/generic alt text
- [ ] Document alt text best practices
- [ ] Create examples for different contexts

Alt text guidelines:
- Informative images: Describe content/function
- Decorative images: Empty alt="" or aria-hidden
- Complex images: Use aria-describedby for long description
- Linked images: Describe destination

#### Phase 4: Accessibility Testing & Validation (Week 9-10)

**4.1 Automated Accessibility Testing**
- Priority: HIGH
- Effort: 4-6 hours

Tasks:
- [ ] Run axe-core on all blocks
- [ ] Fix automated issues found
- [ ] Document exceptions (if any)
- [ ] Add to CI/CD pipeline
- [ ] Create accessibility report

**4.2 Manual Screen Reader Testing**
- Priority: HIGH
- Effort: 12-16 hours

Test each enhanced block with:
- [ ] NVDA (Windows, free)
- [ ] JAWS (Windows, trial)
- [ ] VoiceOver (macOS, built-in)
- [ ] TalkBack (Android, built-in)

Test scenarios:
- Navigate through block with keyboard only
- Verify all content is announced
- Test interactive elements
- Verify focus management
- Test with different verbosity settings

**4.3 Keyboard-Only Testing**
- Priority: HIGH
- Effort: 4-6 hours

Test each block:
- [ ] Disable mouse
- [ ] Navigate with Tab/Shift+Tab only
- [ ] Activate with Enter/Space
- [ ] Close with ESC
- [ ] Verify focus visible at all times
- [ ] Verify logical tab order

**4.4 Color Contrast Audit**
- Priority: MEDIUM
- Effort: 4-6 hours

Tasks:
- [ ] Audit all text/background color combinations
- [ ] Use contrast checker tool
- [ ] Ensure 4.5:1 ratio for normal text
- [ ] Ensure 3:1 ratio for large text (18pt+)
- [ ] Document color palette with ratios
- [ ] Fix any failing combinations

**4.5 Create Accessibility Audit Report**
- Priority: MEDIUM
- Effort: 4-6 hours

Report should include:
- [ ] WCAG 2.1 compliance level achieved
- [ ] List of blocks by compliance level
- [ ] Known issues and exceptions
- [ ] Testing methodology
- [ ] Screenshots of screen reader usage
- [ ] Recommendations for ongoing maintenance

---

## Issue 4: Incomplete Documentation for Many Blocks

### Current State Analysis

**Documentation Completeness Audit:**

**Blocks WITHOUT README (12 blocks - 27%):**
1. cards
2. centreblock
3. columns
4. dashboard
5. footer
6. grid
7. header
8. hero
9. react-slide-builder
10. shoelace
11. slide-builder
12. vue-slide-builder

**Blocks WITH Minimal README (3 lines or less - 13 blocks):**
1. accordion (3 lines)
2. comment (3 lines)
3. embed (3 lines)
4. fragment (3 lines)
5. helloworld (3 lines)
6. index (3 lines)
7. modal (3 lines)
8. quote (3 lines)
9. returntotop (9 lines)
10. search (3 lines)
11. tabs (3 lines)
12. text (17 lines)
13. video (3 lines)

**Blocks WITH Good Documentation (20 blocks - 44%):**
1. 3dcube (51 lines, examples, usage) ✓
2. bio (38 lines)
3. bloglist (44 lines, usage)
4. blogroll (124 lines, examples, usage) ✓
5. code-expander (117 lines, usage) ✓
6. counter (105 lines, usage) ✓
7. dam (34 lines, usage)
8. dfs (186 lines, examples) ✓
9. dps (300 lines, examples, usage) ✓✓
10. dynamic (61 lines)
11. floating-alert (162 lines, examples, usage) ✓
12. inline-svg (91 lines, examples, usage) ✓
13. markdown (46 lines, usage)
14. raw (55 lines, usage)
15. remove-icon-styles (57 lines, examples)
16. shoelace-card (285 lines, examples, usage) ✓✓
17. showcaser (101 lines, usage) ✓
18. spectrum-card (71 lines, usage)
19. table (39 lines, usage)
20. tags (26 lines, examples)

**Documentation Quality Issues:**

1. **Inconsistent Format** - No standard README template
2. **Missing Usage Examples** - 22 blocks (49%) lack usage examples
3. **No API Documentation** - Few blocks document configuration options
4. **Missing Authoring Guidelines** - How to create content for blocks
5. **No Testing Instructions** - How to test blocks locally
6. **Missing Dependencies** - External dependencies not documented
7. **No Migration Guides** - No versioning or breaking changes documented

**Best Practice Examples:**
- **dps (300 lines)** - Comprehensive, examples, usage, API docs
- **shoelace-card (285 lines)** - Detailed, examples, props documented
- **dfs (186 lines)** - Good examples, search functionality documented
- **floating-alert (162 lines)** - Clear usage, configuration options

**Documentation Gaps by Category:**

| Category | Missing | Total | % Complete |
|----------|---------|-------|------------|
| Basic README | 12 | 45 | 73% |
| Usage Examples | 22 | 45 | 49% |
| Configuration Docs | 35 | 45 | 22% |
| Authoring Guide | 40 | 45 | 11% |
| Testing Guide | 43 | 45 | 4% |

### Impact Assessment

**Severity:** HIGH

**Impacts:**
- Difficult for authors to use blocks correctly
- Increased support burden
- Inconsistent block usage across site
- Slow developer onboarding
- Knowledge locked in original developer's head
- Risk of misuse or incorrect implementation

### Remediation Strategy

#### Phase 1: Documentation Standards (Week 1)

**1.1 Create Block README Template**
- Priority: CRITICAL
- Effort: 4-6 hours

Template location: `docs/templates/BLOCK-README-TEMPLATE.md`

Template structure:
```markdown
# [Block Name]

## Description
Brief description of what this block does and when to use it.

## Usage
How to use this block in content.

## Configuration
Available options and how to configure them.

## Examples
Visual examples with code snippets.

## Content Model
Expected content structure for authors.

## Styling
Theming options and CSS custom properties.

## Accessibility
Keyboard shortcuts and screen reader support.

## Browser Support
Supported browsers and known issues.

## Dependencies
External libraries or other blocks required.

## Testing
How to test this block locally.

## Related Blocks
Links to similar or complementary blocks.
```

Tasks:
- [ ] Create comprehensive template
- [ ] Include examples of each section
- [ ] Create minimal vs full template versions
- [ ] Document when to use each section
- [ ] Add to `docs/for-ai/guidelines/`

**1.2 Create Documentation Quality Checklist**
- Priority: HIGH
- Effort: 2-3 hours

Checklist:
- [ ] README exists
- [ ] Description is clear and concise
- [ ] At least one usage example included
- [ ] Configuration options documented
- [ ] Content model described
- [ ] Accessibility features listed
- [ ] Screenshots or demos included (optional)
- [ ] Dependencies listed
- [ ] Testing instructions included

**1.3 Create Quick Start Guide for Block Authors**
- Priority: HIGH
- Effort: 3-4 hours

Document location: `docs/for-ai/authoring/block-authoring-guide.md`

Topics:
- [ ] How blocks work in EDS
- [ ] Content model concepts
- [ ] How to use blocks in documents
- [ ] Common patterns
- [ ] Troubleshooting
- [ ] Where to find block documentation

#### Phase 2: Critical Block Documentation (Week 2-4)

**Priority Order: Most Visible/Used Blocks First**

**2.1 Document Header Block (Priority 1)**
- Priority: CRITICAL
- Effort: 3-4 hours
- File: Create [blocks/header/README.md](../../blocks/header/README.md)

Must include:
- [ ] Navigation structure documentation
- [ ] Dropdown menu usage
- [ ] Mobile hamburger menu behavior
- [ ] Keyboard navigation guide
- [ ] Accessibility features
- [ ] Styling/theming options
- [ ] Examples with code

**2.2 Document Hero Block (Priority 2)**
- Priority: CRITICAL
- Effort: 3-4 hours
- File: Create [blocks/hero/README.md](../../blocks/hero/README.md)

Must include:
- [ ] Purpose and when to use
- [ ] Content structure (images, text)
- [ ] Image requirements
- [ ] Responsive behavior
- [ ] Styling options
- [ ] Examples with various content types

**2.3 Document Footer Block (Priority 3)**
- Priority: HIGH
- Effort: 2-3 hours
- File: Create [blocks/footer/README.md](../../blocks/footer/README.md)

Must include:
- [ ] Footer content structure
- [ ] Link organization
- [ ] Responsive behavior
- [ ] Accessibility features
- [ ] Examples

**2.4 Document Cards Block (Priority 4)**
- Priority: HIGH
- Effort: 2-3 hours
- File: Create [blocks/cards/README.md](../../blocks/cards/README.md)

Must include:
- [ ] Card content structure
- [ ] Layout options
- [ ] Image requirements
- [ ] Link handling
- [ ] Responsive grid behavior
- [ ] Examples with different card types

**2.5 Document Columns Block (Priority 5)**
- Priority: HIGH
- Effort: 2-3 hours
- File: Create [blocks/columns/README.md](../../blocks/columns/README.md)

Must include:
- [ ] Column layout options
- [ ] Content structure
- [ ] Responsive behavior
- [ ] Nested content support
- [ ] Examples with 2, 3, 4 columns

**2.6 Document Grid Block (Priority 6)**
- Priority: HIGH
- Effort: 3-4 hours
- File: Create [blocks/grid/README.md](../../blocks/grid/README.md)

Must include:
- [ ] Grid system overview
- [ ] Layout options
- [ ] Responsive breakpoints
- [ ] Content structure
- [ ] If generated, document source files
- [ ] Examples with various grid configurations

#### Phase 3: Document Remaining Blocks (Week 5-10)

**3.1 Create README for Blocks WITHOUT Documentation**
- Priority: HIGH
- Effort: 18-24 hours (6 remaining × 3-4 hours each)

Remaining blocks without README:
1. centreblock
2. dashboard
3. react-slide-builder
4. shoelace
5. slide-builder
6. vue-slide-builder

Process per block:
- [ ] Use README template
- [ ] Analyze block code to understand functionality
- [ ] Document configuration options
- [ ] Create usage examples
- [ ] Add content model description
- [ ] Document styling options
- [ ] List dependencies
- [ ] Add testing instructions
- [ ] Review with team/users

**3.2 Enhance Minimal READMEs (3 lines or less)**
- Priority: MEDIUM
- Effort: 26-39 hours (13 blocks × 2-3 hours each)

Blocks with minimal docs:
1. accordion (3 lines) - Expand to 30-50 lines
2. comment (3 lines) - Expand to 30-50 lines
3. embed (3 lines) - Expand to 40-60 lines
4. fragment (3 lines) - Expand to 30-50 lines
5. helloworld (3 lines) - Can stay minimal (example block)
6. index (3 lines) - Expand to 30-50 lines
7. modal (3 lines) - Expand to 50-70 lines
8. quote (3 lines) - Expand to 20-30 lines
9. returntotop (9 lines) - Expand to 20-30 lines
10. search (3 lines) - Expand to 60-80 lines
11. tabs (3 lines) - Expand to 40-60 lines
12. text (17 lines) - Expand to 30-40 lines
13. video (3 lines) - Expand to 40-60 lines

Enhancement process:
- [ ] Add description section
- [ ] Add usage examples
- [ ] Document configuration options
- [ ] Add content model
- [ ] Document accessibility features
- [ ] Add related blocks section

**3.3 Add Missing Sections to Good Documentation**
- Priority: MEDIUM
- Effort: 20-30 hours (20 blocks × 1-1.5 hours each)

Even well-documented blocks may be missing:
- [ ] Usage examples (if missing)
- [ ] Configuration API (if missing)
- [ ] Accessibility section (if missing)
- [ ] Testing instructions (mostly missing)
- [ ] Browser support notes
- [ ] Known issues section

Review and enhance 20 blocks with existing good docs.

#### Phase 4: Specialized Documentation (Week 11-12)

**4.1 Create Content Modeling Guide**
- Priority: HIGH
- Effort: 6-8 hours

Document location: `docs/for-ai/authoring/content-modeling-guide.md`

Topics:
- [ ] What is a content model
- [ ] EDS table-based authoring
- [ ] Block content structure patterns
- [ ] How to design author-friendly models
- [ ] Common patterns across blocks
- [ ] Anti-patterns to avoid
- [ ] Examples from project blocks

**4.2 Create Block Testing Guide**
- Priority: MEDIUM
- Effort: 4-6 hours

Document location: `docs/for-ai/testing/block-testing-guide.md`

Topics:
- [ ] How to test blocks locally
- [ ] Using the development server
- [ ] Creating test content
- [ ] Browser testing checklist
- [ ] Accessibility testing
- [ ] Performance testing
- [ ] Visual regression testing (if implemented)

**4.3 Create Block Configuration Reference**
- Priority: MEDIUM
- Effort: 6-8 hours

Document location: `docs/for-ai/reference/block-configuration-reference.md`

Create comprehensive reference of all blocks:
- [ ] Alphabetical list of all blocks
- [ ] One-line description each
- [ ] Link to README
- [ ] Quick reference table with:
  - Block name
  - Purpose
  - Complexity (simple/medium/complex)
  - Has config options (yes/no)
  - Responsive (yes/no)
  - Accessible (yes/no)
  - Dependencies

**4.4 Add Screenshots/Demos to Documentation**
- Priority: LOW
- Effort: 15-20 hours

For each block:
- [ ] Capture screenshot of default state
- [ ] Capture screenshot of variants
- [ ] Create simple demo page
- [ ] Add images to README
- [ ] Link to live demo (if available)

Tools needed:
- [ ] Screenshot utility
- [ ] Image optimization
- [ ] Demo hosting location

#### Phase 5: Documentation Maintenance (Ongoing)

**5.1 Documentation Review Process**
- Priority: HIGH
- Effort: 2 hours setup + ongoing

Tasks:
- [ ] Add documentation to PR template checklist
- [ ] Require README updates for block changes
- [ ] Quarterly documentation review
- [ ] User feedback collection
- [ ] Documentation version control

**5.2 Documentation Quality Gates**
- Priority: MEDIUM
- Effort: Ongoing

Requirements for new blocks:
- [ ] Must include README before PR approval
- [ ] Must include at least 1 usage example
- [ ] Must document configuration options
- [ ] Must include accessibility notes
- [ ] Must pass documentation checklist

**5.3 Living Documentation**
- Priority: LOW
- Effort: Ongoing

Enhancements:
- [ ] Consider interactive documentation
- [ ] Video tutorials for complex blocks
- [ ] Community contribution guidelines
- [ ] Documentation search functionality
- [ ] Feedback mechanism

---

## Issue 5: Performance Optimization Opportunities Not Fully Leveraged

### Current State Analysis

**Performance Infrastructure:**

**Current Loading Strategy:**
- Three-phase loading implemented ✓
- Eager phase: LCP optimization
- Lazy phase: Header/footer, remaining blocks
- Delayed phase: Analytics (4-second delay)

**Critical Performance Issues:**

1. **Empty LCP_BLOCKS Array**
   - Location: [scripts/scripts.js:25](../../scripts/scripts.js#L25)
   - Current: `const LCP_BLOCKS = [];`
   - Impact: LCP-critical blocks not prioritized
   - Expected: Should include 'hero', possibly 'cards'

2. **Empty Lazy Styles**
   - Location: [styles/lazy-styles.css](../../styles/lazy-styles.css)
   - Current: Only comment, no CSS
   - Impact: Missed opportunity to defer non-critical styles
   - Should contain: Footer styles, decorative styles, print styles

3. **Large Block Sizes**
   - shoelace-card: 2,773 lines
   - spectrum-card: 2,270 lines
   - dps: 2,043 lines
   - Impact: Large JavaScript payloads

4. **Font Loading Strategy**
   - Current: Fonts loaded after LCP ✓
   - Session storage flag used ✓
   - Opportunity: Font subsetting for faster loads

5. **Bundle Size Concerns**
   - 45 blocks total
   - All loaded at runtime
   - No code splitting
   - No lazy loading for less-used blocks

6. **PlusPlus Framework Overhead**
   - 117 lines in siteConfig.js
   - Loaded in eager phase
   - Impact on LCP unknown

7. **Image Optimization Status**
   - SVG icons used (good) ✓
   - Raster image optimization unknown
   - No WebP/AVIF format usage documented
   - No responsive image strategy documented

8. **CSS Performance**
   - No critical CSS inlining
   - All block CSS loaded synchronously
   - No CSS code splitting
   - Empty lazy-styles.css (opportunity missed)

**Performance Budget Status:**
- No performance budgets defined
- No Lighthouse CI integration
- No automated performance testing
- Manual testing only

**Estimated Current Performance:**
- LCP: Unknown (likely 2.5-4s on 3G)
- FID: Likely good (<100ms)
- CLS: Likely good (<0.1)
- Overall Performance Score: Unknown

### Impact Assessment

**Severity:** MEDIUM-HIGH

**Impacts:**
- Slower page loads on mobile/slow connections
- Higher bounce rates
- Lower Core Web Vitals scores
- Reduced SEO rankings (Google CWV update)
- Poor user experience on slow networks
- Higher data costs for users

### Remediation Strategy

#### Phase 1: Quick Wins (Week 1-2)

**1.1 Populate LCP_BLOCKS Array**
- Priority: CRITICAL
- Effort: 1-2 hours

Tasks:
- [ ] Analyze pages to identify LCP blocks
- [ ] Add hero block: `const LCP_BLOCKS = ['hero'];`
- [ ] Test LCP improvement with Lighthouse
- [ ] Consider adding: 'cards', 'image', 'columns'
- [ ] Document reasoning in code comment
- [ ] Measure before/after LCP times

**1.2 Populate lazy-styles.css**
- Priority: HIGH
- Effort: 3-4 hours

Move to lazy-styles.css:
- [ ] Footer-specific styles
- [ ] Print media queries
- [ ] Decorative animations
- [ ] Non-critical block styles
- [ ] Focus styles (maybe)
- [ ] Utility classes used rarely

Target: Move 20-30% of CSS to lazy loading

**1.3 Font Subsetting**
- Priority: MEDIUM
- Effort: 2-3 hours

Tasks:
- [ ] Analyze character usage across site
- [ ] Create subsets for Roboto (Latin only?)
- [ ] Test font rendering
- [ ] Measure file size reduction
- [ ] Update font loading code if needed

Expected savings: 30-50% font file size reduction

**1.4 Remove Empty Import**
- Priority: LOW
- Effort: 5 minutes

Task:
- [ ] Fix: `import { } from '/plusplus/src/siteConfig.js';` in scripts.js:23
- [ ] Either import something or remove import
- [ ] Test that site still works

#### Phase 2: Image Optimization (Week 3-4)

**2.1 Audit Current Images**
- Priority: HIGH
- Effort: 3-4 hours

Tasks:
- [ ] Find all raster images in repository
- [ ] Measure current file sizes
- [ ] Identify unoptimized images (>100KB)
- [ ] Document image usage across blocks
- [ ] Create optimization priority list

**2.2 Implement Responsive Images**
- Priority: HIGH
- Effort: 6-8 hours

Tasks:
- [ ] Create responsive image utility
- [ ] Generate multiple image sizes
- [ ] Implement srcset/sizes attributes
- [ ] Update blocks using images:
  - hero
  - cards
  - bloglist
  - bio
- [ ] Test across viewports
- [ ] Measure LCP improvement

**2.3 Implement Modern Image Formats**
- Priority: MEDIUM
- Effort: 4-6 hours

Tasks:
- [ ] Assess WebP/AVIF support needs
- [ ] Convert critical images to WebP
- [ ] Create picture element fallback
- [ ] Update image-heavy blocks
- [ ] Test across browsers
- [ ] Measure file size savings

Expected savings: 30-50% file size reduction

**2.4 Implement Lazy Loading**
- Priority: MEDIUM
- Effort: 2-3 hours

Tasks:
- [ ] Add loading="lazy" to below-fold images
- [ ] Test across browsers
- [ ] Verify LCP not impacted
- [ ] Measure performance improvement

#### Phase 3: Code Optimization (Week 5-7)

**3.1 Analyze Large Blocks**
- Priority: HIGH
- Effort: 8-12 hours

Blocks to analyze:
1. **shoelace-card (2,773 lines)**
   - [ ] Profile runtime performance
   - [ ] Identify unused code
   - [ ] Assess if code splitting possible
   - [ ] Consider lazy loading dependencies

2. **spectrum-card (2,270 lines)**
   - [ ] Profile runtime performance
   - [ ] Identify code duplication
   - [ ] Assess complexity necessity

3. **dps (2,043 lines)**
   - [ ] Profile runtime performance
   - [ ] Consider breaking into sub-blocks
   - [ ] Lazy load if not LCP block

**3.2 Implement Block Lazy Loading**
- Priority: MEDIUM
- Effort: 6-8 hours

Tasks:
- [ ] Identify rarely-used blocks
- [ ] Create lazy loading manifest
- [ ] Implement on-demand block loading
- [ ] Test performance impact
- [ ] Update loading documentation

Candidates for lazy loading:
- Carousel blocks (unless above fold)
- Modal
- Search (if not in header)
- Dashboard
- Complex blocks below fold

**3.3 Evaluate PlusPlus Framework**
- Priority: MEDIUM
- Effort: 6-8 hours

Tasks:
- [ ] Profile performance impact
- [ ] Measure LCP with/without framework
- [ ] Document necessity and value
- [ ] Consider lazy loading if possible
- [ ] Optimize if keeping
- [ ] Remove if not providing value

**3.4 Code Splitting for Large Blocks**
- Priority: LOW
- Effort: 12-16 hours

For oversized blocks:
- [ ] Split into core + enhancement modules
- [ ] Load core module first
- [ ] Lazy load enhancements
- [ ] Test functionality
- [ ] Measure performance gain

#### Phase 4: CSS Optimization (Week 8-9)

**4.1 Critical CSS Extraction**
- Priority: MEDIUM
- Effort: 8-12 hours

Tasks:
- [ ] Analyze above-fold CSS needs
- [ ] Extract critical CSS for key pages
- [ ] Inline critical CSS in HTML (if possible in EDS)
- [ ] Defer non-critical CSS
- [ ] Test LCP improvement

**4.2 CSS Code Splitting**
- Priority: MEDIUM
- Effort: 6-8 hours

Tasks:
- [ ] Identify block-specific CSS that can be deferred
- [ ] Create block CSS loading strategy
- [ ] Load block CSS on-demand with block
- [ ] Test performance impact
- [ ] Measure CSS payload reduction

**4.3 Remove Unused CSS**
- Priority: LOW
- Effort: 4-6 hours

Tasks:
- [ ] Use PurgeCSS or similar tool
- [ ] Identify unused selectors
- [ ] Remove dead CSS code
- [ ] Test thoroughly across blocks
- [ ] Measure file size reduction

#### Phase 5: Performance Monitoring & Budgets (Week 10-12)

**5.1 Setup Lighthouse CI**
- Priority: HIGH
- Effort: 4-6 hours

Tasks:
- [ ] Install Lighthouse CI
- [ ] Configure CI/CD integration
- [ ] Set baseline performance scores
- [ ] Configure assertions
- [ ] Document process

**5.2 Define Performance Budgets**
- Priority: HIGH
- Effort: 3-4 hours

Define budgets for:
- [ ] JavaScript bundle size (target: <200KB)
- [ ] CSS bundle size (target: <50KB)
- [ ] Image sizes (target: <200KB per page)
- [ ] Total page weight (target: <500KB)
- [ ] LCP (target: <2.5s)
- [ ] FID (target: <100ms)
- [ ] CLS (target: <0.1)

**5.3 Implement Real User Monitoring (RUM)**
- Priority: MEDIUM
- Effort: 4-6 hours

Tasks:
- [ ] Verify RUM implementation (already in delayed.js)
- [ ] Configure RUM tracking
- [ ] Set up reporting dashboard
- [ ] Define key metrics to track
- [ ] Document RUM data usage

**5.4 Create Performance Testing Guide**
- Priority: MEDIUM
- Effort: 4-6 hours

Document location: `docs/for-ai/testing/performance-testing-guide.md`

Topics:
- [ ] How to run Lighthouse locally
- [ ] How to interpret results
- [ ] Performance budget guidelines
- [ ] Common optimization techniques
- [ ] Tools and resources
- [ ] CI/CD integration

**5.5 Regular Performance Audits**
- Priority: MEDIUM
- Effort: Ongoing (4 hours/month)

Schedule:
- [ ] Weekly: Automated Lighthouse CI checks
- [ ] Monthly: Manual performance review
- [ ] Quarterly: Comprehensive performance audit
- [ ] Annual: Performance strategy review

#### Phase 6: Advanced Optimizations (Optional, Week 13+)

**6.1 Implement Service Worker**
- Priority: LOW
- Effort: 12-16 hours

Tasks:
- [ ] Design caching strategy
- [ ] Implement service worker
- [ ] Cache static assets
- [ ] Implement offline support
- [ ] Test across browsers

**6.2 Implement HTTP/2 Push**
- Priority: LOW
- Effort: 6-8 hours

Tasks:
- [ ] Identify critical resources
- [ ] Configure server push
- [ ] Test performance impact
- [ ] Monitor for over-pushing

**6.3 Implement Resource Hints**
- Priority: LOW
- Effort: 3-4 hours

Add to HTML head:
- [ ] `<link rel="preconnect">` for external domains
- [ ] `<link rel="dns-prefetch">` for fonts, analytics
- [ ] `<link rel="preload">` for critical resources
- [ ] Test LCP improvement

---

## Cross-Cutting Concerns

### Testing Strategy Across All Issues

**Test Types Needed:**
1. Unit tests (JavaScript utilities)
2. Visual regression tests (CSS changes)
3. Accessibility tests (WCAG compliance)
4. Performance tests (Lighthouse)
5. Integration tests (block functionality)

**Testing Tools:**
- ESLint/Stylelint (code quality)
- axe-core (accessibility)
- Lighthouse CI (performance)
- Percy/Chromatic (visual regression)
- Playwright (integration testing)

### Documentation Requirements

**Every Remediation Must Include:**
1. Code changes (obviously)
2. Updated/new README files
3. Updated guidelines/standards docs
4. Test coverage
5. Before/after metrics
6. Migration guide (if breaking changes)

### Phased Rollout Strategy

**General Approach for All Issues:**

1. **Foundation Phase (Weeks 1-2)**
   - Create standards
   - Setup tooling
   - Document processes
   - Get team buy-in

2. **Critical Fixes Phase (Weeks 3-4)**
   - Fix highest-impact issues
   - Address user-facing problems
   - Improve most-used blocks

3. **Systematic Improvement Phase (Weeks 5-10)**
   - Batch process similar issues
   - Maintain consistent quality
   - Regular testing and validation

4. **Polish Phase (Weeks 11-12)**
   - Specialized documentation
   - Advanced optimizations
   - Final quality checks

5. **Maintenance Phase (Ongoing)**
   - Regular audits
   - Continuous improvement
   - New block standards enforcement

---

## Resource Requirements

### Time Estimates by Phase

| Issue | Phase 1 | Phase 2-3 | Phase 4-5 | Total |
|-------|---------|-----------|-----------|-------|
| 1. Code Quality | 8-13h | 56-84h | Ongoing | 64-97h |
| 2. CSS Organization | 8-12h | 88-128h | 16-24h | 112-164h |
| 3. Accessibility | 10-15h | 54-81h | 32-50h | 96-146h |
| 4. Documentation | 9-13h | 16-22h | 92-139h | 117-174h |
| 5. Performance | 6-9h | 28-42h | 32-50h | 66-101h |
| **TOTAL** | **41-62h** | **242-357h** | **172-263h** | **455-682h** |

**Total Effort: 455-682 hours (11-17 weeks for 1 developer full-time)**

### Skill Requirements

**Skills Needed:**
- JavaScript (ES6+)
- CSS (modern, responsive)
- Accessibility (WCAG 2.1)
- Performance optimization
- Technical writing
- Testing (automated & manual)
- EDS/AEM platform knowledge

### Priority Matrix

| Issue | Severity | User Impact | Tech Debt | Priority Score |
|-------|----------|-------------|-----------|----------------|
| 1. Code Quality | HIGH | Medium | High | 8/10 |
| 2. CSS Organization | HIGH | High | High | 9/10 |
| 3. Accessibility | HIGH | High | Medium | 9/10 |
| 4. Documentation | HIGH | High | Medium | 8/10 |
| 5. Performance | MEDIUM | Medium | Medium | 7/10 |

### Recommended Approach

**Option 1: Sequential (Safer)**
- Complete one issue before moving to next
- Lower risk of conflicts
- Easier to manage
- Timeline: 17-25 weeks

**Option 2: Parallel (Faster)**
- Work on multiple issues simultaneously
- Requires careful coordination
- Higher risk of conflicts
- Timeline: 12-17 weeks

**Option 3: Iterative (Recommended)**
- Complete Phase 1 (Foundation) for all issues first
- Then work on Phase 2-3 in parallel for high-priority blocks
- Finally complete Phase 4-5 systematically
- Balance of speed and safety
- Timeline: 15-20 weeks

---

## Success Metrics

### Code Quality Metrics

**Targets:**
- [ ] 100% of blocks pass ESLint
- [ ] 100% of blocks pass Stylelint
- [ ] 100% of blocks have JSDoc documentation
- [ ] 0 unused function parameters
- [ ] 0 fragile global selectors
- [ ] All blocks use scoped queries

### CSS Quality Metrics

**Targets:**
- [ ] 100% of blocks are mobile-first
- [ ] 100% of breakpoints use EDS standards (600/900/1200)
- [ ] 80%+ of sizing uses rem units
- [ ] 50%+ of blocks use CSS custom properties
- [ ] 0 !important flags (except documented exceptions)
- [ ] 100% consistent media query syntax

### Accessibility Metrics

**Targets:**
- [ ] WCAG 2.1 Level AA compliance: 95%+
- [ ] All interactive elements have keyboard support
- [ ] All buttons have ARIA labels
- [ ] All modals have focus traps
- [ ] All SVGs have appropriate ARIA
- [ ] 100% of blocks pass axe-core automated tests
- [ ] All blocks tested with screen readers

### Documentation Metrics

**Targets:**
- [ ] 100% of blocks have README files
- [ ] 100% of blocks have usage examples
- [ ] 80%+ of blocks document configuration options
- [ ] 100% of blocks document content models
- [ ] 100% of blocks document accessibility features
- [ ] Average README length: 50+ lines (excluding simple blocks)

### Performance Metrics

**Targets:**
- [ ] LCP: <2.5s (75th percentile)
- [ ] FID: <100ms (75th percentile)
- [ ] CLS: <0.1 (75th percentile)
- [ ] JavaScript bundle: <200KB
- [ ] CSS bundle: <50KB
- [ ] LCP_BLOCKS array populated
- [ ] lazy-styles.css contains 20%+ of CSS
- [ ] Lighthouse score: 90+ (performance)

---

## Risk Assessment

### Technical Risks

**1. Breaking Changes (HIGH)**
- Risk: CSS refactoring may break visual appearance
- Mitigation: Visual regression testing, thorough QA

**2. Accessibility Regressions (MEDIUM)**
- Risk: Keyboard support changes may break existing functionality
- Mitigation: Comprehensive testing with assistive tech

**3. Performance Regressions (LOW)**
- Risk: Changes may inadvertently slow performance
- Mitigation: Before/after metrics, automated testing

**4. Linting Conflicts (MEDIUM)**
- Risk: Existing code may have many linting errors
- Mitigation: Phased approach, disable rules if necessary

### Project Risks

**1. Scope Creep (HIGH)**
- Risk: Discovery of additional issues during work
- Mitigation: Strict scope management, log new issues separately

**2. Resource Availability (MEDIUM)**
- Risk: Developer may not be available full-time
- Mitigation: Flexible timeline, clear priorities

**3. Stakeholder Alignment (MEDIUM)**
- Risk: Disagreement on priorities or approaches
- Mitigation: Clear communication, documented decisions

---

## Next Steps

### Immediate Actions (This Week)

1. **Review & Approve Plan**
   - [ ] Stakeholder review of this document
   - [ ] Agreement on priorities
   - [ ] Assign resources
   - [ ] Set timeline

2. **Setup Project Tracking**
   - [ ] Create project board/tasks
   - [ ] Setup documentation repository
   - [ ] Create communication channels
   - [ ] Schedule kickoff meeting

3. **Begin Foundation Phase**
   - [ ] Start with Issue 1 Phase 1 (Code Quality Standards)
   - [ ] Fix linting infrastructure
   - [ ] Create first standards document

### Week 1 Deliverables

- [ ] Updated ESLint/Stylelint configuration (working)
- [ ] Code Quality Standards document
- [ ] CSS Standards document
- [ ] Accessibility Standards document
- [ ] Block README template
- [ ] Project tracking setup

### Monthly Milestones

**Month 1:**
- All foundation phases complete (5 issues)
- Critical blocks fixed (hero, header, footer)
- Standards documented

**Month 2:**
- Priority blocks improved (CSS, accessibility, docs)
- Testing infrastructure in place
- Systematic improvements begun

**Month 3:**
- Majority of blocks improved
- Performance optimizations implemented
- Comprehensive documentation

**Month 4:**
- All blocks meet standards
- Monitoring and maintenance processes in place
- Final audit and validation

---

## Conclusion

This remediation plan addresses all five critical issues identified in the project review:

1. **Inconsistent code quality** - Systematic improvement across all 45 blocks
2. **CSS organization** - Mobile-first standardization, responsive design
3. **Accessibility gaps** - WCAG 2.1 Level AA compliance
4. **Documentation** - Comprehensive README files and guides
5. **Performance** - Core Web Vitals optimization

**Estimated Timeline:** 15-20 weeks (3-5 months)
**Estimated Effort:** 455-682 hours
**Estimated Cost:** Varies based on resource allocation

**Key Success Factors:**
- Phased approach minimizes risk
- Clear standards and templates
- Automated testing and validation
- Regular progress reviews
- Stakeholder communication

**Expected Outcomes:**
- Improved user experience
- Better developer experience
- Reduced maintenance burden
- Higher quality codebase
- Better accessibility
- Faster page loads
- Comprehensive documentation

---

**Document Version:** 1.0
**Last Updated:** 2025-11-07
**Next Review:** After Phase 1 completion
