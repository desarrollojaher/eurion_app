import { useContext, createContext, useEffect, useCallback } from "react";
import { useRouter } from "expo-router"; // Para manejar la navegación
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUsuario } from "@/models/IUsuario";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<{
  signIn: (token: string) => void;
  signOut: () => void;
  usuario: IUsuario | null;
  // session?: string | null;
  // isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  usuario: null,
  // session: null,
  // isLoading: false,
});

// Hook para acceder a la sesión
export function useSession() {
  const value = useContext(AuthContext);
  return value;
}

export function SessionProvider({ children, token }: any) {
  // const [[isLoading, session], setSession] = useStorageState("session");
  const router = useRouter();

  const signIn = async (token: string) => {
    // Guardar token en sessionStorage
    try {
      await AsyncStorage.setItem("token", token);
      // setSession(token);
      router.replace("/principal");
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    // Eliminar el token de sessionStorage
    try {
      await AsyncStorage.removeItem("token");
      // setSession(null);
      router.replace("/auth");
    } catch (error) {
      console.log(error);
    }

    // Opcionalmente redirigir al login
  };

  const handleToken = useCallback(async () => {
    if (token) {
      router.replace("/principal");
    } else {
      router.replace("/auth");
    }
  }, [router, token]);

  useEffect(() => {
    handleToken();
  }, [handleToken]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        usuario: token ? (jwtDecode(token) as IUsuario) : null,
        // session,
        // isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
