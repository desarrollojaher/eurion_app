import { ICliente } from "./ICliente";
import { IConyugue } from "./IConyugue";
import { IImagenCliente, IImagenDomicilio } from "./IImagenes";
import { IVerificacion } from "./IVerificaciones";
import { IVivienda } from "./IVivienda";

// export interface ISincronizarVerificaciones {
//   fecha: string;
//   identificacionCliente: string;
//   codigoDireccion: string;
//   codigoZona: string;
//   identificacionAgente: string;
//   codigoTipoRuta: number;
//   esVerificado: number;
// }

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
  tipo: number;
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

export interface ISincronizacion {
  codigo: number;
  fecha: string | null;
}

///////////////////////////////////////////nuevo esquema

export interface ISincronizarVerificaciones {
  verificacion: IVerificacion | null;
  cliente: ICliente | null;
  conyugue: IConyugue | null;
  vivienda: IVivienda | null;
}

export interface ISincronizarVerificacionesEnviar {
  vrId: number | null;
  vrComentario: string | null;
  vdId: number | null;
  vtId: number | null;
  clId: number | null;
  usIdCobrador: number | null;
  vrFechaVerificacion: string | null;
  vrLatitud: number | null;
  vrLongitud: number | null;
  fecha: string | null;
  vcImagenBase: string;
  vcPeriodo: string | null;
  pideActualizacion: number | null;
}

export interface IVerificacionesEnviar {
  verificaciones: ISincronizarVerificacionesEnviar[];
}
