import { StyleSheet, View } from "react-native";
import React from "react";
import { GRIS } from "@/constants/Colors";
import { convertirTamanoVertical } from "@/helper/function/renderizadoImagen";

interface PropsSeparador {
  width?: number;
  color?: string;
  marginVertical?: number;
}
const Separador: React.FC<PropsSeparador> = ({
  width = 1,
  color = GRIS,
  marginVertical = 5,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomWidth: convertirTamanoVertical(width),
          borderColor: color,
          marginVertical: convertirTamanoVertical(marginVertical),
        },
      ]}
    />
  );
};

export default Separador;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: convertirTamanoVertical(1),
    borderColor: GRIS,
    marginVertical: convertirTamanoVertical(5),
  },
});
