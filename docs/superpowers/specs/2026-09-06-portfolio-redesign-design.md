# Portfolio redesign — design spec

**Date:** 2026-09-06
**Source design:** Claude Design project `889a75da-c875-457d-b860-13b598ba0e0c`
("Manish Bisht portfolio redesign"), file `Manish Bisht Portfolio.dc.html`
**Target:** https://manishbisht.me (`manishbisht.github.io`)

## 1. Context

The site is a React 19 + Vite 8 SPA on GitHub Pages, routed with `HashRouter`,
styled with per-component CSS Modules over one global token sheet. The current
visual system is dark-only, built on oklch tokens, with hairline-separated
full-width sections.

The new design replaces that system wholesale: a light/dark palette built on
CSS `light-dark()`, a new type stack, and a "bento" layout where every section
is a rounded card stacked on a flat page background.

The content layer is almost entirely unaffected. The design's `portfolio-data.js`
was diffed against the repo's `src/components/*/constants.js`:

- `TIMELINE`, `OPEN_SOURCE`, `LINKS` — identical, no change
- `SKILLS` — same nine clusters and items, reordered only
- `NAV` — gains a `Consulting` entry
- Consulting's four services — identical to `components/Consulting/constants.js`

This is a presentation change, not a content change.

## 2. Decisions

| Decision | Choice |
|---|---|
| Secondary pages | Restyle `/work`, `/impact`, `/writing`, `/testimonials`. Retire `/consulting`. |
| Theme | Auto (follows OS) plus a user toggle, persisted. |
| Navigation | Follow the design exactly — vertical rail inside the hero, desktop-only. |
| Implementation | Rewrite components in place, keep CSS Modules, extract repeated primitives. |
| Theme toggle placement | Fixed to the viewport, top-right, on all routes and breakpoints. |
| Footer build metadata | Kept, against the design, as a quiet `--muted` element. |

### Rationale for the toggle placement

The design's only navigation is the hero's vertical rail: desktop-only above
700px, and it scrolls out of view with the hero. It is also absent from the four
secondary pages. A toggle placed "in the nav" would therefore be invisible on
mobile, gone after one scroll, and missing from four routes. A fixed viewport
control is the only placement that stays reachable without reintroducing the
persistent navbar the design deliberately removes.

## 3. Design system

### 3.1 Tokens

Replaces the oklch block in `src/styles/global.css`. Every token is declared
twice — a plain light value first, then the `light-dark()` pair:

```css
--bg: #E9E9EC;
--bg: light-dark(#E9E9EC, #0E0E11);
```

In a browser without `light-dark()` support the second declaration is invalid
and is discarded, leaving a working light theme. Without the first declaration
the variable would resolve to nothing and the page would render unstyled. This
is the single most important detail in the token layer.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#E9E9EC` | `#0E0E11` |
| `--card` | `#F7F7F8` | `#17171C` |
| `--card2` | `#FFFFFF` | `#20202A` |
| `--ink` | `#111114` | `#F1F1F3` |
| `--ink2` | `#44444B` | `#C0C0C8` |
| `--ink3` | `#55555C` | `#A2A2AB` |
| `--muted` | `#77777F` | `#8A8A93` |
| `--line` | `#E2E2E6` | `#2E2E36` |
| `--chip` | `#F1F1F3` | `#2A2A33` |
| `--chipInk` | `#44444B` | `#D0D0D6` |
| `--accentInk` | `#3B6FD9` | `#8FB0F5` |
| `--accentSoft` | `#EEF3FF` | `#1B2440` |
| `--dark` | `#111114` | `#1C1C22` |
| `--oss` | `#111114` | `#14141A` |
| `--ossCard` | `#1B1B20` | `#20202A` |

### 3.2 Fixed brand colors

These do not flip with theme. The design paints them on colored cards where
both the surface and its ink are chosen together, so flipping either would
break contrast.

