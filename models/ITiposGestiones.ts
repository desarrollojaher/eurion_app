export interface ITiposGestiones {
  codigo: string | null;
  descripcion: string | null;
  pideFoto: number | null;
  pideFecha: number | null;
}

export type ITiposGestionesObtener = Partial<ITiposGestiones>;
