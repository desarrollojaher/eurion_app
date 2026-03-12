import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Card from "../commons/card/Card";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import HeaderCard from "../commons/card/HeaderCard";
import { GRIS, GRIS_CLARO } from "@/constants/Colors";
import Select, { IDatosSelect } from "../commons/select/Select";
import { find } from "lodash";
import { format } from "date-fns";
import Separador from "../commons/separador/Separador";
import { useGestionesPasadas } from "@/service/Gestiones/useGestionesPasadas";
import { useComprobantesObtener } from "@/service/Comprobantes/useComprobantesObtener";
import { IGestionesAnteriores } from "@/models/IGestiones";
import { useReferenciasObtener } from "@/service/Referecias/useRefereciasObtener";
import { IReferencia } from "@/models/IReferencia";
import TextCard from "../commons/card/TextCard";
import EmptyList from "../commons/FlatList/EmptyList";

interface PropsGestionPageDetallesCliente {
  clId: number;
}
const GestionPageDetallesCliente: React.FC<PropsGestionPageDetallesCliente> = ({
  clId,
}) => {
  const [documento, setDocumento] = useState<IDatosSelect | null>(null);
  const [referencia, setReferencia] = useState<IReferencia | null>(null);

  const { data: dataComprobantes } = useComprobantesObtener({ clId: clId });

  const {
    data: datosGestionesAnteriores,
    isLoading: isLoadingGestionesAnteriores,
  } = useGestionesPasadas({
    clId: clId,
  });

  const { data: obtenerReferencias } = useReferenciasObtener({ clId: clId });

  const referencias = useMemo(() => {
    return obtenerReferencias
      ? obtenerReferencias?.map((item) => {
          return {
            label: item.tipoReferencia ?? "",
            value: item.peIdReferencia?.toString() ?? "",
          };
        })
      : [];
  }, [obtenerReferencias]);

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

  // const handleOpenCliente = useCallback((datos: ICliente | null) => {
  //   setCliente(datos);
  //   setModalClientes(true);
  // }, []);
  // const handleOpenConyugue = useCallback((dato: IClienteConyugue) => {
  //   // setCliente({
  //   //   apellido: dato.apellido,
  //   //   identificacion: dato.identificacion,
  //   //   nombres: dato.nombres,
  //   //   observacion: dato.ocupacionLaboral,
  //   //   referencias: dato.referencias,
  //   // });
  //   setModalClientes(true);
  // }, []);

  // const handleOpenGarante = useCallback((dato: IClienteGaranteCobranza) => {
  //   // setCliente({
  //   //   identificacion: dato.identificacion,
  //   //   nombres: dato.nombres,
  //   //   telefono: dato.telefono,
  //   //   observacion: dato.trabajaEn,
  //   //   referencias: dato.detalleDireccion,
  //   // });
  //   setModalClientes(true);
  // }, []);

  // const handleOpenVivienda = useCallback((dato: IDireccionGcobranza) => {
  //   setVivienda(dato);
  //   setModalVivienda(true);
  // }, []);

  // const handleCloseCliente = useCallback(() => {
  //   setModalClientes(false);
  // }, []);

  // const handleCloseVivienda = useCallback(() => {
  //   setModalVivienda(false);
  // }, []);

  const handleSeleccionarDocumento = useCallback((dato: IDatosSelect) => {
    setDocumento(dato);
  }, []);

  const handleSeleccionarReferencia = useCallback(
    (dato: IDatosSelect) => {
      const ref = find(obtenerReferencias, (item) => {
        return item.peIdReferencia === Number(dato.value);
      });
      setReferencia(ref ?? null);
    },
    [obtenerReferencias],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: IGestionesAnteriores; index: number }) => (
      <Card width={convertirTamanoHorizontal(370)} style={styles.card}>
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
        <Select
          datos={referencias}
          styleContainer={styles.styleContainer}
          placeholder="Seleccione Referencia"
          defaultValue={find(
            referencias,
            (item) => item.label === referencia?.identificacionReferencia,
          )}
          onSelect={handleSeleccionarReferencia}
        />
      </Card>
      {referencia && (
        <Card>
          <TextCard
            titulo="Identificación"
            subtitulo={referencia?.identificacionReferencia ?? ""}
            styleContainer={styles.styleContainerInfo}
            styleText={styles.styleRigthText}
            styleHeader={styles.styleLeftText}
          />
          <TextCard
            titulo="Apellidos"
            subtitulo={referencia?.apellidosReferencia ?? ""}
            styleContainer={styles.styleContainerInfo}
            styleText={styles.styleRigthText}
            styleHeader={styles.styleLeftText}
          />

          <TextCard
            titulo="Nombres"
            subtitulo={referencia?.nombresReferencia ?? ""}
            styleContainer={styles.styleContainerInfo}
            styleText={styles.styleRigthText}
            styleHeader={styles.styleLeftText}
          />

          <TextCard
            titulo="Actividad Económica"
            subtitulo={referencia?.actividadEconomicaReferencia ?? ""}
            styleContainer={styles.styleContainerInfo}
            styleText={styles.styleRigthText}
            styleHeader={styles.styleLeftText}
          />

          <TextCard
            titulo="Telefono"
            subtitulo={referencia?.telfCelularReferencia ?? ""}
            styleContainer={styles.styleContainerInfo}
            styleText={styles.styleRigthText}
            styleHeader={styles.styleLeftText}
          />
        </Card>
      )}
      {comprobantes && comprobantes.length > 1 && (
        <Card>
          <Select
            datos={comprobantes}
            styleContainer={styles.styleContainer}
            placeholder="Seleccione Comprobante"
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
        ListEmptyComponent={
          <EmptyList isLoading={isLoadingGestionesAnteriores} />
        }
      />
      {/* {modalClientes && cliente && (
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
      )} */}
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
  styleContainerInfo: {
    width: convertirTamanoHorizontal(350),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  styleLeftText: {
    width: convertirTamanoHorizontal(150),
  },
  styleRigthText: {
    width: convertirTamanoHorizontal(200),
    lineHeight: convertirTamanoVertical(25),
  },
  card: {
    borderWidth: convertirTamanoHorizontal(2),
    borderColor: GRIS_CLARO,
  },
});
