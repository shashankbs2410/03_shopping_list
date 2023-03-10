import { configureStore } from "@reduxjs/toolkit";

import addressSlice from "./address-slice";
import cartSlice from "./cart-slice";
import productsSlice from "./products-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
  },
});

export default store;
