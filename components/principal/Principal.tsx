import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSession } from "@/helper/provider/Auth";
import { AZUL, BLANCO } from "@/constants/Colors";
import Card from "../commons/card/Card";
import IconFont from "react-native-vector-icons/FontAwesome5";
import IconFont6 from "react-native-vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import NetInfo from "@react-native-community/netinfo";
import ModalSincronizar from "./modal/ModalSincronizar";
import { useObtenerFecha } from "@/service/Sincronizacion/useObtenerFecha";
import ModalCerrarSesion from "./modal/ModalCerrarSesion";
import Constants from "expo-constants";
const Principal = () => {
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalCerrarSesion, setModalCerrarSesion] = useState(false);

  const { usuario } = useSession();

  const { data: dataFecha } = useObtenerFecha();

  const router = useRouter();

  const version = Constants.expoConfig?.version || "Versión no disponible";

  const verificarInternetSincronizacion = useCallback(async () => {
    // const valor = await NetInfo.fetch();
    // if (valor.isConnected === false) return true;

    // if (dataFecha && dataFecha.fecha) {
    //   const inicioDia = startOfDay(new Date());
    //   const horaSincronizacion1 = new Date();
    //   horaSincronizacion1.setHours(8, 0, 0, 0);

    //   const horaSincronizacion2 = new Date();
    //   horaSincronizacion2.setHours(13, 0, 0, 0);

    //   const ultimaSincronizacion = parseISO(dataFecha?.fecha);

    //   const estamosAntesDeLa1 =
    //     isBefore(new Date(), horaSincronizacion2) &&
    //     isAfter(ultimaSincronizacion, inicioDia);
    //   const estamosDespuesDeLa1 = isAfter(new Date(), horaSincronizacion2);

    //   const sincronizoAntesDe8 =
    //     estamosAntesDeLa1 && isAfter(ultimaSincronizacion, horaSincronizacion1);

    //   const sincronizoAntesDe13 =
    //     estamosDespuesDeLa1 &&
    //     isAfter(ultimaSincronizacion, horaSincronizacion2) &&
    //     sincronizoAntesDe8;

    //   const puedeUsarApp = sincronizoAntesDe8 || sincronizoAntesDe13;

    //   return puedeUsarApp;
    // }

    return true;
  }, []);

  const handleModalAlerta = useCallback(() => {
    setModalAlerta(!modalAlerta);
  }, [modalAlerta]);

  const handleOpenModalCerrarSesion = useCallback(() => {
    setModalCerrarSesion(true);
  }, []);

  const handleCloseModalCerrarSesion = useCallback(() => {
    setModalCerrarSesion(false);
  }, []);

  const handleOpenSincronizador = useCallback(() => {
    router.push("/principal/sincronizar");
  }, [router]);

  const handleOpenVerificaciones = useCallback(async () => {
    const conectado = await verificarInternetSincronizacion();
    if (conectado) {
      router.push("/principal/verificaciones/verificaciones-principal");
    } else {
      handleModalAlerta();
    }
  }, [handleModalAlerta, router, verificarInternetSincronizacion]);

  const handleOpenGestiones = useCallback(async () => {
    const conectado = await verificarInternetSincronizacion();
    if (conectado) {
      router.push("/principal/gestiones/gestiones-principal");
    } else {
      handleModalAlerta();
    }
  }, [handleModalAlerta, router, verificarInternetSincronizacion]);

  const handleOpenRecibos = useCallback(async () => {
    const conectado = await verificarInternetSincronizacion();
    if (conectado) {
      router.push("/principal/recibos/recibos-principal");
    } else {
      handleModalAlerta();
    }
  }, [handleModalAlerta, router, verificarInternetSincronizacion]);

  const handleOpenSubirInformacion = useCallback(() => {
    router.push("/principal/subir-informacion");
  }, [router]);

  const handleOpenInformacionSubida = useCallback(() => {
    router.push("/principal/informacion-subida");
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>
          Bienvenido {usuario?.usuNombre.split(" ")[0]}
        </Text>
        <Pressable
          onPress={handleOpenModalCerrarSesion}
          style={styles.iconStyle}
        >
          <Icon
            name={"logout"}
            size={convertirTamanoHorizontal(30)}
            color={BLANCO}
          />
        </Pressable>
      </View>

      <View style={styles.containerBotones}>
        <Card
          width={convertirTamanoHorizontal(160)}
          heigth={convertirTamanoVertical(156)}
          style={styles.styleCard}
        >
          <TouchableOpacity onPress={handleOpenSincronizador}>
            <IconFont
              name="sync"
              color={AZUL}
              size={convertirTamanoHorizontal(60)}
              style={styles.iconModulosStyle}
            />
            <Text style={styles.textIconos}>Sincronizar</Text>
          </TouchableOpacity>
        </Card>
        <Card
          width={convertirTamanoHorizontal(160)}
          heigth={convertirTamanoVertical(156)}
          style={styles.styleCard}
        >
          <TouchableOpacity onPress={handleOpenVerificaciones}>
            <IconFont
              name="user-check"
              color={AZUL}
              size={convertirTamanoHorizontal(60)}
              style={styles.iconModulosStyle}
            />
            <Text style={styles.textIconos}>Verificar</Text>
          </TouchableOpacity>
        </Card>
      </View>
      <View style={styles.containerBotones}>
        <Card
          width={convertirTamanoHorizontal(160)}
          heigth={convertirTamanoVertical(156)}
          style={styles.styleCard}
        >
          <TouchableOpacity onPress={handleOpenGestiones}>
            <IconFont6
              name="list"
              color={AZUL}
              size={convertirTamanoHorizontal(60)}
              style={styles.iconModulosStyle}
            />
            <Text style={styles.textIconos}>Gestiones</Text>
          </TouchableOpacity>
        </Card>
        <Card
          width={convertirTamanoHorizontal(160)}
          heigth={convertirTamanoVertical(156)}
          style={styles.styleCard}
        >
          <TouchableOpacity onPress={handleOpenRecibos}>
            <IconFont
              name="receipt"
              color={AZUL}
              size={convertirTamanoHorizontal(60)}
              style={styles.iconModulosStyle}
            />
            <Text style={styles.textIconos}>Recibos</Text>
          </TouchableOpacity>
        </Card>
      </View>

      <View style={styles.containerBotones}>
        <Card
          width={convertirTamanoHorizontal(160)}
          heigth={convertirTamanoVertical(156)}
          style={styles.styleCard}
        >
          <TouchableOpacity onPress={handleOpenSubirInformacion}>
            <IconFont
              name="upload"
              color={AZUL}
              size={convertirTamanoHorizontal(60)}
              style={styles.iconModulosStyle}
            />
            <Text style={styles.textIconos}>Subir Información</Text>
          </TouchableOpacity>
        </Card>
        <Card
          width={convertirTamanoHorizontal(160)}
          heigth={convertirTamanoVertical(156)}
          style={styles.styleCard}
        >
          <TouchableOpacity onPress={handleOpenInformacionSubida}>
            <IconFont
              name="info-circle"
              color={AZUL}
              size={convertirTamanoHorizontal(60)}
              style={styles.iconModulosStyle}
            />
            <Text style={styles.textIconos}>Información Subida</Text>
          </TouchableOpacity>
        </Card>
      </View>
      <Text style={styles.textVersion}>Version: {version}</Text>
      {modalAlerta && (
        <ModalSincronizar onClose={handleModalAlerta} visible={modalAlerta} />
      )}
      {modalCerrarSesion && (
        <ModalCerrarSesion
          onClose={handleCloseModalCerrarSesion}
          visible={modalCerrarSesion}
        />
      )}
    </View>
  );
};

export default Principal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: convertirTamanoHorizontal(35),
  },
  iconStyle: {
    width: convertirTamanoHorizontal(40),
    height: convertirTamanoVertical(40),
    justifyContent: "center",
    alignItems: "center",
  },
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: convertirTamanoVertical(72),
  },
  textHeader: {
    width: convertirTamanoHorizontal(290),
    fontSize: convertirTamanoHorizontal(25),
    fontWeight: "bold",
    color: BLANCO,
  },
  containerBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: convertirTamanoVertical(57),
  },
  textVersion: {
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "regular",
    color: BLANCO,
    marginTop: convertirTamanoVertical(85),
    textAlign: "center",
  },
  styleCard: {
    justifyContent: "center",
  },
  textIconos: {
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "regular",
    color: AZUL,
    textAlign: "center",
  },
  iconModulosStyle: {
    alignSelf: "center",
    marginBottom: convertirTamanoVertical(18),
  },
});
