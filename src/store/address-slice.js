import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    name: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  },
  reducers: {
    nameInputChange(state, action) {
      state.name = action.payload;
    },
    houseInputChange(state, action) {
      state.house = action.payload;
    },
    streetInputChange(state, action) {
      state.street = action.payload;
    },
    cityInputChange(state, action) {
      state.city = action.payload;
    },
    stateInputChange(state, action) {
      state.state = action.payload;
    },
    pincodeInputChange(state, action) {
      state.pincode = action.payload;
    },
    countryInputChange(state, action) {
      state.country = action.payload;
    },
  },
});

export const addressActions = addressSlice.actions;

export default addressSlice;
