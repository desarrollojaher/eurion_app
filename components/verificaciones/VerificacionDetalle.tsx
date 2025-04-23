import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "../commons/header/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BLANCO, GRIS } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import ModalRealizarVerificacion from "./modal/ModalRealizarVerificacion";
import Card from "../commons/card/Card";
import Separador from "../commons/separador/Separador";
import HeaderCard from "../commons/card/HeaderCard";

const VerificacionDetalle = () => {
  const [modalVerificar, setModalVerificar] = useState(false);

  const handlePressIconRight = useCallback(() => {
    setModalVerificar(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVerificar(false);
  }, []);

  return (
    <View style={styles.scrollView}>
      <Header
        title="BYRON GODOY"
        iconRight={
          <Icon
            name="plus"
            color={BLANCO}
            size={convertirTamanoHorizontal(30)}
          />
        }
        handleTapIconRight={handlePressIconRight}
      />

      <ScrollView style={styles.scrollView}>
        <Card style={styles.cardStyle}>
          <Text>Datos Generales</Text>
          <Separador />
          <HeaderCard
            labelLeft="Identificación"
            labelRight="0107377020"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Nombre"
            labelRight="BYRON ALEJANDRO GODOY TENESACA"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Estado Civil"
            labelRight="SOLTERO"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Dependientes"
            labelRight="1"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Telefono"
            labelRight="0365486852"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Referencia"
            labelRight="Ricarte sector sudamericano"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Observaciones"
            labelRight="No tiene observaciones"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Detalle dirección"
            labelRight="Av. 10 de agosto y 6 de diciembre"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
        </Card>
        <Card style={styles.cardStyle}>
          <Text>Buró</Text>
          <Separador />
          <HeaderCard
            labelLeft="Categoría"
            labelRight="NBI"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Score"
            labelRight="783"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Producto"
            labelRight="LAVADORA LG 19KG MEDIUM BLACK CARGA SUPERIOR"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
        </Card>
        <Card style={styles.cardStyle}>
          <Text>Buró</Text>
          <Separador />
          <HeaderCard
            labelLeft="Categoría"
            labelRight="NBI"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Score"
            labelRight="783"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Producto"
            labelRight="LAVADORA LG 19KG MEDIUM BLACK CARGA SUPERIOR"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
        </Card>
        <Card style={styles.cardStyle}>
          <Text>Buró</Text>
          <Separador />
          <HeaderCard
            labelLeft="Categoría"
            labelRight="NBI"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Score"
            labelRight="783"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Producto"
            labelRight="LAVADORA LG 19KG MEDIUM BLACK CARGA SUPERIOR"
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
        </Card>
      </ScrollView>
      {modalVerificar && (
        <ModalRealizarVerificacion
          cliente="BYRON GODOY"
          onClose={handleCloseModal}
          visible={modalVerificar}
        />
      )}
    </View>
  );
};

export default VerificacionDetalle;

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
  cardStyle: {
    width: convertirTamanoHorizontal(342),
    marginHorizontal: convertirTamanoHorizontal(35),
    marginVertical: convertirTamanoVertical(20),
  },
  scrollView: {
    flex: 1,
  },
});
