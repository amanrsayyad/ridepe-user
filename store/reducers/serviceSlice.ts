// store/serviceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ServiceState {
  selectedService: "Outstation" | "Intercity";
}

const initialState: ServiceState = {
  selectedService: "Outstation", // Default value
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setSelectedService: (
      state,
      action: PayloadAction<"Outstation" | "Intercity">
    ) => {
      state.selectedService = action.payload;
    },
  },
});

export const { setSelectedService } = serviceSlice.actions;
export default serviceSlice.reducer;
