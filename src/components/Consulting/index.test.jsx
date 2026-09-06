import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Consulting from "./index";
import { SERVICES } from "./constants";

describe("Consulting section", () => {
    it("anchors at #consulting so the hero banner can reach it", () => {
        const { container } = render(<Consulting />);
        expect(container.querySelector("#consulting")).not.toBeNull();
    });

    it("renders the heading", () => {
        render(<Consulting />);
        expect(
            screen.getByRole("heading", { level: 2, name: /Engagements/ })
        ).toBeVisible();
    });

    it("renders every service with its duration", () => {
        render(<Consulting />);
        for (const service of SERVICES) {
            expect(screen.getByText(service.title)).toBeVisible();
            expect(screen.getByText(service.duration)).toBeVisible();
        }
    });

    it("numbers the services from 01", () => {
        render(<Consulting />);
        expect(screen.getByText("01")).toBeVisible();
        expect(screen.getByText("04")).toBeVisible();
    });

    it("states availability and that full-time is open too", () => {
        render(<Consulting />);
        expect(screen.getByText(/Available Q3 2026/)).toBeVisible();
        expect(
            screen.getByText(/open to the right full-time role/)
        ).toBeVisible();
    });

    it("offers a mailto call to action", () => {
        render(<Consulting />);
        const cta = screen.getByRole("link", { name: /Start a conversation/ });
        expect(cta.getAttribute("href")).toMatch(/^mailto:hi@manishbisht\.me/);
    });
});
