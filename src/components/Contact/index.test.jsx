import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./index";
import { LINKS } from "./constants";

describe("Contact", () => {
    it("renders the heading", () => {
        render(<Contact />);
        expect(
            screen.getByRole("heading", { level: 2, name: /Let's Work/ })
        ).toBeVisible();
    });

    it("renders every contact link", () => {
        render(<Contact />);
        expect(screen.getAllByRole("link")).toHaveLength(LINKS.length);
    });

    it("opens external links in a new tab, but not mailto ones", () => {
        const { container } = render(<Contact />);
        const email = container.querySelector(
            'a[href="mailto:hi@manishbisht.me"]'
        );
        expect(email).not.toHaveAttribute("target");

        const github = container.querySelector(
            'a[href="https://github.com/manishbisht"]'
        );
        expect(github).toHaveAttribute("target", "_blank");
        expect(github).toHaveAttribute(
            "rel",
            expect.stringContaining("noreferrer")
        );
    });

    it("anchors at #contact", () => {
        const { container } = render(<Contact />);
        expect(container.querySelector("#contact")).not.toBeNull();
    });
});
