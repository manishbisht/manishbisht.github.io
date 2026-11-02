import { describe, it, expect } from "vitest";
import { render } from "./entry-server";

// The build pre-renders this into dist/index.html for crawlers that do not
// run JavaScript, so the home page's real content has to be in it.
describe("server render of the home page", () => {
    const html = render("/");

    it("includes the hero heading", () => {
        expect(html).toContain("Engineering that starts with");
    });

    it.each([
        "consulting",
        "experience",
        "open-source",
        "skills",
        "faq",
        "contact",
    ])("includes the #%s section", (id) => {
        expect(html).toContain(`id="${id}"`);
    });

    it("shows settled metric values rather than the count-up start", () => {
        expect(html).toContain("10+ yrs");
    });

    it("carries the FAQPage structured data", () => {
        expect(html).toContain('"@type":"FAQPage"');
    });
});
