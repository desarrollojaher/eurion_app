export interface IFormaPagoAnterior {
  codFormaPago: string | null;
  nombre: string | null;
  tipo: number | null;
}

export interface IFormaPago {
  fpId: number | null;
  fpNombre: string | null;
  fpSolicitaDetalle: string | null;
}
