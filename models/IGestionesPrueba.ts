import { IImagenCompleta } from "./IImagenCompleta";

export interface IGstionesPrueba {
  cedulaCliente: string;
  nombreCliente: string;
  direccionCliente: string;
  deudaTotal: string;
  vencimineto: string;
  tramo: string;
  zona: string;
  posicion: {
    latitud: number;
    longitud: number;
  };
  imagenes: IImagenCompleta[];
}

export interface IDocumento {
  doctran: string;
  tramo: string;
  cuotasPagadas: string;
  cuotasPendientes: string;
  fechaVencimiento: string;
  fechaUltPago: string;
  valorCuota: string;
  saldoVencido: string;
  interesesMora: string;
  gastosCobranza: string;
  saldoCapital: string;
  deudaTotal: string;
}
