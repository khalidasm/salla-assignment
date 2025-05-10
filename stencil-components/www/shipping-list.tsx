import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    State,
    Listen,
} from "@stencil/core";
import { ShippingOption } from "../shipping-view/shipping-view";
import { cartState } from "../../services/cart-state";

@Component({
    tag: "shipping-list-component",
    styleUrl: "shipping-list.css",
    shadow: true,
})
export class ShippingList {
    @Prop() shippingOptions: ShippingOption[] = [];
    @State() selectedOption: string = "";
    @Event() shippingOptionSelected: EventEmitter<ShippingOption>;
    @Prop() isLoading: boolean = false;

    componentWillLoad() {
        const selectedShipping = cartState.getSelectedShipping();
        this.selectedOption = selectedShipping?.id || "";
    }

    @Listen("cartStateChange", { target: "window" })
    onCartStateChange() {
        const selectedShipping = cartState.getSelectedShipping();
        this.selectedOption = selectedShipping?.id || "";
    }

    private handleOptionSelect(option: ShippingOption) {
        if (!option || !this.shippingOptions.some((o) => o.id === option.id)) {
            return;
        }

        this.selectedOption = option.id;

        this.shippingOptionSelected.emit(option);

        cartState.setSelectedShipping(option);
    }

    render() {
        if (this.isLoading) {
            return (
                <div
                    class="flex flex-col gap-4"
                    data-testid="shipping-list-loading"
                >
                    <shimmer-component
                        height="300px"
                        width="100%"
                    ></shimmer-component>
                </div>
            );
        }

        if (!this.shippingOptions || this.shippingOptions.length === 0) {
            return null;
        }

        return (
            <div class="flex flex-col gap-4" data-testid="shipping-list">
                {this.shippingOptions.map((option) => (
                    <div
                        key={option.id}
                        class="flex items-center justify-between"
                        onClick={() => this.handleOptionSelect(option)}
                        data-testid={`shipping-option-${option.id}`}
                        role="button"
                        tabindex="0"
                        aria-selected={this.selectedOption === option.id}
                    >
                        <div class="flex flex-row items-center gap-3">
                            <div
                                class={`w-5 h-5 border rounded-full flex items-center justify-center ${
                                    this.selectedOption === option.id
                                        ? "border-3 border-secondary-border"
                                        : "border border-bg bg-bg"
                                }`}
                                data-testid={`shipping-option-radio-${option.id}`}
                                role="radio"
                                aria-checked={this.selectedOption === option.id}
                            >
                                {this.selectedOption === option.id && (
                                    <div
                                        class="w-full h-full bg-primary rounded-full"
                                        data-testid={`shipping-option-selected-${option.id}`}
                                    ></div>
                                )}
                            </div>
                            <img
                                src={option.logo}
                                alt={option.label}
                                class="w-12 h-12 object-contain"
                                data-testid={`shipping-option-logo-${option.id}`}
                            />
                            <div class="flex flex-col">
                                <span
                                    class="text-[12px] text-text"
                                    data-testid={`shipping-option-label-${option.id}`}
                                >
                                    {option.label}
                                </span>
                            </div>
                        </div>
                        <span
                            class="text-[12px] text-text font-bold"
                            data-testid={`shipping-option-price-${option.id}`}
                        >
                            {option.fees.currency} +{option.fees.amount}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
}
