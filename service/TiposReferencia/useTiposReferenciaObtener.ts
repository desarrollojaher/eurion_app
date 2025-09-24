import { ITipoReferencia } from "@/models/ITipoReferencia";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { tiposReferenciaKeys } from "./TiposReferenciaKeys";

export const useTiposReferenciaObtener = (
  queryOption?: UseQueryOptions<
    ITipoReferencia[],
    any,
    ITipoReferencia[],
    ReturnType<(typeof tiposReferenciaKeys)["obtenerReferencias"]>
  >
) => {
  const obtenerTiposReferencias = async () => {
    return await dbSqliteService.obtenerTiposReferencia();
  };
  return useQuery({
    queryKey: ["tiposReferencia", "obtenerReferencia"],
    queryFn: obtenerTiposReferencias,
    ...queryOption,
  });
};
