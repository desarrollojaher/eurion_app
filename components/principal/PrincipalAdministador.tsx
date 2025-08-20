import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BLANCO } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { useSession } from "@/helper/provider/Auth";
import ModalCerrarSesion from "./modal/ModalCerrarSesion";

const PrincipalAdministador = () => {
  const [modalCerrarSesion, setModalCerrarSesion] = useState(false);

  const { usuario } = useSession();
  const handleOpenModalCerrarSesion = useCallback(() => {
    setModalCerrarSesion(true);
  }, []);

  const handleCloseModalCerrarSesion = useCallback(() => {
    setModalCerrarSesion(false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>
          Bienvenido {usuario?.usuNombre.split(" ")[0]}
        </Text>
        <Pressable
          onPress={handleOpenModalCerrarSesion}
          style={styles.iconStyle}
        >
          <Icon
            name={"logout"}
            size={convertirTamanoHorizontal(30)}
            color={BLANCO}
          />
        </Pressable>
      </View>
      {modalCerrarSesion && (
        <ModalCerrarSesion
          onClose={handleCloseModalCerrarSesion}
          visible={modalCerrarSesion}
        />
      )}
    </View>
  );
};

export default PrincipalAdministador;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: convertirTamanoHorizontal(35),
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: convertirTamanoVertical(72),
  },
  textHeader: {
    width: convertirTamanoHorizontal(290),
    fontSize: convertirTamanoHorizontal(25),
    fontWeight: "bold",
    color: BLANCO,
  },
  iconStyle: {
    width: convertirTamanoHorizontal(40),
    height: convertirTamanoVertical(40),
    justifyContent: "center",
    alignItems: "center",
  },
});
