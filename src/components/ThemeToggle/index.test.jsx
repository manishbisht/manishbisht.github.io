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
