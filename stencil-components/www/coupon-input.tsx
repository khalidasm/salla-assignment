// src/components/coupon-input/coupon-input.tsx
import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "coupon-input",
  styleUrl: "./coupon-input.css",
  shadow: true,
  formAssociated: true
})
export class CouponInput {
  @Prop({mutable: true}) isLoading: boolean = false;
  @Prop({mutable: true}) value: string = "";
  @Prop() placeholder: string = "Insert Code";
  @Prop() disabled: boolean = false;
  @Event() applyCoupon: EventEmitter<string>;
  @Event() inputChange: EventEmitter<string>;
  @Prop({mutable: true}) isCouponApplied: boolean = false;

  private handleInputChange = (e: Event) => {
    this.inputChange.emit((e.target as HTMLInputElement).value);
  }

  private handleApplyCoupon = () => {
    this.applyCoupon.emit(this.value);
  }

  render() {
    if(this.isLoading) {
      return <div class="flex justify-between items-center" data-testid="coupon-input-loading">
        <div class="w-[40%]">
          <shimmer-component height="10px" width="100%"></shimmer-component>
        </div>
        <div class="w-[15%]">
          <shimmer-component height="10px" width="100%"></shimmer-component>
        </div>
      </div>
    }

    if(this.isCouponApplied) {
      return null
    }
    
    return (
      <div class="flex items-center justify-between" data-testid="coupon-input">
        <div>
          <span class="text-[12px] text-black font-bold">Have a coupon?</span>
        </div>
        <div class="flex gap-2 w-fit bg-bg/50 p-[4px] border border-bg rounded-[6px]">
          <input
            value={this.value}
            onInput={this.handleInputChange}
            class="text-[10px] text-text focus:outline-none focus:ring-0 focus:border-none border-none px-1"
            placeholder={this.placeholder}
            disabled={this.disabled}
            data-testid="coupon-input-field"
          />
          <button-component
            variant="sm"
            class="text-[10px]"
            isLoading={this.isLoading}
            onClick={this.handleApplyCoupon}
            isDisabled={this.isLoading || this.disabled}
            data-testid="coupon-apply-button"
          >
            Apply
          </button-component>
        </div>
      </div>
    );
  }
}