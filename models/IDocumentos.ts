export interface IDocumentos {
  identificacionCliente: string;
  numeroDePago: number;
  monto: number;
  montoCancelado: number;
  fechaEmision: string;
  fechaVencimiento: string;
  nroDocumento: string;
  interesMora: number;
  tramo: string;
  gastosDeCobranza: number;
  valorTotalVencido: number;
  deudaTotal: number;
  cuotasPagadas: string;
  cuotasPendientes: string;
  fechaUltimoPago: string;
  totalPendiente: number;
  saldoVencido: number;
  estado: number;
  saldoDelCredito: number;
  valorCuota: number;
}
