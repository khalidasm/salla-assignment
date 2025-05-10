import { Component, h, State, Event, EventEmitter } from "@stencil/core";
import StoreLogo from "../../assets/icons/logo.svg";
import { CartItemData, CouponData } from "../../components";
import { cartState } from "../../services/cart-state";

@Component({
  tag: "cart-view-component",
  styleUrl: "cart-view.css",
  shadow: true,
})
export class CartView {
  @State() items: CartItemData[] = [];
  @State() coupons: CouponData[] = [];
  @State() isLoading: boolean = true;
  @State() couponInput: string = "";
  @State() appliedCoupon: CouponData | undefined;
  @State() currentTotal: number = 0;
  @State() inValidCoupon: boolean = false;
  @Event() navigate: EventEmitter<string>;

  private async getCartItems() {
    const response = await fetch(
      "https://681e74a9c1c291fa66341f40.mockapi.io/items"
    );
    this.items = await response.json();
  }

  private async getCoupons() {
    const response = await fetch(
      "https://681e74a9c1c291fa66341f40.mockapi.io/coupon"
    );
    this.coupons = await response.json();
  }

  async componentDidLoad() {
    try {
      await Promise.all([this.getCartItems(), this.getCoupons()]);
      const savedCoupon = cartState.getSelectedCoupon();
      const savedInput = cartState.getCouponInputValue();
      this.appliedCoupon = savedCoupon;
      this.couponInput = savedInput;
      this.updateCartTotal();
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      this.isLoading = false;
    }
  }

  private onRouteClick(e: CustomEvent<string>) {
    this.navigate.emit(e.detail);
  }

  private handleInputChange(e: CustomEvent<string>) {
    this.couponInput = e.detail;
    cartState.setCouponInputValue(e.detail);
  }

  private handleApplyCoupon(e: CustomEvent<string>) {
    const coupon = this.coupons.find(c => c.name.toLowerCase() === e.detail.toLowerCase());
    if (coupon) {
      this.appliedCoupon = coupon;
      cartState.setSelectedCoupon(coupon);
      cartState.setCouponInputValue(e.detail);
      const subtotal = this.calculateSubtotal();
      const finalTotal = cartState.getDiscountedTotal(this.items, coupon);
      cartState.setCartTotal(finalTotal);
      cartState.setOriginalSubtotal(subtotal);
      this.currentTotal = finalTotal;
      this.inValidCoupon = false;
    } else {
      this.inValidCoupon = true;
    }
  }

  private handleDeleteCoupon() {
    this.appliedCoupon = undefined;
    this.couponInput = '';
    cartState.setSelectedCoupon(undefined);
    cartState.setCouponInputValue('');
    this.updateCartTotal();
  }

  private calculateSubtotal(): number {
    return this.items.reduce((total, item) => {
      const itemTotal = Number(item.price.amount) * Number(item.qty);
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
  }

  private updateCartTotal() {
    const subtotal = this.calculateSubtotal();
    const finalTotal = this.appliedCoupon 
      ? cartState.getDiscountedTotal(this.items, this.appliedCoupon)
      : subtotal;
    cartState.setCartTotal(finalTotal);
    cartState.setOriginalSubtotal(subtotal);
    this.currentTotal = finalTotal;
  }

  private handleProceedToShipping() {
    this.navigate.emit('shipping');
  }

  render() {
    return (
      <div class="flex flex-col gap-5" data-testid="cart-view">
        <div class="flex flex-row items-center gap-5" data-testid="header">
          <img src={StoreLogo} alt="store-logo" class="w-10 h-10" loading="lazy" data-testid="store-logo" />
          <div class="flex flex-col" data-testid="title-section">
            <title-component text="Khalid's Store" />
            <breadcrumbs-component
              items={["cart"]}
              onRouteClick={this.onRouteClick}
            />
          </div>
        </div>
        {this.isLoading ? (
          <div class="flex items-center gap-3" data-testid="loading-container">
            <div class="w-[15%]">
              <shimmer-component height="10px" width="100%"></shimmer-component>
            </div>
            <div class="w-[85%]">
              <shimmer-component height="1px" width="100%"></shimmer-component>
            </div>
          </div>
        ) : (
          <div class="flex flex-col gap-4" data-testid="cart-content">
            <div class="flex items-center gap-3" data-testid="cart-header">
              <div class="w-fit">
                <span class="text-[14px] text-primary font-bold">Cart</span>
              </div>
              <div class="w-full">
                <div class="h-[2px] w-full bg-primary"></div>
              </div>
            </div>
          </div>
        )}
        <cart-component items={this.items} isLoading={this.isLoading} />
        <coupon-input
          isLoading={this.isLoading}
          isCouponApplied={!!this.appliedCoupon}
          value={this.couponInput}
          placeholder="Enter coupon code"
          onApplyCoupon={(e) => this.handleApplyCoupon(e)}
          onInputChange={(e) => this.handleInputChange(e)}
        />
        {
          this.inValidCoupon && (
            <div class="flex flex-col gap-2" data-testid="invalid-coupon-message">
              <span class="text-[14px] text-danger">Invalid coupon code</span>
            </div>
          )
        }
        <coupon-component
          coupon={this.appliedCoupon}
          isLoading={this.isLoading}
          total={this.calculateSubtotal()}
          onDelete={() => this.handleDeleteCoupon()}
        />
        <cart-total
          isLoading={this.isLoading}
          showSimpleTotal={true}
        />
        <button-component
          showShimmer={this.isLoading}
          isDisabled={this.isLoading}
          variant="normal"
          onClick={() => this.handleProceedToShipping()}
          data-testid="proceed-button"
        >
          Proceed to shipping
        </button-component>
      </div>
    );
  }
}
