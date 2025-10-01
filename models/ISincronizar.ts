import { ICliente } from "./ICliente";
import { IConyugue } from "./IConyugue";
import { IImagenS3 } from "./IImagenes";
import { IVerificacion } from "./IVerificaciones";
import { IVivienda } from "./IVivienda";

export interface ISincronizacion {
  codigo: number;
  fecha: string | null;
}

export interface ISincronizarVerificaciones {
  verificacion: IVerificacion | null;
  cliente: ICliente | null;
  conyugue: IConyugue | null;
  vivienda: IVivienda | null;
}

export interface ISincronizarVerificacionesEnviar {
  vrId: number | null;
  vrComentario: string | null;
  vdId: number | null;
  vtId: number | null;
  clId: number | null;
  usIdCobrador: number | null;
  vrFechaVerificacion: string | null;
  vrLatitud: number | null;
  vrLongitud: number | null;
  fecha: string | null;
  vcImagenBase: string;
  vcPeriodo: string | null;
  pideActualizacion: number | null;
  clIdentificacion: string;
  imagenes?: IImagenS3[];
}

export interface IVerificacionesEnviar {
  verificaciones: ISincronizarVerificacionesEnviar[];
}
