export interface IReferencia {
  clId: number | null;
  peIdReferencia: number | null;
  identificacionReferencia: string | null;
  idTipoReferencia: number | null;
  tipoReferencia: string | null;
  apellidosReferencia: string | null;
  nombresReferencia: string | null;
  actividadEconomicaReferencia: string | null;
  empresaReferencia: string | null;
  cargoReferencia: string | null;
  rucEmpresaReferencia: null | string;
  telfCelularReferencia: string | null;
  telfTrabajoReferencia: string | null;
  telfCasaReferencia: null | string;
}

export interface IReferenciaParams {
  clId: number;
}
