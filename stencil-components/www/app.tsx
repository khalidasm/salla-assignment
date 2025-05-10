import { Component, h, State, Listen } from "@stencil/core";

@Component({
  tag: "app-component",
  styleUrl: "app.css",
  shadow: true
})
export class App {
  @State() currentView: 'cart' | 'shipping' | 'confirmation' = 'cart';

  @Listen('navigate')
  handleNavigation(event: CustomEvent<string>) {
    const view = event.detail as 'cart' | 'shipping' | 'confirmation';
    if (['cart', 'shipping', 'confirmation'].includes(view)) {
      this.currentView = view;
    }
  }

  render() {
    return <main class="w-screen h-screen bg-[#eee] flex items-center justify-center px-5" data-testid="app-main">
      <container-component data-testid="app-container">
        {this.currentView === 'cart' && <cart-view-component data-testid="cart-view"></cart-view-component>}
        {this.currentView === 'shipping' && <shipping-view-component data-testid="shipping-view"></shipping-view-component>}
        {this.currentView === 'confirmation' && <confirmation-view-component data-testid="confirmation-view"></confirmation-view-component>}
      </container-component>
    </main>;
  }
}