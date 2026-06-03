import { cp, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";

const dist = new URL("../dist/", import.meta.url);
const src = new URL("../src/", import.meta.url);
const index = new URL("../index.html", import.meta.url);
const publicDir = new URL("../public/", import.meta.url);

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(index, new URL("index.html", dist));
await cp(src, new URL("src/", dist), { recursive: true });

if (existsSync(publicDir)) {
  await cp(publicDir, new URL("public/", dist), { recursive: true });
}

console.log("Built UtopiaByFaith isometric vertical slice to dist/.");
