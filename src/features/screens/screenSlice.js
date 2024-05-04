import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//const token = "NC1mZXJyZXJzb2ZpYS5mQGdtYWlsLmNvbQ==";

export const getAll = createAsyncThunk(
  "screens/get",
  async ({ params, token }) => {
    try {
      const request = await axios.get(
        `https://challenge-front-7fw1.onrender.com/display?${params}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await request.data;
      console.log("RESP del get", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const create = createAsyncThunk(
  "screens/create",
  async ({ data, token }) => {
    try {
      const request = await axios.post(
        `https://challenge-front-7fw1.onrender.com/display`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await request.data;
      console.log("RESP del CREATE", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getById = createAsyncThunk(
  "screens/getDetail",
  async ({ id, token }) => {
    try {
      const request = await axios.get(
        `https://challenge-front-7fw1.onrender.com/display/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await request.data;
      console.log("RESP del get", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const update = createAsyncThunk(
  "screens/update",
  async ({ id, data, token }) => {
    try {
      const request = await axios.put(
        `https://challenge-front-7fw1.onrender.com/display/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await request.data;
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteScreen = createAsyncThunk(
  "screens/delete",
  async ({ id, token }) => {
    console.log(id, token);
    try {
      const request = await axios.delete(
        `https://challenge-front-7fw1.onrender.com/display/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await request.data;
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const screenSlice = createSlice({
  name: "screens",
  initialState: {
    loading: false,
    screens: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.loading = true;
        state.screens = [];
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.loading = false;
        state.screens = action.payload.data;
        state.error = null;
      })
      .addCase(getAll.rejected, (state, action) => {
        state.loading = false;
        state.screens = [];
        state.error = action.error.message;
      })
      .addCase(getById.pending, (state) => {
        state.loading = true;
        state.screens = [];
        state.error = null;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.loading = false;
        state.screens = action.payload.data;
        state.error = null;
      })
      .addCase(getById.rejected, (state, action) => {
        state.loading = false;
        state.screens = [];
        state.error = action.error.message;
      })
      .addCase(create.pending, (state) => {
        state.loading = true;
        state.screens = [];
        state.error = null;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.loading = false;
        state.screens = action.payload.data;
        state.error = null;
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.screens = [];
        state.error = action.error.message;
      })
      .addCase(update.pending, (state) => {
        state.loading = true;
        state.screens = [];
        state.error = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.screens = action.payload.data;
        state.error = null;
      })
      .addCase(update.rejected, (state, action) => {
        state.loading = false;
        state.screens = [];
        state.error = action.error.message;
      })
      .addCase(deleteScreen.pending, (state) => {
        state.loading = true;
        state.screens = [];
        state.error = null;
      })
      .addCase(deleteScreen.fulfilled, (state, action) => {
        state.loading = false;
        state.screens = action.payload.data;
        state.error = null;
      })
      .addCase(deleteScreen.rejected, (state, action) => {
        state.loading = false;
        state.screens = [];
        state.error = action.error.message;
      });
  },
});

export default screenSlice.reducer;
