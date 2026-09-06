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
            const titleEl = screen
                .getAllByText(cluster.title)
                .find((el) => el.tagName !== "LI");
            expect(titleEl).toBeVisible();
            for (const item of cluster.items) {
                expect(screen.getAllByText(item)[0]).toBeVisible();
            }
        }
    });

    it("exposes each cluster title as a level-3 heading", () => {
        render(<Skills />);
        const headings = screen.getAllByRole("heading", { level: 3 });
        expect(headings).toHaveLength(SKILLS.length);
        expect(
            headings.some((h) => h.textContent === "AI-Assisted Engineering")
        ).toBe(true);
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
