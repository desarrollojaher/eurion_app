export interface ITiposGestiones {
  codigo: string | null;
  descripcion: string | null;
  pideFoto: number | null;
  pideFecha: number | null;
}

export type ITiposGestionesObtener = Partial<ITiposGestiones>;

//////////////////////////////////////////

export interface ITipoGestion {
  gcId: number;
  gcDescripcion: string;
}

export interface ITipoGestionDetalle {
  gdId: number;
  gdDescripcion: string;
  gcId: number;
  gfCompromisoPago: string;
}
