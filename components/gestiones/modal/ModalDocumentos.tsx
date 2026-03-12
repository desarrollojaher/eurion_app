import { StyleSheet } from "react-native";
import React, { useMemo } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import HeaderCard from "@/components/commons/card/HeaderCard";
import { GRIS, GRIS_CLARO } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Separador from "@/components/commons/separador/Separador";
import { IComprobanteObtener } from "@/models/IComprobante";
import { formatCurrency } from "@/helper/function/numericas";
import { format } from "date-fns";
import { useComprobantesDetallesObtener } from "@/service/Comprobantes/useComprobantesDetallesObtener";

interface PropsModalDocumetos {
  visible: boolean;
  onClose: () => void;
  data: IComprobanteObtener;
}

const ModalDocumentos: React.FC<PropsModalDocumetos> = ({
  onClose,
  visible,
  data,
}) => {
  const { data: dataDetalles } = useComprobantesDetallesObtener({
    crId: data.idCredito ?? 0,
  });

  const productos = useMemo(() => {
    return dataDetalles
      ?.map((item) => {
        return item.nombreArticulo;
      })
      .join(" - ");
  }, [dataDetalles]);
  return (
    <ModalCustom onClose={onClose} visible={visible} titulo={""}>
      <HeaderCard
        labelLeft="Saldo Vencido"
        labelRight={formatCurrency(data.crSaldoCredito ?? 0)}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Cuotas Pagadas"
        labelRight={data.cuotasPagadas?.toString() ?? "0"}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Cuotas Pendientes"
        labelRight={data.cuotasPorPagar?.toString() ?? "0"}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Saldo Interes"
        labelRight={formatCurrency(data.crSaldoInteres ?? 0)}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Fecha Factura"
        labelRight={format(data.fechaFactura ?? "", "dd-MM-yyyy HH:mm:ss")}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      {/* <HeaderCard
        labelLeft="Fecha Ultimo Pago"
        labelRight={""}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} /> */}
      <HeaderCard
        labelLeft="Valor cuota"
        labelRight={formatCurrency(data.valorCuota ?? 0)}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      {/* <HeaderCard
        labelLeft="Saldo Vencido"
        labelRight={"$ 0"}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} /> */}
      <HeaderCard
        labelLeft="Intereses Mora"
        labelRight={formatCurrency(data.interesGastoMora ?? 0)}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Gastos Cobranzas"
        labelRight={formatCurrency(data.interesGastoCobranza ?? 0)}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Saldo Capital"
        labelRight={formatCurrency(data.crSaldoCapital ?? 0)}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Deuda Total"
        labelRight={formatCurrency(
          (data.crSaldoCredito ?? 0) +
            (data.interesGastoCobranza ?? 0) +
            (data.interesGastoMora ?? 0) +
            (data.crSaldoInteres ?? 0),
        )}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <HeaderCard
        labelLeft="Productos"
        labelRight={productos ?? ""}
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
