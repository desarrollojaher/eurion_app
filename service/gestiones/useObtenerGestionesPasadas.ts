import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { gestionesKeys } from "./gestionesKeys";
import { IDocumentoPasadoParams } from "@/models/IDocumentos";
import { IGestionesCelularPasadas } from "@/models/IGestionesCelular";

export const useObtenerGestionesPasadas = (
  params: IDocumentoPasadoParams,
  queryOptions?: UseQueryOptions<
    IGestionesCelularPasadas[],
    unknown,
    IGestionesCelularPasadas[],
    ReturnType<(typeof gestionesKeys)["gestionPasada"]>
  >
) => {
  const obtenerGestionesCabecera = async () => {
    return await dbSqliteService.obtenerGestionesPasadas(params);
  };

  return useQuery({
    queryKey: ["gestiones", "gestionPasada", params],
    queryFn: obtenerGestionesCabecera,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
