import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { subirInformacionKeys } from "./subirInformacionKeys";
import { ISubirInformacionActualizaciones } from "@/models/ISubirInformacion";

export const useSubirInformacionActualizacionesObtener = (
  queryOptions?: Omit<
    UseQueryOptions<
      ISubirInformacionActualizaciones[],
      unknown,
      ISubirInformacionActualizaciones[],
      ReturnType<(typeof subirInformacionKeys)["actualizaciones"]>
    >,
    "queryKey"
  >,
) => {
  const obtenerInformacionActualizaciones = async () => {
    return await dbSqliteService.obtenerActualizacionesDireccion();
  };

  return useQuery({
    queryKey: ["subirInformacion", "actualizacion"],
    queryFn: obtenerInformacionActualizaciones,
    ...queryOptions,
  });
};
