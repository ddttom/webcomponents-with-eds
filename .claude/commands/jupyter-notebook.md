---
description: Create or edit Jupyter notebooks for testing EDS blocks interactively using JSLab kernel, jsdom virtual DOM, and VS Code. Handles notebook creation, test case generation, content structure patterns, HTML preview generation with testBlock and saveBlockHTML functions, and live CSS reload workflow.
---

# Jupyter Notebook for EDS Block Testing

You are helping to create or edit Jupyter notebooks for testing Adobe Edge Delivery Services (EDS) blocks interactively.

## When to Use This Command

Use this command when you need to:
- Create new `.ipynb` notebook files for block testing
- Edit existing notebooks to add test cases
- Generate test content for specific blocks
- Set up notebook structure with proper cells
- Add helper function calls (testBlock, saveBlockHTML)
- Create executable examples and documentation

## Context

The user wants to work with Jupyter notebooks that use:
- **JSLab** (JavaScript kernel for Jupyter)
- **jsdom** (virtual DOM for Node.js)
- **VS Code Jupyter extension** for notebook editing

Notebooks enable rapid, interactive testing of EDS blocks without servers, deployments, or browser refreshes.

## Related Resources

For comprehensive documentation, see the `jupyter-notebook-testing` skill which includes:
- **INSTALLATION.md** - Complete setup guide with one-time installation steps for tslab, Jupyter, jsdom, and VS Code extension
- **EXAMPLES.md** - Block-specific content patterns and testing examples for accordion, tabs, cards, hero, and other blocks
- **ADVANCED_TECHNIQUES.md** - Performance testing, snapshot testing, batch testing, validation patterns, and advanced workflows
- **TROUBLESHOOTING.md** - Solutions for kernel issues, module errors, path problems, styling issues, and platform-specific gotchas

This command provides practical notebook creation/editing assistance while the skill provides comprehensive reference documentation.

## Key Innovation: Live CSS Reload

The generated HTML previews link to actual CSS files instead of embedding them:
- **Edit** `blocks/myblock/myblock.css` in your editor
- **Refresh** browser → See changes immediately!
- **No regeneration** needed - no rerunning notebook cells
- **Small files** - ~2KB vs ~100KB with embedded CSS
- **Matches production** - same structure as deployed EDS sites

This workflow is much faster than traditional build-based testing.

## Your Task

Depending on the user's request, you should:

### 1. Create a New Notebook

If creating a new notebook from scratch:

1. **Ask clarifying questions** (if needed):
   - Which block(s) will be tested?
   - What content structures need testing?
   - Any specific edge cases to cover?
   - What should the notebook be named?

2. **Create the notebook file** using the NotebookEdit tool with the following structure:

   **Cell 0** (Markdown): Title and introduction
   ```markdown
   # [Block Name] Testing

   This notebook tests the [block name] block with various content structures.

   **Important Notes:**
   1. Run Cell 1 first to initialize the DOM environment
   2. This works best with pure EDS blocks (vanilla JavaScript)
   3. Web Components have limited support
   4. Use `saveBlockHTML()` for styled previews

   ## What's Tested
   - Feature 1
   - Feature 2
   - Edge cases
   ```

   **Cell 1** (Code): Setup - Copy the complete setup from test.ipynb
   ```javascript
   // Complete setup code including jsdom initialization and helper functions
   ```

   **Cell 2** (Markdown): Section introduction
   ```markdown
   ## Part 1: Simple Tests

   Basic functionality tests without complex content.
   ```

   **Cell 3+** (Code): Test cells with clear examples

3. **Provide usage instructions** to the user

### 2. Edit an Existing Notebook

If modifying an existing notebook:

1. **Read the current notebook** to understand its structure
2. **Ask what changes are needed**:
   - Adding new test cases?
   - Testing different content structures?
   - Adding edge case tests?
   - Fixing errors?
3. **Make the requested changes** using NotebookEdit tool
4. **Explain what was changed**

### 3. Add Test Cases for a Block

If adding tests for a specific block:

1. **Determine the block's content structure** by:
   - Reading the block's JS file to understand expected structure
   - Checking the block's README if available
   - Asking the user for clarification

