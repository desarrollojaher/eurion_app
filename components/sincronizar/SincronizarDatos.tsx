import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "../commons/header/Header";
import Card from "../commons/card/Card";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import IconFont from "react-native-vector-icons/FontAwesome5";
import { AZUL } from "@/constants/Colors";
import ModalDatos from "./modal/ModalDatos";
import ModalSincronizarImagenes from "./modal/ModalSincronizarImagenes";

const SincronizarDatos = () => {
  const [modalInformacion, setModalInformacion] = useState(false);
  const [modalImagenes, setModalImagenes] = useState(false);

  const handleSincronizarDatos = useCallback(() => {
    setModalInformacion(true);
  }, []);
  const handleSincronizarImagenes = useCallback(() => {
    setModalImagenes(true);
  }, []);

  const handleCloseModalInformacion = useCallback(() => {
    setModalInformacion(false);
  }, []);

  const handleCloseModalImagenes = useCallback(() => {
    setModalImagenes(false);
  }, []);

  return (
    <View>
      <Header title="Sincronizar" />
      <View style={styles.containerBotones}>
        <Card
          width={convertirTamanoHorizontal(160)}
          heigth={convertirTamanoVertical(156)}
          style={styles.styleCard}
        >
          <TouchableOpacity onPress={handleSincronizarDatos}>
            <IconFont
              name="info"
              color={AZUL}
              size={convertirTamanoHorizontal(60)}
              style={styles.iconModulosStyle}
            />
            <Text style={styles.textIconos}>Información</Text>
          </TouchableOpacity>
        </Card>
        <Card
          width={convertirTamanoHorizontal(160)}
          heigth={convertirTamanoVertical(156)}
          style={styles.styleCard}
        >
          <TouchableOpacity onPress={handleSincronizarImagenes}>
            <IconFont
              name="file-image"
              color={AZUL}
              size={convertirTamanoHorizontal(60)}
              style={styles.iconModulosStyle}
            />
            <Text style={styles.textIconos}>Imagenes</Text>
          </TouchableOpacity>
        </Card>
      </View>

      {modalInformacion && (
        <ModalDatos
          onClose={handleCloseModalInformacion}
          visible={modalInformacion}
        />
      )}
      {modalImagenes && (
        <ModalSincronizarImagenes
          onClose={handleCloseModalImagenes}
          visible={modalImagenes}
        />
      )}
    </View>
  );
};

export default SincronizarDatos;

const styles = StyleSheet.create({
  containerBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: convertirTamanoVertical(57),
    marginHorizontal: convertirTamanoHorizontal(35),
  },
  styleCard: {
    justifyContent: "center",
  },
  iconModulosStyle: {
    alignSelf: "center",
    marginBottom: convertirTamanoVertical(18),
  },
  textIconos: {
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "regular",
    color: AZUL,
    textAlign: "center",
  },
});
