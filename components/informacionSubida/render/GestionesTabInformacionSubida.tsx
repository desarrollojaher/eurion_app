import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import Card from "@/components/commons/card/Card";
import HeaderCard from "@/components/commons/card/HeaderCard";
import Separador from "@/components/commons/separador/Separador";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { GRIS } from "@/constants/Colors";

const GestionesTabInformacionSubida = () => {
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
      </Card>
    ),
    []
  );

  return (
    <View>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
      />
    </View>
  );
};

export default GestionesTabInformacionSubida;

const styles = StyleSheet.create({
  flatListStyle: {
    gap: convertirTamanoVertical(10),
    marginHorizontal: convertirTamanoHorizontal(35),
  },
  styleLabelLeft: {
    width: convertirTamanoHorizontal(140),
  },
  styleLabelRigth: {
    flex: 1,
    color: GRIS,
    fontSize: convertirTamanoHorizontal(13),
  },
});
