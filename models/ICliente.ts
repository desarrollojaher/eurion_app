import { IVivienda } from "./IVivienda";
export interface ICliente {
  idCliente: number;
  direccionCliente: string;
  identificacionCliente: string;
  nombreCliente: string;
  apellidoCliente: string;
  estadoCivilCliente: string;
  dependientesCliente: number;
  referencias: string | null;
  observaciones: string;
  categoriaCliente: string;
  scoreCliente: number;
  ocupacionLaboralCliente: string;
  empresaLaboraCliente: string;
  antiguedadCliente: number;
  cargoCliente: string;
  nombreJefeCliente: string;
  ingresosCliente: number;
  telefonoEmpresaCliente: string;
  celJefeCliente: string;
  direccionTrabajoCliente: string;
  fotoCliente: string;
  fotoDireccion: string;
  telefonoCliente: string;
  personaId: number;
  tdId: number;
}

export interface IClientesGestion {
  cliente: ICliente;
  vivienda: IVivienda;
}

export interface IClientesCloud {
  idCliente: number | null;
  fotoCliente: string | null;
  fotoDireccion: string | null;
  bucketFotoCliente: string | null;
  bucketFotoDireccion: string | null;
}
