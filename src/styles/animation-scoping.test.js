import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// NOTE: path built via node:path from a single-argument import.meta.url —
// Vite's import-analysis plugin rewrites `new URL(x, import.meta.url)`.
const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "..");

function cssModuleFiles(dir) {
    const out = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) out.push(...cssModuleFiles(full));
        else if (entry.name.endsWith(".module.css")) out.push(full);
    }
    return out;
}

const KEYWORDS = new Set([
    "normal",
    "reverse",
    "alternate",
    "alternate-reverse",
    "none",
    "forwards",
    "backwards",
    "both",
    "running",
    "paused",
    "infinite",
    "linear",
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "step-start",
    "step-end",
]);

// The animation name is the one token that is not a duration, a count, a
// timing function, or a direction/fill/play-state keyword.
function animationName(value) {
    const withoutFns = value.replace(/\w+\([^)]*\)/g, " ");
    return withoutFns
        .split(/\s+/)
        .filter(Boolean)
        .find(
            (t) =>
                !KEYWORDS.has(t) &&
                !/^-?[\d.]+m?s$/.test(t) &&
                !/^-?[\d.]+$/.test(t)
        );
}

describe("CSS module animation scoping", () => {
    const files = cssModuleFiles(srcDir);

    it("finds the css modules it is meant to guard", () => {
        expect(files.length).toBeGreaterThan(0);
    });

    // CSS Modules rewrites the animation name inside a `animation:` shorthand
    // to a hashed local name. A @keyframes declared in a plain global
    // stylesheet therefore can NEVER be reached from a module — the reference
    // silently resolves to nothing and the element simply does not animate.
    // jsdom applies no CSS, so only a static check like this catches it.
    it.each(files.map((f) => [f.replace(srcDir, "src"), f]))(
        "%s references only keyframes it declares itself",
        (_label, file) => {
            // Strip comments first: prose that mentions "animation:" would
            // otherwise be parsed as a declaration.
            const css = readFileSync(file, "utf8").replace(
                /\/\*[\s\S]*?\*\//g,
                " "
            );
            const declared = new Set(
                [...css.matchAll(/@keyframes\s+([\w-]+)/g)].map((m) => m[1])
            );
            const referenced = [
                ...css.matchAll(/animation(?:-name)?\s*:\s*([^;}]+)/g),
            ]
                .map((m) => animationName(m[1]))
                .filter(Boolean);

            for (const name of referenced) {
                expect(
                    declared,
                    `${file} animates "${name}" but declares no @keyframes ${name}; ` +
                        `a global @keyframes cannot be referenced from a CSS module.`
                ).toContain(name);
            }
        }
    );
});
