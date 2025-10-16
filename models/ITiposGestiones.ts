export interface ITipoGestion {
  gcId: number | null;
  gcDescripcion: string | null;
  teId: number | null;
}

export interface ITipoGestionDetalle {
  gdId: number | null;
  gdDescripcion: string | null;
  gcId: number | null;
  gfCompromisoPago: string | null;
}

export type ITipoGestionDetalleParams = { gcId: number };

export type ITipoDatoCabeceraParams = {
  tcId: number;
};
