import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Chip from "./index";

describe("Chip", () => {
    it("renders its label", () => {
        render(<Chip>React</Chip>);
        expect(screen.getByText("React")).toBeVisible();
    });

    it("renders as a link when asked", () => {
        render(
            <Chip as="a" variant="pill" href="#skills">
                Applied AI
            </Chip>
        );
        expect(
            screen.getByRole("link", { name: "Applied AI" })
        ).toHaveAttribute("href", "#skills");
    });

    it("renders a decorative dot only when a colour is given", () => {
        const { container: without } = render(<Chip>Remote</Chip>);
        expect(without.querySelector("[data-dot]")).toBeNull();

        const { container: with_ } = render(
            <Chip dot="#2FB27A">Available</Chip>
        );
        const dot = with_.querySelector("[data-dot]");
        expect(dot).not.toBeNull();
        expect(dot).toHaveAttribute("aria-hidden", "true");
    });

    it("keeps the dot out of the accessible name", () => {
        render(<Chip dot="#2FB27A">Available Q3 2026</Chip>);
        expect(screen.getByText("Available Q3 2026")).toBeVisible();
    });

    it("applies the mono variant by default", () => {
        const { container } = render(<Chip>Tag</Chip>);
        const element = container.firstChild;
        const tokens = element.className.split(/\s+/).filter(Boolean);
        expect(new Set(tokens).size).toBe(tokens.length);
        expect(element.className).toMatch(/mono/);
    });

    it("applies the pill variant when requested", () => {
        const { container } = render(<Chip variant="pill">Link</Chip>);
        const element = container.firstChild;
        const tokens = element.className.split(/\s+/).filter(Boolean);
        expect(new Set(tokens).size).toBe(tokens.length);
        expect(element.className).toMatch(/pill/);
    });

    it("applies the default tone by default", () => {
        const { container } = render(<Chip>Tag</Chip>);
        const element = container.firstChild;
        const tokens = element.className.split(/\s+/).filter(Boolean);
        expect(new Set(tokens).size).toBe(tokens.length);
        expect(element.className).toMatch(/default/);
    });

    it("applies the outline tone when requested", () => {
        const { container } = render(
            <Chip variant="pill" tone="outline">
                Link
            </Chip>
        );
        const element = container.firstChild;
        const tokens = element.className.split(/\s+/).filter(Boolean);
        expect(new Set(tokens).size).toBe(tokens.length);
        expect(element.className).toMatch(/outline/);
    });

    it("applies the solid tone when requested", () => {
        const { container } = render(
            <Chip variant="pill" tone="solid">
                Link
            </Chip>
        );
        const element = container.firstChild;
        const tokens = element.className.split(/\s+/).filter(Boolean);
        expect(new Set(tokens).size).toBe(tokens.length);
        expect(element.className).toMatch(/solid/);
    });

    it("applies custom className", () => {
        const { container } = render(<Chip className="custom-class">Tag</Chip>);
        const element = container.firstChild;
        expect(element.className).toContain("custom-class");
    });

    it("applies dot background color", () => {
        const { container } = render(<Chip dot="#FF0000">Status</Chip>);
        const dot = container.querySelector("[data-dot]");
        expect(dot).toHaveStyle("background: #FF0000");
    });

    it("renders as span by default", () => {
        const { container } = render(<Chip>Tag</Chip>);
        const element = container.firstChild;
        expect(element.tagName.toLowerCase()).toBe("span");
    });

    it("accepts additional props like href for anchor tags", () => {
        const { container } = render(
            <Chip as="a" href="https://example.com" target="_blank">
                Link
            </Chip>
        );
        const element = container.firstChild;
        expect(element.tagName.toLowerCase()).toBe("a");
        expect(element).toHaveAttribute("href", "https://example.com");
        expect(element).toHaveAttribute("target", "_blank");
    });
});
