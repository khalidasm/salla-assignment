# cart-total



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description | Type      | Default |
| ----------------- | ------------------- | ----------- | --------- | ------- |
| `isLoading`       | `is-loading`        |             | `boolean` | `false` |
| `showSimpleTotal` | `show-simple-total` |             | `boolean` | `false` |


## Dependencies

### Used by

 - [cart-view-component](../cart-view)
 - [shipping-view-component](../shipping-view)

### Depends on

- [shimmer-component](../shimmer)

### Graph
```mermaid
graph TD;
  cart-total --> shimmer-component
  cart-view-component --> cart-total
  shipping-view-component --> cart-total
  style cart-total fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
