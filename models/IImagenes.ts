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
