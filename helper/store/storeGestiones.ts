import { create } from "zustand";
import { IGestionesCabecera } from "@/models/IGestiones";

type IGestionStore = {
  datos: IGestionesCabecera | null;
  eliminar: () => void;
  setDatos: (dato: IGestionesCabecera) => void;
};

export const useGestionStore = create<IGestionStore>()((set, get) => ({
  datos: null,
  eliminar: () => set(() => ({ datos: null })),
  setDatos: (dato: IGestionesCabecera) => set(() => ({ datos: dato })),
}));
