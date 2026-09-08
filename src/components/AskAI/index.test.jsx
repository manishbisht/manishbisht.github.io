import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AskAI from "./index";
import { AI_PROMPT } from "./constants";

describe("AskAI", () => {
    it("offers the three assistants as external links", () => {
        render(<AskAI />);
        for (const name of ["ChatGPT", "Perplexity", "Claude"]) {
            const link = screen.getByRole("link", { name: new RegExp(name) });
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noreferrer");
        }
    });

    // The whole point of the feature: the prompt has to travel in the URL, not
    // just link to a homepage. Encoded, so the query survives the round trip.
    it.each([
        ["ChatGPT", "https://chatgpt.com/?q="],
        ["Perplexity", "https://www.perplexity.ai/search?q="],
        ["Claude", "https://claude.ai/new?q="],
    ])("sends the prompt to %s in the query string", (name, prefix) => {
        render(<AskAI />);
        const href = screen
            .getByRole("link", { name: new RegExp(name) })
            .getAttribute("href");
        expect(href.startsWith(prefix)).toBe(true);
        expect(href).toContain(encodeURIComponent("manishbisht.me"));
        expect(decodeURIComponent(href.slice(prefix.length))).toBe(AI_PROMPT);
    });

    it("names the site in the prompt so the assistant has something to read", () => {
        expect(AI_PROMPT).toContain("https://manishbisht.me");
    });
});
