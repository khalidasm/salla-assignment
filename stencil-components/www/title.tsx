import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "title-component",
  shadow: true,
})
export class Title {
  @Prop() text: string;

  render() {
    const { text } = this;
    return (
      <h1 class="font-bold text-[18px] text-primary">
        {text}
      </h1>
    );
  }
}
