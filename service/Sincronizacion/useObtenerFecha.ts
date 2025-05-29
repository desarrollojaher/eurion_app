import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { ISincronizacion } from "@/models/ISincronizar";
import { sincronizacionKeys } from "./sincronizacionKey";

export const useObtenerFecha = (
  queryOptions?: UseQueryOptions<
    ISincronizacion,
    unknown,
    ISincronizacion,
    ReturnType<(typeof sincronizacionKeys)["fechas"]>
  >
) => {
  const obtenerFechaSincronizacion = async () => {
    return await dbSqliteService.obtenerUltimaSincronizacion();
  };

  return useQuery({
    queryKey: ["sincronizacion", "fechas"],
    queryFn: obtenerFechaSincronizacion,
    ...queryOptions,
  });
};
