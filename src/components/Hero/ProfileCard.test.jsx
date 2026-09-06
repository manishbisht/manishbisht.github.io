import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfileCard from "./ProfileCard";

describe("Hero ProfileCard", () => {
    it("renders the name", () => {
        render(<ProfileCard />);
        expect(screen.getByText(/Manish/)).toBeVisible();
        expect(screen.getByText(/Bisht/)).toBeVisible();
    });

    it("shows the avatar with meaningful alt text", () => {
        render(<ProfileCard />);
        expect(screen.getByAltText("Manish Bisht")).toHaveAttribute(
            "src",
            "/logo.webp"
        );
    });

    it("links the primary email as a mailto", () => {
        render(<ProfileCard />);
        const email = screen.getByRole("link", { name: /hi@manishbisht\.me/ });
        expect(email.getAttribute("href")).toMatch(
            /^mailto:hi@manishbisht\.me/
        );
    });

    it("opens external profiles safely in a new tab", () => {
        render(<ProfileCard />);
        for (const name of ["Resume", "GitHub", "LinkedIn"]) {
            const link = screen.getByRole("link", { name: new RegExp(name) });
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute(
                "rel",
                expect.stringContaining("noreferrer")
            );
        }
    });

    it("states the role line", () => {
        render(<ProfileCard />);
        expect(screen.getByText("STAFF ENGINEER")).toBeVisible();
        expect(screen.getByText("VIDEOVERSE")).toBeVisible();
    });

    it("hides the floating badge from assistive tech", () => {
        render(<ProfileCard />);
        const badge = screen.getByText(/10 YRS/i).closest("[aria-hidden]");
        expect(badge).toHaveAttribute("aria-hidden", "true");
    });
});
