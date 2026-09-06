import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(__dirname, "index.html"), "utf8");

describe("document shell", () => {
    it("loads Space Grotesk and JetBrains Mono", () => {
        expect(html).toMatch(/family=Space\+Grotesk/);
        expect(html).toMatch(/family=JetBrains\+Mono/);
    });

    it("no longer loads Geist", () => {
        expect(html).not.toMatch(/Geist/);
    });

    it("declares a theme-color per colour scheme", () => {
        expect(html).toMatch(
            /theme-color[\s\S]*?media="\(prefers-color-scheme: light\)"/
        );
        expect(html).toMatch(
            /theme-color[\s\S]*?media="\(prefers-color-scheme: dark\)"/
        );
    });

    it("applies the stored theme before first paint", () => {
        const head = html.slice(0, html.indexOf("</head>"));
        expect(head).toMatch(/__setTheme/);
        expect(head).toMatch(/localStorage/);
    });

    it("defines the theme script before the app bundle", () => {
        expect(html.indexOf("__setTheme")).toBeLessThan(
            html.indexOf("/src/main.jsx")
        );
    });
});
