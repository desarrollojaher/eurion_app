export interface IGestiones {
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

export interface IGestionesFiltro {
  buscador: string;
  zona: string;
  tipo: string;
}
