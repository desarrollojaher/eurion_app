import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "../commons/header/Header";
import Card from "../commons/card/Card";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import IconFont from "react-native-vector-icons/FontAwesome5";
import { AZUL, BLANCO } from "@/constants/Colors";
import ModalDatos from "./modal/ModalDatos";
import ModalSincronizarImagenes from "./modal/ModalSincronizarImagenes";
import { useSincronizacion } from "@/service/Sincronizacion/useSincronizacion";
import ModalError from "./modal/ModalError";
import ModalDatosSincronizados from "./modal/ModalDatosSincronizados";
import { useObtenerFecha } from "@/service/Sincronizacion/useObtenerFecha";

const SincronizarDatos = () => {
  const [modalImagenes, setModalImagenes] = useState(false);

  // const db = useSQLiteContext();
  // const drizzleDb = drizzle(db, { schema });

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
      <Header title="Sincronizar" />
      <View style={styles.containerFechas}>
        <Text style={styles.textStyle}>Última Sincronización:</Text>
        <Text style={styles.textStyle}>{dataFecha?.fecha ?? ""}</Text>
      </View>
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
  containerFechas: {
    marginTop: convertirTamanoVertical(40),
    flexDirection: "row",
    gap: convertirTamanoHorizontal(10),
    marginHorizontal: convertirTamanoHorizontal(35),
  },
  textStyle: {
    color: BLANCO,
  },
});
