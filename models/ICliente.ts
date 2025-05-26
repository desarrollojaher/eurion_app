export interface ICliente {
  identificacion: string | null;
  nombres: string | null;
  apellido: string | null;
  estadoCivil: string | null;
  dependientes: number | null;
  telefono: string | null;
  referencias: string | null;
  observacion: string | null;
}

export interface IClienteParams {
  identificacion: string;
}

export interface IClienteGaranteCobranza {
  identificacion: string | null;
  nombres: string | null;
  telefono: string | null;
  direccion: string | null;
  detalleDireccion: string | null;
  trabajaEn: string | null;
  direccionTrabajo: string | null;
  telefonoTrabajo: string | null;
  celular: string | null;
}
