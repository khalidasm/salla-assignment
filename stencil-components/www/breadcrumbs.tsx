import { Component, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "breadcrumbs-component",
  shadow: true,
  styleUrl: "./breadcrumbs.css",
})
export class Breadcrumbs {
  @Prop({ mutable: true }) items: string[] = [];
  @Event({
    eventName: 'routeClick',
    composed: true,
    bubbles: true,
  }) routeClick: EventEmitter<string>;

  private handleClick(item: string, isLast: boolean) {
    if (!isLast) {
      this.routeClick.emit(item);
    }
  }

  render() {
    return (
      <nav class="flex items-center gap-1 text-sm" data-testid="breadcrumbs">
        {this.items.map((item, index) => {
          const isLast = index === this.items.length - 1;
          return (
            <div key={item} class="flex items-center" data-testid={`breadcrumb-item-${index}`}>
              {index > 0 && <span class="mx-1 text-gray-400" data-testid={`breadcrumb-separator-${index}`}>/</span>}
              <span
                onClick={() => this.handleClick(item, isLast)}
                class={`text-12px capitalize ${
                  isLast
                    ? "text-text cursor-default"
                    : "text-label-gray underline cursor-pointer"
                }`}
                data-testid={`breadcrumb-link-${index}`}
              >
                {item}
              </span>
            </div>
          );
        })}
      </nav>
    );
  }
}
