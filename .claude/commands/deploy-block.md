---
description: Deploy a block from build/ directory to blocks/ directory
---

You are deploying a build-enhanced block to production.

**Context**: Build-enhanced blocks are developed in `/build/{block-name}.js/` and deployed to `/blocks/{block-name}/`.

Steps:

1. If a block name was provided as an argument, use it. Otherwise, ask:
   "Which block would you like to deploy?"

2. Verify the block exists in build/ directory:
   - Check build/{block-name}.js/ exists
   - Check for package.json and vite.config.js

3. Run the build process:
   ```bash
   cd build/{block-name}
   npm install
   npm run build
   ```

4. Check if a deploy script exists:
   - Look for deploy.js or similar deployment script
   - If exists, run it: `node deploy.js`
   - If not exists, manually copy:
     - dist/{block-name}.js → blocks/{block-name}/{block-name}.js
     - USER-README.md → blocks/{block-name}/README.md
     - Create stub .css file in blocks/{block-name}/

5. Verify deployment:
   - Check files were copied correctly
   - Run linting on deployed files
   - Suggest testing with local server

6. Remind user to:
   - Test the deployed block locally
   - Create a PR if changes look good
   - Update documentation if needed
