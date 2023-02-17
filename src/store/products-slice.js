import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    pages: [],
    freeShippingFiltered: false,
  },
  reducers: {
    setProducts(state, action) {
      const inputProducts = action.payload;
      const updatedProducts = inputProducts.map((product) => ({
        ...product,
        showOptions: false,
        quantities: product.availableSizes.map((size) => ({
          size: size,
          quantity: 0,
        })),
      }));
      state.products = updatedProducts;
      state.filteredProducts = updatedProducts;
    },
    increaseQuantity(state, action) {
      const id = action.payload.id;
      const size = action.payload.size;
      const quantityOfObjectSize = state.products
        .find((product) => product.id === id)
        .quantities.find((element) => element.size === size);
      quantityOfObjectSize.quantity++;

      const quantityOfFilteredObjectSize = state.filteredProducts
        .find((product) => product.id === id)
        .quantities.find((element) => element.size === size);
      quantityOfFilteredObjectSize.quantity++;
    },
    decreaseQuantity(state, action) {
      const id = action.payload.id;
      const size = action.payload.size;
      const quantityOfObjectSize = state.products
        .find((product) => product.id === id)
        .quantities.find((element) => element.size === size);
      quantityOfObjectSize.quantity--;

      const quantityOfFilteredObjectSize = state.filteredProducts
        .find((product) => product.id === id)
        .quantities.find((element) => element.size === size);
      quantityOfFilteredObjectSize.quantity--;
    },
    toggleOptions(state, action) {
      const id = action.payload.id;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );
      existingProduct.showOptions = !existingProduct.showOptions;

      const existingFilteredProduct = state.filteredProducts.find(
        (product) => product.id === id
      );
      existingFilteredProduct.showOptions =
        !existingFilteredProduct.showOptions;
    },
    toggleFreeShippingFilter(state) {
      if (!state.freeShippingFiltered) {
        state.filteredProducts = state.products.filter(
          (item) => item.isFreeShipping === true
        );
        state.freeShippingFiltered = true;
      } else {
        state.filteredProducts = state.products;
        state.freeShippingFiltered = false;
      }
    },
    sortByRelevance(state) {
      state.filteredProducts = state.filteredProducts.sort(
        (a, b) => a.id - b.id
      );
    },
    sortByPriceLowToHigh(state) {
      state.filteredProducts = state.filteredProducts.sort(
        (a, b) => a.price - b.price
      );
    },
    sortByPriceHighToLow(state) {
      state.filteredProducts = state.filteredProducts.sort(
        (a, b) => b.price - a.price
      );
    },
    setPages(state) {
      let pages = [];
      let noOfPages = 0;

      if (state.filteredProducts.length % 5 === 0) {
        noOfPages = Number(Math.floor(state.filteredProducts.length / 5));
      } else {
        noOfPages = Number(Math.floor(state.filteredProducts.length / 5)) + 1;
      }

      for (let i = 1; i <= noOfPages; i++) {
        pages[i - 1] = i;
      }
      state.pages = pages;
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;

export const fetchProducts = async (dispatch) => {
  const response = await fetch("https://exp.kkant.repl.co/products.json");
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await response.json();
  dispatch(productsActions.setProducts(data.products));
  dispatch(uiActions.toggleShowProducts());
};
