import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import InputCustom from "../input/InputCustom";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Select, { IDatosSelect } from "../select/Select";
import { GRIS } from "@/constants/Colors";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome5";
import { format, parseISO } from "date-fns";
import { find } from "lodash";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface PropsTextInput {
  placeholder?: string;
  text: string;
  onChangeText?: (text: string) => void;
  multiline?: boolean;
  defaultValueText?: string;
  datos?: IDatosSelect[];
  defaultValue?: string;
  onChangeSelect?: (value: IDatosSelect) => void;
  tipo: "text" | "select" | "date";
  direction?: "row" | "column";
  styleContainer?: any;
  styleHeader?: any;
  styleTextInput?: any;
  isError?: boolean;
  labelError?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  readOnly?: boolean;
  inputMode?: "text" | "numeric" | "decimal" | "none";
  onBlurs?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const TextInput: React.FC<PropsTextInput> = ({
  text,
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
  isError,
  labelError,
  readOnly,
  inputMode = "text",
  onBlurs,
}) => {
  const [modalFecha, setModalFecha] = useState(false);

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

  const handleOpenModalFecha = useCallback(() => {
    setModalFecha(true);
  }, []);

  const handleAcceptar = useCallback(
    (event: DateTimePickerEvent, date: Date | undefined) => {
      if (event.type === "set" && date) {
        const fechaString = format(date, "yyyy-MM-dd");
        onChangeText && onChangeText(fechaString);
      }
      setModalFecha(false);
    },
    [onChangeText]
  );

  return (
    <View
      style={[styles.container, { flexDirection: direction }, styleContainer]}
    >
      {text && <Text style={[styles.textStyle, styleHeader]}>{text}</Text>}
      {tipo === "text" && (
        <InputCustom
          styleContainer={[styles.inputStyle, styleInput, styleTextInput]}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={defaultValueText}
          multiline={multiline}
          numberOfLines={multiline ? 5 : 1}
          textAlignVertical="top"
          isError={isError}
          labelError={labelError}
          readOnly={readOnly}
          inputMode={inputMode}
          onBlur={onBlurs}
        />
      )}
      {tipo === "date" && (
        <Pressable onPress={handleOpenModalFecha}>
          <InputCustom
            styleContainer={[styles.inputStyle, styleInput, styleTextInput]}
            placeholder={placeholder}
            value={defaultValueText}
            textAlignVertical="top"
            onPress={handleOpenModalFecha}
            leftIcon={
              <Icon
                name="calendar"
                color={GRIS}
                size={convertirTamanoHorizontal(25)}
              />
            }
            readOnly
            isError={isError}
            labelError={labelError}
          />
        </Pressable>
      )}
      {tipo === "select" && datos && (
        <Select
          datos={datos}
          placeholder={placeholder}
          defaultValue={find(datos, (item) => item.value === defaultValue)}
          onSelect={onChangeSelect}
          styleContainer={styles.containerSelect}
          isError={isError}
          labelError={labelError}
        />
      )}
      {modalFecha && (
        <RNDateTimePicker
          value={defaultValueText ? parseISO(defaultValueText) : new Date()}
          onChange={handleAcceptar}
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
    borderColor: GRIS,
  },
  containerSelect: {
    width: convertirTamanoHorizontal(187),
    height: convertirTamanoVertical(50),
    borderWidth: 1,
    borderColor: GRIS,
  },
});
