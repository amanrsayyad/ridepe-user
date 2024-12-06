import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./reducers/apiSlice";
import locationReducer from "./reducers/locationSlice";
import serviceReducer from "./reducers/serviceSlice";

const store = configureStore({
  reducer: {
    api: apiReducer,
    location: locationReducer,
    service: serviceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/* custom middleware here if any */),
    devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
