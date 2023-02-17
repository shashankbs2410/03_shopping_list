import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [], totalQuantity: 0, totalAmount: 0 },
  reducers: {
    addToCart(state, action) {
      state.totalAmount += action.payload.price;
      state.totalQuantity++;
      const id = action.payload.id;
      const size = action.payload.size;
      const existingItem = state.cart.find(
        (item) => item.id === id && item.size === size
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      state.totalQuantity--;
      const id = action.payload.id;
      const size = action.payload.size;
      const item = state.cart.find(
        (item) => item.id === id && item.size === size
      );
      state.totalAmount -= item.price;
      if (item.quantity === 1) {
        state.cart = state.cart.filter(
          (item) => item.id !== id || item.size !== size
        );
      } else {
        item.quantity--;
      }
    },
    clearCart(state) {
      state.cart = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    increaseQuantity(state, action) {
      const id = action.payload.id;
      const size = action.payload.size;
      const existingItem = state.cart.find(
        (item) => item.id === id && item.size === size
      );
      existingItem.quantity++;
      state.totalAmount += action.payload.price;
      state.totalQuantity++;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
