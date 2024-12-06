import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as Location from "expo-location";

export const fetchCurrentLocation = createAsyncThunk(
  "location/fetchCurrentLocation",
  async (_, thunkAPI) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission not granted");
      }

      const location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0]?.name}, ${address[0]?.city}`,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

interface LocationState {
  currentLocation: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
  selectedLocation: null;
  error: string | null;
  loading: boolean;
}

const locationSlice = createSlice({
  name: "location",
  initialState: {
    currentLocation: null,
    selectedLocation: null,
    error: null as string | null,
    loading: false,
  } as LocationState,
  reducers: {
    setSelectedLocation(state, action) {
      state.selectedLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLocation = action.payload;
      })
      .addCase(fetchCurrentLocation.rejected, (state, action) => {  
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export const { setSelectedLocation } = locationSlice.actions;
export default locationSlice.reducer;
