import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/helper/provider/Auth";
import CargaPantalla from "@/components/commons/animation/CargaPantalla";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [cargaInicial, setCargaInicial] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const handleSesion = useCallback(async () => {
    try {
      setCargaInicial(true);
      const token = await await AsyncStorage.getItem("token");
      console.log(token);
      setCargaInicial(false);
    } catch (e) {
      console.log(e);
      setCargaInicial(false);
    }
  }, [router]);

  useEffect(() => {
    if (loaded) {
      handleSesion();
      SplashScreen.hideAsync();
    }
  }, [handleSesion, loaded]);

  if (!loaded) {
    return null;
  }

  if (cargaInicial) {
    return <CargaPantalla />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
      {/* <StatusBar style="auto" /> */}
    </ThemeProvider>
  );
}
