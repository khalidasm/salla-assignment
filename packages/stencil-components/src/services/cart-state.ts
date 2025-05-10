import { CouponData } from '../components';
import { ShippingOption } from '../components/shipping-view/shipping-view';
import { CartItemData } from '../components/cart-item/cart-item';

class CartStateService {
  private static instance: CartStateService;
  private selectedCoupon: CouponData | undefined;
  private couponInputValue: string = '';
  private selectedShipping: ShippingOption | undefined;
  private cartTotal: number = 0;
  private originalSubtotal: number = 0;


  static getInstance(): CartStateService {
    if (!CartStateService.instance) {
      CartStateService.instance = new CartStateService();
    }
    return CartStateService.instance;
  }

  setSelectedCoupon(coupon: CouponData | undefined) {
    this.selectedCoupon = coupon;
  }

  getSelectedCoupon(): CouponData | undefined {
    return this.selectedCoupon;
  }

  setCouponInputValue(value: string) {
    this.couponInputValue = value;
  }

  getCouponInputValue(): string {
    return this.couponInputValue;
  }

  setSelectedShipping(shipping: ShippingOption | undefined) {
    this.selectedShipping = shipping;
    window.dispatchEvent(new CustomEvent('cartStateChange'));
  }

  getSelectedShipping(): ShippingOption | undefined {
    return this.selectedShipping;
  }

  setCartTotal(total: number) {
    this.cartTotal = Number(total) || 0;
    window.dispatchEvent(new CustomEvent('cartStateChange'));
  }

  getCartTotal(): number {
    return Number(this.cartTotal) || 0;
  }

  setOriginalSubtotal(total: number) {
    this.originalSubtotal = Number(total) || 0;
  }

  getOriginalSubtotal(): number {
    return Number(this.originalSubtotal) || 0;
  }

  getDiscountedTotal(items: CartItemData[], coupon?: CouponData): number {
    const total = items.reduce((sum, item) => {
      const itemTotal = Number(item.price.amount) * Number(item.qty);
      return sum + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
    
    if (!coupon) return total;
    
    if (coupon.discount.type === 'percentage') {
      const discount = total * (Number(coupon.discount.amount) / 100);
      return total - discount;
    }
    
    return total - Number(coupon.discount.amount);
  }
}

export const cartState = CartStateService.getInstance(); 