import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IGestionCabeceraParams } from "@/models/IGestiones";
import { dbSqliteService } from "../db/db";
import { recibosKeys } from "./recibosKeys";
import { IDocumentosRecibos } from "@/models/IDocumentos";

export const useObtenerRecibosCabecera = (
  params: IGestionCabeceraParams,
  queryOptions?: UseQueryOptions<
    IDocumentosRecibos[],
    any,
    IDocumentosRecibos[],
    ReturnType<(typeof recibosKeys)["reciboCabecera"]>
  >,
) => {
  const obtenerRecibosCabecera = async () => {
    return await dbSqliteService.obtenerDocumentoRecibos(params);
  };
  return useQuery({
    queryKey: ["recibos", "reciboCabecera", params],
    queryFn: obtenerRecibosCabecera,
    ...queryOptions,
  });
};
