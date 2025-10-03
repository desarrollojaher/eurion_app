import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "../commons/header/Header";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import IconFont from "react-native-vector-icons/FontAwesome5";
import { AZUL, AZUL_CLARO, AZUL_ICONO, BLANCO, ROJO } from "@/constants/Colors";
import ModalDatos from "./modal/ModalDatos";
import ModalSincronizarImagenes from "./modal/ModalSincronizarImagenes";
import { useSincronizacion } from "@/service/Sincronizacion/useSincronizacion";
import ModalError from "./modal/ModalError";
import ModalDatosSincronizados from "./modal/ModalDatosSincronizados";
import { useObtenerFecha } from "@/service/Sincronizacion/useObtenerFecha";
import { LinearGradient } from "expo-linear-gradient";

const SincronizarDatos = () => {
  const [modalImagenes, setModalImagenes] = useState(false);

  const {
    index,
    loading,
    sincronizar,
    tabla,
    cantidadDatos,
    error,
    errorMessage,
    onCloseError,
    onCloseSincronizado,
    sincronizado,
  } = useSincronizacion();

  const { data: dataFecha } = useObtenerFecha();

  const handleSincronizarDatos = useCallback(() => {
    sincronizar();
  }, [sincronizar]);

  const handleCloseModalInformacion = useCallback(() => {
    console.log("cerro en la sincronizcion");
  }, []);

  const handleCloseModalImagenes = useCallback(() => {
    setModalImagenes(false);
  }, []);

  return (
    <View>
      <LinearGradient
        colors={[AZUL, AZUL_CLARO]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.containerHeaderLinear}
      >
        <Header title="Sincronizar" sincronizacion={true} />
        <View style={styles.containerFechas}>
          <Text style={styles.textStyle}>Última Sincronización:</Text>
          <Text style={styles.textStyle}>
            {dataFecha?.fecha ?? "No sincronizado"}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.containerBotones}>
        <LinearGradient
          colors={[AZUL, AZUL_CLARO]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.styleCard}
        >
          <TouchableOpacity
            onPress={handleSincronizarDatos}
            style={styles.styleTouchable}
          >
            <View style={styles.containerIcon}>
              <IconFont
                name="info"
                color={BLANCO}
                size={convertirTamanoHorizontal(30)}
              />
            </View>
            <Text style={styles.textIconos}>Información</Text>
          </TouchableOpacity>
        </LinearGradient>
        {/* <Card
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
        </Card> */}
      </View>

      {loading && (
        <ModalDatos
          onClose={handleCloseModalInformacion}
          visible={loading}
          tabla={tabla}
          index={index}
          cantidadDatos={cantidadDatos}
        />
      )}
      {error && (
        <ModalError
          onClose={onCloseError}
          errorMessage={errorMessage}
          tabla={tabla}
          visible={error}
        />
      )}
      {sincronizado && (
        <ModalDatosSincronizados
          onClose={onCloseSincronizado}
          visible={sincronizado}
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
    marginTop: convertirTamanoVertical(20),
    marginHorizontal: convertirTamanoHorizontal(35),
  },
  styleCard: {
    justifyContent: "center",
    width: convertirTamanoHorizontal(170),
    height: convertirTamanoVertical(170),
    borderRadius: convertirTamanoHorizontal(20),
  },
  iconModulosStyle: {
    alignSelf: "center",
    marginBottom: convertirTamanoVertical(18),
  },
  textIconos: {
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "bold",
    color: BLANCO,
    textAlign: "center",
  },
  containerFechas: {
    marginTop: convertirTamanoVertical(20),
    flexDirection: "row",
    gap: convertirTamanoHorizontal(10),
    marginHorizontal: convertirTamanoHorizontal(35),
  },
  textStyle: {
    color: BLANCO,
  },
  styleTouchable: { alignItems: "center" },
  containerIcon: {
    marginBottom: convertirTamanoVertical(18),
    width: convertirTamanoHorizontal(60),
    height: convertirTamanoHorizontal(60),
    borderRadius: convertirTamanoHorizontal(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AZUL_ICONO,
  },
  containerHeaderLinear: {
    height: convertirTamanoVertical(130),
    borderColor: ROJO,
    borderBottomWidth: convertirTamanoVertical(2),
  },
});
