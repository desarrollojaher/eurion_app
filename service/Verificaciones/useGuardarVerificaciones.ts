import { IVerificacionesGuardar } from "@/models/IVerificaciones";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { Toast } from "toastify-react-native";
import { verificacionesKeys } from "./verificacionesKeys";

export const useGuardarVerificaciones = (
  mutationOptios?: UseMutationOptions<
    unknown,
    any,
    IVerificacionesGuardar,
    unknown
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dbSqliteService.guardarGestionesVerificacion,
    onSuccess: () => {
      Toast.success("Verificacion guardada");
      queryClient.invalidateQueries({ queryKey: verificacionesKeys.todos() });
    },
    onError: (error: any) => {
      Toast.error(error.message);
    },
    ...mutationOptios,
  });
};
