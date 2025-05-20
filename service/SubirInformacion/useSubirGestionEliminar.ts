import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { Toast } from "toastify-react-native";
import { ISubirInformacionEliminar } from "@/models/ISubirInformacion";
import { verificacionesKeys } from "../Verificaciones/verificacionesKeys";
import { subirInformacionKeys } from "./subirInformacionKeys";

export const useSubirGestionEliminar = (
  mutationOptios?: UseMutationOptions<
    unknown,
    any,
    ISubirInformacionEliminar,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dbSqliteService.eliminarInformacionGestionada,
    onSuccess: () => {
      Toast.success("Gestion Eliminada");
      queryClient.invalidateQueries({
        queryKey: verificacionesKeys.cabeceras(),
      });
      queryClient.invalidateQueries({
        queryKey: subirInformacionKeys.subirDatos(),
      });
    },
    onError: (error: any) => {
      Toast.error(error.message);
    },
    ...mutationOptios,
  });
};
