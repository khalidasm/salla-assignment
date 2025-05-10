jest.mock("../../assets/icons/logo.svg", () => "mocked-logo.svg");

import { newSpecPage } from "@stencil/core/testing";
import { CartView } from "./cart-view";

describe("cart-view-component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with loading state", async () => {
    const page = await newSpecPage({
      components: [CartView],
      html: "<cart-view-component></cart-view-component>",
    });

    const loadingContainer = page.root.shadowRoot.querySelector('[data-testid="loading-container"]');
    expect(loadingContainer).toBeTruthy();
    expect(loadingContainer.className).toContain("flex");
    expect(loadingContainer.className).toContain("items-center");
  });

  it("renders with cart items after loading", async () => {
    const mockItems = [
      {
        id: "1",
        name: "Test Item",
        price: { currency: "USD", amount: "10.99" },
        qty: 1,
      },
    ];

    const mockCoupons = [
      {
        id: "1",
        name: "TEST10",
        discount: 10,
      },
    ];

    const page = await newSpecPage({
      components: [CartView],
      html: "<cart-view-component></cart-view-component>",
    });

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("items")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockItems),
        });
      }
      if (url.includes("coupon")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockCoupons),
        });
      }
    });

    await page.rootInstance.componentDidLoad();
    await page.waitForChanges();

    const cartContent = page.root.shadowRoot.querySelector('[data-testid="cart-content"]');
    expect(cartContent).toBeTruthy();
    expect(cartContent.className).toContain("flex");
    expect(cartContent.className).toContain("flex-col");

    const cartHeader = page.root.shadowRoot.querySelector('[data-testid="cart-header"]');
    expect(cartHeader).toBeTruthy();
    expect(cartHeader.querySelector("span").textContent).toBe("Cart");
  });

  it("emits navigate event when proceed button is clicked", async () => {
    const page = await newSpecPage({
      components: [CartView],
      html: "<cart-view-component></cart-view-component>",
    });

    await page.rootInstance.componentDidLoad();
    await page.waitForChanges();

    const navigateSpy = jest.fn();
    page.root.addEventListener("navigate", navigateSpy);

    const proceedButton = page.root.shadowRoot.querySelector('[data-testid="proceed-button"]') as HTMLElement;
    proceedButton.click();

    expect(navigateSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: "shipping",
      })
    );
  });

  it("shows invalid coupon message when invalid coupon is applied", async () => {
    const mockCoupons = [
      {
        id: "1",
        name: "TEST10",
        discount: 10,
      },
    ];

    const page = await newSpecPage({
      components: [CartView],
      html: "<cart-view-component></cart-view-component>",
    });

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes("coupon")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockCoupons),
        });
      }
    });

    await page.rootInstance.componentDidLoad();
    await page.waitForChanges();

    const couponInput = page.root.shadowRoot.querySelector("coupon-input");
    couponInput.dispatchEvent(new CustomEvent("applyCoupon", { detail: "INVALID" }));
    await page.waitForChanges();

    const invalidMessage = page.root.shadowRoot.querySelector('[data-testid="invalid-coupon-message"]');
    expect(invalidMessage).toBeTruthy();
    expect(invalidMessage.querySelector("span").textContent).toBe("Invalid coupon code");
  });
}); 