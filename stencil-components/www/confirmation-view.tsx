import { Component, h } from "@stencil/core";
import StoreLogo from "../../assets/icons/logo.svg";

@Component({
  tag: "confirmation-view-component",
  styleUrl: "confirmation-view.css",
})
export class ConfirmationView {
  render() {
    return (
      <div class="flex flex-col items-center justify-center gap-5 w-full" data-testid="confirmation-view">
        <div class='flex flex-col items-center justify-center gap-3' data-testid="logo-section">
            <img src={StoreLogo} alt="store-logo" class="w-10 h-10" data-testid="store-logo" />
            <title-component text="Khalid's Store" />
        </div>
        <div class='flex flex-col items-center justify-center gap-3' data-testid="message-section">
            <span class='text-[38px] font-black text-text text-center sm:text-nowrap break-words sm:line-clamp-1' data-testid="confirmation-title">Payment Confirmed</span>
            <span class='text-[16px] font-normal text-label-gray text-center' data-testid="confirmation-message">Thank you for shopping!</span>
            <a href="/" class='text-[16px] font-normal !text-secondary-text text-center underline' data-testid="return-link">return to the store</a>
        </div>
      </div>
    );
  }
}
