export interface IDireccionGcobranza {
  direccion: string | null;
  tipoVivienda: string | null;
  nombrePropietario: string | null;
}

///////////////////////////////////

export interface IDireccion {
  diId: number | null;
  peId: number | null;
  diDireccion: string | null;
  diReferencia: string | null;
  idTipoVivienda: number | null;
  tipoVivienda: string | null;
  diTrasversal: string | null;
  diSector: string | null;
  diNroCasa: string | null;
  diLatitud: number | null;
  diLongitud: number | null;
  diPrincipal: string | null;
  diCobranza: string | null;
}

export interface IDireccionParams {
  peId: number;
}
