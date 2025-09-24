import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { gestionesKeys } from "./gestionesKeys";
import {
  IGestionCabeceraParams,
  IGestionesCabecera,
} from "@/models/IGestiones";
import { dbSqliteService } from "../db/db";

export const useObtenerGestiones = (
  params: IGestionCabeceraParams,
  queryOptions?: UseQueryOptions<
    IGestionesCabecera[],
    any,
    IGestionesCabecera[],
    ReturnType<(typeof gestionesKeys)["gestionCabecera"]>
  >,
) => {
  const obtenerGestionesCabecera = async () => {
    return await dbSqliteService.obtenerGestionesCabecera(params);
  };
  return useQuery({
    queryKey: ["gestiones", "gestionCabecera", params],
    queryFn: obtenerGestionesCabecera,
    ...queryOptions,
  });
};
