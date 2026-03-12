import { IActividadEconomica } from "./IActividadEconomica";
import { IBuro } from "./IBuro";
import { IConyugueDetalles } from "./IConyugue";
import { IImagenesVerificaciones } from "./IImagenes";
import { IUsuarioGeneral } from "./IUsuario";
import { IViviendaDetalles } from "./IVivienda";

export interface IVerificacion {
  idVerificacion: number;
  idCliente: number;
  fechaVerificacion: string;
  latitudCliente: number;
  longitudCliente: number;
  tipoVerificacion: string;
  identificacionCobrador: number;
  periodo: string;
  producto: string;
  tdId: number;
}

export interface IVerificacionesCabeceraParams {
  tipoRuta: string | null;
  nombreCliente: string;
}

export interface IVerificacionesCabecera {
  idVerificacion: number;
  codigoTipoDeRuta: string;
  fecha: Date;
  identificacion: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  direccionTrabajo: string;
  fotoCliente: string;
  fotoDomicilio: string;
  clienteId: number;
  periodo: string;
  latitud: number;
  longitud: number;
  tdId: number;
}

export interface IVerificacionDetalles {
  actividadEconomica: IActividadEconomica;
  actividadEconomicaConyugue: IActividadEconomica;
  buro: IBuro;
  datosConyugue: IConyugueDetalles;
  datosGenerales: IUsuarioGeneral;
  datosVivienda: IViviendaDetalles;
}

export interface IVerificacionDetallesParams {
  identificacion: string;
  tdId: number;
}

export interface IVerificacionesGuardar {
  vrId: number | null;
  veComentario: string;
  vdId: number;
  vtId: number;
  clId: number;
  usIdCobrador: number;
  vrPeriodo: string;
  vrFechaVerificacion: string;
  vrLatitud: number;
  vrLongitud: number;
  pideActualizacion: number;
  imagenes: IImagenesVerificaciones[];
}

export interface IActualizarVerificacion {
  vdId: number;
  estado: number;
}

export interface IVerificacionesVdId {
  vdId: number;
}

export interface IVerificacionesEliminar {
  vdId: number;
}
