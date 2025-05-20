import { IImagenCliente, IImagenDomicilio } from "./IImagenes";

export interface ISincronizarVerificaciones {
  fecha: string;
  identificacionCliente: string;
  codigoDireccion: string;
  codigoZona: string;
  identificacionAgente: string;
  codigoTipoRuta: number;
  esVerificado: number;
}

export interface ISincronizarClientes {
  identificacion: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  estadoCivil: string;
  nroDependientes: number;
  ocupacionLaboral: string;
  nombreEmpresa: string;
  antiguedad: string;
  cargo: string;
  nombreJefe: string;
  ingresos: number;
  telefonoEmpresa: string;
  celularJefe: string;
  direccionEmpresa: string;
  referencias: string;
  observacion: string;
  cupoCredito: number;
  montoDisponible: number;
  chequesPendientes: number;
  productos: string;
  score: number;
  categoria: string;
  telefonoDuenoCasa: string;
}

export interface ISincronizarConyugue {
  identificacionCliente: string;
  nombres: string;
  identificacion: string;
  apellidos: string;
  ocupacionLaboral: string;
  nombreEmpresa: string;
  antiguedad: string;
  cargo: string;
  nombreJefe: string;
  ingresos: number;
  telefonoEmpresa: string;
  celularJefe: string;
  direccionEmpresa: string;
  direccionEmpresa1: string;
  referencias: string;
  celularConyuge: string;
}

export interface ISincronizarDirecciones {
  codigo: string;
  identificacionCliente: string;
  direccion: string;
  tipoVivienda: string;
  nombreDueno: string;
  latitud: number;
  longitud: number;
  observacionesAdicionales: string;
  tipoResidencia: string;
  tipoConstruccion: string;
}

export interface ISincronizarZona {
  codigo: string;
  nombres: string;
}

export interface ISincronizarImagenCliente {
  totalPaginas: number;
  paginaActual: number;
  itemsPorPagina: number;
  paginaSiguiente: number | null;
  datos: IImagenCliente[];
}

export interface ISincronizarimagenesDomicilio {
  totalPaginas: number;
  paginaActual: number;
  itemsPorPagina: number;
  paginaSiguiente: number | null;
  datos: IImagenDomicilio[];
}

export interface ISincronizarImagenesParams {
  paginaActual: number;
  itemPagina: number;
}

