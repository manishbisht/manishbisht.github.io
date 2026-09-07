import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./index";

describe("Footer", () => {
    it("is a contentinfo landmark", () => {
        render(<Footer />);
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("shows the brand", () => {
        render(<Footer />);
        expect(screen.getByText("Manish Bisht")).toBeVisible();
        expect(screen.getByAltText("")).toHaveAttribute("src", "/logo.webp");
    });

    it("shows the current year", () => {
        render(<Footer />);
        const year = String(new Date().getFullYear());
        expect(screen.getByText(new RegExp("© " + year))).toBeVisible();
    });

    it("retains the build metadata", () => {
        render(<Footer />);
        expect(screen.getByText(/BUILD/)).toBeVisible();
    });
});
