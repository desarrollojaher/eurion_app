import { IComprobanteDetalleParams } from "@/models/IComprobante";
import { IProducto } from "@/models/IProducto";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { comprobantesKeys } from "./comprobantesKeys";
import { dbSqliteService } from "../db/db";

export const useComprobantesDetallesObtener = (
  params: IComprobanteDetalleParams,
  queryOptions?: UseQueryOptions<
    IProducto[],
    unknown,
    IProducto[],
    ReturnType<(typeof comprobantesKeys)["detalle"]>
  >,
) => {
  const obtenerComprobantesDetalles = async () => {
    return await dbSqliteService.obtenerProductos(params);
  };
  return useQuery({
    queryKey: ["comprobantes", "detalle", params],
    queryFn: obtenerComprobantesDetalles,
    ...queryOptions,
  });
};
