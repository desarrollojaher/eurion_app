import { create } from "zustand";
import { IGestiones } from "@/models/IGestiones";

type IGestionStore = {
  datos: IGestiones | null;
  eliminar: () => void;
  setDatos: (dato: IGestiones) => void;
};

export const useGestionStore = create<IGestionStore>()((set, get) => ({
  datos: null,
  eliminar: () => set(() => ({ datos: null })),
  setDatos: (dato: IGestiones) => set(() => ({ datos: dato })),
}));
