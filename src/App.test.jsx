import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderAt(path) {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <App />
        </MemoryRouter>
    );
}

beforeEach(() => {
    localStorage.clear();
    window.__setTheme = vi.fn();
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
});

describe("App", () => {
    it("renders the home page at /", () => {
        renderAt("/");
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            /Engineering that starts with/
        );
    });

    it("mounts the section rail on the home page", () => {
        renderAt("/");
        expect(
            screen.getByRole("navigation", { name: /sections/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: "Experience" })
        ).toHaveAttribute("href", "#experience");
    });

    // The rail links to home-page sections, so it would be dead on a route
    // that has none. Secondary pages navigate with PageShell's back link.
    it("leaves the section rail off the secondary pages", async () => {
        renderAt("/writing");
        await screen.findByRole("heading", { level: 1 });
        expect(
            screen.queryByRole("navigation", { name: /sections/i })
        ).toBeNull();
    });

    it("mounts the theme toggle", () => {
        renderAt("/");
        expect(
            screen.getByRole("button", { name: /switch to .* theme/i })
        ).toBeVisible();
    });

    it("renders contact and footer on every route", () => {
        renderAt("/writing");
        expect(
            screen.getByRole("heading", { level: 2, name: /Let's Work/ })
        ).toBeInTheDocument();
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("resolves a lazy route's content once awaited", async () => {
        renderAt("/writing");
        expect(
            await screen.findByRole("heading", { level: 1 })
        ).toHaveTextContent(/Things I.ve thought/);
    });

    it("no longer routes /consulting to a page, even once lazy routes have had a chance to resolve", async () => {
        renderAt("/consulting");
        await expect(
            screen.findByRole("link", { name: /Back to portfolio/ })
        ).rejects.toThrow();
    });

    it("redirects the retired /consulting URL home rather than stranding it", () => {
        renderAt("/consulting");
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            /Engineering that starts with/
        );
    });

    it("redirects any unknown route home", () => {
        renderAt("/nonexistent-typo-route");
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            /Engineering that starts with/
        );
    });
});
