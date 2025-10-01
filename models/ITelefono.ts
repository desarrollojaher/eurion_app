export interface ITelefono {
  teId: number | null;
  peId: number | null;
  teTelefono: string | null;
  idTipoTelefono: number | null;
  tipoTelefono: string | null;
  tePrincipal: string | null;
}

export interface ITelefonoParams {
  peId: number;
}
