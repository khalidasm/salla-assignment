import { newSpecPage } from "@stencil/core/testing";
import { CartItem } from "./cart-item";

describe("cart-item-component", () => {
  const mockItem = {
    id: "1",
    label: "Test Product",
    thumbnail: "test-image.jpg",
    qty: 2,
    price: {
      currency: "SAR",
      amount: 99.99
    }
  };

  it("renders cart item with correct data", async () => {
    const page = await newSpecPage({
      components: [CartItem],
      html: "<cart-item-component></cart-item-component>",
    });

    page.root.item = mockItem;
    await page.waitForChanges();

    const cartItem = page.root.shadowRoot.querySelector('[data-testid="cart-item"]');
    expect(cartItem).toBeTruthy();

    const image = cartItem.querySelector('[data-testid="cart-item-image"]');
    expect(image).toBeTruthy();
    expect(image.getAttribute("src")).toBe("test-image.jpg");
    expect(image.getAttribute("alt")).toBe("Test Product");

    const label = cartItem.querySelector('[data-testid="cart-item-label"]');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe("Test Product");

    const unitPrice = cartItem.querySelector('[data-testid="cart-item-unit-price"]');
    expect(unitPrice).toBeTruthy();
    expect(unitPrice.textContent).toBe("SAR 99.99");

    const quantity = cartItem.querySelector('[data-testid="cart-item-quantity"]');
    expect(quantity).toBeTruthy();
    expect(quantity.textContent.trim()).toBe("2");

    const total = cartItem.querySelector('[data-testid="cart-item-total"]');
    expect(total).toBeTruthy();
    expect(total.textContent.trim()).toBe("SAR 199.98");
  });

  it("handles zero quantity", async () => {
    const page = await newSpecPage({
      components: [CartItem],
      html: "<cart-item-component></cart-item-component>",
    });

    page.root.item = { ...mockItem, qty: 0 };
    await page.waitForChanges();

    const quantity = page.root.shadowRoot.querySelector('[data-testid="cart-item-quantity"]');
    expect(quantity.textContent.trim()).toBe("0");

    const total = page.root.shadowRoot.querySelector('[data-testid="cart-item-total"]');
    expect(total.textContent.trim()).toBe("SAR 0.00");
  });

  it("handles decimal prices", async () => {
    const page = await newSpecPage({
      components: [CartItem],
      html: "<cart-item-component></cart-item-component>",
    });

    page.root.item = { ...mockItem, price: { currency: "SAR", amount: 99.999 } };
    await page.waitForChanges();

    const unitPrice = page.root.shadowRoot.querySelector('[data-testid="cart-item-unit-price"]');
    expect(unitPrice.textContent).toBe("SAR 100.00");

    const total = page.root.shadowRoot.querySelector('[data-testid="cart-item-total"]');
    expect(total.textContent.trim()).toBe("SAR 200.00");
  });

  it("handles long labels", async () => {
    const longLabel = "This is a very long product label that should wrap to multiple lines";
    const page = await newSpecPage({
      components: [CartItem],
      html: "<cart-item-component></cart-item-component>",
    });

    page.root.item = { ...mockItem, label: longLabel };
    await page.waitForChanges();

    const label = page.root.shadowRoot.querySelector('[data-testid="cart-item-label"]');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe(longLabel);
    expect(label.className).toContain("whitespace-pre-wrap");
    expect(label.className).toContain("break-words");
  });
}); 