import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="sincronizar" options={{ headerShown: false }} />
      <Stack.Screen name="verificaciones" options={{ headerShown: false }} />
    </Stack>
  );
}
