import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="change-language" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
