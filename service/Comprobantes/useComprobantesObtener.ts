import {
  IComprobanteObtener,
  IComprobanteObtenerParams,
} from "@/models/IComprobante";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { comprobantesKeys } from "./comprobantesKeys";
import { dbSqliteService } from "../db/db";

export const useComprobantesObtener = (
  params: IComprobanteObtenerParams,
  queryOptions?: Omit<
    UseQueryOptions<
      IComprobanteObtener[],
      unknown,
      IComprobanteObtener[],
      ReturnType<(typeof comprobantesKeys)["obtenerGeneral"]>
    >,
    "queryKey"
  >,
) => {
  const obtenerComprobantes = async () => {
    return await dbSqliteService.obtenerFacturas(params);
  };
  return useQuery({
    queryKey: ["comprobantes", "obtenerGeneral", params],
    queryFn: obtenerComprobantes,
    ...queryOptions,
  });
};
