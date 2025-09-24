import { ITipoGestion } from "@/models/ITiposGestiones";
import { tipoGestionesKeys } from "./tipoGestionesKeys";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";

export const useTipoGestionesCabeceraObtener = (
  queryOptions?: UseQueryOptions<
    ITipoGestion[],
    any,
    ITipoGestion[],
    ReturnType<(typeof tipoGestionesKeys)["cabeceras"]>
  >,
) => {
  const obtenerTiposGestionesCabecera = async () => {
    return await dbSqliteService.obtenerTiposGestionesCabecera();
  };
  return useQuery({
    queryKey: ["tipoGestiones", "cabecera"],
    queryFn: obtenerTiposGestionesCabecera,
    ...queryOptions,
  });
};
