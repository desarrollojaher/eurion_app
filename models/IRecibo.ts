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
  numeroDocumento?: string | null;
  fechaVencimiento?: string | null;
  emisor?: string | null;
  numeroCuenta?: string | null;
  propieario?: string | null;
  numeroCheque?: string | null;
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
}

export interface IReciboEnviarDatos {
  datos: IReciboEnviar[];
}
