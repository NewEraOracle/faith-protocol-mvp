import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const rootArg = process.argv[2] ?? ".";
const port = Number(process.argv[3] ?? 5173);
const root = resolve(rootArg);

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

const server = createServer((req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "127.0.0.1"}`);
  const pathname = decodeURIComponent(url.pathname);
  let filePath = normalize(join(root, pathname));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(root, "index.html");
  }

  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  res.writeHead(200, { "Content-Type": mime[extname(filePath)] ?? "application/octet-stream" });
  createReadStream(filePath).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`UtopiaByFaith isometric dev server: http://127.0.0.1:${port}/`);
});
