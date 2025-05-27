import { IImagenCompleta } from "./IImagenCompleta";

export interface ISubirInformacion {
  id: string;
  tipoGestion: string;
  factura: string;
  calificacion?: string;
  fecha: string;
  cliente: string;
  identificacionCliente: string;
  observacion: string | null;
}

export interface ISubirInformacionEliminar {
  id: string;
  tipoGestion: string;
  identificacionCliente: string;
  factura: string | null;
  calificacion: string;
  modulo: "verificacion" | "gestion";
}

export interface ISubirInformacionActualizacionesGeneral {
  nombre: string | null;
  direccion: string | null;
  fecha: string | null;
  identificacionCliente: string | null;
  direccionAdicional: string | null;
  latitud: number | null;
  longitud: number | null;
  url: string | null;
  titulo: string | null;
}

export interface ISubirInformacionActualizaciones {
  nombre: string | null;
  direccion: string | null;
  fecha: string | null;
  identificacionCliente: string | null;
  direccionAdicional: string | null;
  latitud: number | null;
  longitud: number | null;
  imagenes: IImagenCompleta[] | null;
}
