import { useStorageState } from "@/service/Auth/useStorageStore";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "expo-router"; // Para manejar la navegación
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext<{
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// Hook para acceder a la sesión
export function useSession() {
  const value = useContext(AuthContext);
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const router = useRouter();

  const signIn = async (token: string) => {
    // Guardar token en sessionStorage
    try {
      await AsyncStorage.setItem("token", token);
      setSession(token);
      router.replace("/principal");
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    // Eliminar el token de sessionStorage
    try {
      await AsyncStorage.removeItem("token");
      setSession(null);
      router.replace("/auth");
    } catch (error) {
      console.log(error);
    }

    // Opcionalmente redirigir al login
  };

  const handleToken = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        router.replace("/principal");
      } else {
        router.replace("/auth");
      }
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  useEffect(() => {
    handleToken();
  }, [handleToken]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
