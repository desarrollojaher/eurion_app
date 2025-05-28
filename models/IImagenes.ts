export interface IImagenesVerificaciones {
  id: string;
  idVerificacion: string;
  nombre: string;
  imagen: string;
}

export interface IImagenCliente {
  fotoCliente: string;
  cedulaCliente: string;
}

export interface IImagenDomicilio {
  fotoDelDomicilio: string;
  cedulaCliente: string;
}
export interface IImagenRecibos {
  nroDocumento: string;
  imagen: string;
  titulo: string;
  idCabecera: number;
}