| Name | Value | Paired ink |
|---|---|---|
| Blue | `#5B8DEF` | `#FFFFFF` / `#0F1F44` |
| Navy | `#0F1F44` | `#FFFFFF` |
| Teal | `#A9DCD3` | `#1F3A36` / `#111114` |
| Purple | `#8B74D6` | `#F0EBFF` / `#FFFFFF` |
| Yellow | `#F7C55E` | `#5A4410` / `#111114` |
| Green | `#2FB27A` | `#FFFFFF` |

Terminal ramp: surface `var(--dark)`, text `#E7E7EA`, prompt `#5B8DEF`,
JSON key `#9BB8F5`, string `#A9DCB8`, number `#F7C55E`, success `#2FB27A`,
window lights `#FF5F57` / `#FEBC2E` / `#28C840`, muted `#8A8A93`.

### 3.3 Typography

Space Grotesk (400/500/600/700) for UI and display; JetBrains Mono (400/500)
for eyebrows, periods, stack chips, and the terminal. Loaded from the Google
Fonts CDN, replacing the existing Geist link at `index.html:66`. The
`preconnect` hints already present are reused unchanged.

Display headings use tight negative tracking: `-.045em` on the hero `h1` and
the contact heading, `-.035em` on section `h2`, `-.02em` on card titles.

### 3.4 Theme mechanism

- `:root { color-scheme: light dark }` is the auto default.
- The toggle writes `data-theme="light" | "dark"` onto `<html>`.
- `html[data-theme="light"] { color-scheme: light }` and the dark equivalent
  override the auto default.
- Choice persists in `localStorage`; absence of a stored value means auto.
- A small blocking script in `index.html` applies the stored value **before
  first paint**. Without it a dark-preference visitor sees a white flash on
  every load.
- `<meta name="theme-color">` at `index.html:6` is currently hardcoded
  `#0a0a0a`. It becomes two tags with `media="(prefers-color-scheme: …)"`.

## 4. Primitives

New folders under `src/components/primitives/`, each `index.jsx` +
`style.module.css`, matching the existing per-component convention.

| Primitive | API | Used |
|---|---|---|
| `Card` | `tone`: `surface` \| `raised` \| `dark` \| `oss` \| `blue` \| `teal` \| `purple` \| `yellow`; `radius`: `28` \| `22` \| `20` \| `16`; `as` | ~30 places |
| `Chip` | `variant`: `mono` (8px radius) \| `pill` (999px); `tone` | Stack tags, status chips, role links |
| `SectionHead` | `eyebrow`, `title`, `lede`, `align` | Consulting, Experience, Open Source, Skills |
| `CornerMark` | `size`, `color`, `opacity` | ~12 places |
| `MetricTile` | `value`, `label`, `bg`, `fg` | Hero metrics grid |

Section shells use radius 28, inner cards 22, metric tiles 20, contact link
tiles 16.

## 5. Motion

Scroll-driven reveals use `animation-timeline: view()` with
`animation-range: entry 0% entry 35%`, wrapped in
`@supports (animation-timeline: view())`. Browsers without support (notably
Firefox) render sections **fully visible and unanimated**. This fallback is
mandatory: without it, unsupported browsers would hold every section at
`opacity: 0` and show a blank page.

All motion is additionally gated behind `@media (prefers-reduced-motion: reduce)`,
which disables the marquee scroll, the badge float, the rise-in entrances, and
the metric count-up (final values render immediately).

Named keyframes carried over from the design: `rise`, `reveal`, `marquee`,
`float`, `blink`, `pulse`.

Two pieces of scripted motion:

- **Terminal typing** — reuses the existing step timer in `Hero/index.jsx`
  (600ms to first line, 800ms between), extended to the new JSON payload which
  adds `open_to` and `consulting` keys.
- **Metric count-up** — a `useCountUp` hook: `requestAnimationFrame`, cubic
  ease-out (`1 - (1-p)^3`), 1600ms duration.

## 6. Home page

Container: `max-width: 1320px`, `padding: clamp(12px,2vw,20px)`, sections
stacked in a flex column with `gap: clamp(12px,2vw,20px)`.

The `desktop` breakpoint is **700px**, matching the design's media query. It
controls the hero rail and the floating badge.

### 6.1 Hero

Card shell (radius 28, `--card`, `box-shadow: 0 30px 80px -40px rgba(0,0,0,.25)`)
containing three columns:

