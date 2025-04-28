import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import Card from "../commons/card/Card";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import TextCardIcon from "../commons/card/TextCardIcon";
import Icon from "react-native-vector-icons/FontAwesome5";
import HeaderCard from "../commons/card/HeaderCard";
import { GRIS } from "@/constants/Colors";
import ModalClientes from "./modal/ModalClientes";
import {
  IVerificacionDatosVivienda,
  IVerificacionDetalleGeneral,
} from "@/models/IVerificacionPrueba";
import ModalVivienda from "./modal/ModalVivienda";

const GestionPageDetallesCliente = () => {
  const [modalClientes, setModalClientes] = useState(false);
  const [modalVivienda, setModalVivienda] = useState(false);

  const [cliente, setCliente] = useState<IVerificacionDetalleGeneral | null>(
    null
  );

  const [vivienda, setVivienda] = useState<IVerificacionDatosVivienda | null>(
    null
  );
  const handleOpenCliente = useCallback((dato: any) => {
    setCliente({
      cedulaCliente: "092037160-6",
      nombreCliente: "GUTAMA PEÑALOZA MARIA MERCEDES PT UA-011569",
      estadoCivil: "SOLTERO",
      dependientes: 0,
      telefono: "099880412",
      observacion:
        "COMERCINATE / PAGOS PUNTUTALES POR SALIR DE UN CREDITO / DOMICILIO CON ESTABILIDAD FAMILIAR ",
      referencias:
        "GUTAMA MARIO 0998801412 072420298 SAN CARLOS GUTAMA EVA 0958993962 072420298 SAB CARLOS / SUSTENTO AGRICULTOR",
    });
    setModalClientes(true);
  }, []);
  const handleOpenConyugue = useCallback((dato: any) => {
    setCliente({
      cedulaCliente: "092037160-6",
      nombreCliente: "GUTAMA PEÑALOZA MARIA MERCEDES PT UA-011569",
      estadoCivil: "SOLTERO",
      dependientes: 0,
      telefono: "099880412",
      observacion:
        "COMERCINATE / PAGOS PUNTUTALES POR SALIR DE UN CREDITO / DOMICILIO CON ESTABILIDAD FAMILIAR ",
      referencias:
        "GUTAMA MARIO 0998801412 072420298 SAN CARLOS GUTAMA EVA 0958993962 072420298 SAB CARLOS / SUSTENTO AGRICULTOR",
    });
    setModalClientes(true);
  }, []);

  const handleOpenGarante = useCallback((dato: any) => {
    setCliente({
      cedulaCliente: "092037160-6",
      nombreCliente: "GUTAMA PEÑALOZA MARIA MERCEDES PT UA-011569",
      estadoCivil: "SOLTERO",
      dependientes: 0,
      telefono: "099880412",
      observacion:
        "COMERCINATE / PAGOS PUNTUTALES POR SALIR DE UN CREDITO / DOMICILIO CON ESTABILIDAD FAMILIAR nsvsan lkmn lkmfasfde sfms efns fsmef semfioe msfme oisef oesofsofnmsefn  ",
      referencias:
        "GUTAMA MARIO 0998801412 072420298 SAN CARLOS GUTAMA EVA 0958993962 072420298 SAB CARLOS / SUSTENTO AGRICULTOR",
    });
    setModalClientes(true);
  }, []);

  const handleOpenVivienda = useCallback((dato: any) => {
    setVivienda({
      construccion: "",
      direccion:
        "TRONCAL RCTO SAN CARLOS 01 AV PRINCIPAL LA INDIANA ANTES DE LA T A L DERECHA CASA DE DOS PISOS  DE LADRILLO",
      nombrePropietario: "ROSENDO DAVID GUTAMA GUTAMA",
      telefonoPropietario: "",
      tipoVivienda: "FAMILIAR",
      zona: "TRONCAL ZONA 1",
    });
    setModalVivienda(true);
  }, []);

  const handleCloseCliente = useCallback(() => {
    setModalClientes(false);
  }, []);

  const handleCloseVivienda = useCallback(() => {
    setModalVivienda(false);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Card width={convertirTamanoHorizontal(370)}>
        <HeaderCard
          labelRight="25-01-2025"
          styleRight={styles.styleHeaderCardRigth}
        />
        <HeaderCard
          labelLeft="Observación"
          labelRight="Se le deja al ex compañero de trabajo"
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <HeaderCard
          labelLeft="Tipo Gestión"
          labelRight="Cob-presion en lugar de trabajo"
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <HeaderCard
          labelLeft="Gestor"
          labelRight="ARBITO DIAS ROLANDO MARTIN"
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
      </Card>
    ),
    []
  );

  return (
    <View style={styles.containerDetalles}>
      <Card width={convertirTamanoHorizontal(370)}>
        <TextCardIcon
          icon={
            <Icon
              name="expand-arrows-alt"
              size={convertirTamanoHorizontal(20)}
            />
          }
          textDetalle="AREVALO RIVAS FAUSTO GEOVANY"
          textCabecera="Cliente"
          onPress={() => handleOpenCliente({ dato: "dd" })}
        />
        <TextCardIcon
          icon={
            <Icon
              name="expand-arrows-alt"
              size={convertirTamanoHorizontal(20)}
            />
          }
          textDetalle="AREVALO RIVAS FAUSTO GEOVANY"
          textCabecera="Conyugue"
          onPress={() => handleOpenConyugue("conyuge")}
        />
        <TextCardIcon
          icon={
            <Icon
              name="expand-arrows-alt"
              size={convertirTamanoHorizontal(20)}
            />
          }
          textDetalle="AREVALO RIVAS FAUSTO GEOVANY"
          textCabecera="Garante"
          onPress={() => handleOpenGarante("garante")}
        />
        <TextCardIcon
          icon={
            <Icon
              name="expand-arrows-alt"
              size={convertirTamanoHorizontal(20)}
            />
          }
          textDetalle="AREVALO RIVAS FAUSTO GEOVANY"
          textCabecera="Vivienda"
          onPress={() => handleOpenVivienda("vivienda")}
        />
      </Card>

      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListStyle}
        showsVerticalScrollIndicator={false}
      />
      {modalClientes && cliente && (
        <ModalClientes
          datos={cliente}
          onClose={handleCloseCliente}
          visible={modalClientes}
        />
      )}

      {modalVivienda && vivienda && (
        <ModalVivienda
          datos={vivienda}
          onClose={handleCloseVivienda}
          visible={modalVivienda}
        />
      )}
    </View>
  );
};

export default GestionPageDetallesCliente;

const styles = StyleSheet.create({
  styleHeaderCardRigth: {
    color: GRIS,
    fontWeight: "bold",
    fontSize: convertirTamanoHorizontal(15),
  },
  containerDetalles: {
    flex: 1,
    alignItems: "center",
    paddingTop: convertirTamanoVertical(20),
    gap: convertirTamanoVertical(20),
  },
  flatListStyle: {
    gap: convertirTamanoVertical(10),
    paddingBottom: convertirTamanoVertical(10),
  },
  styleLabelLeft: {
    width: convertirTamanoHorizontal(110),
  },
  styleLabelRigth: {
    width: convertirTamanoHorizontal(240),
    color: GRIS,
    fontSize: convertirTamanoHorizontal(15),
  },
});
