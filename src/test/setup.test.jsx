import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("test harness", () => {
    it("renders a React component and exposes jest-dom matchers", () => {
        render(<h1>hello</h1>);
        expect(screen.getByRole("heading", { name: "hello" })).toBeVisible();
    });

    it("exposes the __BUILD_VERSION__ define", () => {
        expect(typeof __BUILD_VERSION__).toBe("string");
    });

    it("stubs matchMedia", () => {
        expect(window.matchMedia("(min-width: 701px)").matches).toBe(true);
    });
});
