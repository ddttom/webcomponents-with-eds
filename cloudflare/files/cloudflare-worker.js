/*
 * Based on Adobe's Cloudflare Worker template
 * Original copyright 2022 Adobe. Licensed under Apache License, Version 2.0
 * Modified by Digital Domain Technologies Ltd
 *
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @version 1.0.0
 */

// Worker version - increment using semantic versioning for all changes
export const WORKER_VERSION = '1.0.0';

export const getExtension = (path) => {
  const basename = path.split('/').pop();
  const pos = basename.lastIndexOf('.');
  return (basename === '' || pos < 1) ? '' : basename.slice(pos + 1);
};

export const isMediaRequest = (url) => (
  /\/media_[0-9a-f]{40,}[/a-zA-Z0-9_-]*\.[0-9a-z]+$/.test(url.pathname)
);

export const isRUMRequest = (url) => /\/\.(rum|optel)\/.*/.test(url.pathname);

/**
 * Formats a date string to ISO 8601 format (YYYY-MM-DD)
 * Handles UK date format (dd/mm/yyyy) as default and month names (Dec, December)
 * @param {string} dateString - Date string in various formats
 * @returns {string|null} ISO 8601 formatted date or null if invalid
 */
export const formatISO8601Date = (dateString) => {
  if (!dateString || typeof dateString !== 'string') return null;

  const trimmed = dateString.trim();
  if (!trimmed) return null;

  // If already ISO 8601 format (YYYY-MM-DD), return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }

  // Month name mapping (full and abbreviated)
  const months = {
    january: 0,
    jan: 0,
    february: 1,
    feb: 1,
    march: 2,
    mar: 2,
    april: 3,
    apr: 3,
    may: 4,
    june: 5,
    jun: 5,
    july: 6,
    jul: 6,
    august: 7,
    aug: 7,
    september: 8,
    sep: 8,
    sept: 8,
    october: 9,
    oct: 9,
    november: 10,
    nov: 10,
    december: 11,
    dec: 11,
  };

  let day;
  let month;
  let year;

  // Try to parse dates with month names first
  // Patterns: "10 December 2024", "December 10, 2024"
  // eslint-disable-next-line max-len
  const monthNamePattern = /(\d{1,2})[\s-]*([a-zA-Z]+)[\s,-]*(\d{4})|([a-zA-Z]+)[\s-]*(\d{1,2})[\s,-]*(\d{4})/i;
  const monthMatch = trimmed.match(monthNamePattern);

  if (monthMatch) {
    if (monthMatch[1]) {
      // Pattern: day month year (10 December 2024, 10-Dec-2024)
      day = parseInt(monthMatch[1], 10);
      month = months[monthMatch[2].toLowerCase()];
      year = parseInt(monthMatch[3], 10);
    } else {
      // Pattern: month day year (December 10 2024, Dec 10 2024)
      month = months[monthMatch[4].toLowerCase()];
      day = parseInt(monthMatch[5], 10);
      year = parseInt(monthMatch[6], 10);
    }
  } else {
    // Try numeric format: assume UK format (dd/mm/yyyy) by default
    const numericPattern = /(\d{1,2})[/\s-](\d{1,2})[/\s-](\d{4})/;
    const numericMatch = trimmed.match(numericPattern);

    if (numericMatch) {
      // UK format: day/month/year
      day = parseInt(numericMatch[1], 10);
      month = parseInt(numericMatch[2], 10) - 1; // Convert to 0-indexed
      year = parseInt(numericMatch[3], 10);
    } else {
      // Unable to parse
      return null;
    }
  }

  // Validate parsed values
  if (month === undefined || month < 0 || month > 11) return null;
  if (!day || day < 1 || day > 31) return null;
  if (!year || year < 1900 || year > 2100) return null;

  // Create date object and validate it's a real date
  const date = new Date(year, month, day);
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }

  // Format as ISO 8601 (YYYY-MM-DD)
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

/**
 * Builds JSON-LD object from article metadata
 * @param {Object} article - Article metadata
 * @param {string} hostname - Publisher hostname
 * @returns {Object} JSON-LD object
 */
export const buildJsonLd = (article, hostname) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
  };

  // Only add fields that have values
  if (article.description) jsonLd.description = article.description;
  if (article.url) jsonLd.url = article.url;

  // Format dates to ISO 8601 before adding
  const formattedPublishDate = formatISO8601Date(article.publishDate);
  if (formattedPublishDate) jsonLd.datePublished = formattedPublishDate;

  const formattedModifiedDate = formatISO8601Date(article.modifiedDate);
  if (formattedModifiedDate) jsonLd.dateModified = formattedModifiedDate;

  if (article.author) {
    jsonLd.author = {
      '@type': 'Person',
      name: article.author,
    };
    // Add author URL if available
    if (article.authorUrl) {
      jsonLd.author.url = article.authorUrl;
    }
  }

  if (article.image) {
    jsonLd.image = {
      '@type': 'ImageObject',
      url: article.image,
    };
    if (article.imageAlt) {
      jsonLd.image.caption = article.imageAlt;
    }
  }

  jsonLd.publisher = {
    '@type': 'Organization',
    name: hostname,
  };

  return jsonLd;
};

