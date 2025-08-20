import { useSession } from "@/helper/provider/Auth";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ImagenContainer from "../commons/imagen/ImagenContainer";
import ButtonCustom from "../commons/button/ButtonCustom";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { BLANCO, GRIS_CLARO } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Toast } from "toastify-react-native";

const logo = require("@/assets/images/logos.png");
const RolesPage = () => {
  const [rol, setRol] = useState("");

  const { usuario } = useSession();

  const handleSeleccionar = useCallback((item: string) => {
    setRol(item);
  }, []);

  const handleGuardar = useCallback(async () => {
    if (rol === "COBRADOR") {
      await AsyncStorage.setItem("rol", rol);
      router.replace("/principal/dashboard");
    } else if (rol === "ADMINISTRADOR") {
      await AsyncStorage.setItem("rol", rol);
      router.replace("/principal/dashboard-administrador");
    } else {
      Toast.error("Seleccione un rol");
    }
  }, [rol]);

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <Pressable onPress={() => handleSeleccionar(item)}>
        <View style={[styles.item, rol === item && styles.seleccionado]}>
          <Text>{item}</Text>
        </View>
      </Pressable>
    ),
    [handleSeleccionar, rol],
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.card}>
          <ImagenContainer url={logo} style={styles.imagen} />
          <Text style={styles.textoTitulo}>Roles</Text>
          <Text style={styles.textoSubtitulo}>Seleccione el rol</Text>
          <FlatList data={usuario?.roles} renderItem={renderItem} />

          <ButtonCustom
            label="Seleccionar"
            style={styles.buttonStyle}
            onPress={handleGuardar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RolesPage;
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
    marginBottom: convertirTamanoVertical(20),
  },
  buttonStyle: {
    marginTop: convertirTamanoVertical(25),
    marginBottom: convertirTamanoVertical(25),
  },
  item: {
    width: convertirTamanoHorizontal(250),
    paddingVertical: convertirTamanoVertical(20),
    marginVertical: convertirTamanoVertical(8),
    alignItems: "center",
    borderWidth: convertirTamanoHorizontal(1),
    borderColor: GRIS_CLARO,
  },
  presionable: {
    width: convertirTamanoHorizontal(250),
  },
  seleccionado: {
    backgroundColor: GRIS_CLARO,
  },
});
