import { configureStore } from "@reduxjs/toolkit";
import screensReducer from "../features/screens/screenSlice";
import authReducer from "../features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  screens: screensReducer,
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whiteList: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
