# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild manishbisht.me on the new Claude Design canvas — a light/dark bento-card layout — without changing the site's content.

**Architecture:** Replace the dark-only oklch token layer in `global.css` with a `light-dark()` palette, swap the type stack to Space Grotesk + JetBrains Mono, extract five repeated primitives (`Card`, `Chip`, `SectionHead`, `CornerMark`, `MetricTile`), then rewrite each section component in place against those primitives. CSS Modules and the one-folder-per-component convention are retained throughout. The standalone `/consulting` route is retired and its component re-parented onto the home page.

**Tech Stack:** React 19, Vite 8, react-router-dom 7 (`HashRouter`), CSS Modules, Vitest + @testing-library/react, Yarn 1.

**Spec:** `docs/superpowers/specs/2026-09-06-portfolio-redesign-design.md`

## Global Constraints

- **Package manager is Yarn.** `package.json` has a `preinstall` guard that aborts on npm. Always `yarn add`, never `npm install`.
- **Prettier is enforced through ESLint** (`eslint-plugin-prettier/recommended`). All code must be 4-space indented, double-quoted, semicolon-terminated, with `trailingComma: "es5"`. Non-conforming code fails `yarn lint`.
- **`react/prop-types` is off.** Do not add propTypes.
- **Every CSS custom property is declared twice** — a plain light value, then the `light-dark()` pair. Omitting the plain declaration renders the page unstyled on browsers without `light-dark()` support.
- **Breakpoint is 700px.** It gates the hero rail and the floating badge. Matches the design's `matchMedia("(min-width: 701px)")`.
- **All scroll-driven animation lives inside `@supports (animation-timeline: view())`.** Unsupported browsers must render sections fully visible, never at `opacity: 0`.
- **All motion is gated behind `@media (prefers-reduced-motion: reduce)`.**
- **Tests assert on user-visible text, ARIA roles, hrefs, and semantics — never on CSS-module class names.** Class-name assertions break on every legitimate restyle and verify nothing real.
- **Content is not rewritten.** The only data changes in this plan are reordering `SKILLS` and adding a `Consulting` entry to `NAV`.
- **`__BUILD_VERSION__`** is a Vite `define` global. It must be declared to both ESLint and Vitest or builds and tests break.

## File Structure

**New**

| Path | Responsibility |
|---|---|
| `src/test/setup.js` | Vitest global setup: jest-dom matchers, `matchMedia` stub, cleanup |
| `src/hooks/useTheme.js` | Reads/writes `data-theme` on `<html>`, persists to `localStorage` |
| `src/hooks/useCountUp.js` | rAF cubic-ease-out counter, reduced-motion aware |
| `src/components/primitives/CornerMark/` | The ⌐ bracket glyph (~12 uses) |
| `src/components/primitives/Card/` | Rounded surface, `tone` + `radius` props (~30 uses) |
| `src/components/primitives/Chip/` | `mono` and `pill` variants |
| `src/components/primitives/SectionHead/` | Eyebrow + h2 + lede grid |
| `src/components/primitives/MetricTile/` | Number + label + corner mark |
| `src/components/ThemeToggle/` | Fixed top-right light/dark control |
| `src/components/HeroRail/` | Vertical rotated nav, desktop-only; owns `NAV` |
| `src/components/Marquee/` | Scrolling ticker pill |

**Rewritten**

| Path | Change |
|---|---|
| `index.html` | Fonts, dual `theme-color`, pre-paint theme script |
| `vite.config.js` | Add Vitest `test` block |
| `eslint.config.js` | Add Vitest globals for test files |
| `package.json` | Add `test` scripts + dev dependencies |
| `src/styles/global.css` | Token layer, reset, type, keyframes |
| `src/App.jsx` | Drop `pageBg` + `/consulting` route, mount `ThemeToggle` |
| `src/App.module.css` | 1320px container, drop halo/grid |
| `src/pages/Home/index.jsx` | New section order incl. Consulting + Marquee |
| `src/components/Hero/` | Full rebuild |
| `src/components/Consulting/` | Page component becomes a home section |
| `src/components/Timeline/` | Card layout replaces the rail |
| `src/components/Skills/` | Palette-cycled cards; `constants.js` reordered |
| `src/components/Contact/` | Full-blue section |
| `src/components/Footer/` | Simplified, build meta retained |
| `src/pages/{Work,Impact,Writing,Testimonials}/` + components | Bento restyle |

**Deleted**

| Path | Reason |
|---|---|
| `src/pages/Consulting/` | Route retired |
| `src/components/Nav/` | Replaced by `HeroRail`; `NAV` moves with it |
| `.reveal` rules in `global.css` | Dead code, never imported |

---

### Task 1: Test harness

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Modify: `eslint.config.js`
- Create: `src/test/setup.js`
- Test: `src/test/setup.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: a working `yarn test`. Every later task depends on it. Global `matchMedia` stub is available in all tests; override per-test with `vi.stubGlobal`.

- [ ] **Step 1: Install dev dependencies**

```bash
yarn add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Write the failing test**

