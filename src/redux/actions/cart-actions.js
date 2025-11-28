// cartActions.js
import { cartApi } from "../api/cartApi";
import { store } from "../store/store";

export const cartActions = {
  handleAdd: ({ productId, size }) =>
    store.dispatch(cartApi.endpoints.addToCart.initiate({ productId, size })),

  handleRemove: (productId) =>
    store.dispatch(cartApi.endpoints.removeFromCart.initiate({ productId })),

  handleIncrease: (productId) =>
    store.dispatch(cartApi.endpoints.increaseCartItem.initiate({ productId })),

  handleDecrease: (productId) =>
    store.dispatch(cartApi.endpoints.decreaseCartItem.initiate({ productId })),

  handleClear: () => store.dispatch(cartApi.endpoints.clearCartItem.initiate()),
};
