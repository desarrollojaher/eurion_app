import { IFormaPago } from "@/models/IFormaPago";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { formasPagoKeys } from "./formasPago";
import { dbSqliteService } from "../db/db";

export const useFormaPagoObtener = (
  queryOption?: UseQueryOptions<
    IFormaPago[],
    any,
    IFormaPago[],
    ReturnType<(typeof formasPagoKeys)["obtenerFormasPago"]>
  >
) => {
  const obtenerFormasPago = async () => {
    return await dbSqliteService.obtenerFormasPago();
  };
  return useQuery({
    queryKey: ["formasPago", "obtenerFormaPago"],
    queryFn: obtenerFormasPago,
    ...queryOption,
  });
};
