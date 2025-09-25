export interface IGestionesAnterior {
  //nroDocumento: string;
  identificacionCliente: string;
  fechaAdicion: Date;
  deudaTotal: number;
  saldoVencido: number;
  tramo: string;
  apellidos: string;
  nombres: string;
  direccion: string;
  latitud: number;
  longitud: number;
  zonaNombre: string;
  imagenCliente: string;
  imagenDomicilio: string;
  telefono: string;
  detalleAdicional: string;
}

/////////////////////////////////////////////////////////////////////////

export interface IGestionesDetalles {
  gcId: number;
  caId: number;
  crId: number;
}
export interface IGestiones {
  idHojaRuta: number;
  usuId: number;
  clId: number;
  nombreCliente: string;
  gestiones: IGestionesDetalles[];
}

export interface IGestionesAnteriores {
  gcId: number | null;
  idCliente: number | null;
  nombreCliente: string | null;
  codComprobanteStock: string | null;
  idCredito: number | null;
  idFactura: number | null;
  nombreGestiona: string | null;
  fechaGestionado: string | null;
  fechaProxGestion: string | null;
  geObservacion: string | null;
  estadoGestion: number | null;
}

export interface IGestionesCabecera {
  nombreCliente: string;
  apellidoCliente: string;
  identificacion: string;
  direccionCliente: string;
  deudaTotal: number | null;
  deudaPendiente: number;
  latitudCliente: number;
  longitudCliente: number;
  cliId: number;
  idHojaRuta: number;
}

export interface IGestionCabeceraParams {
  buscador: string;
}

export interface IGestionesRealizas {
  gcIdCc: number;
  gdId: number;
  crLatitud?: number | null;
  crLongitud?: number | null;
  crObservaciones: string;
  usIdGestiona?: number | null;
  caId: number;
  clId: number;
  agId?: number | null;
  crIdCredito: number;
  cpFechaCompromiso?: string | null;
  hdId?: number | null;
  cpObservaciones?: string | null;
  gcId: number;
  crFechaProxGestion?: string | null;
  trId: number;
}

export interface IGestionesAnterioresParams {
  crId: number;
}
