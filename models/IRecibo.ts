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
  id?: string | null;
  tipoPago: string;
  valor?: number | null | any;
  fechaCobro?: string | null;
  urlImagen?: string | null;
}

export interface IReciboEnviar {
  [key: string]: any;
  // imagenes?: IImagenCompleta[] | null;
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
  crId?: number | null;
  usId?: number | null;
  gcId?: number | null;
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

export interface IRecibos {
  coId: number | null;
  pgValorCobrado: number | null;
  usIdCobrador: number | null;
  fpId: number | null;
  pgFechaCobro: string | null;
  pgObservaciones: string | null;
  pgSincronizado: string | null;
  pgLatitud: number | null;
  pgLongitud: number | null;
  gcId: number | null;
  urlImg: string | null;
  nombreImg: string | null;
}

export type IRecibosObtener = IRecibos & {
  clId: number | null;
  doctran: string | null;
  tipoPago: string | null;
};
