import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
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

const Principal = () => {
  const { signOut } = useSession();

  const router = useRouter();

  const handleLogOut = useCallback(() => {
    signOut();
  }, [signOut]);

  const handleOpenSincronizador = useCallback(() => {
    router.push("/principal/sincronizar");
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>Bienvenido Byron </Text>
        <Pressable onPress={handleLogOut} style={styles.iconStyle}>
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
          <TouchableOpacity>
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
          <TouchableOpacity>
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
          <TouchableOpacity>
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
          <TouchableOpacity>
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
          <TouchableOpacity>
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
      <Text style={styles.textVersion}>Version: 2.0.0</Text>
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
    fontSize: convertirTamanoHorizontal(32),
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
