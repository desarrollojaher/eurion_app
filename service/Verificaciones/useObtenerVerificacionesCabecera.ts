import {
  IVerificacionesCabecera,
  IVerificacionesCabeceraParams,
} from "@/models/IVerificaciones";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { verificacionesKeys } from "./verificacionesKeys";
import { dbSqliteService } from "../db/db";

export const useObtenerVerificacionesCabecera = (
  params: IVerificacionesCabeceraParams,
  queryOptions?: UseQueryOptions<
    IVerificacionesCabecera[],
    unknown,
    IVerificacionesCabecera[],
    ReturnType<(typeof verificacionesKeys)["cabecera"]>
  >,
) => {
  const obtenerCabecera = async () => {
    return await dbSqliteService.obtenerVerificacionesCabecera(params);
  };

  return useQuery({
    queryKey: ["verificaciones", "cabecera", params],
    queryFn: obtenerCabecera,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
