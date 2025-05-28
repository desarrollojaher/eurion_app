import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { Toast } from "toastify-react-native";
import { IReciboEnviar } from "@/models/IRecibo";

export const useRecibosGuardar = (
  mutationOptios?: UseMutationOptions<unknown, any, IReciboEnviar, unknown>
) => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dbSqliteService.guardarRecibos,
    onSuccess: () => {
      Toast.success("recibo guardado");
      //   queryClient.invalidateQueries({ queryKey: gestionesKeys.todos() });
    },
    onError: (error: any) => {
      Toast.error(error.message);
    },
    ...mutationOptios,
  });
};
