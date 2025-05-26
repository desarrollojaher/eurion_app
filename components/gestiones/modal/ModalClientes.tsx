import { Linking, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import HeaderCard from "@/components/commons/card/HeaderCard";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { GRIS, GRIS_CLARO } from "@/constants/Colors";
import Separador from "@/components/commons/separador/Separador";
import { ICliente } from "@/models/ICliente";
import ButtonCustom from "@/components/commons/button/ButtonCustom";

interface PropsModalClientes {
  visible: boolean;
  onClose: () => void;
  datos: Partial<ICliente>;
}

const ModalClientes: React.FC<PropsModalClientes> = ({
  onClose,
  visible,
  datos,
}) => {
  const handleLlamar = useCallback(() => {
    Linking.openURL(`tel:${datos.telefono}`);
  }, [datos]);

  return (
    <ModalCustom onClose={onClose} visible={visible}>
      {datos.identificacion && (
        <>
          <HeaderCard
            labelLeft="Identificación"
            labelRight={datos.identificacion}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <Separador color={GRIS_CLARO} />
        </>
      )}
      {datos.nombres && (
        <>
          <HeaderCard
            labelLeft="Nombre"
            labelRight={datos.nombres}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <Separador color={GRIS_CLARO} />
        </>
      )}
      {datos.estadoCivil && (
        <>
          <HeaderCard
            labelLeft="Estado Civil"
            labelRight={datos.estadoCivil}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <Separador color={GRIS_CLARO} />
        </>
      )}
      {datos.dependientes !== null && datos.dependientes !== undefined && (
        <>
          <HeaderCard
            labelLeft="Dependientes"
            labelRight={`${datos.dependientes}`}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <Separador color={GRIS_CLARO} />
        </>
      )}
      {datos.telefono && (
        <>
          <HeaderCard
            labelLeft="Telefono"
            labelRight={datos.telefono}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <Separador color={GRIS_CLARO} />
        </>
      )}
      {datos.referencias && (
        <>
          <HeaderCard
            labelLeft="Referencia"
            labelRight={datos.referencias}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <Separador color={GRIS_CLARO} />
        </>
      )}
      {datos.observacion && (
        <HeaderCard
          labelLeft="Observaciones"
          labelRight={datos.observacion}
          styleContainer={styles.rowCardStyle}
          styleLeft={styles.labelCardLeft}
          styleRight={styles.labelCardRight}
        />
      )}
      {datos.telefono && (
        <ButtonCustom
          label="Llamar"
          onPress={handleLlamar}
          style={styles.styleBoton}
        />
      )}
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
  styleBoton: {
    marginTop: convertirTamanoVertical(20),
    alignSelf: "center",
  },
});
