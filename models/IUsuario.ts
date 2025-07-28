export interface IUsuario {
  usuNombre: string;
  identificacion: string;
  usuId: number;
}

export interface IUsuarioGeneral {
  apellidoCliente: string;
  cedulaCliente: string;
  dependientes: number;
  estadoCivil: string;
  nombreCliente: string;
  observacion: string;
  referencias: string;
  telefono: string;
  detalleAdicional: string;
}