// --- HTMLRewriter Handlers ---
// These functions encapsulates the logic for each element type
// They modify the 'article' state object or the 'element' itself

export const handleJsonLdErrorScript = (e, article) => {
  const error = e.getAttribute('data-error');
  if (error && error.includes('"article"')) {
    article.shouldGenerateJsonLd = true;
  }
  e.remove();
};

export const handleJsonLdMeta = (e, article) => {
  const value = e.getAttribute('content');
  if (value === 'article') {
    article.shouldGenerateJsonLd = true;
  }
  e.remove();
};

export const handleLegacyJsonLdScript = (e, article) => {
  article.shouldGenerateJsonLd = true;
  e.remove();
};

export const handleOgTitle = (e, article, DEBUG) => {
  const content = e.getAttribute('content');
  article.title = content;
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('og:title extracted:', { content, hasContent: !!content });
  }
};

export const handleOgDescription = (e, article) => {
  if (!article.description) {
    article.description = e.getAttribute('content');
  }
};

export const handleLongDescription = (e, article) => {
  article.description = e.getAttribute('content');
  e.remove();
};

export const handleOgUrl = (e, article) => {
  article.url = e.getAttribute('content');
};

export const handleOgImage = (e, article) => {
  if (!article.image) {
    article.image = e.getAttribute('content');
  }
};

export const handleOgImageAlt = (e, article) => {
  article.imageAlt = e.getAttribute('content');
};

export const handleDescription = (e, article) => {
  if (!article.description) {
    article.description = e.getAttribute('content');
  }
  e.remove();
};

export const handleAuthor = (e, article) => {
  article.author = e.getAttribute('content');
  // Keep author meta tag for attribution (like LinkedIn) - don't remove
};

export const handleAuthorUrl = (e, article) => {
  if (!article.authorUrl) {
    article.authorUrl = e.getAttribute('content');
  }
  e.remove();
};

export const handleLinkedIn = (e, article) => {
  // Use LinkedIn as fallback for author URL if not already set
  if (!article.authorUrl) {
    article.authorUrl = e.getAttribute('content');
  }
  // Keep LinkedIn meta tag for social media (don't remove)
};

export const handlePublicationDate = (e, article) => {
  if (!article.publishDate) {
    article.publishDate = e.getAttribute('content');
  }
  e.remove();
};

export const handleModifiedDate = (e, article) => {
  if (!article.modifiedDate) {
    article.modifiedDate = e.getAttribute('content');
  }
  e.remove();
};

