---
description: Validate Jupyter notebook for production readiness - checks smart links, layout structure, transitions, part flow, cell ordering, and overall quality
---

# Validate Notebook Command

Comprehensive validation of Jupyter notebooks (.ipynb files) for production deployment. Validates smart links, structure, transitions, part flow, and quality standards.

## Usage

```bash
/validate-notebook <notebook-file>
```

**Examples:**
```bash
/validate-notebook docs-navigation.ipynb
/validate-notebook education.ipynb
```

## What It Validates

1. **Smart Links** - All `[text](#)` links resolve to matching headings
2. **Layout Structure** - Intro, parts, transitions, conclusion
3. **Transitions** - Action cards present between major parts
4. **Part Flow** - Sequential numbering, consistent format
5. **Cell Ordering** - Logical sequence, summaries at end
6. **Production Readiness** - Metadata, formatting, quality

## Activation

This command automatically loads the `ipynb-validator` skill which provides:
- Detailed validation criteria
- Common issues and fixes
- Quality scoring system
- Production checklist
- Best practices

## Implementation

When this command is invoked:

### Step 1: Load the Skill

```
Use Skill tool with: ipynb-validator
```

The skill provides complete validation guidance including:
- All validation categories and checks
- Expected patterns and structures
- Common issues and solutions
- Quality scoring methodology

### Step 2: Identify Target Notebook

If notebook specified:
- Use provided filename
- Verify file exists

If no notebook specified:
- Ask: "Which notebook should I validate?"
- List available .ipynb files if helpful

### Step 3: Run Validation Script

Create a Python validation script that:

```python
import json
import re

# Load notebook
with open(notebook_file, 'r') as f:
    notebook = json.load(f)

cells = notebook['cells']

# Validation categories
results = {
    'smart_links': validate_smart_links(cells),
    'structure': validate_structure(cells),
    'transitions': validate_transitions(cells),
    'part_flow': validate_part_flow(cells),
    'cell_ordering': validate_cell_ordering(cells),
    'production': validate_production_readiness(notebook)
}

# Calculate scores
scores = calculate_scores(results)
overall_score = calculate_overall_score(scores)

# Generate report
generate_report(results, scores, overall_score)
```

### Step 4: Smart Links Validation

```python
def validate_smart_links(cells):
    # Extract all smart links
    links = []
    for i, cell in enumerate(cells):
        source = ''.join(cell.get('source', []))
        found = re.findall(r'\[([^\]]+)\]\(#\)', source)
        links.extend([(link, i) for link in found])

    # Build heading index
    headings = {}
    for i, cell in enumerate(cells):
        source = ''.join(cell.get('source', []))
        for line in source.split('\n'):
            if line.startswith('#'):
                heading = line.lstrip('#').strip()
                normalized = normalize_heading(heading)
                headings[normalized] = (heading, i)

    # Match links to headings
    valid = 0
    broken = []
    for link_text, cell_idx in links:
        normalized = normalize_heading(link_text)
        if find_match(normalized, headings):
            valid += 1
        else:
            broken.append((link_text, cell_idx))

    return {
        'total': len(links),
        'valid': valid,
        'broken': broken,
        'status': 'PASS' if len(broken) == 0 else 'FAIL'
    }
```

### Step 5: Structure Validation

Check for:
- Introduction section (cells 0 to first part)
- Sequential parts with consistent structure
- Part summaries at end of each part
- Conclusion section
- No structural gaps

### Step 6: Transition Validation

**Critical Check: Missing Action Cards**

For each transition cell (cells between parts):
1. Identify transition by pattern: "Part X:" heading with progress indicator
2. Check for `<!-- action-cards -->` marker
3. If marker missing: **FAIL** with error message
4. Count links following marker (must be 3-6)
5. Validate all action card links resolve

**Detection logic:**
```python
def validate_transition_action_cards(cell, cell_idx):
    source = ''.join(cell.get('source', []))

    # Is this a transition cell?
    is_transition = (
        re.search(r'Part \d+:', source) and
        'Progress:' in source and
        '🔵' in source
    )

    if not is_transition:
        return None  # Not a transition

    # Check for action cards marker
    has_marker = '<!-- action-cards -->' in source

    if not has_marker:
        return {
            'status': 'FAIL',
            'cell': cell_idx,
            'issue': 'Missing <!-- action-cards --> marker',
            'part': extract_part_number(source)
        }

    # Count action card links
    links = re.findall(r'- \[([^\]]+)\]\(#\)', source)
    link_count = len(links)

    if link_count < 3:
        return {
            'status': 'WARN',
            'cell': cell_idx,
            'issue': f'Only {link_count} action cards (need 3-6)',
            'part': extract_part_number(source)
        }

    if link_count > 6:
        return {
            'status': 'WARN',
            'cell': cell_idx,
            'issue': f'{link_count} action cards (recommended 3-6)',
            'part': extract_part_number(source)
        }

    return {'status': 'PASS', 'count': link_count}
```

