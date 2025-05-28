import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
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
import { IRecibosCabecera } from "@/models/IRecibo";
import { useReciboStore } from "@/helper/store/storeRecibos";
import { useObtenerRecibosCabecera } from "@/service/Recibos/useObtenerRecibosCabecera";
import { formatCurrency } from "@/helper/function/numericas";
import { useDebounce } from "@/hooks/debounce";
import EmptyList from "../commons/FlatList/EmptyList";
import LoadingComponent from "../commons/FlatList/LoadingComponent";
import { RefreshControl } from "react-native";

const RecibosPrincipal = () => {
  const [filtro, setFiltro] = useState("");

  const { setDatos } = useReciboStore();

  const debounce = useDebounce(filtro, 500);

  const {
    data: dataRecibos,
    isLoading: isLoadingRecibos,
    refetch: refechRecibos,
  } = useObtenerRecibosCabecera({
    nombreCliente: debounce,
  });

  const redireccionar = useCallback(
    (datos: IRecibosCabecera) => {
      setDatos(datos);
      router.push("/principal/recibos/recibos-detalles");
    },
    [setDatos]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IRecibosCabecera; index: number }) => (
      <Card>
        <TouchableOpacity onPress={() => redireccionar(item)}>
          <TextCard
            titulo={`${item.apellidos} ${item.nombres}`}
            subtitulo={item.identificacionCliente}
          />

          <HeaderCard
            labelLeft="SALDO TOTAL: "
            labelRight={formatCurrency(item.deudaTotal ?? 0)}
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
        value={filtro}
        onChangeText={setFiltro}
      />

      <View style={styles.containerLista}>
        <FlatList
          data={dataRecibos}
          renderItem={renderItem}
          contentContainerStyle={styles.containerFlatList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(datos) => datos.identificacionCliente}
          ListEmptyComponent={<EmptyList isLoading={isLoadingRecibos} />}
          ListFooterComponent={
            <LoadingComponent isLoading={isLoadingRecibos} />
          }
          refreshControl={
            <RefreshControl
              refreshing={isLoadingRecibos}
              onRefresh={refechRecibos}
              colors={["#007AFF"]}
              tintColor="#007AFF"
            />
          }
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
