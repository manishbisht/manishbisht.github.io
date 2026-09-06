import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./index";

describe("Card", () => {
    it("renders its children", () => {
        render(<Card>contents</Card>);
        expect(screen.getByText("contents")).toBeVisible();
    });

    it("renders a div by default", () => {
        const { container } = render(<Card>x</Card>);
        expect(container.firstChild.tagName).toBe("DIV");
    });

    it("honours the `as` prop", () => {
        const { container } = render(<Card as="section">x</Card>);
        expect(container.firstChild.tagName).toBe("SECTION");
    });

    it("forwards arbitrary props to the element", () => {
        const { container } = render(
            <Card id="consulting" data-screen="Consulting">
                x
            </Card>
        );
        expect(container.firstChild).toHaveAttribute("id", "consulting");
        expect(container.firstChild).toHaveAttribute(
            "data-screen",
            "Consulting"
        );
    });

    it("keeps caller-supplied classes alongside its own", () => {
        const { container } = render(<Card className="sectionReveal">x</Card>);
        expect(container.firstChild.className).toMatch(/sectionReveal/);
    });

    it("renders an anchor with its href when asked", () => {
        render(
            <Card as="a" href="#consulting">
                go
            </Card>
        );
        expect(screen.getByRole("link", { name: "go" })).toHaveAttribute(
            "href",
            "#consulting"
        );
    });

    it("applies radius class without duplication", () => {
        const { container } = render(<Card>x</Card>);
        const tokens = container.firstChild.className
            .split(/\s+/)
            .filter(Boolean);
        expect(new Set(tokens).size).toBe(tokens.length);
    });

    it("applies distinct className for different tone values", () => {
        const { container: surfaceContainer } = render(
            <Card tone="surface">x</Card>
        );
        const { container: raisedContainer } = render(
            <Card tone="raised">x</Card>
        );
        expect(surfaceContainer.firstChild.className).not.toBe(
            raisedContainer.firstChild.className
        );
    });
});
