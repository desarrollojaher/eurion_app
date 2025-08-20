import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="iniciarSesion" options={{ headerShown: false }} />
      <Stack.Screen name="roles" options={{ headerShown: false }} />
    </Stack>
  );
}
