import { IRecibos } from "@/models/IRecibo";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { Toast } from "toastify-react-native";

export const useRecibosGuardar = (
  useMutationOptions?: UseMutationOptions<unknown, any, IRecibos[], unknown>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dbSqliteService.insertarRecibos,
    onSuccess: () => {
      Toast.success("Recibo guardado");
    },
    ...useMutationOptions,
  });
};
