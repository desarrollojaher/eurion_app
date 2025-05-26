import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { Toast } from "toastify-react-native";
import { IDireccionCelularGcobranza } from "@/models/IDireccionCelularGcobranza";

export const useGuardarGestionesActualizacionDireccion = (
  mutationOptios?: UseMutationOptions<
    unknown,
    any,
    IDireccionCelularGcobranza,
    unknown
  >
) => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dbSqliteService.guardarActualizacionDireccion,
    onSuccess: () => {
      Toast.success("Direccion guardada");
      //   queryClient.invalidateQueries({ queryKey: verificacionesKeys.todos() });
    },
    onError: (error: any) => {
      Toast.error(error.message);
    },
    ...mutationOptios,
  });
};
