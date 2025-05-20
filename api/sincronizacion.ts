import {
  ISincronizarClientes,
  ISincronizarConyugue,
  ISincronizarDirecciones,
  ISincronizarImagenCliente,
  ISincronizarimagenesDomicilio,
  ISincronizarImagenesParams,
  ISincronizarVerificaciones,
  ISincronizarZona,
} from "@/models/ISincronizar";
import { get } from "./config";
import { IDocumentos } from "@/models/IDocumentos";
import { IEnviarGcobranza } from "@/models/IEnviarGcobranza";

export const sincronizacionApi = {
  verificaciones: async () => {
    const res = await get<ISincronizarVerificaciones[]>(
      "sincronizacion/verificaciones"
    );
    return res.data;
  },
  clientes: async () => {
    const res = await get<ISincronizarClientes[]>("sincronizacion/clientes");
    return res.data;
  },
  conyugue: async () => {
    const res = await get<ISincronizarConyugue[]>("sincronizacion/conyugue");
    return res.data;
  },
  direcciones: async () => {
    const res = await get<ISincronizarDirecciones[]>(
      "sincronizacion/direcciones"
    );
    return res.data;
  },
  zona: async () => {
    const res = await get<ISincronizarZona[]>("sincronizacion/zona");
    return res.data;
  },
  imagenCliente: async (params: ISincronizarImagenesParams) => {
    const res = await get<ISincronizarImagenCliente>(
      "sincronizacion/foto-cliente",
      { params: params, timeout: 120000 }
    );
    return res.data;
  },
  imagenDomicilio: async (params: ISincronizarImagenesParams) => {
    const res = await get<ISincronizarimagenesDomicilio>(
      "sincronizacion/mapa-domicilio",
      { params: params, timeout: 120000 }
    );
    return res.data;
  },
  documentos: async () => {
    const res = await get<IDocumentos[]>("sincronizacion/documentos");
    return res.data;
  },
  enviarGcobranza: async () => {
    const res = await get<IEnviarGcobranza[]>(
      "sincronizacion/enviar-gcobranza"
    );
    return res.data;
  },
};
