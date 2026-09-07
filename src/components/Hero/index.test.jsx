import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act, within } from "@testing-library/react";
import Hero from "./index";

beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query.includes("reduced-motion") ? true : true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
});

describe("Hero", () => {
    it("renders the headline as the page's h1", () => {
        render(<Hero />);
        const h1 = screen.getByRole("heading", { level: 1 });
        expect(h1).toHaveTextContent(/Engineering that starts with/);
        expect(h1).toHaveTextContent(/the customer/);
    });

    it("mentions applied AI in the lede", () => {
        render(<Hero />);
        expect(
            screen.getByText(/AI-assisted products and workflows/)
        ).toBeVisible();
    });

    it("lands the metrics on their final values", async () => {
        render(<Hero />);
        await act(async () => {});
        expect(screen.getByText("10+ yrs")).toBeVisible();
        expect(screen.getByText("100+")).toBeVisible();
        expect(screen.getByText("~7M")).toBeVisible();
        expect(screen.getByText("−60%")).toBeVisible();
    });

    it("lists the four things Manish is open to", () => {
        render(<Hero />);
        // Scoped to the roles card: HeroRail's own nav also has a
        // "Consulting" link, so an unscoped query for that label would
        // match two elements and throw.
        const rolesCard = screen.getByText("OPEN TO ROLES IN").parentElement;
        for (const role of [
            "Applied AI",
            "Frontend",
            "Backend & platform",
            "Consulting",
        ]) {
            expect(
                within(rolesCard).getByRole("link", { name: role })
            ).toBeVisible();
        }
    });

    it("links the availability banner to the consulting section", () => {
        render(<Hero />);
        const banner = screen.getByRole("link", {
            name: /Open to Applied AI, Frontend, and Backend roles/,
        });
        expect(banner).toHaveAttribute("href", "#consulting");
    });

    it("anchors itself at #top", () => {
        const { container } = render(<Hero />);
        expect(container.querySelector("#top")).not.toBeNull();
    });
});
