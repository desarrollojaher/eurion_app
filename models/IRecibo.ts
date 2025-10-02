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
  coId?: number | null;
  caId?: number | null;
  hdId?: number | null;
}

export interface IReciboEnviarDatos {
  datos: IReciboEnviar[];
}

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
  crId: number | null;
  caId: number | null;
  hdId: number | null;
}

export type IRecibosObtener = IRecibos & {
  clId: number | null;
  doctran: string | null;
  tipoPago: string | null;
  identificacionCliente: string | null;
};

export interface IRecibosEnviar {
  crId: number;
  pgValorCobrado: number;
  usIdCobrador: number;
  fpId: number;
  pgFechaCobro: string;
  pgObservaciones: string;
  pgLatitud: number;
  pgLongitud: number;
  gcId: number;
  pgKeyImagen: string;
  pgBucket: string;
  pgPath: string;
  pgMimetype: string;
  pgEstado: number;
  caId: number;
  hdId: number;
}
