import {
  IGestionesAnteriores,
  IGestionesAnterioresParams,
} from "@/models/IGestiones";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { gestionesKeys } from "./gestionesKeys";
import { dbSqliteService } from "../db/db";

export const useGestionesPasadas = (
  params: IGestionesAnterioresParams,
  queryOptions?: Omit<
    UseQueryOptions<
      IGestionesAnteriores[],
      any,
      IGestionesAnteriores[],
      ReturnType<(typeof gestionesKeys)["gestionPasada"]>
    >,
    "queryKey"
  >,
) => {
  const obtenerGestionesPasadas = async () => {
    return await dbSqliteService.obtenerGestionesPasadas(params);
  };
  return useQuery({
    queryKey: ["gestiones", "gestionPasada", params],
    queryFn: obtenerGestionesPasadas,
    ...queryOptions,
  });
};
