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
import { IReciboEnviar, IReciboEnviarDatos } from "@/models/IRecibo";
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
import { useDocumentosCabeceraObtener } from "@/service/Documentos/useDocumentosCabeceraObtener";
import { format } from "date-fns";
import { useRecibosGuardar } from "@/service/Recibos/useRecibosGuardar";
import * as Location from "expo-location";
import ModalLoading from "../commons/modal/ModalLoading";
import ModalAlertaGurdar from "./modal/ModalAlertaGurdar";

const schema = z.object({
  datos: z.array(
    z.object({
      identificacionCliente: z
        .string()
        .min(1, "La identificación es requerida"),
      doctran: z.string().min(1, "El número de transacción es requerido"),
      valores: z
        .array(
          z.object({
            banco: z.string().nullish(),
            tipoPago: z.string().min(1, "El tipo de pago es requerido"),
            numeroDocumento: z.string().nullish(),
            fechaVencimiento: z.string().nullish(),
            emisor: z.string().nullish(),
            numeroCuenta: z.string().nullish(),
            propieario: z.string().nullish(),
            numeroCheque: z.string().nullish(),
            valor: z
              .number()
              .min(1, "El valor debe ser mayor a cero")
              .nullish(),
          })
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
      imagenes: z
        .array(
          z.object({
            url: z.string(),
            titulo: z.string(),
          })
        )
        .nullish(),
    })
  ),
});

const RecibosDetalles = () => {
  const [tab, setTab] = useState(0);

  const [modalAlerta, setModalAlerta] = useState(false);
  const [loadingRecibo, setIsLoadingRecibo] = useState(false);
  const [modalAlertaGuardar, setModalAlertaGuardar] = useState(false);

  const tabs = useMemo(() => ["Cliente", "Tipo Pago", "Recibo"], []);

  const { datos } = useReciboStore();

  const { data: documentos } = useDocumentosCabeceraObtener({
    identificacion: datos?.identificacionCliente ?? "",
  });
  const defaultValueRecibos = useMemo<IReciboEnviarDatos>(() => {
    if (documentos && documentos.length > 0) {
      const data = documentos.map<IReciboEnviar>((item) => ({
        latitud: 0,
        longitud: 0,
        doctran: item.nroDocumento,
        fechaComprobante: format(item.fecha, "dd-MM-yyyy HH:mm:ss"),
        valores: [],
        imagenes: null,
        valorMora: null,
        valorCobranza: null,
        valorCancela: null,
        observaciones: "",
        identificacionCliente: datos?.identificacionCliente ?? "",
      }));
      const datosEnviar: IReciboEnviarDatos = {
        datos: data,
      };

      return datosEnviar;
    }
    return { datos: [] };
  }, [datos?.identificacionCliente, documentos]);

  const {
    control,
    handleSubmit,
    reset,
    // formState: { errors },
    watch,
    setValue,
    getValues,
  } = useForm<IReciboEnviarDatos>({
    resolver: zodResolver(schema),
    defaultValues: defaultValueRecibos,
  });

  const { fields: datosDocumentos } = useFieldArray({
    control,
    name: "datos",
  });

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const children = useMemo(() => {
    if (tabs[tab] === "Cliente" && documentos) {
      return (
        <ReciboTabCliente
          datosDocumentos={datosDocumentos}
          control={control}
          datos={documentos}
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

  const { mutate: guardarRecibos, isPending: isLoadingReciboGuardar } =
    useRecibosGuardar();

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
          Object.keys(ob)
        );
        const objetoFiltrado1 = pick(element, clavesComunes);
        const objetoFiltrado2 = pick(ob, clavesComunes);
        const sonIguales = isEqualWith(
          objetoFiltrado1,
          objetoFiltrado2,
          handleCompararObjetos
        );
        if (!sonIguales) {
          noExiste = true;
          console.log(element.imagenes);

          if (element.imagenes?.length === 0) {
            Toast.error(
              `El recibo de la factura ${element.doctran} no tiene imagenes`
            );
            break;
          }
          const dato = find(
            documentos,
            (item) => item.nroDocumento === element.doctran
          );

          const saldoVencido = dato ? dato.saldoVencido : 0;
          const gastosCobranza = dato ? dato.gastosCobranza : 0;
          const interesMora = dato ? dato.interesMora : 0;

          if (
            (element.valorCancela ?? 0) +
              (element.valorCobranza ?? 0) +
              (element.valorMora ?? 0) >
              0 &&
            (element.valorCancela ?? 0) <= saldoVencido &&
            (element.valorCobranza ?? 0) <= gastosCobranza &&
            (element.valorMora ?? 0) <= interesMora
          ) {
            if (element.valores && element.valores?.length > 0) {
              const sumaTotal =
                (element.valorCancela ?? 0) +
                (element.valorCobranza ?? 0) +
                (element.valorMora ?? 0);
              const sumaTiposComprobantes = sumBy(element.valores, (item) =>
                Number(item.valor)
              );
              if (sumaTotal === sumaTiposComprobantes) {
                const location = await handleObtenerDireccionGps();
                const dataAux = cloneDeep(element);
                dataAux.latitud = location?.coords.latitude ?? 0;
                dataAux.longitud = location?.coords.longitude ?? 0;
                guardarRecibos(dataAux, {
                  onSuccess: () => {
                    setIsLoadingRecibo(false);
                    reset(defaultValueRecibos);
                    setTab(0);
                  },
                  onError: () => {
                    setIsLoadingRecibo(false);
                  },
                });
              } else {
                Toast.error(
                  `La suma de los valores del comprobante ${data.datos[index].doctran} son diferentes`
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
    },
    [
      defaultValueRecibos,
      documentos,
      guardarRecibos,
      handleCompararObjetos,
      handleObtenerDireccionGps,
      reset,
    ]
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
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
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
        title={`${datos?.apellidos} ${datos?.nombres}`}
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
      {(loadingRecibo || isLoadingReciboGuardar) && (
        <ModalLoading
          onClose={() => {}}
          visible={loadingRecibo || isLoadingReciboGuardar}
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
