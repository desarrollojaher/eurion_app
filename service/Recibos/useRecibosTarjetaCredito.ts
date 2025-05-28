import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { recibosKeys } from "./recibosKeys";
import { ITarjetaCredito } from "@/models/ITarjetaCredito";

export const useRecibosTarjetaCredito = (
  queryOptions?: UseQueryOptions<
    ITarjetaCredito[],
    unknown,
    ITarjetaCredito[],
    ReturnType<(typeof recibosKeys)["tarjetasCredito"]>
  >
) => {
  const obtenerTarjetaCredito = async () => {
    return await dbSqliteService.obtenerTarjetasCredito();
  };

  return useQuery({
    queryKey: ["recibos", "tarjetaCredito"],
    queryFn: obtenerTarjetaCredito,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
