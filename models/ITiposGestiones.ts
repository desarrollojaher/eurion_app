export interface ITiposGestiones {
  codigo: string | null;
  descripcion: string | null;
  pideFoto: number | null;
  pideFecha: number | null;
}

export type ITiposGestionesObtener = Partial<ITiposGestiones>;

//////////////////////////////////////////

export interface ITipoGestion {
  gcId: number | null;
  gcDescripcion: string | null;
}

export interface ITipoGestionDetalle {
  gdId: number | null;
  gdDescripcion: string | null;
  gcId: number | null;
  gfCompromisoPago: string | null;
}

export type ITipoGestionDetalleParams = { gcId: number };