Create `src/test/setup.test.js`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("test harness", () => {
    it("renders a React component and exposes jest-dom matchers", () => {
        render(<h1>hello</h1>);
        expect(screen.getByRole("heading", { name: "hello" })).toBeVisible();
    });

    it("exposes the __BUILD_VERSION__ define", () => {
        expect(typeof __BUILD_VERSION__).toBe("string");
    });

    it("stubs matchMedia", () => {
        expect(window.matchMedia("(min-width: 701px)").matches).toBe(true);
    });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `yarn test`
Expected: FAIL — no `test` script defined yet.

- [ ] **Step 4: Add the test scripts**

In `package.json` `scripts`, after `"lint:fix"`:

```json
"test": "vitest run",
"test:watch": "vitest",
```

- [ ] **Step 5: Configure Vitest**

In `vite.config.js`, add a `test` key to the `defineConfig` object, as a sibling of `define`. Keeping it in this file (rather than a separate `vitest.config.js`) is what makes `__BUILD_VERSION__` resolve in tests:

```js
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/test/setup.js",
        restoreMocks: true,
    },
```

- [ ] **Step 6: Write the setup file**

Create `src/test/setup.js`. The `matchMedia` stub is required — jsdom does not implement it, and `Hero`, `HeroRail`, `useTheme`, and `useCountUp` all call it. It defaults `matches` to `true` so the desktop layout is the default under test:

```js
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
    cleanup();
});

if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
}
```

- [ ] **Step 7: Teach ESLint about test files**

In `eslint.config.js`, add this object to the exported array, immediately before the final `rules` object:

```js
    {
        files: ["**/*.test.{js,jsx}", "src/test/**/*.{js,jsx}"],
        languageOptions: {
            globals: {
                describe: "readonly",
                it: "readonly",
                expect: "readonly",
                vi: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
            },
        },
    },
```

- [ ] **Step 8: Run tests and lint to verify both pass**

Run: `yarn test && yarn lint`
Expected: 3 tests PASS, lint clean.

- [ ] **Step 9: Commit**

```bash
git add package.json yarn.lock vite.config.js eslint.config.js src/test/
git commit -m "test: add vitest + testing-library harness"
```

---

### Task 2: Token layer

**Files:**
- Modify: `src/styles/global.css` (full rewrite)
- Test: `src/styles/global.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: the CSS custom properties every later task reads — `--bg`, `--card`, `--card2`, `--ink`, `--ink2`, `--ink3`, `--muted`, `--line`, `--chip`, `--chipInk`, `--accentInk`, `--accentSoft`, `--dark`, `--oss`, `--ossCard`; the fixed brand set `--blue`, `--navy`, `--teal`, `--tealInk`, `--purple`, `--purpleInk`, `--yellow`, `--yellowInk`, `--green`; and the keyframes `rise`, `reveal`, `marquee`, `float`, `blink`, `pulse`.

- [ ] **Step 1: Write the failing test**

This test parses the stylesheet as text. It is the only practical way to assert the double-declaration rule, which is invisible to jsdom's cascade.

Create `src/styles/global.test.js`:

```js
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const css = readFileSync(
    fileURLToPath(new URL("./global.css", import.meta.url)),
    "utf8"
);

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
    it.each(THEMED)("declares --%s twice, plain before light-dark()", (name) => {
        const plain = new RegExp(`--${name}:\\s*#[0-9A-Fa-f]{6};`);
        const themed = new RegExp(`--${name}:\\s*light-dark\\(`);
        expect(css).toMatch(plain);
        expect(css).toMatch(themed);
        expect(css.search(plain)).toBeLessThan(css.search(themed));
    });

    it("opts into both color schemes", () => {
        expect(css).toMatch(/color-scheme:\s*light dark/);
    });

    it("honours an explicit theme override on the root element", () => {
        expect(css).toMatch(/\[data-theme="light"\][\s\S]*?color-scheme:\s*light/);
        expect(css).toMatch(/\[data-theme="dark"\][\s\S]*?color-scheme:\s*dark/);
    });

    it("guards scroll-driven animation behind @supports", () => {
        expect(css).toMatch(/@supports \(animation-timeline: view\(\)\)/);
    });

    it("defines every keyframe the design uses", () => {
        for (const name of ["rise", "reveal", "marquee", "float", "blink", "pulse"]) {
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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/styles/global.test.js`
Expected: FAIL — the file still contains `oklch(` and `.reveal`.

- [ ] **Step 3: Rewrite the token block**

Replace the entire `:root { … }` block at the top of `src/styles/global.css` with:

```css
:root {
    color-scheme: light dark;

    /* Type */
    --font-sans: "Space Grotesk", system-ui, -apple-system, sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

    /* Themed surfaces — plain value first so browsers without
       light-dark() fall back to the light theme instead of nothing. */
    --bg: #e9e9ec;
    --bg: light-dark(#e9e9ec, #0e0e11);
    --card: #f7f7f8;
    --card: light-dark(#f7f7f8, #17171c);
    --card2: #ffffff;
    --card2: light-dark(#ffffff, #20202a);
    --ink: #111114;
    --ink: light-dark(#111114, #f1f1f3);
    --ink2: #44444b;
    --ink2: light-dark(#44444b, #c0c0c8);
    --ink3: #55555c;
    --ink3: light-dark(#55555c, #a2a2ab);
    --muted: #77777f;
    --muted: light-dark(#77777f, #8a8a93);
    --line: #e2e2e6;
    --line: light-dark(#e2e2e6, #2e2e36);
    --chip: #f1f1f3;
    --chip: light-dark(#f1f1f3, #2a2a33);
    --chipInk: #44444b;
    --chipInk: light-dark(#44444b, #d0d0d6);
    --accentInk: #3b6fd9;
    --accentInk: light-dark(#3b6fd9, #8fb0f5);
    --accentSoft: #eef3ff;
    --accentSoft: light-dark(#eef3ff, #1b2440);
    --dark: #111114;
    --dark: light-dark(#111114, #1c1c22);
    --oss: #111114;
    --oss: light-dark(#111114, #14141a);
    --ossCard: #1b1b20;
    --ossCard: light-dark(#1b1b20, #20202a);

    /* Fixed brand colours — identical in both themes. These sit on
       coloured cards where surface and ink are chosen as a pair. */
    --blue: #5b8def;
    --navy: #0f1f44;
    --teal: #a9dcd3;
    --tealInk: #1f3a36;
    --purple: #8b74d6;
    --purpleInk: #f0ebff;
    --yellow: #f7c55e;
    --yellowInk: #5a4410;
    --green: #2fb27a;

    /* Terminal ramp */
    --termBg: var(--dark);
    --termInk: #e7e7ea;
    --termKey: #9bb8f5;
    --termStr: #a9dcb8;
    --termNum: #f7c55e;

    /* Layout */
    --container: 1320px;
    --gutter: clamp(12px, 2vw, 20px);
    --gap: clamp(12px, 2vw, 20px);

    /* Radii */
    --r-section: 28px;
    --r-card: 22px;
    --r-tile: 20px;
    --r-link: 16px;
    --r-chip: 8px;
    --r-pill: 999px;
}

html[data-theme="light"] {
    color-scheme: light;
}

html[data-theme="dark"] {
    color-scheme: dark;
}
```

- [ ] **Step 4: Rewrite the reset and base type**

Replace everything below the `:root` block — the old reset, typography, section layout, utility classes, and `.reveal` — with:

```css
*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

html,
body {
    margin: 0;
    padding: 0;
    background: var(--bg);
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    overflow-x: hidden;
}

h1,
h2,
h3,
h4 {
    margin: 0;
    color: var(--ink);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.02;
}

p {
    margin: 0;
    color: var(--ink2);
}

a {
    color: inherit;
    text-decoration: none;
}

a:hover {
    color: var(--accentInk);
}

::selection {
    background: var(--accentSoft);
    color: var(--ink);
}

@keyframes rise {
    from {
        opacity: 0;
        transform: translateY(28px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: none;
    }
}

@keyframes reveal {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: none;
    }
}

@keyframes marquee {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-50%);
    }
}

@keyframes float {
    0%,
    100% {
        transform: translateY(0) rotate(-6deg);
    }
    50% {
        transform: translateY(-8px) rotate(4deg);
    }
}

@keyframes blink {
    0%,
    49% {
        opacity: 1;
    }
    50%,
    100% {
        opacity: 0;
    }
}

@keyframes pulse {
    0%,
    100% {
        box-shadow: 0 0 0 0 rgba(47, 178, 122, 0.5);
    }
    70% {
        box-shadow: 0 0 0 8px rgba(47, 178, 122, 0);
    }
}

/* Scroll-driven section reveal. Guarded so that browsers without
   animation-timeline render sections fully visible rather than
   holding them at opacity: 0 forever. */
@supports (animation-timeline: view()) {
    .sectionReveal {
        animation: reveal linear both;
        animation-timeline: view();
        animation-range: entry 0% entry 35%;
    }
}

@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
    }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/styles/global.test.js`
Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css src/styles/global.test.js
git commit -m "feat: replace oklch dark-only tokens with light-dark palette"
```

---

### Task 3: Document shell

**Files:**
- Modify: `index.html`
- Test: `index.test.js` (repo root)

**Interfaces:**
- Consumes: the `data-theme` contract from Task 2.
- Produces: `window.__setTheme(next)` — a global defined by the pre-paint script, reused by `useTheme` in Task 4 so the apply logic exists in exactly one place.

- [ ] **Step 1: Write the failing test**

Create `index.test.js` at the repo root:

```js
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const html = readFileSync(
    fileURLToPath(new URL("./index.html", import.meta.url)),
    "utf8"
);

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
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test index.test.js`
Expected: FAIL — Geist is still linked, `__setTheme` is absent.

- [ ] **Step 3: Swap the font link**

Replace the Geist `<link rel="stylesheet">` at `index.html:64-67` with:

```html
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
```

The two `preconnect` hints above it are already correct — leave them.

- [ ] **Step 4: Replace the single theme-color meta**

Replace `<meta name="theme-color" content="#0a0a0a" />` at `index.html:6` with:

```html
        <meta
            name="theme-color"
            content="#e9e9ec"
            media="(prefers-color-scheme: light)"
        />
        <meta
            name="theme-color"
            content="#0e0e11"
            media="(prefers-color-scheme: dark)"
        />
```

- [ ] **Step 5: Add the pre-paint theme script**

Insert as the **last element inside `<head>`**, after the stylesheet link. It must be a plain blocking `<script>` — a `defer` or `type="module"` script runs after first paint, which is exactly the flash this prevents:

```html
        <script>
            window.__setTheme = function (next) {
                var root = document.documentElement;
                if (next === "light" || next === "dark") {
                    root.setAttribute("data-theme", next);
                    try {
                        localStorage.setItem("theme", next);
                    } catch (e) {
                        /* private mode — fall through to auto */
                    }
                } else {
                    root.removeAttribute("data-theme");
                    try {
                        localStorage.removeItem("theme");
                    } catch (e) {
                        /* nothing to clear */
                    }
                }
            };
            try {
                var stored = localStorage.getItem("theme");
                if (stored) {
                    document.documentElement.setAttribute("data-theme", stored);
                }
            } catch (e) {
                /* private mode — stay on auto */
            }
        </script>
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `yarn test index.test.js`
Expected: all PASS.

- [ ] **Step 7: Commit**

```bash
git add index.html index.test.js
git commit -m "feat: swap fonts and add pre-paint theme application"
```

---

### Task 4: useTheme hook

**Files:**
- Create: `src/hooks/useTheme.js`
- Test: `src/hooks/useTheme.test.jsx`

**Interfaces:**
- Consumes: `window.__setTheme(next)` from Task 3.
- Produces: `useTheme() -> { theme, resolved, setTheme, toggle }`.
  - `theme` is `"light" | "dark" | null` — `null` means auto.
  - `resolved` is `"light" | "dark"`, never null: the theme actually in effect, falling back to the OS preference when `theme` is null.
  - `setTheme(next)` accepts `"light" | "dark" | null`.
  - `toggle()` switches to the opposite of `resolved`.

- [ ] **Step 1: Write the failing test**

Create `src/hooks/useTheme.test.jsx`:

```js
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useTheme } from "./useTheme";

function Probe() {
    const { theme, resolved, setTheme, toggle } = useTheme();
    return (
        <div>
            <span data-testid="theme">{theme ?? "auto"}</span>
            <span data-testid="resolved">{resolved}</span>
            <button onClick={toggle}>toggle</button>
            <button onClick={() => setTheme(null)}>auto</button>
        </div>
    );
}

function systemPrefersDark(isDark) {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes("dark") ? isDark : true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
}

beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    window.__setTheme = (next) => {
        if (next) {
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
        } else {
            document.documentElement.removeAttribute("data-theme");
            localStorage.removeItem("theme");
        }
    };
    systemPrefersDark(false);
});

describe("useTheme", () => {
    it("starts on auto when nothing is stored", () => {
        render(<Probe />);
        expect(screen.getByTestId("theme")).toHaveTextContent("auto");
    });

    it("resolves auto against the OS preference", () => {
        systemPrefersDark(true);
        render(<Probe />);
        expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    });

    it("adopts a previously stored choice", () => {
        localStorage.setItem("theme", "dark");
        render(<Probe />);
        expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    });

    it("toggles away from the resolved theme, not from null", () => {
        systemPrefersDark(true);
        render(<Probe />);
        act(() => screen.getByText("toggle").click());
        expect(screen.getByTestId("theme")).toHaveTextContent("light");
        expect(document.documentElement).toHaveAttribute("data-theme", "light");
    });

    it("persists the choice", () => {
        render(<Probe />);
        act(() => screen.getByText("toggle").click());
        expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("clears back to auto", () => {
        localStorage.setItem("theme", "dark");
        render(<Probe />);
        act(() => screen.getByText("auto").click());
        expect(screen.getByTestId("theme")).toHaveTextContent("auto");
        expect(document.documentElement).not.toHaveAttribute("data-theme");
        expect(localStorage.getItem("theme")).toBeNull();
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/hooks/useTheme.test.jsx`
Expected: FAIL — cannot resolve `./useTheme`.

- [ ] **Step 3: Implement the hook**

Create `src/hooks/useTheme.js`. Note it delegates the DOM write to `window.__setTheme` rather than reimplementing it, so the pre-paint script and the React path can never drift apart:

```js
import { useCallback, useState } from "react";

const STORAGE_KEY = "theme";

function readStored() {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        return value === "light" || value === "dark" ? value : null;
    } catch {
        return null;
    }
}

function systemTheme() {
    if (typeof window === "undefined" || !window.matchMedia) return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

export function useTheme() {
    const [theme, setThemeState] = useState(readStored);

    const setTheme = useCallback((next) => {
        const value = next === "light" || next === "dark" ? next : null;
        if (typeof window !== "undefined" && window.__setTheme) {
            window.__setTheme(value);
        }
        setThemeState(value);
    }, []);

    const resolved = theme ?? systemTheme();

    const toggle = useCallback(() => {
        setTheme(resolved === "dark" ? "light" : "dark");
    }, [resolved, setTheme]);

    return { theme, resolved, setTheme, toggle };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `yarn test src/hooks/useTheme.test.jsx`
Expected: 6 PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useTheme.js src/hooks/useTheme.test.jsx
git commit -m "feat: add useTheme hook"
```

---

### Task 5: ThemeToggle

**Files:**
- Create: `src/components/ThemeToggle/index.jsx`
- Create: `src/components/ThemeToggle/style.module.css`
- Test: `src/components/ThemeToggle/index.test.jsx`

**Interfaces:**
- Consumes: `useTheme()` from Task 4.
- Produces: `<ThemeToggle />`, default export. Mounted once in `App.jsx` (Task 22). Takes no props.

- [ ] **Step 1: Write the failing test**

Create `src/components/ThemeToggle/index.test.jsx`:

```js
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./index";

beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    window.__setTheme = vi.fn((next) => {
        if (next) document.documentElement.setAttribute("data-theme", next);
        else document.documentElement.removeAttribute("data-theme");
    });
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
});

describe("ThemeToggle", () => {
    it("is a button with an accessible name", () => {
        render(<ThemeToggle />);
        expect(
            screen.getByRole("button", { name: /switch to dark theme/i })
        ).toBeVisible();
    });

    it("announces the theme it will switch to", async () => {
        render(<ThemeToggle />);
        await userEvent.click(screen.getByRole("button"));
        expect(
            screen.getByRole("button", { name: /switch to light theme/i })
        ).toBeVisible();
    });

    it("applies the theme when clicked", async () => {
        render(<ThemeToggle />);
        await userEvent.click(screen.getByRole("button"));
        expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    });

    it("hides its decorative icon from assistive tech", () => {
        const { container } = render(<ThemeToggle />);
        expect(container.querySelector("svg")).toHaveAttribute(
            "aria-hidden",
            "true"
        );
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/ThemeToggle`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Implement the component**

Create `src/components/ThemeToggle/index.jsx`:

```jsx
import { useTheme } from "../../hooks/useTheme";
import styles from "./style.module.css";

export default function ThemeToggle() {
    const { resolved, toggle } = useTheme();
    const next = resolved === "dark" ? "light" : "dark";

    return (
        <button
            type="button"
            className={styles.toggle}
            onClick={toggle}
            aria-label={`Switch to ${next} theme`}
            title={`Switch to ${next} theme`}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            >
                {resolved === "dark" ? (
                    <>
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                    </>
                ) : (
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                )}
            </svg>
        </button>
    );
}
```

- [ ] **Step 4: Style it**

Create `src/components/ThemeToggle/style.module.css`. It is `position: fixed` because the design has no persistent navbar to host it:

```css
.toggle {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 50;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: 1px solid var(--line);
    border-radius: var(--r-pill);
    background: var(--card2);
    color: var(--ink2);
    cursor: pointer;
    transition:
        color 0.2s,
        border-color 0.2s,
        transform 0.2s;
}

.toggle:hover {
    color: var(--ink);
    border-color: var(--ink3);
    transform: translateY(-1px);
}

.toggle:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 2px;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/ThemeToggle`
Expected: 4 PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/ThemeToggle/
git commit -m "feat: add fixed theme toggle"
```

---

### Task 6: CornerMark primitive

**Files:**
- Create: `src/components/primitives/CornerMark/index.jsx`
- Create: `src/components/primitives/CornerMark/style.module.css`
- Test: `src/components/primitives/CornerMark/index.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `<CornerMark size={12} color="currentColor" opacity={0.6} />`, default export. Purely decorative — always `aria-hidden`.

- [ ] **Step 1: Write the failing test**

Create `src/components/primitives/CornerMark/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CornerMark from "./index";

describe("CornerMark", () => {
    it("is hidden from assistive tech", () => {
        const { container } = render(<CornerMark />);
        expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    });

    it("contributes no accessible text", () => {
        const { container } = render(<CornerMark />);
        expect(container).toHaveTextContent("");
    });

    it("applies size, colour and opacity as inline custom properties", () => {
        const { container } = render(
            <CornerMark size={18} color="#fff" opacity={0.4} />
        );
        expect(container.firstChild).toHaveStyle({
            width: "18px",
            height: "18px",
            opacity: "0.4",
        });
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/primitives/CornerMark`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Implement it**

Create `src/components/primitives/CornerMark/index.jsx`:

```jsx
import styles from "./style.module.css";

export default function CornerMark({
    size = 12,
    color = "currentColor",
    opacity = 0.6,
    className = "",
}) {
    return (
        <span
            aria-hidden="true"
            className={`${styles.mark} ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                borderColor: color,
                opacity,
            }}
        />
    );
}
```

- [ ] **Step 4: Style it**

Create `src/components/primitives/CornerMark/style.module.css`:

```css
.mark {
    position: absolute;
    top: 16px;
    right: 16px;
    display: block;
    border-top: 2px solid;
    border-right: 2px solid;
    pointer-events: none;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/primitives/CornerMark`
Expected: 3 PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/primitives/CornerMark/
git commit -m "feat: add CornerMark primitive"
```

---

### Task 7: Card primitive

**Files:**
- Create: `src/components/primitives/Card/index.jsx`
- Create: `src/components/primitives/Card/style.module.css`
- Test: `src/components/primitives/Card/index.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `<Card tone radius as id className style>`, default export.
  - `tone`: `"surface" | "raised" | "dark" | "oss" | "blue" | "teal" | "purple" | "yellow"` (default `"surface"`)
  - `radius`: `"section" | "card" | "tile" | "link"` (default `"card"`)
  - `as`: element or component to render (default `"div"`)
  - All other props spread onto the rendered element.

- [ ] **Step 1: Write the failing test**

Create `src/components/primitives/Card/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./index";

describe("Card", () => {
    it("renders its children", () => {
        render(<Card>contents</Card>);
        expect(screen.getByText("contents")).toBeVisible();
    });

    it("renders a div by default", () => {
        const { container } = render(<Card>x</Card>);
        expect(container.firstChild.tagName).toBe("DIV");
    });

    it("honours the `as` prop", () => {
        const { container } = render(<Card as="section">x</Card>);
        expect(container.firstChild.tagName).toBe("SECTION");
    });

    it("forwards arbitrary props to the element", () => {
        const { container } = render(
            <Card id="consulting" data-screen="Consulting">
                x
            </Card>
        );
        expect(container.firstChild).toHaveAttribute("id", "consulting");
        expect(container.firstChild).toHaveAttribute(
            "data-screen",
            "Consulting"
        );
    });

    it("keeps caller-supplied classes alongside its own", () => {
        const { container } = render(<Card className="sectionReveal">x</Card>);
        expect(container.firstChild.className).toMatch(/sectionReveal/);
    });

    it("renders an anchor with its href when asked", () => {
        render(
            <Card as="a" href="#consulting">
                go
            </Card>
        );
        expect(screen.getByRole("link", { name: "go" })).toHaveAttribute(
            "href",
            "#consulting"
        );
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/primitives/Card`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Implement it**

Create `src/components/primitives/Card/index.jsx`:

The radius class for `radius="card"` is named `card_` in CSS so it cannot
collide with the base `.card` class, so radius resolves through an explicit
map rather than `styles[radius]`:

```jsx
import styles from "./style.module.css";

const RADIUS = {
    section: styles.section,
    card: styles.card_,
    tile: styles.tile,
    link: styles.link,
};

export default function Card({
    tone = "surface",
    radius = "card",
    as: Tag = "div",
    className = "",
    children,
    ...rest
}) {
    const classes = [styles.card, styles[tone], RADIUS[radius], className]
        .filter(Boolean)
        .join(" ");

    return (
        <Tag className={classes} {...rest}>
            {children}
        </Tag>
    );
}
```

- [ ] **Step 4: Style it**

Create `src/components/primitives/Card/style.module.css`:

```css
.card {
    position: relative;
}

.section {
    border-radius: var(--r-section);
}
.card_ {
    border-radius: var(--r-card);
}
.tile {
    border-radius: var(--r-tile);
}
.link {
    border-radius: var(--r-link);
}

.surface {
    background: var(--card);
    color: var(--ink);
}

.raised {
    background: var(--card2);
    color: var(--ink);
    border: 1px solid var(--line);
}

.dark {
    background: var(--dark);
    color: #f1f1f3;
    border: 1px solid var(--line);
}

.oss {
    background: var(--ossCard);
    color: #f1f1f3;
    border: 1px solid var(--line);
}

.blue {
    background: var(--blue);
    color: #fff;
}

.teal {
    background: var(--teal);
    color: var(--tealInk);
}

.purple {
    background: var(--purple);
    color: var(--purpleInk);
}

.yellow {
    background: var(--yellow);
    color: var(--yellowInk);
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/primitives/Card`
Expected: 6 PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/primitives/Card/
git commit -m "feat: add Card primitive"
```

---

### Task 8: Chip primitive

**Files:**
- Create: `src/components/primitives/Chip/index.jsx`
- Create: `src/components/primitives/Chip/style.module.css`
- Test: `src/components/primitives/Chip/index.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `<Chip variant tone as dot>`, default export.
  - `variant`: `"mono"` (8px radius, mono type — stack tags) | `"pill"` (999px — status chips, role links). Default `"mono"`.
  - `tone`: `"default" | "outline" | "solid"`. Default `"default"`.
  - `dot`: optional colour string; renders a leading status dot when set.
  - `as` defaults to `"span"`; pass `"a"` for the hero role links.

- [ ] **Step 1: Write the failing test**

Create `src/components/primitives/Chip/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Chip from "./index";

describe("Chip", () => {
    it("renders its label", () => {
        render(<Chip>React</Chip>);
        expect(screen.getByText("React")).toBeVisible();
    });

    it("renders as a link when asked", () => {
        render(
            <Chip as="a" variant="pill" href="#skills">
                Applied AI
            </Chip>
        );
        expect(
            screen.getByRole("link", { name: "Applied AI" })
        ).toHaveAttribute("href", "#skills");
    });

    it("renders a decorative dot only when a colour is given", () => {
        const { container: without } = render(<Chip>Remote</Chip>);
        expect(without.querySelector("[data-dot]")).toBeNull();

        const { container: with_ } = render(<Chip dot="#2FB27A">Available</Chip>);
        const dot = with_.querySelector("[data-dot]");
        expect(dot).not.toBeNull();
        expect(dot).toHaveAttribute("aria-hidden", "true");
    });

    it("keeps the dot out of the accessible name", () => {
        render(<Chip dot="#2FB27A">Available Q3 2026</Chip>);
        expect(screen.getByText("Available Q3 2026")).toBeVisible();
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/primitives/Chip`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Implement it**

Create `src/components/primitives/Chip/index.jsx`:

```jsx
import styles from "./style.module.css";

export default function Chip({
    variant = "mono",
    tone = "default",
    as: Tag = "span",
    dot,
    className = "",
    children,
    ...rest
}) {
    const classes = [styles.chip, styles[variant], styles[tone], className]
        .filter(Boolean)
        .join(" ");

    return (
        <Tag className={classes} {...rest}>
            {dot ? (
                <span
                    data-dot=""
                    aria-hidden="true"
                    className={styles.dot}
                    style={{ background: dot }}
                />
            ) : null}
            {children}
        </Tag>
    );
}
```

- [ ] **Step 4: Style it**

Create `src/components/primitives/Chip/style.module.css`:

```css
.chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
}

.mono {
    padding: 5px 10px;
    border-radius: var(--r-chip);
    background: var(--chip);
    color: var(--chipInk);
    font-family: var(--font-mono);
    font-size: 11.5px;
}

.pill {
    padding: 8px 14px;
    border-radius: var(--r-pill);
    font-size: 13px;
    font-weight: 500;
}

.pill.default {
    background: var(--card2);
    border: 1px solid var(--line);
    color: var(--ink);
}

.pill.outline {
    background: transparent;
    border: 1px solid #3a3a42;
    color: #fff;
    transition:
        background 0.2s,
        color 0.2s,
        border-color 0.2s;
}

.pill.outline:hover {
    background: #fff;
    color: #111114;
    border-color: #fff;
}

.pill.solid {
    background: var(--ink);
    color: var(--bg);
    border: 1px solid transparent;
}

.dot {
    flex: 0 0 auto;
    width: 8px;
    height: 8px;
    border-radius: 50%;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/primitives/Chip`
Expected: 4 PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/primitives/Chip/
git commit -m "feat: add Chip primitive"
```

---

### Task 9: SectionHead primitive

**Files:**
- Create: `src/components/primitives/SectionHead/index.jsx`
- Create: `src/components/primitives/SectionHead/style.module.css`
- Test: `src/components/primitives/SectionHead/index.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `<SectionHead eyebrow title lede align accent />`, default export.
  - `align`: `"end"` (default, used by Experience/Open Source/Skills) | `"start"` (Consulting).
  - `accent`: optional colour for the eyebrow; defaults to `var(--accentInk)`. Open Source passes teal.
  - `size`: `"default"` (`clamp(30px, 3.6vw, 48px)` — Experience, Open Source, Skills) | `"display"` (`clamp(36px, 5vw, 72px)` — Consulting, per spec §6.3).
  - Always renders the title as an `<h2>`.

- [ ] **Step 1: Write the failing test**

Create `src/components/primitives/SectionHead/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionHead from "./index";

describe("SectionHead", () => {
    it("renders the title as a level-2 heading", () => {
        render(<SectionHead eyebrow="SKILLS" title="The stack" />);
        expect(
            screen.getByRole("heading", { level: 2, name: "The stack" })
        ).toBeVisible();
    });

    it("renders the eyebrow", () => {
        render(<SectionHead eyebrow="EXPERIENCE" title="A decade" />);
        expect(screen.getByText("EXPERIENCE")).toBeVisible();
    });

    it("renders the lede when supplied", () => {
        render(
            <SectionHead eyebrow="E" title="T" lede="From founding Run4Offers" />
        );
        expect(screen.getByText(/From founding Run4Offers/)).toBeVisible();
    });

    it("omits the lede element entirely when not supplied", () => {
        const { container } = render(<SectionHead eyebrow="E" title="T" />);
        expect(container.querySelectorAll("p")).toHaveLength(0);
    });

    it("accepts a display size for the consulting heading", () => {
        render(<SectionHead eyebrow="E" title="Engagements" size="display" />);
        expect(
            screen.getByRole("heading", { level: 2, name: "Engagements" })
        ).toBeVisible();
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/primitives/SectionHead`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Implement it**

Create `src/components/primitives/SectionHead/index.jsx`:

```jsx
import styles from "./style.module.css";

export default function SectionHead({
    eyebrow,
    title,
    lede,
    align = "end",
    size = "default",
    accent,
}) {
    return (
        <div className={`${styles.head} ${styles[align]}`}>
            <div>
                <div
                    className={styles.eyebrow}
                    style={accent ? { color: accent } : undefined}
                >
                    {eyebrow}
                </div>
                <h2 className={`${styles.title} ${styles[size]}`}>{title}</h2>
            </div>
            {lede ? <p className={styles.lede}>{lede}</p> : null}
        </div>
    );
}
```

- [ ] **Step 4: Style it**

Create `src/components/primitives/SectionHead/style.module.css`:

```css
.head {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.end {
    align-items: end;
}

.start {
    align-items: start;
}

.eyebrow {
    margin-bottom: 14px;
    color: var(--accentInk);
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.14em;
}

.title {
    margin: 0;
    line-height: 1.02;
    letter-spacing: -0.035em;
    font-weight: 700;
    text-wrap: balance;
}

.default {
    font-size: clamp(30px, 3.6vw, 48px);
}

.display {
    font-size: clamp(36px, 5vw, 72px);
    line-height: 0.98;
    letter-spacing: -0.04em;
}

.lede {
    margin: 0;
    color: var(--ink3);
    font-size: 17px;
    line-height: 1.55;
    text-wrap: pretty;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/primitives/SectionHead`
Expected: 4 PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/primitives/SectionHead/
git commit -m "feat: add SectionHead primitive"
```

---

### Task 10: useCountUp hook

**Files:**
- Create: `src/hooks/useCountUp.js`
- Test: `src/hooks/useCountUp.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `useCountUp(enabled) -> number` in the range 0..1 — an eased progress value, not a count. Callers multiply their own target by it. Returns `1` immediately when `enabled` is false or reduced motion is preferred, so final values always render.

Progress is the design's easing: `1 - (1 - p) ** 3` over 1600ms.

- [ ] **Step 1: Write the failing test**

Create `src/hooks/useCountUp.test.jsx`:

```js
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useCountUp } from "./useCountUp";

function Probe({ enabled = true }) {
    const p = useCountUp(enabled);
    return <span data-testid="p">{Math.round(10 * p)}</span>;
}

function prefersReducedMotion(reduced) {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes("reduced-motion") ? reduced : false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
}

beforeEach(() => {
    prefersReducedMotion(false);
});

describe("useCountUp", () => {
    it("settles at 1 once the animation completes", async () => {
        vi.useFakeTimers();
        render(<Probe />);
        await act(async () => {
            vi.advanceTimersByTime(2000);
        });
        expect(screen.getByTestId("p")).toHaveTextContent("10");
        vi.useRealTimers();
    });

    it("returns 1 immediately when disabled", () => {
        render(<Probe enabled={false} />);
        expect(screen.getByTestId("p")).toHaveTextContent("10");
    });

    it("returns 1 immediately under reduced motion", () => {
        prefersReducedMotion(true);
        render(<Probe />);
        expect(screen.getByTestId("p")).toHaveTextContent("10");
    });

    it("does not leave a frame scheduled after unmount", () => {
        const cancel = vi.spyOn(window, "cancelAnimationFrame");
        const { unmount } = render(<Probe />);
        unmount();
        expect(cancel).toHaveBeenCalled();
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/hooks/useCountUp.test.jsx`
Expected: FAIL — cannot resolve `./useCountUp`.

- [ ] **Step 3: Implement it**

Create `src/hooks/useCountUp.js`:

```js
import { useEffect, useState } from "react";

const DURATION = 1600;

function prefersReducedMotion() {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useCountUp(enabled = true) {
    const skip = !enabled || prefersReducedMotion();
    const [progress, setProgress] = useState(skip ? 1 : 0);

    useEffect(() => {
        if (skip) {
            setProgress(1);
            return undefined;
        }

        let frame = 0;
        const start = performance.now();

        const step = (now) => {
            const p = Math.min(1, (now - start) / DURATION);
            setProgress(1 - Math.pow(1 - p, 3));
            if (p < 1) frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [skip]);

    return progress;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `yarn test src/hooks/useCountUp.test.jsx`
Expected: 4 PASS.

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useCountUp.js src/hooks/useCountUp.test.jsx
git commit -m "feat: add useCountUp hook"
```

---

### Task 11: MetricTile primitive

**Files:**
- Create: `src/components/primitives/MetricTile/index.jsx`
- Create: `src/components/primitives/MetricTile/style.module.css`
- Test: `src/components/primitives/MetricTile/index.test.jsx`

**Interfaces:**
- Consumes: `Card` (Task 7), `CornerMark` (Task 6).
- Produces: `<MetricTile value label bg fg />`, default export. `value` is already-formatted text (`"10+ yrs"`, `"−60%"`) — the tile does no counting itself.

- [ ] **Step 1: Write the failing test**

Create `src/components/primitives/MetricTile/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MetricTile from "./index";

describe("MetricTile", () => {
    it("renders value and label", () => {
        render(<MetricTile value="10+ yrs" label="shipping to production" />);
        expect(screen.getByText("10+ yrs")).toBeVisible();
        expect(screen.getByText("shipping to production")).toBeVisible();
    });

    it("applies caller-supplied surface and ink colours", () => {
        const { container } = render(
            <MetricTile value="1" label="l" bg="#A9DCD3" fg="#111114" />
        );
        expect(container.firstChild).toHaveStyle({
            background: "#A9DCD3",
            color: "#111114",
        });
    });

    it("renders tabular numerals so counting does not reflow the tile", () => {
        render(<MetricTile value="~7M" label="events" />);
        expect(screen.getByText("~7M")).toHaveStyle({
            fontVariantNumeric: "tabular-nums",
        });
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/primitives/MetricTile`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Implement it**

Create `src/components/primitives/MetricTile/index.jsx`:

```jsx
import Card from "../Card";
import CornerMark from "../CornerMark";
import styles from "./style.module.css";

export default function MetricTile({ value, label, bg, fg }) {
    return (
        <Card
            radius="tile"
            className={styles.tile}
            style={{ background: bg, color: fg }}
        >
            <div className={styles.value}>{value}</div>
            <div className={styles.label}>{label}</div>
            <CornerMark size={10} opacity={0.6} className={styles.mark} />
        </Card>
    );
}
```

- [ ] **Step 4: Style it**

Create `src/components/primitives/MetricTile/style.module.css`:

```css
.tile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    min-height: 118px;
    padding: 18px 18px 16px;
    transition: transform 0.25s;
}

.tile:hover {
    transform: translateY(-3px);
}

.value {
    font-size: 34px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
}

.label {
    font-size: 13.5px;
    line-height: 1.3;
    opacity: 0.85;
}

.mark {
    top: 14px;
    right: 14px;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/primitives/MetricTile`
Expected: 3 PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/primitives/MetricTile/
git commit -m "feat: add MetricTile primitive"
```

---

### Task 12: HeroRail

**Files:**
- Create: `src/components/HeroRail/index.jsx`
- Create: `src/components/HeroRail/constants.js`
- Create: `src/components/HeroRail/style.module.css`
- Test: `src/components/HeroRail/index.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `<HeroRail />` (default export) and `NAV` from `./constants` — the five-entry array `Consulting, Experience, Open Source, Skills, Contact`, carried over from `src/components/Nav/constants.js` with `Consulting` prepended. `src/components/Nav/` is deleted in Task 26.

The rail is hidden below 700px **in CSS**, not by unmounting, so the anchors stay in the document for assistive tech and in-page linking.

- [ ] **Step 1: Write the failing test**

Create `src/components/HeroRail/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroRail from "./index";
import { NAV } from "./constants";

describe("HeroRail", () => {
    it("exposes a navigation landmark", () => {
        render(<HeroRail />);
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders every nav entry as an in-page anchor", () => {
        render(<HeroRail />);
        for (const item of NAV) {
            expect(
                screen.getByRole("link", { name: item.label })
            ).toHaveAttribute("href", `#${item.id}`);
        }
    });

    it("leads with Consulting", () => {
        expect(NAV[0]).toEqual({ label: "Consulting", id: "consulting" });
    });

    it("covers every home section", () => {
        expect(NAV.map((n) => n.id)).toEqual([
            "consulting",
            "experience",
            "open-source",
            "skills",
            "contact",
        ]);
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/HeroRail`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Write the constants**

Create `src/components/HeroRail/constants.js`:

```js
export const NAV = [
    { label: "Consulting", id: "consulting" },
    { label: "Experience", id: "experience" },
    { label: "Open Source", id: "open-source" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
];
```

- [ ] **Step 4: Implement the component**

Create `src/components/HeroRail/index.jsx`:

```jsx
import { NAV } from "./constants";
import styles from "./style.module.css";

export default function HeroRail() {
    return (
        <nav className={styles.rail} aria-label="Sections">
            {NAV.map((item) => (
                <a key={item.id} href={`#${item.id}`} className={styles.link}>
                    {item.label}
                </a>
            ))}
        </nav>
    );
}
```

- [ ] **Step 5: Style it**

Create `src/components/HeroRail/style.module.css`:

```css
.rail {
    display: flex;
    flex: 0 0 28px;
    flex-direction: column;
    justify-content: flex-start;
    gap: 36px;
    padding-top: 12px;
}

.link {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    color: var(--ink3);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    transition: color 0.2s;
}

.link:hover {
    color: var(--ink);
}

@media (max-width: 700px) {
    .rail {
        display: none;
    }
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `yarn test src/components/HeroRail`
Expected: 4 PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/HeroRail/
git commit -m "feat: add HeroRail vertical navigation"
```

---

### Task 13: Hero profile card

**Files:**
- Create: `src/components/Hero/ProfileCard.jsx`
- Create: `src/components/Hero/profileCard.module.css`
- Test: `src/components/Hero/ProfileCard.test.jsx`

**Interfaces:**
- Consumes: `Card` (Task 7).
- Produces: `<ProfileCard />`, default export, no props. Consumed by `Hero` in Task 15.

Colours here are the fixed brand set, not themed tokens — this card is blue in both themes.

- [ ] **Step 1: Write the failing test**

Create `src/components/Hero/ProfileCard.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfileCard from "./ProfileCard";

describe("Hero ProfileCard", () => {
    it("renders the name", () => {
        render(<ProfileCard />);
        expect(screen.getByText(/Manish/)).toBeVisible();
        expect(screen.getByText(/Bisht/)).toBeVisible();
    });

    it("shows the avatar with meaningful alt text", () => {
        render(<ProfileCard />);
        expect(screen.getByAltText("Manish Bisht")).toHaveAttribute(
            "src",
            "/logo.webp"
        );
    });

    it("links the primary email as a mailto", () => {
        render(<ProfileCard />);
        const email = screen.getByRole("link", { name: /hi@manishbisht\.me/ });
        expect(email.getAttribute("href")).toMatch(/^mailto:hi@manishbisht\.me/);
    });

    it("opens external profiles safely in a new tab", () => {
        render(<ProfileCard />);
        for (const name of ["Resume", "GitHub", "LinkedIn"]) {
            const link = screen.getByRole("link", { name: new RegExp(name) });
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
        }
    });

    it("states the role line", () => {
        render(<ProfileCard />);
        expect(screen.getByText("STAFF ENGINEER")).toBeVisible();
        expect(screen.getByText("VIDEOVERSE")).toBeVisible();
    });

    it("hides the floating badge from assistive tech", () => {
        render(<ProfileCard />);
        const badge = screen.getByText(/10 YRS/i).closest("[aria-hidden]");
        expect(badge).toHaveAttribute("aria-hidden", "true");
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/Hero/ProfileCard`
Expected: FAIL — cannot resolve `./ProfileCard`.

- [ ] **Step 3: Implement it**

Create `src/components/Hero/ProfileCard.jsx`:

```jsx
import Card from "../primitives/Card";
import styles from "./profileCard.module.css";

const MAIL = "mailto:hi@manishbisht.me?subject=Let%27s%20Work%20Together";

const LINKS = [
    { label: "Resume →", href: "https://resume.manishbisht.me", solid: true },
    { label: "GitHub ↗", href: "https://github.com/manishbisht" },
    { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/manishbisht02" },
];

export default function ProfileCard() {
    return (
        <Card tone="blue" radius="section" className={styles.card}>
            <div className={styles.about}>
                <span aria-hidden="true" className={styles.aboutDot} />
                About Me
            </div>

            <div className={styles.avatarWrap}>
                <div className={styles.avatarRing}>
                    <img
                        src="/logo.webp"
                        alt="Manish Bisht"
                        width="260"
                        height="260"
                        className={styles.avatar}
                    />
                </div>
            </div>

            <div className={styles.foot}>
                <div>
                    <div className={styles.im}>I&apos;m,</div>
                    <div className={styles.name}>
                        Manish
                        <br />
                        Bisht
                    </div>
                </div>

                <div className={styles.role}>
                    <span>STAFF ENGINEER</span>
                    <span aria-hidden="true">·</span>
                    <span>VIDEOVERSE</span>
                    <span aria-hidden="true">·</span>
                    <span>INDIA · IST</span>
                </div>

                <a href={MAIL} className={styles.email}>
                    hi@manishbisht.me <span aria-hidden="true">✉</span>
                </a>

                <div className={styles.ctas}>
                    {LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className={link.solid ? styles.ctaSolid : styles.ctaGhost}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>

            <div aria-hidden="true" className={styles.badge}>
                10 YRS
                <br />
                SHIPPING
            </div>
        </Card>
    );
}
```

- [ ] **Step 4: Style it**

Create `src/components/Hero/profileCard.module.css`. The asymmetric `border-top-left-radius` and the floating badge are the two signature details:

```css
.card {
    flex: 1 1 320px;
    display: flex;
    flex-direction: column;
    gap: clamp(18px, 3vw, 28px);
    padding: clamp(22px, 4vw, 36px) clamp(18px, 3.5vw, 32px)
        clamp(22px, 4vw, 32px);
    border-top-left-radius: 56px;
    color: #fff;
}

.about {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--navy);
    font-size: 14px;
    font-weight: 600;
}

.aboutDot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--navy);
}

.avatarWrap {
    display: flex;
    justify-content: center;
    padding: 4px 0;
}

.avatarRing {
    width: min(260px, 60vw);
    height: min(260px, 60vw);
    padding: 10px;
    border: 10px solid #7fa6f5;
    border-radius: 50%;
    background: #cfe0ff;
    box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.45);
}

.avatar {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.foot {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-top: auto;
}

.im {
    font-size: 34px;
    font-weight: 400;
    line-height: 1;
    opacity: 0.9;
}

.name {
    margin-top: 6px;
    font-size: clamp(40px, 10vw, 56px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
}

.role {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 10px;
    color: var(--navy);
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.04em;
}

.email {
    width: fit-content;
    padding-bottom: 6px;
    border-bottom: 1px dashed var(--navy);
    color: var(--navy);
    font-size: 15px;
    font-weight: 600;
}

.email:hover {
    color: #fff;
    border-bottom-color: #fff;
}

.ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.ctaSolid,
.ctaGhost {
    padding: 8px 14px;
    border-radius: var(--r-pill);
    font-size: 13px;
    font-weight: 600;
    transition: all 0.2s;
}

.ctaSolid {
    background: #fff;
    color: #111114;
}

.ctaGhost {
    border: 1px solid var(--navy);
    color: var(--navy);
}

.ctaSolid:hover,
.ctaGhost:hover {
    background: var(--navy);
    color: #fff;
}

.badge {
    position: absolute;
    right: 28px;
    bottom: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 88px;
    height: 88px;
    border: 3px solid #fff;
    border-radius: 50%;
    background: #111114;
    color: #fff;
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.3;
    letter-spacing: 0.06em;
    text-align: center;
    animation: float 5s ease-in-out infinite;
}

@media (max-width: 700px) {
    .badge {
        display: none;
    }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/Hero/ProfileCard`
Expected: 6 PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero/ProfileCard.jsx src/components/Hero/profileCard.module.css src/components/Hero/ProfileCard.test.jsx
git commit -m "feat: add hero profile card"
```

---

### Task 14: Hero terminal

**Files:**
- Create: `src/components/Hero/Terminal.jsx`
- Create: `src/components/Hero/terminal.module.css`
- Test: `src/components/Hero/Terminal.test.jsx`

**Interfaces:**
- Consumes: `Card` (Task 7).
- Produces: `<Terminal />`, default export. Reveals six lines on a timer — 600ms to the first, 800ms between the rest — matching the existing behaviour in the current `Hero`. Under reduced motion every line renders immediately.

The JSON payload gains two keys the current site does not have: `open_to` and `consulting`.

- [ ] **Step 1: Write the failing test**

Create `src/components/Hero/Terminal.test.jsx`:

```js
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Terminal from "./Terminal";

function prefersReducedMotion(reduced) {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes("reduced-motion") ? reduced : true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
}

beforeEach(() => {
    prefersReducedMotion(false);
});

describe("Hero Terminal", () => {
    it("starts with nothing typed", () => {
        vi.useFakeTimers();
        render(<Terminal />);
        expect(screen.queryByText(/whoami/)).toBeNull();
        vi.useRealTimers();
    });

    it("types every line out over time", async () => {
        vi.useFakeTimers();
        render(<Terminal />);
        await act(async () => {
            vi.advanceTimersByTime(6000);
        });
        expect(screen.getByText(/whoami/)).toBeVisible();
        expect(screen.getByText("manishbisht")).toBeVisible();
        expect(screen.getByText(/ship --target=production/)).toBeVisible();
        expect(screen.getByText(/deployed in 2\.9s/)).toBeVisible();
        vi.useRealTimers();
    });

    it("advertises the roles Manish is open to", async () => {
        vi.useFakeTimers();
        render(<Terminal />);
        await act(async () => {
            vi.advanceTimersByTime(6000);
        });
        expect(screen.getByText(/open_to/)).toBeVisible();
        expect(screen.getByText(/Applied AI/)).toBeVisible();
        vi.useRealTimers();
    });

    it("renders fully at once under reduced motion", () => {
        prefersReducedMotion(true);
        render(<Terminal />);
        expect(screen.getByText(/deployed in 2\.9s/)).toBeVisible();
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/Hero/Terminal`
Expected: FAIL — cannot resolve `./Terminal`.

- [ ] **Step 3: Implement it**

Create `src/components/Hero/Terminal.jsx`:

```jsx
import { useEffect, useState } from "react";
import Card from "../primitives/Card";
import styles from "./terminal.module.css";

const STEPS = 6;

function prefersReducedMotion() {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Key({ children }) {
    return <span className={styles.key}>&quot;{children}&quot;</span>;
}

function Str({ children }) {
    return <span className={styles.str}>&quot;{children}&quot;</span>;
}

export default function Terminal() {
    const instant = prefersReducedMotion();
    const [step, setStep] = useState(instant ? STEPS : 0);

    useEffect(() => {
        if (instant || step >= STEPS) return undefined;
        const id = setTimeout(
            () => setStep((s) => s + 1),
            step === 0 ? 600 : 800
        );
        return () => clearTimeout(id);
    }, [step, instant]);

    return (
        <Card tone="dark" radius="card" className={styles.term}>
            <div className={styles.bar}>
                <span className={`${styles.light} ${styles.red}`} />
                <span className={`${styles.light} ${styles.amber}`} />
                <span className={`${styles.light} ${styles.green}`} />
                <span className={styles.title}>~/manish — zsh</span>
            </div>

            {step >= 1 && (
                <div>
                    <span className={styles.prompt}>$</span> whoami
                </div>
            )}
            {step >= 2 && <div>manishbisht</div>}
            {step >= 3 && (
                <div className={styles.spaced}>
                    <span className={styles.prompt}>$</span> cat ~/profile.json
                </div>
            )}
            {step >= 4 && (
                <div>
                    {"{"}
                    <br />
                    &nbsp;&nbsp;<Key>role</Key>: <Str>Staff Engineer</Str>,
                    <br />
                    &nbsp;&nbsp;<Key>at</Key>: <Str>VideoVerse</Str>,
                    <br />
                    &nbsp;&nbsp;<Key>stack</Key>: [<Str>React</Str>,{" "}
                    <Str>TS</Str>, <Str>AWS</Str>],
                    <br />
                    &nbsp;&nbsp;<Key>open_to</Key>: [<Str>Applied AI</Str>,{" "}
                    <Str>Frontend</Str>, <Str>Backend</Str>],
                    <br />
                    &nbsp;&nbsp;<Key>consulting</Key>: {"{ "}
                    <Key>available</Key>: <Str>Q3 2026</Str>, <Key>clients</Key>
                    : <span className={styles.num}>2</span>, <Key>reply</Key>:{" "}
                    <Str>&lt;24h</Str> {"}"},
                    <br />
                    &nbsp;&nbsp;<Key>shipped_pct</Key>:{" "}
                    <span className={styles.num}>0.98</span>
                    <br />
                    {"}"}
                </div>
            )}
            {step >= 5 && (
                <div className={styles.spaced}>
                    <span className={styles.prompt}>$</span> ship
                    --target=production
                </div>
            )}
            {step >= 6 && (
                <div className={styles.ok}>✓ deployed in 2.9s · 0 rollbacks</div>
            )}
            <span aria-hidden="true" className={styles.caret} />
        </Card>
    );
}
```

- [ ] **Step 4: Style it**

Create `src/components/Hero/terminal.module.css`:

```css
.term {
    flex: 2 1 320px;
    min-height: 260px;
    padding: clamp(16px, 2.5vw, 22px) clamp(16px, 2.5vw, 24px);
    color: var(--termInk);
    font-family: var(--font-mono);
    font-size: clamp(12px, 1.4vw, 13.5px);
    line-height: 1.65;
    overflow: hidden;
    overflow-wrap: anywhere;
}

.bar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
}

.light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.red {
    background: #ff5f57;
}
.amber {
    background: #febc2e;
}
.green {
    background: #28c840;
}

.title {
    margin-left: auto;
    color: #8a8a93;
    font-size: 11px;
}

.prompt {
    color: var(--blue);
}

.key {
    color: var(--termKey);
}

.str {
    color: var(--termStr);
}

.num {
    color: var(--termNum);
}

.ok {
    color: var(--green);
}

.spaced {
    margin-top: 10px;
}

.caret {
    display: inline-block;
    width: 9px;
    height: 15px;
    vertical-align: -2px;
    background: var(--termInk);
    animation: blink 1s steps(1) infinite;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/Hero/Terminal`
Expected: 4 PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero/Terminal.jsx src/components/Hero/terminal.module.css src/components/Hero/Terminal.test.jsx
git commit -m "feat: add hero terminal with open_to payload"
```

---

### Task 15: Hero assembly

**Files:**
- Rewrite: `src/components/Hero/index.jsx`
- Rewrite: `src/components/Hero/style.module.css`
- Test: `src/components/Hero/index.test.jsx`

**Interfaces:**
- Consumes: `HeroRail` (12), `ProfileCard` (13), `Terminal` (14), `MetricTile` (11), `Chip` (8), `Card` (7), `CornerMark` (6), `useCountUp` (10).
- Produces: `<Hero />`, default export, no props. Rendered first by `pages/Home` (Task 22).

Metric values are derived by multiplying each target by the `useCountUp` progress, so they animate together and land on their final values.

- [ ] **Step 1: Write the failing test**

Create `src/components/Hero/index.test.jsx`:

```js
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Hero from "./index";

beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes("reduced-motion") ? true : true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
});

describe("Hero", () => {
    it("renders the headline as the page's h1", () => {
        render(<Hero />);
        const h1 = screen.getByRole("heading", { level: 1 });
        expect(h1).toHaveTextContent(/Engineering that starts with/);
        expect(h1).toHaveTextContent(/the customer/);
    });

    it("mentions applied AI in the lede", () => {
        render(<Hero />);
        expect(screen.getByText(/AI-assisted products and workflows/)).toBeVisible();
    });

    it("lands the metrics on their final values", async () => {
        render(<Hero />);
        await act(async () => {});
        expect(screen.getByText("10+ yrs")).toBeVisible();
        expect(screen.getByText("100+")).toBeVisible();
        expect(screen.getByText("~7M")).toBeVisible();
        expect(screen.getByText("−60%")).toBeVisible();
    });

    it("lists the four things Manish is open to", () => {
        render(<Hero />);
        for (const role of ["Applied AI", "Frontend", "Backend & platform", "Consulting"]) {
            expect(screen.getByRole("link", { name: role })).toBeVisible();
        }
    });

    it("links the availability banner to the consulting section", () => {
        render(<Hero />);
        const banner = screen.getByRole("link", {
            name: /Open to Applied AI, Frontend, and Backend roles/,
        });
        expect(banner).toHaveAttribute("href", "#consulting");
    });

    it("anchors itself at #top", () => {
        const { container } = render(<Hero />);
        expect(container.querySelector("#top")).not.toBeNull();
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/Hero/index`
Expected: FAIL — the old Hero has no metrics and no roles card.

- [ ] **Step 3: Implement it**

Replace `src/components/Hero/index.jsx` entirely:

```jsx
import Card from "../primitives/Card";
import Chip from "../primitives/Chip";
import CornerMark from "../primitives/CornerMark";
import MetricTile from "../primitives/MetricTile";
import HeroRail from "../HeroRail";
import ProfileCard from "./ProfileCard";
import Terminal from "./Terminal";
import { useCountUp } from "../../hooks/useCountUp";
import styles from "./style.module.css";

const ROLES = [
    { label: "Applied AI", href: "#skills" },
    { label: "Frontend", href: "#skills" },
    { label: "Backend & platform", href: "#skills" },
    { label: "Consulting", href: "#consulting" },
];

export default function Hero() {
    const p = useCountUp();
    const n = (x) => Math.round(x * p);

    const metrics = [
        {
            value: `${n(10)}+ yrs`,
            label: "shipping to production",
            bg: "var(--teal)",
            fg: "var(--tealInk)",
        },
        {
            value: `${n(100)}+`,
            label: "enterprise customers served",
            bg: "var(--purple)",
            fg: "#fff",
        },
        {
            value: `~${n(7)}M`,
            label: "events / month, event-driven",
            bg: "var(--yellow)",
            fg: "var(--yellowInk)",
        },
        {
            value: `−${n(60)}%`,
            label: "observability cost in 4 weeks",
            bg: "var(--card2)",
            fg: "var(--ink)",
        },
    ];

    return (
        <Card as="section" id="top" radius="section" className={styles.hero}>
            <HeroRail />

            <div className={styles.body}>
                <ProfileCard />

                <div className={styles.right}>
                    <h1 className={styles.title}>
                        Engineering that starts with{" "}
                        <span className={styles.accent}>the customer.</span>
                        <CornerMark
                            size={18}
                            color="var(--ink)"
                            opacity={1}
                            className={styles.titleMark}
                        />
                    </h1>

                    <p className={styles.lede}>
                        I work backwards from the customer problem, ship the
                        smallest thing that solves it, and build the engineering
                        rigour to make it last. A decade across frontend,
                        backend, and platform — now applying it to AI-assisted
                        products and workflows.
                    </p>

                    <div className={styles.row}>
                        <Terminal />
                        <div className={styles.metrics}>
                            {metrics.map((m) => (
                                <MetricTile key={m.label} {...m} />
                            ))}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <Card tone="dark" radius="card" className={styles.roles}>
                            <div className={styles.rolesLabel}>
                                OPEN TO ROLES IN
                            </div>
                            <div className={styles.rolesList}>
                                {ROLES.map((role) => (
                                    <Chip
                                        key={role.label}
                                        as="a"
                                        variant="pill"
                                        tone="outline"
                                        href={role.href}
                                    >
                                        {role.label}
                                    </Chip>
                                ))}
                            </div>
                            <a
                                href="mailto:hi@manishbisht.me?subject=Consulting%20engagement"
                                className={styles.talk}
                            >
                                Let&apos;s talk ↗
                            </a>
                            <CornerMark size={12} color="#fff" opacity={1} />
                        </Card>

                        <Card
                            as="a"
                            href="#consulting"
                            tone="yellow"
                            radius="card"
                            className={styles.banner}
                        >
                            <span aria-hidden="true" className={styles.pulse} />
                            <span className={styles.bannerText}>
                                <span className={styles.bannerTitle}>
                                    Open to Applied AI, Frontend, and Backend
                                    roles
                                </span>
                                <span className={styles.bannerSub}>
                                    Full-time or selective consulting · Q3 2026 ·
                                    reply in &lt; 24h · See engagements ↓
                                </span>
                            </span>
                            <CornerMark size={12} color="#111114" opacity={1} />
                        </Card>
                    </div>
                </div>
            </div>
        </Card>
    );
}
```

- [ ] **Step 4: Style it**

Replace `src/components/Hero/style.module.css` entirely:

```css
.hero {
    display: flex;
    gap: clamp(8px, 2vw, 24px);
    padding: clamp(16px, 3vw, 28px);
    box-shadow: 0 30px 80px -40px rgba(0, 0, 0, 0.25);
}

.body {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    gap: 24px;
    min-width: 0;
}

.right {
    display: flex;
    flex: 2 1 460px;
    flex-direction: column;
    gap: 22px;
    min-width: 0;
}

.title {
    position: relative;
    margin: 0;
    padding-right: 28px;
    font-size: clamp(40px, 6.2vw, 88px);
    font-weight: 700;
    line-height: 0.98;
    letter-spacing: -0.045em;
    text-wrap: balance;
}

.titleMark {
    top: 8px;
    right: 0;
    border-width: 4px;
}

.accent {
    color: var(--accentInk);
}

.lede {
    max-width: 640px;
    margin: 0;
    color: var(--ink2);
    font-size: 18px;
    line-height: 1.5;
    text-wrap: pretty;
}

.row {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(12px, 2vw, 20px);
}

.metrics {
    display: grid;
    flex: 1 1 240px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    min-width: 0;
}

.roles {
    display: flex;
    flex: 1 1 260px;
    flex-direction: column;
    gap: 14px;
    padding: 22px 24px;
    color: #fff;
}

.rolesLabel {
    color: #8a8a93;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.1em;
}

.rolesList {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.talk {
    align-self: flex-start;
    margin-top: auto;
    padding: 11px 18px;
    border-radius: var(--r-pill);
    background: var(--blue);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.2s;
}

.talk:hover {
    background: #fff;
    color: #111114;
}

.banner {
    display: flex;
    flex: 1.4 1 280px;
    align-items: center;
    gap: 18px;
    padding: 22px 24px;
    transition: background 0.2s;
}

.banner:hover {
    background: #f5b93a;
    color: #111114;
}

.pulse {
    flex: 0 0 auto;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--green);
    animation: pulse 2s infinite;
}

.bannerText {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.bannerTitle {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
}

.bannerSub {
    color: var(--yellowInk);
    font-size: 14px;
}

@media (max-width: 700px) {
    .metrics {
        flex-basis: 100%;
    }
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/Hero`
Expected: all Hero suites PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero/
git commit -m "feat: rebuild hero as bento layout"
```

---

### Task 16: Marquee

**Files:**
- Create: `src/components/Marquee/index.jsx`
- Create: `src/components/Marquee/constants.js`
- Create: `src/components/Marquee/style.module.css`
- Test: `src/components/Marquee/index.test.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `<Marquee />`, default export. Purely decorative: the whole strip is `aria-hidden`, so it must never carry information found nowhere else.

The list is rendered twice so the `-50%` translate loops seamlessly.

- [ ] **Step 1: Write the failing test**

Create `src/components/Marquee/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Marquee from "./index";
import { TICKER } from "./constants";

describe("Marquee", () => {
    it("is hidden from assistive tech", () => {
        const { container } = render(<Marquee />);
        expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    });

    it("duplicates the list so the loop is seamless", () => {
        render(<Marquee />);
        expect(screen.getAllByText(TICKER[0])).toHaveLength(2);
    });

    it("leads with the three role types", () => {
        expect(TICKER.slice(0, 3)).toEqual([
            "Applied AI",
            "Frontend",
            "Backend",
        ]);
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/Marquee`
Expected: FAIL — cannot resolve `./index`.

- [ ] **Step 3: Write the constants**

Create `src/components/Marquee/constants.js`:

```js
export const TICKER = [
    "Applied AI",
    "Frontend",
    "Backend",
    "Claude Code",
    "Agentic workflows",
    "VideoVerse",
    "BookMyShow",
    "Let's Dive",
    "Covalent Capital",
    "Google Summer of Code",
    "Facebook Open Source",
    "React",
    "TypeScript",
    "Node.js",
    "AWS",
    "GCP",
    "Terraform",
    "Playwright",
    "Datadog · Last9",
    "SNS/SQS",
    "Microservices",
    "Serverless",
];
```

- [ ] **Step 4: Implement it**

Create `src/components/Marquee/index.jsx`:

```jsx
import { TICKER } from "./constants";
import styles from "./style.module.css";

export default function Marquee() {
    const items = [...TICKER, ...TICKER];

    return (
        <div aria-hidden="true" className={styles.wrap}>
            <div className={styles.track}>
                {items.map((item, i) => (
                    <span key={`${item}-${i}`} className={styles.item}>
                        {item}
                        <span className={styles.dot} />
                    </span>
                ))}
            </div>
        </div>
    );
}
```

- [ ] **Step 5: Style it**

Create `src/components/Marquee/style.module.css`:

```css
.wrap {
    overflow: hidden;
    padding: 14px 0;
    border: 1px solid var(--line);
    border-radius: var(--r-pill);
    background: var(--dark);
    color: #f1f1f3;
    font-family: var(--font-mono);
    font-size: 13px;
    letter-spacing: 0.08em;
    white-space: nowrap;
}

.track {
    display: inline-flex;
    width: max-content;
    animation: marquee 40s linear infinite;
}

.item {
    display: inline-flex;
    align-items: center;
    gap: 22px;
    padding: 0 22px;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--blue);
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `yarn test src/components/Marquee`
Expected: 3 PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/Marquee/
git commit -m "feat: add marquee ticker"
```

---

### Task 17: Consulting section

**Files:**
- Rewrite: `src/components/Consulting/index.jsx`
- Rewrite: `src/components/Consulting/style.module.css`
- Keep unchanged: `src/components/Consulting/constants.js`
- Test: `src/components/Consulting/index.test.jsx`

**Interfaces:**
- Consumes: `SERVICES` from `./constants` (unchanged), `Card` (7), `Chip` (8), `SectionHead` (9), `CornerMark` (6).
- Produces: `<Consulting />`, default export, no props. Rendered by `pages/Home` (Task 22) — no longer by a route.

The four service cards cycle `dark, teal, purple, yellow` by index.

- [ ] **Step 1: Write the failing test**

Create `src/components/Consulting/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Consulting from "./index";
import { SERVICES } from "./constants";

describe("Consulting section", () => {
    it("anchors at #consulting so the hero banner can reach it", () => {
        const { container } = render(<Consulting />);
        expect(container.querySelector("#consulting")).not.toBeNull();
    });

    it("renders the heading", () => {
        render(<Consulting />);
        expect(
            screen.getByRole("heading", { level: 2, name: /Engagements/ })
        ).toBeVisible();
    });

    it("renders every service with its duration", () => {
        render(<Consulting />);
        for (const service of SERVICES) {
            expect(screen.getByText(service.title)).toBeVisible();
            expect(screen.getByText(service.duration)).toBeVisible();
        }
    });

    it("numbers the services from 01", () => {
        render(<Consulting />);
        expect(screen.getByText("01")).toBeVisible();
        expect(screen.getByText("04")).toBeVisible();
    });

    it("states availability and that full-time is open too", () => {
        render(<Consulting />);
        expect(screen.getByText(/Available Q3 2026/)).toBeVisible();
        expect(screen.getByText(/open to the right full-time role/)).toBeVisible();
    });

    it("offers a mailto call to action", () => {
        render(<Consulting />);
        const cta = screen.getByRole("link", { name: /Start a conversation/ });
        expect(cta.getAttribute("href")).toMatch(/^mailto:hi@manishbisht\.me/);
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/Consulting`
Expected: FAIL — the current component renders the old page layout.

- [ ] **Step 3: Implement it**

Replace `src/components/Consulting/index.jsx`:

```jsx
import Card from "../primitives/Card";
import Chip from "../primitives/Chip";
import CornerMark from "../primitives/CornerMark";
import SectionHead from "../primitives/SectionHead";
import { SERVICES } from "./constants";
import styles from "./style.module.css";

const TONES = ["dark", "teal", "purple", "yellow"];

const STATUS = [
    { label: "Available Q3 2026", dot: "var(--green)" },
    { label: "1–2 clients at a time", dot: "var(--muted)" },
    { label: "Remote · IST friendly", dot: "var(--muted)" },
];

export default function Consulting() {
    return (
        <Card
            as="section"
            id="consulting"
            radius="section"
            className={`${styles.section} sectionReveal`}
        >
            <div className={styles.head}>
                <div className={styles.headLeft}>
                    <SectionHead
                        eyebrow="ENGAGEMENTS"
                        title={
                            <>
                                Engagements,
                                <br />
                                not gigs.
                            </>
                        }
                        align="start"
                        size="display"
                    />
                    <div className={styles.status}>
                        {STATUS.map((s) => (
                            <Chip key={s.label} variant="pill" dot={s.dot}>
                                {s.label}
                            </Chip>
                        ))}
                    </div>
                </div>
                <div className={styles.copy}>
                    <p>
                        I take a small number of consulting engagements each year
                        — typically with seed–Series B startups that need senior
                        frontend architecture, backend and platform work,
                        applied-AI integration, or developer-productivity help.
                        Also open to the right full-time role.
                    </p>
                    <p>
                        Not a freelance marketplace. Not a code-monkey. I write
                        the RFC, work alongside your team, and leave you with
                        something that survives my departure.
                    </p>
                </div>
            </div>

            <div className={styles.grid}>
                {SERVICES.map((service, i) => (
                    <Card
                        key={service.title}
                        tone={TONES[i % TONES.length]}
                        radius="card"
                        className={styles.service}
                    >
                        <div className={styles.ord}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className={styles.serviceTitle}>{service.title}</div>
                        <p className={styles.serviceDesc}>{service.desc}</p>
                        <div className={styles.duration}>
                            TYPICAL DURATION<span>{service.duration}</span>
                        </div>
                        <CornerMark size={12} />
                    </Card>
                ))}
            </div>

            <Card tone="raised" radius="card" className={styles.cta}>
                <p>
                    Start with a short note describing the problem and a rough
                    timeline. I&apos;ll reply in &lt;24h with whether I&apos;m
                    the right fit — or who is, if I&apos;m not.
                </p>
                <a
                    href="mailto:hi@manishbisht.me?subject=Consulting%20engagement"
                    className={styles.ctaBtn}
                >
                    Start a conversation ↗
                </a>
            </Card>
        </Card>
    );
}
```

- [ ] **Step 4: Style it**

Replace `src/components/Consulting/style.module.css`:

```css
.section {
    display: flex;
    flex-direction: column;
    gap: 36px;
    padding: clamp(28px, 5vw, 48px) clamp(16px, 4vw, 48px);
}

.head {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    align-items: start;
}

.headLeft {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.status {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.copy {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding-top: 34px;
    color: var(--ink2);
    font-size: 17px;
    line-height: 1.55;
    text-wrap: pretty;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
}

.service {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 240px;
    padding: 26px 26px 22px;
    transition: transform 0.2s;
}

.service:hover {
    transform: translateY(-2px);
}

.ord {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.12em;
    opacity: 0.75;
}

.serviceTitle {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
}

.serviceDesc {
    margin: 0;
    color: inherit;
    font-size: 15px;
    line-height: 1.5;
    opacity: 0.85;
    text-wrap: pretty;
}

.duration {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid currentColor;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    opacity: 0.8;
}

.cta {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 24px 28px;
}

.cta p {
    max-width: 620px;
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
    text-wrap: pretty;
}

.ctaBtn {
    padding: 14px 22px;
    border-radius: var(--r-pill);
    background: var(--ink);
    color: var(--bg);
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
}

.ctaBtn:hover {
    background: var(--blue);
    color: #fff;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/Consulting`
Expected: 6 PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Consulting/
git commit -m "feat: turn consulting page into a home section"
```

---

### Task 18: Timeline

**Files:**
- Rewrite: `src/components/Timeline/index.jsx`
- Rewrite: `src/components/Timeline/style.module.css`
- Keep unchanged: `src/components/Timeline/constants.js`
- Test: `src/components/Timeline/index.test.jsx`

**Interfaces:**
- Consumes: `Card` (7), `Chip` (8), `SectionHead` (9); `TIMELINE` and `OPEN_SOURCE` from `./constants` (unchanged).
- Produces: `<Timeline id eyebrow title lede items variant />`, default export.
  - `variant`: `"default"` (Experience — light section, `card2` job cards, blue accents) | `"oss"` (Open Source — dark section, `ossCard` cards, teal accents). Default `"default"`.
  - Same prop shape as today plus `variant`, so `pages/Home` changes minimally.

The existing markdown-link parser (`[label](href)` with a `https?:`/`mailto:` allowlist) is preserved exactly — it is the only logic in this component and several bullets depend on it.

- [ ] **Step 1: Write the failing test**

Create `src/components/Timeline/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Timeline from "./index";
import { TIMELINE, OPEN_SOURCE } from "./constants";

describe("Timeline", () => {
    it("renders every role as an article", () => {
        const { container } = render(
            <Timeline id="experience" eyebrow="E" title="T" items={TIMELINE} />
        );
        expect(container.querySelectorAll("article")).toHaveLength(
            TIMELINE.length
        );
    });

    it("shows company, role, period and metric", () => {
        render(<Timeline id="experience" eyebrow="E" title="T" items={TIMELINE} />);
        expect(screen.getAllByText("VideoVerse")[0]).toBeVisible();
        expect(screen.getByText("Staff Engineer")).toBeVisible();
        expect(screen.getByText("January 2025 — Now")).toBeVisible();
        expect(screen.getByText("dev teams + QA team")).toBeVisible();
    });

    it("badges only the current role", () => {
        render(<Timeline id="experience" eyebrow="E" title="T" items={TIMELINE} />);
        expect(screen.getAllByText("NOW")).toHaveLength(1);
    });

    it("renders stack chips", () => {
        render(<Timeline id="experience" eyebrow="E" title="T" items={TIMELINE} />);
        expect(screen.getByText("SNS/SQS")).toBeVisible();
    });

    it("turns markdown links in bullets into anchors", () => {
        render(<Timeline id="oss" eyebrow="O" title="T" items={OPEN_SOURCE} />);
        const link = screen.getByRole("link", {
            name: /Pull requests: phpmyadmin/,
        });
        expect(link.getAttribute("href")).toMatch(/^https:\/\/github\.com/);
        expect(link).toHaveAttribute("target", "_blank");
    });

    it("renders mailto bullets without a target", () => {
        render(<Timeline id="experience" eyebrow="E" title="T" items={TIMELINE} />);
        const mail = screen.getAllByRole("link", {
            name: /manish\.bisht@magnifi\.ai/,
        })[0];
        expect(mail.getAttribute("href")).toMatch(/^mailto:/);
        expect(mail).not.toHaveAttribute("target");
    });

    it("uses the section id it is given", () => {
        const { container } = render(
            <Timeline id="open-source" eyebrow="O" title="T" items={OPEN_SOURCE} />
        );
        expect(container.querySelector("#open-source")).not.toBeNull();
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/Timeline`
Expected: FAIL — the current component renders a rail, not `article` elements, and has no `NOW` badge text.

- [ ] **Step 3: Implement it**

Replace `src/components/Timeline/index.jsx`:

```jsx
import Card from "../primitives/Card";
import Chip from "../primitives/Chip";
import SectionHead from "../primitives/SectionHead";
import styles from "./style.module.css";

const MARKDOWN_LINK_RE = /\[([^\]]+)]\(([^)\s]+)\)/g;

function isAllowedLink(href) {
    return /^(https?:\/\/|mailto:)/i.test(href);
}

function renderBullet(text) {
    const parts = [];
    let lastIndex = 0;

    for (const match of text.matchAll(MARKDOWN_LINK_RE)) {
        const [raw, label, href] = match;
        const index = match.index ?? 0;

        if (index > lastIndex) parts.push(text.slice(lastIndex, index));

        if (isAllowedLink(href)) {
            const external = !href.startsWith("mailto:");
            parts.push(
                <a
                    key={`${href}-${index}`}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className={styles.link}
                >
                    {label}
                </a>
            );
        } else {
            parts.push(raw);
        }

        lastIndex = index + raw.length;
    }

    if (lastIndex < text.length) parts.push(text.slice(lastIndex));

    return parts.length ? parts : text;
}

export default function Timeline({
    id,
    eyebrow,
    title,
    lede,
    items,
    variant = "default",
}) {
    const oss = variant === "oss";

    return (
        <Card
            as="section"
            id={id}
            tone={oss ? "dark" : "surface"}
            radius="section"
            className={`${styles.section} ${oss ? styles.oss : ""} sectionReveal`}
        >
            <SectionHead
                eyebrow={eyebrow}
                title={title}
                lede={lede}
                accent={oss ? "var(--teal)" : undefined}
            />

            <div className={oss ? styles.gridOss : styles.list}>
                {items.map((item) => (
                    <Card
                        key={`${item.company}-${item.role}-${item.period}`}
                        as="article"
                        tone={oss ? "oss" : "raised"}
                        radius="card"
                        className={styles.job}
                    >
                        <div className={styles.top}>
                            <div>
                                <div className={styles.company}>
                                    {item.company}
                                    {item.current && (
                                        <span className={styles.now}>NOW</span>
                                    )}
                                </div>
                                <div className={styles.role}>{item.role}</div>
                                {item.location && !oss && (
                                    <div className={styles.loc}>
                                        {item.location}
                                    </div>
                                )}
                            </div>
                            <div className={styles.right}>
                                <div className={styles.period}>
                                    {item.period}
                                </div>
                                <div className={styles.metric}>
                                    <span className={styles.delta}>
                                        {item.metric.delta}
                                    </span>
                                    <span className={styles.metricLabel}>
                                        {item.metric.label}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.stack}>
                            {item.stack.map((s) => (
                                <Chip key={s}>{s}</Chip>
                            ))}
                        </div>

                        <ul className={styles.bullets}>
                            {item.bullets.map((b, i) => (
                                <li key={i} className={styles.bullet}>
                                    <span aria-hidden="true" className={styles.arrow}>
                                        ↳
                                    </span>
                                    <span>{renderBullet(b)}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>
        </Card>
    );
}
```

- [ ] **Step 4: Style it**

Replace `src/components/Timeline/style.module.css`:

```css
.section {
    display: flex;
    flex-direction: column;
    gap: 36px;
    padding: clamp(28px, 5vw, 48px) clamp(16px, 4vw, 48px);
}

.oss {
    background: var(--oss);
    color: #f1f1f3;
}

.list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.gridOss {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 16px;
}

.job {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 26px 28px;
    transition:
        transform 0.2s,
        border-color 0.2s;
}

.job:hover {
    transform: translateY(-2px);
    border-color: var(--blue);
}

.oss .job:hover {
    border-color: var(--teal);
}

.top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px 24px;
}

.company {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
}

.now {
    padding: 4px 9px;
    border-radius: var(--r-pill);
    background: var(--green);
    color: #fff;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
}

.role {
    margin-top: 4px;
    color: var(--accentInk);
    font-size: 16px;
    font-weight: 500;
}

.oss .role {
    color: var(--teal);
}

.loc {
    margin-top: 2px;
    color: var(--muted);
    font-size: 14px;
}

.right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 6px;
    text-align: right;
}

.period {
    color: var(--ink3);
    font-family: var(--font-mono);
    font-size: 13px;
}

.oss .period {
    color: #9a9aa3;
}

.metric {
    display: inline-flex;
    align-items: baseline;
    gap: 8px;
    padding: 6px 14px;
    border-radius: var(--r-pill);
    background: var(--accentSoft);
}

.oss .metric {
    background: var(--teal);
    color: #111114;
}

.delta {
    color: var(--ink);
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
}

.oss .delta {
    color: #111114;
}

.metricLabel {
    color: var(--ink3);
    font-size: 13px;
}

.oss .metricLabel {
    color: var(--tealInk);
}

.stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.bullets {
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin: 0;
    padding: 0;
    list-style: none;
}

.bullet {
    display: flex;
    gap: 10px;
    color: var(--ink2);
    font-size: 15px;
    line-height: 1.55;
    text-wrap: pretty;
}

.oss .bullet {
    color: #d6d6dc;
}

.arrow {
    flex: 0 0 auto;
    color: var(--blue);
}

.oss .arrow {
    color: var(--teal);
}

.link {
    color: var(--accentInk);
    text-decoration: underline;
    text-underline-offset: 3px;
}

.oss .link {
    color: var(--teal);
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/Timeline`
Expected: 7 PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Timeline/
git commit -m "feat: rebuild timeline as cards with an oss variant"
```

---

### Task 19: Skills

**Files:**
- Rewrite: `src/components/Skills/index.jsx`
- Rewrite: `src/components/Skills/style.module.css`
- Modify: `src/components/Skills/constants.js` (reorder only)
- Test: `src/components/Skills/index.test.jsx`

**Interfaces:**
- Consumes: `Card` (7), `SectionHead` (9), `CornerMark` (6), `SKILLS` from `./constants`.
- Produces: `<Skills />`, default export, no props.

`SKILLS` is reordered so `AI-Assisted Engineering` is index 0. **Move the existing object; do not retype its items** — the five entries stay exactly as they are.

Palette cycles by index: `teal, raised, purple, raised, yellow, raised, dark, raised, blue`.

- [ ] **Step 1: Write the failing test**

Create `src/components/Skills/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Skills from "./index";
import { SKILLS } from "./constants";

describe("Skills", () => {
    it("leads with AI-Assisted Engineering", () => {
        expect(SKILLS[0].title).toBe("AI-Assisted Engineering");
    });

    it("still carries all nine clusters", () => {
        expect(SKILLS).toHaveLength(9);
    });

    it("kept the AI cluster's items intact", () => {
        expect(SKILLS[0].items).toEqual([
            "GitHub Copilot / Cursor / Codex",
            "Claude Code",
            "AI-Assisted Code Review",
            "Developer Workflows",
            "Agentic Engineering Systems",
        ]);
    });

    it("renders every cluster title and item", () => {
        render(<Skills />);
        for (const cluster of SKILLS) {
            expect(screen.getByText(cluster.title)).toBeVisible();
            for (const item of cluster.items) {
                expect(screen.getAllByText(item)[0]).toBeVisible();
            }
        }
    });

    it("numbers the clusters 01 through 09", () => {
        render(<Skills />);
        expect(screen.getByText("01")).toBeVisible();
        expect(screen.getByText("09")).toBeVisible();
    });

    it("anchors at #skills", () => {
        const { container } = render(<Skills />);
        expect(container.querySelector("#skills")).not.toBeNull();
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/Skills`
Expected: FAIL — `SKILLS[0].title` is currently `"Languages & Frameworks"`.

- [ ] **Step 3: Reorder the constants**

In `src/components/Skills/constants.js`, cut the entire `AI-Assisted Engineering` object from the end of the array and paste it as the first element. Change nothing else.

- [ ] **Step 4: Implement the component**

Replace `src/components/Skills/index.jsx`:

```jsx
import Card from "../primitives/Card";
import CornerMark from "../primitives/CornerMark";
import SectionHead from "../primitives/SectionHead";
import { SKILLS } from "./constants";
import styles from "./style.module.css";

const PALETTE = [
    "teal",
    "raised",
    "purple",
    "raised",
    "yellow",
    "raised",
    "dark",
    "raised",
    "blue",
];

export default function Skills() {
    return (
        <Card
            as="section"
            id="skills"
            radius="section"
            className={`${styles.section} sectionReveal`}
        >
            <SectionHead
                eyebrow="SKILLS"
                title="Applied AI, frontend, and backend — and the infra between."
            />

            <div className={styles.grid}>
                {SKILLS.map((cluster, i) => (
                    <Card
                        key={cluster.title}
                        tone={PALETTE[i % PALETTE.length]}
                        radius="card"
                        className={styles.cluster}
                    >
                        <div className={styles.ord}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className={styles.title}>{cluster.title}</div>
                        <ul className={styles.items}>
                            {cluster.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                        <CornerMark size={12} />
                    </Card>
                ))}
            </div>
        </Card>
    );
}
```

- [ ] **Step 5: Style it**

Replace `src/components/Skills/style.module.css`:

```css
.section {
    display: flex;
    flex-direction: column;
    gap: 36px;
    padding: clamp(28px, 5vw, 48px) clamp(16px, 4vw, 48px);
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
}

.cluster {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 24px 26px;
    transition: transform 0.2s;
}

.cluster:hover {
    transform: translateY(-2px);
}

.ord {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.12em;
    opacity: 0.7;
}

.title {
    font-size: 21px;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
}

.items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 14.5px;
    line-height: 1.4;
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `yarn test src/components/Skills`
Expected: 6 PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/Skills/
git commit -m "feat: rebuild skills as palette-cycled cards, AI cluster first"
```

---

### Task 20: Contact

**Files:**
- Rewrite: `src/components/Contact/index.jsx`
- Rewrite: `src/components/Contact/style.module.css`
- Create: `src/components/Contact/constants.js`
- Test: `src/components/Contact/index.test.jsx`

**Interfaces:**
- Consumes: `Card` (7).
- Produces: `<Contact />`, default export, and `LINKS` from `./constants`. The eleven-entry link list currently lives inline in `index.jsx`; move it to `constants.js` unchanged so it matches every other component in the repo.

- [ ] **Step 1: Write the failing test**

Create `src/components/Contact/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./index";
import { LINKS } from "./constants";

describe("Contact", () => {
    it("renders the heading", () => {
        render(<Contact />);
        expect(
            screen.getByRole("heading", { level: 2, name: /Let's Work/ })
        ).toBeVisible();
    });

    it("renders every contact link", () => {
        render(<Contact />);
        expect(screen.getAllByRole("link")).toHaveLength(LINKS.length);
    });

    it("opens external links in a new tab, but not mailto ones", () => {
        render(<Contact />);
        const email = screen.getByText("hi@manishbisht.me").closest("a");
        expect(email).not.toHaveAttribute("target");

        const github = screen.getByText("@manishbisht").closest("a");
        expect(github).toHaveAttribute("target", "_blank");
        expect(github).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    });

    it("anchors at #contact", () => {
        const { container } = render(<Contact />);
        expect(container.querySelector("#contact")).not.toBeNull();
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/Contact`
Expected: FAIL — cannot resolve `./constants`.

- [ ] **Step 3: Extract the constants**

Create `src/components/Contact/constants.js` and move the existing `LINKS` array there verbatim from `index.jsx`, adding the `export` keyword. Do not change any label, handle, href, or arrow.

- [ ] **Step 4: Implement the component**

Replace `src/components/Contact/index.jsx`:

```jsx
import Card from "../primitives/Card";
import { LINKS } from "./constants";
import styles from "./style.module.css";

export default function Contact() {
    return (
        <Card
            as="section"
            id="contact"
            tone="blue"
            radius="section"
            className={`${styles.section} sectionReveal`}
        >
            <div className={styles.eyebrow}>GET IN TOUCH</div>

            <h2 className={styles.big}>
                Let&apos;s Work
                <br />
                <span className={styles.accent}>Together ?</span>
            </h2>

            <div className={styles.grid}>
                {LINKS.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                        <a
                            key={`${link.label}-${link.href}`}
                            href={link.href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noreferrer" : undefined}
                            className={styles.tile}
                        >
                            <span className={styles.text}>
                                <span className={styles.label}>
                                    {link.label}
                                </span>
                                <span className={styles.handle}>
                                    {link.handle}
                                </span>
                            </span>
                            <span aria-hidden="true" className={styles.arrow}>
                                {link.arrow}
                            </span>
                        </a>
                    );
                })}
            </div>
        </Card>
    );
}
```

- [ ] **Step 5: Style it**

Replace `src/components/Contact/style.module.css`:

```css
.section {
    display: flex;
    flex-direction: column;
    gap: 36px;
    padding: clamp(28px, 5vw, 48px) clamp(16px, 4vw, 48px);
    color: #fff;
}

.eyebrow {
    color: var(--navy);
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.14em;
}

.big {
    margin: 0;
    color: #fff;
    font-size: clamp(48px, 8vw, 120px);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.045em;
}

.accent {
    color: var(--navy);
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    gap: 10px;
}

.tile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 16px 18px;
    border-radius: var(--r-link);
    background: var(--navy);
    color: #fff;
    transition:
        background 0.2s,
        color 0.2s;
}

.tile:hover {
    background: #fff;
    color: #111114;
}

.text {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.1em;
    opacity: 0.8;
}

.handle {
    margin-top: 4px;
    overflow: hidden;
    font-size: 15px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.arrow {
    font-size: 18px;
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `yarn test src/components/Contact`
Expected: 4 PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/Contact/
git commit -m "feat: rebuild contact as full-blue section"
```

---

### Task 21: Footer

**Files:**
- Rewrite: `src/components/Footer/index.jsx`
- Rewrite: `src/components/Footer/style.module.css`
- Test: `src/components/Footer/index.test.jsx`

**Interfaces:**
- Consumes: `BUILD_VERSION` and `COMMIT_SHA` from `src/config/env.js` (unchanged).
- Produces: `<Footer />`, default export, no props.

**Intentional deviation from the design** (spec §6.8): the design drops the build metadata; this plan keeps it in `--muted`, because it is how a deploy gets verified.

- [ ] **Step 1: Write the failing test**

Create `src/components/Footer/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./index";

describe("Footer", () => {
    it("is a contentinfo landmark", () => {
        render(<Footer />);
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("shows the brand", () => {
        render(<Footer />);
        expect(screen.getByText("Manish Bisht")).toBeVisible();
        expect(screen.getByAltText("")).toHaveAttribute("src", "/logo.webp");
    });

    it("shows the current year", () => {
        render(<Footer />);
        const year = String(new Date().getFullYear());
        expect(screen.getByText(new RegExp(year))).toBeVisible();
    });

    it("retains the build metadata", () => {
        render(<Footer />);
        expect(screen.getByText(/BUILD/)).toBeVisible();
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/components/Footer`
Expected: FAIL — the current footer has no `contentinfo`-compatible structure under the new markup and no combined year line.

- [ ] **Step 3: Implement it**

Replace `src/components/Footer/index.jsx`:

```jsx
import { BUILD_VERSION, COMMIT_SHA } from "../../config/env";
import styles from "./style.module.css";

export default function Footer() {
    return (
        <footer className={styles.wrap}>
            <div className={styles.brand}>
                <img
                    src="/logo.webp"
                    alt=""
                    width="28"
                    height="28"
                    loading="lazy"
                    decoding="async"
                    className={styles.logo}
                />
                Manish Bisht
            </div>

            <div className={styles.meta}>
                BUILD <span className={styles.hash}>{COMMIT_SHA}</span> · v
                {BUILD_VERSION}
            </div>

            <div className={styles.legal}>
                © {new Date().getFullYear()} · Made with ❤️ in India
            </div>
        </footer>
    );
}
```

- [ ] **Step 4: Style it**

Replace `src/components/Footer/style.module.css`:

```css
.wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    color: var(--ink3);
    font-size: 13px;
}

.brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--ink);
    font-weight: 600;
}

.logo {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
}

.meta {
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.06em;
}

.hash {
    color: var(--ink3);
}

.legal {
    font-family: var(--font-mono);
    font-size: 12px;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `yarn test src/components/Footer`
Expected: 4 PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer/
git commit -m "feat: simplify footer, retain build metadata"
```

---

### Task 22: App shell and home assembly

**Files:**
- Rewrite: `src/App.jsx`
- Rewrite: `src/App.module.css`
- Rewrite: `src/pages/Home/index.jsx`
- Test: `src/App.test.jsx`

**Interfaces:**
- Consumes: every component built so far.
- Produces: the routed application. `/consulting` no longer resolves.

`Contact` and `Footer` continue to render on every route, as today.

- [ ] **Step 1: Write the failing test**

Create `src/App.test.jsx`:

```js
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderAt(path) {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <App />
        </MemoryRouter>
    );
}

beforeEach(() => {
    localStorage.clear();
    window.__setTheme = vi.fn();
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
});

describe("App", () => {
    it("renders the home page at /", () => {
        renderAt("/");
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            /Engineering that starts with/
        );
    });

    it("mounts the theme toggle", () => {
        renderAt("/");
        expect(
            screen.getByRole("button", { name: /switch to .* theme/i })
        ).toBeVisible();
    });

    it("renders contact and footer on every route", () => {
        renderAt("/writing");
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("no longer routes /consulting to a page", () => {
        renderAt("/consulting");
        expect(
            screen.queryByRole("link", { name: /Back to portfolio/ })
        ).toBeNull();
    });
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `yarn test src/App.test.jsx`
Expected: FAIL — `/consulting` still resolves and there is no theme toggle.

- [ ] **Step 3: Rewrite the app shell**

Replace `src/App.jsx`. Note the removal of the `pageBg` element and the `/consulting` route:

```jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import styles from "./App.module.css";

const WritingPage = lazy(() => import("./pages/Writing"));
const ImpactPage = lazy(() => import("./pages/Impact"));
const WorkPage = lazy(() => import("./pages/Work"));
const TestimonialsPage = lazy(() => import("./pages/Testimonials"));

export default function App() {
    return (
        <>
            <ThemeToggle />
            <main className={styles.main}>
                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/writing" element={<WritingPage />} />
                        <Route path="/impact" element={<ImpactPage />} />
                        <Route path="/work" element={<WorkPage />} />
                        <Route
                            path="/testimonials"
                            element={<TestimonialsPage />}
                        />
                    </Routes>
                </Suspense>
                <Contact />
                <Footer />
            </main>
        </>
    );
}
```

- [ ] **Step 4: Rewrite the container styles**

Replace `src/App.module.css` entirely. Every halo and grid rule goes:

```css
.main {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    max-width: var(--container);
    margin: 0 auto;
    padding: var(--gutter) var(--gutter) 48px;
}
```

- [ ] **Step 5: Rewrite the home page**

Replace `src/pages/Home/index.jsx`:

```jsx
import Hero from "../../components/Hero";
import Marquee from "../../components/Marquee";
import Consulting from "../../components/Consulting";
import Timeline from "../../components/Timeline";
import { OPEN_SOURCE, TIMELINE } from "../../components/Timeline/constants";
import Skills from "../../components/Skills";

export default function Home() {
    return (
        <>
            <Hero />
            <Marquee />
            <Consulting />
            <Timeline
                id="experience"
                eyebrow="EXPERIENCE"
                title="A decade across product, platform, and engineering leadership."
                lede="From founding Run4Offers and early startup engineering to leading VideoVerse teams, with production work across media, ticketing, fintech, SaaS, and developer platforms."
                items={TIMELINE}
            />
            <Timeline
                id="open-source"
                eyebrow="OPEN SOURCE"
                title="Two summers in the open source."
                lede="Google Summer of Code 2017 on phpmyadmin core, then a 6-week Facebook Open Source mentorship in 2018 contributing to Facebook Instant Articles."
                items={OPEN_SOURCE}
                variant="oss"
            />
            <Skills />
        </>
    );
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `yarn test src/App.test.jsx`
Expected: 4 PASS.

- [ ] **Step 7: Commit**

```bash
git add src/App.jsx src/App.module.css src/App.test.jsx src/pages/Home/
git commit -m "feat: assemble bento home page, retire /consulting route"
```

---

### Task 23: PageShell and the four secondary pages

**Files:**
- Create: `src/components/primitives/PageShell/index.jsx`
- Create: `src/components/primitives/PageShell/style.module.css`
- Rewrite: `src/pages/{Work,Impact,Writing,Testimonials}/index.jsx`
- Delete: `src/pages/{Work,Impact,Writing,Testimonials}/style.module.css` (styling moves into `PageShell`)
- Rewrite: `src/components/{CaseStudies,Impact,Writing,Testimonials}/style.module.css`
- Test: `src/components/primitives/PageShell/index.test.jsx`
- Test: `src/pages/pages.test.jsx`

**Interfaces:**
- Consumes: `Card` (7), `SectionHead` (9).
- Produces: `<PageShell eyebrow title lede>{children}</PageShell>`, default export. Renders the `← Back to portfolio` link, the section card shell, and the head. All four pages become thin wrappers.

The four pages currently repeat the same back-link + eyebrow + title markup with four near-identical stylesheets. Collapsing that into `PageShell` is what stops them drifting apart.

- [ ] **Step 1: Write the failing test**

Create `src/components/primitives/PageShell/index.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageShell from "./index";

function renderShell(props = {}) {
    return render(
        <MemoryRouter>
            <PageShell eyebrow="WRITING" title="Things" {...props}>
                <p>body</p>
            </PageShell>
        </MemoryRouter>
    );
}

describe("PageShell", () => {
    it("always offers a way back to the portfolio", () => {
        renderShell();
        expect(
            screen.getByRole("link", { name: /Back to portfolio/ })
        ).toHaveAttribute("href", "/");
    });

    it("renders the title as an h2 and the eyebrow above it", () => {
        renderShell();
        expect(
            screen.getByRole("heading", { level: 2, name: "Things" })
        ).toBeVisible();
        expect(screen.getByText("WRITING")).toBeVisible();
    });

    it("renders its children", () => {
        renderShell();
        expect(screen.getByText("body")).toBeVisible();
    });
});
```

Create `src/pages/pages.test.jsx`:

```js
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WorkPage from "./Work";
import ImpactPage from "./Impact";
import WritingPage from "./Writing";
import TestimonialsPage from "./Testimonials";

const PAGES = [
    ["Work", WorkPage, /SELECTED WORK/],
    ["Impact", ImpactPage, /ENGINEERING IMPACT/],
    ["Writing", WritingPage, /WRITING/],
    ["Testimonials", TestimonialsPage, /TESTIMONIALS/],
];

describe.each(PAGES)("%s page", (_name, Page, eyebrow) => {
    it("renders its eyebrow", () => {
        render(
            <MemoryRouter>
                <Page />
            </MemoryRouter>
        );
        expect(screen.getByText(eyebrow)).toBeVisible();
    });

    it("offers a route back home", () => {
        render(
            <MemoryRouter>
                <Page />
            </MemoryRouter>
        );
        expect(
            screen.getByRole("link", { name: /Back to portfolio/ })
        ).toBeVisible();
    });
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `yarn test src/components/primitives/PageShell src/pages/pages.test.jsx`
Expected: FAIL — cannot resolve `PageShell`.

- [ ] **Step 3: Implement PageShell**

Create `src/components/primitives/PageShell/index.jsx`:

```jsx
import { Link } from "react-router-dom";
import Card from "../Card";
import SectionHead from "../SectionHead";
import styles from "./style.module.css";

export default function PageShell({ eyebrow, title, lede, children }) {
    return (
        <Card as="section" radius="section" className={styles.shell}>
            <Link to="/" className={styles.back}>
                <span aria-hidden="true">←</span> Back to portfolio
            </Link>
            <SectionHead eyebrow={eyebrow} title={title} lede={lede} />
            <div className={styles.body}>{children}</div>
        </Card>
    );
}
```

- [ ] **Step 4: Style it**

Create `src/components/primitives/PageShell/style.module.css`:

```css
.shell {
    display: flex;
    flex-direction: column;
    gap: 36px;
    padding: clamp(28px, 5vw, 48px) clamp(16px, 4vw, 48px);
}

.back {
    align-self: flex-start;
    color: var(--ink3);
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.08em;
}

.back:hover {
    color: var(--accentInk);
}

.body {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
}
```

- [ ] **Step 5: Rewrite each page**

Each page becomes a thin wrapper. `src/pages/Writing/index.jsx`:

```jsx
import PageShell from "../../components/primitives/PageShell";
import Writing from "../../components/Writing";

export default function WritingPage() {
    return (
        <PageShell
            eyebrow="WRITING"
            title="Things I've thought hard about."
            lede="Long-form notes on frontend platforms, performance, and engineering leadership."
        >
            <Writing />
        </PageShell>
    );
}
```

Repeat for the other three, preserving each page's existing eyebrow, title, and lede copy verbatim from the current `index.jsx` files:

- `Work` → eyebrow `SELECTED WORK`, component `CaseStudies`
- `Impact` → eyebrow `ENGINEERING IMPACT`, component `Impact`
- `Testimonials` → eyebrow `TESTIMONIALS`, component `Testimonials`

Delete each page's `style.module.css` — `PageShell` owns that styling now.

- [ ] **Step 6: Restyle the four content components**

In each of `CaseStudies`, `Impact`, `Writing`, `Testimonials`, replace the outer wrapper with `<Card tone="raised" radius="card">` and swap every colour reference to the new tokens (`--card2`, `--ink`, `--ink2`, `--line`, `--accentInk`, `--chip`). Remove any `oklch(` value, any `--bg-N` / `--fg-N` reference, and any `--radius-*` reference — none of those tokens exist any more.

- [ ] **Step 7: Run tests to verify they pass**

Run: `yarn test src/components/primitives/PageShell src/pages`
Expected: 3 + 8 PASS.

- [ ] **Step 8: Commit**

```bash
git add src/components/primitives/PageShell/ src/pages/ src/components/CaseStudies/ src/components/Impact/ src/components/Writing/ src/components/Testimonials/
git commit -m "feat: restyle secondary pages on shared PageShell"
```

---

### Task 24: Cleanup and full verification

**Files:**
- Delete: `src/pages/Consulting/`
- Delete: `src/components/Nav/`
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: everything.
- Produces: a clean tree with no dangling imports.

- [ ] **Step 1: Confirm nothing still imports the dead modules**

Run:

```bash
grep -rn "components/Nav\|pages/Consulting" src/ || echo "clean"
```

Expected: `clean`. If anything matches, fix the importer before deleting.

- [ ] **Step 2: Delete the retired modules**

```bash
git rm -r src/pages/Consulting src/components/Nav
```

- [ ] **Step 3: Update AGENTS.md**

In the "Hidden pages" table, delete the `/#/consulting` row. In the "Home page" table, add a `#consulting` row above `#experience`:

```markdown
| `#consulting`  | Consulting engagements and services offered                           |
```

Update the "Crawling guidance" bullet that says the nav exposes "the four home-page sections" to say **five**, and list Consulting first.

- [ ] **Step 4: Run the whole suite plus lint and build**

```bash
yarn test && yarn lint && yarn build
```

Expected: all tests PASS, lint clean, build succeeds.

- [ ] **Step 5: Verify in a browser**

Run `yarn dev`, then check each item from spec §10:

- Both themes at 375px, 700px, 1024px, 1440px.
- The rail and the floating badge disappear below 700px.
- Toggle persists across a reload with no flash of the wrong theme.
- With reduced motion enabled at the OS level: no marquee, no float, metrics show final values.
- `/#/work`, `/#/impact`, `/#/writing`, `/#/testimonials` render and link back home.
- `/#/consulting` no longer resolves to a page.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove retired nav and consulting page, refresh AGENTS.md"
```
