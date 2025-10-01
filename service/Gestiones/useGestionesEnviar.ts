import { sincronizacionApi } from "@/api/sincronizacion";
import { IGestionesRealizasEnviar } from "@/models/IGestiones";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { dbSqliteService } from "../db/db";
import { ISubirInformacion } from "@/models/ISubirInformacion";
import { subirInformacionKeys } from "../SubirInformacion/subirInformacionKeys";

export const useGestionesEnviar = (
  mutationOptions?: UseMutationOptions<
    unknown,
    any,
    ISubirInformacion,
    unknown
  >,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (gestion) => {
      const datos: IGestionesRealizasEnviar[] =
        await dbSqliteService.obtenerGestionesRealizadas(Number(gestion.id));

      return await sincronizacionApi.sinronizarGestionesEnviar(datos[0]);
    },
    onSuccess: async (data, variables, context) => {
      console.log("Gestion enviada", data);
      await dbSqliteService.actualizarGestion(Number(variables.id));
      queryClient.invalidateQueries({ queryKey: subirInformacionKeys.todos() });
      Toast.success("Gestion enviada");
    },
    onError(error: any) {
      Toast.error(error.response.data.message);
    },
    ...mutationOptions,
  });
};
