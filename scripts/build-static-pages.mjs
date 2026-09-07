/**
 * Emits a crawlable HTML file per secondary page into public/.
 *
 * The app routes with HashRouter, so /#/work and friends collapse to the
 * origin for a search engine — a fragment is never a separate URL. Rather
 * than change the routing, this writes a real page at /work/ (and so on)
 * that GitHub Pages serves directly. Humans keep using the SPA; crawlers and
 * AI agents get something indexable that needs no JavaScript.
 *
 * Content is imported from the same constants the React components use, so
 * the static copies cannot drift from the app.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { CASE_STUDIES } from "../src/components/CaseStudies/constants.js";
import { IMPACT } from "../src/components/Impact/constants.js";
import { WRITING } from "../src/components/Writing/constants.js";
import { TESTIMONIALS } from "../src/components/Testimonials/constants.js";

const ORIGIN = "https://manishbisht.me";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const esc = (s) =>
    String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const layout = ({ slug, eyebrow, title, lede, body }) => `<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${esc(title)} — Manish Bisht</title>
        <meta name="description" content="${esc(lede)}" />
        <link rel="canonical" href="${ORIGIN}/${slug}/" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="${esc(title)} — Manish Bisht" />
        <meta property="og:description" content="${esc(lede)}" />
        <meta property="og:url" content="${ORIGIN}/${slug}/" />
        <meta property="og:image" content="${ORIGIN}/logo.webp" />
        <meta name="twitter:card" content="summary" />
        <link rel="icon" href="/favicon-images/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
        <style>
            :root {
                color-scheme: light dark;
                --bg: light-dark(#e9e9ec, #0e0e11);
                --card: light-dark(#ffffff, #17171c);
                --ink: light-dark(#111114, #f1f1f3);
                --ink2: light-dark(#44444b, #c0c0c8);
                --ink3: light-dark(#55555c, #a2a2ab);
                --line: light-dark(#dcdce2, #2a2a33);
                --blue: light-dark(#3b6fd9, #8fb0f5);
            }
            * { box-sizing: border-box; }
            body {
                margin: 0;
                padding: clamp(16px, 4vw, 48px);
                background: var(--bg);
                color: var(--ink);
                font-family: "Space Grotesk", system-ui, sans-serif;
                line-height: 1.6;
            }
            main { max-width: 820px; margin: 0 auto; }
            .shell {
                padding: clamp(24px, 5vw, 48px);
                border: 1px solid var(--line);
                border-radius: 28px;
                background: var(--card);
            }
            .back { color: var(--blue); font-size: 14px; text-decoration: none; }
            .back:hover { text-decoration: underline; }
            .eyebrow {
                margin-top: 28px;
                color: var(--blue);
                font-family: "JetBrains Mono", ui-monospace, monospace;
                font-size: 12px;
                letter-spacing: 0.12em;
            }
            h1 { margin: 8px 0 12px; font-size: clamp(28px, 5vw, 44px); line-height: 1.1; }
            .lede { max-width: 60ch; color: var(--ink2); }
            article {
                margin-top: 28px;
                padding-top: 24px;
                border-top: 1px solid var(--line);
            }
            h2 { margin: 0 0 6px; font-size: 21px; }
            .meta {
                color: var(--ink3);
                font-family: "JetBrains Mono", ui-monospace, monospace;
                font-size: 12px;
            }
            blockquote { margin: 0 0 8px; color: var(--ink); font-size: 18px; }
            ul { margin: 8px 0 0; padding-left: 18px; color: var(--ink2); }
            .tags { margin-top: 8px; color: var(--ink3); font-size: 13px; }
        </style>
    </head>
    <body>
        <main>
            <div class="shell">
                <a class="back" href="/">← Back to portfolio</a>
                <div class="eyebrow">${esc(eyebrow)}</div>
                <h1>${esc(title)}</h1>
                <p class="lede">${esc(lede)}</p>
${body}
            </div>
        </main>
    </body>
</html>
`;

const pages = [
    {
        slug: "work",
        eyebrow: "SELECTED WORK",
        title: "Architecture, performance, and shipping at scale.",
        lede: "Engagements I'd stake a reputation on. Real constraints, real trade-offs, real numbers.",
        body: CASE_STUDIES.map(
            (c) => `            <article>
                <div class="meta">${esc(c.eyebrow)} · ${esc(c.company)}</div>
                <h2>${esc(c.title)}</h2>
                <p class="lede">${esc(c.summary)}</p>
                <ul>${c.metrics
                    .map((m) => `<li>${esc(m.k)}: ${esc(m.v)}</li>`)
                    .join("")}</ul>
                <div class="tags">${c.tags.map(esc).join(" · ")}</div>
            </article>`
        ).join("\n"),
    },
    {
        slug: "impact",
        eyebrow: "ENGINEERING IMPACT",
        title: "Numbers that survived a postmortem.",
        lede: "Production metrics from systems I've owned. Not throwaway demos — these are the receipts.",
        body: IMPACT.map(
            (m) => `            <article>
                <h2>${esc(m.value)}${esc(m.unit)} — ${esc(m.label)}</h2>
                <div class="meta">${esc(m.delta)} · ${esc(m.sub)}</div>
            </article>`
        ).join("\n"),
    },
    {
        slug: "writing",
        eyebrow: "WRITING",
        title: "Things I've thought hard about.",
        lede: "Long-form notes on engineering systems, performance, and what it actually means to scale a team.",
        body: WRITING.map(
            (p) => `            <article>
                <h2>${esc(p.title)}</h2>
                <div class="meta">${esc(p.date)} · ${esc(p.eyebrow)} · ${esc(p.tag)}</div>
            </article>`
        ).join("\n"),
    },
    {
        slug: "testimonials",
        eyebrow: "TESTIMONIALS",
        title: "People who've shipped with me.",
        lede: "No marketing copy — quotes lifted verbatim from references and reviews.",
        body: TESTIMONIALS.map(
            (t) => `            <article>
                <blockquote>“${esc(t.quote)}”</blockquote>
                <div class="meta">${esc(t.name)} · ${esc(t.role)}</div>
            </article>`
        ).join("\n"),
    },
];

for (const page of pages) {
    const dir = join(root, "public", page.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), layout(page), "utf8");
    process.stdout.write(`wrote public/${page.slug}/index.html\n`);
}