2. **Create appropriate test content** following these patterns:

   **Accordion/FAQ blocks:**
   ```javascript
   const content = `
     <div>
       <div>Question 1</div>
       <div>Answer 1 with details.</div>
     </div>
     <div>
       <div>Question 2</div>
       <div>Answer 2 with details.</div>
     </div>
   `;
   ```

   **Tabs blocks:**
   ```javascript
   const content = `
     <div>
       <div>Tab 1 Title</div>
       <div>Tab 1 content here</div>
     </div>
     <div>
       <div>Tab 2 Title</div>
       <div>Tab 2 content here</div>
     </div>
   `;
   ```

   **Cards/Grid blocks:**
   ```javascript
   const content = `
     <div>
       <div><picture><img src="image1.jpg" alt="Card 1"></picture></div>
       <div><h3>Title 1</h3><p>Description 1</p></div>
     </div>
     <div>
       <div><picture><img src="image2.jpg" alt="Card 2"></picture></div>
       <div><h3>Title 2</h3><p>Description 2</p></div>
     </div>
   `;
   ```

3. **Add test cells** with:
   - Markdown explanation of what's being tested
   - Code cell with `testBlock()` call
   - Code cell with `saveBlockHTML()` for visual preview

## Required Notebook Structure

Every notebook should have:

1. **Setup Cell (Cell 1)** - Always first, contains:
   - jsdom initialization
   - Global variable setup
   - Helper function definitions (`testBlock`, `saveBlockHTML`, `loadBlockStyles`)
   - Output directory creation

2. **Clear Section Headers** (Markdown cells) explaining:
   - What's being tested
   - Expected behavior
   - Why this test matters

3. **Test Cells** (Code) that:
   - Have clear variable names
   - Include console.log() statements for feedback
   - Show before/after transformation
   - Use try/catch for error handling

4. **Visual Output Cells** (Code) that:
   - Use `saveBlockHTML()` to generate preview files
   - Save to `ipynb-tests/` directory
   - Include comments about opening in browser

## Helper Functions Reference

Remind users of these available functions:

### testBlock(blockName, innerHTML)
```javascript
// Quick test - returns DOM element
const block = await testBlock('accordion', '<div>content</div>');
console.log(block.outerHTML);
```

### saveBlockHTML(blockName, innerHTML, filename?)
```javascript
// Generate styled preview in ipynb-tests/ folder
await saveBlockHTML('accordion', content);
// Opens in browser to see styling

// Custom filename
await saveBlockHTML('accordion', content, 'my-test.html');
```

### loadBlockStyles(blockName)
```javascript
// Usually not needed directly (called by testBlock)
const css = await loadBlockStyles('accordion');
```

## Best Practices

When creating or editing notebooks:

1. **Use descriptive names**: `accordion-edge-cases.ipynb` not `test2.ipynb`

2. **Add clear explanations**:
   ```javascript
   // ✅ Good
   // Testing accordion with empty content
   // Expected: Should handle gracefully without errors
   const emptyContent = '';
   const block = await testBlock('accordion', emptyContent);

   // ❌ Bad
   const x = '';
   await testBlock('accordion', x);
   ```

3. **Test edge cases**:
   - Empty content
   - Single item
   - Many items (10+)
   - Nested structures
   - Missing expected elements

4. **Include error handling**:
   ```javascript
   try {
     const block = await testBlock('myblock', content);
     console.log('✓ Success');
   } catch (error) {
     console.error('✗ Failed:', error.message);
   }
   ```

5. **Generate visual previews**:
   ```javascript
   // Always save visual previews for blocks with styling
   await saveBlockHTML('accordion', content);
   console.log('Open ipynb-tests/accordion-preview.html in browser');
   ```

## Advanced Techniques

Offer these patterns when appropriate:

### Testing Multiple Variations
```javascript
async function testVariations(blockName, contentArray) {
  return Promise.all(
    contentArray.map((content, i) =>
      saveBlockHTML(blockName, content, `${blockName}-var-${i}.html`)
    )
  );
}

await testVariations('accordion', [content1, content2, content3]);
```

### Performance Testing
```javascript
console.time('decoration');
const block = await testBlock('accordion', content);
console.timeEnd('decoration');
```

