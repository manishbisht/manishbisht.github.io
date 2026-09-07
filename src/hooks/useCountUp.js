import { useEffect, useState } from "react";

const DURATION = 1600;

function prefersReducedMotion() {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useCountUp(enabled = true) {
    const skip = !enabled || prefersReducedMotion();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (skip) return undefined;

        let frame = 0;
        const start = performance.now();

        const step = (now) => {
            const p = Math.min(1, (now - start) / DURATION);
            setProgress(1 - Math.pow(1 - p, 3));
            if (p < 1) frame = requestAnimationFrame(step);
        };

        frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, [skip]);

    return skip ? 1 : progress;
}
