import { Component, h, Prop, State, Listen } from "@stencil/core";
import { cartState } from "../../services/cart-state";

@Component({
  tag: "cart-total",
  styleUrl: "cart-total.css",
  shadow: true,
})
export class CartTotal {
  @Prop() isLoading: boolean = false;
  @Prop() showSimpleTotal: boolean = false;
  @State() total: number = 0;
  @State() shippingTotal: number = 0;

  componentWillLoad() {
    this.updateTotals();
  }

  @Listen('cartStateChange', { target: 'window' })
  onCartStateChange() {
    this.updateTotals();
  }

  private updateTotals() {
    this.total = cartState.getCartTotal();
    const shipping = cartState.getSelectedShipping();
    this.shippingTotal = shipping?.fees?.amount ? Number(shipping.fees.amount) : 0;
  }

  private formatPrice(price: number) {
    const safePrice = Number(price) || 0;
    return `SAR ${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    }).format(safePrice)}`;
  }

  private calculateTotal(): number {
    return this.total + this.shippingTotal;
  }

  render() {
    if (this.isLoading) {
      return (
        <div class="flex justify-between items-center" data-testid="loading-container">
          <div class="w-[40%]">
            <shimmer-component height="10px" width="100%"></shimmer-component>
          </div>
          <div class="w-[15%]">
            <shimmer-component height="10px" width="100%"></shimmer-component>
          </div>
        </div>
      );
    }

    if (this.showSimpleTotal) {
      return (
        <div class="flex flex-col gap-3" data-testid="simple-total">
          <div class="flex items-center justify-between">
            <span class="text-[14px] text-text font-bold">Total</span>
            <span class="text-[14px] text-text font-bold">
              {this.formatPrice(this.total)}
            </span>
          </div>
        </div>
      );
    }

    const shipping = cartState.getSelectedShipping();

    return (
      <div class="flex flex-col gap-3" data-testid="detailed-total">
        <div class="flex items-center justify-between">
          <span class="text-[14px] text-text font-bold">Cart Total</span>
          <span class="text-[14px] text-text font-bold">
            {this.formatPrice(this.total)}
          </span>
        </div>
        {shipping && (
          <div class="flex items-center justify-between">
            <span class="text-[14px] text-text font-bold">Shipping Fee</span>
            <span class="text-[14px] text-text font-bold">
              {this.formatPrice(this.shippingTotal)}
            </span>
          </div>
        )}
        <div class="flex items-center justify-between">
          <span class="text-[14px] text-text font-bold">Total</span>
          <span class="text-[14px] text-text font-bold">
            {this.formatPrice(this.calculateTotal())}
          </span>
        </div>
      </div>
    );
  }
}