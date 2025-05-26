import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { tipoGestionesKeys } from "./tipoGestionesKeys";
import { ITiposGestionesObtener } from "@/models/ITiposGestiones";

export const useTipoGestionObtener = (
  queryOptions?: UseQueryOptions<
    ITiposGestionesObtener[],
    unknown,
    ITiposGestionesObtener[],
    ReturnType<(typeof tipoGestionesKeys)["tipoGestiones"]>
  >
) => {
  const obtenerTipoGestiones = async () => {
    return await dbSqliteService.obtenerTiposGestiones();
  };

  return useQuery({
    queryKey: ["tipoGestion", "tipoGestion"],
    queryFn: obtenerTipoGestiones,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
