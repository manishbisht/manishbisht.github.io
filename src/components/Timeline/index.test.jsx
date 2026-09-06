import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Timeline from "./index";
import { TIMELINE, OPEN_SOURCE } from "./constants";

describe("Timeline", () => {
    it("renders every role as an article", () => {
        const { container } = render(
            <Timeline id="experience" eyebrow="E" title="T" items={TIMELINE} />
        );
        expect(container.querySelectorAll("article")).toHaveLength(
            TIMELINE.length
        );
    });

    it("shows company, role, period and metric", () => {
        render(
            <Timeline id="experience" eyebrow="E" title="T" items={TIMELINE} />
        );
        expect(screen.getAllByText("VideoVerse")[0]).toBeVisible();
        expect(screen.getByText("Staff Engineer")).toBeVisible();
        expect(screen.getByText("January 2025 — Now")).toBeVisible();
        expect(screen.getByText("dev teams + QA team")).toBeVisible();
    });

    it("badges only the current role", () => {
        render(
            <Timeline id="experience" eyebrow="E" title="T" items={TIMELINE} />
        );
        expect(screen.getAllByText("NOW")).toHaveLength(1);
    });

    it("renders stack chips", () => {
        render(
            <Timeline id="experience" eyebrow="E" title="T" items={TIMELINE} />
        );
        expect(screen.getByText("SNS/SQS")).toBeVisible();
    });

    it("turns markdown links in bullets into anchors", () => {
        render(<Timeline id="oss" eyebrow="O" title="T" items={OPEN_SOURCE} />);
        const link = screen.getByRole("link", {
            name: /Pull requests: phpmyadmin/,
        });
        expect(link.getAttribute("href")).toMatch(/^https:\/\/github\.com/);
        expect(link).toHaveAttribute("target", "_blank");
    });

    it("renders mailto bullets without a target", () => {
        render(
            <Timeline id="experience" eyebrow="E" title="T" items={TIMELINE} />
        );
        const mail = screen.getAllByRole("link", {
            name: /manish\.bisht@magnifi\.ai/,
        })[0];
        expect(mail.getAttribute("href")).toMatch(/^mailto:/);
        expect(mail).not.toHaveAttribute("target");
    });

    it("uses the section id it is given", () => {
        const { container } = render(
            <Timeline
                id="open-source"
                eyebrow="O"
                title="T"
                items={OPEN_SOURCE}
            />
        );
        expect(container.querySelector("#open-source")).not.toBeNull();
    });

    it("rejects a disallowed link scheme and renders it as plain text", () => {
        const items = [
            {
                company: "Acme",
                role: "Engineer",
                period: "2020",
                stack: [],
                bullets: ["[click me](javascript:alert(1))"],
                metric: { label: "x", delta: "1" },
            },
        ];
        render(<Timeline id="x" eyebrow="E" title="T" items={items} />);
        expect(
            screen.queryByRole("link", { name: /click me/ })
        ).not.toBeInTheDocument();
        expect(
            screen.getByText("[click me](javascript:alert(1))")
        ).toBeVisible();
    });

    it("hides the location line for the oss variant but shows it by default", () => {
        const items = [
            {
                company: "Acme",
                role: "Engineer",
                period: "2020",
                location: "Remote, Earth",
                stack: [],
                bullets: [],
                metric: { label: "x", delta: "1" },
            },
        ];
        const { rerender } = render(
            <Timeline id="x" eyebrow="E" title="T" items={items} />
        );
        expect(screen.getByText("Remote, Earth")).toBeVisible();

        rerender(
            <Timeline
                id="x"
                eyebrow="E"
                title="T"
                items={items}
                variant="oss"
            />
        );
        expect(screen.queryByText("Remote, Earth")).not.toBeInTheDocument();
    });
});
