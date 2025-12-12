/**
 * Unit Tests for Cloudflare Worker Helper Functions
 *
 * These tests verify the utility functions used in the worker.
 * Run with: npm test (requires vitest or jest)
 */

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import worker, {
  getExtension,
  isMediaRequest,
  isRUMRequest,
  buildJsonLd,
  formatISO8601Date,
  handleJsonLdMeta,
  handleOgTitle,
  handleAuthorUrl,
  handleLinkedIn,
  handleViewport,
  WORKER_VERSION
} from './cloudflare-worker.js';

// Test suite for worker version
describe('Worker Version', () => {
  test('WORKER_VERSION constant exists and follows semantic versioning', () => {
    expect(WORKER_VERSION).toBeDefined();
    expect(typeof WORKER_VERSION).toBe('string');
    // Semantic versioning pattern: MAJOR.MINOR.PATCH (e.g., 1.0.0)
    expect(WORKER_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test('WORKER_VERSION starts at v1.0.0', () => {
    // Verify initial version is 1.0.0
    const [major, minor, patch] = WORKER_VERSION.split('.').map(Number);
    expect(major).toBeGreaterThanOrEqual(1);
    expect(minor).toBeGreaterThanOrEqual(0);
    expect(patch).toBeGreaterThanOrEqual(0);
  });
});

// Test suite for getExtension
describe('getExtension', () => {
  test('extracts file extension correctly', () => {
    expect(getExtension('/path/to/file.jpg')).toBe('jpg');
    expect(getExtension('/path/to/file.jpeg')).toBe('jpeg');
    expect(getExtension('/path/to/file.png')).toBe('png');
    expect(getExtension('/path/to/file.json')).toBe('json');
  });

  test('handles files without extension', () => {
    expect(getExtension('/path/to/file')).toBe('');
    expect(getExtension('/path/to/')).toBe('');
  });

  test('handles hidden files (dotfiles)', () => {
    // Dotfiles return empty string because dot is at position 0
    expect(getExtension('/path/to/.gitignore')).toBe('');
    expect(getExtension('/path/to/.env')).toBe('');
  });

  test('handles multiple dots in filename', () => {
    expect(getExtension('/path/to/file.backup.tar.gz')).toBe('gz');
    expect(getExtension('/path/to/my.config.json')).toBe('json');
  });

  test('handles edge cases', () => {
    expect(getExtension('')).toBe('');
    expect(getExtension('/')).toBe('');
    expect(getExtension('/.')).toBe('');
  });
});

// Test suite for isMediaRequest
describe('isMediaRequest', () => {
  test('identifies valid media requests', () => {
    const validUrls = [
      'https://example.com/media_1234567890abcdef1234567890abcdef12345678.png',
      'https://example.com/media_abcdef0123456789abcdef0123456789abcdef01.jpg',
      'https://example.com/media_0000000000000000000000000000000000000000.jpeg',
      'https://example.com/media_ffffffffffffffffffffffffffffffffffffffff-scaled.webp',
    ];

    validUrls.forEach((urlStr) => {
      const url = new URL(urlStr);
      expect(isMediaRequest(url)).toBe(true);
    });
  });

  test('rejects invalid media requests', () => {
    const invalidUrls = [
      'https://example.com/media.png', // Too short hash
      'https://example.com/media_123.jpg', // Hash too short
      'https://example.com/image.png', // No media_ prefix
      'https://example.com/media_GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG.png', // Invalid hex
      'https://example.com/path/to/image.jpg', // Regular path
    ];

    invalidUrls.forEach((urlStr) => {
      const url = new URL(urlStr);
      expect(isMediaRequest(url)).toBe(false);
    });
  });

  test('handles media requests with modifiers', () => {
    const url = new URL('https://example.com/media_1234567890abcdef1234567890abcdef12345678-scaled.png');
    expect(isMediaRequest(url)).toBe(true);
  });
});

// Test suite for isRUMRequest
describe('isRUMRequest', () => {
  test('identifies valid RUM requests', () => {
    const validUrls = [
      'https://example.com/.rum/data',
      'https://example.com/.rum/analytics',
      'https://example.com/.optel/metrics',
      'https://example.com/.optel/tracking',
    ];

    validUrls.forEach((urlStr) => {
      const url = new URL(urlStr);
      expect(isRUMRequest(url)).toBe(true);
    });
  });

  test('rejects non-RUM requests', () => {
    const invalidUrls = [
      'https://example.com/rum/data', // Missing leading dot
      'https://example.com/optel/metrics', // Missing leading dot
      'https://example.com/.other/path',
      'https://example.com/path/to/page',
    ];

    invalidUrls.forEach((urlStr) => {
      const url = new URL(urlStr);
      expect(isRUMRequest(url)).toBe(false);
    });
  });
});

// Test suite for formatISO8601Date
describe('formatISO8601Date', () => {
  test('passes through already formatted ISO 8601 dates', () => {
    expect(formatISO8601Date('2024-12-10')).toBe('2024-12-10');
    expect(formatISO8601Date('2025-01-01')).toBe('2025-01-01');
  });

  test('handles UK numeric format (dd/mm/yyyy)', () => {
    expect(formatISO8601Date('10/12/2024')).toBe('2024-12-10');
    expect(formatISO8601Date('01/02/2024')).toBe('2024-02-01');
    expect(formatISO8601Date('25/03/2024')).toBe('2024-03-25');
  });

  test('handles UK numeric format with dashes (dd-mm-yyyy)', () => {
    expect(formatISO8601Date('10-12-2024')).toBe('2024-12-10');
    expect(formatISO8601Date('01-02-2024')).toBe('2024-02-01');
  });

  test('handles UK numeric format with spaces (dd mm yyyy)', () => {
    expect(formatISO8601Date('10 12 2024')).toBe('2024-12-10');
  });

  test('handles full month names - day month year format', () => {
    expect(formatISO8601Date('10 December 2024')).toBe('2024-12-10');
    expect(formatISO8601Date('25 March 2024')).toBe('2024-03-25');
    expect(formatISO8601Date('1 January 2025')).toBe('2025-01-01');
  });

  test('handles abbreviated month names - day month year format', () => {
    expect(formatISO8601Date('10 Dec 2024')).toBe('2024-12-10');
    expect(formatISO8601Date('25 Mar 2024')).toBe('2024-03-25');
    expect(formatISO8601Date('1 Jan 2025')).toBe('2025-01-01');
  });

  test('handles month-day-year format with dashes', () => {
    expect(formatISO8601Date('10-Dec-2024')).toBe('2024-12-10');
    expect(formatISO8601Date('25-March-2024')).toBe('2024-03-25');
  });

  test('handles US style month day year format', () => {
    expect(formatISO8601Date('December 10, 2024')).toBe('2024-12-10');
    expect(formatISO8601Date('March 25, 2024')).toBe('2024-03-25');
  });

  test('handles abbreviated US style month day year', () => {
    expect(formatISO8601Date('Dec 10 2024')).toBe('2024-12-10');
    expect(formatISO8601Date('Mar 25 2024')).toBe('2024-03-25');
  });

  test('returns null for invalid dates', () => {
    expect(formatISO8601Date('')).toBeNull();
    expect(formatISO8601Date('   ')).toBeNull();
    expect(formatISO8601Date('invalid')).toBeNull();
    expect(formatISO8601Date('32/12/2024')).toBeNull(); // Invalid day
    expect(formatISO8601Date('10/13/2024')).toBeNull(); // Invalid month (13)
  });

  test('returns null for non-string inputs', () => {
    expect(formatISO8601Date(null)).toBeNull();
    expect(formatISO8601Date(undefined)).toBeNull();
    expect(formatISO8601Date(12345)).toBeNull();
  });

  test('handles edge case dates', () => {
    expect(formatISO8601Date('29/02/2024')).toBe('2024-02-29'); // Leap year
    expect(formatISO8601Date('31/01/2024')).toBe('2024-01-31');
    expect(formatISO8601Date('30/04/2024')).toBe('2024-04-30');
  });

  test('rejects invalid leap year dates', () => {
    expect(formatISO8601Date('29/02/2023')).toBeNull(); // Not a leap year
    expect(formatISO8601Date('31/04/2024')).toBeNull(); // April has 30 days
  });
});

// Test suite for buildJsonLd
describe('buildJsonLd', () => {
  test('creates valid Article schema structure', () => {
    const article = {
      title: 'Test Article',
      description: 'Test description',
      url: 'https://example.com/article',
      author: 'John Doe',
      publishDate: '2024-12-10',
      modifiedDate: '2024-12-10',
      shouldGenerateJsonLd: true
    };
    const hostname = 'example.com';
    const jsonLd = buildJsonLd(article, hostname);

    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('Article');
    expect(jsonLd.headline).toBe(article.title);
    expect(jsonLd.description).toBe(article.description);
    expect(jsonLd.url).toBe(article.url);
    expect(jsonLd.datePublished).toBe(article.publishDate);
    expect(jsonLd.dateModified).toBe(article.modifiedDate);
    
    expect(jsonLd.author).toBeDefined();
    expect(jsonLd.author['@type']).toBe('Person');
    expect(jsonLd.author.name).toBe(article.author);
    
    expect(jsonLd.publisher).toBeDefined();
    expect(jsonLd.publisher['@type']).toBe('Organization');
    expect(jsonLd.publisher.name).toBe(hostname);
  });

  test('omits empty fields from JSON-LD', () => {
     const article = {
      title: 'Test Article',
      description: null,
      url: null,
      author: null,
      shouldGenerateJsonLd: true
    };
    const hostname = 'example.com';
    const jsonLd = buildJsonLd(article, hostname);

    expect(jsonLd).not.toHaveProperty('description');
    expect(jsonLd).not.toHaveProperty('url');
    expect(jsonLd).not.toHaveProperty('author');
    expect(jsonLd.headline).toBe('Test Article');
  });

  test('handles image objects correctly', () => {
    const article = {
      title: 'Test',
      image: 'https://example.com/image.jpg',
      imageAlt: 'Alt text',
    };
    const hostname = 'example.com';
    const jsonLd = buildJsonLd(article, hostname);

    expect(jsonLd.image).toBeDefined();
    expect(jsonLd.image['@type']).toBe('ImageObject');
    expect(jsonLd.image.url).toBe(article.image);
    expect(jsonLd.image.caption).toBe(article.imageAlt);
  });

  test('formats dates to ISO 8601', () => {
    const article = {
      title: 'Test Article',
      publishDate: '10/12/2024', // UK format
      modifiedDate: '25 March 2024', // Full month name
    };
    const hostname = 'example.com';
    const jsonLd = buildJsonLd(article, hostname);

    expect(jsonLd.datePublished).toBe('2024-12-10');
    expect(jsonLd.dateModified).toBe('2024-03-25');
  });

  test('omits invalid dates from JSON-LD', () => {
    const article = {
      title: 'Test Article',
      publishDate: 'invalid date',
      modifiedDate: '32/12/2024',
    };
    const hostname = 'example.com';
    const jsonLd = buildJsonLd(article, hostname);

    expect(jsonLd).not.toHaveProperty('datePublished');
    expect(jsonLd).not.toHaveProperty('dateModified');
  });

  test('includes author URL when available', () => {
    const article = {
      title: 'Test Article',
      author: 'John Doe',
      authorUrl: 'https://example.com/author/john-doe',
    };
    const hostname = 'example.com';
    const jsonLd = buildJsonLd(article, hostname);

    expect(jsonLd.author).toBeDefined();
    expect(jsonLd.author['@type']).toBe('Person');
    expect(jsonLd.author.name).toBe('John Doe');
    expect(jsonLd.author.url).toBe('https://example.com/author/john-doe');
  });

  test('handles author without URL', () => {
    const article = {
      title: 'Test Article',
      author: 'Jane Smith',
      authorUrl: null,
    };
    const hostname = 'example.com';
    const jsonLd = buildJsonLd(article, hostname);

    expect(jsonLd.author).toBeDefined();
    expect(jsonLd.author['@type']).toBe('Person');
    expect(jsonLd.author.name).toBe('Jane Smith');
    expect(jsonLd.author).not.toHaveProperty('url');
  });

  test('uses LinkedIn as fallback for author URL', () => {
    const article = {
      title: 'Test Article',
      author: 'John Doe',
      authorUrl: 'https://linkedin.com/in/johndoe', // Fallback from LinkedIn
    };
    const jsonLd = buildJsonLd(article, 'example.com');

    expect(jsonLd.author.url).toBe('https://linkedin.com/in/johndoe');
  });

  test('author-url takes precedence over LinkedIn', () => {
    const article = {
      title: 'Test Article',
      author: 'John Doe',
      authorUrl: 'https://example.com/author/john-doe', // Explicit author-url
    };
    const jsonLd = buildJsonLd(article, 'example.com');

    // Should use author-url, not LinkedIn
    expect(jsonLd.author.url).toBe('https://example.com/author/john-doe');
  });
});

// Test suite for Handler Functions (Unit Tests)
describe('Handler Functions', () => {
  let mockElement;
  let article;

  beforeEach(() => {
    mockElement = {
      getAttribute: vi.fn(),
      remove: vi.fn(),
      after: vi.fn(),
    };
    article = {
      shouldGenerateJsonLd: false,
      title: null,
    };
  });

  test('handleJsonLdMeta sets flag when content is "article"', () => {
    mockElement.getAttribute.mockReturnValue('article');
    handleJsonLdMeta(mockElement, article);
    expect(article.shouldGenerateJsonLd).toBe(true);
    expect(mockElement.remove).toHaveBeenCalled();
  });

  test('handleJsonLdMeta does not set flag when content is not "article"', () => {
    mockElement.getAttribute.mockReturnValue('website');
    handleJsonLdMeta(mockElement, article);
    expect(article.shouldGenerateJsonLd).toBe(false);
    expect(mockElement.remove).toHaveBeenCalled();
  });

  test('handleOgTitle extracts title', () => {
    mockElement.getAttribute.mockReturnValue('My Title');
    handleOgTitle(mockElement, article, false);
    expect(article.title).toBe('My Title');
  });

  test('handleAuthorUrl extracts author URL', () => {
    mockElement.getAttribute.mockReturnValue('https://example.com/author');
    handleAuthorUrl(mockElement, article);
    expect(article.authorUrl).toBe('https://example.com/author');
    expect(mockElement.remove).toHaveBeenCalled();
  });

  test('handleLinkedIn extracts LinkedIn URL as fallback', () => {
    mockElement.getAttribute.mockReturnValue('https://linkedin.com/in/author');
    handleLinkedIn(mockElement, article);
    expect(article.authorUrl).toBe('https://linkedin.com/in/author');
    expect(mockElement.remove).not.toHaveBeenCalled(); // LinkedIn meta stays
  });

  test('handleLinkedIn does not override existing author-url', () => {
    article.authorUrl = 'https://example.com/author';
    mockElement.getAttribute.mockReturnValue('https://linkedin.com/in/author');
    handleLinkedIn(mockElement, article);
    expect(article.authorUrl).toBe('https://example.com/author'); // Not overridden
  });

  test('handleViewport triggers JSON-LD generation if flag and title present', () => {
    article.shouldGenerateJsonLd = true;
    article.title = 'My Title';
    const url = new URL('https://example.com/page');

    handleViewport(mockElement, article, url, false);

    expect(mockElement.after).toHaveBeenCalled();
    const script = mockElement.after.mock.calls[0][0];
    expect(script).toContain('application/ld+json');
    expect(script).toContain('"headline":"My Title"');
  });

  test('handleViewport skips JSON-LD generation if flag missing', () => {
    article.shouldGenerateJsonLd = false;
    article.title = 'My Title';
    const url = new URL('https://example.com/page');

    handleViewport(mockElement, article, url, false);

    expect(mockElement.after).not.toHaveBeenCalled();
  });
});

// Mock HTMLRewriter for integration testing
class MockHTMLRewriter {
  static activeHandlers = [];

  constructor() {
    this.handlers = [];
  }

  on(selector, handler) {
    const h = { selector, handler };
    this.handlers.push(h);
    MockHTMLRewriter.activeHandlers.push(h);
    return this;
  }

  transform(response) {
    return response;
  }
}

describe('handleRequest Integration', () => {
  // Mock global HTMLRewriter
  beforeEach(() => {
    MockHTMLRewriter.activeHandlers = []; // Reset handlers
    global.HTMLRewriter = MockHTMLRewriter;
    global.Response = class Response {
      constructor(body, init) {
        this.body = body;
        this.status = init?.status || 200;
        this.headers = new Map(init?.headers ? Object.entries(init.headers) : []);
      }
      get headers() { return this._headers || new Map(); }
      set headers(val) { this._headers = val; }
    };
    
    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue(new Response('<html>...</html>', {
      headers: { 'content-type': 'text/html' }
    }));
  });

  afterEach(() => {
    delete global.HTMLRewriter;
    delete global.Response;
    delete global.fetch;
  });

  test('registers all handlers', async () => {
    const env = {
      ORIGIN_HOSTNAME: 'main--test--owner.aem.live',
      DEBUG: 'true'
    };
    const request = {
      url: 'https://allabout.network/article',
      method: 'GET',
      headers: new Map(),
    };

    const response = await worker.fetch(request, env);

    expect(response.status).toBe(200);
    expect(MockHTMLRewriter.activeHandlers.length).toBeGreaterThan(0);

    // Verify specific handlers are present
    const hasViewport = MockHTMLRewriter.activeHandlers.some(h => h.selector === 'meta[name="viewport"]');
    expect(hasViewport).toBe(true);

    const hasJsonLd = MockHTMLRewriter.activeHandlers.some(h => h.selector === 'meta[name="jsonld"]');
    expect(hasJsonLd).toBe(true);
  });

  test('includes cfw version header in response', async () => {
    const env = {
      ORIGIN_HOSTNAME: 'main--test--owner.aem.live',
      DEBUG: 'false'
    };
    const request = {
      url: 'https://allabout.network/article',
      method: 'GET',
      headers: new Map(),
    };

    const response = await worker.fetch(request, env);

    expect(response.status).toBe(200);

    // Verify cfw header exists and matches WORKER_VERSION
    const cfwHeader = response.headers.get('cfw');
    expect(cfwHeader).toBeDefined();
    expect(cfwHeader).toBe(WORKER_VERSION);

    // Verify it follows semantic versioning
    expect(cfwHeader).toMatch(/^\d+\.\d+\.\d+$/);
  });

  test('includes cfw version header for media requests', async () => {
    const env = {
      ORIGIN_HOSTNAME: 'main--test--owner.aem.live',
      DEBUG: 'false'
    };
    const request = {
      url: 'https://allabout.network/media_1234567890abcdef1234567890abcdef12345678.png',
      method: 'GET',
      headers: new Map(),
    };

    const response = await worker.fetch(request, env);

    expect(response.status).toBe(200);

    // Verify cfw header is present even for media requests
    const cfwHeader = response.headers.get('cfw');
    expect(cfwHeader).toBeDefined();
    expect(cfwHeader).toBe(WORKER_VERSION);
  });
});
