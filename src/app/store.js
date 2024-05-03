import { configureStore } from "@reduxjs/toolkit";
import screensReducer from "../features/screens/screenSlice";
export const store = configureStore({
  reducer: {
    screens: screensReducer,
  },
});
