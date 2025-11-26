# Testing EDS Blocks with Jupyter Notebooks: A Developer's Playground

> **📢 DEPRECATION NOTICE:** This document is superseded by [explaining-jupyter.md](explaining-jupyter.md) which provides more comprehensive and up-to-date information on Jupyter notebook testing for EDS blocks.
>
> **Please use the new documentation:** [Explaining Jupyter - Interactive Testing for EDS Blocks](explaining-jupyter.md)
>
> The new guide includes:
> - Complete architecture overview and execution model
> - Browser-only execution patterns
> - Helper functions (`testBlock`, `showPreview`, `saveBlockHTML`)
> - Three notebook types: Testing, Educational, and Presentation
> - Context-aware execution and modern best practices

---

## Wait... Jupyter? For JavaScript? For EDS Blocks?

Yes, really! If you've ever found yourself refreshing your browser for the hundredth time just to see if your EDS block works with slightly different content, this is for you.

We've set up a Jupyter notebook environment (`test.ipynb`) that lets you test EDS blocks interactively. Think of it as a playground where you can poke, prod, and experiment with blocks without all the ceremony of spinning up dev servers and clearing caches.

## Why This Is Actually Pretty Cool

### The Traditional Way (aka "The Pain")

You know the drill:
1. Make a change to your block
2. Refresh the browser
3. Wait for the page to load
4. Realize you need to test different content
5. Edit the document in Google Docs or Word
6. Wait for it to sync
7. Refresh again
8. Repeat 47 times

### The Notebook Way (aka "The Joy")

1. Write your test content right in the notebook
2. Run the cell
3. See the results immediately
4. Try different content structures
5. Run again
6. Done!

No servers. No syncing. No waiting. Just pure, immediate feedback.

## The "Aha!" Moments

Here's what makes this approach genuinely useful:

**Instant Gratification** - Type some HTML, run the cell, boom—you see what your block does with it. No deployment, no build steps, just results.

**See The Transformation** - Every test shows you the "before" and "after." You get to watch your block work its magic on raw HTML and see exactly what comes out the other side.

**Experiment Freely** - Want to see what happens if you nest 10 divs instead of 2? Try it. Want to test with empty content? Go ahead. It's a sandbox—play around!

**Document As You Go** - Markdown cells let you explain *why* you're testing something. Future you (and your teammates) will thank you.

**No Commitment** - Nothing you do in the notebook affects your actual codebase until you're ready. It's the perfect place to try wild ideas.

## What You're Actually Getting

Think of this as a REPL for your EDS blocks. It's not replacing your normal development workflow—it's augmenting it. Use it when you want to:

- **Quickly validate** a block works with edge cases
- **Prototype** new block ideas without full setup
- **Debug** why certain content structures break
- **Learn** how blocks transform content
- **Share** working examples with your team

## How Does This Magic Work?

Here's the secret sauce (spoiler: it's not actually that complicated):

### The Tech Behind the Curtain

We're using **JSLab**, which is basically "what if Jupyter notebooks could run JavaScript?" Combined with **jsdom** (a JavaScript implementation of the DOM), you get a fake browser environment that's good enough to test most EDS blocks.

Think of jsdom as a browser simulator that runs in Node.js. It's like those flight simulators—not quite the real thing, but pretty darn close for practicing.

### What Actually Happens When You Run a Cell

