import {
  IVerificacionDetalles,
  IVerificacionDetallesParams,
} from "@/models/IVerificaciones";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { verificacionesKeys } from "./verificacionesKeys";
import { dbSqliteService } from "../db/db";

export const useObtenerVerificacionesDetalles = (
  params: IVerificacionDetallesParams,
  queryOptions?: Omit<
    UseQueryOptions<
      IVerificacionDetalles,
      unknown,
      IVerificacionDetalles,
      ReturnType<(typeof verificacionesKeys)["detalle"]>
    >,
    "queryKey"
  >,
) => {
  const obtenerDetalles = async () => {
    return await dbSqliteService.obtenerVerificacionesDetalles(params);
  };

  return useQuery({
    queryKey: ["verificaciones", "detalle", params],
    queryFn: obtenerDetalles,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
