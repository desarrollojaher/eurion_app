import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback } from "react";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import ButtonCustom from "../commons/button/ButtonCustom";
import { BLANCO } from "@/constants/Colors";
import ImagenContainer from "../commons/imagen/ImagenContainer";
import InputCustom from "../commons/input/InputCustom";
import { useSession } from "@/helper/provider/Auth";
const logo = require("@/assets/images/logo.png");
const IniciarSesionComponent = () => {
  const { signIn } = useSession();

  const handleIniciarSesion = useCallback(() => {
    signIn("fmsnjnjn");
  }, [signIn]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.card}>
          <ImagenContainer url={logo} style={styles.imagen} />
          <Text style={styles.textoTitulo}>Iniciar Sesión</Text>
          <Text style={styles.textoSubtitulo}>Bienvenido nuevamente</Text>
          <Text style={styles.textInpusts}>Usuario</Text>
          <InputCustom
            placeholder="Usuario"
            styleContainer={styles.inputStyle}
          />
          <Text style={styles.textInpusts}>Contraseña</Text>
          <InputCustom
            placeholder="Contraseña"
            styleContainer={styles.inputStyle}
            isPassword={true}
          />
          <Pressable style={styles.containerRecover}>
            <Text style={styles.textRecover}>Recuperar contraseña</Text>
          </Pressable>
          <ButtonCustom
            label="Iniciar Sesión"
            style={styles.buttonStyle}
            onPress={handleIniciarSesion}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default IniciarSesionComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: convertirTamanoHorizontal(312),
    height: convertirTamanoVertical(600),
    backgroundColor: BLANCO,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: convertirTamanoHorizontal(25),
  },
  imagen: {
    marginTop: convertirTamanoVertical(36),
  },
  textoTitulo: {
    marginTop: convertirTamanoVertical(27),
    fontSize: convertirTamanoHorizontal(25),
    fontWeight: "bold",
  },
  textoSubtitulo: {
    marginTop: convertirTamanoVertical(15),
    fontSize: convertirTamanoHorizontal(14),
    fontWeight: "regular",
  },
  textInpusts: {
    fontSize: convertirTamanoHorizontal(14),
    fontWeight: "regular",
    marginTop: convertirTamanoVertical(30),
    alignSelf: "flex-start",
    marginLeft: convertirTamanoHorizontal(26),
  },
  inputStyle: {
    marginTop: convertirTamanoVertical(15),
  },
  buttonStyle: {
    marginTop: convertirTamanoVertical(25),
    marginBottom: convertirTamanoVertical(25),
  },
  containerRecover: {
    alignSelf: "flex-end",
    marginHorizontal: convertirTamanoHorizontal(25),
    marginVertical: convertirTamanoVertical(5),
  },
  textRecover: {
    fontSize: convertirTamanoHorizontal(12),
  },
});