1. **jsdom creates a pretend browser** - Complete with `document`, `window`, and all the DOM goodness
2. **Your block gets loaded** - Just like it would in a real browser
3. **CSS gets injected** - So styling is available (even if you can't see it in the notebook)
4. **The block does its thing** - Transforming HTML just like normal
5. **You see the results** - Either in the notebook or saved as a styled HTML file

### The Fine Print (aka Limitations)

Look, this isn't a real browser, so there are some gotchas:

**No Clicky-Clicky** - Interactive stuff (button clicks, form submissions) won't work in the notebook output. But hey, you can save the HTML and open it in a real browser!

**Web Components Are Tricky** - Custom elements kind of work, but they're not fully happy. Stick with vanilla EDS blocks for best results.

**jsdom's World** - If jsdom doesn't support something, neither do we. But it supports most things you'd typically use.

**Visual Preview** - The notebook shows you raw HTML. Want to see it styled? Use the `saveBlockHTML()` helper to generate a preview file.

## Let's Get You Set Up

Don't worry, this looks like more steps than it actually is. Think of it as assembling IKEA furniture—follow the instructions and you'll be fine.

### What You'll Need

**Node.js stuff:**
```bash
npm install jsdom
```

That's it for JavaScript dependencies. Just one package. We like simple.

**Python stuff:**
```bash
# Get Jupyter (you probably already have this)
pip install jupyter

# Get JSLab (the JavaScript kernel)
npm install -g jslab

# Tell Jupyter about JSLab
jslab install
```

### The 5-Minute Setup Dance

**Step 1: Install Your Dependencies**
```bash
# In your project root (this gets jsdom)
npm install
```

**Step 2: Get Jupyter (If You Don't Have It)**
```bash
pip install jupyter
# Or if you're a conda person: conda install jupyter
```

**Step 3: Install JSLab**
```bash
npm install -g jslab
jslab install
```

**Step 4: Make Sure It Worked**
```bash
jupyter kernelspec list
```
You should see `jslab` in there. If you do, you're golden!

**Step 5: Fire It Up**
```bash
jupyter notebook
```

Your browser opens, showing Jupyter. Click on `test.ipynb` and you're in!

**Step 6: Run The Magic Setup Cell**

In the notebook, run Cell 1. This initializes the DOM environment and sets up all the helper functions. You only need to do this once per session.

That's it! You're ready to start testing blocks.

### "It Didn't Work" Troubleshooting

**JSLab isn't showing up:**
```bash
# Reinstall and register
npm install -g jslab
jslab install
jupyter kernelspec list  # Check again
```

**Can't find modules:**
Make sure you're running Jupyter from your project root. The notebook needs to be able to find your `blocks/` folder.

## Want to Make Your Own Notebook?

Sure! You've got two paths here:

### The Easy Way: Copy and Customize

```bash
cp test.ipynb my-custom-tests.ipynb
```

Open it in Jupyter, delete the examples you don't need, add your own. Done!

### The "I Want to Build It Myself" Way

**1. Start Jupyter and create a new notebook**
```bash
jupyter notebook
# Click "New" → "jslab"
```

**2. First cell: The setup magic**

Copy the setup code from `test.ipynb` Cell 1, or start with this bare minimum:

```javascript
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true
});

global.document = dom.window.document;
global.window = dom.window;
global.HTMLElement = dom.window.HTMLElement;

console.log('✓ Ready to test!');
```

**3. Add your test cells**

Now just write normal JavaScript to test your blocks:

```javascript
// Load and test a block
const path = await import('path');
const module = await import(path.resolve('./blocks/myblock/myblock.js'));

const block = global.document.createElement('div');
block.className = 'myblock';
block.innerHTML = '<div>Your test content here</div>';

await module.default(block);
console.log(block.outerHTML);
```

That's really all there is to it!

## How to Organize Your Notebook (Pro Tips)

Think of your notebook like a story—it should flow naturally from simple to complex:

**1. Start with a title and intro** (Markdown cell)
   - What are you testing?
   - Any important warnings?

**2. The setup cell** (Code)
   - jsdom initialization
   - Helper functions
   - Run this first, always

**3. Simple tests first** (Mix of Markdown and Code)
   - Ease into it with basic examples
   - Build confidence before getting fancy

**4. Then your actual block tests** (Code with Markdown explanations)
   - One block per section
   - Use markdown cells to explain what you're testing and why

**5. Visual output examples** (Code)
   - Show how to save HTML files
   - Great for blocks that need styling to make sense

**6. Reference section** (Markdown)
   - Quick reminder of helper functions
   - Code snippets you might need

## Writing Tests That Don't Suck

### Good Test = Self-Explanatory Test

```javascript
// ✅ Yes! Future you will love this
// Testing accordion with 3 Q&A pairs
// Expected: Should create 3 <details> elements
const content = `
  <div>
    <div>What is EDS?</div>
    <div>Edge Delivery Services...</div>
  </div>
  <div>
    <div>How does it work?</div>
    <div>It transforms content...</div>
  </div>
`;

const block = await testBlock('accordion', content);
console.log('Created sections:', block.querySelectorAll('details').length);
```

```javascript
// ❌ No! This is a puzzle, not a test
const x = '<div><div>Q</div><div>A</div></div>';
await testBlock('accordion', x);
```

### Use Markdown Cells Liberally

Seriously, don't skip these. Explain what you're testing and why. Your future self will thank you when you come back to this notebook in 3 months.

### Handle Failures Gracefully

```javascript
try {
  const block = await testBlock('myblock', content);
  console.log('✓ Works!');
} catch (error) {
  console.error('✗ Nope:', error.message);
  console.log('Might need a real browser for this one');
}
```

### Save Visual Stuff for the Browser

```javascript
// Can't really see styling in the notebook?
// Save it and open in a browser!
await saveBlockHTML('accordion', content, 'accordion-test.html');
console.log('Check ipynb-tests/accordion-test.html');
```

## Your Helper Functions Cheat Sheet

These are already set up in the notebook. Just use them!

### `testBlock(blockName, innerHTML)`

**What it does:** Loads your block, runs it, shows you what happened.

**How to use it:**
```javascript
const block = await testBlock('accordion', '<div>your content</div>');
console.log(block.outerHTML); // See what it created
```

**When to use it:** Most of the time. This is your go-to for quick tests.

### `saveBlockHTML(blockName, innerHTML, filename?)`

**What it does:** Tests your block AND saves a nice HTML file you can open in a browser to see it styled and interactive.

**Here's the cool part:** The generated HTML files link to your actual CSS files (not embedded copies), so you get:
- Real EDS styling from `/styles/styles.css`, `/styles/fonts.css`, and `/styles/lazy-styles.css`
- Block-specific styles from `/blocks/blockname/blockname.css`
- Live reload capability - modify CSS and just refresh the browser!

**How to use it:**
```javascript
// Saves as accordion-preview.html
await saveBlockHTML('accordion', content);

// Custom filename
await saveBlockHTML('accordion', content, 'my-special-test.html');
```

**When to use it:** When you need to see styling, or when you want to test interactive features like clicks.

**Where it saves:** Everything goes to `ipynb-tests/` folder with proper CSS links back to your source files.

### `loadBlockStyles(blockName)`

**What it does:** Just loads the CSS for a block.

**How to use it:**
```javascript
const css = await loadBlockStyles('accordion');
```

**When to use it:** Rarely. `testBlock()` and `saveBlockHTML()` already do this for you. But it's there if you need it!

## When Things Go Sideways

### "JSLab isn't in my kernel list!"

Run these commands and check again:
```bash
npm install -g jslab
jslab install
jupyter kernelspec list  # Should see jslab now
```

### "Can't find my block!"

Are you running Jupyter from your project root? The notebook needs to see your `blocks/` folder. If you're in the wrong directory, it won't find anything.

### "TypeScript is yelling about 'document'"

Use `global.document` and `global.window` in your code. TypeScript gets confused because we're in Node.js land, not browser land. Just prefix with `global` and you're good.

### "My Web Component block is broken!"

Yeah, Web Components are tricky in jsdom. Your best bet:
```javascript
// Save it and test in a real browser
await saveBlockHTML('myblock', content);
// Open ipynb-tests/myblock-preview.html
```

### "Where are my styles?"

The notebook shows raw HTML, so styling isn't visible there. Use `saveBlockHTML()` to generate a styled preview file you can open in your browser.

**Bonus:** The preview files are smart! They link to your actual CSS files, so if you tweak a style and refresh the browser, you'll see the changes immediately. No need to regenerate the HTML.

## Level Up: Advanced Tricks

Once you're comfortable, here are some fun patterns:

### Batch Testing

Test multiple blocks at once:
```javascript
const blocks = ['accordion', 'tabs', 'cards'];

for (const blockName of blocks) {
  try {
    await saveBlockHTML(blockName, getContentFor(blockName));
    console.log(`✓ ${blockName} - looking good!`);
  } catch (error) {
    console.error(`✗ ${blockName} - nope: ${error.message}`);
  }
}
```

### Make Your Own Helpers

```javascript
// Test the same block with different content variations
function testVariations(blockName, contentArray) {
  return Promise.all(
    contentArray.map((content, i) =>
      saveBlockHTML(blockName, content, `${blockName}-v${i}.html`)
    )
  );
}

global.testVariations = testVariations;

// Now use it!
await testVariations('accordion', [
  '<div><div>Test 1</div><div>Content 1</div></div>',
  '<div><div>Test 2</div><div>Content 2</div></div>',
]);
```

### Performance Checks

```javascript
console.time('How long did this take?');
const block = await testBlock('accordion', content);
console.timeEnd('How long did this take?');
```

### Before/After Comparisons

```javascript
const block = global.document.createElement('div');
block.innerHTML = content;

const before = block.innerHTML;
// Do the magic
await decorate(block);
const after = block.innerHTML;

console.log('Started with:', before.length, 'characters');
console.log('Ended with:', after.length, 'characters');
console.log('Growth factor:', (after.length / before.length).toFixed(2) + 'x');
```

## Fitting This Into Your Workflow

Here's how this actually works in practice:

### Real-World Development Flow

```bash
# 1. You're working on a new block
vim blocks/myblock/myblock.js

# 2. Open the notebook to test it
jupyter notebook
# Navigate to test.ipynb

# 3. In the notebook, test your block
await testBlock('myblock', '<div>test content</div>');

# 4. Need to see it styled?
await saveBlockHTML('myblock', content);

# 5. Check it in a browser
open ipynb-tests/myblock-preview.html

# 6. Tweak the styles? No problem!
vim blocks/myblock/myblock.css
# Just refresh the browser - CSS is linked, not embedded!

# 7. Adjust the JavaScript?
vim blocks/myblock/myblock.js
# Rerun the cell in the notebook

# 8. Happy with it?
git add blocks/myblock/
git commit -m "Add myblock with awesome features"
```

**The workflow is brilliant because:**
- CSS changes = just refresh the browser (files are linked)
- JS changes = rerun the notebook cell (instant feedback)
- No build steps, no servers, no waiting

### When to Use the Notebook

**Yes, use it for:**
- Quick validation before committing
- Trying different content structures
- Debugging weird edge cases
- Exploring how a block transforms content
- Creating examples for documentation

**Maybe skip it for:**
- Complex interactive features (just test in a real browser)
- Animation testing (browser is better)
- Cross-browser issues (obviously need real browsers)

## Project Structure

Here's where everything lives:

```
your-project/
├── test.ipynb                    # Your playground
├── ipynb-tests/                  # Generated previews
│   ├── accordion-preview.html    # Links to ../styles/*.css and ../blocks/accordion/*.css
│   ├── tabs-preview.html
│   └── myblock-preview.html
├── styles/                       # Global EDS styles
│   ├── styles.css                # Core EDS styles (linked in previews)
│   ├── fonts.css                 # Font declarations (linked in previews)
│   └── lazy-styles.css           # Lazy-loaded styles (linked in previews)
├── blocks/                       # Your blocks
│   ├── accordion/
│   │   ├── accordion.js
│   │   └── accordion.css         # Linked from preview HTML
│   ├── tabs/
│   └── myblock/
├── docs/
│   └── ipynb.md                  # You are here
└── package.json                  # Has jsdom
```

**Why the structure matters:** Preview HTML files use relative paths (`../styles/`, `../blocks/`) to link to your actual CSS files. This means you can edit CSS and just refresh - no regeneration needed!

## Want to Learn More?

- [JSLab on npm](https://www.npmjs.com/package/jslab) - The JavaScript kernel
- [jsdom on GitHub](https://github.com/jsdom/jsdom) - The DOM simulator
- [Jupyter Docs](https://jupyter-notebook.readthedocs.io/) - All about notebooks
- [EDS Block Collection](https://www.hlx.live/developer/block-collection) - Block examples

## Sharing Your Notebooks

If you create a notebook that's useful:

1. Give it a clear name (`form-validation-tests.ipynb`, not `test2.ipynb`)
2. Start with a good intro explaining what it tests
3. Include the setup cell so it works standalone
4. Add markdown explaining your tests
5. Test it with a fresh kernel restart
6. Share it with your team!

---

Now go forth and test things! May your blocks always transform correctly. 🚀
