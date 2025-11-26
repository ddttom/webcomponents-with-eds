# Update All my-blog.json Files

Find and update all `my-blog.json` files in the project with latest content from `query-index.json`.

**Quick Run:**
```bash
node scripts/sync-blog-content.js --target=blog
```

## Process

For each `my-blog.json` file found:

1. **Read current state**
   - Extract last-updated date from metadata
   - Note existing categories and structure
   - Determine folder context/scope

2. **Fetch new content**
   - Load https://allabout.network/query-index.json
   - Filter entries with lastModified > last-updated date
   - Apply folder context filter based on file location

3. **Update structure**
   - Add new posts to appropriate categories
   - Update category counts in categoryMap
   - Update metadata.last-updated to current date
   - Maintain existing categorization patterns

4. **Synchronize with llms.txt**
   - Check if llms.txt exists in same directory
   - If exists, ensure consistency between files
   - If missing, offer to create one

5. **Report results**
   - List files updated
   - Show count of new posts added per category
   - Display any errors or warnings

## Folder Context

When my-blog.json is in a subfolder:
- Determine scope from folder path
- Filter query-index.json by URL path prefix
- Example: `/blogs/ddt/integrations/my-blog.json` includes only `/blogs/ddt/integrations/*` posts

## Files Affected

This command will find and potentially update:
- `my-blog.json` (root)
- `blogs/ddt/integrations/my-blog.json`
- `blogs/ddt/ai/my-blog.json`
- Any other `my-blog.json` files in the project

And check for paired llms.txt files.
