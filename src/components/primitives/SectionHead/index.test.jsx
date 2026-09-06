import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SectionHead from "./index";

describe("SectionHead", () => {
    it("renders the title as a level-2 heading", () => {
        render(<SectionHead eyebrow="SKILLS" title="The stack" />);
        expect(
            screen.getByRole("heading", { level: 2, name: "The stack" })
        ).toBeVisible();
    });

    it("renders the eyebrow", () => {
        render(<SectionHead eyebrow="EXPERIENCE" title="A decade" />);
        expect(screen.getByText("EXPERIENCE")).toBeVisible();
    });

    it("renders the lede when supplied", () => {
        render(
            <SectionHead
                eyebrow="E"
                title="T"
                lede="From founding Run4Offers"
            />
        );
        expect(screen.getByText(/From founding Run4Offers/)).toBeVisible();
    });

    it("omits the lede element entirely when not supplied", () => {
        const { container } = render(<SectionHead eyebrow="E" title="T" />);
        expect(container.querySelectorAll("p")).toHaveLength(0);
    });

    it("accepts a display size for the consulting heading", () => {
        render(<SectionHead eyebrow="E" title="Engagements" size="display" />);
        expect(
            screen.getByRole("heading", { level: 2, name: "Engagements" })
        ).toBeVisible();
    });

    it("applies the align prop to control alignment", () => {
        const { container: endContainer } = render(
            <SectionHead eyebrow="E" title="T" align="end" />
        );
        const endHead = endContainer.querySelector("div");
        expect(endHead.className).toContain("end");
    });

    it("applies the align start prop when specified", () => {
        const { container: startContainer } = render(
            <SectionHead eyebrow="E" title="T" align="start" />
        );
        const startHead = startContainer.querySelector("div");
        expect(startHead.className).toContain("start");
    });

    it("applies the size prop to control heading font size", () => {
        const { container: defaultContainer } = render(
            <SectionHead eyebrow="E" title="T" size="default" />
        );
        const h2Default = defaultContainer.querySelector("h2");
        expect(h2Default.className).toContain("default");
    });

    it("applies the display size class to the title", () => {
        const { container: displayContainer } = render(
            <SectionHead eyebrow="E" title="T" size="display" />
        );
        const h2Display = displayContainer.querySelector("h2");
        expect(h2Display.className).toContain("display");
    });

    it("applies custom accent color to the eyebrow", () => {
        render(
            <SectionHead eyebrow="CustomColor" title="T" accent="#00ff00" />
        );
        const eyebrow = screen.getByText("CustomColor");
        expect(eyebrow).toHaveStyle("color: #00ff00");
    });

    it("omits inline style when no accent is provided", () => {
        render(<SectionHead eyebrow="NoAccent" title="T" />);
        const eyebrow = screen.getByText("NoAccent");
        expect(eyebrow).not.toHaveAttribute("style");
    });

    it("still defaults to a level-2 heading when no heading level is passed", () => {
        render(<SectionHead eyebrow="E" title="Default level" />);
        expect(
            screen.getByRole("heading", { level: 2, name: "Default level" })
        ).toBeVisible();
    });

    it("renders the title at the requested heading level when overridden", () => {
        render(
            <SectionHead eyebrow="E" title="Page title" headingLevel="h1" />
        );
        expect(
            screen.getByRole("heading", { level: 1, name: "Page title" })
        ).toBeVisible();
    });
});
