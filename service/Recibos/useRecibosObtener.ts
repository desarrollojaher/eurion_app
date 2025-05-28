import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { recibosKeys } from "./recibosKeys";
import { IRecibosCabeceraListado } from "@/models/IRecibo";

export const useRecibosObtener = (
  queryOptions?: UseQueryOptions<
    IRecibosCabeceraListado[],
    unknown,
    IRecibosCabeceraListado[],
    ReturnType<(typeof recibosKeys)["subirRecibos"]>
  >
) => {
  const obtenerTarjetaCredito = async () => {
    return await dbSqliteService.obtenerRecibos();
  };

  return useQuery({
    queryKey: ["recibos", "subirRecibo"],
    queryFn: obtenerTarjetaCredito,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
