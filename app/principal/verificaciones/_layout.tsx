import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="verificaciones-principal"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="verifcaciones-detalles"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
