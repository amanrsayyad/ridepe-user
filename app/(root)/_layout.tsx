import { Stack } from "expo-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/index";
import { fetchCurrentLocation } from "@/store/reducers/locationSlice";
import { useEffect } from "react";

export default function Layout() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentLocation());
  }, [dispatch]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(settings)" options={{ headerShown: false }} />
      <Stack.Screen name="find-ride" options={{ headerShown: false }} />
      <Stack.Screen
        name="confirm-ride"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
