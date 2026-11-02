import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Faq from "./index";
import { FAQ } from "./constants";

describe("Faq", () => {
    it("is a labelled section at #faq", () => {
        render(<Faq />);
        const section = screen.getByRole("region", { name: "Quick answers." });
        expect(section).toHaveAttribute("id", "faq");
    });

    it("shows every question and answer as visible text", () => {
        render(<Faq />);
        for (const { q, a } of FAQ) {
            expect(screen.getByText(q)).toBeVisible();
            expect(screen.getByText(a)).toBeVisible();
        }
    });

    it("mirrors the visible Q&A as FAQPage structured data", () => {
        const { container } = render(<Faq />);
        const script = container.querySelector(
            'script[type="application/ld+json"]'
        );
        const data = JSON.parse(script.textContent);
        expect(data["@type"]).toBe("FAQPage");
        expect(data.mainEntity).toHaveLength(FAQ.length);
        expect(data.mainEntity[0]).toEqual({
            "@type": "Question",
            name: FAQ[0].q,
            acceptedAnswer: { "@type": "Answer", text: FAQ[0].a },
        });
    });
});
