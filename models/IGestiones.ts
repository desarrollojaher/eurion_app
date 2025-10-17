export interface IGestionesDetalles {
  gcId: number;
  caId: number;
  crId: number;
  idAgencia: number;
  idHojaDetalle: number;
}
export interface IGestiones {
  idHojaRuta: number;
  usuId: number;
  clId: number;
  nombreCliente: string;
  tcId: number;
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
  peId: number | null;
  imagenCliente: string | null;
  imagenDomicilio: string | null;
  tcId: number | null;
  total: number | null;
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
  // caId: number;
  clId: number;
  agId?: number | null;
  // crIdCredito: number;
  cpFechaCompromiso?: string | null;
  hrId?: number | null;
  cpObservaciones?: string | null;
  // gcId: number;
  crFechaProxGestion?: string | null;
  trId: number;
  crFechaGestionada?: string | null;
  diId?: number | null;
  teId?: number | null;
}

export interface IGestionesRealizasEnviar {
  gcIdCc: number | null;
  gdId: number | null;
  crLatitud?: number | null;
  crLongitud?: number | null;
  crObservaciones: string | null;
  usIdGestiona?: number | null;
  caId: number | null;
  clId: number | null;
  agId?: number | null;
  crIdCredito: number | null;
  cpFechaCompromiso?: string | null;
  hrId?: number | null;
  cpObservaciones?: string | null;
  gcId: number | null;
  crFechaProxGestion?: string | null;
  trId: number | null;
  crFechaGestionada?: string | null;
  diId?: number | null;
  teId?: number | null;
}
export interface IGestionesAnterioresParams {
  clId: number;
}
