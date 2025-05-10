# cart-component



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type             | Default |
| ----------- | ------------ | ----------- | ---------------- | ------- |
| `isLoading` | `is-loading` |             | `boolean`        | `false` |
| `items`     | `items`      |             | `CartItemData[]` | `[]`    |


## Dependencies

### Used by

 - [cart-view-component](../cart-view)

### Depends on

- [shimmer-component](../shimmer)
- [cart-item-component](../cart-item)

### Graph
```mermaid
graph TD;
  cart-component --> shimmer-component
  cart-component --> cart-item-component
  cart-view-component --> cart-component
  style cart-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
