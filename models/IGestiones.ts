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
  gcId: number;
  idCliente: number;
  nombreCliente: string;
  codComprobanteStock: string;
  idCredito: number;
  idFactura: number;
  nombreGestiona: string;
  fechaGestionado: string;
  fechaProxGestion: string;
  geObservacion: string;
  estadoGestion: number;
}
