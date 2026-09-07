import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeroRail from "./index";
import { NAV } from "./constants";

describe("HeroRail", () => {
    it("exposes a navigation landmark", () => {
        render(<HeroRail />);
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("renders every nav entry as an in-page anchor", () => {
        render(<HeroRail />);
        for (const item of NAV) {
            expect(
                screen.getByRole("link", { name: item.label })
            ).toHaveAttribute("href", `#${item.id}`);
        }
    });

    it("leads with Consulting", () => {
        expect(NAV[0]).toEqual({ label: "Consulting", id: "consulting" });
    });

    it("covers every home section", () => {
        expect(NAV.map((n) => n.id)).toEqual([
            "consulting",
            "experience",
            "open-source",
            "skills",
            "contact",
        ]);
    });
});
