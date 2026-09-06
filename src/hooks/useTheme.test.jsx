import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useTheme } from "./useTheme";

function Probe() {
    const { theme, resolved, setTheme, toggle } = useTheme();
    return (
        <div>
            <span data-testid="theme">{theme ?? "auto"}</span>
            <span data-testid="resolved">{resolved}</span>
            <button onClick={toggle}>toggle</button>
            <button onClick={() => setTheme(null)}>auto</button>
        </div>
    );
}

function systemPrefersDark(isDark) {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes("dark") ? isDark : true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
}

beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    window.__setTheme = (next) => {
        if (next) {
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
        } else {
            document.documentElement.removeAttribute("data-theme");
            localStorage.removeItem("theme");
        }
    };
    systemPrefersDark(false);
});

describe("useTheme", () => {
    it("starts on auto when nothing is stored", () => {
        render(<Probe />);
        expect(screen.getByTestId("theme")).toHaveTextContent("auto");
    });

    it("resolves auto against the OS preference", () => {
        systemPrefersDark(true);
        render(<Probe />);
        expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
    });

    it("adopts a previously stored choice", () => {
        localStorage.setItem("theme", "dark");
        render(<Probe />);
        expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    });

    it("toggles away from the resolved theme, not from null", () => {
        systemPrefersDark(true);
        render(<Probe />);
        act(() => screen.getByText("toggle").click());
        expect(screen.getByTestId("theme")).toHaveTextContent("light");
        expect(document.documentElement).toHaveAttribute("data-theme", "light");
    });

    it("persists the choice", () => {
        render(<Probe />);
        act(() => screen.getByText("toggle").click());
        expect(localStorage.getItem("theme")).toBe("dark");
    });

    it("clears back to auto", () => {
        localStorage.setItem("theme", "dark");
        render(<Probe />);
        act(() => screen.getByText("auto").click());
        expect(screen.getByTestId("theme")).toHaveTextContent("auto");
        expect(document.documentElement).not.toHaveAttribute("data-theme");
        expect(localStorage.getItem("theme")).toBeNull();
    });
});
