import { IDireccion, IDireccionParams } from "@/models/IDireccion";
import { direccionKeys } from "./direccionKeys";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";

export const useDireccionObtener = (
  params: IDireccionParams,
  queryOptions?: Omit<
    UseQueryOptions<
      IDireccion[],
      any,
      IDireccion[],
      ReturnType<(typeof direccionKeys)["obtenerDireccion"]>
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const obtenerDirecciones = async () => {
    return await dbSqliteService.obtenerDirecciones(params);
  };
  return useQuery({
    queryKey: ["direccion", "obtenerDireccion", params],
    queryFn: obtenerDirecciones,
    ...queryOptions,
  });
};
