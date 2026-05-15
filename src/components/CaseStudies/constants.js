export const CASE_STUDIES = [
    {
        id: "videoverse-editor",
        eyebrow: "Performance · 2024",
        title: "Cutting p95 by 38% on a real-time video editor",
        summary:
            "Replaced the React DOM-based timeline with a hand-rolled canvas renderer. Backed by an offscreen worker, a custom scheduler, and aggressive memoization of frame extracts.",
        metrics: [
            { k: "p95", v: "−38%" },
            { k: "TTI", v: "−1.2s" },
            { k: "memory", v: "−44%" },
        ],
        tags: ["React", "Canvas", "Web Workers", "Profiling"],
        company: "VideoVerse",
    },
    {
        id: "bms-checkout",
        eyebrow: "Architecture · 2022",
        title: "Re-architecting BookMyShow's checkout for six markets",
        summary:
            "Module federation, typed event contracts, idempotency by default. From a coupled monolith serving one market to a federated platform live in six.",
        metrics: [
            { k: "errors", v: "−94%" },
            { k: "markets", v: "1 → 6" },
            { k: "MTTR", v: "−81%" },
        ],
        tags: [
            "Module Federation",
            "TypeScript",
            "Idempotency",
            "Observability",
        ],
        company: "BookMyShow",
    },
    {
        id: "devx-platform",
        eyebrow: "Developer Experience · 2024",
        title: "Building the internal frontend platform — twice",
        summary:
            "Spun up the platform team at VideoVerse. Centralized design system, Turbo + Nx pipeline, Playwright + visual regression. CI time from 14m to 3m, DevEx 4.7/5.",
        metrics: [
            { k: "CI", v: "−79%" },
            { k: "DevEx", v: "4.7/5" },
            { k: "pkgs", v: "12" },
        ],
        tags: ["Turbo", "Nx", "Playwright", "Design Systems"],
        company: "VideoVerse",
    },
];
