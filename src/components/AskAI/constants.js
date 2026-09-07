export const AI_PROMPT =
    "Read https://manishbisht.me and tell me about Manish Bisht — his engineering background, what he has shipped, and what he is good at.";

// Verified in a browser on 2026-09-07 rather than taken from documentation:
//   chatgpt.com/?q=          auto-submits and answers
//   perplexity.ai/search?q=  runs the query and answers
//   claude.ai/new?q=         strips the parameter, composer loads empty
// Claude therefore has no web prefill; `copy: true` means we put the prompt on
// the clipboard and open a blank chat for the visitor to paste.
export const AI_TOOLS = [
    {
        id: "chatgpt",
        label: "ChatGPT",
        href: (prompt) =>
            `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
    },
    {
        id: "perplexity",
        label: "Perplexity",
        href: (prompt) =>
            `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
    },
    {
        id: "claude",
        label: "Claude",
        copy: true,
        href: () => "https://claude.ai/new",
    },
];
