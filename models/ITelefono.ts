export interface ITelefonoAntiguo {
  identificacionCliente: string;
  telefono: string;
  tipo: string;
}

//////////////////////////////////////

export interface ITelefono {
  teId: number;
  peId: number;
  teTelefono: string;
  idTipoTelefono: number;
  tipoTelefono: string;
  tePrincipal: string;
}
