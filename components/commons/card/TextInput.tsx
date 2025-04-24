import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import InputCustom from "../input/InputCustom";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Select, { IDatosSelect } from "../select/Select";

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
  styleHeader?: any;
  styleTextInput?: any;
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
  styleHeader,
  styleTextInput,
}) => {
  const styleInput = useMemo(
    () =>
      direction === "column" && multiline
        ? {
            width: "100%",
            height: convertirTamanoVertical(160),
          }
        : {
            width: "100%",
            height: convertirTamanoVertical(60),
          },
    [direction, multiline]
  );

  return (
    <View
      style={[styles.container, { flexDirection: direction }, styleContainer]}
    >
      {text && <Text style={[styles.textStyle, styleHeader]}>{text}</Text>}
      {tipo === "text" && (
        <InputCustom
          styleContainer={[styles.inputStyle, styleInput, styleTextInput]}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={defaultValueText}
          multiline={multiline}
          numberOfLines={multiline ? 5 : 1}
          textAlignVertical="top"
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
