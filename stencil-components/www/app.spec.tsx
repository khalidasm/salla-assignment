import { newSpecPage } from "@stencil/core/testing";
import { App } from "./app";

describe("app-component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with initial cart view", async () => {
    const page = await newSpecPage({
      components: [App],
      html: "<app-component></app-component>",
    });

    await page.waitForChanges();

    const main = page.root.shadowRoot.querySelector('[data-testid="app-main"]');
    expect(main).toBeTruthy();

    const container = main.querySelector('[data-testid="app-container"]');
    expect(container).toBeTruthy();

    const cartView = container.querySelector('[data-testid="cart-view"]');
    expect(cartView).toBeTruthy();

    const shippingView = container.querySelector('[data-testid="shipping-view"]');
    expect(shippingView).toBeFalsy();

    const confirmationView = container.querySelector('[data-testid="confirmation-view"]');
    expect(confirmationView).toBeFalsy();
  });

  it("changes to shipping view when navigate event is received", async () => {
    const page = await newSpecPage({
      components: [App],
      html: "<app-component></app-component>",
    });

    await page.waitForChanges();

    const navigateEvent = new CustomEvent("navigate", {
      detail: "shipping",
      bubbles: true,
      composed: true
    });

    const navigateSpy = jest.fn();
    page.root.addEventListener("navigate", navigateSpy);

    page.root.dispatchEvent(navigateEvent);
    await page.waitForChanges();

    const container = page.root.shadowRoot.querySelector('[data-testid="app-container"]');
    expect(container).toBeTruthy();

    const cartView = container.querySelector('[data-testid="cart-view"]');
    expect(cartView).toBeFalsy();

    const shippingView = container.querySelector('[data-testid="shipping-view"]');
    expect(shippingView).toBeTruthy();

    const confirmationView = container.querySelector('[data-testid="confirmation-view"]');
    expect(confirmationView).toBeFalsy();
  });

  it("changes to confirmation view when navigate event is received", async () => {
    const page = await newSpecPage({
      components: [App],
      html: "<app-component></app-component>",
    });

    await page.waitForChanges();

    const navigateEvent = new CustomEvent("navigate", {
      detail: "confirmation",
      bubbles: true,
      composed: true
    });

    const navigateSpy = jest.fn();
    page.root.addEventListener("navigate", navigateSpy);

    page.root.dispatchEvent(navigateEvent);
    await page.waitForChanges();

    const container = page.root.shadowRoot.querySelector('[data-testid="app-container"]');
    expect(container).toBeTruthy();

    const cartView = container.querySelector('[data-testid="cart-view"]');
    expect(cartView).toBeFalsy();

    const shippingView = container.querySelector('[data-testid="shipping-view"]');
    expect(shippingView).toBeFalsy();

    const confirmationView = container.querySelector('[data-testid="confirmation-view"]');
    expect(confirmationView).toBeTruthy();
  });

  it("maintains current view when invalid navigation event is received", async () => {
    const page = await newSpecPage({
      components: [App],
      html: "<app-component></app-component>",
    });

    await page.waitForChanges();

    const navigateEvent = new CustomEvent("navigate", {
      detail: "invalid-view",
      bubbles: true,
      composed: true
    });

    const navigateSpy = jest.fn();
    page.root.addEventListener("navigate", navigateSpy);

    page.root.dispatchEvent(navigateEvent);
    await page.waitForChanges();

    const container = page.root.shadowRoot.querySelector('[data-testid="app-container"]');
    expect(container).toBeTruthy();

    const cartView = container.querySelector('[data-testid="cart-view"]');
    expect(cartView).toBeTruthy();

    const shippingView = container.querySelector('[data-testid="shipping-view"]');
    expect(shippingView).toBeFalsy();

    const confirmationView = container.querySelector('[data-testid="confirmation-view"]');
    expect(confirmationView).toBeFalsy();
  });
}); 