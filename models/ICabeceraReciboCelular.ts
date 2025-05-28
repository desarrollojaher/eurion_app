export interface ICabeceraReciboCelular {
  identificacionCliente: string;
  fecha: string;
  observaciones: string;
  total: number;
  totalInteresMora: number;
  totalGastoCobranza: number;
  latitud: number;
  longitud: number;
  nroDocumento: string;
  codComprobanteCancela?: string;
  tipoComprobanteCancela?: string;
  cobroTotalCuotas: number;
}
