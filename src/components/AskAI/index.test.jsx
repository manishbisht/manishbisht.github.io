import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AskAI from "./index";
import { AI_PROMPT } from "./constants";

beforeEach(() => {
    vi.restoreAllMocks();
});

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
    ])("sends the prompt to %s in the query string", (name, prefix) => {
        render(<AskAI />);
        const href = screen
            .getByRole("link", { name: new RegExp(name) })
            .getAttribute("href");
        expect(href.startsWith(prefix)).toBe(true);
        expect(href).toContain(encodeURIComponent("manishbisht.me"));
        expect(decodeURIComponent(href.slice(prefix.length))).toBe(AI_PROMPT);
    });

    // Verified in a browser: claude.ai/new?q= strips the parameter, so a
    // prefill link there would be a dead link dressed up as a feature.
    it("does not pretend Claude accepts a prefilled prompt", () => {
        render(<AskAI />);
        const href = screen
            .getByRole("link", { name: /Claude/ })
            .getAttribute("href");
        expect(href).toBe("https://claude.ai/new");
        expect(href).not.toContain("q=");
    });

    it("copies the prompt when Claude is opened", async () => {
        const writeText = vi.fn().mockResolvedValue(undefined);
        vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
        render(<AskAI />);
        fireEvent.click(screen.getByRole("link", { name: /Claude/ }));
        await waitFor(() => expect(writeText).toHaveBeenCalledWith(AI_PROMPT));
        expect(await screen.findByText(/Prompt copied/)).toBeVisible();
    });

    it("stays usable when the clipboard is unavailable", async () => {
        const writeText = vi.fn().mockRejectedValue(new Error("denied"));
        vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText } });
        render(<AskAI />);
        fireEvent.click(screen.getByRole("link", { name: /Claude/ }));
        await waitFor(() => expect(writeText).toHaveBeenCalled());
        // no "copied" claim, and the link is still there to follow
        expect(screen.queryByText(/Prompt copied/)).toBeNull();
        expect(screen.getByRole("link", { name: /Claude/ })).toBeVisible();
    });

    it("names the site in the prompt so the assistant has something to read", () => {
        expect(AI_PROMPT).toContain("https://manishbisht.me");
    });
});
