import { newSpecPage } from "@stencil/core/testing";
import { Cart } from "./cart";
import { CartItem } from "../cart-item/cart-item";

describe("cart-component", () => {
  const mockItems = [
    {
      id: "1",
      label: "Test Product 1",
      thumbnail: "test-image-1.jpg",
      qty: 2,
      price: {
        currency: "SAR",
        amount: 99.99
      }
    },
    {
      id: "2",
      label: "Test Product 2",
      thumbnail: "test-image-2.jpg",
      qty: 1,
      price: {
        currency: "SAR",
        amount: 49.99
      }
    }
  ];

  it("renders loading state", async () => {
    const page = await newSpecPage({
      components: [Cart],
      html: "<cart-component></cart-component>",
    });

    page.root.isLoading = true;
    await page.waitForChanges();

    const loadingContainer = page.root.shadowRoot.querySelector('[data-testid="cart-loading"]');
    expect(loadingContainer).toBeTruthy();
    expect(loadingContainer.querySelector('shimmer-component')).toBeTruthy();
  });

  it("renders empty cart state", async () => {
    const page = await newSpecPage({
      components: [Cart],
      html: "<cart-component></cart-component>",
    });

    page.root.items = [];
    await page.waitForChanges();

    const emptyContainer = page.root.shadowRoot.querySelector('[data-testid="cart-empty"]');
    expect(emptyContainer).toBeTruthy();
    expect(emptyContainer.textContent).toContain("No items in cart");
  });

  it("renders cart items with separators", async () => {
    const page = await newSpecPage({
      components: [Cart, CartItem],
      html: "<cart-component></cart-component>",
    });

    page.root.items = mockItems;
    await page.waitForChanges();

    const cartContainer = page.root.shadowRoot.querySelector('[data-testid="cart"]');
    expect(cartContainer).toBeTruthy();

    const itemsContainer = cartContainer.querySelector('[data-testid="cart-items"]');
    expect(itemsContainer).toBeTruthy();

    const cartItems = itemsContainer.querySelectorAll('cart-item-component');
    expect(cartItems.length).toBe(2);

    const separators = itemsContainer.querySelectorAll('[data-testid="cart-item-separator"]');
    expect(separators.length).toBe(1); // Only one separator between two items
  });

  it("renders single item without separator", async () => {
    const page = await newSpecPage({
      components: [Cart, CartItem],
      html: "<cart-component></cart-component>",
    });

    page.root.items = [mockItems[0]];
    await page.waitForChanges();

    const itemsContainer = page.root.shadowRoot.querySelector('[data-testid="cart-items"]');
    expect(itemsContainer).toBeTruthy();

    const cartItems = itemsContainer.querySelectorAll('cart-item-component');
    expect(cartItems.length).toBe(1);

    const separators = itemsContainer.querySelectorAll('[data-testid="cart-item-separator"]');
    expect(separators.length).toBe(0);
  });
}); 