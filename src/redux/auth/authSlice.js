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
    return response;
  } catch (error) {
    return error.message;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.clear();
  } catch (error) {
    return error;
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
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = undefined;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.auth.user?.token;
export default authSlice.reducer;
