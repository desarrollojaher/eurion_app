import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { dbSqliteService } from "../db/db";
import { DocumentosKeys } from "./documentosKeys";
import { IClienteParams } from "@/models/ICliente";
import { IDocumentosCabecera } from "@/models/IDocumentos";

export const useDocumentosCabeceraObtener = (
  params: IClienteParams,
  queryOptions?: UseQueryOptions<
    IDocumentosCabecera[],
    unknown,
    IDocumentosCabecera[],
    ReturnType<(typeof DocumentosKeys)["cabecera"]>
  >
) => {
  const obtenerCabecera = async () => {
    return await dbSqliteService.obtenerDocumentosCabeceraGcobranza(params);
  };

  return useQuery({
    queryKey: ["documentos", "cabecera", params],
    queryFn: obtenerCabecera,
    // staleTime: 1000 * 60 * 5,
    // retry: 2, // Intentar la consulta hasta dos veces si falla
    ...queryOptions,
  });
};
