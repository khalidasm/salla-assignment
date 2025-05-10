import { newSpecPage } from "@stencil/core/testing";
import { ShippingList } from "./shipping-list";

describe("shipping-list-component", () => {
  const mockShippingOption = {
    id: "1",
    name: "Standard",
    label: "Standard Shipping",
    logo: "standard.png",
    fees: {
      currency: "USD",
      amount: 5.99
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", async () => {
    const page = await newSpecPage({
      components: [ShippingList],
      html: "<shipping-list-component is-loading></shipping-list-component>",
    });

    const loadingContainer = page.root.shadowRoot.querySelector('[data-testid="shipping-list-loading"]');
    expect(loadingContainer).toBeTruthy();
    expect(loadingContainer.querySelector("shimmer-component")).toBeTruthy();
  });

  it("renders shipping options", async () => {
    const page = await newSpecPage({
      components: [ShippingList],
      html: "<shipping-list-component></shipping-list-component>",
    });

    page.root.shippingOptions = [mockShippingOption];
    await page.waitForChanges();

    const shippingList = page.root.shadowRoot.querySelector('[data-testid="shipping-list"]');
    expect(shippingList).toBeTruthy();

    const option = shippingList.querySelector('[data-testid="shipping-option-1"]');
    expect(option).toBeTruthy();
    expect(option.querySelector('[data-testid="shipping-option-label-1"]').textContent).toBe("Standard Shipping");
    expect(option.querySelector('[data-testid="shipping-option-price-1"]').textContent).toBe("USD +5.99");
  });

  it("emits event and updates state when option is selected", async () => {
    const page = await newSpecPage({
      components: [ShippingList],
      html: "<shipping-list-component></shipping-list-component>",
    });

    page.root.shippingOptions = [mockShippingOption];
    await page.waitForChanges();

    const eventSpy = jest.fn();
    page.root.addEventListener("shippingOptionSelected", eventSpy);

    const option = page.root.shadowRoot.querySelector('[data-testid="shipping-option-1"]');
    (option as HTMLElement).click();
    await page.waitForChanges();

    expect(eventSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: mockShippingOption
    }));
  });

  it("shows selected option styling", async () => {
    const page = await newSpecPage({
      components: [ShippingList],
      html: "<shipping-list-component></shipping-list-component>",
    });

    page.root.shippingOptions = [mockShippingOption];
    page.root.selectedOption = mockShippingOption.id;
    await page.waitForChanges();

    const option = page.root.shadowRoot.querySelector('[data-testid="shipping-option-1"]');
    const radio = option.querySelector('[data-testid="shipping-option-radio-1"]');
    const selectedDot = radio.querySelector('[data-testid="shipping-option-selected-1"]');

    expect(radio.className).toContain("border-3");
    expect(radio.className).toContain("border-secondary-border");
    expect(selectedDot).toBeTruthy();
    expect(selectedDot.className).toContain("bg-primary");
  });
}); 