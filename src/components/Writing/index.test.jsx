import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Writing from "./index";
import { WRITING } from "./constants";

describe("Writing", () => {
    it("renders post titles as h3 under the section's own h2", () => {
        render(<Writing />);
        expect(
            screen.getByRole("heading", { level: 2, name: /thought hard/i })
        ).toBeVisible();
        expect(
            screen.getByRole("heading", { level: 3, name: WRITING[0].title })
        ).toBeVisible();
    });

    it("renders post titles as h2 standalone, so the page h1 is not skipped", () => {
        render(<Writing standalone />);
        expect(
            screen.getByRole("heading", { level: 2, name: WRITING[0].title })
        ).toBeVisible();
        expect(
            screen.queryByRole("heading", { level: 3, name: WRITING[0].title })
        ).toBeNull();
    });
});
