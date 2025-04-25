import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { AZUL, BLANCO } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";

interface PropsFooter {
  items: string[];
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

const Footer: React.FC<PropsFooter> = ({ items, setTab }) => {
  const [index, setIndex] = useState(0);

  const handleChangeItem = useCallback(
    (posicion: number) => {
      setIndex(posicion);
      setTab(posicion);
    },
    [setTab]
  );

  const item = useMemo(() => {
    return items.map((item, indexItem) => (
      <TouchableOpacity
        onPress={() => handleChangeItem(indexItem)}
        key={indexItem}
        style={styles.styleTouchable}
      >
        <Text style={index === indexItem && styles.styleSelect}>{item}</Text>
      </TouchableOpacity>
    ));
  }, [handleChangeItem, index, items]);

  return <View style={styles.containerFotter}>{item}</View>;
};

export default Footer;

const styles = StyleSheet.create({
  containerFotter: {
    backgroundColor: BLANCO,
    height: convertirTamanoVertical(65),
    borderTopEndRadius: convertirTamanoHorizontal(25),
    borderTopStartRadius: convertirTamanoHorizontal(25),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  styleTouchable: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  styleSelect: {
    color: AZUL,
  },
});
