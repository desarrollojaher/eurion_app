import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import LottieAnimation from "../lottie/LottieAnimation";
import { BLANCO } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";

interface PropsEmptyList {
  isLoading: boolean;
}
const EmptyList: React.FC<PropsEmptyList> = ({ isLoading }) => {
  const animation = useMemo(() => {
    return require("../../../assets/animations/empty.json");
  }, []);

  return !isLoading ? (
    <View style={styles.container}>
      <LottieAnimation resource={animation} />
      <Text style={styles.text}>No hay resultados</Text>
    </View>
  ) : (
    <></>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    marginTop: convertirTamanoVertical(20),
    alignItems: "center",
  },
  text: {
    color: BLANCO,
    fontSize: convertirTamanoHorizontal(20),
    marginTop: convertirTamanoVertical(13),
  },
});
