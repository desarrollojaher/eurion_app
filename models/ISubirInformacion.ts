export interface ISubirInformacion {
  id: string;
  tipoGestion: string;
  factura: string;
  calificacion?: string;
  fecha: string;
  cliente: string;
  identificacionCliente: string;
  observacion: string | null;
}

export interface ISubirInformacionEliminar {
  id: string;
  tipoGestion: string;
  identificacionCliente: string;
  factura: string | null;
  calificacion: string;
  modulo: "verificacion" | "gestion";
}
