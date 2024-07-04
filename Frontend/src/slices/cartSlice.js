import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// function for fetching cart with token
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState }) => {
    const { auth } = getState();
    console.log(auth.userInfo.token);
    const config = {
      headers: { Authorization: `Bearer ${auth.userInfo.token}` },
    };
    const { data } = await axios.get("http://localhost:5000/api/cart", config);
    console.log(`data is ${data}`);
    return data;
  }
);
// function for add to  cart with token
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.userInfo.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      console.log("Item to add:", item); // Logging the item to verify its structure

      const { data } = await axios.post(
        "http://localhost:5000/api/cart",
        item,
        config
      );

      return data;
    } catch (error) {
      if (error.response) {
        console.error("Error response data:", error.response.data); // Logging the error response
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        console.error("Network error:", error.request); // Logging network errors
        return rejectWithValue("Network error");
      } else {
        console.error("Error message:", error.message); // Logging other errors
        return rejectWithValue(error.message);
      }
    }
  }
);

// function for remove cart with the id and token
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { getState }) => {
    const { auth } = getState();
    const config = {
      headers: { Authorization: `Bearer ${auth.userInfo.token}` },
    };
    await axios.delete(`http://localhost:5000/api/cart/${id}`, config);
    return id;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  //  This all for the states
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload.items;
      })
      .addCase(fetchCart.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload.items;
      })
      .addCase(addToCart.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== payload);
      })
      .addCase(removeFromCart.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export default cartSlice.reducer;
