# Jupyter Notebook Testing Troubleshooting

Common issues and solutions when testing EDS blocks with Jupyter notebooks.

## JSLab Kernel Not Available

**Problem:** Kernel "jslab" not found when creating or opening notebooks.

**Solution:**
```bash
# Install tslab globally
npm install -g tslab

# Register with Jupyter
tslab install --python=python3

# Verify installation
jupyter kernelspec list  # Should show jslab

# Restart VS Code
# Command Palette → "Developer: Reload Window"
```

**Verify:**
```bash
# Check if jslab is in the list
jupyter kernelspec list

# Expected output should include:
# jslab    /path/to/jupyter/kernels/jslab
```

## Can't Find Modules

**Problem:** Module not found errors when running notebook cells.

**Cause:** VS Code not opened from project root.

**Solution:**
```bash
# Close VS Code
# Open from project root
cd /path/to/project/
code .

# Now open the notebook
```

**Verify workspace:**
```javascript
// Run this in notebook to check working directory
const path = await import('path');
console.log('Working directory:', process.cwd());
```

## TypeScript Errors About 'document'

**Problem:** TypeScript warnings about undefined 'document' or 'window'.

**Explanation:** This is expected. TypeScript doesn't know about jsdom globals at compile time.

**Solution:** Use `global.document` to avoid warnings:

```javascript
// ✅ Works at runtime, no TypeScript warning
const div = global.document.createElement('div');

// ❌ Causes TypeScript warning (but works at runtime)
const div = document.createElement('div');
```

**Alternative:** Add type assertions for cleaner code:
```javascript
// @ts-ignore
const div = document.createElement('div');
```

## Module Not Found Errors

**Problem:** `Error: Cannot find module './blocks/myblock/myblock.js'`

**Cause:** Relative paths don't work reliably with dynamic imports in notebooks.

**Solution:** Use `path.resolve()` for absolute paths:

```javascript
// ✅ Correct - absolute path
const path = await import('path');
const modulePath = path.resolve('./blocks/myblock/myblock.js');
const module = await import(modulePath);

// ❌ Incorrect - relative path
const module = await import('../blocks/myblock/myblock.js');
```

**Helper pattern:**
```javascript
async function importBlock(blockName) {
  const path = await import('path');
  const modulePath = path.resolve(`./blocks/${blockName}/${blockName}.js`);
  return await import(modulePath);
}

const accordion = await importBlock('accordion');
```

## Web Components Not Working

**Problem:** Custom elements or web components not functioning properly.

**Cause:** jsdom has limited Web Components support.

**Solution:** Check availability and use browser testing for complex components:

```javascript
if (global.customElements) {
  console.log('✓ Custom elements supported');
  // Test web component
} else {
  console.log('⚠ Custom elements not available');
  console.log('→ Use saveBlockHTML() and test in browser');
  await saveBlockHTML('myblock', content);
}
```

**Workaround:** Test basic transformation in notebook, test interactivity in browser.

## Styles Not Appearing in Notebook

**Problem:** Block HTML looks unstyled in notebook output.

**Explanation:** This is expected. Notebook output shows raw HTML without CSS.

**Solution:** Use `saveBlockHTML()` to generate styled preview:

```javascript
// ✅ Generates styled HTML file
await saveBlockHTML('accordion', content);
// Open ipynb-tests/accordion-preview.html in browser

// ❌ Notebook output is raw HTML only
const block = await testBlock('accordion', content);
block.outerHTML  // No styling in notebook
```

## Interactive Features Not Working

**Problem:** Buttons, clicks, and interactions don't work in notebook.

**Explanation:** Notebook output is static HTML.

**Solution:** Save to HTML and test in browser:

```javascript
// Generate interactive preview
await saveBlockHTML('accordion', content);

// Open in browser to test:
// - Accordion expand/collapse
// - Tab switching
// - Form submissions
// - Any click handlers
```

## CSS Changes Not Reflecting

**Problem:** Edited CSS but preview looks the same.

**Cause:** Browser cache or using embedded CSS.

**Solution:**

1. Verify you're using linked CSS (not embedded):
```html
<!-- ✅ Good - linked -->
<link rel="stylesheet" href="../blocks/accordion/accordion.css">

<!-- ❌ Bad - embedded (no live reload) -->
<style>/* CSS here */</style>
```

2. Hard refresh browser:
- Chrome/Firefox: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Safari: Cmd+Option+R

3. Check CSS file was saved:
```bash
ls -l blocks/accordion/accordion.css
```

## Notebook Kernel Died

**Problem:** "Kernel died" or "Kernel restarting" error.

**Causes:**
- Infinite loop in code
- Memory exhaustion
- Syntax error in cell

**Solution:**

1. Restart kernel:
   - VS Code: Click "Restart" in kernel picker
   - Or: Command Palette → "Jupyter: Restart Kernel"

