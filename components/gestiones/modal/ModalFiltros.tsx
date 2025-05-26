import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import Select, { IDatosSelect } from "@/components/commons/select/Select";
import { convertirTamanoVertical } from "@/helper/function/renderizadoImagen";
import { find, map } from "lodash";
import { useObtenerZonas } from "@/service/Zona/useObtenerZonas";

interface PropsModalFiltros {
  visible: boolean;
  onClose: () => void;
  setZona: React.Dispatch<React.SetStateAction<string>>;
  zona: string;
  setTipo: React.Dispatch<React.SetStateAction<string>>;
  tipo: string;
}

const ModalFiltros: React.FC<PropsModalFiltros> = ({
  onClose,
  visible,
  setTipo,
  setZona,
  tipo,
  zona,
}) => {
  const { data: zonasData } = useObtenerZonas();

  const zonaFiltro = useMemo(() => {
    const datos: IDatosSelect[] = [
      {
        label: "Todos",
        value: "todos",
      },
    ];
    map(zonasData, (item) => {
      const elemento: IDatosSelect = {
        label: item.nombres ?? "",
        value: item.codigo ?? "",
      };
      datos.push(elemento);
    });
    return datos;
  }, [zonasData]);

  const handleChangeZona = useCallback(
    (data: IDatosSelect) => {
      setZona(data.value);
    },
    [setZona]
  );

  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Filtros">
      <View style={styles.container}>
        <Text>Zona</Text>
        <Select
          datos={zonaFiltro}
          styleContainer={styles.styleSelect}
          defaultValue={find(zonaFiltro, (item) => item.value === zona)}
          onSelect={handleChangeZona}
        />
      </View>
      {/* <View style={styles.container}>
        <Text>Tipo</Text>
        <Select
          datos={zonas}
          styleContainer={styles.styleSelect}
          defaultValue={find(zonas, (item) => item.value === "todos")}
        />
      </View> */}
      {/* <View style={styles.container}>
        <Text>Clientes</Text>
        <Select
          datos={zonas}
          styleContainer={styles.styleSelect}
          defaultValue={find(zonas, (item) => item.value === "todos")}
        />
      </View> */}
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
