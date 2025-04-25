import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";

interface PropsTextCardIcon {
  textCabecera: string;
  textDetalle: string;
  icon: React.ReactNode;
  onPress: (datos: any) => void;
}

const TextCardIcon: React.FC<PropsTextCardIcon> = ({
  icon,
  textDetalle,
  textCabecera,
  onPress,
}) => {
  return (
    <View style={styles.containerCardCabecera}>
      <Text style={styles.textCardCabecera}>{textCabecera}</Text>
      <Text style={styles.textCardNombre}>{textDetalle}</Text>
      <Pressable style={styles.containerIcon} onPress={onPress}>
        {icon}
      </Pressable>
    </View>
  );
};

export default TextCardIcon;

const styles = StyleSheet.create({
  containerCardCabecera: {
    flexDirection: "row",
    gap: convertirTamanoHorizontal(5),
    marginTop: convertirTamanoVertical(5),
  },
  textCardCabecera: {
    fontWeight: "bold",
    width: convertirTamanoHorizontal(100),
    fontSize: convertirTamanoHorizontal(15),
  },
  textCardNombre: {
    width: convertirTamanoHorizontal(200),
    fontSize: convertirTamanoHorizontal(13),
  },
  containerIcon: {
    width: convertirTamanoHorizontal(30),
    height: convertirTamanoVertical(30),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
