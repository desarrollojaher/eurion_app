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

/////////////////////////////////////
export interface IImagenesVerificaciones {
  vcId: number | null;
  vrId: number;
  fecha: string;
  vcImagenBase: string;
  nombre: string;
  periodo: string;
}

export interface IImagenS3 {
  bucket: string;
  path: string;
  key: string;
  mimetype: string;
}
