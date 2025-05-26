import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { DocumentosKeys } from "./documentosKeys";
import { IDocumentoPasadoParams, IDocumentos } from "@/models/IDocumentos";

export const useDocumentosCompletoObtener = (
  params: IDocumentoPasadoParams,
  queryOptions?: UseQueryOptions<
    IDocumentos[],
    unknown,
    IDocumentos[],
    ReturnType<(typeof DocumentosKeys)["completo"]>
  >
) => {
  const obtenerCabecera = async () => {
    return await dbSqliteService.obtenerDocumentoCompleto(params);
  };

  return useQuery({
    queryKey: ["documentos", "completo", params],
    queryFn: obtenerCabecera,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
