/**
 * Minimal static dev server for portfolio-unykorn.
 * Usage: node scripts/serve.js  →  http://localhost:4000
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css; charset=utf-8",
  ".js":   "text/javascript; charset=utf-8",
  ".png":  "image/png",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".webp": "image/webp",
};

http.createServer((req, res) => {
  let url = req.url.split("?")[0];
  if (url === "/") url = "/index.html";
  // directory routing: /services → /services/index.html
  if (!path.extname(url)) url = url.replace(/\/?$/, "/index.html");

  const filePath = path.join(ROOT, url);
  if (!fs.existsSync(filePath)) {
    const four04 = path.join(ROOT, "404.html");
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(fs.existsSync(four04) ? fs.readFileSync(four04) : "<h1>404</h1>");
    return;
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
  res.end(fs.readFileSync(filePath));
}).listen(4000, () => console.log("Dev server: http://localhost:4000"));