1. **Vertical rail** (desktop only) — five links, `writing-mode: vertical-rl`
   with `rotate(180deg)`, 13px/500, `--ink3`, hover `--ink`.
2. **Profile card** — `#5B8DEF`, radius 28 with `border-top-left-radius: 56px`.
   Contains an "About Me" dot label in `#0F1F44`; a circular avatar
   (`min(260px,60vw)`, `#CFE0FF` fill, 10px padding, 10px `#7FA6F5` border);
   the wordmark "I'm," (34px/400) over "Manish Bisht"
   (`clamp(40px,10vw,56px)`/700); a mono role line; a dashed-underline email
   link; and three pill CTAs (Resume, GitHub, LinkedIn). A floating
   `10 YRS SHIPPING` badge (88px circle, `#111114`, 3px white border,
   `float 5s` animation) sits bottom-right, desktop only.
3. **Right column** — `h1` `clamp(40px,6.2vw,88px)` with `line-height: .98`
   and a `CornerMark` at top-right; lede at 18px `--ink2`; then a row holding
   the terminal (`flex: 2 1 320px`, min-height 260px) beside a 2x2 metrics grid
   (`flex: 1 1 240px`); then a row holding the "OPEN TO ROLES IN" dark card
   (four pill links) beside the yellow availability banner.

Metrics: `10+ yrs` / shipping to production (teal), `100+` / enterprise
customers served (purple), `~7M` / events per month (yellow), `−60%` /
observability cost in 4 weeks (`--card2`).

Availability banner: `#F7C55E`, pulsing green dot, "Open to Applied AI,
Frontend, and Backend roles" with a sub-line in `#5A4410`; links to
`#consulting`.

Below 700px: rail and badge hidden, columns stack single-column.

### 6.2 Marquee

New component. Full-width pill (radius 999), `var(--dark)`, 14px vertical
padding, mono 13px, `letter-spacing: .08em`. Twenty-two ticker items are
duplicated to produce a seamless `marquee 40s linear infinite` translating to
`-50%`. Blue 6px dot separators. `aria-hidden="true"` — decorative only.

### 6.3 Consulting

Promoted from the retired route. Two-column head: eyebrow, "Engagements, not
gigs." at `clamp(36px,5vw,72px)`, three status pills (Available Q3 2026 with a
green dot, 1–2 clients at a time, Remote · IST friendly) beside two paragraphs
in `--ink2`.

Four service cards in `repeat(auto-fit, minmax(240px,1fr))`, colored dark /
teal / purple / yellow, each with a mono ordinal, title, blurb, and a
`TYPICAL DURATION` footer above a hairline, plus a `CornerMark`. Content comes
from `components/Consulting/constants.js`, unchanged.

Closing CTA strip on `--card2`: a paragraph and a "Start a conversation"
button that inverts to blue on hover.

### 6.4 Experience