### Content Generation
```javascript
function generateContent(numItems) {
  return Array.from({ length: numItems }, (_, i) => `
    <div>
      <div>Item ${i + 1}</div>
      <div>Content ${i + 1}</div>
    </div>
  `).join('');
}

await saveBlockHTML('accordion', generateContent(10));
```

## Quick Setup Check

Before starting, verify the environment is ready:

```bash
# All commands should succeed
node -v                    # 18+ or 20+
jupyter kernelspec list    # Should show jslab
npm list jsdom            # Should show installed
code --list-extensions    # Should include ms-toolsai.jupyter
```

If any check fails, see Installation Verification section below.

## Installation Verification

If the user needs help with setup, provide these steps:

```bash
# 1. Install dependencies
npm install jsdom
pip3 install jupyter
npm install -g tslab

# 2. Register tslab
tslab install --python=python3

# 3. Verify
jupyter kernelspec list  # Should show jslab

# 4. Install VS Code extension
code --install-extension ms-toolsai.jupyter

# 5. Open notebook in VS Code
code test.ipynb
```

## Troubleshooting Common Issues

### JSLab Not Available
```bash
npm install -g tslab
tslab install --python=python3
jupyter kernelspec list
# Restart VS Code
```

### Module Not Found
```bash
# Make sure VS Code opened from project root
cd /path/to/project/
code .
```

### TypeScript Errors
Use `global.document` instead of `document`:
```javascript
// ✅ Works
const div = global.document.createElement('div');

// ❌ TypeScript error (but works at runtime)
const div = document.createElement('div');
```

## Output Format

When creating/editing notebooks:

1. **Explain what you're doing** before making changes
2. **Show the structure** of cells being added/modified
3. **Provide usage instructions**:
   - How to run the notebook
   - What files will be generated
   - Where to find preview files
4. **Mention next steps**:
   - How to edit CSS and see changes (just refresh!)
   - How to test in browser
   - How to share with team

## Example Workflow

Show users this typical development flow:

```bash
# 1. Open notebook in VS Code
# Click test.ipynb in file explorer

# 2. Run setup cell (Cell 1)
# Shift+Enter to run

# 3. Add test for your block
await testBlock('myblock', content);

# 4. Generate styled preview
await saveBlockHTML('myblock', content);

# 5. Open in browser
open ipynb-tests/myblock-preview.html

# 6. Edit CSS if needed
# Edit blocks/myblock/myblock.css
# Just refresh browser - changes appear instantly!

# 7. Edit JS if needed
# Edit blocks/myblock/myblock.js
# Rerun notebook cell (Shift+Enter)
```

## VS Code Keyboard Shortcuts

Remind users of helpful shortcuts:
- **Shift+Enter** - Run cell and move to next
- **Cmd/Ctrl+Enter** - Run cell and stay
- **A** - Insert cell above
- **B** - Insert cell below
- **DD** - Delete cell
- **M** - Change to Markdown
- **Y** - Change to Code

## Key Points to Emphasize

- **Always run Cell 1 first** - sets up the environment
- **Use `saveBlockHTML()` for styling** - notebook shows raw HTML only
- **CSS is linked, not embedded** - edit CSS and refresh browser for instant updates
- **Works best with vanilla EDS blocks** - Web Components have limitations
- **Notebooks complement, don't replace** browser testing
- **Files save to `ipynb-tests/` directory** - relative paths work

## Need More Detail?

Direct users to specific resources based on their needs:

- **Installation help** → Use jupyter-notebook-testing skill and check INSTALLATION.md for platform-specific instructions
- **Block patterns** → See EXAMPLES.md for accordion, tabs, cards, hero, columns, forms, and more
- **Advanced testing** → Check ADVANCED_TECHNIQUES.md for snapshots, batch testing, validation, performance profiling
- **Troubleshooting** → Consult TROUBLESHOOTING.md for kernel issues, module errors, path problems, and platform-specific solutions

For comprehensive information, invoke the jupyter-notebook-testing skill.

---

Now proceed to help the user with their Jupyter notebook needs. Ask clarifying questions if needed, then create or edit the notebook as requested.
