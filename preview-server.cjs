const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 8000);
const types = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  const file = path.resolve(root, `.${pathname}`, 'index.html');
  const directFile = path.resolve(root, `.${pathname}`);
  const target = pathname.endsWith('/') ? file : directFile;
  if (target !== root && !target.startsWith(root + path.sep)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  fs.stat(target, (error, stats) => {
    const resolved = !error && stats.isDirectory() ? path.join(target, 'index.html') : target;
    fs.readFile(resolved, (readError, content) => {
      if (readError) {
        response.writeHead(readError.code === 'ENOENT' ? 404 : 500).end('Page unavailable');
        return;
      }
      response.writeHead(200, { 'Content-Type': `${types[path.extname(resolved)] || 'application/octet-stream'}; charset=utf-8` });
      response.end(content);
    });
  });
}).listen(port, '127.0.0.1', () => {
  console.log(`Preview: http://127.0.0.1:${port}/`);
});
