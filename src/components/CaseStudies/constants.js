// Every claim here comes from Manish's CV (May 2026). Keep it that way: these
// pages are crawled and quoted by AI answer engines.
export const CASE_STUDIES = [
    {
        id: "videoverse-v2",
        eyebrow: "Architecture",
        title: "Modernising a media platform without a day of downtime",
        summary:
            "Led the V2 modernisation of a platform serving 100+ enterprise customers and 550K+ clips a month. Migrated 40+ routes and decomposed the monolith into ~5 microservices and 20+ serverless workloads, so teams release independently with zero downtime.",
        metrics: [
            { k: "routes migrated", v: "40+" },
            { k: "microservices", v: "~5" },
            { k: "serverless workloads", v: "20+" },
        ],
        tags: ["Microservices", "Serverless", "AWS Lambda", "Cloud Run"],
        company: "VideoVerse",
    },
    {
        id: "videoverse-events",
        eyebrow: "Distributed systems",
        title: "An event-driven backbone for ~7M media events a month",
        summary:
            "Designed an SNS/SQS event-driven architecture for media lifecycle events and scaled distribution across 50K+ monthly workflows and 10+ integrations, with retries and failure isolation so one customer's failure stays theirs.",
        metrics: [
            { k: "events / month", v: "~7M" },
            { k: "enterprise customers", v: "100+" },
            { k: "integrations", v: "10+" },
        ],
        tags: ["SNS/SQS", "Event-Driven Architecture", "Reliability"],
        company: "VideoVerse",
    },
    {
        id: "videoverse-observability",
        eyebrow: "Observability",
        title: "From 30-minute pages to 2-minute acknowledgments",
        summary:
            "Defined observability and incident-response standards across 30+ services: APM, tracing, synthetics, and PagerDuty. Then led the Datadog to Last9 migration that cut observability cost by about 60%.",
        metrics: [
            { k: "ack time (was 20–30m)", v: "<2 min" },
            { k: "observability cost", v: "−60%" },
            { k: "services covered", v: "30+" },
        ],
        tags: ["Datadog", "Last9", "PagerDuty", "Distributed Tracing"],
        company: "VideoVerse",
    },
    {
        id: "videoverse-releases",
        eyebrow: "Developer productivity",
        title: "From biweekly deploys to daily production releases",
        summary:
            "Redesigned CI/CD and release governance for a ~20-engineer team with automated quality gates, progressive rollouts, and post-deploy validation. Standardised tooling (Prettier, ESLint, SonarQube, GitLeaks), scaled Playwright automation, introduced AI-assisted workflows, and brought onboarding under a week.",
        metrics: [
            { k: "releases (was biweekly)", v: "daily" },
            { k: "engineers", v: "~20" },
            { k: "onboarding", v: "<1 week" },
        ],
        tags: ["CI/CD", "Playwright", "Release Engineering", "AI-assisted"],
        company: "VideoVerse",
    },
    {
        id: "bms-auth",
        eyebrow: "Reliability",
        title: "94% fewer mobile server errors at BookMyShow",
        summary:
            "Modernised authentication and mobile onboarding with React-based login, OTP flows, and PhonePe SSO. Cut mobile server errors by 94%, migrated routing from Nginx to HAProxy, and strengthened session security.",
        metrics: [{ k: "mobile server errors", v: "−94%" }],
        tags: ["ReactJS", "OTP", "PhonePe SSO", "HAProxy"],
        company: "BookMyShow",
    },
];
