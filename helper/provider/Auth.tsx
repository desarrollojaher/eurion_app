import { useContext, createContext, useEffect, useCallback, useState } from "react";
import { useRouter } from "expo-router"; // Para manejar la navegación
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUsuario } from "@/models/IUsuario";
import { jwtDecode } from "jwt-decode";
import { dbSqliteService } from "@/service/db/db";

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
  const [usuario, setUsuario] = useState<IUsuario | null>(null);
  const router = useRouter();

  const signIn = async (token: string) => {
    // Guardar token en sessionStorage
    try {
      await AsyncStorage.setItem("token", token);
      const decodedUser = jwtDecode(token) as IUsuario;
      setUsuario(decodedUser);
      router.replace("/principal");
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    // Eliminar el token de sessionStorage
    try {
      setUsuario(null);
      await AsyncStorage.removeItem("token");
      await dbSqliteService.eliminarBitacoraSincronizacion();
      router.replace("/auth");
    } catch (error) {
      console.log(error);
    }

    // Opcionalmente redirigir al login
  };

  const handleToken = useCallback(async () => {
    if (token) {
      const decodedUser = jwtDecode(token) as IUsuario;
      setUsuario(decodedUser);
      router.replace("/principal");
    } else {
      setUsuario(null);
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
        usuario
        // session,
        // isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
