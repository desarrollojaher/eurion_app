import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { IRecibosObtener } from "@/models/IRecibo";
import { Toast } from "toastify-react-native";
import { recibosKeys } from "./recibosKeys";
import { dbSqliteService } from "../db/db";

export const useRecibosEliminar = (
  mutationOptions?: UseMutationOptions<unknown, any, IRecibosObtener, unknown>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (idRecibo: IRecibosObtener) => {
      return await dbSqliteService.eliminarRecibos(idRecibo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recibosKeys.todos() });
      Toast.success("Recibo Eliminado");
    },
    onError: () => {
      Toast.error("Error al eliminar el recibo");
    },
    ...mutationOptions,
  });
};
