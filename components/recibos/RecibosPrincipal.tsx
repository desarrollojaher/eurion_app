import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "../commons/header/Header";
import InputCustom from "../commons/input/InputCustom";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { AZUL, GRIS, GRIS_CLARO } from "@/constants/Colors";
import Card from "../commons/card/Card";
import HeaderCard from "../commons/card/HeaderCard";
import TextCard from "../commons/card/TextCard";
import { router } from "expo-router";
import { useReciboStore } from "@/helper/store/storeRecibos";
import { useDebounce } from "@/hooks/debounce";
import EmptyList from "../commons/FlatList/EmptyList";
import LoadingComponent from "../commons/FlatList/LoadingComponent";
import { RefreshControl } from "react-native";
import { useObtenerRecibosCabecera } from "@/service/Recibos/useReciboCabeceraObtener";
import { IDocumentosRecibos } from "@/models/IDocumentos";
import { formatCurrency } from "@/helper/function/numericas";

const RecibosPrincipal = () => {
  const [filtro, setFiltro] = useState("");

  const { setDatos } = useReciboStore();

  const debounce = useDebounce(filtro, 500);

  const {
    data: dataRecibos,
    isLoading: isLoadingRecibos,
    refetch: refechRecibos,
  } = useObtenerRecibosCabecera({ buscador: debounce });

  const redireccionar = useCallback(
    (datos: IDocumentosRecibos) => {
      setDatos(datos);
      router.push("/principal/recibos/recibos-detalles");
    },
    [setDatos],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IDocumentosRecibos; index: number }) => (
      <Card style={styles.containerCard}>
        <TouchableOpacity onPress={() => redireccionar(item)}>
          <TextCard
            titulo={`${item.apellidoCliente} ${item.nombreCliente}`}
            subtitulo={item.identificacion}
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
    [redireccionar],
  );

  return (
    <View style={styles.containerGeneral}>
      <Header title="RECIBOS" />
      <InputCustom
        styleContainer={styles.styleInput}
        placeholder="BUSCAR"
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
          keyExtractor={(datos) => datos.identificacion}
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
  containerCard: {
    borderWidth: convertirTamanoVertical(2),
    borderColor: GRIS_CLARO,
  },
});
