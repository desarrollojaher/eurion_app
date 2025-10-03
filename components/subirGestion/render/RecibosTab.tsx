import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import Card from "@/components/commons/card/Card";
import HeaderCard from "@/components/commons/card/HeaderCard";
import Separador from "@/components/commons/separador/Separador";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { GRIS, GRIS_CLARO, ROJO, VERDE_CLARO } from "@/constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { formatCurrency } from "@/helper/function/numericas";
import ModalAlertaSubirEliminar from "@/components/commons/modal/ModalAlertaSubirEliminar";
import EmptyList from "@/components/commons/FlatList/EmptyList";
import LoadingComponent from "@/components/commons/FlatList/LoadingComponent";
import { IRecibosObtener } from "@/models/IRecibo";
import { useRecibosObtener } from "@/service/Recibos/useRecibosObtener";
import { useRecibosEliminar } from "@/service/Recibos/useRecibosEliminar";
import { useRecibosEnviar } from "@/service/Recibos/useRecibosEnviar";

const RecibosTab = () => {
  const [modalAlertaSubida, setModalAlertaSubida] = useState(false);
  const [reciboEliminar, setReciboEliminar] = useState<IRecibosObtener | null>(
    null,
  );
  const [tipoAlerta, setTipoAlerta] = useState<"subir" | "eliminar">("subir");

  const {
    data: dataRecibos,
    isLoading: isLoadingRecibos,
    refetch: refetchRecibos,
  } = useRecibosObtener();

  const { mutate: eliminarRecibo, isPending: isLoadingEliminar } =
    useRecibosEliminar();

  const { mutate: enviarRecibo, isPending: isLoadingEnviar } =
    useRecibosEnviar();

  const handleTabDelete = useCallback((item: IRecibosObtener) => {
    setTipoAlerta("eliminar");
    setReciboEliminar(item);
    setModalAlertaSubida(true);
  }, []);

  const handleTabUpload = useCallback((item: IRecibosObtener) => {
    setTipoAlerta("subir");
    setReciboEliminar(item);
    setModalAlertaSubida(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalAlertaSubida(false);
  }, []);

  const handleEliminar = useCallback(() => {
    if (reciboEliminar) {
      eliminarRecibo(reciboEliminar, {
        onSuccess: () => {
          setModalAlertaSubida(false);
        },
      });
    }
  }, [eliminarRecibo, reciboEliminar]);

  const handleSubir = useCallback(() => {
    if (reciboEliminar) {
      enviarRecibo(reciboEliminar, {
        onSuccess: () => {
          handleCloseModal();
        },
      });
    }
  }, [enviarRecibo, handleCloseModal, reciboEliminar]);

  const renderItem = useCallback(
    ({ item }: { item: IRecibosObtener }) => (
      <Card style={styles.card}>
        <HeaderCard
          labelLeft={item.doctran ?? ""}
          labelRight={item.pgFechaCobro}
        />
        <Separador />
        <HeaderCard
          labelLeft="Observacion"
          labelRight={
            item.pgObservaciones && item.pgObservaciones.trim().length > 0
              ? item.pgObservaciones
              : "No hay observaciones"
          }
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />

        <Separador color={GRIS_CLARO} />
        <HeaderCard
          labelLeft="Tipo Cobro"
          labelRight={item.tipoPago}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador color={GRIS_CLARO} />
        <HeaderCard
          labelLeft="Total"
          labelRight={formatCurrency(item.pgValorCobrado ?? 0)}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador />
        <View style={styles.containerBotones}>
          <Pressable
            style={styles.pressableStyle}
            onPress={() => handleTabDelete(item)}
          >
            <Icon
              name="trash"
              size={convertirTamanoHorizontal(30)}
              color={ROJO}
            />
          </Pressable>
          <Pressable
            style={styles.pressableStyle}
            onPress={() => handleTabUpload(item)}
          >
            <Icon
              name="upload"
              size={convertirTamanoHorizontal(30)}
              color={VERDE_CLARO}
            />
          </Pressable>
        </View>
      </Card>
    ),
    [handleTabDelete, handleTabUpload],
  );

  return (
    <View>
      <FlatList
        data={dataRecibos}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(datos) => datos.nombreImg ?? ""}
        ListEmptyComponent={<EmptyList isLoading={isLoadingRecibos} />}
        ListFooterComponent={<LoadingComponent isLoading={isLoadingRecibos} />}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingRecibos}
            onRefresh={refetchRecibos}
            colors={["#007AFF"]}
            tintColor="#007AFF"
          />
        }
      />
      {modalAlertaSubida && (
        <ModalAlertaSubirEliminar
          onClose={handleCloseModal}
          visible={modalAlertaSubida}
          tipo={tipoAlerta}
          handleEliminar={handleEliminar}
          handleSubir={handleSubir}
          isLoading={isLoadingEliminar || isLoadingEnviar}
        />
      )}
    </View>
  );
};

export default RecibosTab;

const styles = StyleSheet.create({
  flatListStyle: {
    gap: convertirTamanoVertical(10),
    marginHorizontal: convertirTamanoHorizontal(35),
  },
  containerBotones: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: convertirTamanoVertical(10),
  },
  styleLabelLeft: {
    width: convertirTamanoHorizontal(160),
  },
  styleLabelRigth: {
    flex: 1,
    color: GRIS,
    fontSize: convertirTamanoHorizontal(13),
  },
  pressableStyle: {
    width: convertirTamanoHorizontal(40),
    height: convertirTamanoHorizontal(40),
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    borderWidth: convertirTamanoHorizontal(2),
    borderColor: GRIS_CLARO,
  }
});
