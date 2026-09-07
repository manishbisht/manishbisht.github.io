import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useCountUp } from "./useCountUp";

let renderValues = [];

function Probe({ enabled = true }) {
    const p = useCountUp(enabled);
    renderValues.push(p);
    return <span data-testid="p">{Math.round(10 * p)}</span>;
}

function prefersReducedMotion(reduced) {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes("reduced-motion") ? reduced : false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
}

beforeEach(() => {
    renderValues = [];
    prefersReducedMotion(false);
});

describe("useCountUp", () => {
    it("settles at 1 once the animation completes", async () => {
        vi.useFakeTimers();
        render(<Probe />);
        await act(async () => {
            vi.advanceTimersByTime(2000);
        });
        expect(screen.getByTestId("p")).toHaveTextContent("10");
        vi.useRealTimers();
    });

    it("returns 1 immediately when disabled", () => {
        render(<Probe enabled={false} />);
        expect(screen.getByTestId("p")).toHaveTextContent("10");
    });

    it("returns 1 immediately under reduced motion", () => {
        prefersReducedMotion(true);
        render(<Probe />);
        expect(screen.getByTestId("p")).toHaveTextContent("10");
    });

    it("does not leave a frame scheduled after unmount", () => {
        const cancel = vi.spyOn(window, "cancelAnimationFrame");
        const { unmount } = render(<Probe />);
        unmount();
        expect(cancel).toHaveBeenCalled();
    });

    it("returns 1 immediately when disabled mid-animation", () => {
        vi.useFakeTimers();
        const { rerender } = render(<Probe enabled={true} />);
        // Advance to mid-animation (~50% progress)
        act(() => {
            vi.advanceTimersByTime(800);
        });
        // Verify we are actually mid-flight by checking raw progress value
        const latestValue = renderValues[renderValues.length - 1];
        expect(latestValue).toBeGreaterThan(0);
        expect(latestValue).toBeLessThan(1);
        // Clear the array to track only renders after disable
        renderValues = [];
        // Re-render with disabled mid-animation
        rerender(<Probe enabled={false} />);
        // With derived pattern (skip ? 1 : progress), all renders after disable return 1
        // With old pattern (setState in effect), first render shows stale mid-flight value
        expect(renderValues.length).toBeGreaterThan(0);
        for (const value of renderValues) {
            expect(value).toBe(1);
        }
        vi.useRealTimers();
    });
});
