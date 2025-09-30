import {
  ISincronizarVerificaciones,
  ISincronizarVerificacionesEnviar,
} from "@/models/ISincronizar";
import { get, post } from "./config";
import { ITiposVerificaciones } from "@/models/ITiposVerificaciones";
import {
  IGestiones,
  IGestionesAnteriores,
  IGestionesRealizas,
  IGestionesRealizasEnviar,
} from "@/models/IGestiones";
import { IClientesGestion } from "@/models/ICliente";
import { IReferencia } from "@/models/IReferencia";
import { IComprobante } from "@/models/IComprobante";
import { ITipoGestion, ITipoGestionDetalle } from "@/models/ITiposGestiones";
import { IDireccion } from "@/models/IDireccion";
import { ITelefono } from "@/models/ITelefono";
import { ITipoReferencia } from "@/models/ITipoReferencia";
import { IFormaPago } from "@/models/IFormaPago";
import { IRecibosEnviar } from "@/models/IRecibo";

export const sincronizacionApi = {
  obtenerVerificaciones: async () => {
    const res = await get<ISincronizarVerificaciones[]>("sincronizacion/verificaciones-vista");
    return res.data;
  },
  obtenerTipoVerificaciones: async () => {
    const res = await get<ITiposVerificaciones[]>("sincronizacion/tipo-verificaciones");
    return res.data;
  },
  sincronizarVerificacionEnviar: async (datos: ISincronizarVerificacionesEnviar) => {
    const res = await post("sincronizacion/recibirVerificacion", datos);
    return res.data;
  },
  sincronizarGestiones: async () => {
    const res = await get<IGestiones[]>("sincronizacion/gestiones/obtener");
    return res.data;
  },
  sincronizarClientesGestiones: async () => {
    const res = await get<IClientesGestion[]>("sincronizacion/clientes/obtener");
    return res.data;
  },
  sincronizarReferencias: async () => {
    const res = await get<IReferencia[]>("sincronizacion/referencias/obtener");
    return res.data;
  },
  sincronizarComprobantes: async () => {
    const res = await get<IComprobante[]>("sincronizacion/comprobantes/obtener");
    return res.data;
  },
  sincronizarGestionesAnteriores: async () => {
    const res = await get<IGestionesAnteriores[]>("sincronizacion/gestiones-anteriores/obtener");
    return res.data;
  },
  sincronizarTipoGestionesCabecera: async () => {
    const res = await get<ITipoGestion[]>("sincronizacion/tipo-gestion-cabecera/obtener");
    return res.data;
  },
  sincronizarTipoGestionesDetalle: async () => {
    const res = await get<ITipoGestionDetalle[]>("sincronizacion/tipo-gestion-detalle/obtener");
    return res.data;
  },
  sincronizarDirecciones: async () => {
    const res = await get<IDireccion[]>("sincronizacion/direcciones/obtener");
    return res.data;
  },
  sincronizarTelefonos: async () => {
    const res = await get<ITelefono[]>("sincronizacion/telefonos/obtener");
    return res.data;
  },

  sincronizarTiposReferencias: async () => {
    const res = await get<ITipoReferencia[]>("sincronizacion/tipos-referencias/obtener");
    return res.data;
  },

  sincronizarFormasPago: async () => {
    const res = await get<IFormaPago[]>("sincronizacion/formas-pago/obtener");
    return res.data;
  },
  sinronizarGestionesEnviar: async (datos: IGestionesRealizasEnviar) => {
    const res = await post("sincronizacion/gestiones/sincronizar", datos);
    return res.data;
  },
  sincronizarRecibosEnviar: async (datos: IRecibosEnviar) => {
    const res = await post("sincronizacion/pagos/sincronizar", datos);
    return res.data;
  }
};
