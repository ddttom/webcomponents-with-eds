# Quick Setup Guide - Cloudflare Worker Development

## First Time Setup

### 1. Install Dependencies
```bash
cd cloudflare/files
npm install
```

### 2. Configure Your Environment
Edit `wrangler.toml` and set your Adobe EDS origin:

```toml
[vars]
ORIGIN_HOSTNAME = "main--allaboutv2--ddttom.aem.live"
DEBUG = "true"
```

### 3. Login to Cloudflare (one-time)
```bash
npx wrangler login
```

This opens a browser window for authentication.

---

## Daily Development Workflow

### Start Local Dev Server
```bash
npm run dev
```

Worker available at: `http://localhost:8787`

**Features**:
- ✅ Hot reload on file changes
- ✅ Debug logging in terminal
- ✅ Request/response inspection
- ✅ Fast iteration

### Run Tests
```bash
# Run all tests
npm test

# Watch mode (re-runs on changes)
npm run test:watch

# With coverage report
npm run test:coverage
```

### Deploy to Production
```bash
# Deploy latest changes
npm run deploy

# View live logs
npm run tail
```

---

## Common Tasks

### Testing JSON-LD Generation Locally

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Create test HTML file** (`test.html`):
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <meta property="og:title" content="Test Article">
     <meta property="og:description" content="Test description">
     <meta name="author" content="John Doe">
     <script type="application/ld+json" data-error="error in json-ld: Unexpected token 'a', &quot;article&quot; is not valid JSON"></script>
     <meta name="viewport" content="width=device-width, initial-scale=1">
   </head>
   <body>
     <h1>Test Page</h1>
   </body>
   </html>
   ```

3. **Test request**:
   ```bash
   curl http://localhost:8787/test.html
   ```

4. **Verify JSON-LD** in response

### Viewing Debug Logs

**Local development**:
- Logs appear in terminal running `npm run dev`
- Look for "JSON-LD generated successfully" messages

**Production**:
```bash
npm run tail
```

### Testing CORS Headers

```bash
# Check CORS headers
curl -I http://localhost:8787/ | grep -i access-control

# Test OPTIONS preflight
curl -X OPTIONS http://localhost:8787/ \
  -H "Origin: https://example.com" \
  -H "Access-Control-Request-Method: GET"
```

---

## Environment Management

### Development Environment
```bash
# Uses development settings from wrangler.toml
npx wrangler dev --env development
```

### Staging Environment
```bash
# Deploy to staging
npx wrangler deploy --env staging

# Tail staging logs
npx wrangler tail --env staging
```

### Production Environment
```bash
# Deploy to production (default)
npm run deploy

# Or explicitly
npx wrangler deploy --env production

# View production logs
npm run tail
```

---

## Managing Secrets

For sensitive values (API tokens, auth credentials):

```bash
# Set a secret (encrypted, not visible in wrangler.toml)
npx wrangler secret put ORIGIN_AUTHENTICATION

# List secrets
npx wrangler secret list

# Delete a secret
npx wrangler secret delete ORIGIN_AUTHENTICATION
```

**Note**: Secrets are separate from environment variables. Use secrets for sensitive data.

---

## Troubleshooting

### Worker Not Starting Locally

**Check**:
1. Port 8787 is available: `lsof -i :8787`
2. `ORIGIN_HOSTNAME` is set in `wrangler.toml`
3. Dependencies installed: `npm install`

**Solution**:
```bash
# Kill process on port 8787
lsof -i :8787 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Reinstall dependencies
rm -rf node_modules
npm install

# Try again
npm run dev
```

### Tests Failing

```bash
# Clear test cache
npx vitest run --clearCache

# Update snapshots if needed
npx vitest run -u

# Check for syntax errors
npm run lint
```

### Deployment Issues

```bash
# Verify authentication
npx wrangler whoami

# Re-login if needed
npx wrangler login

# Check wrangler.toml syntax
npx wrangler deploy --dry-run
```

### Debug Logs Not Appearing

**Local**:
- Check `DEBUG` is set in `wrangler.toml`
- Restart dev server: `npm run dev`

**Production**:
1. Set `DEBUG=true` in Cloudflare Worker environment variables
2. Deploy: `npm run deploy`
3. Tail logs: `npm run tail`
4. Make test request to your domain

---

## File Structure

```
cloudflare/files/
├── cloudflare-worker.js         # Main worker code
├── cloudflare-worker.test.js    # Unit tests
├── package.json                 # Dependencies and scripts
├── wrangler.toml               # Wrangler configuration
├── .gitignore                  # Git ignore patterns
├── README.md                   # Full documentation
└── SETUP.md                    # This quick reference
```

---

## Useful Wrangler Commands

```bash
# View worker details
npx wrangler whoami

# List all workers
npx wrangler deployments list

# Rollback to previous deployment
npx wrangler rollback

# View worker metrics
npx wrangler metrics

# Generate types for Worker API
npx wrangler types

# Update Wrangler
npm update wrangler
```

---

## Next Steps

1. **Customize worker**: Edit `cloudflare-worker.js`
2. **Add tests**: Edit `cloudflare-worker.test.js`
3. **Update config**: Edit `wrangler.toml`
4. **Deploy**: `npm run deploy`

For complete documentation, see [README.md](README.md)
