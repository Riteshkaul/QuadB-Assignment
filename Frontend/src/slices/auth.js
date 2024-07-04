// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/register",
        user
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/login",
        user
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.items = [];
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        localStorage.setItem("userInfo", JSON.stringify(payload));
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        localStorage.setItem("userInfo", JSON.stringify(payload));
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
