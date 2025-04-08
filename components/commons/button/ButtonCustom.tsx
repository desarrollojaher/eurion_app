import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { AZUL, BLANCO } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";

interface PropsButtonCustom extends TouchableOpacityProps {
  style?: any;
  label: string;
  isLoading?: boolean;
}

const ButtonCustom: React.FC<PropsButtonCustom> = ({
  style,
  label,
  isLoading,
  ...touchableProps
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...touchableProps}>
      {isLoading && <ActivityIndicator color={BLANCO} />}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({
  button: {
    backgroundColor: AZUL,
    borderRadius: convertirTamanoHorizontal(25),
    alignItems: "center",
    justifyContent: "center",
    height: convertirTamanoVertical(60),
    width: convertirTamanoHorizontal(270),
    flexDirection: "row",
    gap: convertirTamanoHorizontal(5),
  },
  label: {
    color: BLANCO,
    fontWeight: "regular",
    fontSize: convertirTamanoHorizontal(16),
  },
});
