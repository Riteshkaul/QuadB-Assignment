import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";

// This is the store where slices is store
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
