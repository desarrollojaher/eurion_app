import { IImagenCompleta } from "./IImagenCompleta";

export interface IVerificacionPruebaCabecera {
  tipoVerificacion: string;
  fechaVerificacion: string;
  nombreCliente: string;
  cedulaCliente: string;
  telefonoCliente: string;
  direccionCliente: string;
  imagenes: IImagenCompleta[];
}

export interface IVerificacionDetalleGeneral {
  cedulaCliente: string;
  nombreCliente: string;
  estadoCivil: string;
  dependientes: number;
  telefono: string;
  referencias: string;
  observacion: string;
}

export interface IVerificacionesBuro {
  categoria: string;
  score: number;
  producto: string;
}

export interface IVerificacionDatosConyugue {
  cedulaCliente: string;
  nombreCliente: string;
  apellidoCliente: string;
  telefonoCliente: string;
}

export interface IVerificacionDatosVivienda {
  direccion: string;
  zona: string;
  tipoVivienda: string;
  nombrePropietario: string;
  telefonoPropietario: string;
  construccion: string;
}

export interface interfaceIVerificacionActividadEconomica {
  ocupacionLaboral: string;
  empresa: string;
  antiguedad: string;
  cargo: string;
  jefe: string;
  ingresos: string;
  telfonoEmpresa: string;
  celularjefe: string;
  dirreccionEmpresa: string;
}

export interface IVerificacionDetalle {
  datosGenerales: IVerificacionDetalleGeneral;
  buro: IVerificacionesBuro;
  datosConyugue?: IVerificacionDatosConyugue;
  datosVivienda?: IVerificacionDatosVivienda;
  actividadEconomica?: interfaceIVerificacionActividadEconomica;
  actividadEconomicaConyugue?: interfaceIVerificacionActividadEconomica;
}
