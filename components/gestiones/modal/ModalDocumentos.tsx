import { StyleSheet } from "react-native";
import React from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import HeaderCard from "@/components/commons/card/HeaderCard";
import { GRIS } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { IDocumento } from "@/models/IGestionesPrueba";

interface PropsModalDocumetos {
  visible: boolean;
  onClose: () => void;
  data: IDocumento;
}

const ModalDocumentos: React.FC<PropsModalDocumetos> = ({
  onClose,
  visible,
  data,
}) => {
  return (
    <ModalCustom onClose={onClose} visible={visible} titulo={data.doctran}>
      <HeaderCard
        labelLeft="Saldo Vencido"
        labelRight={data.saldoVencido}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <HeaderCard
        labelLeft="Cuotas Pagadas"
        labelRight={data.cuotasPagadas}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <HeaderCard
        labelLeft="Cuotas Pendientes"
        labelRight={data.cuotasPendientes}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <HeaderCard
        labelLeft="Fecha Vencimiento"
        labelRight={data.fechaVencimiento}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <HeaderCard
        labelLeft="Fecha Ultimo Pago"
        labelRight={data.fechaUltPago}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <HeaderCard
        labelLeft="Valor cuota"
        labelRight={`$ ${data.valorCuota}`}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <HeaderCard
        labelLeft="Saldo Vencido"
        labelRight={`$ ${data.saldoVencido}`}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <HeaderCard
        labelLeft="Intereses Mora"
        labelRight={`$ ${data.interesesMora}`}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <HeaderCard
        labelLeft="Gastos Cobranzas"
        labelRight={`$ ${data.gastosCobranza}`}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <HeaderCard
        labelLeft="Saldo Capital"
        labelRight={`$ ${data.saldoCapital}`}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <HeaderCard
        labelLeft="Deuda Total"
        labelRight={`$ ${data.deudaTotal}`}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
    </ModalCustom>
  );
};

export default ModalDocumentos;

const styles = StyleSheet.create({
  styleLabelLeft: {
    width: convertirTamanoHorizontal(170),
    marginTop: convertirTamanoVertical(10),
  },
  styleLabelRigth: {
    width: convertirTamanoHorizontal(240),
    color: GRIS,
    fontSize: convertirTamanoHorizontal(15),
    marginTop: convertirTamanoVertical(10),
  },
});
