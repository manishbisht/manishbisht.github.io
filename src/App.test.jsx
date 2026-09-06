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
});
