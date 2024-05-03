import { configureStore } from "@reduxjs/toolkit";
import screensReducer from "../features/screens/screenSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    screens: screensReducer,
    auth: authReducer,
  },
});
