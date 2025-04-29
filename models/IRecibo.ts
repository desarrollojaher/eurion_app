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
  numeroDocumento?: string;
  fechaVencimiento?: string;
  emisor?: string;
  numeroCuenta?: string;
  propieario?: string;
  numeroCheque?: string;
  valor: string;
}

export interface IReciboEnviar {
  imagenes?: IImagenCompleta[];
  doctran: string;
  valores: IRecibosEnviarDetalles[];
  valorMora: number;
  valorCobranza: number;
  valorCancela: number;
  observaciones?: string;
  fechaComprobante?: string;
}

export interface IReciboEnviarDatos {
  datos: IReciboEnviar[];
}
