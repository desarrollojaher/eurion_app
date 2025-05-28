import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { recibosKeys } from "./recibosKeys";
import { IFormaPago } from "@/models/IFormaPago";

export const useRecibosFormaPago = (
  queryOptions?: UseQueryOptions<
    IFormaPago[],
    unknown,
    IFormaPago[],
    ReturnType<(typeof recibosKeys)["formasPagos"]>
  >
) => {
  const obtenerFormasPago = async () => {
    return await dbSqliteService.obtenerFormasPago();
  };

  return useQuery({
    queryKey: ["recibos", "formaPago"],
    queryFn: obtenerFormasPago,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