`SectionHead` (eyebrow, "A decade across product, platform, and engineering
leadership.", lede) over seven cards on `--card2`, radius 22, hovering to
`translateY(-2px)` with border `#5B8DEF`.

Each card: company name (24px/700) with an optional green `NOW` badge; role in
`--accentInk`; location in `--muted`; period in mono; a metric pill on
`--accentSoft`; mono stack chips; and `↳` bullets in `--ink2`.

Bullets keep the existing markdown-link parser from `Timeline/index.jsx`
(`[label](href)`), including its `mailto:`/`https:` allowlist.

### 6.5 Open Source

Dark section on `--oss` with a `--line` border and teal (`#A9DCD3`) accents.
Two cards on `--ossCard` in `repeat(auto-fit, minmax(320px,1fr))`. Metric pill
is solid teal on `#111114`. Stack chips `#26262D` / `#C9C9CF`.

### 6.6 Skills

`SectionHead` with "Applied AI, frontend, and backend — and the infra between."
Nine cards in `repeat(auto-fill, minmax(260px,1fr))`, radius 22, cycling this
palette by index:

```
[teal, card2, purple, card2, yellow, card2, dark, card2, blue]
```

Each card carries a mono ordinal (`01`–`09`), a 21px title, its items as a
plain list, and a `CornerMark`.

Requires reordering `SKILLS` in `components/Skills/constants.js` so
`AI-Assisted Engineering` moves from last to index 0. Items are unchanged.

### 6.7 Contact

Full-bleed `#5B8DEF` section. Eyebrow in `#0F1F44`. Heading "Let's Work /
Together ?" at `clamp(48px,8vw,120px)`, `line-height: .95`, second line in
`#0F1F44`. Eleven link tiles in `repeat(auto-fill, minmax(230px,1fr))`, radius
16, `#0F1F44` inverting to white-on-dark-ink on hover. Handles truncate with
ellipsis. Content from the existing `Contact` link list.

### 6.8 Footer

Logo (28px circle) + name on the left; `© <year> · Made with ❤️ in India` in
mono on the right.

**Deviation from the design, intentional:** the existing
`BUILD <sha> · v<version>` line is retained as a third element in `--muted`.
It is functional rather than decorative — it is how a deploy is verified — and
the design's omission is not a reason to lose it.

## 7. Secondary pages

`/work`, `/impact`, `/writing`, `/testimonials` are rebuilt as bento cards
using the same primitives and tokens. Their existing constants
(`CASE_STUDIES`, `IMPACT`, `WRITING`, `TESTIMONIALS`) are unchanged. Each keeps
its `← Back to portfolio` link, which is the only navigation on these routes
now that there is no persistent navbar.

The `/consulting` **route** is removed: the `<Route>` entry and
`src/pages/Consulting/`. The **component** is not deleted —
`src/components/Consulting/` is rewritten in place to render the new home
section, keeping its `constants.js` untouched and rebuilding `index.jsx` and
`style.module.css`. It moves from being rendered by a page to being rendered by
`pages/Home`.

`App.jsx` also drops the fixed `pageBg` layer (dot grid plus two blurred
halos). The design uses a flat background, and the halos are tuned for a dark
canvas — they would wash out in light mode.

`Contact` and `Footer` continue to render on every route, as they do today.

## 8. File plan

**New**

```
src/components/primitives/{Card,Chip,SectionHead,CornerMark,MetricTile}/
src/components/Marquee/
src/components/ThemeToggle/
src/components/HeroRail/
src/hooks/useCountUp.js
src/hooks/useTheme.js
```

**Rewritten**

```
index.html                       fonts, theme-color, pre-paint theme script
src/styles/global.css            token layer, reset, type, keyframes
src/App.jsx                      drop pageBg + /consulting route, add ThemeToggle
src/App.module.css               container widths, drop halo/grid
src/components/Hero/             full rebuild
src/components/Timeline/         card layout replaces rail
src/components/Skills/           palette-cycled cards
src/components/Contact/          blue section
src/components/Footer/           simplified + retained build meta
src/components/Skills/constants.js   reorder only
src/components/Consulting/       page component becomes a home section
src/pages/{Work,Impact,Writing,Testimonials}/ + their components
```

**Deleted**

```
src/pages/Consulting/             route retired
src/components/Nav/               replaced by HeroRail; NAV moves to
                                  HeroRail/constants.js with the Consulting
                                  entry added
.reveal rules in global.css       dead code, never imported
```

## 9. Out of scope

- Content rewrites beyond the `SKILLS` reorder and the `NAV` addition.
- `logo.webp` — the design's copy is byte-identical to `public/logo.webp`.
- `support.js` — the Claude Design runtime (`x-dc`, `sc-for`, `sc-if`,
  `DCLogic`, `style-hover`, `{{ }}`). React provides all of it natively; it is
  not ported.
- `AGENTS.md` — no structural claims change except the removal of
  `/#/consulting` from its hidden-pages table.

## 10. Verification

- `yarn lint` and `yarn build` clean.
- Both themes checked at 375px, 700px (the rail/badge boundary), 1024px, and
  1440px.
- Toggle persists across reload with no flash of the wrong theme.
- Reduced-motion: no marquee, no float, no count-up; final values present.
- Every route renders, `/consulting` is gone, and the four restyled pages keep
  a working back link.
