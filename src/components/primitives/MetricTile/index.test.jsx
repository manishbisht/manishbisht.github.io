import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MetricTile from "./index";

describe("MetricTile", () => {
    it("renders value and label", () => {
        render(<MetricTile value="10+ yrs" label="shipping to production" />);
        expect(screen.getByText("10+ yrs")).toBeVisible();
        expect(screen.getByText("shipping to production")).toBeVisible();
    });

    it("applies caller-supplied surface and ink colours", () => {
        const { container } = render(
            <MetricTile value="1" label="l" bg="#A9DCD3" fg="#111114" />
        );
        expect(container.firstChild).toHaveStyle({
            background: "#A9DCD3",
            color: "#111114",
        });
    });

    it("renders tabular numerals so counting does not reflow the tile", () => {
        render(<MetricTile value="~7M" label="events" />);
        expect(screen.getByText("~7M")).toHaveStyle({
            fontVariantNumeric: "tabular-nums",
        });
    });
});
