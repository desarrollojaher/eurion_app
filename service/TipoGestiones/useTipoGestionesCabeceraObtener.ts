import {
  ITipoDatoCabeceraParams,
  ITipoGestion,
} from "@/models/ITiposGestiones";
import { tipoGestionesKeys } from "./tipoGestionesKeys";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";

export const useTipoGestionesCabeceraObtener = (
  params: ITipoDatoCabeceraParams,
  queryOptions?: UseQueryOptions<
    ITipoGestion[],
    any,
    ITipoGestion[],
    ReturnType<(typeof tipoGestionesKeys)["cabecera"]>
  >,
) => {
  const obtenerTiposGestionesCabecera = async () => {
    return await dbSqliteService.obtenerTiposGestionesCabecera(params);
  };
  return useQuery({
    queryKey: ["tipoGestiones", "cabecera", params],
    queryFn: obtenerTiposGestionesCabecera,
    ...queryOptions,
  });
};