Check for:
- Transition cells between major parts
- `<!-- action-cards -->` marker present (REQUIRED)
- 3-6 action card links per transition
- Action card links resolve correctly
- Contextual text present

### Step 7: Part Flow Validation

Check for:
- Sequential part numbering (1, 2, 3, ...)
- Consistent title format
- Progress indicators
- Part summaries present
- No duplicate numbers

### Step 8: Cell Ordering Validation

Check for:
- Logical cell sequence
- Summaries after content
- Transitions before part starts
- No orphaned cells

### Step 9: Production Readiness

Check for:
- Complete metadata (title, description, author, etc.)
- Repository URL configured
- Valid JSON structure
- No test/placeholder content
- Appropriate file size

### Step 10: Generate Report

```python
def generate_report(results, scores, overall):
    print(f"NOTEBOOK VALIDATION REPORT: {filename}")
    print("=" * 70)
    print()
    print("SUMMARY:")
    print(f"  Total Cells: {len(cells)}")
    print(f"  Smart Links: {results['smart_links']['total']} "
          f"({results['smart_links']['valid']} valid, "
          f"{len(results['smart_links']['broken'])} broken)")
    print(f"  Parts: {results['part_flow']['count']} "
          f"({results['part_flow']['status']})")
    print(f"  Transitions: {results['transitions']['count']} "
          f"({results['transitions']['status']})")
    print(f"  Overall Score: {overall}/100 {get_status_emoji(overall)}")
    print()

    # Detailed results for each category
    for category in results:
        print_category_results(category, results[category])

    # Issues list
    if has_issues(results):
        print("\nISSUES FOUND:")
        print_all_issues(results)

    # Recommendations
    print("\nRECOMMENDATIONS:")
    print_recommendations(overall, results)
```

## Scoring System

**Category Weights:**
- Smart Links: 30%
- Structure: 25%
- Transitions: 20%
- Part Flow: 15%
- Cell Ordering: 10%

**Overall Score Interpretation:**
- **90-100**: ✅ Production ready
- **75-89**: ⚠️  Minor fixes needed
- **60-74**: ⚠️  Moderate issues
- **0-59**: ❌ Major rework required

## Report Format

The validation report includes:

1. **Executive Summary** - Score, status, key metrics
2. **Smart Links** - Total, valid, broken (with cell references)
3. **Structure** - Intro, parts, transitions, conclusion
4. **Transitions** - Count, action cards, quality
5. **Part Flow** - Numbering, sequence, consistency
6. **Cell Ordering** - Logical flow, proper placement
7. **Production Readiness** - Metadata, quality checks
8. **Issues List** - All problems with cell references
9. **Recommendations** - Actionable fixes prioritized

## Example Output

### Example 1: Passing Validation

```
NOTEBOOK VALIDATION REPORT: docs-navigation.ipynb
================================================================

SUMMARY:
  Total Cells: 75
  Smart Links: 58 (58 valid, 0 broken)
  Parts: 8 (sequential)
  Transitions: 7 (all with action cards)
  Overall Score: 98/100 ✅ PRODUCTION READY

SMART LINKS: ✅ PASS
  ✓ All 58 smart links resolve correctly
  ✓ No broken or orphaned links
  ✓ Action card links validated

STRUCTURE: ✅ PASS
  ✓ Clear introduction section (10 cells)
  ✓ 8 parts with consistent structure
  ✓ Conclusion section present
  ✓ No gaps or missing sections

TRANSITIONS: ✅ PASS
  ✓ 7 transition cells with action cards
  ✓ All transitions have 3-6 links
  ✓ Contextual text present

PART FLOW: ✅ PASS
  ✓ Parts numbered 1-8 sequentially
  ✓ No gaps or duplicates
  ✓ Summaries at end of each part
  ✓ Progress indicators accurate

CELL ORDERING: ✅ PASS
  ✓ All cells in logical sequence
  ✓ Summaries after content
  ✓ Transitions before parts
  ✓ No orphaned cells

PRODUCTION READINESS: ✅ PASS
  ✓ Complete metadata
  ✓ Repository URL set
  ✓ Valid JSON structure
  ✓ No test content
  ✓ Appropriate file size

RECOMMENDATIONS:
  • Notebook is ready for production deployment
  • All validation checks passed
  • Quality score: 98/100
```

