import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageShell from "./index";

function renderShell(props = {}) {
    return render(
        <MemoryRouter>
            <PageShell eyebrow="WRITING" title="Things" {...props}>
                <p>body</p>
            </PageShell>
        </MemoryRouter>
    );
}

describe("PageShell", () => {
    it("always offers a way back to the portfolio", () => {
        renderShell();
        expect(
            screen.getByRole("link", { name: /Back to portfolio/ })
        ).toHaveAttribute("href", "/");
    });

    it("renders the title as an h1 and the eyebrow above it", () => {
        renderShell();
        expect(
            screen.getByRole("heading", { level: 1, name: "Things" })
        ).toBeVisible();
        expect(screen.getByText("WRITING")).toBeVisible();
    });

    it("renders its children", () => {
        renderShell();
        expect(screen.getByText("body")).toBeVisible();
    });
});
