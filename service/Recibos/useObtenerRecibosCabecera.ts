import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { recibosKeys } from "./recibosKeys";
import { IRecibosCabecera, IRecibosCabeceraParams } from "@/models/IRecibo";

export const useObtenerRecibosCabecera = (
  params: IRecibosCabeceraParams,
  queryOptions?: UseQueryOptions<
    IRecibosCabecera[],
    unknown,
    IRecibosCabecera[],
    ReturnType<(typeof recibosKeys)["obtenerReciboCabecera"]>
  >
) => {
  const obtenerRecibosCabecera = async () => {
    return await dbSqliteService.obtenerRecibosCabecera(params);
  };

  return useQuery({
    queryKey: ["recibos", "obtenerReciboCabecera", params],
    queryFn: obtenerRecibosCabecera,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
