jest.mock("../../assets/icons/coupon.svg", () => "mocked-coupon.svg");
jest.mock("../../assets/icons/trash.svg", () => "mocked-trash.svg");
jest.mock("../../services/cart-state", () => ({
  cartState: {
    setCartTotal: jest.fn(),
    getCartTotal: jest.fn(),
  }
}));

import { h } from '@stencil/core';
import { newSpecPage } from "@stencil/core/testing";
import { Coupon, CouponData } from "./coupon";
import { Button } from "../button/button";
import { Shimmer } from "../shimmer/shimmer";

describe("coupon-component", () => {
  const mockCoupon: CouponData = {
    id: "TEST123",
    name: "SUMMER2024",
    label: "Summer Sale",
    discount: {
      type: "percentage",
      amount: "10"
    }
  };

  const createPage = async (props = {}) => {
    const page = await newSpecPage({
      components: [Coupon, Button, Shimmer],
      template: () => <coupon-component></coupon-component>,
      supportsShadowDom: true,
    });
    
    Object.assign(page.rootInstance, {
      total: 100,
      coupon: mockCoupon,
      isLoading: false,
      ...props
    });
    
    await page.waitForChanges();
    return page;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loading state", () => {
    it("renders shimmer components when loading", async () => {
      const page = await createPage({ isLoading: true });
      const loadingContainer = page.root.shadowRoot.querySelector('[data-testid="coupon-loading"]');
      
      expect(loadingContainer).toBeTruthy();
      expect(loadingContainer.children.length).toBe(2);
      
      Array.from(loadingContainer.children).forEach(container => {
        const shimmer = container.querySelector("shimmer-component");
        expect(shimmer).toBeTruthy();
        
        const shimmerContainer = shimmer.querySelector('[data-testid="shimmer-container"]') as HTMLElement;
        expect(shimmerContainer).toBeTruthy();
        expect(shimmerContainer.style.height).toBe("10px");
        expect(shimmerContainer.style.width).toBe("100%");
      });
    });
  });

  describe("coupon display", () => {
    it("renders coupon information correctly", async () => {
      const page = await createPage();
      const couponContainer = page.root.shadowRoot.querySelector('[data-testid="coupon"]');
      
      expect(couponContainer).toBeTruthy();
      
      const couponName = page.root.shadowRoot.querySelector('[data-testid="coupon-name"]');
      expect(couponName.textContent.trim()).toBe("SUMMER2024");
      
      const couponDiscount = page.root.shadowRoot.querySelector('[data-testid="coupon-discount"]');
      expect(couponDiscount.textContent.trim()).toBe("SAR -10.00");
    });

    it("handles percentage discount correctly", async () => {
      const page = await createPage();
      const discount = page.root.shadowRoot.querySelector('[data-testid="coupon-discount"]');
      expect(discount).toBeTruthy();
      expect(discount.textContent.trim()).toBe("SAR -10.00");
    });

    it("handles fixed discount correctly", async () => {
      const fixedCoupon = {
        ...mockCoupon,
        discount: {
          type: "fixed",
          amount: "20"
        }
      };

      const page = await createPage({ coupon: fixedCoupon });
      const discount = page.root.shadowRoot.querySelector('[data-testid="coupon-discount"]');
      expect(discount).toBeTruthy();
      expect(discount.textContent.trim()).toBe("SAR -20.00");
    });

    it("doesn't render when no coupon is provided", async () => {
      const page = await createPage({ coupon: undefined });
      expect(page.root.shadowRoot.querySelector('[data-testid="coupon"]')).toBeFalsy();
    });

    it("handles invalid total value", async () => {
      const page = await createPage({ total: NaN });
      const couponContainer = page.root.shadowRoot.querySelector('[data-testid="coupon"]');
      expect(couponContainer).toBeTruthy();
      
      const discount = page.root.shadowRoot.querySelector('[data-testid="coupon-discount"]');
      expect(discount.textContent.trim()).toBe("SAR -0.00");
    });
  });

  describe("interactions", () => {
    it("emits delete event when delete button is clicked", async () => {
      const page = await createPage();
      const deleteSpy = jest.fn();
      
      page.root.addEventListener("delete", (e: CustomEvent) => {
        deleteSpy(e.detail);
      });

      const deleteButton = page.root.shadowRoot.querySelector('[data-testid="coupon-delete-button"]');
      expect(deleteButton).toBeTruthy();
      
      deleteButton.dispatchEvent(new Event('click'));
      await page.waitForChanges();
      
      expect(deleteSpy).toHaveBeenCalledWith("TEST123");
    });
  });
});