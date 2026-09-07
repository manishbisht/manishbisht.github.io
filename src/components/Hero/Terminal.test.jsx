import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Terminal from "./Terminal";

function prefersReducedMotion(reduced) {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes("reduced-motion") ? reduced : true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
}

beforeEach(() => {
    prefersReducedMotion(false);
});

describe("Hero Terminal", () => {
    it("starts with nothing typed", () => {
        vi.useFakeTimers();
        render(<Terminal />);
        expect(screen.queryByText(/whoami/)).toBeNull();
        vi.useRealTimers();
    });

    it("types every line out over time", () => {
        vi.useFakeTimers();
        render(<Terminal />);
        // Advance through each step, allowing React to batch updates after each timer
        act(() => {
            vi.advanceTimersByTime(600);
        });
        act(() => {
            vi.advanceTimersByTime(800);
        });
        act(() => {
            vi.advanceTimersByTime(800);
        });
        act(() => {
            vi.advanceTimersByTime(800);
        });
        act(() => {
            vi.advanceTimersByTime(800);
        });
        act(() => {
            vi.advanceTimersByTime(800);
        });
        expect(screen.getByText(/whoami/)).toBeVisible();
        expect(screen.getByText("manishbisht")).toBeVisible();
        expect(screen.getByText(/ship --target=production/)).toBeVisible();
        expect(screen.getByText(/deployed in 2\.9s/)).toBeVisible();
        vi.useRealTimers();
    });

    it("advertises the roles Manish is open to and consulting availability", () => {
        vi.useFakeTimers();
        render(<Terminal />);
        act(() => {
            vi.advanceTimersByTime(600);
        });
        act(() => {
            vi.advanceTimersByTime(800);
        });
        act(() => {
            vi.advanceTimersByTime(800);
        });
        act(() => {
            vi.advanceTimersByTime(800);
        });
        expect(screen.getByText(/open_to/)).toBeVisible();
        expect(screen.getByText(/Applied AI/)).toBeVisible();
        expect(screen.getByText(/consulting/)).toBeVisible();
        expect(screen.getByText(/Q3 2026/)).toBeVisible();
        vi.useRealTimers();
    });

    it("renders fully at once under reduced motion", () => {
        prefersReducedMotion(true);
        render(<Terminal />);
        expect(screen.getByText(/deployed in 2\.9s/)).toBeVisible();
    });

    it("reveals lines progressively, not all at once", () => {
        vi.useFakeTimers();
        render(<Terminal />);
        // After 600ms, only first line should be visible
        act(() => {
            vi.advanceTimersByTime(600);
        });
        expect(screen.getByText(/whoami/)).toBeVisible();
        expect(screen.queryByText("manishbisht")).toBeNull();
        expect(screen.queryByText(/deployed in 2\.9s/)).toBeNull();
        vi.useRealTimers();
    });

    it("does not leave timers pending after unmount", () => {
        vi.useFakeTimers();
        const { unmount } = render(<Terminal />);
        act(() => {
            vi.advanceTimersByTime(600);
        });
        // Verify timer is scheduled for the next step
        const timerCountBeforeUnmount = vi.getTimerCount();
        expect(timerCountBeforeUnmount).toBeGreaterThan(0);
        // Unmount the component
        unmount();
        // Verify all timers have been cleaned up
        expect(vi.getTimerCount()).toBe(0);
        vi.useRealTimers();
    });
});
