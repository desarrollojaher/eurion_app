import { IProducto } from "./IProducto";

export interface IComprobante {
  idFactura: number;
  fechaFactura: string;
  tipoComprobante: string;
  idCredito: number;
  nroCuotas: number;
  valorCuota: number;
  valorTotalCredito: number;
  crSaldoCapital: number;
  crSaldoInteres: number;
  crSaldoCredito: number;
  interesGastoMora: string;
  interesGastoCobranza: string;
  cuotasPagadas: number;
  cuotasPorPagar: number;
  productos: IProducto[];
}
