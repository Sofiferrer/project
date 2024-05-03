import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const request = await axios.post(
      "https://challenge-front-7fw1.onrender.com/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await request.data;
    localStorage.setItem("token", response.token);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.user = undefined;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if (action.error.message === "Request failed with status code 401") {
          state.error = "Access denied | Invalid credentials";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default authSlice.reducer;
