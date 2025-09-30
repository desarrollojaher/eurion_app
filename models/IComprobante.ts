import { IProducto } from "./IProducto";

export interface IComprobante {
  idFactura: number | null;
  fechaFactura: string | null;
  tipoComprobante: string | null;
  idCredito: number | null;
  nroCuotas: number | null;
  valorCuota: number | null;
  valorTotalCredito: number | null;
  crSaldoCapital: number | null;
  crSaldoInteres: number | null;
  crSaldoCredito: number | null;
  interesGastoMora: number | null;
  interesGastoCobranza: number | null;
  cuotasPagadas: number | null;
  cuotasPorPagar: number | null;
  clId: number | null;
  productos: IProducto[];
}

export type IComprobanteObtener = Omit<IComprobante, "productos"> & {
  caId: number | null;
  gcId: number | null;
  idHojaDetalle: number | null;
  idAgencia: number | null;
};

export interface IComprobanteObtenerParams {
  clId: number;
}

export interface IComprobanteDetalleParams {
  crId: number;
}
