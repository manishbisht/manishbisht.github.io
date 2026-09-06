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
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("no longer routes /consulting to a page", () => {
        renderAt("/consulting");
        expect(
            screen.queryByRole("link", { name: /Back to portfolio/ })
        ).toBeNull();
    });
});
