import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import InputCustom from "../input/InputCustom";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Select, { IDatosSelect } from "../select/Select";
import ButtonCustom from "../button/ButtonCustom";

interface PropsTextInput {
  placeholder?: string;
  text: string;
  onChangeText?: (text: string) => void;
  keyboardType?: "numeric" | "default";
  multiline?: boolean;
  defaultValueText?: string;
  datos?: IDatosSelect[];
  defaultValue?: IDatosSelect;
  onChangeSelect?: (value: IDatosSelect) => void;
  tipo: "text" | "select";
  direction?: "row" | "column";
  styleContainer?: any;
}

const TextInput: React.FC<PropsTextInput> = ({
  text,
  keyboardType,
  onChangeText,
  placeholder,
  defaultValueText,
  multiline = false,
  tipo = "text",
  datos,
  defaultValue,
  onChangeSelect,
  direction = "row",
  styleContainer,
}) => {
  const styleInput = useMemo(
    () =>
      direction === "column" && {
        width: "100%",
        height: convertirTamanoVertical(160),
      },
    [direction]
  );

  return (
    <View
      style={[styles.container, { flexDirection: direction }, styleContainer]}
    >
      <Text style={[styles.textStyle]}>{text}</Text>
      {tipo === "text" && (
        <InputCustom
          styleContainer={[styles.inputStyle, styleInput]}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={defaultValueText}
          multiline={multiline}
          numberOfLines={multiline ? 10 : 1}
        />
      )}
      {tipo === "select" && datos && (
        <Select
          datos={datos}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onSelect={onChangeSelect}
          styleContainer={styles.containerSelect}
        />
      )}
      {/* <ButtonCustom /> */}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textStyle: {
    fontSize: convertirTamanoHorizontal(12),
    fontWeight: "500",
    width: convertirTamanoHorizontal(130),
  },
  inputStyle: {
    width: convertirTamanoHorizontal(187),
    height: convertirTamanoVertical(50),
  },
  containerSelect: {
    width: convertirTamanoHorizontal(187),
    height: convertirTamanoVertical(50),
    borderWidth: 1,
  },
});
