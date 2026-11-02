/**
 * Pre-renders the home page into dist/index.html after `vite build`.
 *
 * The SPA otherwise ships an empty <div id="root">, and most AI crawlers
 * (GPTBot, ClaudeBot, PerplexityBot) do not execute JavaScript, so they saw
 * nothing but meta tags on the most important page. This renders the same
 * React tree to HTML with the SSR bundle, and src/main.jsx hydrates it.
 */
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ssrDir = join(root, "dist-ssr");
const htmlPath = join(root, "dist", "index.html");

const { render } = await import(
    pathToFileURL(join(ssrDir, "entry-server.js")).href
);
const appHtml = render("/");

const html = readFileSync(htmlPath, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) {
    throw new Error(`prerender: ${marker} not found in dist/index.html`);
}
writeFileSync(
    htmlPath,
    html.replace(marker, `<div id="root">${appHtml}</div>`),
    "utf8"
);
rmSync(ssrDir, { recursive: true, force: true });

console.log(`prerender: wrote ${appHtml.length} chars into dist/index.html`);
