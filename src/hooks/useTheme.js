import { useCallback, useState } from "react";

const STORAGE_KEY = "theme";

function readStored() {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        return value === "light" || value === "dark" ? value : null;
    } catch {
        return null;
    }
}

function systemTheme() {
    if (typeof window === "undefined" || !window.matchMedia) return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

export function useTheme() {
    const [theme, setThemeState] = useState(readStored);

    const setTheme = useCallback((next) => {
        const value = next === "light" || next === "dark" ? next : null;
        if (typeof window !== "undefined" && window.__setTheme) {
            window.__setTheme(value);
        }
        setThemeState(value);
    }, []);

    const resolved = theme ?? systemTheme();

    const toggle = useCallback(() => {
        setTheme(resolved === "dark" ? "light" : "dark");
    }, [resolved, setTheme]);

    return { theme, resolved, setTheme, toggle };
}
