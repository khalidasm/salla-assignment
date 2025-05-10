import { Component, h, Event, EventEmitter, Prop } from "@stencil/core";

@Component({
  tag: "button-component",
  styleUrl: "button.css",
  shadow: true,
})
export class Button {
  @Event() onClick: EventEmitter<void>;
  @Prop() variant?: "sm" | "normal" | "icon" = "normal";
  @Prop({mutable: true}) isDisabled?: boolean = false;
  @Prop({mutable: true}) isLoading?: boolean = false;
  @Prop({mutable: true}) showShimmer?: boolean = false;

  private handleClick = () => {
    if (this.onClick) {
      this.onClick.emit();
    }
  }

  render() {
    const getBaseClasses = () => {
      switch (this.variant) {
        case "icon":
          return "bg-transparent cursor-pointer";
        default:
          return "flex items-center justify-center w-full rounded-[6px] bg-[#004D5A] text-white hover:bg-[#004D5A]/80 hover:cursor-pointer transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
      }
    };

    const getSizeClasses = () => {
      switch (this.variant) {
        case "sm":
          return "h-fit text-[10px] p-[7px]";
        case "icon":
          return "h-fit !p-0 w-fit";
        default:
          return "h-[45px] text-[14px] p-[10px]";
      }
    };

    if(this.showShimmer) {
      return <shimmer-component height={this.variant === "sm" ? "20px" : "45px"} width="100%"></shimmer-component>
    }

    return (
      <button onClick={this.handleClick} class={`${getBaseClasses()} ${getSizeClasses()}`} disabled={this.isDisabled || this.isLoading}>
        {this.isLoading ? <div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <slot></slot>}
      </button>
    );
  }
}
