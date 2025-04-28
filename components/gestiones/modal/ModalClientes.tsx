import { StyleSheet } from "react-native";
import React from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import HeaderCard from "@/components/commons/card/HeaderCard";
import { convertirTamanoHorizontal } from "@/helper/function/renderizadoImagen";
import { GRIS, GRIS_CLARO } from "@/constants/Colors";
import { IVerificacionDetalleGeneral } from "@/models/IVerificacionPrueba";
import Separador from "@/components/commons/separador/Separador";

interface PropsModalClientes {
  visible: boolean;
  onClose: () => void;
  datos: IVerificacionDetalleGeneral;
}

const ModalClientes: React.FC<PropsModalClientes> = ({
  onClose,
  visible,
  datos,
}) => {
  return (
    <ModalCustom onClose={onClose} visible={visible}>
      <HeaderCard
        labelLeft="Identificación"
        labelRight={datos.cedulaCliente}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Nombre"
        labelRight={datos.nombreCliente}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Estado Civil"
        labelRight={datos.estadoCivil}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Dependientes"
        labelRight={String(datos.dependientes)}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Telefono"
        labelRight={datos.telefono}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Referencia"
        labelRight={datos.referencias}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Observaciones"
        labelRight={datos.observacion}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      />
    </ModalCustom>
  );
};

export default ModalClientes;

const styles = StyleSheet.create({
  rowCardStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  labelCardLeft: {
    width: convertirTamanoHorizontal(140),
  },
  labelCardRight: {
    width: convertirTamanoHorizontal(160),
    fontSize: convertirTamanoHorizontal(14),
    lineHeight: convertirTamanoHorizontal(25),
    color: GRIS,
  },
});
