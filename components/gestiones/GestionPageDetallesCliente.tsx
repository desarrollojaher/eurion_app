import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Card from "../commons/card/Card";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import HeaderCard from "../commons/card/HeaderCard";
import { GRIS, GRIS_CLARO } from "@/constants/Colors";
import ModalClientes from "./modal/ModalClientes";
import ModalVivienda from "./modal/ModalVivienda";
import { ICliente, IClienteGaranteCobranza } from "@/models/ICliente";
import { IClienteConyugue } from "@/models/IConyugue";
import { IDireccionGcobranza } from "@/models/IDireccion";
import Select, { IDatosSelect } from "../commons/select/Select";
import { find } from "lodash";
import { IGestionesCelularPasadas } from "@/models/IGestionesCelular";
import { format } from "date-fns";
import Separador from "../commons/separador/Separador";
import { useGestionesPasadas } from "@/service/Gestiones/useGestionesPasadas";
import { useComprobantesObtener } from "@/service/Comprobantes/useComprobantesObtener";
import { IGestionesAnteriores } from "@/models/IGestiones";

interface PropsGestionPageDetallesCliente {
  clId: number;
}
const GestionPageDetallesCliente: React.FC<PropsGestionPageDetallesCliente> = ({
  clId,
}) => {
  const [modalClientes, setModalClientes] = useState(false);
  const [modalVivienda, setModalVivienda] = useState(false);

  const [cliente, setCliente] = useState<Partial<ICliente> | null>(null);

  const [vivienda, setVivienda] = useState<IDireccionGcobranza | null>(null);

  const [documento, setDocumento] = useState<IDatosSelect | null>(null);

  const { data: dataComprobantes } = useComprobantesObtener({ clId: clId });

  const { data: datosGestionesAnteriores } = useGestionesPasadas(
    {
      crId: Number(documento?.value ?? "0"),
    },
    {
      enabled: !!documento && !!documento?.value,
    },
  );

  console.log(dataComprobantes);
  

  const comprobantes = useMemo(() => {
    return dataComprobantes
      ? dataComprobantes?.map((item) => {
          return {
            label: `${item.tipoComprobante} ${item.idCredito}`,
            value: item.idCredito?.toString() ?? "",
          };
        })
      : [];
  }, [dataComprobantes]);

  console.log(datosGestionesAnteriores);

  // const { data: datosCliente } = useClienteObtener({
  //   identificacion: identificacionCliente,
  // });

  // const { data: datosClienteConyugue } = useClienteConyugueObtener({
  //   identificacion: identificacionCliente,
  // });

  // const { data: datosClienteGarante } = useClienteGaranteObtener({
  //   identificacion: identificacionCliente,
  // });

  // const { data: datosClienteVivienda } = useClienteViviendaObtener({
  //   identificacion: identificacionCliente,
  // });

  // const { data: datosDocumentos } = useDocumentosCabeceraObtener({
  //   identificacion: identificacionCliente,
  // });

  // const { data: dataGestionesPasadas } = useObtenerGestionesPasadas({
  //   nroDocumento: documetoSeleccionado,
  // });

  // const datosDocumentosCabecera = useMemo<IDatosSelect[]>(() => {
  //   if (datosDocumentos && datosDocumentos.length > 0) {
  //     setDocumentoSeleccionado(datosDocumentos[0].nroDocumento);
  //     return datosDocumentos.map((item) => {
  //       return {
  //         label: item.nroDocumento,
  //         value: item.nroDocumento,
  //       };
  //     });
  //   } else {
  //     return [];
  //   }
  // }, [datosDocumentos]);

  const handleOpenCliente = useCallback((datos: ICliente | null) => {
    setCliente(datos);
    setModalClientes(true);
  }, []);
  const handleOpenConyugue = useCallback((dato: IClienteConyugue) => {
    // setCliente({
    //   apellido: dato.apellido,
    //   identificacion: dato.identificacion,
    //   nombres: dato.nombres,
    //   observacion: dato.ocupacionLaboral,
    //   referencias: dato.referencias,
    // });
    setModalClientes(true);
  }, []);

  const handleOpenGarante = useCallback((dato: IClienteGaranteCobranza) => {
    // setCliente({
    //   identificacion: dato.identificacion,
    //   nombres: dato.nombres,
    //   telefono: dato.telefono,
    //   observacion: dato.trabajaEn,
    //   referencias: dato.detalleDireccion,
    // });
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
    setDocumento(dato);
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: IGestionesAnteriores; index: number }) => (
      <Card width={convertirTamanoHorizontal(370)}>
        <HeaderCard
          labelRight={format(item.fechaGestionado ?? "", "dd-MM-yyyy HH:mm:ss")}
          styleRight={styles.styleHeaderCardRigth}
        />
        <HeaderCard
          labelLeft="Observación"
          labelRight={item.geObservacion}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador color={GRIS_CLARO} />
        {/* <HeaderCard
          labelLeft="Tipo Gestión"
          labelRight={item.}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
        <Separador color={GRIS_CLARO} /> */}
        <HeaderCard
          labelLeft="Gestor"
          labelRight={item.nombreGestiona}
          styleLeft={styles.styleLabelLeft}
          styleRight={styles.styleLabelRigth}
        />
      </Card>
    ),
    [],
  );

  return (
    <View style={styles.containerDetalles}>
      <Card width={convertirTamanoHorizontal(370)}>
        {/* {datosCliente && datosCliente.length > 0 && (
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
        )} */}
      </Card>
      {comprobantes && comprobantes.length > 1 && (
        <Card>
          <Select
            datos={comprobantes}
            styleContainer={styles.styleContainer}
            defaultValue={find(
              comprobantes,
              (item) => item.label === documento?.label,
            )}
            onSelect={handleSeleccionarDocumento}
          />
        </Card>
      )}

      <FlatList
        data={datosGestionesAnteriores}
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
