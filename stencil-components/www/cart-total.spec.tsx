import { newSpecPage } from "@stencil/core/testing";
import { CartTotal } from "./cart-total";
import { cartState } from "../../services/cart-state";

jest.mock("../../services/cart-state", () => ({
  cartState: {
    getCartTotal: jest.fn(),
    getSelectedShipping: jest.fn(),
  },
}));

describe("cart-total", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", async () => {
    const page = await newSpecPage({
      components: [CartTotal],
      html: "<cart-total></cart-total>",
    });

    page.root.isLoading = true;
    await page.waitForChanges();

    const loadingContainer = page.root.shadowRoot.querySelector('[data-testid="loading-container"]');
    expect(loadingContainer).toBeTruthy();
    expect(loadingContainer.className).toContain("flex");
    expect(loadingContainer.className).toContain("justify-between");

    const shimmerComponents = loadingContainer.querySelectorAll("shimmer-component");
    expect(shimmerComponents.length).toBe(2);
  });

  it("renders simple total", async () => {
    const mockGetCartTotal = jest.fn().mockReturnValue(100);
    cartState.getCartTotal = mockGetCartTotal;
    
    const page = await newSpecPage({
      components: [CartTotal],
      html: "<cart-total></cart-total>",
    });

    page.root.showSimpleTotal = true;
    await page.waitForChanges();

    const simpleTotal = page.root.shadowRoot.querySelector('[data-testid="simple-total"]');
    expect(simpleTotal).toBeTruthy();
    expect(simpleTotal.className).toContain("flex");
    expect(simpleTotal.className).toContain("flex-col");

    const totalText = simpleTotal.querySelector("span:last-child");
    expect(totalText.textContent).toBe("SAR 100.00");
  });

  it("renders detailed total with shipping", async () => {
    const mockGetCartTotal = jest.fn().mockReturnValue(100);
    const mockGetSelectedShipping = jest.fn().mockReturnValue({
      fees: { amount: 10 }
    });
    
    cartState.getCartTotal = mockGetCartTotal;
    cartState.getSelectedShipping = mockGetSelectedShipping;

    const page = await newSpecPage({
      components: [CartTotal],
      html: "<cart-total></cart-total>",
    });

    await page.waitForChanges();

    const detailedTotal = page.root.shadowRoot.querySelector('[data-testid="detailed-total"]');
    expect(detailedTotal).toBeTruthy();
    expect(detailedTotal.className).toContain("flex");
    expect(detailedTotal.className).toContain("flex-col");

    const spans = detailedTotal.querySelectorAll("span");
    expect(spans[1].textContent).toBe("SAR 100.00"); // Cart Total
    expect(spans[3].textContent).toBe("SAR 10.00"); // Shipping Fee
    expect(spans[5].textContent).toBe("SAR 110.00"); // Total
  });

  it("renders detailed total without shipping", async () => {
    const mockGetCartTotal = jest.fn().mockReturnValue(100);
    const mockGetSelectedShipping = jest.fn().mockReturnValue(null);
    
    cartState.getCartTotal = mockGetCartTotal;
    cartState.getSelectedShipping = mockGetSelectedShipping;

    const page = await newSpecPage({
      components: [CartTotal],
      html: "<cart-total></cart-total>",
    });

    await page.waitForChanges();

    const detailedTotal = page.root.shadowRoot.querySelector('[data-testid="detailed-total"]');
    expect(detailedTotal).toBeTruthy();

    const spans = detailedTotal.querySelectorAll("span");
    expect(spans[1].textContent).toBe("SAR 100.00"); // Cart Total
    expect(spans[3].textContent).toBe("SAR 100.00"); // Total
    expect(spans.length).toBe(4); // No shipping fee span
  });
}); 