import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import Card from "@/components/commons/card/Card";
import HeaderCard from "@/components/commons/card/HeaderCard";
import Separador from "@/components/commons/separador/Separador";
import { formatCurrency } from "@/helper/function/numericas";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { GRIS } from "@/constants/Colors";

const RecibosTabInformacionSubida = () => {
  const renderItem = useCallback(
    () => (
      <Card>
        <HeaderCard labelLeft="AREVALO FAUSTO" labelRight="28-03-2025 12: 30" />
        <Separador />
        <HeaderCard
          labelLeft="Capital"
          labelRight={formatCurrency(200)}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <HeaderCard
          labelLeft="Interes mora"
          labelRight={formatCurrency(20)}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <HeaderCard
          labelLeft="Gastos cobranza"
          labelRight={formatCurrency(2)}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <HeaderCard
          labelLeft="Total"
          labelRight={formatCurrency(222)}
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
        data={[1, 2, 3, 4, 5]}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
      />
    </View>
  );
};

export default RecibosTabInformacionSubida;

const styles = StyleSheet.create({
  flatListStyle: {
    gap: convertirTamanoVertical(10),
    marginHorizontal: convertirTamanoHorizontal(35),
  },
  styleLabelLeft: {
    width: convertirTamanoHorizontal(160),
  },
  styleLabelRigth: {
    flex: 1,
    color: GRIS,
    fontSize: convertirTamanoHorizontal(13),
  },
});
