import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "api",
  initialState: {
    baseUrl: "http://192.168.63.31:5000", // Replace with your actual base URL
  },
  reducers: {},
});

export const selectApiBaseUrl = (state: any) => state.api.baseUrl;

export default apiSlice.reducer;
