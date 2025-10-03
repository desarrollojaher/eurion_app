import { Keyboard, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../commons/header/Header";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import { BLANCO } from "@/constants/Colors";
import Footer from "../commons/footer/Footer";
import ReciboTabCliente from "./ReciboTabCliente";
import ReciboTabRecibo from "./ReciboTabRecibo";
import ReciboTabTipoPago from "./ReciboTabTipoPago";
import { useReciboStore } from "@/helper/store/storeRecibos";
import { z } from "zod";
import { IReciboEnviar, IReciboEnviarDatos, IRecibos } from "@/models/IRecibo";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toast } from "toastify-react-native";
import {
  cloneDeep,
  find,
  intersection,
  isEqual,
  isEqualWith,
  pick,
  sumBy,
} from "lodash";
import ModalAlertBack from "./modal/ModalAlertBack";
import useBackButtonHandle from "@/hooks/useBackButtonHandle";
import { format } from "date-fns";
import * as Location from "expo-location";
import ModalLoading from "../commons/modal/ModalLoading";
import ModalAlertaGurdar from "./modal/ModalAlertaGurdar";
import { useComprobantesObtener } from "@/service/Comprobantes/useComprobantesObtener";
import { useSession } from "@/helper/provider/Auth";
import { useRecibosGuardar } from "@/service/Recibos/useRecibosGuardar";
import { handleChangeDireccionImagenes } from "@/helper/function/imagenes";
import { router } from "expo-router";

const schema = z.object({
  datos: z.array(
    z.object({
      identificacionCliente: z
        .string()
        .min(1, "La identificación es requerida"),
      doctran: z.string().min(1, "El número de transacción es requerido"),
      usId: z.number().nullish(),
      coId: z.number().nullish(),
      crId: z
        .number({
          required_error: "El crId es requerido",
          invalid_type_error: "El crId debe ser un number",
        })
        .nullish(),
      valores: z
        .array(
          z.object({
            id: z.string().nullish(),
            tipoPago: z.string().min(1, "El tipo de pago es requerido"),
            valor: z
              .number()
              .min(1, "El valor debe ser mayor a cero")
              .nullish(),
            fechaCobro: z.string().nullish(),
            urlImagen: z.string().nullish(),
          }),
        )
        .nullish(),
      valorMora: z.preprocess((val): number | null | undefined => {
        if (val === undefined || val === null) {
          return val;
        }
        if (typeof val === "string" && val.trim() !== "") {
          const d = val.replace(",", ".");
          const parsedValue = Number(d);
          return isNaN(parsedValue) ? null : parsedValue;
        }
        return typeof val === "number" ? val : null;
      }, z.number().min(0, "El valor de mora no puede ser negativo").nullish()),

      valorCobranza: z.preprocess((val): number | null | undefined => {
        if (val === undefined || val === null) {
          return val;
        }
        if (typeof val === "string" && val.trim() !== "") {
          const d = val.replace(",", ".");
          const parsedValue = Number(d);
          return isNaN(parsedValue) ? null : parsedValue;
        }
        return typeof val === "number" ? val : null;
      }, z.number().min(0, "El valor de cobranza no puede ser negativo").nullish()),
      valorCancela: z.preprocess((val): number | null | undefined => {
        if (val === undefined || val === null) {
          return val;
        }
        if (typeof val === "string" && val.trim() !== "") {
          const d = val.replace(",", ".");
          const parsedValue = Number(d);
          return isNaN(parsedValue) ? null : parsedValue;
        }
        return typeof val === "number" ? val : null;
      }, z.number().min(0, "El valor a cancelar no puede ser negativo").nullish()),
      observaciones: z.string().nullish(),
      latitud: z.number().nullish(),
      longitud: z.number().nullish(),
      gcId: z.number().nullish(),
      caId: z.number().nullish(),
      hdId: z.number().nullish(),
    }),
  ),
});

