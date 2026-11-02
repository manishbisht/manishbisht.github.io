import { useCallback, useSyncExternalStore } from "react";
import { useMediaQuery } from "./useMediaQuery";

const STORAGE_KEY = "theme";
const listeners = new Set();

const valid = (v) => (v === "light" || v === "dark" ? v : null);

// The <html data-theme> attribute is what is actually applied (set by the
// inline script in index.html and by window.__setTheme), so it wins; storage
// is the fallback for when the inline script has not run.
function readTheme() {
    return (
        valid(document.documentElement.getAttribute("data-theme")) ??
        readStored()
    );
}

function readStored() {
    try {
        return valid(localStorage.getItem(STORAGE_KEY));
    } catch {
        return null;
    }
}

function subscribe(onChange) {
    listeners.add(onChange);
    window.addEventListener("storage", onChange);
    return () => {
        listeners.delete(onChange);
        window.removeEventListener("storage", onChange);
    };
}

export function useTheme() {
    // The server snapshot is "auto" so hydration matches the pre-rendered
    // HTML; React then re-renders with the stored choice before paint.
    const theme = useSyncExternalStore(subscribe, readTheme, () => null);
    const systemDark = useMediaQuery("(prefers-color-scheme: dark)");

    const setTheme = useCallback((next) => {
        const value = valid(next);
        if (typeof window !== "undefined" && window.__setTheme) {
            window.__setTheme(value);
        }
        listeners.forEach((l) => l());
    }, []);

    const resolved = theme ?? (systemDark ? "dark" : "light");

    const toggle = useCallback(() => {
        setTheme(resolved === "dark" ? "light" : "dark");
    }, [resolved, setTheme]);

    return { theme, resolved, setTheme, toggle };
}
