import { useCallback, useSyncExternalStore } from "react";

/**
 * Live result of a CSS media query.
 *
 * The home page is pre-rendered at build time, where there is no window, so
 * the server snapshot is always `false`. React uses that same value while
 * hydrating and then re-renders with the real one, which keeps the first
 * client render identical to the pre-rendered HTML.
 */
export function useMediaQuery(query) {
    const subscribe = useCallback(
        (onChange) => {
            if (typeof window === "undefined" || !window.matchMedia) {
                return () => {};
            }
            const mql = window.matchMedia(query);
            mql.addEventListener?.("change", onChange);
            return () => mql.removeEventListener?.("change", onChange);
        },
        [query]
    );

    const getSnapshot = () =>
        typeof window !== "undefined" && window.matchMedia
            ? window.matchMedia(query).matches
            : false;

    return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export const useReducedMotion = () =>
    useMediaQuery("(prefers-reduced-motion: reduce)");