const RecibosDetalles = () => {
  const [tab, setTab] = useState(0);
  const { usuario } = useSession();

  const [modalAlerta, setModalAlerta] = useState(false);
  const [loadingRecibo, setIsLoadingRecibo] = useState(false);
  const [modalAlertaGuardar, setModalAlertaGuardar] = useState(false);

  const tabs = useMemo(() => ["Cliente", "Tipo Pago", "Recibo"], []);

  const { datos } = useReciboStore();

  const { data: documentos } = useComprobantesObtener({
    clId: datos?.cliId ?? -1,
  });

  const { mutate: guardarRecibo, isPending: isPendingRecibo } =
    useRecibosGuardar();
  const defaultValueRecibos = useMemo<IReciboEnviarDatos>(() => {
    if (documentos && documentos.length > 0) {
      const data = documentos.map<IReciboEnviar>((item) => ({
        latitud: 0,
        longitud: 0,
        doctran: `${item.tipoComprobante} ${item.idCredito}`,
        fechaComprobante: format(
          item.fechaFactura ?? "",
          "dd-MM-yyyy HH:mm:ss",
        ),
        valores: [],
        imagenes: null,
        valorMora: null,
        valorCobranza: null,
        valorCancela: null,
        observaciones: "",
        identificacionCliente: datos?.identificacion ?? "",
        crId: item.idCredito,
        usId: usuario?.usuId,
        gcId: item.gcId,
        coId: item.idFactura,
        caId: item.caId,
        hdId: item.idHojaDetalle,
      }));
      const datosEnviar: IReciboEnviarDatos = {
        datos: data,
      };

      return datosEnviar;
    }
    return { datos: [] };
  }, [datos?.identificacion, documentos, usuario?.usuId]);

  const { control, handleSubmit, reset, watch, setValue, getValues } =
    useForm<IReciboEnviarDatos>({
      resolver: zodResolver(schema),
    });

  const { fields: datosDocumentos } = useFieldArray({
    control,
    name: "datos",
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const children = useMemo(() => {
    if (tabs[tab] === "Cliente") {
      return (
        <ReciboTabCliente
          datosDocumentos={datosDocumentos}
          control={control}
          datos={documentos ?? []}
          setValue={setValue}
        />
      );
    } else if (tabs[tab] === "Recibo") {
      return (
        <ReciboTabRecibo
          datosDocumentos={datosDocumentos}
          watch={watch}
          setValue={setValue}
          control={control}
          getValues={getValues}
        />
      );
    } else {
      return (
        <ReciboTabTipoPago
          datosDocumentos={datosDocumentos}
          watch={watch}
          control={control}
          getValues={getValues}
          setValue={setValue}
        />
      );
    }
  }, [
    control,
    datosDocumentos,
    documentos,
    getValues,
    setValue,
    tab,
    tabs,
    watch,
  ]);

  const handleCompararObjetos = useCallback((valor1: any, valor2: any) => {
    if (
      (valor1 === null && isEqual(valor2, [])) ||
      (valor2 === null && isEqual(valor1, []))
    ) {
      return true;
    }
    return undefined;
  }, []);

  const handleObtenerDireccionGps = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.error("El GPS no tiene permiso");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      return location;
    }
    return null;
  }, []);

  const onSuccess = useCallback(
    async (data: IReciboEnviarDatos) => {
      setModalAlertaGuardar(false);
      setIsLoadingRecibo(true);
      let noExiste = false;

      for (let index = 0; index < data.datos.length; index++) {
        const element = data.datos[index];

        const ob = defaultValueRecibos.datos[index];
        const clavesComunes = intersection(
          Object.keys(element),
          Object.keys(ob),
        );
        const objetoFiltrado1 = pick(element, clavesComunes);
        const objetoFiltrado2 = pick(ob, clavesComunes);
        const sonIguales = isEqualWith(
          objetoFiltrado1,
          objetoFiltrado2,
          handleCompararObjetos,
        );

        if (!sonIguales) {
          noExiste = true;
          const dato = find(
            documentos,
            (item) =>
              `${item.tipoComprobante} ${item.idCredito}` === element.doctran,
          );

          if (
            !element.observaciones ||
            element.observaciones.trim().length === 0
          ) {
            Toast.error(
              `Ingrese una observación en el comprobante ${element.doctran}`,
            );
            return;
          }

          const saldoVencido = dato ? (dato.crSaldoCredito ?? 0) : 0;
          const gastosCobranza = dato ? (dato.interesGastoCobranza ?? 0) : 0;
          const interesMora = dato ? (dato.interesGastoMora ?? 0) : 0;

          if (
            (element.valorCancela ?? 0) > 0 &&
            (element.valorCancela ?? 0) <=
            saldoVencido + gastosCobranza + interesMora
          ) {
            if (element.valores && element.valores?.length > 0) {
              const sumaTotal =
                (element.valorCancela ?? 0) +
                (element.valorCobranza ?? 0) +
                (element.valorMora ?? 0);
              const sumaTiposComprobantes = sumBy(element.valores, (item) =>
                Number(item.valor),
              );
              if (sumaTotal === sumaTiposComprobantes) {
                const location = await handleObtenerDireccionGps();
                const dataAux = cloneDeep(element);
                dataAux.latitud = location?.coords.latitude ?? 0;
                dataAux.longitud = location?.coords.longitude ?? 0;

                const dataEnviar: IRecibos[] = [];

                if (dataAux.valores && dataAux.valores.length > 0) {
                  for (let index = 0; index < dataAux.valores.length; index++) {
                    const url = await handleChangeDireccionImagenes({
                      titulo: dataAux.valores[index].id ?? "",
                      url: dataAux.valores[index].urlImagen ?? "",
                    });
                    const valores: IRecibos = {
                      crId: dataAux.crId ?? 0,
                      coId: dataAux.coId ?? 0,
                      pgLatitud: dataAux.latitud,
                      pgLongitud: dataAux.longitud,
                      pgObservaciones: dataAux.observaciones ?? "",
                      pgSincronizado: "N",
                      pgValorCobrado: dataAux.valores[index].valor,
                      usIdCobrador: dataAux.usId ?? 0,
                      pgFechaCobro: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                      fpId: Number(dataAux.valores[index].tipoPago),
                      gcId: dataAux.gcId ?? -1,
                      nombreImg: dataAux.valores[index].id ?? "",
                      urlImg: url ?? "",
                      caId: dataAux.caId ?? -1,
                      hdId: dataAux.hdId ?? -1,
                    };
                    dataEnviar.push(valores);
                  }
                }

                setIsLoadingRecibo(false);
                guardarRecibo(dataEnviar, {
                  onSuccess: () => {
                    reset(defaultValueRecibos);
                    setTab(0);
                    setIsLoadingRecibo(false);
                  },
                  onError: () => {
                    setIsLoadingRecibo(false);
                  },
                });
              } else {
                Toast.error(
                  `La suma de los valores del comprobante ${data.datos[index].doctran} son diferentes`,
                );
              }
            } else {
              Toast.error("Ingrese tipos de comprobantes");
            }
          } else {
            Toast.error("Ingrese los valores correctos");
          }
        }
      }

      if (!noExiste) {
        Toast.error("Debe ingresar valores en un comprobante");
      }
      setIsLoadingRecibo(false);
      router.back();
    },
    [
      defaultValueRecibos,
      documentos,
      guardarRecibo,
      handleCompararObjetos,
      handleObtenerDireccionGps,
      reset,
    ],
  );

  const onError = useCallback((error: any) => {
    console.log("Erores ==> ", error);
    Toast.error("Ingrese todos los valores");
  }, []);

  const handleTabBack = useCallback(() => {
    setModalAlerta(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalAlerta(false);
  }, []);

  const handleCloseModalGuardar = useCallback(() => {
    setModalAlertaGuardar(false);
  }, []);

  const handleOpenModalGuardar = useCallback(() => {
    setModalAlertaGuardar(true);
  }, []);

  useEffect(() => {
    if (defaultValueRecibos) {
      reset(defaultValueRecibos);
    }
  }, [defaultValueRecibos, reset]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // esta en la escucha del boton de retroceso por eso siempre se llama al ultimo de las funciones
  useBackButtonHandle(handleTabBack);

  return (
    <View style={styles.containerGeneral}>
      <Header
        title={`${datos?.apellidoCliente} ${datos?.nombreCliente}`}
        handleTapIconRight={handleOpenModalGuardar}
        iconRight={
          <Icon
            name="save"
            size={convertirTamanoHorizontal(30)}
            color={BLANCO}
          />
        }
        handleTapIconLeft={handleTabBack}
      />
      <View style={styles.containerBody}>{children}</View>
      {!isKeyboardVisible && (
        <Footer items={tabs} setTab={setTab} indexSeleccionado={tab} />
      )}
      {modalAlerta && (
        <ModalAlertBack onClose={handleCloseModal} visible={modalAlerta} />
      )}
      {loadingRecibo && isPendingRecibo && (
        <ModalLoading
          onClose={() => { }}
          visible={loadingRecibo || isPendingRecibo}
        />
      )}
      {modalAlertaGuardar && (
        <ModalAlertaGurdar
          onClose={handleCloseModalGuardar}
          visible={modalAlertaGuardar}
          handleGuardar={handleSubmit(onSuccess, onError)}
        />
      )}
    </View>
  );
};

export default RecibosDetalles;

const styles = StyleSheet.create({
  containerGeneral: {
    flex: 1,
  },
  containerBody: {
    flex: 1,
    marginVertical: convertirTamanoVertical(10),
  },
});
