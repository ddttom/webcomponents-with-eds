---
description: Find pages in the site that use a specific block
---

You are searching for content that uses a specific block.

Steps:

1. If a block name was provided as an argument, use it. Otherwise, ask:
   "Which block are you looking for?"

2. Check if the find-block-content script exists:
   - Look for scripts/find-block-content.js

3. If the script exists, run it:
   ```bash
   node scripts/find-block-content.js {block-name}
   ```

4. If the script doesn't exist, search manually:
   - Search for block references in the codebase
   - Look for test.html files in blocks/{block-name}/
   - Check example.md files in blocks/{block-name}/
   - Search for class names matching the block

5. Report findings:
   - List all pages/files that reference the block
   - Show the file paths with line numbers
   - Suggest viewing them in the local development server

6. Ask the user:
   "Would you like me to open any of these files to review the block usage?"
