import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import ButtonCustom from "../commons/button/ButtonCustom";
import { AZUL, BLANCO, GRIS_CLARO, ROJO } from "@/constants/Colors";
import ImagenContainer from "../commons/imagen/ImagenContainer";
import InputCustom from "../commons/input/InputCustom";
import { useSession } from "@/helper/provider/Auth";
import { useIniciarSesion } from "@/service/Auth/useIniciarSesion";
import { Toast } from "toastify-react-native";
const logo = require("@/assets/images/logos.png");
const IniciarSesionComponent = () => {
  const [usuario, setUsuario] = useState("");
  const [contra, setContra] = useState("");

  const { signIn } = useSession();
  const { mutate: iniciarSesion, isPending: isLoading } = useIniciarSesion();

  const handleIniciarSesion = useCallback(() => {
    if (usuario.trim() === "" || contra.trim() === "") {
      Toast.error("Por favor, complete todos los campos");
      return;
    }

    iniciarSesion(
      { usuAlias: usuario, usuContrasena: contra },
      {
        onSuccess: (res) => {
          signIn(res.token);
        },
      },
    );
  }, [contra, iniciarSesion, signIn, usuario]);

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
            value={usuario}
            onChangeText={setUsuario}
          />
          <Text style={styles.textInpusts}>Contraseña</Text>
          <InputCustom
            placeholder="Contraseña"
            styleContainer={styles.inputStyle}
            isPassword={true}
            value={contra}
            onChangeText={setContra}
          />
          <Pressable style={styles.containerRecover}>
            <Text style={styles.textRecover}>Recuperar contraseña</Text>
          </Pressable>
          <ButtonCustom
            label="Iniciar Sesión"
            style={styles.buttonStyle}
            onPress={handleIniciarSesion}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </View>

        <View style={styles.containerVersion}>
          <Text style={styles.textVersion}>Version: {version}</Text>
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
    borderWidth: convertirTamanoHorizontal(2),
    borderColor: GRIS_CLARO,
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
  containerVersion: {
    marginTop: convertirTamanoVertical(35),
    borderWidth: convertirTamanoHorizontal(1),
    borderColor: ROJO,
    height: convertirTamanoVertical(60),
    margin: convertirTamanoHorizontal(20),
    borderRadius: convertirTamanoHorizontal(10),
    justifyContent: "center",
  },
  textVersion: {
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "semibold",
    color: AZUL,
    textAlign: "center",
  },
});
