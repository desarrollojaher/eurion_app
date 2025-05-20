import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { Toast } from "toastify-react-native";
import { verificacionesKeys } from "../Verificaciones/verificacionesKeys";
import { subirInformacionKeys } from "./subirInformacionKeys";
import { IActualizarVerificacion } from "@/models/IVerificaciones";

export const useSubirGestionEliminarVerificacion = (
  mutationOptios?: UseMutationOptions<
    unknown,
    any,
    IActualizarVerificacion,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dbSqliteService.actualizarVerificaciones,
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
