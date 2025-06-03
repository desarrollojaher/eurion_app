import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { sincronizacionKeys } from "./sincronizacionKey";

export const useEliminarBitacora = (
  mutationOptios?: UseMutationOptions<unknown, any, any, unknown>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dbSqliteService.eliminarBitacoraSincronizacion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sincronizacionKeys.fechas(),
      });
    },
    ...mutationOptios,
  });
};
