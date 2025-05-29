import { StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";
import Header from "../commons/header/Header";
import { convertirTamanoVertical } from "@/helper/function/renderizadoImagen";
import Footer from "../commons/footer/Footer";
import GestionesTabInformacionSubida from "./render/GestionesTabInformacionSubida";
import ActualizacionesTabInformacionSubida from "./render/ActualizacionesTabInformacionSubida";
import RecibosTabInformacionSubida from "./render/RecibosTabInformacionSubida";

const InformacionSubidaPrincipal = () => {
  const [index, setIndex] = useState(0);
  const tabs = useMemo(() => ["Gestiones", "Actualizaciones", "Recibos"], []);
  const renderTab = useMemo(() => {
    if (tabs[index] === "Gestiones") {
      return <GestionesTabInformacionSubida />;
    }
    if (tabs[index] === "Actualizaciones") {
      return <ActualizacionesTabInformacionSubida />;
    }
    if (tabs[index] === "Recibos") {
      return <RecibosTabInformacionSubida />;
    }
  }, [index, tabs]);
  return (
    <View style={styles.constainerGeneral}>
      <Header title="Información subida" />
      <View style={styles.containerBody}>{renderTab}</View>
      <Footer items={tabs} setTab={setIndex} indexSeleccionado={index} />
    </View>
  );
};

export default InformacionSubidaPrincipal;

const styles = StyleSheet.create({
  constainerGeneral: {
    flex: 1,
  },
  containerBody: {
    flex: 1,
    marginBottom: convertirTamanoVertical(10),
    marginTop: convertirTamanoVertical(20),
  },
});
