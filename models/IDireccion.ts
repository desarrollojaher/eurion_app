export interface IDireccionGcobranza {
  direccion: string | null;
  tipoVivienda: string | null;
  nombrePropietario: string | null;
}

///////////////////////////////////

export interface IDireccion {
  diId: number;
  peId: number;
  diDireccion: string;
  diReferencia: string;
  idTipoVivienda: number;
  tipoVivienda: string;
  diTrasversal: string;
  diSector: string;
  diNroCasa: string;
  diLatitud: number;
  diLongitud: number;
  diPrincipal: string;
  diCobranza: string;
}
