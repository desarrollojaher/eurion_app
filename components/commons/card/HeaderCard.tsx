import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextLayoutEventData,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import ModalCustom from "../modal/ModalCustom";
import Icon from "react-native-vector-icons/FontAwesome5";

interface PropsHeaderCard {
  labelLeft?: string;
  labelRight?: string | null;
  styleLeft?: any;
  styleRight?: any;
  styleContainer?: any;
  numberOfLine?: number;
  abrir?: boolean;
  onPress?: () => void;
}

const HeaderCard: React.FC<PropsHeaderCard> = ({
  labelLeft,
  labelRight,
  styleLeft,
  styleRight,
  styleContainer,
  numberOfLine = 2,
  abrir = false,
  onPress,
}) => {
  const [modalDatos, setModalDatos] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [expandedChevron, setExpandedChevron] = useState(false);

  const handleTextLaayout = useCallback(
    (event: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (event.nativeEvent.lines.length > numberOfLine) {
        setExpanded(true);
      }
    },
    [numberOfLine],
  );

  const handleOpenModalDatos = useCallback(() => {
    setModalDatos(true);
  }, []);

  const handleCloseModalDatos = useCallback(() => {
    setModalDatos(false);
  }, []);

  const handleOnPres = useCallback(() => {
    onPress && onPress();
    setExpandedChevron(!expandedChevron);
  }, [expandedChevron, onPress]);

  return (
    <View style={[styles.container, styleContainer]}>
      <Text style={[styles.textLeft, styleLeft]}>{labelLeft}</Text>

      <View>
        <Text
          style={[styles.textRight, styleRight]}
          numberOfLines={numberOfLine}
          onTextLayout={handleTextLaayout}
          // onPress={handleOpenModalDatos}
          disabled={!expanded}
          ellipsizeMode="clip"
        >
          {labelRight}
        </Text>
        {expanded && (
          <Text style={styles.verMas} onPress={handleOpenModalDatos}>
            Ver mas
          </Text>
        )}
        {abrir && (
          <Pressable onPress={handleOnPres} style={styles.iconStyle}>
            <Icon
              name={expandedChevron ? "chevron-up" : "chevron-down"}
              size={convertirTamanoHorizontal(20)}
            />
          </Pressable>
        )}
      </View>

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
  verMas: {
    fontWeight: "bold",
  },
  iconStyle: {
    width: convertirTamanoHorizontal(20),
    height: convertirTamanoVertical(20),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
