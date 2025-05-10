import { Component, h, Prop } from "@stencil/core";
import { CartItemData } from "../cart-item/cart-item";

@Component({
  tag: "cart-component",
  styleUrl: "cart.css",
  shadow: true
})
export class Cart {
  @Prop() items: CartItemData[] = [];
  @Prop() isLoading: boolean = false;

  render() {
    if (this.isLoading) {
      return (
        <div class="w-full" data-testid="cart-loading">
          <shimmer-component height="300px" width="100%"></shimmer-component>
        </div>
      );
    }

    return (
      <div class="bg-secondary rounded-[10px] p-[10px] border border-secondary-border space-y-5" data-testid="cart">
        {this.items.length > 0 ? (
          <div class="flex flex-col gap-5" data-testid="cart-items">
            {this.items.map((item, index) => [
              <cart-item-component item={item} />,
              index < this.items.length - 1 && (
                <div
                  key={`separator-${item.id}`}
                  class="h-[1px] w-full bg-secondary-border"
                  data-testid="cart-item-separator"
                ></div>
              ),
            ])}
          </div>
        ) : (
          <div class="flex flex-col gap-5" data-testid="cart-empty">
            <span class="text-[14px] text-text font-bold">
              No items in cart
            </span>
          </div>
        )}
      </div>
    );
  }
}
