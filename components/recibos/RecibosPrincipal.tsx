import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import Header from "../commons/header/Header";
import InputCustom from "../commons/input/InputCustom";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { AZUL, GRIS } from "@/constants/Colors";
import Card from "../commons/card/Card";
import HeaderCard from "../commons/card/HeaderCard";
import TextCard from "../commons/card/TextCard";
import { router } from "expo-router";
import { jsonRecibos } from "@/helper/json/jsonRecibos";
import { IRecibo } from "@/models/IRecibo";
import { useReciboStore } from "@/helper/store/storeRecibos";

const RecibosPrincipal = () => {
  const { setDatos } = useReciboStore();

  const redireccionar = useCallback(
    (datos: IRecibo) => {
      setDatos(datos);
      router.push("/principal/recibos/recibos-detalles");
    },
    [setDatos]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IRecibo; index: number }) => (
      <Card>
        <TouchableOpacity onPress={() => redireccionar(item)}>
          <TextCard titulo={item.nombre} subtitulo={item.cedula} />

          <HeaderCard
            labelLeft="SALDO TOTAL: "
            labelRight={`$ ${item.saldoTotal}`}
            styleLeft={styles.labelLeftStyle}
            styleRight={styles.labelRightStyle}
            styleContainer={styles.containerHeader}
          />
        </TouchableOpacity>
      </Card>
    ),
    [redireccionar]
  );

  return (
    <View style={styles.containerGeneral}>
      <Header title="RECIBOS" />
      <InputCustom
        styleContainer={styles.styleInput}
        leftIcon={
          <Icon
            name="search"
            size={convertirTamanoHorizontal(25)}
            color={AZUL}
          />
        }
      />

      <View style={styles.containerLista}>
        <FlatList
          data={jsonRecibos}
          renderItem={renderItem}
          contentContainerStyle={styles.containerFlatList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default RecibosPrincipal;

const styles = StyleSheet.create({
  containerGeneral: {
    flex: 1,
  },
  styleInput: {
    width: convertirTamanoHorizontal(342),
    marginVertical: convertirTamanoVertical(30),
    marginHorizontal: convertirTamanoHorizontal(35),
  },
  containerFlatList: {
    gap: convertirTamanoVertical(10),
  },
  containerLista: {
    flex: 1,
    marginHorizontal: convertirTamanoHorizontal(35),
    marginBottom: convertirTamanoVertical(10),
  },
  labelLeftStyle: {
    width: convertirTamanoHorizontal(150),
    fontSize: convertirTamanoHorizontal(14),
  },
  labelRightStyle: {
    width: convertirTamanoHorizontal(250),
    color: GRIS,
    fontSize: convertirTamanoHorizontal(14),
    fontWeight: "bold",
  },
  containerHeader: {
    marginTop: convertirTamanoVertical(5),
  },
});
