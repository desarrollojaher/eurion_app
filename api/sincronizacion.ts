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
import { ITiposGestiones } from "@/models/ITiposGestiones";
import { IGestionesCelular } from "@/models/IGestionesCelular";
import { IClienteGarante } from "@/models/IClienteGarante";
import { IDetalleFactura } from "@/models/IDetalleFactura";
import { IFormaPago } from "@/models/IFormaPago";
import { ITarjetaCredito } from "@/models/ITarjetaCredito";
import { IBancos } from "@/models/IBancos";

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

  imagenClienteGcobranza: async (params: ISincronizarImagenesParams) => {
    const res = await get<ISincronizarImagenCliente>(
      "sincronizacion/foto-cliente-gestion",
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
  imagenDomicilioGcobranza: async (params: ISincronizarImagenesParams) => {
    const res = await get<ISincronizarimagenesDomicilio>(
      "sincronizacion/mapa-domicilio-gcobranza",
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
  tipoGestiones: async () => {
    const res = await get<ITiposGestiones[]>("sincronizacion/tipo-gestiones");
    return res.data;
  },

  gestionesCelular: async () => {
    const res = await get<IGestionesCelular[]>(
      "sincronizacion/gestiones-celular"
    );
    return res.data;
  },
  clienteGarante: async () => {
    const res = await get<IClienteGarante[]>("sincronizacion/cliente-garante");
    return res.data;
  },
  detalleFacturas: async () => {
    const res = await get<IDetalleFactura[]>("sincronizacion/detalle-facturas");
    return res.data;
  },
  formasPago: async () => {
    const res = await get<IFormaPago[]>("sincronizacion/forma-pago");
    return res.data;
  },
  tarjetaCredito: async () => {
    const res = await get<ITarjetaCredito[]>("sincronizacion/tarjeta-credito");
    return res.data;
  },
  bancos: async () => {
    const res = await get<IBancos[]>("sincronizacion/bancos");
    return res.data;
  },
};
