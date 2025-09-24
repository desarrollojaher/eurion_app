import { StyleSheet } from "react-native";
import React from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import HeaderCard from "@/components/commons/card/HeaderCard";
import { GRIS, GRIS_CLARO } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
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

  return (
    <ModalCustom
      onClose={onClose}
      visible={visible}
      titulo={""}
    >
      <HeaderCard
        labelLeft="Saldo Vencido"
        labelRight={
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Cuotas Pagadas"
        labelRight={""}
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Cuotas Pendientes"
        labelRight={
          ""
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Fecha Vencimiento"
        labelRight={
          
          ""
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Fecha Ultimo Pago"
        labelRight={
         
          ""
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Valor cuota"
        labelRight={
        
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Saldo Vencido"
        labelRight={
          
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Intereses Mora"
        labelRight={
          
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Gastos Cobranzas"
        labelRight={
          
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Saldo Capital"
        labelRight={
          
          "$ 0"
        }
        styleLeft={styles.styleLabelLeft}
        styleRight={styles.styleLabelRigth}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Deuda Total"
        labelRight={
          
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
