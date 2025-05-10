import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "shimmer-component",
  shadow: false,
  styleUrl: "./shimmer.css",
})
export class Shimmer {
  @Prop() height: string = "100%";
  @Prop() width: string = "100%";

  render() {
    return (
        <div
          class="relative overflow-hidden bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"
          style={{
            height: this.height,
            width: this.width,
          }}
          data-testid="shimmer-container"
        >
          <div 
            class="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white to-transparent"
            data-testid="shimmer-animation"
          />
        </div>
    );
  }
} 