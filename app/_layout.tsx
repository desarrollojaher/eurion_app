import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useCallback, useEffect, useState } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SessionProvider } from "@/helper/provider/Auth";
import CargaPantalla from "@/components/commons/animation/CargaPantalla";
import ToastManager from "toastify-react-native";
import { SQLiteProvider } from "expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authApi } from "@/api/auth";
import NetInfo from "@react-native-community/netinfo";
import { Slot } from "expo-router";
import { StatusBar } from "react-native";
// import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { DATABASE_NAME, db, expoDBInstance } from "@/helper/db/db";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// export const DATABASE_NAME = "cobranza";
// const expoDB = openDatabaseSync(DATABASE_NAME);
// export const db = drizzle(expoDB, { logger: true });

export default function RootLayout() {
  const [cargaInicial, setCargaInicial] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // query client de tanskquery
  const queryClient = new QueryClient();

  // inicializa el drizzle con la base de datos sqlite
  useDrizzleStudio(expoDBInstance);

  // llamado a la base de datos sqlite
  const { success } = useMigrations(db, migrations);

  const verificarInternetSincronizacion = useCallback(async () => {
    const valor = await NetInfo.fetch();
    return valor.isConnected ?? false;
    // todo: verificar si no tiene internet deja pasar caso contrario si tiene internet verifica la hora si
    // ya paso y no a sincronizado y tiene internet salta la alerta de sicronizacion caso contrario realiza lo primero
  }, []);

  const handleSesion = useCallback(async () => {
    try {
      setCargaInicial(true);
      const token = await AsyncStorage.getItem("token");

      const isConnected = await verificarInternetSincronizacion();
      if (token) {
        if (isConnected) {
          try {
            const tokenValidacion = await authApi.ping();
            if (tokenValidacion && tokenValidacion.token) {
              setToken(tokenValidacion.token);
            } else {
              setToken(null);
            }
          } catch (e: any) {
            if (e.message === "Network Error") {
              setToken(token);
            }
          }
        } else {
          // si no tiene internet no hace la validacion del token y le deja ingresar con el token que esa
          setToken(token);
        }
      } else {
        setToken(null);
      }
      setCargaInicial(false);
    } catch (e) {
      setToken(null);
      console.log(e);
      setCargaInicial(false);
    }
  }, [verificarInternetSincronizacion]);

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
            <QueryClientProvider client={queryClient}>
              <Slot />
              <ToastManager
                showCloseIcon={true}
                animationStyle="fade"
                showProgressBar={false}
                position={"bottom"}
              />
            </QueryClientProvider>
          </SessionProvider>
        </SQLiteProvider>
      </Suspense>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        translucent={false}
      />
    </ThemeProvider>
  );
}
