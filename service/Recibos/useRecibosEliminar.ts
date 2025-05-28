import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { Toast } from "toastify-react-native";
import { IRecibosEliminarParams } from "@/models/IRecibo";
import { recibosKeys } from "./recibosKeys";

export const useRecibosEliminar = (
  mutationOptios?: UseMutationOptions<
    unknown,
    any,
    IRecibosEliminarParams,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dbSqliteService.eliminarRecibos,
    onSuccess: () => {
      Toast.success("Recibos Eliminados");
      queryClient.invalidateQueries({ queryKey: recibosKeys.subirRecibos() });
    },
    onError: (error: any) => {
      Toast.error(error.message);
    },
    ...mutationOptios,
  });
};
