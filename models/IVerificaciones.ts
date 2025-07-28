import { IActividadEconomica } from "./IActividadEconomica";
import { IBuro } from "./IBuro";
import { IConyugue } from "./IConyugue";
import { IImagenesVerificaciones } from "./IImagenes";
import { IUsuarioGeneral } from "./IUsuario";
import { IVivienda } from "./IVivienda";

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
}

export interface IVerificacionDetalles {
  actividadEconomica: IActividadEconomica;
  actividadEconomicaConyugue: IActividadEconomica;
  buro: IBuro;
  datosConyugue: IConyugue;
  datosGenerales: IUsuarioGeneral;
  datosVivienda: IVivienda;
}

export interface IVerificacionDetallesParams {
  identificacion: string;
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
  imagenes: IImagenesVerificaciones[];
}

export interface IActualizarVerificacion {
  vdId: number,
  estado: number
}

export interface IVerificacionesVdId {
  vdId: number
}
