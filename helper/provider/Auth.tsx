import {
  useContext,
  createContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import { useRouter } from "expo-router"; // Para manejar la navegación
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUsuario } from "@/models/IUsuario";
import { jwtDecode } from "jwt-decode";
import { dbSqliteService } from "@/service/db/db";
import { Toast } from "toastify-react-native";

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
      const decodedUser = jwtDecode(token) as IUsuario;
      if (
        decodedUser.roles.length === 1 &&
        decodedUser.roles[0] === "COBRADOR"
      ) {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("rol", decodedUser.roles[0]);
        setUsuario(decodedUser);
        router.replace("/principal/dashboard");
      } else if (decodedUser.roles.length > 1) {
        await AsyncStorage.setItem("token", token);
        setUsuario(decodedUser);
        router.replace("/auth/roles");
      } else {
        Toast.error(
          "No tiene permisos para usar la app, Comuniquese con el departamento de auditoria para que se le asigne un rol",
        );
      }
    } catch (error) {
      Toast.error(JSON.stringify(error));
      console.log(error);
    }
  };

  const signOut = async () => {
    // Eliminar el token de sessionStorage
    try {
      setUsuario(null);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("rol");
      await dbSqliteService.eliminarBitacoraSincronizacion();
      router.replace("/auth/iniciarSesion");
    } catch (error) {
      console.log(error);
    }

    // Opcionalmente redirigir al login
  };

  const handleToken = useCallback(async () => {
    const rol = await AsyncStorage.getItem("rol");
    if (token) {
      const decodedUser = jwtDecode(token) as IUsuario;
      setUsuario(decodedUser);
      if (!rol) {
        router.replace("/auth/roles");
      } else if (rol === "COBRADOR") {
        router.replace("/principal/dashboard");
      } else {
        router.replace("/principal/dashboard-administrador");
      }
    } else {
      setUsuario(null);
      router.replace("/auth/iniciarSesion");
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
        usuario,
        // session,
        // isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
