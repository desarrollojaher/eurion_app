import { create } from "zustand";
import { IDocumentosRecibos } from "@/models/IDocumentos";

type IRecibosStore = {
  datos: IDocumentosRecibos | null;
  eliminar: () => void;
  setDatos: (dato: IDocumentosRecibos) => void;
};

export const useReciboStore = create<IRecibosStore>()((set, get) => ({
  datos: null,
  eliminar: () => set(() => ({ datos: null })),
  setDatos: (dato: IDocumentosRecibos) => set(() => ({ datos: dato })),
}));
