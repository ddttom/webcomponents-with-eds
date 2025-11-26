# Update All llms.txt Files

Find and update all `llms.txt` files in the project with new content from `query-index.json`.

**Quick Run:**
```bash
node scripts/sync-blog-content.js --target=llms
```

## Process

For each `llms.txt` file found:

1. **Read current state**
   - Extract last-updated date from metadata
   - Note current structure and categories

2. **Check for paired my-blog.json**
   - Look in same directory as llms.txt
   - If missing, create one from query-index.json
   - Filter by folder context if applicable

3. **Fetch new content**
   - Load https://allabout.network/query-index.json
   - Filter entries with lastModified > last-updated date
   - Apply folder context filter if not root

4. **Update files**
   - Add new posts to appropriate categories in llms.txt
   - Update my-blog.json with new posts
   - Update metadata dates and version numbers
   - Maintain existing text patterns and formatting

5. **Report results**
   - List files updated
   - Show count of new posts added
   - Display any errors or warnings

## Folder Context

When llms.txt is in a subfolder:
- Final folder name indicates scope (e.g., `/integrations/` = EDS integrations only)
- Filter query-index.json by URL path prefix
- Only include relevant content for that section

## Files Affected

This command will find and potentially update:
- `llms.txt` (root)
- `blogs/ddt/integrations/llms.txt`
- `blogs/ddt/ai/llms.txt`
- Any other `llms.txt` files in the project

And their paired my-blog.json files.
