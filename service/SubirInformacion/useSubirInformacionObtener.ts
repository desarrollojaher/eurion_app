import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { subirInformacionKeys } from "./subirInformacionKeys";
import { ISubirInformacion } from "@/models/ISubirInformacion";

export const useSubirInformacionObtener = (
  queryOptions?: Omit<
    UseQueryOptions<
      ISubirInformacion[],
      unknown,
      ISubirInformacion[],
      ReturnType<(typeof subirInformacionKeys)["subirDatos"]>
    >,
    "queryKey"
  >,
) => {
  const obtenerInformacion = async () => {
    return await dbSqliteService.obtenerInfoSubir();
  };

  return useQuery({
    queryKey: ["subirInformacion", "subirDato"],
    queryFn: obtenerInformacion,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