2. Run cells one at a time to identify problem cell

3. Check for common issues:
```javascript
// ❌ Infinite loop
while (true) { }

// ❌ Excessive memory
const huge = Array(1000000000);

// ✅ Add error handling
try {
  const block = await testBlock('myblock', content);
} catch (error) {
  console.error('Error:', error.message);
}
```

## Setup Cell Must Run First

**Problem:** `ReferenceError: testBlock is not defined`

**Cause:** Setup cell (Cell 1) not executed.

**Solution:**

1. Always run Cell 1 first when opening notebook
2. Or run all cells: Command Palette → "Jupyter: Run All Cells"

**Add reminder in notebook:**
```markdown
## ⚠️ IMPORTANT
**Run Cell 1 first** to initialize the environment.
```

## File Permission Errors

**Problem:** `EACCES: permission denied` when saving HTML.

**Cause:** No write permissions for `ipynb-tests/` directory.

**Solution:**
```bash
# Create directory with correct permissions
mkdir -p ipynb-tests
chmod 755 ipynb-tests

# Or run with sudo (not recommended)
sudo mkdir ipynb-tests
sudo chown $USER ipynb-tests
```

## Path Issues on Windows

**Problem:** Paths not working correctly on Windows.

**Cause:** Backslash vs forward slash path separators.

**Solution:** Always use forward slashes, `path` module handles it:

```javascript
// ✅ Works cross-platform
const path = await import('path');
const modulePath = path.resolve('./blocks/accordion/accordion.js');

// ❌ Windows-specific
const modulePath = 'blocks\\accordion\\accordion.js';
```

## Block CSS Not Loading

**Problem:** `loadBlockStyles()` returns null or CSS missing.

**Cause:** CSS file doesn't exist or wrong path.

**Debug:**
```javascript
// Check if CSS file exists
const fs = await import('fs/promises');
const path = await import('path');

const cssPath = path.resolve('./blocks/accordion/accordion.css');
try {
  await fs.access(cssPath);
  console.log('✓ CSS file exists');
} catch (error) {
  console.log('✗ CSS file not found:', cssPath);
}
```

**Solution:** Ensure CSS file exists and path is correct:
```bash
ls -la blocks/accordion/
# Should show: accordion.css and accordion.js
```

## Import Caching Issues

**Problem:** Changes to block code not reflecting in tests.

**Cause:** Node.js module cache.

**Solution:** Restart kernel to clear cache:
- VS Code: Command Palette → "Jupyter: Restart Kernel"
- Then rerun all cells

**Alternative:** Use dynamic timestamps (not recommended for production):
```javascript
const modulePath = path.resolve('./blocks/accordion/accordion.js');
const module = await import(`${modulePath}?t=${Date.now()}`);
```

## jsdom Limitations

**Things that don't work in jsdom:**

- Canvas API (limited support)
- WebGL
- Real browser rendering
- Some CSS features (grid, flexbox positioning)
- Video/audio elements
- Geolocation
- Real network requests (use mocks)
- Service Workers
- Web Workers (limited)

**Solution:** Test basic transformation in notebook, test advanced features in real browser.

## Performance Issues

**Problem:** Notebook cells running slowly.

**Causes & Solutions:**

1. **Large HTML output:**
```javascript
// ❌ Slow - huge output
block.outerHTML  // 100KB+ output

// ✅ Fast - show summary
console.log('Block created with', block.children.length, 'children');
```

2. **Many iterations:**
```javascript
// ❌ Slow - sequential
for (let i = 0; i < 100; i++) {
  await testBlock('accordion', content);
}

// ✅ Fast - batch or limit
await testBlock('accordion', content);  // Test once
```

3. **Memory buildup:**
```javascript
// ✅ Clear large variables
let block = await testBlock('accordion', content);
// ... use block ...
block = null;  // Clear reference
```

## Jupyter Not Found

**Problem:** `jupyter: command not found`

**Solution:**
```bash
# Install Jupyter
pip3 install jupyter

# Or with conda
conda install jupyter

# Verify
jupyter --version
```

## TSLab Installation Fails

**Problem:** `npm install -g tslab` fails with errors.

**Common causes:**

1. **Permission issues:**
```bash
# Use npx instead of global install (recommended)
npx tslab install

# Or fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

2. **Node version too old:**
```bash
# Update Node.js to latest LTS
node -v  # Should be 18+ or 20+
```

3. **Python not found:**
```bash
# Install Python 3
python3 --version  # Should be 3.8+
```

## Getting Help

If you're still stuck:

1. Check working directory: `process.cwd()`
2. Verify all dependencies: `npm list jsdom`
3. Test outside notebook first
4. Check Claude Code logs
5. Review notebook cell execution order
6. Try fresh notebook from template