### Example 2: Failed Validation (Missing Action Cards)

```
NOTEBOOK VALIDATION REPORT: docs-navigation.ipynb
================================================================

SUMMARY:
  Total Cells: 75
  Smart Links: 58 (58 valid, 0 broken)
  Parts: 8 (sequential)
  Transitions: 7 (2 missing action cards)
  Overall Score: 72/100 ⚠️ MODERATE ISSUES

SMART LINKS: ✅ PASS
  ✓ All 58 smart links resolve correctly

STRUCTURE: ✅ PASS
  ✓ 8 parts with consistent structure

TRANSITIONS: ❌ FAIL
  ✗ Part 7 transition (cell 45) missing <!-- action-cards --> marker
  ✗ Part 8 transition (cell 52) missing <!-- action-cards --> marker
  ✓ 5 other transitions have action cards

PART FLOW: ✅ PASS
  ✓ Parts numbered 1-8 sequentially

CELL ORDERING: ✅ PASS
  ✓ All cells in logical sequence

PRODUCTION READINESS: ⚠️ WARN
  ✓ Metadata complete
  ⚠ Action card issues prevent production deployment

ISSUES FOUND:

1. ❌ CRITICAL: Cell 45 (Part 7 transition)
   Missing <!-- action-cards --> marker
   Fix: Add action cards marker with 3-6 links

2. ❌ CRITICAL: Cell 52 (Part 8 transition)
   Missing <!-- action-cards --> marker
   Fix: Add action cards marker with 3-6 links

RECOMMENDATIONS:
  • Fix missing action cards before deployment
  • Add <!-- action-cards --> markers to transitions
  • Ensure each transition has 3-6 navigation links
  • Re-run validation after fixes
```

## Common Issues and Quick Fixes

**Broken Smart Links:**
```bash
# Issue: [Getting Started](#) has no matching heading
# Fix: Either rename link or add heading
Heading: ### Getting Started Guide
Link: [Getting Started Guide](#)
```

**Missing Transitions:**
```bash
# Issue: Part starts immediately after previous summary
# Fix: Add transition cell with action cards
```

**Incorrect Cell Order:**
```bash
# Issue: Summary appears before content
# Fix: Move summary cell to end of part
```

**Missing Action Cards:**
```bash
# Issue: Part 7 transition cell (cell 45) has no <!-- action-cards --> marker
# Fix: Add marker and 3-6 links to guide readers

# Before (broken):
### Part 7: Universal Patterns
**Progress: 7 of 8** 🔵🔵🔵🔵🔵🔵🔵⚪
**Reading time: 2 minutes**

These patterns work everywhere...

# After (fixed):
### Part 7: Universal Patterns
**Progress: 7 of 8** 🔵🔵🔵🔵🔵🔵🔵⚪
**Reading time: 2 minutes**

These patterns work everywhere...

<!-- action-cards -->

- [Beyond EDS](#)
- [Universal Patterns](#)
- [Apply Anywhere](#)
```

## Best Practices

✅ **Do:**
- Test all smart links before deployment
- Use descriptive, unique link text
- Include transitions between major parts
- Number parts sequentially
- Place summaries at end of parts
- Complete all metadata fields

❌ **Don't:**
- Use generic link text like "Click here"
- Hardcode cell IDs like `#cell-5`
- Skip transitions between parts
- Place summaries before content
- Leave metadata incomplete

## Production Checklist

Before deploying:
- [ ] Run `/validate-notebook`
- [ ] Overall score ≥ 90
- [ ] All smart links resolve
- [ ] Transitions have action cards
- [ ] Parts flow sequentially
- [ ] Metadata is complete
- [ ] Test in ipynb-viewer block
- [ ] Content is final

## Related Documentation

- `.claude/skills/ipynb-validator/SKILL.md` - Complete validation guide
- `blocks/ipynb-viewer/README.md` - Notebook viewer documentation
- `docs/for-ai/explaining-educational-notebooks.md` - Notebook creation
- `docs/for-ai/templates/ipynb/README.md` - Notebook templates

---

**Note:** This validator is designed for educational and navigation notebooks that use the ipynb-viewer block with smart links and action cards.
