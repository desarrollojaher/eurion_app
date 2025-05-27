import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { Toast } from "toastify-react-native";
import { ISubirInformacionActualizaciones } from "@/models/ISubirInformacion";
import { subirInformacionKeys } from "./subirInformacionKeys";

export const useSubirGestionEliminarActualizaciones = (
  mutationOptios?: UseMutationOptions<
    unknown,
    any,
    ISubirInformacionActualizaciones,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dbSqliteService.eliminarActualizacionesDireccion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: subirInformacionKeys.actualizaciones(),
      });
      Toast.success("Gestion Eliminada");
    },
    onError: (error: any) => {
      Toast.error(error.message);
    },
    ...mutationOptios,
  });
};
