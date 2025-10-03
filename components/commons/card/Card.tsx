import { StyleSheet, View } from "react-native";
import React from "react";
import { AZUL, BLANCO, NEGRO, ROJO, TOMATE } from "@/constants/Colors";
import { convertirTamanoHorizontal } from "@/helper/function/renderizadoImagen";

interface PropsCard {
  style?: any;
  children: React.ReactNode;
  width?: number;
  heigth?: number;
}

const Card: React.FC<PropsCard> = ({ children, style, heigth, width }) => {
  return (
    <View style={[styles.card, { width: width, height: heigth }, style]}>
      {children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowColor: ROJO,
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: convertirTamanoHorizontal(10),
    backgroundColor: BLANCO,
    padding: convertirTamanoHorizontal(10),
  },
});
