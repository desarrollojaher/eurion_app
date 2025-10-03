import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Card from "../commons/card/Card";
import HeaderCard from "../commons/card/HeaderCard";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { GRIS, GRIS_CLARO } from "@/constants/Colors";
import ModalDocumentos from "./modal/ModalDocumentos";

import { IGestionesCabecera } from "@/models/IGestiones";
import { formatCurrency } from "@/helper/function/numericas";
import { format } from "date-fns";
import { useComprobantesObtener } from "@/service/Comprobantes/useComprobantesObtener";
import { IComprobanteObtener } from "@/models/IComprobante";
import { sumBy } from "lodash";

interface PropsGestionesPageDetallesDocumenos {
  datos: IGestionesCabecera;
}
const GestionesPageDetallesDocumenos: React.FC<
  PropsGestionesPageDetallesDocumenos
> = ({ datos }) => {
  const [modalDocumentos, setModalDocumentos] = useState(false);
  const [documentoSeleccionado, setDocumentoSeleccionado] =
    useState<IComprobanteObtener | null>(null);

  const { data: datosDocumentos } = useComprobantesObtener({
    clId: datos.cliId,
  });

  const deudaTotal = useMemo(() => {
    return sumBy(datosDocumentos, (item) => item.valorTotalCredito ?? 0);
  }, [datosDocumentos]);

  const saldoTotal = useMemo(() => {
    return sumBy(
      datosDocumentos,
      (item) =>
        (item.crSaldoCredito ?? 0) +
        (item.crSaldoInteres ?? 0) +
        (item.interesGastoCobranza ?? 0) +
        (item.interesGastoMora ?? 0),
    );
  }, [datosDocumentos]);

  const handleOpenDocumeno = useCallback(
    (nroDocumento: IComprobanteObtener) => {
      setDocumentoSeleccionado(nroDocumento);
      setModalDocumentos(true);
    },
    [],
  );

  const handleCloseModalDocumenos = useCallback(() => {
    setModalDocumentos(false);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: IComprobanteObtener; index: number }) => (
      <Card width={convertirTamanoHorizontal(370)} style={styles.styleCard}>
        <TouchableOpacity onPress={() => handleOpenDocumeno(item)}>
          <HeaderCard
            labelLeft={`${item.tipoComprobante} ${item.idCredito}`}
            labelRight={format(item.fechaFactura ?? "", "dd-MM-yyyy HH:mm:ss")}
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigthCabecera}
          />
          <HeaderCard
            labelLeft="Valor Cuota"
            labelRight={formatCurrency(item.valorCuota ?? 0)}
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <HeaderCard
            labelLeft="Interes Mora"
            labelRight={formatCurrency(item.interesGastoMora ?? 0)}
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <HeaderCard
            labelLeft="Interes Cobranza"
            labelRight={formatCurrency(item.interesGastoCobranza ?? 0)}
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <HeaderCard
            labelLeft="Deuda Total"
            labelRight={formatCurrency(item.valorTotalCredito ?? 0)}
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          <HeaderCard
            labelLeft="Saldo Vencido"
            labelRight={formatCurrency(item.crSaldoCredito ?? 0)}
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          />
          {/* <HeaderCard
            labelLeft="Producto"
            labelRight={item.producto}
            styleLeft={styles.styleLabelLeft}
            styleRight={styles.styleLabelRigth}
          /> */}
        </TouchableOpacity>
      </Card>
    ),
    [handleOpenDocumeno],
  );

  return (
    <View style={styles.container}>
      <Card
        width={convertirTamanoHorizontal(370)}
        heigth={convertirTamanoVertical(100)}
        style={styles.styleCard}
      >
        <HeaderCard
          labelLeft="Saldo Vencido"
          labelRight={formatCurrency(saldoTotal)}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <HeaderCard
          labelLeft="Deuda Total"
          labelRight={formatCurrency(deudaTotal)}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
      </Card>
      <FlatList
        data={datosDocumentos}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
      />
      {modalDocumentos && documentoSeleccionado && (
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
    borderWidth: convertirTamanoHorizontal(2),
    borderColor: GRIS_CLARO,
  },
  flatListStyle: {
    gap: convertirTamanoVertical(10),
    paddingBottom: convertirTamanoVertical(10),
  },
});
