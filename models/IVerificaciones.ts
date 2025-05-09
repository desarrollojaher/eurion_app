import { IActividadEconomica } from "./IActividadEconomica";
import { IBuro } from "./IBuro";
import { IConyugue } from "./IConyugue";
import { IImagenesVerificaciones } from "./IImagenes";
import { IUsuarioGeneral } from "./IUsuario";
import { IVivienda } from "./IVivienda";

export interface IVerificacionesCabecera {
  codigoTipoDeRuta: number;
  fecha: Date;
  identificacion: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
}

export interface IVerificacionesCabeceraParams {
  tipoRuta: number | null;
  nombreCliente: string;
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
  id: string;
  fecha: string;
  observaciones: string;
  codigoTipoGestion: number;
  verificacion: number;
  identificacionCliente: string;
  identificacionAgente: string;
  codigoDireccion: string;
  latitud: number;
  longitud: number;
  codigoTipoRuta: number;
  calificacion: number;
  imagenes: IImagenesVerificaciones[];
}

export interface IActualizarVerificacion {
  calificacion: number;
  codigoTipoGestion: number;
  identificacionCliente: string;
}
