import { Component, h } from "@stencil/core";

@Component({
  tag: "container-component",
  shadow: false,
})
export class Container {
  render() {
    return (
      <div 
        class="flex flex-col w-full min-w-[calc(100vw-2rem)] md:w-[600px] md:min-w-[600px] rounded-xl p-5 gap-5 bg-white shadow-2xl"
        data-testid="container"
      >
        <slot></slot>
      </div>
    );
  }
}
