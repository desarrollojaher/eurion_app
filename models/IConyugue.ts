// export interface IConyugue {
//   cedulaConyuge: string;
//   nombre: string;
//   apellidos: string;
//   celular: string;
// }

export interface IClienteConyugue {
  identificacion: string | null;
  nombres: string | null;
  apellido: string | null;
  ocupacionLaboral: string | null;
  referencias: string | null;
  antiguedad: string | null;
}

////////////////////////////////////////////////////////////////////////////

export interface IConyugue {
  identificacionConyugue: string;
  nombreConyugue: string;
  apellidoConyuge: string;
  telefonoConyugue: string;
  ocupacionLaboralConyugue: string;
  empresaLaboraConyugue: string;
  antiguedadConyugue: string;
  cargoConyugue: string;
  telefonoEmpresaConyugue: string;
  celJefeConyugue: string;
  direccionTrabajoConyugue: string;
  idCliente: number;
}
