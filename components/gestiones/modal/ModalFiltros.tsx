import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import Select from "@/components/commons/select/Select";
import { zonas } from "@/helper/json/jsonGestiones";
import { convertirTamanoVertical } from "@/helper/function/renderizadoImagen";
import { find } from "lodash";

interface PropsModalFiltros {
  visible: boolean;
  onClose: () => void;
}

const ModalFiltros: React.FC<PropsModalFiltros> = ({ onClose, visible }) => {
  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Filtros">
      <View style={styles.container}>
        <Text>Zona</Text>
        <Select
          datos={zonas}
          styleContainer={styles.styleSelect}
          defaultValue={find(zonas, (item) => item.value === "todos")}
        />
      </View>
      <View style={styles.container}>
        <Text>Tipo</Text>
        <Select
          datos={zonas}
          styleContainer={styles.styleSelect}
          defaultValue={find(zonas, (item) => item.value === "todos")}
        />
      </View>
      <View style={styles.container}>
        <Text>Clientes</Text>
        <Select
          datos={zonas}
          styleContainer={styles.styleSelect}
          defaultValue={find(zonas, (item) => item.value === "todos")}
        />
      </View>
    </ModalCustom>
  );
};

export default ModalFiltros;

const styles = StyleSheet.create({
  container: {
    marginTop: convertirTamanoVertical(7),
  },
  styleSelect: {
    borderWidth: 1,
    height: convertirTamanoVertical(60),
  },
});
