import { Dimensions } from "react-native";

export const convertirTamanoHorizontal = (proporcion: number) => {
  const { width } = Dimensions.get("window");
  const BASE_WIDTH = 412; // ancho de referencia para el diseño
  return Math.round((proporcion / BASE_WIDTH) * width);
};

export const convertirTamanoVertical = (proporcion: number) => {
  const { height } = Dimensions.get("window");
  const BASE_HEIGHT = 917; // alto de referencia para el diseño
  return Math.round((proporcion / BASE_HEIGHT) * height);
};
