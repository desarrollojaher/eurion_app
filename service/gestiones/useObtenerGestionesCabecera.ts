import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { gestionesKeys } from "./gestionesKeys";
import { IGestiones, IGestionesFiltro } from "@/models/IGestiones";

export const useObtenerGestionesCabecera = (
  params: IGestionesFiltro,
  queryOptions?: UseQueryOptions<
    IGestiones[],
    unknown,
    IGestiones[],
    ReturnType<(typeof gestionesKeys)["gestionCabecera"]>
  >
) => {
  const obtenerGestionesCabecera = async () => {
    return await dbSqliteService.obtenerCabeceraGestiones(params);
  };

  return useQuery({
    queryKey: ["gestiones", "gestionCabecera", params],
    queryFn: obtenerGestionesCabecera,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
