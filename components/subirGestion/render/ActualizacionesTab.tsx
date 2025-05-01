import { FlatList, Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import Card from "@/components/commons/card/Card";
import HeaderCard from "@/components/commons/card/HeaderCard";
import Separador from "@/components/commons/separador/Separador";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Icon from "react-native-vector-icons/FontAwesome5";
import { GRIS } from "@/constants/Colors";
import ModalAlertaSubirEliminar from "@/components/commons/modal/ModalAlertaSubirEliminar";

const ActualizacionesTab = () => {
  const [modalAlertaSubida, setModalAlertaSubida] = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState<"subir" | "eliminar">("subir");
  const handleTabDelete = useCallback(() => {
    console.log("handleTabDelete");
  }, []);

  const handleTabUpload = useCallback(() => {
    console.log("handleTabUpload");
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalAlertaSubida(false);
  }, []);

  const handleEliminar = useCallback(() => {}, []);

  const handleSubir = useCallback(() => {}, []);

  const renderItem = useCallback(
    () => (
      <Card>
        <HeaderCard labelLeft="AREVALO FAUSTO" labelRight="28-03-2025 12: 30" />
        <Separador />
        <HeaderCard
          labelLeft="Direccion"
          labelRight="DOM cristobal colon 1 doce de octubre y la que cruza"
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador />
        <View style={styles.containerBotones}>
          <Pressable style={styles.pressableStyle} onPress={handleTabDelete}>
            <Icon name="trash" size={convertirTamanoHorizontal(30)} />
          </Pressable>
          <Pressable style={styles.pressableStyle} onPress={handleTabUpload}>
            <Icon name="upload" size={convertirTamanoHorizontal(30)} />
          </Pressable>
        </View>
      </Card>
    ),
    [handleTabDelete, handleTabUpload]
  );
  return (
    <View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
      />
      {modalAlertaSubida && (
        <ModalAlertaSubirEliminar
          onClose={handleCloseModal}
          visible={modalAlertaSubida}
          tipo={tipoAlerta}
          handleEliminar={handleEliminar}
          handleSubir={handleSubir}
        />
      )}
    </View>
  );
};

export default ActualizacionesTab;

const styles = StyleSheet.create({
  flatListStyle: {
    gap: convertirTamanoVertical(10),
    marginHorizontal: convertirTamanoHorizontal(35),
  },
  containerBotones: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: convertirTamanoVertical(10),
  },
  styleLabelLeft: {
    width: convertirTamanoHorizontal(120),
  },
  styleLabelRigth: {
    flex: 1,
    color: GRIS,
    fontSize: convertirTamanoHorizontal(13),
  },
  pressableStyle: {
    width: convertirTamanoHorizontal(40),
    height: convertirTamanoHorizontal(40),
    justifyContent: "center",
    alignItems: "center",
  },
});
