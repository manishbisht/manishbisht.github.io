import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// NOTE: deliberately not `new URL("./global.css", import.meta.url)` — Vite's
// import-analysis plugin statically rewrites that exact two-argument pattern
// into a dev-server asset URL (http://localhost:3000/...), which breaks
// fileURLToPath() under Vitest's jsdom environment. Building the path via
// node:path from the (single-argument) import.meta.url avoids the rewrite.
const __dirname = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(__dirname, "global.css"), "utf8");

const THEMED = [
    "bg",
    "card",
    "card2",
    "ink",
    "ink2",
    "ink3",
    "muted",
    "line",
    "chip",
    "chipInk",
    "accentInk",
    "accentSoft",
    "dark",
    "oss",
    "ossCard",
];

describe("token layer", () => {
    it.each(THEMED)(
        "declares --%s twice, plain before light-dark()",
        (name) => {
            const plain = new RegExp(`--${name}:\\s*#[0-9A-Fa-f]{6};`);
            const themed = new RegExp(`--${name}:\\s*light-dark\\(`);
            expect(css).toMatch(plain);
            expect(css).toMatch(themed);
            expect(css.search(plain)).toBeLessThan(css.search(themed));
        }
    );

    it("opts into both color schemes", () => {
        expect(css).toMatch(/color-scheme:\s*light dark/);
    });

    it("honours an explicit theme override on the root element", () => {
        expect(css).toMatch(
            /\[data-theme="light"\][\s\S]*?color-scheme:\s*light/
        );
        expect(css).toMatch(
            /\[data-theme="dark"\][\s\S]*?color-scheme:\s*dark/
        );
    });

    it("guards scroll-driven animation behind @supports", () => {
        expect(css).toMatch(/@supports \(animation-timeline: view\(\)\)/);
    });

    it("defines every keyframe the design uses", () => {
        for (const name of [
            "rise",
            "reveal",
            "marquee",
            "float",
            "blink",
            "pulse",
        ]) {
            expect(css).toMatch(new RegExp(`@keyframes ${name}\\b`));
        }
    });

    it("drops the dead .reveal rules", () => {
        expect(css).not.toMatch(/\.reveal\s*\{/);
    });

    it("no longer uses the old oklch palette", () => {
        expect(css).not.toMatch(/oklch\(/);
    });
});
