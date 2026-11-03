import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WorkPage from "./Work";
import ImpactPage from "./Impact";

const PAGES = [
    ["Work", WorkPage, /SELECTED WORK/],
    ["Impact", ImpactPage, /ENGINEERING IMPACT/],
];

describe.each(PAGES)("%s page", (_name, Page, eyebrow) => {
    it("renders its eyebrow", () => {
        render(
            <MemoryRouter>
                <Page />
            </MemoryRouter>
        );
        expect(screen.getByText(eyebrow)).toBeVisible();
    });

    it("offers a route back home", () => {
        render(
            <MemoryRouter>
                <Page />
            </MemoryRouter>
        );
        expect(
            screen.getByRole("link", { name: /Back to portfolio/ })
        ).toBeVisible();
    });
});
