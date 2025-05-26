import { IClienteParams } from "@/models/ICliente";
import { IDocumentoPasadoParams } from "@/models/IDocumentos";

export const DocumentosKeys = {
  documentos: () => ["documentos"] as const,
  cabeceras: () => [...DocumentosKeys.documentos(), "cabecera"] as const,
  cabecera: (params: IClienteParams) =>
    [...DocumentosKeys.cabeceras(), params] as const,
  completos: () => [...DocumentosKeys.documentos(), "completo"] as const,
  completo: (params: IDocumentoPasadoParams) =>
    [...DocumentosKeys.completos(), params] as const,
};
