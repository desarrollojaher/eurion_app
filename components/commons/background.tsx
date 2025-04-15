import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AZUL, BLANCO } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";

interface Props {
  children: React.ReactNode;
}

const Background: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.fondo}>
      <Text style={styles.text}>Eurion</Text>
      {children}
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: AZUL,
  },
  text: {
    color: BLANCO,
    fontSize: convertirTamanoHorizontal(12),
    paddingHorizontal: convertirTamanoHorizontal(10),
    paddingVertical: convertirTamanoVertical(10),
    position: "absolute",
  },
});
