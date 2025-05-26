import { StyleSheet } from "react-native";
import React from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import HeaderCard from "@/components/commons/card/HeaderCard";
import { GRIS, GRIS_CLARO } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { useDocumentosCompletoObtener } from "@/service/Documentos/useDocumentosCompletoObtener";
import { formatCurrency } from "@/helper/function/numericas";
import { format, parseISO } from "date-fns";
import Separador from "@/components/commons/separador/Separador";

interface PropsModalDocumetos {
  visible: boolean;
  onClose: () => void;
  data: string;
}

const ModalDocumentos: React.FC<PropsModalDocumetos> = ({
  onClose,
  visible,
  data,
}) => {
  const { data: datosDocumentos } = useDocumentosCompletoObtener({
    nroDocumento: data,
  });
  return (
    <ModalCustom
      onClose={onClose}
      visible={visible}
      titulo={(datosDocumentos && datosDocumentos[0].nroDocumento) ?? ""}
    >
      <HeaderCard
        labelLeft="Saldo Vencido"
        labelRight={
          (datosDocumentos &&
            formatCurrency(datosDocumentos[0].saldoVencido ?? 0)) ??
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Cuotas Pagadas"
        labelRight={(datosDocumentos && datosDocumentos[0].cuotasPagadas) ?? ""}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Cuotas Pendientes"
        labelRight={
          (datosDocumentos && datosDocumentos[0].cuotasPendientes) ?? ""
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Fecha Vencimiento"
        labelRight={
          (datosDocumentos &&
            datosDocumentos[0].fechaVencimiento &&
            format(
              parseISO(datosDocumentos[0].fechaVencimiento),
              "dd-MM-yyyy"
            )) ??
          ""
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Fecha Ultimo Pago"
        labelRight={
          (datosDocumentos &&
            datosDocumentos[0].fechaUltimoPago &&
            format(
              parseISO(datosDocumentos[0].fechaUltimoPago),
              "dd-MM-yyyy"
            )) ??
          ""
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Valor cuota"
        labelRight={
          (datosDocumentos &&
            formatCurrency(datosDocumentos[0].valorCuota ?? 0)) ??
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Saldo Vencido"
        labelRight={
          (datosDocumentos &&
            formatCurrency(datosDocumentos[0].saldoVencido ?? 0)) ??
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Intereses Mora"
        labelRight={
          (datosDocumentos &&
            formatCurrency(datosDocumentos[0].interesMora ?? 0)) ??
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Gastos Cobranzas"
        labelRight={
          (datosDocumentos &&
            formatCurrency(datosDocumentos[0].gastosDeCobranza ?? 0)) ??
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Saldo Capital"
        labelRight={
          (datosDocumentos &&
            formatCurrency(datosDocumentos[0].saldoDelCredito ?? 0)) ??
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Deuda Total"
        labelRight={
          (datosDocumentos &&
            formatCurrency(datosDocumentos[0].deudaTotal ?? 0)) ??
          "$ 0"
        }
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
