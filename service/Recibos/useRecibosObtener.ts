import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { recibosKeys } from "./recibosKeys";
import { IRecibosObtener } from "@/models/IRecibo";
import { dbSqliteService } from "../db/db";

export const useRecibosObtener = (
  queryOptions?: UseQueryOptions<
    IRecibosObtener[],
    any,
    IRecibosObtener[],
    ReturnType<(typeof recibosKeys)["obtenerRecibos"]>
  >,
) => {
  const obtenerRecibos = async () => {
    return await dbSqliteService.obtenerRecibos();
  };
  return useQuery({
    queryKey: ["recibos", "obtenerRecibo"],
    queryFn: obtenerRecibos,
    ...queryOptions,
  });
};
