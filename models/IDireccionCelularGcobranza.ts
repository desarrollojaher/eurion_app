import { IImagenCompleta } from "./IImagenCompleta";

export interface IDireccionCelularGcobranza {
  identificacionCliente: string;
  direccionIngresada: string;
  indicacionesAdicionales: string;
  latitud: number;
  longitud: number;
  nroDocumento: string;
  fecha?: string | null;
  sincronizado?: number | null;
  imagenes?: IImagenCompleta[] | null;
}

export interface imagenActualizacion {
  identiticacionCliente: string;
  imagen: string;
  titulo: string;
  sincronizado?: number | null;
}
