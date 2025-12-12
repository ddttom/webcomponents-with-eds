# Cloudflare Workers for Adobe EDS

This directory contains a production-ready Cloudflare Workers implementation that acts as a reverse proxy and enhancement layer for Adobe Edge Delivery Services.

## Overview

The worker transparently sits between clients and your EDS origin, providing:

1. **CORS Header Injection** - Enables cross-origin access from any domain
2. **Automatic JSON-LD Generation** - Transforms EDS metadata into schema.org Article structured data
3. **Metadata Cleanup** - Removes non-essential metadata after extraction

## Quick Links

- **[Complete Documentation](files/README.md)** - Full implementation details (21KB)
- **[Setup Guide](files/SETUP.md)** - Deploy the worker in 5 minutes
- **[Testing Guide](files/TESTING.md)** - Test procedures and validation
- **[Architectural Case Study](blog.md)** - "Two-File Simplicity" pattern rationale
- **[Interactive Validator](test.html)** - Deploy verification page

## Quick Start

```bash
# 1. Navigate to worker directory
cd cloudflare/files

# 2. Install dependencies
npm install

# 3. Run tests
npm test

# 4. Deploy (requires Cloudflare account)
npx wrangler deploy
```

## Architecture

**Pattern:** "Two-File Simplicity"

The implementation separates pure testable functions from Cloudflare runtime integration:

- **Pure Functions** - Date formatting, JSON-LD building, request detection
- **Thin Shell** - Cloudflare Worker runtime, HTMLRewriter, fetch API

This enables **19 unit/integration tests** that run in milliseconds without server spinup.

## How It Works

### 1. CORS Enhancement

Adds headers to all responses:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### 2. JSON-LD Generation

**Trigger:** Add one metadata line to your EDS page:

```html
<meta name="jsonld" content="article">
```

**Input metadata fields:**

- `og:title` → headline
- `longdescription` → description
- `author` → Person name
- `author-url` or `linkedin` → Person URL
- `publication-date` → datePublished
- `modified-date` → dateModified

**Output:** Valid schema.org Article JSON-LD automatically injected into page.

### 3. Smart Features

- **Date formatting:** Handles UK format (10/12/2024), month names, ISO 8601
- **Description priority:** Uses `longdescription` for SEO, preserves `og:description` for social
- **Author URL fallback:** Uses LinkedIn if `author-url` not provided
- **Selective cleanup:** Removes single-use metadata, preserves social tags

## Testing

```bash
# Unit & integration tests
npm test

# With coverage
npm run test:coverage

# Linting
npm run lint
```

**Test coverage:** 19 tests covering date formatting, JSON-LD building, metadata extraction, and worker integration.

## Deployment Validation

After deploying, open [test.html](test.html) in your browser pointing to your worker URL. The page automatically validates:

✓ Worker version header
✓ CORS headers
✓ JSON-LD generation and structure
✓ Date formatting correctness
✓ Metadata cleanup

## Files

| File | Purpose |
|------|---------|
| `files/cloudflare-worker.js` | Main worker (534 lines) |
| `files/cloudflare-worker.test.js` | Tests (450+ lines) |
| `files/README.md` | Complete documentation |
| `files/SETUP.md` | Quick setup guide |
| `files/TESTING.md` | Testing procedures |
| `test.html` | Interactive validator |
| `blog.md` | Architectural case study |

## Key Benefits

**For Authors:**

- Simple SEO: One metadata line → automatic JSON-LD
- No manual JSON-LD creation (error-prone)
- Familiar metadata fields (reuses existing EDS metadata)

**For Developers:**

- Zero production dependencies
- Testable architecture (19 unit tests run in milliseconds)
- Easy to maintain and extend
- Follows EDS architectural patterns

**For Performance:**

- Runs at Cloudflare edge (close to users)
- Caches responses globally
- No JavaScript dependencies to load

## Technical Details

**Language:** Vanilla JavaScript (ES6+)
**Testing:** Vitest
**Linting:** ESLint (Airbnb config)
**Versioning:** Semantic versioning
**License:** Apache 2.0

## Support

For detailed information, see:

- [Complete README](files/README.md) - Implementation details
- [Setup Guide](files/SETUP.md) - Deployment instructions
- [Case Study](blog.md) - Architecture rationale
