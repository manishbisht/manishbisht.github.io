import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// NOTE: path built via node:path from a single-argument import.meta.url —
// Vite's import-analysis plugin rewrites `new URL(x, import.meta.url)`.
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const ORIGIN = "https://manishbisht.me";

describe("discoverability files", () => {
    it("serves robots.txt from public/, so it lands at the site root", () => {
        const robots = read("public/robots.txt");
        expect(robots).toMatch(/^User-agent: \*$/m);
        expect(robots).toMatch(/^Allow: \/$/m);
    });

    // Named explicitly rather than left to the wildcard: if one of these is
    // ever dropped, that should be a deliberate edit, not an accident.
    it.each([
        "GPTBot",
        "OAI-SearchBot",
        "ClaudeBot",
        "PerplexityBot",
        "Google-Extended",
        "CCBot",
    ])("names %s in robots.txt", (agent) => {
        expect(read("public/robots.txt")).toMatch(
            new RegExp(`^User-agent: ${agent}$`, "m")
        );
    });

    it("points robots.txt at the sitemap on the canonical origin", () => {
        expect(read("public/robots.txt")).toContain(
            `Sitemap: ${ORIGIN}/sitemap.xml`
        );
    });

    it("serves a sitemap listing the canonical origin", () => {
        const sitemap = read("public/sitemap.xml");
        expect(sitemap).toContain("<urlset");
        expect(sitemap).toContain(`<loc>${ORIGIN}/</loc>`);
    });

    it("serves llms.txt with a heading and a summary blockquote", () => {
        const llms = read("public/llms.txt");
        expect(llms).toMatch(/^# Manish Bisht$/m);
        expect(llms).toMatch(/^> /m);
        expect(llms).toContain("hi@manishbisht.me");
    });

    // Every anchor the rail links to should be described for a crawler that
    // never runs the JS that renders them.
    it.each(["consulting", "experience", "open-source", "skills", "contact"])(
        "describes the #%s section in llms.txt",
        (id) => {
            expect(read("public/llms.txt")).toContain(`${ORIGIN}/#${id}`);
        }
    );

    // The app routes with HashRouter, so /#/work is not a separate URL to a
    // crawler. These static pages are what make that content indexable, and
    // they are generated from the same constants the components render, so
    // they cannot drift. Regenerate with `yarn build:static`.
    it.each(["work", "impact", "writing", "testimonials"])(
        "serves a static, JS-free page at /%s/",
        (slug) => {
            const html = read(`public/${slug}/index.html`);
            expect(html).toMatch(/^<!doctype html>/);
            expect(html).toContain(
                `<link rel="canonical" href="${ORIGIN}/${slug}/" />`
            );
            expect(html).toMatch(/<h1>.+<\/h1>/);
            expect(html).toContain('<a class="back" href="/">');
            // no bundle, no hydration — the content is in the markup
            expect(html).not.toContain("<script");
        }
    );

    it.each(["work", "impact", "writing", "testimonials"])(
        "lists /%s/ in the sitemap",
        (slug) => {
            expect(read("public/sitemap.xml")).toContain(
                `<loc>${ORIGIN}/${slug}/</loc>`
            );
        }
    );

    it("carries real content into the static pages, not just chrome", () => {
        expect(read("public/testimonials/index.html")).toContain(
            "Vinayak Hegde"
        );
        expect(read("public/writing/index.html")).toContain(
            "The frontend platform is a product"
        );
        expect(read("public/work/index.html")).toContain("VideoVerse");
        expect(read("public/impact/index.html")).toContain("p95 latency");
    });

    it("declares a canonical origin in index.html", () => {
        expect(read("index.html")).toContain(
            `<link rel="canonical" href="${ORIGIN}/" />`
        );
    });
});
