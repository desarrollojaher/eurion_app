import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="recibos-principal" options={{ headerShown: false }} />
      <Stack.Screen name="recibos-detalles" options={{ headerShown: false }} />
    </Stack>
  );
}
