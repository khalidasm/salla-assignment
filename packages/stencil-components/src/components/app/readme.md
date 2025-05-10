# app-component



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [container-component](../container)
- [cart-view-component](../cart-view)
- [shipping-view-component](../shipping-view)
- [confirmation-view-component](../confirmation-view)

### Graph
```mermaid
graph TD;
  app-component --> container-component
  app-component --> cart-view-component
  app-component --> shipping-view-component
  app-component --> confirmation-view-component
  cart-view-component --> title-component
  cart-view-component --> breadcrumbs-component
  cart-view-component --> shimmer-component
  cart-view-component --> cart-component
  cart-view-component --> coupon-input
  cart-view-component --> coupon-component
  cart-view-component --> cart-total
  cart-view-component --> button-component
  cart-component --> shimmer-component
  cart-component --> cart-item-component
  coupon-input --> shimmer-component
  coupon-input --> button-component
  button-component --> shimmer-component
  coupon-component --> shimmer-component
  coupon-component --> button-component
  cart-total --> shimmer-component
  shipping-view-component --> title-component
  shipping-view-component --> breadcrumbs-component
  shipping-view-component --> shimmer-component
  shipping-view-component --> button-component
  shipping-view-component --> shipping-list-component
  shipping-view-component --> cart-total
  shipping-list-component --> shimmer-component
  confirmation-view-component --> title-component
  style app-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
