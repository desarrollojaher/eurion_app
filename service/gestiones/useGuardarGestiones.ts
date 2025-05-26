import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { Toast } from "toastify-react-native";
import { IGestionesCelularCrear } from "@/models/IGestionesCelular";
import { gestionesKeys } from "./gestionesKeys";

export const useGuardarGestiones = (
  mutationOptios?: UseMutationOptions<
    unknown,
    any,
    IGestionesCelularCrear,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dbSqliteService.guargarGestionesCelular,
    onSuccess: () => {
      Toast.success("Gestion guardada");
      queryClient.invalidateQueries({ queryKey: gestionesKeys.todos() });
    },
    onError: (error: any) => {
      Toast.error(error.message);
    },
    ...mutationOptios,
  });
};
