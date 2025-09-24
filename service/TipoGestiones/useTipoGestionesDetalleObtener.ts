import {
  ITipoGestionDetalle,
  ITipoGestionDetalleParams,
} from "@/models/ITiposGestiones";
import { tipoGestionesKeys } from "./tipoGestionesKeys";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";

export const useTipoGestionesDetalleObtener = (
  params: ITipoGestionDetalleParams,
  queryOptions?: Omit<
    UseQueryOptions<
      ITipoGestionDetalle[],
      any,
      ITipoGestionDetalle[],
      ReturnType<(typeof tipoGestionesKeys)["detalle"]>
    >,
    "queryKey"
  >,
) => {
  const obtenerTiposGestionesDetalle = async () => {
    return await dbSqliteService.obtenerTiposGestionesDetalles(params);
  };
  return useQuery({
    queryKey: ["tipoGestiones", "detalle", params],
    queryFn: obtenerTiposGestionesDetalle,
    ...queryOptions,
  });
};
