import { Toast } from "toastify-react-native";
import { dbSqliteService } from "../db/db";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { IGestionesRealizas } from "@/models/IGestiones";
import { gestionesKeys } from "./gestionesKeys";

export const useGuardarGestion = (
  mutationOptions?: UseMutationOptions<
    unknown,
    any,
    IGestionesRealizas,
    unknown
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dbSqliteService.guardarGestiones,
    onSuccess: () => {
      Toast.success("Gestion guardada");
      queryClient.invalidateQueries({ queryKey: gestionesKeys.todos() });
    },
    onError: (error: any) => {
      Toast.error(error.message);
    },

    ...mutationOptions,
  });
};
