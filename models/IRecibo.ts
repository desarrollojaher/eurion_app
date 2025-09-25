import { IImagenCompleta } from "./IImagenCompleta";

export interface IRecibo {
  nombre: string;
  cedula: string;
  saldoTotal: string;
  documentos: IDocumentos[];
}

export interface IDocumentos {
  doctran: string;
  fecha: string;
  deudaTotal: number;
  saldoVencido: number;
  interesMora: number;
  gastosPorCobranza: number;
}

export interface IRecibosEnviarDetalles {
  tipoPago: string;
  valor?: number | null | any;
}

export interface IReciboEnviar {
  [key: string]: any;
  imagenes?: IImagenCompleta[] | null;
  doctran: string;
  valores?: IRecibosEnviarDetalles[] | null;
  valorMora?: number | null | any;
  valorCobranza?: number | null | any;
  valorCancela?: number | null | any;
  observaciones?: string | null;
  fechaComprobante?: string;
  latitud?: number | null;
  longitud?: number | null;
  identificacionCliente: string;
  banco?: string | null;
}

export interface IReciboEnviarDatos {
  datos: IReciboEnviar[];
}

export interface IRecibosCabeceraParams {
  nombreCliente: string;
}
export interface IRecibosCabecera {
  identificacionCliente: string;
  apellidos: string;
  nombres: string;
  deudaTotal: number;
}

export interface IRecibosCabeceraListado {
  nombres: string;
  apellidos: string;
  fecha: string;
  capital: number;
  interesMora: number;
  gastoCobranza: number;
  cobroTotalCuotas: number;
  id: number;
}

export type IRecibosEliminarParams = {
  id: number;
};
