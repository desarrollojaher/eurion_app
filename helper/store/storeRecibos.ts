import { create } from "zustand";
import { IRecibosCabecera } from "@/models/IRecibo";

type IRecibosStore = {
  datos: IRecibosCabecera | null;
  eliminar: () => void;
  setDatos: (dato: IRecibosCabecera) => void;
};

export const useReciboStore = create<IRecibosStore>()((set, get) => ({
  datos: null,
  eliminar: () => set(() => ({ datos: null })),
  setDatos: (dato: IRecibosCabecera) => set(() => ({ datos: dato })),
}));
