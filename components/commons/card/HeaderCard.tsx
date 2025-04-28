import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextLayoutEventData,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { convertirTamanoHorizontal } from "@/helper/function/renderizadoImagen";
import Icon from "react-native-vector-icons/FontAwesome5";
import ModalCustom from "../modal/ModalCustom";

interface PropsHeaderCard {
  labelLeft?: string;
  labelRight?: string;
  styleLeft?: any;
  styleRight?: any;
  styleContainer?: any;
  numberOfLine?: number;
}

const HeaderCard: React.FC<PropsHeaderCard> = ({
  labelLeft,
  labelRight,
  styleLeft,
  styleRight,
  styleContainer,
  numberOfLine = 2,
}) => {
  const [modalDatos, setModalDatos] = useState(false);

  const [expanded, setExpanded] = useState(false);

  const handleTextLaayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (event.nativeEvent.lines.length > numberOfLine) {
        setExpanded(true);
      }
    },
    [numberOfLine]
  );

  const handleOpenModalDatos = useCallback(() => {
    setModalDatos(true);
  }, []);

  const handleCloseModalDatos = useCallback(() => {
    setModalDatos(false);
  }, []);

  return (
    <View style={[styles.container, styleContainer]}>
      <Text style={[styles.textLeft, styleLeft]}>{labelLeft}</Text>
      <Text
        style={[styles.textRight, styleRight]}
        numberOfLines={numberOfLine}
        onTextLayout={handleTextLaayout}
        onPress={handleOpenModalDatos}
        disabled={!expanded}
      >
        {labelRight}
      </Text>
      {/* {expanded && (
        <Pressable
          onPress={handleOpenModalDatos}
          style={{ alignSelf: "center" }}
        >
          <Icon name="expand-arrows-alt" />
        </Pressable>
      )} */}

      {modalDatos && (
        <ModalCustom onClose={handleCloseModalDatos} visible={modalDatos}>
          <Text>{labelRight}</Text>
        </ModalCustom>
      )}
    </View>
  );
};

export default HeaderCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textLeft: {
    fontWeight: "bold",
    fontSize: convertirTamanoHorizontal(16),
  },
  textRight: {
    fontSize: convertirTamanoHorizontal(13),
    fontWeight: "regular",
  },
  // StyleProp
});
