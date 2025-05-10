import { Component, h, Prop } from "@stencil/core";

export interface CartItemData {
  id: string;
  label: string;
  thumbnail: string;
  qty: number;
  price: {
    currency: string;
    amount: number;
  };
}


@Component({
  tag: "cart-item-component",
  styleUrl: "cart-item.css",
  shadow: true
})
export class CartItem {
  @Prop() item: CartItemData;


  private formatPrice(price: number) {  
    return `SAR ${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    }).format(price)}`;
  }


  render() {
    if (!this.item) {
      return (
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-center py-2" data-testid="cart-item">
          <div class="col-span-2 flex items-center gap-2" data-testid="cart-item-info">
            <div class="w-16 h-16 flex-shrink-0">
              <div class="w-full h-full rounded-full bg-gray-200"></div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="h-3 w-24 bg-gray-200 rounded"></div>
              <div class="h-2 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div class="flex items-center justify-center">
            <div class="h-4 w-8 bg-gray-200 rounded"></div>
          </div>
          <div class="flex items-center justify-end pr-2">
            <div class="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      );
    }

    const { label, thumbnail, qty, price } = this.item;
    const totalPrice = price.amount * qty;

    return (
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 items-center py-2" data-testid="cart-item">
        <div class="col-span-2 flex items-center gap-2" data-testid="cart-item-info">
          <div class="w-16 h-16 flex-shrink-0">
            <img 
              src={thumbnail} 
              alt={label} 
              class="w-full h-full object-cover rounded-full"
              loading="lazy"
              data-testid="cart-item-image"
            />
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-xs font-medium text-primary underline whitespace-pre-wrap break-words" data-testid="cart-item-label">{label}</span>
            <span class="text-[10px] text-label-gray" data-testid="cart-item-unit-price">
              {this.formatPrice(price.amount)}
            </span>
          </div>
        </div>

        <div class="flex items-center justify-center text-text" data-testid="cart-item-quantity">
          <span class="text-sm font-medium whitespace-pre-wrap break-words">{qty}</span>
        </div>

        <div class="flex items-center justify-end pr-2" data-testid="cart-item-total">
          <div class="text-sm font-medium text-gray-900 whitespace-pre-wrap break-words">
            {this.formatPrice(totalPrice)}
          </div>
        </div>
      </div>
    );
  }
}
