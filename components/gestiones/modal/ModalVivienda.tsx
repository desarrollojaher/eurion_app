import { StyleSheet } from "react-native";
import React from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import HeaderCard from "@/components/commons/card/HeaderCard";
import { convertirTamanoHorizontal } from "@/helper/function/renderizadoImagen";
import { GRIS, GRIS_CLARO } from "@/constants/Colors";
import Separador from "@/components/commons/separador/Separador";
import { IDireccionGcobranza } from "@/models/IDireccion";

interface PropsModalVivienda {
  visible: boolean;
  onClose: () => void;
  datos: IDireccionGcobranza;
}

const ModalVivienda: React.FC<PropsModalVivienda> = ({
  onClose,
  visible,
  datos,
}) => {
  return (
    <ModalCustom onClose={onClose} visible={visible}>
      <HeaderCard
        labelLeft="Direccion"
        labelRight={datos.direccion}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Tipo Vivienda"
        labelRight={datos.tipoVivienda}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Nombre del dueño"
        labelRight={datos.nombrePropietario}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      />
      <Separador color={GRIS_CLARO} />
      {/* <HeaderCard
        labelLeft="telefono del dueño"
        labelRight={datos.telefonoPropietario}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      />
      <Separador color={GRIS_CLARO} />
      <HeaderCard
        labelLeft="Tipo construccion"
        labelRight={datos.construccion}
        styleContainer={styles.rowCardStyle}
        styleLeft={styles.labelCardLeft}
        styleRight={styles.labelCardRight}
      /> */}
    </ModalCustom>
  );
};

export default ModalVivienda;

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
