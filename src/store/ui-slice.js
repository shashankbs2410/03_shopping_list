import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    isSignedIn: false,
    profile: [],
    showProducts: false,
    activePage: 1,
    itemsFetched: false,
  },
  reducers: {
    toggleCart(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    signInChange(state) {
      state.isSignedIn = !state.isSignedIn;
    },
    setProfile(state, action) {
      state.profile = action.payload;
    },
    toggleShowProducts(state) {
      state.showProducts = !state.showProducts;
      state.itemsFetched = true;
    },
    changePage(state, action) {
      state.activePage = action.payload;
    },
    shoppingCompleteHandler(state) {
      state.showProducts = !state.showProducts;
      state.itemsFetched = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
