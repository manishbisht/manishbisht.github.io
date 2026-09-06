import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Marquee from "./index";
import { TICKER } from "./constants";

describe("Marquee", () => {
    it("is hidden from assistive tech", () => {
        const { container } = render(<Marquee />);
        expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    });

    it("duplicates the list so the loop is seamless", () => {
        render(<Marquee />);
        expect(screen.getAllByText(TICKER[0])).toHaveLength(2);
    });

    it("leads with the three role types", () => {
        expect(TICKER.slice(0, 3)).toEqual([
            "Applied AI",
            "Frontend",
            "Backend",
        ]);
    });
});
