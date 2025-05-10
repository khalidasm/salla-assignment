import { Component, h, Prop, Event, EventEmitter, Watch } from "@stencil/core";
import CouponIcon from "../../assets/icons/coupon.svg";
import TrashIcon from "../../assets/icons/trash.svg";
import { cartState } from "../../services/cart-state";

export interface CouponData {
  id: string;
  name: string;
  label: string;
  discount: {
    type: "percentage" | "fixed";
    amount: string;
  };
}

@Component({
  tag: "coupon-component",
  styleUrl: "coupon.css",
  shadow: true,
})
export class Coupon {
  @Prop() total: number = 0;
  @Prop() coupon: CouponData;
  @Event() delete: EventEmitter<string>;
  @Prop() isLoading: boolean = false;


  @Watch('total')
  validateTotal(newValue: number) {
    if (newValue < 0) {
      this.total = 0;
    }
  }

  private handleDelete = () => {
    if (this.coupon?.id) {
      cartState.setCartTotal(this.total);
      this.delete.emit(this.coupon.id);
    }
  }

  private formatPrice(price: number): string {
    if (isNaN(price)) {
      price = 0;
    }

    let discountAmount: number;
    if (this.coupon?.discount?.type === 'percentage') {
      discountAmount = ((this.total || 0) * price) / 100;
    } else {
      discountAmount = price;
    }

    const newTotal = (this.total || 0) - discountAmount;
    cartState.setCartTotal(newTotal);

    return `SAR -${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(discountAmount)}`;
  }

  render() {

    if (this.isLoading === true) {
      return (
        <div class="flex justify-between items-center" data-testid="coupon-loading">
          <div class="w-[40%]">
            <shimmer-component height="10px" width="100%"></shimmer-component>
          </div>
          <div class="w-[15%]">
            <shimmer-component height="10px" width="100%"></shimmer-component>
          </div>
        </div>
      );
    }

    if (!this.coupon || !this.coupon.discount || !this.coupon.discount.amount) {
      return null;
    }

    return (
      <div class="flex justify-between items-center" data-testid="coupon">
        <div class='border border-[#004D5A40] w-fit p-[6px] flex items-center gap-[10px] rounded-[6px]' data-testid="coupon-info">
          <div class="flex items-center">
            <img src={CouponIcon} alt="coupon" class="w-[16px] h-[16px] object-contain" />
          </div>
          <span class="text-[12px] text-black font-bold" data-testid="coupon-name">
            {this.coupon.name}
          </span>
          <button-component
            variant="icon"
            class="flex items-center"
            onClick={this.handleDelete}
            data-testid="coupon-delete-button"
          >
            <img src={TrashIcon} alt="trash" class="w-[16px] h-[16px] object-contain" />
          </button-component>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[12px] text-danger font-bold" data-testid="coupon-discount">
            {this.formatPrice(parseFloat(this.coupon.discount.amount))}
          </span>
        </div>
      </div>
    );
  }
}