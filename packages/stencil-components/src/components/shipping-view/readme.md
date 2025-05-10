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
- [button-component](../button)
- [shipping-list-component](../shipping-list)
- [cart-total](../cart-total)

### Graph
```mermaid
graph TD;
  shipping-view-component --> title-component
  shipping-view-component --> breadcrumbs-component
  shipping-view-component --> shimmer-component
  shipping-view-component --> button-component
  shipping-view-component --> shipping-list-component
  shipping-view-component --> cart-total
  button-component --> shimmer-component
  shipping-list-component --> shimmer-component
  cart-total --> shimmer-component
  app-component --> shipping-view-component
  style shipping-view-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
