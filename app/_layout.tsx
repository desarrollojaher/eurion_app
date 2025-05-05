import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useCallback, useEffect, useState } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/helper/provider/Auth";
import CargaPantalla from "@/components/commons/animation/CargaPantalla";
import ToastManager from "toastify-react-native";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export const DATABASE_NAME = "cobranza";

export default function RootLayout() {
  const [cargaInicial, setCargaInicial] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // llamado a la base de datos sqlite
  const expoDB = openDatabaseSync(DATABASE_NAME);
  const db = drizzle(expoDB);
  const { success } = useMigrations(db, migrations);
  useDrizzleStudio(expoDB);

  const handleSesion = useCallback(async () => {
    try {
      setCargaInicial(true);
      const token = await AsyncStorage.getItem("token");
      setToken(token);
      setCargaInicial(false);
    } catch (e) {
      console.log(e);
      setCargaInicial(false);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      handleSesion();
      SplashScreen.hideAsync();
    }
  }, [handleSesion, loaded]);

  if (!loaded) {
    return null;
  }

  if (cargaInicial || !success) {
    return <CargaPantalla />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Suspense fallback={<CargaPantalla />}>
        <SQLiteProvider
          databaseName={DATABASE_NAME}
          options={{ enableChangeListener: true }}
          useSuspense
        >
          <SessionProvider token={token}>
            <Slot />
            <ToastManager
              showCloseIcon={true}
              animationStyle="fade"
              showProgressBar={false}
              position={"bottom"}
            />
          </SessionProvider>
        </SQLiteProvider>
      </Suspense>
      {/* <StatusBar style="auto" /> */}
    </ThemeProvider>
  );
}
