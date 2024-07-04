import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  product: null,
  loading: false,
  error: null,
};

// Helper function to get token from state
const getAuthToken = (getState) => {
  const state = getState();
  return state.auth.token;
};
// function for fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/api/products");
    return response.data;
  }
);

// function for fetch product with the product id
export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/products/${id}`
    );
    return response.data;
  }
);
//  function for add product with the token
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.userInfo?.token;

    if (!token) {
      return rejectWithValue("Token not found");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
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

// function for update product with the token and id of the product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, ...product }, { getState, rejectWithValue }) => {
    const token = getAuthToken(getState);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${id}`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

// function for delete product with the token and id of the product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.userInfo?.token;

    if (!token) {
      return rejectWithValue("Token not found");
    }

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Return the product ID if deletion is successful
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

// product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});
export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
