jest.mock("../../assets/icons/logo.svg", () => "mocked-logo.svg");
jest.mock("../../assets/icons/chevleft.svg", () => "mocked-chevleft.svg");

import { newSpecPage } from "@stencil/core/testing";
import { ShippingView } from "./shipping-view";

describe("shipping-view-component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders with shipping options", async () => {
        const mockShippingOptions = [
            {
                id: "1",
                name: "Standard",
                label: "Standard Shipping",
                logo: "standard.png",
                fees: {
                    currency: "USD",
                    amount: 5.99,
                },
            },
        ];

        const page = await newSpecPage({
            components: [ShippingView],
            html: "<shipping-view-component></shipping-view-component>",
        });

        global.fetch = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockShippingOptions),
            })
        );

        await page.rootInstance.componentDidLoad();
        await page.waitForChanges();

        expect(page.root).toMatchSnapshot();

        const shippingList = page.root.shadowRoot.querySelector(
            "shipping-list-component"
        );
        expect(shippingList).toBeTruthy();
        expect(shippingList.getAttribute("isloading")).toBeFalsy();

        const proceedButton =
            page.root.shadowRoot.querySelector("button-component");
        expect(proceedButton.getAttribute("showshimmer")).toBeFalsy();
    });

    it("emits navigate event when back button is clicked", async () => {
        const page = await newSpecPage({
            components: [ShippingView],
            html: "<shipping-view-component></shipping-view-component>",
        });

        await page.rootInstance.componentDidLoad();
        await page.waitForChanges();

        const navigateSpy = jest.fn();
        page.root.addEventListener("navigate", navigateSpy);

        const backButton = page.root.shadowRoot.querySelector(
            "button-component[variant='icon']"
        ) as HTMLElement;
        backButton.click();

        expect(navigateSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                detail: "cart",
            })
        );
    });

    it("emits navigate event when proceed button is clicked with selected shipping", async () => {
        const page = await newSpecPage({
            components: [ShippingView],
            html: "<shipping-view-component></shipping-view-component>",
        });

        await page.rootInstance.componentDidLoad();
        await page.waitForChanges();

        const navigateSpy = jest.fn();
        page.root.addEventListener("navigate", navigateSpy);

        page.rootInstance.selectedShippingOption = {
            id: "1",
            name: "Standard",
            label: "Standard Shipping",
            logo: "standard.png",
            fees: {
                currency: "USD",
                amount: 5.99,
            },
        };
        await page.waitForChanges();

        const proceedButton = page.root.shadowRoot.querySelector(
            "button-component[variant='normal']"
        ) as HTMLElement;
        proceedButton.click();

        expect(navigateSpy).toHaveBeenCalledWith(
            expect.objectContaining({
                detail: "confirmation",
            })
        );
    });
});
