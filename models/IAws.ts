export interface IAws {
  bucket?: string;
  path: string;
}

export interface IGenerarPresignalResponse {
  url: string;
}

export interface IModuloSubir {
  modulo: string;
}

export interface IModulosResponse {
  moId: number;
  path: string;
}
