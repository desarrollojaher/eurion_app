export interface IDocumentos {
  identificacionCliente: string | null;
  numeroDePagos: number | null;
  monto: number | null;
  montoCancelado: number | null;
  fechaEmision: string | null;
  fechaVencimiento: string | null;
  nroDocumento: string | null;
  interesMora: number | null;
  tramo: string | null;
  gastosDeCobranza: number | null;
  valorTotalVencido: number | null;
  deudaTotal: number | null;
  cuotasPagadas: string | null;
  cuotasPendientes: string | null;
  fechaUltimoPago: string | null;
  totalPendiente: number | null;
  saldoVencido: number | null;
  estado: number | null;
  saldoDelCredito: number | null;
  valorCuota: number | null;
}

export type IDocumentosCabecera = {
  cuotasPagadas: string;
  deudaTotal: number;
  nroDocumento: string;
  producto: string;
  saldoVencido: number;
  fecha: Date;
  interesMora: number;
  gastosCobranza: number;
};

export type IDocumentoPasadoParams = {
  nroDocumento: string;
};
