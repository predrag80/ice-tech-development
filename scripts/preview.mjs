import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { pathToFileURL } from "node:url";

const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "application/javascript", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2" };

export async function previewServer(root = resolve("out")) {
  const headers = JSON.parse(await readFile(resolve(root, ".headers.json"), "utf8"));
  return createServer(async (request, response) => {
    if (process.env.PREVIEW_LOG_REQUESTS === "1") response.on("finish", () => console.log(request.method, request.url, response.statusCode));
    try {
      const url = new URL(request.url, "http://localhost");
      const pathname = decodeURIComponent(url.pathname);
      if (pathname.split("/").some((part) => part.startsWith("."))) {
        response.writeHead(404).end(); return;
      }
      if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405, { Allow: "GET, HEAD" }).end(); return; }
      let file = resolve(root, `.${pathname}`);
      if (file !== root && !file.startsWith(root + sep)) { response.writeHead(404).end(); return; }
      let status = 200;
      try {
        if ((await stat(file)).isDirectory()) {
          if (!url.pathname.endsWith("/")) {
            response.writeHead(308, { Location: `${url.pathname}/${url.search}` }).end(); return;
          }
          file = resolve(file, "index.html");
        }
        await stat(file);
      } catch { file = resolve(root, "404.html"); status = 404; }
      const body = await readFile(file);
      response.writeHead(status, { ...headers, "Content-Type": types[extname(file)] ?? "application/octet-stream", "Cache-Control": "no-cache", "Content-Length": body.length });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch {
      response.writeHead(400).end("Bad request");
    }
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT ?? 4175);
  const server = await previewServer();
  server.listen(port, "127.0.0.1", () => console.log(`Static production preview: http://127.0.0.1:${port}`));
}
