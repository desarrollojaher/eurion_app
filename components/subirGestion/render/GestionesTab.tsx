import { FlatList, Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import Card from "@/components/commons/card/Card";
import HeaderCard from "@/components/commons/card/HeaderCard";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Separador from "@/components/commons/separador/Separador";
import Icon from "react-native-vector-icons/FontAwesome5";
import { GRIS } from "@/constants/Colors";
import ModalAlertaSubirEliminar from "../../commons/modal/ModalAlertaSubirEliminar";

const GestionesTab = () => {
  const [modalAlertaSubida, setModalAlertaSubida] = useState(false);
  const [tipoAlerta, setTipoAlerta] = useState<"subir" | "eliminar">("subir");

  const handleTabDelete = useCallback(() => {
    setModalAlertaSubida(true);
    setTipoAlerta("eliminar");
  }, []);

  const handleTabUpload = useCallback(() => {
    setModalAlertaSubida(true);
    setTipoAlerta("subir");
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalAlertaSubida(false);
  }, []);

  const handleEliminar = useCallback(() => {}, []);

  const handleSubir = useCallback(() => {}, []);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Card>
        <HeaderCard labelLeft="AREVALO FAUSTO" labelRight="28-03-2025 12:30" />
        <Separador />
        <HeaderCard
          labelLeft="Tipo Gestion"
          labelRight="COB-REBATE"
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <HeaderCard
          labelLeft="Factura"
          labelRight="A0DFX011615"
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <HeaderCard
          labelLeft="Calificacion"
          labelRight="Positiva"
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

export default GestionesTab;

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
    width: convertirTamanoHorizontal(140),
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
