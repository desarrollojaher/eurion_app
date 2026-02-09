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
import {
  AZUL,
  AZUL_CLARO,
  AZUL_ICONO,
  BLANCO,
  ROJO,
  TOMATE,
  TOMATE_CLARO,
  TOMATE_ICONO,
} from "@/constants/Colors";
import IconFont from "react-native-vector-icons/FontAwesome5";
import IconFont6 from "react-native-vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import ModalSincronizar from "./modal/ModalSincronizar";
import ModalCerrarSesion from "./modal/ModalCerrarSesion";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
const Principal = () => {
  const [modalAlerta, setModalAlerta] = useState(false);
  const [modalCerrarSesion, setModalCerrarSesion] = useState(false);

  const { usuario } = useSession();

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
    <View>
      <LinearGradient
        colors={[AZUL, AZUL_CLARO]} // AZUL a ROJO
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.containerHeader}
      >
        <View style={styles.containerButtonHeader}>
          <Text style={styles.textContainHeader}>EURION</Text>
          <Pressable
            onPress={handleOpenModalCerrarSesion}
            style={styles.iconStyle}
          >
            <Icon
              name={"logout"}
              size={convertirTamanoHorizontal(25)}
              color={BLANCO}
            />
          </Pressable>
        </View>
        <Text style={styles.textHeader}>Bienvenido</Text>
        <Text style={styles.textHeader}>
          {usuario?.usuNombre.split(" ")[0]}
        </Text>
        <Text style={styles.subTextContainer}>¿Que deseas hacer hoy?</Text>
      </LinearGradient>

      <View style={styles.containerBotones}>
        <LinearGradient
          colors={[AZUL, AZUL_CLARO]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.styleCard}
        >
          <TouchableOpacity
            onPress={handleOpenSincronizador}
            style={styles.styleTouchable}
          >
            <View style={styles.containerIcon}>
              <IconFont
                name="sync"
                color={BLANCO}
                size={convertirTamanoHorizontal(30)}
              />
            </View>
            <Text style={styles.textIconos}>Sincronizar</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={[AZUL, AZUL_CLARO]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.styleCard}
        >
          <TouchableOpacity
            onPress={handleOpenVerificaciones}
            style={styles.styleTouchable}
          >
            <View style={styles.containerIcon}>
              <IconFont
                name="user-check"
                color={BLANCO}
                size={convertirTamanoHorizontal(30)}
              />
            </View>
            <Text style={styles.textIconos}>Verificar</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.containerBotones}>
        <LinearGradient
          colors={[AZUL, AZUL_CLARO]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.styleCard}
        >
          <TouchableOpacity
            onPress={handleOpenGestiones}
            style={styles.styleTouchable}
          >
            <View style={styles.containerIcon}>
              <IconFont6
                name="list"
                color={BLANCO}
                size={convertirTamanoHorizontal(30)}
              />
            </View>
            <Text style={styles.textIconos}>Gestiones</Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={[AZUL, AZUL_CLARO]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.styleCard}
        >
          <TouchableOpacity
            onPress={handleOpenRecibos}
            style={styles.styleTouchable}
          >
            <View style={styles.containerIcon}>
              <IconFont
                name="receipt"
                color={BLANCO}
                size={convertirTamanoHorizontal(30)}
              />
            </View>
            <Text style={styles.textIconos}>Recibos</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.containerBotones}>
        <LinearGradient
          colors={[TOMATE_CLARO, TOMATE]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.styleCard}
        >
          <TouchableOpacity
            onPress={handleOpenSubirInformacion}
            style={styles.styleTouchable}
          >
            <View style={styles.containerIconTomate}>
              <IconFont
                name="upload"
                color={BLANCO}
                size={convertirTamanoHorizontal(30)}
              />
            </View>
            <Text style={styles.textIconos}>Subir Información</Text>
          </TouchableOpacity>
        </LinearGradient>
        {/* <Card
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
        </Card> */}
      </View>
      <View style={styles.containerVersion}>
        <Text style={styles.textVersion}>Version: {version}</Text>
      </View>
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
  containerButtonHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: convertirTamanoHorizontal(15),
    paddingTop: convertirTamanoVertical(10),
  },
  textContainHeader: {
    fontWeight: "bold",
    fontSize: convertirTamanoHorizontal(15),
    color: BLANCO,
  },
  subTextContainer: {
    fontSize: convertirTamanoHorizontal(12),
    color: BLANCO,
    paddingHorizontal: convertirTamanoHorizontal(15),
  },
  containerIcon: {
    marginBottom: convertirTamanoVertical(18),
    width: convertirTamanoHorizontal(60),
    height: convertirTamanoHorizontal(60),
    borderRadius: convertirTamanoHorizontal(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AZUL_ICONO,
  },
  containerIconTomate: {
    marginBottom: convertirTamanoVertical(18),
    width: convertirTamanoHorizontal(60),
    height: convertirTamanoHorizontal(60),
    borderRadius: convertirTamanoHorizontal(15),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: TOMATE_ICONO,
  },
  iconStyle: {
    width: convertirTamanoHorizontal(50),
    height: convertirTamanoVertical(50),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AZUL_ICONO,
    borderRadius: convertirTamanoHorizontal(10),
  },
  styleTouchable: { alignItems: "center" },
  containerHeader: {
    height: convertirTamanoVertical(180),
    borderColor: ROJO,
    borderBottomWidth: convertirTamanoVertical(2),
  },
  textHeader: {
    width: convertirTamanoHorizontal(290),
    fontSize: convertirTamanoHorizontal(25),
    paddingHorizontal: convertirTamanoHorizontal(15),
    fontWeight: "bold",
    color: BLANCO,
  },
  containerBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: convertirTamanoVertical(40),
    gap: convertirTamanoHorizontal(7),
    paddingHorizontal: convertirTamanoHorizontal(35),
  },
  textVersion: {
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "semibold",
    color: AZUL,
    textAlign: "center",
  },
  styleCard: {
    justifyContent: "center",
    width: convertirTamanoHorizontal(170),
    height: convertirTamanoVertical(170),
    borderRadius: convertirTamanoHorizontal(20),
  },
  textIconos: {
    fontSize: convertirTamanoHorizontal(18),
    fontWeight: "bold",
    color: BLANCO,
    textAlign: "center",
  },
  iconModulosStyle: {
    alignSelf: "center",
    marginBottom: convertirTamanoVertical(18),
  },
  containerVersion: {
    marginTop: convertirTamanoVertical(35),
    borderWidth: convertirTamanoHorizontal(1),
    borderColor: ROJO,
    height: convertirTamanoVertical(60),
    margin: convertirTamanoHorizontal(20),
    borderRadius: convertirTamanoHorizontal(10),
    justifyContent: "center",
  },
});
