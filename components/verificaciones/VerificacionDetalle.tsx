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
import { useObtenerVerificacionesDetalles } from "@/service/Verificaciones/useObtenerVerificacionesDetalles";
import { formatCurrency } from "@/helper/function/numericas";

const VerificacionDetalle = () => {
  const [modalVerificar, setModalVerificar] = useState(false);

  const { datos } = useVerificacionStore();

  const { data, isLoading } = useObtenerVerificacionesDetalles(
    {
      identificacion: datos?.identificacion ?? "",
    },
    { enabled: !!datos }
  );

  const handlePressIconRight = useCallback(() => {
    setModalVerificar(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVerificar(false);
  }, []);

  return (
    <View style={styles.scrollView}>
      <Header
        title={datos?.nombres}
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
            labelRight={data?.datosGenerales.cedulaCliente}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Nombre"
            labelRight={data?.datosGenerales.nombreCliente}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Estado Civil"
            labelRight={data?.datosGenerales.estadoCivil}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Dependientes"
            labelRight={String(data?.datosGenerales.dependientes)}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Telefono"
            labelRight={data?.datosGenerales.telefono}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Referencia"
            labelRight={data?.datosGenerales.referencias}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Observaciones"
            labelRight={data?.datosGenerales.observacion}
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
            labelRight={data?.buro.categoria}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Score"
            labelRight={String(data?.buro.score)}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
          <HeaderCard
            labelLeft="Producto"
            labelRight={data?.buro.producto}
            styleContainer={styles.rowCardStyle}
            styleLeft={styles.labelCardLeft}
            styleRight={styles.labelCardRight}
          />
        </Card>
        {data?.datosVivienda && (
          <Card style={styles.cardStyle}>
            <Text style={styles.textTituloHeader}>Datos Vivienda</Text>
            <Separador />
            <HeaderCard
              labelLeft="Dirección"
              labelRight={data?.datosVivienda.direccion}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Zona"
              labelRight={data?.datosVivienda.zona}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Tipo Vivienda"
              labelRight={data?.datosVivienda.tipoVivienda}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Nombre Dueño"
              labelRight={data?.datosVivienda.nombreDueno}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Telf. Dueño"
              labelRight={data?.datosVivienda.telDueno}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Construcción"
              labelRight={data?.datosVivienda.construccon}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
          </Card>
        )}
        {data?.datosConyugue && (
          <Card style={styles.cardStyle}>
            <Text style={styles.textTituloHeader}>Datos conyugue</Text>
            <Separador />
            <HeaderCard
              labelLeft="Identificación"
              labelRight={data?.datosConyugue.cedulaConyuge}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Nombre"
              labelRight={data?.datosConyugue.nombre}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Apellido"
              labelRight={data?.datosConyugue.apellidos}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Celular"
              labelRight={data?.datosConyugue.celular}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
          </Card>
        )}
        {data?.actividadEconomica && (
          <Card style={styles.cardStyle}>
            <Text style={styles.textTituloHeader}>Actividad Economica</Text>
            <Separador />
            <HeaderCard
              labelLeft="Ocupacion Laboral"
              labelRight={data.actividadEconomica.ocupacionLaboral}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Empresa"
              labelRight={data.actividadEconomica.empresa}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Antiguedad"
              labelRight={data?.actividadEconomica.antiguedad}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Cargo"
              labelRight={data?.actividadEconomica.cargo}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Jefe"
              labelRight={data?.actividadEconomica.jefe}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Ingresos"
              labelRight={formatCurrency(data?.actividadEconomica.ingresos)}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Telf. Empresa"
              labelRight={data?.actividadEconomica.telEmpresa}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Cel. Jefe"
              labelRight={data?.actividadEconomica.celJefe}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Dir. Empresa"
              labelRight={data?.actividadEconomica.dirEmpresa}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
          </Card>
        )}
        {data?.actividadEconomicaConyugue && (
          <Card style={styles.cardStyle}>
            <Text style={styles.textTituloHeader}>
              Actividad Economica Conyugue
            </Text>
            <Separador />
            <HeaderCard
              labelLeft="Ocupacion Laboral"
              labelRight={data?.actividadEconomicaConyugue.ocupacionLaboral}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Empresa"
              labelRight={data?.actividadEconomicaConyugue.empresa}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Antiguedad"
              labelRight={data?.actividadEconomicaConyugue.antiguedad}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Cargo"
              labelRight={data?.actividadEconomicaConyugue.cargo}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Jefe"
              labelRight={data?.actividadEconomicaConyugue.jefe}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Ingresos"
              labelRight={formatCurrency(
                data?.actividadEconomicaConyugue.ingresos
              )}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Telf. Empresa"
              labelRight={data?.actividadEconomicaConyugue.telEmpresa}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Cel. Jefe"
              labelRight={data?.actividadEconomicaConyugue.celJefe}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
            <HeaderCard
              labelLeft="Dir. Empresa"
              labelRight={data?.actividadEconomicaConyugue.dirEmpresa}
              styleContainer={styles.rowCardStyle}
              styleLeft={styles.labelCardLeft}
              styleRight={styles.labelCardRight}
            />
          </Card>
        )}
      </ScrollView>
      {modalVerificar && datos && (
        <ModalRealizarVerificacion
          cliente={datos}
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
