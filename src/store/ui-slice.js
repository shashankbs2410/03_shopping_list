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
    isEnteringAddress: false,
    isPaying: false,
    isPayed: false,
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
      state.showProducts = false;
      state.itemsFetched = false;
    },
    toggleIsEnteringAddress(state) {
      state.isEnteringAddress = !state.isEnteringAddress;
    },
    toggleIsPaying(state) {
      state.isPaying = !state.isPaying;
    },
    toggleIsPayed(state) {
      state.isPayed = !state.isPayed;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
