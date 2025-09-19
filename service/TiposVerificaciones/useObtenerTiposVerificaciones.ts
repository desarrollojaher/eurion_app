import { ITiposVerificaciones } from "@/models/ITiposVerificaciones";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { tipoVerificacionKeys } from "./tipoVerificacionesKeys";
import { dbSqliteService } from "../db/db";

export const useObtenerTiposVerificaciones = (
  queryOptions?: Omit<
    UseQueryOptions<
      ITiposVerificaciones[],
      unknown,
      ITiposVerificaciones[],
      ReturnType<(typeof tipoVerificacionKeys)["tiposVerificaciones"]>
    >,
    "queryKey"
  >
) => {
  const obtenerTipoVerificaciones = async () => {
    return await dbSqliteService.obtenerTiposVerificacion();
  };

  return useQuery({
    queryKey: ["tiposVerificacio", "tiposVerificaciones"],
    queryFn: obtenerTipoVerificaciones,
    ...queryOptions,
  });
};
