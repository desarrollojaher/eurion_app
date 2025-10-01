import { ITelefono, ITelefonoParams } from "@/models/ITelefono";
import { telefonoKeys } from "./telefonoKeys";
import { dbSqliteService } from "../db/db";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useTelefonoObtener = (
  params: ITelefonoParams,
  queryOptions?: Omit<
    UseQueryOptions<
      ITelefono[],
      any,
      ITelefono[],
      ReturnType<(typeof telefonoKeys)["obtenerTelefono"]>
    >,
    "queryKey" | "queryFn"
  >,
) => {
  const obtenerTelefonos = async () => {
    return await dbSqliteService.obtenerTelefonos(params);
  };

  return useQuery({
    queryKey: ["telefono", "obtenerTelefono", params],
    queryFn: obtenerTelefonos,
    ...queryOptions,
  });
};
