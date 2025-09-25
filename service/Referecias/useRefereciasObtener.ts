import { IReferencia, IReferenciaParams } from "@/models/IReferencia";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { referenciasKeys } from "./referenciasKeys";
import { dbSqliteService } from "../db/db";

export const useReferenciasObtener = (
  params: IReferenciaParams,
  queryOptions?: UseQueryOptions<
    IReferencia[],
    any,
    IReferencia[],
    ReturnType<(typeof referenciasKeys)["obtenerReferencia"]>
  >
) => {
  const obtenerReferencias = async () => {
    return await dbSqliteService.obtenerReferencias(params);
  };
  return useQuery({
    queryKey: ["referencias", "obtenerReferencia", params],
    queryFn: obtenerReferencias,
    ...queryOptions,
  });
};
