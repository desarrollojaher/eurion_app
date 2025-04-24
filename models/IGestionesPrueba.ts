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
