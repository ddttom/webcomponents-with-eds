---
description: Run all linting checks (JavaScript and CSS) across the project
---

You are running comprehensive linting checks.

Run the following commands in sequence:

1. **Lint JavaScript**:
   ```bash
   npm run lint:js
   ```

2. **Lint CSS**:
   ```bash
   npm run lint:css
   ```

3. **Summary Report**:
   - Count total errors and warnings
   - Group errors by file
   - Highlight the most critical issues

4. **Offer to fix**:
   If errors are found, ask the user:
   "I found [N] linting errors. Would you like me to fix them automatically where possible?"

5. **Code Standards Reference**:
   This project follows:
   - **JavaScript**: Airbnb style guide (eslint-config-airbnb-base)
   - **CSS**: stylelint-config-standard
   - **Naming**: kebab-case for files and block names
   - **Modules**: ES modules with named exports

   See CLAUDE.md and docs/for-ai/guidelines/frontend-guidelines.md for details.
