import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Card from "../commons/card/Card";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import TextCardIcon from "../commons/card/TextCardIcon";
import Icon from "react-native-vector-icons/FontAwesome5";
import HeaderCard from "../commons/card/HeaderCard";
import { GRIS, GRIS_CLARO } from "@/constants/Colors";
import ModalClientes from "./modal/ModalClientes";
import ModalVivienda from "./modal/ModalVivienda";
import { useClienteObtener } from "@/service/Cliente/useClienteObtener";
import { useClienteConyugueObtener } from "@/service/Cliente/useClienteConyugueObtener";
import { useClienteGaranteObtener } from "@/service/Cliente/useClienteGaranteObtener";
import { ICliente, IClienteGaranteCobranza } from "@/models/ICliente";
import { IClienteConyugue } from "@/models/IConyugue";
import { useClienteViviendaObtener } from "@/service/Cliente/useClienteViviendaObtener";
import { IDireccionGcobranza } from "@/models/IDireccion";
import Select, { IDatosSelect } from "../commons/select/Select";
import { find } from "lodash";
import { useObtenerGestionesPasadas } from "@/service/gestiones/useObtenerGestionesPasadas";
import { IGestionesCelularPasadas } from "@/models/IGestionesCelular";
import { format } from "date-fns";
import { useDocumentosCabeceraObtener } from "@/service/Documentos/useDocumentosCabeceraObtener";
import Separador from "../commons/separador/Separador";

interface PropsGestionPageDetallesCliente {
  identificacionCliente: string;
}
const GestionPageDetallesCliente: React.FC<PropsGestionPageDetallesCliente> = ({
  identificacionCliente,
}) => {
  const [modalClientes, setModalClientes] = useState(false);
  const [modalVivienda, setModalVivienda] = useState(false);
  const [documetoSeleccionado, setDocumentoSeleccionado] = useState<string>("");

  const [cliente, setCliente] = useState<Partial<ICliente> | null>(null);

  const [vivienda, setVivienda] = useState<IDireccionGcobranza | null>(null);

  const { data: datosCliente } = useClienteObtener({
    identificacion: identificacionCliente,
  });

  const { data: datosClienteConyugue } = useClienteConyugueObtener({
    identificacion: identificacionCliente,
  });

  const { data: datosClienteGarante } = useClienteGaranteObtener({
    identificacion: identificacionCliente,
  });

  const { data: datosClienteVivienda } = useClienteViviendaObtener({
    identificacion: identificacionCliente,
  });

  const { data: datosDocumentos } = useDocumentosCabeceraObtener({
    identificacion: identificacionCliente,
  });

  const { data: dataGestionesPasadas } = useObtenerGestionesPasadas({
    nroDocumento: documetoSeleccionado,
  });

  const datosDocumentosCabecera = useMemo<IDatosSelect[]>(() => {
    if (datosDocumentos && datosDocumentos.length > 0) {
      setDocumentoSeleccionado(datosDocumentos[0].nroDocumento);
      return datosDocumentos.map((item) => {
        return {
          label: item.nroDocumento,
          value: item.nroDocumento,
        };
      });
    } else {
      return [];
    }
  }, [datosDocumentos]);

  const handleOpenCliente = useCallback((datos: ICliente | null) => {
    setCliente(datos);
    setModalClientes(true);
  }, []);
  const handleOpenConyugue = useCallback((dato: IClienteConyugue) => {
    setCliente({
      apellido: dato.apellido,
      identificacion: dato.identificacion,
      nombres: dato.nombres,
      observacion: dato.ocupacionLaboral,
      referencias: dato.referencias,
    });
    setModalClientes(true);
  }, []);

  const handleOpenGarante = useCallback((dato: IClienteGaranteCobranza) => {
    setCliente({
      identificacion: dato.identificacion,
      nombres: dato.nombres,
      telefono: dato.telefono,
      observacion: dato.trabajaEn,
      referencias: dato.detalleDireccion,
    });
    setModalClientes(true);
  }, []);

  const handleOpenVivienda = useCallback((dato: IDireccionGcobranza) => {
    setVivienda(dato);
    setModalVivienda(true);
  }, []);

  const handleCloseCliente = useCallback(() => {
    setModalClientes(false);
  }, []);

  const handleCloseVivienda = useCallback(() => {
    setModalVivienda(false);
  }, []);

  const handleSeleccionarDocumento = useCallback((dato: IDatosSelect) => {
    setDocumentoSeleccionado(dato.value);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: IGestionesCelularPasadas; index: number }) => (
      <Card width={convertirTamanoHorizontal(370)}>
        <HeaderCard
          labelRight={format(item.fechaGestion, "dd-MM-yyyy HH:mm:ss")}
          styleRight={styles.styleHeaderCardRigth}
        />
        <HeaderCard
          labelLeft="Observación"
          labelRight={item.observacion}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador color={GRIS_CLARO} />
        <HeaderCard
          labelLeft="Tipo Gestión"
          labelRight={item.tipoGestion}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador color={GRIS_CLARO} />
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
        {datosCliente && datosCliente.length > 0 && (
          <TextCardIcon
            icon={
              <Icon
                name="expand-arrows-alt"
                size={convertirTamanoHorizontal(20)}
              />
            }
            textDetalle={
              datosCliente[0].apellido + " " + datosCliente[0].nombres
            }
            textCabecera="Cliente"
            onPress={() => handleOpenCliente(datosCliente[0])}
          />
        )}
        {datosClienteConyugue &&
          datosClienteConyugue.length > 0 &&
          datosClienteConyugue[0].nombres !== " " && (
            <TextCardIcon
              icon={
                <Icon
                  name="expand-arrows-alt"
                  size={convertirTamanoHorizontal(20)}
                />
              }
              textDetalle={datosClienteConyugue[0].nombres ?? ""}
              textCabecera="Conyugue"
              onPress={() => handleOpenConyugue(datosClienteConyugue[0])}
            />
          )}

        {datosClienteGarante && datosClienteGarante.length > 0 && (
          <TextCardIcon
            icon={
              <Icon
                name="expand-arrows-alt"
                size={convertirTamanoHorizontal(20)}
              />
            }
            textDetalle={datosClienteGarante[0].nombres ?? ""}
            textCabecera="Garante"
            onPress={() => handleOpenGarante(datosClienteGarante[0])}
          />
        )}

        {datosClienteVivienda && datosClienteVivienda.length > 0 && (
          <TextCardIcon
            icon={
              <Icon
                name="expand-arrows-alt"
                size={convertirTamanoHorizontal(20)}
              />
            }
            textDetalle={datosClienteVivienda[0].direccion ?? ""}
            textCabecera="Vivienda"
            onPress={() => handleOpenVivienda(datosClienteVivienda[0])}
          />
        )}
      </Card>
      {datosDocumentosCabecera && datosDocumentosCabecera.length > 1 && (
        <Card>
          <Select
            datos={datosDocumentosCabecera}
            styleContainer={styles.styleContainer}
            defaultValue={find(
              datosDocumentosCabecera,
              (item) => item.label === documetoSeleccionado
            )}
            onSelect={handleSeleccionarDocumento}
          />
        </Card>
      )}

      <FlatList
        data={dataGestionesPasadas}
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
  styleContainer: {
    height: convertirTamanoVertical(40),
    width: convertirTamanoHorizontal(350),
  },
});
