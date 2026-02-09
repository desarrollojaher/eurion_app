import { Dimensions } from "react-native";

export const convertirTamanoHorizontal = (proporcion: number) => {
  const { width, height } = Dimensions.get("window");
  const diagonal = Math.sqrt(width * width + height * height);
  const BASE_WIDTH = 412;
  const BASE_HEIGHT = 917;
  const diagonalBase = Math.sqrt(
    BASE_WIDTH * BASE_WIDTH + BASE_HEIGHT * BASE_HEIGHT,
  );
  return Math.round((proporcion / diagonalBase) * diagonal);
};

export const convertirTamanoVertical = (proporcion: number) => {
  const { width, height } = Dimensions.get("window");
  const diagonal = Math.sqrt(width * width + height * height);
  const BASE_WIDTH = 412;
  const BASE_HEIGHT = 917;
  const diagonalBase = Math.sqrt(
    BASE_WIDTH * BASE_WIDTH + BASE_HEIGHT * BASE_HEIGHT,
  );
  return Math.round((proporcion / diagonalBase) * diagonal);
};
