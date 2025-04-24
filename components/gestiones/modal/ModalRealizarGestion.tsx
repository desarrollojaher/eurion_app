import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import Select from "@/components/commons/select/Select";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { tiposGestion } from "@/helper/json/jsonGestiones";
import { find } from "lodash";
import TextInput from "@/components/commons/card/TextInput";
import ButtonCustom from "@/components/commons/button/ButtonCustom";
import { NEGRO } from "@/constants/Colors";

interface PropsModalRealizarGestion {
  visible: boolean;
  onClose: () => void;
}

const ModalRealizarGestion: React.FC<PropsModalRealizarGestion> = ({
  onClose,
  visible,
}) => {
  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Realizar Gestión">
      <View style={styles.container}>
        <Text>Gestion</Text>
        <Select datos={tiposGestion} styleContainer={styles.styleSelect} />
      </View>

      <View style={styles.container}>
        <Text>Factura</Text>
        <Select datos={tiposGestion} styleContainer={styles.styleSelect} />
      </View>

      <View style={styles.container}>
        <Text>Tipo referencia</Text>
        <Select datos={tiposGestion} styleContainer={styles.styleSelect} />
      </View>
      <View style={styles.container}>
        <TextInput
          text="Telefono"
          tipo="text"
          direction="column"
          placeholder="Telefono"
          styleContainer={styles.containerObservaciones}
          styleHeader={styles.textHeader}
          styleTextInput={styles.styleInput}
        />
      </View>

      <View style={styles.container}>
        <TextInput
          text="Nuevo numero"
          tipo="text"
          direction="column"
          placeholder="Nuevo numero"
          styleContainer={styles.containerObservaciones}
          styleHeader={styles.textHeader}
          styleTextInput={styles.styleInput}
        />
      </View>

      <View style={styles.container}>
        <TextInput
          text=""
          tipo="text"
          direction="column"
          placeholder="Observaciones"
          multiline
          styleContainer={styles.containerObservaciones}
          styleTextInput={styles.styleInput}
        />
      </View>
      <View style={styles.containerBoton}>
        <ButtonCustom label="Guardar" />
      </View>
    </ModalCustom>
  );
};

export default ModalRealizarGestion;

const styles = StyleSheet.create({
  container: {
    marginTop: convertirTamanoVertical(7),
  },
  styleSelect: {
    borderWidth: 1,
    height: convertirTamanoVertical(60),
  },
  containerObservaciones: {
    justifyContent: "flex-start",
    marginTop: convertirTamanoVertical(1),
    alignItems: "flex-start",
  },
  textHeader: {
    fontSize: convertirTamanoHorizontal(15),
    fontWeight: "400",
  },
  containerBoton: {
    alignItems: "center",
    marginTop: convertirTamanoVertical(15),
  },
  styleInput: {
    borderColor: NEGRO,
    textAlignVertical: "top",
  },
});
