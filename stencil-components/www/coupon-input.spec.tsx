import { newSpecPage } from "@stencil/core/testing";
import { CouponInput } from "./coupon-input";
import { Button } from "../button/button";

describe("coupon-input", () => {
  it("renders loading state", async () => {
    const page = await newSpecPage({
      components: [CouponInput, Button],
      html: "<coupon-input is-loading></coupon-input>",
    });

    const loadingContainer = page.root.shadowRoot.querySelector('[data-testid="coupon-input-loading"]');
    expect(loadingContainer).toBeTruthy();
    expect(loadingContainer.querySelectorAll("shimmer-component").length).toBe(2);
  });

  it("renders input field with default props", async () => {
    const page = await newSpecPage({
      components: [CouponInput, Button],
      html: "<coupon-input></coupon-input>",
    });

    const container = page.root.shadowRoot.querySelector('[data-testid="coupon-input"]');
    expect(container).toBeTruthy();

    const input = container.querySelector('[data-testid="coupon-input-field"]');
    expect(input).toBeTruthy();
    expect(input.getAttribute("placeholder")).toBe("Insert Code");
    expect(input.getAttribute("disabled")).toBeFalsy();
    expect(input.getAttribute("value")).toBe("");

    const button = container.querySelector('[data-testid="coupon-apply-button"]');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe("Apply");
  });

  it("renders with custom placeholder", async () => {
    const page = await newSpecPage({
      components: [CouponInput, Button],
      html: '<coupon-input placeholder="Enter code"></coupon-input>',
    });

    const input = page.root.shadowRoot.querySelector('[data-testid="coupon-input-field"]');
    expect(input.getAttribute("placeholder")).toBe("Enter code");
  });

  it("handles input changes", async () => {
    const page = await newSpecPage({
      components: [CouponInput, Button],
      html: "<coupon-input></coupon-input>",
    });

    const input = page.root.shadowRoot.querySelector('[data-testid="coupon-input-field"]');
    const inputSpy = jest.fn();
    page.root.addEventListener("inputChange", (e: CustomEvent) => inputSpy(e.detail));

    input.setAttribute("value", "TEST123");
    input.dispatchEvent(new Event("input"));
    await page.waitForChanges();

    expect(inputSpy).toHaveBeenCalledWith("TEST123");
  });

  it("handles apply coupon click", async () => {
    const page = await newSpecPage({
      components: [CouponInput, Button],
      html: "<coupon-input></coupon-input>",
    });

    const button = page.root.shadowRoot.querySelector('[data-testid="coupon-apply-button"]');
    const applySpy = jest.fn();
    page.root.addEventListener("applyCoupon", (e: CustomEvent) => applySpy(e.detail));

    page.root.value = "TEST123";
    await page.waitForChanges();

    button.dispatchEvent(new Event("click"));
    await page.waitForChanges();

    expect(applySpy).toHaveBeenCalledWith("TEST123");
  });

  it("doesn't render when coupon is applied", async () => {
    const page = await newSpecPage({
      components: [CouponInput, Button],
      html: "<coupon-input is-coupon-applied></coupon-input>",
    });

    expect(page.root.shadowRoot.querySelector('[data-testid="coupon-input"]')).toBeFalsy();
  });

  it("disables input and button when disabled prop is true", async () => {
    const page = await newSpecPage({
      components: [CouponInput, Button],
      html: "<coupon-input></coupon-input>",
    });

    page.root.disabled = true;
    await page.waitForChanges();

    const input = page.root.shadowRoot.querySelector('[data-testid="coupon-input-field"]');
    const button = page.root.shadowRoot.querySelector('[data-testid="coupon-apply-button"]');
    const nativeButton = button.shadowRoot.querySelector('button');

    expect(input.hasAttribute("disabled")).toBe(true);
    expect(nativeButton.hasAttribute("disabled")).toBe(true);
  });
}); 