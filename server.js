const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const RACING_DIR = path.join(ROOT, 'racing.porsche.com');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.webm': 'video/webm',
    '.mp4': 'video/mp4',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // 1. Next.js image optimization API handler
    if (pathname === '/_next/image') {
        const targetUrl = parsedUrl.query.url;
        if (targetUrl) {
            let imgPath = path.join(RACING_DIR, targetUrl);
            if (fs.existsSync(imgPath) && fs.statSync(imgPath).isFile()) {
                const ext = path.extname(imgPath).toLowerCase();
                res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
                return fs.createReadStream(imgPath).pipe(res);
            }
        }
    }

    // 2. Map request path to local disk file
    let candidatePaths = [];

    if (pathname === '/' || pathname === '/index.html') {
        candidatePaths.push(path.join(RACING_DIR, 'index.html'));
    } else if (pathname.startsWith('/_next/')) {
        candidatePaths.push(path.join(RACING_DIR, pathname));
    } else if (pathname.startsWith('/homepage/')) {
        candidatePaths.push(path.join(RACING_DIR, pathname));
    } else if (pathname.startsWith('/cdn.ui.porsche.com/')) {
        candidatePaths.push(path.join(ROOT, pathname));
    } else if (pathname.startsWith('/res.cloudinary.com/')) {
        candidatePaths.push(path.join(ROOT, pathname));
    } else if (pathname.startsWith('/www.porsche.com/')) {
        candidatePaths.push(path.join(ROOT, pathname));
    } else {
        candidatePaths.push(path.join(RACING_DIR, pathname));
        candidatePaths.push(path.join(ROOT, pathname));
    }

    for (let filePath of candidatePaths) {
        filePath = filePath.split('?')[0];

        if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                const indexPath = path.join(filePath, 'index.html');
                if (fs.existsSync(indexPath)) {
                    filePath = indexPath;
                } else {
                    continue;
                }
            }

            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            res.writeHead(200, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*'
            });
            return fs.createReadStream(filePath).pipe(res);
        }
    }

    // 404 fallback - if video/image missing, return empty 204 to prevent JS errors
    const ext = path.extname(pathname).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.mp4', '.webm'].includes(ext)) {
        res.writeHead(204);
        return res.end();
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: ' + pathname);
});

server.listen(PORT, () => {
    console.log(`Porsche Motorsport server running at http://localhost:${PORT}/`);
});
