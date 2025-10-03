import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/Ionicons";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { BLANCO, GRIS, GRIS_CLARO, NEGRO, ROJO } from "@/constants/Colors";
export interface IDatosSelect {
  label: string;
  value: string;
}

interface PropsSelect {
  datos: IDatosSelect[] | [];
  placeholder?: string;
  onSelect?: (value: IDatosSelect) => void;
  search?: boolean;
  searchPlaceholder?: string;
  defaultValue?: IDatosSelect;
  styleContainer?: any;
  labelError?: string;
  isError?: boolean;
}
const Select: React.FC<PropsSelect> = ({
  datos,
  onSelect,
  placeholder = "Seleccione",
  search,
  searchPlaceholder = "Buscar",
  defaultValue,
  styleContainer,
  isError,
  labelError,
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
          <View>
            <View style={[styles.dropdownButtonStyle, styleContainer]}>
              <Text style={styles.dropdownButtonTxtStyle}>
                {(selectedItem && selectedItem.label) || placeholder}
              </Text>
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                style={styles.dropdownButtonArrowStyle}
              />
            </View>
            {isError && <Text style={styles.labelError}>{labelError}</Text>}
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
      defaultValue={defaultValue}
      renderSearchInputLeftIcon={() => (
        <Icons name="search" style={styles.dropdownButtonArrowStyle} />
      )}
    />
  );
};

export default Select;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    height: convertirTamanoVertical(60),
    backgroundColor: BLANCO,
    borderRadius: convertirTamanoHorizontal(30),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: convertirTamanoHorizontal(12),
    borderWidth: 1,
    borderColor: GRIS
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: convertirTamanoHorizontal(16),
    fontWeight: "regular",
    color: GRIS,
  },
  dropdownButtonArrowStyle: {
    fontSize: convertirTamanoHorizontal(30),
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
    marginTop: convertirTamanoVertical(5),
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "500",
    color: NEGRO,
  },
  labelError: {
    fontSize: convertirTamanoHorizontal(10),
    color: ROJO,
    textAlign: "right",
  },
});
