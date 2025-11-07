---
description: Run tests for a specific EDS block
---

You are testing an EDS block. Follow these steps:

1. If a block name was provided as an argument, use it. Otherwise, ask:
   "Which block would you like to test?"

2. Check if the block exists:
   - Look in blocks/{block-name}/
   - Look in build/{block-name}.js/

3. **Invoke the testing-blocks skill** to run comprehensive tests including:
   - Unit tests (if they exist)
   - Browser tests with Playwright
   - Linting (JavaScript and CSS)
   - Performance validation
   - Accessibility checks

4. Report the results to the user with specific details about:
   - What passed
   - What failed (with file paths and line numbers)
   - Suggestions for fixes

**Available linting commands**:
- `npm run lint:js` - Lint JavaScript files
- `npm run lint:css` - Lint CSS files
- `npm run lint` - Run all linting
