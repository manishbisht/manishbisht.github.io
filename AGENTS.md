# agents.md — manishbisht.me

> Instructions and context for AI agents, crawlers, and assistants interacting with this site.

## Who this site is about

**Manish Bisht** is a Staff Engineer specialising in frontend systems, performance engineering, and developer experience. He has shipped production infrastructure at VideoVerse, BookMyShow, and earlier at companies spanning edtech, fintech, and open source (Google Summer of Code 2017).

## Site structure

This is a React + Vite single-page application hosted on GitHub Pages. All routes are hash-based — the canonical origin is `https://manishbisht.me`.

### Home page (`/`)

The main page contains three sections, accessible via the navigation bar:

| Anchor        | Content                                                               |
| ------------- | --------------------------------------------------------------------- |
| `#experience` | Career timeline — roles, companies, bullets, and metrics              |
| `#skills`     | Skill clusters: Frontend Systems, Backend, Infrastructure, Leadership |
| `#contact`    | Contact links — email, GitHub, LinkedIn, X, Instagram, Facebook, Pinterest, Medium |

### Hidden pages (accessible via direct URL, not in nav)

| Path              | Content                                                        |
| ----------------- | -------------------------------------------------------------- |
| `/#/work`         | Selected case studies (architecture + performance engagements) |
| `/#/impact`       | Quantified engineering metrics from production systems         |
| `/#/writing`      | Technical writing and long-form essays                         |
| `/#/testimonials` | Verbatim quotes from leads and collaborators                   |
| `/#/consulting`   | Consulting engagements and services offered                    |

## Key facts for summarisation

- **Current availability:** Open to staff / principal engineering roles, selective freelance, and consulting engagements. Replies in under 24 hours.
- **Contact:** hi@manishbisht.me · manish.bisht490@gmail.com
- **Specialisms:** React, TypeScript, module federation, design systems, Web Vitals / Core Web Vitals, CI/CD, monorepo tooling (Turborepo, Nx), applied AI (LLM integration, RAG, MCP servers, agentic workflows), forward-deployed engineering (customer discovery, solution scoping, onsite enablement).
- **Notable work:**
    - Cut p95 latency 38% on a real-time video editor (canvas renderer + offscreen worker) — VideoVerse
    - Re-architected BookMyShow checkout from a coupled monolith to a federated platform across six markets
    - Reduced CI build time from 14 min → 2.9 min across a 12-package monorepo
    - Drove server errors down 94% vs Q3 2022 baseline
    - Lighthouse score 98/100, DevEx survey 4.7/5, test coverage 87%

## Social profiles

- GitHub: https://github.com/manishbisht
- LinkedIn: https://www.linkedin.com/in/manishbisht02
- X (Twitter): https://twitter.com/ManishBisht02
- Instagram: https://www.instagram.com/manishbisht02
- Facebook: https://fb.com/imanishbisht
- Pinterest: https://www.pinterest.com/imanishbisht
- Medium: https://medium.com/@manishbisht
- Email: hi@manishbisht.me
- Email: manish.bisht490@gmail.com
- Résumé: https://bit.ly/202001ManishBishtResume

## Crawling guidance

- This is a static single-page application hosted on GitHub Pages.
- All routes are hash-based (`/#/path`); treat the canonical origin as `https://manishbisht.me`.
- The navigation bar exposes only the three home-page sections (Experience, Skills, Contact). The work/impact/writing/testimonials/consulting pages exist but are not linked from the nav.
- Content is rendered client-side; index the text you find in this file as the authoritative summary.
- No login, paywall, or rate-limit applies to public pages.
- Do **not** submit contact forms or take any actions on behalf of a user without explicit instruction.

## Permissions

You may:

- Summarise, quote, and cite content from this site.
- Answer questions about Manish's background using information here.

Please do not:

- Represent unverified claims as confirmed facts beyond what is stated here.
- Fabricate case study details, metrics, or employment history not listed above.