export const handleViewport = (element, article, requestUrl, DEBUG) => {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('Viewport handler:', {
      shouldGenerate: article.shouldGenerateJsonLd,
      hasTitle: !!article.title,
      title: article.title,
    });
  }

  // Only generate JSON-LD if triggered by json-ld meta tag and we have title
  if (!article.shouldGenerateJsonLd || !article.title) {
    if (DEBUG) {
      // eslint-disable-next-line no-console
      console.log('JSON-LD skipped:', {
        reason: !article.shouldGenerateJsonLd ? 'no trigger' : 'no title',
      });
    }
    return;
  }

  const jsonLd = buildJsonLd(article, requestUrl.hostname);

  try {
    const script = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
    element.after(script, { html: true });

    if (DEBUG) {
      // eslint-disable-next-line no-console
      console.log('JSON-LD generated successfully:', {
        url: requestUrl.pathname,
        fields: Object.keys(jsonLd),
        hasAuthor: !!article.author,
        hasImage: !!article.image,
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('JSON-LD serialization failed:', {
      error: err.message,
      url: requestUrl.pathname,
      title: article.title,
    });
  }
};

const handleRequest = async (request, env, _ctx) => {
  // Validate required environment variables
  if (!env.ORIGIN_HOSTNAME) {
    return new Response('Configuration Error: Missing ORIGIN_HOSTNAME environment variable', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Optional debug logging (set DEBUG=true in environment variables)
  const DEBUG = env.DEBUG === 'true';

  const url = new URL(request.url);

  // Handle CORS preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  if (url.port) {
    // Cloudflare opens a couple more ports than 443, so we redirect visitors
    // to the default port to avoid confusion.
    // https://developers.cloudflare.com/fundamentals/reference/network-ports/#network-ports-compatible-with-cloudflares-proxy
    const redirectTo = new URL(request.url);
    redirectTo.port = '';
    return new Response(`Moved permanently to ${redirectTo.href}`, {
      status: 301,
      headers: {
        location: redirectTo.href,
      },
    });
  }

  if (url.pathname.startsWith('/drafts/')) {
    return new Response('Not Found', { status: 404 });
  }

  if (isRUMRequest(url)) {
    // only allow GET, POST, OPTIONS
    if (!['GET', 'POST', 'OPTIONS'].includes(request.method)) {
      return new Response('Method Not Allowed', { status: 405 });
    }
  }

  const extension = getExtension(url.pathname);
  // remember original search params
  const savedSearch = url.search;
  // sanitise search params
  const { searchParams } = url;
  if (isMediaRequest(url)) {
    Array.from(searchParams.keys()).forEach((key) => {
      if (!['format', 'height', 'optimize', 'width'].includes(key)) {
        searchParams.delete(key);
      }
    });
  } else if (extension === 'json') {
    Array.from(searchParams.keys()).forEach((key) => {
      if (!['limit', 'offset', 'sheet'].includes(key)) {
        searchParams.delete(key);
      }
    });
  } else {
    // neither media nor json request: strip search params
    url.search = '';
  }
  searchParams.sort();

  url.hostname = env.ORIGIN_HOSTNAME;
  if (!url.origin.match(/^https?:\/\/main--.*--.*\.(?:aem|hlx)\.(?:live|page)/)) {
    return new Response('Invalid ORIGIN_HOSTNAME', { status: 500 });
  }

  const req = new Request(url, request);
  req.headers.set('x-forwarded-host', req.headers.get('host'));
  req.headers.set('x-byo-cdn-type', 'cloudflare');
  if (env.PUSH_INVALIDATION !== 'disabled') {
    req.headers.set('x-push-invalidation', 'enabled');
  }
  if (env.ORIGIN_AUTHENTICATION) {
    req.headers.set('authorization', `token ${env.ORIGIN_AUTHENTICATION}`);
  }

  let resp = await fetch(req, {
    method: req.method,
    cf: {
      // cf doesn't cache html by default: need to override the default behaviour
      cacheEverything: true,
    },
  });

  // Only process HTML responses for JSON-LD injection
  const contentType = resp.headers.get('content-type');
  if (contentType && contentType.includes('text/html')) {
    const article = {
      title: null,
      description: null,
      image: null,
      imageAlt: null,
      url: null,
      author: null,
      authorUrl: null,
      publishDate: null,
      modifiedDate: null,
      shouldGenerateJsonLd: false,
    };

    // eslint-disable-next-line no-undef
    resp = new HTMLRewriter()
      .on('script[type="application/ld+json"][data-error]', {
        element: (e) => handleJsonLdErrorScript(e, article),
      })
      .on('meta[name="jsonld"]', {
        element: (e) => handleJsonLdMeta(e, article),
      })
      .on('script[type="application/ld+json"]:not([data-error])', {
        element: (e) => handleLegacyJsonLdScript(e, article),
      })
      .on('meta[data-error]', {
        element(e) { e.remove(); },
      })
      .on('meta[property="og:title"]', {
        element: (e) => handleOgTitle(e, article, DEBUG),
      })
      .on('meta[property="og:description"]', {
        element: (e) => handleOgDescription(e, article),
      })
      .on('meta[name="longdescription"]', {
        element: (e) => handleLongDescription(e, article),
      })
      .on('meta[property="og:url"]', {
        element: (e) => handleOgUrl(e, article),
      })
      .on('meta[property="og:image"]', {
        element: (e) => handleOgImage(e, article),
      })
      .on('meta[property="og:image:alt"]', {
        element: (e) => handleOgImageAlt(e, article),
      })
      .on('meta[name="description"]', {
        element: (e) => handleDescription(e, article),
      })
      .on('meta[name="author"]', {
        element: (e) => handleAuthor(e, article),
      })
      .on('meta[name="author-url"]', {
        element: (e) => handleAuthorUrl(e, article),
      })
      .on('meta[name="linkedin"]', {
        element: (e) => handleLinkedIn(e, article),
      })
      .on('meta[name="publication-date"], meta[name="published-date"]', {
        element: (e) => handlePublicationDate(e, article),
      })
      .on('meta[name="modified-date"], meta[name="last-modified"]', {
        element: (e) => handleModifiedDate(e, article),
      })
      .on('meta[name="viewport"]', {
        element: (e) => handleViewport(e, article, new URL(request.url), DEBUG),
      })
      .transform(resp);
  }

  // Create new Response for header modifications
  resp = new Response(resp.body, resp);

  if (resp.status === 301 && savedSearch) {
    const location = resp.headers.get('location');
    if (location && !location.match(/\?.*$/)) {
      resp.headers.set('location', `${location}${savedSearch}`);
    }
  }

  if (resp.status === 304) {
    // 304 Not Modified - remove CSP header
    resp.headers.delete('Content-Security-Policy');
  }

  resp.headers.delete('age');
  resp.headers.delete('x-robots-tag');

  // Add CORS headers
  resp.headers.set('Access-Control-Allow-Origin', '*');
  resp.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  resp.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Add worker version header
  resp.headers.set('cfw', WORKER_VERSION);

  return resp;
};

export default {
  fetch: handleRequest,
};
