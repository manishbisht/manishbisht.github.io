import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CornerMark from "./index";

describe("CornerMark", () => {
    it("is hidden from assistive tech", () => {
        const { container } = render(<CornerMark />);
        expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    });

    it("contributes no accessible text", () => {
        const { container } = render(<CornerMark />);
        expect(container).toHaveTextContent("");
    });

    it("applies size, colour and opacity as inline custom properties", () => {
        const { container } = render(
            <CornerMark size={18} color="#fff" opacity={0.4} />
        );
        expect(container.firstChild).toHaveStyle({
            width: "18px",
            height: "18px",
            borderColor: "#fff",
            opacity: "0.4",
        });
    });

    it("composes component class with caller's className", () => {
        const { container } = render(<CornerMark className="custom-class" />);
        const element = container.firstChild;
        expect(element.className).toContain("custom-class");
        expect(element.className).toMatch(/mark/);
    });
});
