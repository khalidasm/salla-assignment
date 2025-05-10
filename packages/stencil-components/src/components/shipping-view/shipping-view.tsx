import { Component, Event, EventEmitter, h, State, Listen } from "@stencil/core";
import StoreLogo from "../../assets/icons/logo.svg";
import ChevLeft from "../../assets/icons/chevleft.svg";
import { cartState } from "../../services/cart-state";
import { CartItemData, CouponData } from "../../components";

export interface ShippingOption {
  id: string;
  name: string;
  label: string;
  logo: string;
  fees: {
    currency: string;
    amount: number;
  };
}

@Component({
  tag: "shipping-view-component",
  styleUrl: "shipping-view.css",
  shadow: true,
})
export class ShippingView {
  @State() isLoading: boolean = true;
  @Event({
    eventName: 'navigate',
    composed: true,
    bubbles: true,
  }) navigate: EventEmitter<string>;
  @State() shippingOptions: ShippingOption[] = [];
  @State() selectedShippingOption: ShippingOption | undefined;
  @State() cartItems: CartItemData[] = [];
  @State() appliedCoupon: CouponData | undefined;

  constructor() {
    this.onRouteClick = this.onRouteClick.bind(this);
  }

  @Listen('routeClick')
  onRouteClick(e: CustomEvent<string>) {
    this.navigate.emit(e.detail);
  }

  private onChevLeftClick() {
    this.navigate.emit('cart');
  }

  private async getShippingOptions() {
    const response = await fetch(
      "https://681ee34ac1c291fa663564c9.mockapi.io/shipping"
    );
    this.shippingOptions = await response.json();
  }

  private handleShippingOptionSelect(e: CustomEvent<ShippingOption>) {
    this.selectedShippingOption = e.detail;
    cartState.setSelectedShipping(e.detail);
  }

  async componentDidLoad() {
    try {
      await this.getShippingOptions();
      this.selectedShippingOption = cartState.getSelectedShipping();
      const response = await fetch(
        "https://681e74a9c1c291fa66341f40.mockapi.io/items"
      );
      this.cartItems = await response.json();
      this.appliedCoupon = cartState.getSelectedCoupon();
    } catch (error) {
      console.error("Error fetching shipping options", error);
    } finally {
      this.isLoading = false;
    }
  }

  render() {
    return (
      <div class="flex flex-col gap-5">
        <div class="flex flex-row items-center gap-5">
          <img src={StoreLogo} alt="store-logo" class="w-10 h-10" />
          <div class="flex flex-col">
            <title-component text="Khalid's Store" />
            <breadcrumbs-component
              items={["cart", "shipping"]}
              onRouteClick={this.onRouteClick}
            />
          </div>
        </div>
        {this.isLoading ? (
          <div class="flex items-center gap-3">
            <div class="w-[15%]">
              <shimmer-component height="10px" width="100%"></shimmer-component>
            </div>
            <div class="w-[85%]">
              <shimmer-component height="1px" width="100%"></shimmer-component>
            </div>
          </div>
        ) : (
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <div class="w-fit flex items-center gap-3">
                <button-component
                  variant="icon"
                  onClick={() => this.onChevLeftClick()}
                >
                  <img src={ChevLeft} alt="chevron-left" class="w-6" />
                </button-component>
                <span class="text-[14px] text-primary font-bold leading-none flex items-center">
                  Shipping
                </span>
              </div>
              <div class="w-full">
                <div class="h-[2px] w-full bg-primary"></div>
              </div>
            </div>
          </div>
        )}
        <shipping-list-component
          shippingOptions={this.shippingOptions}
          onShippingOptionSelected={(e) => this.handleShippingOptionSelect(e)}
          isLoading={this.isLoading}
        />
        <div class="h-[1px] w-full bg-bg" />
        <cart-total
          isLoading={this.isLoading}
          showSimpleTotal={!!cartState.getSelectedShipping()?.id ? false : true}
        />
        <button-component
          showShimmer={this.isLoading}
          isLoading={this.isLoading}
          variant="normal"
          isDisabled={!this.selectedShippingOption}
          onClick={() => this.navigate.emit("confirmation")}
        >
          Proceed to payment
        </button-component>
      </div>
    );
  }
}
