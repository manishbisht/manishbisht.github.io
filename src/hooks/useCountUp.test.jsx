import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useCountUp } from "./useCountUp";

function Probe({ enabled = true }) {
    const p = useCountUp(enabled);
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
});
