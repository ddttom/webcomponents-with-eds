---
description: Analyze a block and provide architecture review and improvement suggestions
---

You are performing an architecture review of an EDS block.

Steps:

1. If a block name was provided as an argument, use it. Otherwise, ask:
   "Which block would you like me to review?"

2. **Locate the block**:
   - Check blocks/{block-name}/ (production version)
   - Check build/{block-name}.js/ (development version if exists)

3. **Read and analyze**:
   - {block-name}.js - JavaScript implementation
   - {block-name}.css - Styles
   - README.md - Documentation
   - test.html - Test file (if exists)

4. **Evaluate against standards** from docs/for-ai/implementation/block-architecture-standards.md:

   **Pattern Assessment**:
   - Is this EDS-Native or Build-Enhanced?
   - Is the pattern appropriate for the complexity?
   - Should it be refactored to a different pattern?

   **Code Quality**:
   - Does it follow vanilla JS best practices?
   - Are there any performance anti-patterns?
   - Is error handling implemented with try/catch?
   - Are DOM queries optimized?

   **Architecture**:
   - Is the block self-contained?
   - Are dependencies minimal?
   - Does it avoid FOUC (Flash of Unstyled Content)?
   - Is it responsive and accessible?

   **Documentation**:
   - Is the README complete and helpful?
   - Are there usage examples?
   - Is the content model documented?

5. **Generate report** with:
   - ✅ What's working well
   - ⚠️ Issues found (with file:line references)
   - 💡 Specific improvement recommendations
   - 🔧 Code examples for suggested fixes

6. **Offer next steps**:
   "Would you like me to implement any of these improvements?"
