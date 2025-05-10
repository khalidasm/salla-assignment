jest.mock("../../assets/icons/logo.svg", () => "mocked-logo.svg");

import { newSpecPage } from "@stencil/core/testing";
import { ConfirmationView } from "./confirmation-view";

describe("confirmation-view-component", () => {
    it("renders with all required elements", async () => {
        const page = await newSpecPage({
            components: [ConfirmationView],
            html: "<confirmation-view-component></confirmation-view-component>",
        });

        const confirmationView = page.root.querySelector(
            '[data-testid="confirmation-view"]'
        );
        expect(confirmationView).toBeTruthy();
        expect(confirmationView.className).toContain("flex");
        expect(confirmationView.className).toContain("flex-col");
        expect(confirmationView.className).toContain("items-center");
        expect(confirmationView.className).toContain("justify-center");
    });

    it("renders logo section correctly", async () => {
        const page = await newSpecPage({
            components: [ConfirmationView],
            html: "<confirmation-view-component></confirmation-view-component>",
        });

        const logoSection = page.root.querySelector(
            '[data-testid="logo-section"]'
        );
        expect(logoSection).toBeTruthy();
        expect(logoSection.className).toContain("flex");
        expect(logoSection.className).toContain("flex-col");
        expect(logoSection.className).toContain("items-center");

        const storeLogo = page.root.querySelector('[data-testid="store-logo"]');
        expect(storeLogo).toBeTruthy();
        expect(storeLogo.getAttribute("alt")).toBe("store-logo");
        expect(storeLogo.getAttribute("src")).toBe("mocked-logo.svg");
        expect(storeLogo.className).toContain("w-10");
        expect(storeLogo.className).toContain("h-10");
    });

    it("renders message section with correct content", async () => {
        const page = await newSpecPage({
            components: [ConfirmationView],
            html: "<confirmation-view-component></confirmation-view-component>",
        });

        const messageSection = page.root.querySelector(
            '[data-testid="message-section"]'
        );
        expect(messageSection).toBeTruthy();
        expect(messageSection.className).toContain("flex");
        expect(messageSection.className).toContain("flex-col");
        expect(messageSection.className).toContain("items-center");

        const title = page.root.querySelector(
            '[data-testid="confirmation-title"]'
        );
        expect(title).toBeTruthy();
        expect(title.textContent).toBe("Payment Confirmed");
        expect(title.className).toContain("text-[38px]");
        expect(title.className).toContain("font-black");

        const message = page.root.querySelector(
            '[data-testid="confirmation-message"]'
        );
        expect(message).toBeTruthy();
        expect(message.textContent).toBe("Thank you for shopping!");
        expect(message.className).toContain("text-[16px]");
        expect(message.className).toContain("text-label-gray");

        const returnLink = page.root.querySelector(
            '[data-testid="return-link"]'
        );
        expect(returnLink).toBeTruthy();
        expect(returnLink.textContent).toBe("return to the store");
        expect(returnLink.getAttribute("href")).toBe("/");
        expect(returnLink.className).toContain("text-[16px]");
        expect(returnLink.className).toContain("!text-secondary-text");
        expect(returnLink.className).toContain("underline");
    });
});
