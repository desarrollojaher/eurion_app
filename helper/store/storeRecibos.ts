import { create } from "zustand";
import { IRecibo } from "@/models/IRecibo";

type IRecibosStore = {
  datos: IRecibo | null;
  eliminar: () => void;
  setDatos: (dato: IRecibo) => void;
};

export const useReciboStore = create<IRecibosStore>()((set, get) => ({
  datos: null,
  eliminar: () => set(() => ({ datos: null })),
  setDatos: (dato: IRecibo) => set(() => ({ datos: dato })),
}));
