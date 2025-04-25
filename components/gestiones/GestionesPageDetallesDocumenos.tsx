import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import Card from "../commons/card/Card";
import HeaderCard from "../commons/card/HeaderCard";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { GRIS } from "@/constants/Colors";
import ModalDocumentos from "./modal/ModalDocumentos";
import { IDocumento } from "@/models/IGestionesPrueba";

const GestionesPageDetallesDocumenos = () => {
  const [documento, setDocumento] = useState<IDocumento | null>(null);
  const [modalDocumentos, setModalDocumentos] = useState(false);

  const handleOpenDocumeno = useCallback(() => {
    setDocumento({
      doctran: "12345",
      tramo: "A",
      cuotasPagadas: "10",
      cuotasPendientes: "5",
      fechaVencimiento: "2025-05-01",
      fechaUltPago: "2025-04-01",
      valorCuota: "100.00",
      saldoVencido: "50.00",
      interesesMora: "5.00",
      gastosCobranza: "10.00",
      saldoCapital: "500.00",
      deudaTotal: "565.00",
    });
    setModalDocumentos(true);
  }, []);

  const handleCloseModalDocumenos = useCallback(() => {
    setModalDocumentos(false);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Card width={convertirTamanoHorizontal(370)} style={styles.styleCard}>
        <TouchableOpacity onPress={handleOpenDocumeno}>
          <HeaderCard
            labelLeft="A0AGX0093"
            labelRight="25-02-2025"
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigthCabecera}
          />
          <HeaderCard
            labelLeft="Pago"
            labelRight="4/19"
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <HeaderCard
            labelLeft="Deuda Total"
            labelRight="$ 597.05"
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <HeaderCard
            labelLeft="Saldo Vencido"
            labelRight="$ 402.00"
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <HeaderCard
            labelLeft="Producto"
            labelRight="Motocicleta shineray"
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
        </TouchableOpacity>
      </Card>
    ),
    [handleOpenDocumeno]
  );

  return (
    <View style={styles.container}>
      <Card
        width={convertirTamanoHorizontal(370)}
        heigth={convertirTamanoVertical(100)}
      >
        <HeaderCard
          labelLeft="Saldo Vencido"
          labelRight="$ 30.6"
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <HeaderCard
          labelLeft="Deuda Total"
          labelRight="$ 2340.52"
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
      </Card>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7]}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
      />
      {modalDocumentos && documento && (
        <ModalDocumentos
          visible={modalDocumentos}
          onClose={handleCloseModalDocumenos}
          data={documento}
        />
      )}
    </View>
  );
};

export default GestionesPageDetallesDocumenos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: convertirTamanoVertical(20),
    gap: convertirTamanoVertical(20),
  },
  styleLabelLeft: {
    width: convertirTamanoHorizontal(130),
  },
  styleLabelRigth: {
    width: convertirTamanoHorizontal(240),
    color: GRIS,
    fontSize: convertirTamanoHorizontal(15),
  },
  styleLabelRigthCabecera: {
    color: GRIS,
    fontSize: convertirTamanoHorizontal(15),
  },
  styleCard: {
    gap: convertirTamanoVertical(10),
  },
  flatListStyle: {
    gap: convertirTamanoVertical(10),
    paddingBottom: convertirTamanoVertical(10),
  },
});
