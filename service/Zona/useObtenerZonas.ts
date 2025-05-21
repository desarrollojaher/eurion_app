import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { IZona } from "@/models/IZona";
import { zonaKeys } from "./zonaKeys";

export const useObtenerZonas = (
  queryOptions?: UseQueryOptions<
    IZona[],
    unknown,
    IZona[],
    ReturnType<(typeof zonaKeys)["filtros"]>
  >
) => {
  const obtenerCabecera = async () => {
    return await dbSqliteService.obtenerZonas();
  };

  return useQuery({
    queryKey: ["zonas", "filtro"],
    queryFn: obtenerCabecera,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
