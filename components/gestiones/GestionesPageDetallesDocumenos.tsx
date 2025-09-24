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

import { IGestionesCabecera } from "@/models/IGestiones";
import { formatCurrency } from "@/helper/function/numericas";
import { IDocumentosCabecera } from "@/models/IDocumentos";
import { format } from "date-fns";

interface PropsGestionesPageDetallesDocumenos {
  datos: IGestionesCabecera;
}
const GestionesPageDetallesDocumenos: React.FC<
  PropsGestionesPageDetallesDocumenos
> = ({ datos }) => {
  const [modalDocumentos, setModalDocumentos] = useState(false);
  const [documentoSeleccionado, setDocumentoSeleccionado] =
    useState<string>("");

  // const { data: datosDocumentos } = useDocumentosCabeceraObtener({
  //   identificacion: datos.identificacionCliente,
  // });

  const handleOpenDocumeno = useCallback((nroDocumento: string) => {
    setDocumentoSeleccionado(nroDocumento);
    setModalDocumentos(true);
  }, []);

  const handleCloseModalDocumenos = useCallback(() => {
    setModalDocumentos(false);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: IDocumentosCabecera; index: number }) => (
      <Card width={convertirTamanoHorizontal(370)} style={styles.styleCard}>
        <TouchableOpacity onPress={() => handleOpenDocumeno(item.nroDocumento)}>
          <HeaderCard
            labelLeft={item.nroDocumento}
            labelRight={format(item.fecha, "dd-MM-yyyy HH:mm:ss")}
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigthCabecera}
          />
          <HeaderCard
            labelLeft="Pago"
            labelRight={item.cuotasPagadas}
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <HeaderCard
            labelLeft="Deuda Total"
            labelRight={formatCurrency(item.deudaTotal)}
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <HeaderCard
            labelLeft="Saldo Vencido"
            labelRight={formatCurrency(item.saldoVencido)}
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <HeaderCard
            labelLeft="Producto"
            labelRight={item.producto}
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
          labelRight={formatCurrency(2)}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <HeaderCard
          labelLeft="Deuda Total"
          labelRight={formatCurrency(3)}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
      </Card>
      <FlatList
        data={[]}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
      />
      {modalDocumentos && documentoSeleccionado !== "" && (
        <ModalDocumentos
          visible={modalDocumentos}
          onClose={handleCloseModalDocumenos}
          data={documentoSeleccionado}
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
    width: convertirTamanoHorizontal(235),
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
