export interface IGestionesCelular {
  nroDocumento: string;
  fechaGestion: string;
  observaciones: string;
  codigoTipoGestion: string;
  identificacionCliente: string;
  fechaProximaGestion: string;
  observacionesProximaGestion: string;
  codigoTipoDeGestionProxima: string;
  latitud: number;
  longitud: number;
  sincronizado: number;
}

export type IGestionesCelularCrear = {
  nroDocumento: string;
  fechaGestion?: string | null;
  observaciones: string;
  fechaProximaGestion?: string | null;
  codigoTipoGestion: string;
  identificacionCliente: string;
  observacionesProximaGestion?: string | null;
  codigoTipoGestionProxima: string;
  latitud: number;
  longitud: number;
  sincronizado: number;
  tipoReferencia: string;
};

export type IGestionesCelularPasadas = {
  observacion: string;
  fechaGestion: Date;
  tipoGestion: string;
  // gestor: string;
};
