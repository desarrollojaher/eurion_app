import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Ionicons";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { GRIS_CLARO, NEGRO } from "@/constants/Colors";
interface IDatosSelect {
  label: string;
  value: string;
}

interface PropsSelect {
  datos: IDatosSelect[];
  placeholder?: string;
  onSelect?: (value: IDatosSelect) => void;
  search?: boolean;
  searchPlaceholder?: string;
}
const Select: React.FC<PropsSelect> = ({
  datos,
  onSelect,
  placeholder = "Seleccione",
  search,
  searchPlaceholder = "Buscar",
}) => {
  const handleSelect = useCallback(
    (datos: IDatosSelect) => {
      if (onSelect) onSelect(datos);
    },
    [onSelect]
  );

  return (
    <SelectDropdown
      data={datos}
      onSelect={(selectedItem, index) => {
        handleSelect(selectedItem);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.label) || placeholder}
            </Text>
            <Icon
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item.label}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
      search={search}
      searchPlaceHolder={searchPlaceholder}
      renderSearchInputLeftIcon={() => (
        <Icons name="search" style={styles.dropdownButtonArrowStyle} />
      )}
    />
  );
};

export default Select;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    height: convertirTamanoVertical(50),
    backgroundColor: "#E9ECEF",
    borderRadius: convertirTamanoHorizontal(12),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: convertirTamanoHorizontal(12),
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "500",
    color: NEGRO,
  },
  dropdownButtonArrowStyle: {
    fontSize: convertirTamanoHorizontal(28),
  },

  dropdownMenuStyle: {
    backgroundColor: GRIS_CLARO,
    borderRadius: convertirTamanoHorizontal(8),
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: convertirTamanoHorizontal(15),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: convertirTamanoVertical(8),
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "500",
    color: NEGRO,
  },
});
