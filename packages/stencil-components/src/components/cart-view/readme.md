# cart-view-component



<!-- Auto Generated Below -->


## Events

| Event      | Description | Type                  |
| ---------- | ----------- | --------------------- |
| `navigate` |             | `CustomEvent<string>` |


## Dependencies

### Used by

 - [app-component](../app)

### Depends on

- [title-component](../title)
- [breadcrumbs-component](../breadcrumbs)
- [shimmer-component](../shimmer)
- [cart-component](../cart)
- [coupon-input](../coupon-input)
- [coupon-component](../coupon)
- [cart-total](../cart-total)
- [button-component](../button)

### Graph
```mermaid
graph TD;
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
  app-component --> cart-view-component
  style cart-view-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
