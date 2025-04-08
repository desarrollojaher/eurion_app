import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Icon from "react-native-vector-icons/Feather";
import { GRIS, NEGRO } from "@/constants/Colors";

interface PropsInputCustom extends TextInputProps {
  labelError?: string;
  isError?: boolean;
  styleContainer?: any;
  styleInput?: any;
  isPassword?: boolean;
}

const InputCustom: React.FC<PropsInputCustom> = ({
  labelError,
  isError,
  isPassword,
  styleContainer,
  styleInput,
  ...inputsProps
}) => {
  const [pass, setPass] = useState(isPassword);
  const handleShowPassword = useCallback(() => {
    setPass(!pass);
  }, [pass]);

  return (
    <View>
      <View style={[styles.input, styleContainer]}>
        <TextInput
          style={[styles.textInputStyle, styleInput]}
          {...inputsProps}
          secureTextEntry={pass}
        />
        {isPassword && (
          <Pressable onPress={handleShowPassword} style={styles.iconStyle}>
            <Icon
              name={pass ? "eye" : "eye-off"}
              size={convertirTamanoHorizontal(20)}
            />
          </Pressable>
        )}
      </View>
      {isError && <Text>{labelError}</Text>}
    </View>
  );
};

export default InputCustom;

const styles = StyleSheet.create({
  input: {
    width: convertirTamanoHorizontal(270),
    height: convertirTamanoVertical(60),
    borderRadius: convertirTamanoHorizontal(30),
    borderWidth: 1,
    paddingHorizontal: convertirTamanoHorizontal(15),
    justifyContent: "center",
    alignItems: "center",
    borderColor: GRIS,
    display: "flex",
    flexDirection: "row",
    gap: convertirTamanoHorizontal(5),
  },
  textInputStyle: {
    flex: 1,
    color: NEGRO,
  },
  iconStyle: {
    width: convertirTamanoHorizontal(40),
    height: convertirTamanoVertical(40),
    justifyContent: "center",
    alignItems: "center",
  },
});
