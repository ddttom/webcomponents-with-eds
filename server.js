import { createServer } from 'http';
import { readFile, access } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//this file is a debugging artefact and it should be treated as readonly

const PORT = process.env.PORT || 3000;
const PROXY_HOST = 'https://allabout.network';

// MIME type mapping
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

// Check if file exists locally
async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Serve local file
async function serveLocalFile(filePath, res) {
  try {
    const content = await readFile(filePath);
    const ext = extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
    });
    res.end(content);
    return true;
  } catch (error) {
    console.error(`Error serving local file ${filePath}:`, error.message);
    return false;
  }
}

// Proxy request to config's proxy host
async function proxyRequest(url, res) {
  try {
    const proxyUrl = `${PROXY_HOST}${url}`;
    // eslint-disable-next-line no-console
    console.log(`Proxying request to: ${proxyUrl}`);

    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; EDS-Emulation-Layer/1.0)',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
      },
    });

    // eslint-disable-next-line no-console
    console.log(`Proxy response status: ${response.status} ${response.statusText}`);
    // eslint-disable-next-line no-console
    console.log('Proxy response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error(`Proxy request failed: ${response.status} ${response.statusText}`);
      console.error(`Failed URL: ${proxyUrl}`);
      throw new Error(`Proxy request failed: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    // eslint-disable-next-line no-console
    console.log(`Proxy content type: ${contentType}`);

    // Handle different content types appropriately
    let content;
    const isTextContent = contentType.includes('text/')
      || contentType.includes('application/json')
      || contentType.includes('application/javascript');

    if (isTextContent) {
      content = await response.text();
      // eslint-disable-next-line no-console
      console.log(`Proxy content length (text): ${content.length} characters`);
    } else {
      content = await response.arrayBuffer();
      // eslint-disable-next-line no-console
      console.log(`Proxy content length (binary): ${content.byteLength} bytes`);
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });

    if (typeof content === 'string') {
      res.end(content);
    } else {
      res.end(Buffer.from(content));
    }

    // eslint-disable-next-line no-console
    console.log(`✅ Successfully proxied: ${url}`);
    return true;
  } catch (error) {
    console.error(`❌ Error proxying request for ${url}:`, error.message);
    console.error('Full error:', error);
    return false;
  }
}

// Main request handler
async function handleRequest(req, res) {
  const url = req.url === '/' ? '/server.html' : req.url;
  const filePath = join(__dirname, url.startsWith('/') ? url.slice(1) : url);

  // eslint-disable-next-line no-console
  console.log(`Request: ${req.method} ${url}`);

  // Handle Chrome DevTools specific requests gracefully
  if (url.includes('/.well-known/appspecific/') || 
      url.includes('/chrome-devtools/') ||
      url.includes('/__vscode_') ||
      url.includes('/favicon.ico')) {
    // Return 204 No Content for DevTools requests to avoid proxy errors
    console.log(`🔧 Skipping DevTools/system request: ${url}`);
    res.writeHead(204, { 'Content-Type': 'text/plain' });
    res.end();
    return;
  }

  // Try to serve local file first
  if (await fileExists(filePath)) {
    // eslint-disable-next-line no-console
    console.log(`Serving local file: ${filePath}`);
    const served = await serveLocalFile(filePath, res);
    if (served) return;
  }

  // If local file doesn't exist or failed to serve, try proxy
  // eslint-disable-next-line no-console
  console.log(`Local file not found, attempting proxy for: ${url}`);
  const proxied = await proxyRequest(url, res);

  if (!proxied) {
    // If both local and proxy fail, return 404
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head><title>404 Not Found</title></head>
        <body>
          <h1>404 Not Found</h1>
          <p>The requested resource <code>${url}</code> was not found locally 
          or on the proxy server.</p>
          <p>Attempted proxy URL: <code>${PROXY_HOST}${url}</code></p>
        </body>
      </html>
    `);
  }
}

// Create and start server
const server = createServer(handleRequest);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`📁 Serving files from: ${__dirname}`);
  // eslint-disable-next-line no-console
  console.log(`🔗 Proxying missing files to: ${PROXY_HOST}`);
  // eslint-disable-next-line no-console
  console.log(`📄 Main page: http://localhost:${PORT}/server.html`);
  // eslint-disable-next-line no-console
  console.log(`🔧 DevTools requests will be handled gracefully`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  // eslint-disable-next-line no-console
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('✅ Server closed');
    process.exit(0);
  });
});
