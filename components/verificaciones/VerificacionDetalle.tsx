import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import Header from "../commons/header/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import { BLANCO, GRIS } from "@/constants/Colors";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import ModalRealizarVerificacion from "./modal/ModalRealizarVerificacion";
import Card from "../commons/card/Card";
import Separador from "../commons/separador/Separador";
import HeaderCard from "../commons/card/HeaderCard";
import { useVerificacionStore } from "@/helper/store/stroreVerificacion";

const VerificacionDetalle = () => {
  const [modalVerificar, setModalVerificar] = useState(false);

  const { datosDetalles, datos } = useVerificacionStore();

  const handlePressIconRight = useCallback(() => {
    setModalVerificar(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVerificar(false);
  }, []);

  return (
    <View style={styles.scrollView}>
      <Header
        title={datos?.nombreCliente}
        iconRight={
          <Icon
            name="plus"
            color={BLANCO}
            size={convertirTamanoHorizontal(30)}
          />
        }
        handleTapIconRight={handlePressIconRight}
      />

      <ScrollView style={styles.scrollView}>
        <Card style={styles.cardStyle}>
          <Text style={styles.textTituloHeader}>Datos Generales</Text>
          <Separador />
          <HeaderCard
            labelLeft="Identificación"
            labelRight={datosDetalles?.datosGenerales.cedulaCliente}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Nombre"
            labelRight={datosDetalles?.datosGenerales.nombreCliente}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Estado Civil"
            labelRight={datosDetalles?.datosGenerales.estadoCivil}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Dependientes"
            labelRight={String(datosDetalles?.datosGenerales.dependientes)}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Telefono"
            labelRight={datosDetalles?.datosGenerales.telefono}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Referencia"
            labelRight={datosDetalles?.datosGenerales.referencias}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Observaciones"
            labelRight={datosDetalles?.datosGenerales.observacion}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
        </Card>
        <Card style={styles.cardStyle}>
          <Text style={styles.textTituloHeader}>Buró</Text>
          <Separador />
          <HeaderCard
            labelLeft="Categoría"
            labelRight={datosDetalles?.buro.categoria}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Score"
            labelRight={String(datosDetalles?.buro.score)}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Producto"
            labelRight={datosDetalles?.buro.producto}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
        </Card>
        {datosDetalles?.datosVivienda && (
          <Card style={styles.cardStyle}>
            <Text style={styles.textTituloHeader}>Datos Vivienda</Text>
            <Separador />
            <HeaderCard
              labelLeft="Dirección"
              labelRight={datosDetalles?.datosVivienda.direccion}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Zona"
              labelRight={datosDetalles?.datosVivienda.zona}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Tipo Vivienda"
              labelRight={datosDetalles?.datosVivienda.tipoVivienda}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Nombre Dueño"
              labelRight={datosDetalles?.datosVivienda.nombrePropietario}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Telf. Dueño"
              labelRight={datosDetalles?.datosVivienda.telefonoPropietario}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Construcción"
              labelRight={datosDetalles?.datosVivienda.construccion}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
          </Card>
        )}
        {datosDetalles?.datosConyugue && (
          <Card style={styles.cardStyle}>
            <Text style={styles.textTituloHeader}>Datos conyugue</Text>
            <Separador />
            <HeaderCard
              labelLeft="Identificación"
              labelRight={datosDetalles?.datosConyugue.cedulaCliente}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Nombre"
              labelRight={datosDetalles?.datosConyugue.nombreCliente}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Apellido"
              labelRight={datosDetalles?.datosConyugue.apellidoCliente}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Celular"
              labelRight={datosDetalles?.datosConyugue.telefonoCliente}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
          </Card>
        )}
        {datosDetalles?.actividadEconomica && (
          <Card style={styles.cardStyle}>
            <Text style={styles.textTituloHeader}>Actividad Economica</Text>
            <Separador />
            <HeaderCard
              labelLeft="Ocupacion Laboral"
              labelRight={datosDetalles.actividadEconomica.ocupacionLaboral}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Empresa"
              labelRight={datosDetalles.actividadEconomica.empresa}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Antiguedad"
              labelRight={datosDetalles?.actividadEconomica.antiguedad}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Cargo"
              labelRight={datosDetalles?.actividadEconomica.cargo}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Jefe"
              labelRight={datosDetalles?.actividadEconomica.jefe}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Ingresos"
              labelRight={datosDetalles?.actividadEconomica.ingresos}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Telf. Empresa"
              labelRight={datosDetalles?.actividadEconomica.telfonoEmpresa}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Cel. Jefe"
              labelRight={datosDetalles?.actividadEconomica.celularjefe}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Dir. Empresa"
              labelRight={datosDetalles?.actividadEconomica.dirreccionEmpresa}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
          </Card>
        )}
        {datosDetalles?.actividadEconomicaConyugue && (
          <Card style={styles.cardStyle}>
            <Text style={styles.textTituloHeader}>Actividad Economica</Text>
            <Separador />
            <HeaderCard
              labelLeft="Ocupacion Laboral"
              labelRight={
                datosDetalles?.actividadEconomicaConyugue.ocupacionLaboral
              }
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Empresa"
              labelRight={datosDetalles?.actividadEconomicaConyugue.empresa}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Antiguedad"
              labelRight={datosDetalles?.actividadEconomicaConyugue.antiguedad}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Cargo"
              labelRight={datosDetalles?.actividadEconomicaConyugue.cargo}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Jefe"
              labelRight={datosDetalles?.actividadEconomicaConyugue.jefe}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Ingresos"
              labelRight={datosDetalles?.actividadEconomicaConyugue.ingresos}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Telf. Empresa"
              labelRight={
                datosDetalles?.actividadEconomicaConyugue.telfonoEmpresa
              }
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Cel. Jefe"
              labelRight={datosDetalles?.actividadEconomicaConyugue.celularjefe}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Dir. Empresa"
              labelRight={
                datosDetalles?.actividadEconomicaConyugue.dirreccionEmpresa
              }
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
          </Card>
        )}
      </ScrollView>
      {modalVerificar && (
        <ModalRealizarVerificacion
          cliente={datos?.nombreCliente ?? ""}
          onClose={handleCloseModal}
          visible={modalVerificar}
        />
      )}
    </View>
  );
};

export default VerificacionDetalle;

const styles = StyleSheet.create({
  rowCardStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  labelCardLeft: {
    width: convertirTamanoHorizontal(140),
  },
  labelCardRight: {
    width: convertirTamanoHorizontal(160),
    fontSize: convertirTamanoHorizontal(14),
    lineHeight: convertirTamanoHorizontal(25),
    color: GRIS,
  },
  cardStyle: {
    width: convertirTamanoHorizontal(342),
    marginHorizontal: convertirTamanoHorizontal(35),
    marginVertical: convertirTamanoVertical(20),
  },
  textTituloHeader: {
    fontWeight: "bold",
    fontSize: convertirTamanoHorizontal(16),
  },
  scrollView: {
    flex: 1,
  },
});
