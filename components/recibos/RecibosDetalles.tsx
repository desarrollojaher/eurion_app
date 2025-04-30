import { Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
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
import { intersection, isEqual, isEqualWith, pick, set, sumBy } from "lodash";
import ModalAlertBack from "./modal/ModalAlertBack";
import useBackButtonHandle from "@/hooks/useBackButtonHandle";

const schema = z.object({
  datos: z.array(
    z.object({
      doctran: z.string().min(1, "El número de transacción es requerido"),
      valores: z
        .array(
          z.object({
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

  const tabs = useMemo(() => ["Cliente", "Tipo Pago", "Recibo"], []);

  const { datos } = useReciboStore();

  const defaultValueRecibos = useMemo<IReciboEnviarDatos>(() => {
    if (datos && datos.documentos.length > 0) {
      const data = datos?.documentos.map<IReciboEnviar>((item) => ({
        doctran: item.doctran,
        fechaComprobante: item.fecha,
        valores: [],
        imagenes: null,
        valorMora: null,
        valorCobranza: null,
        valorCancela: null,
        observaciones: "",
      }));
      const datosEnviar: IReciboEnviarDatos = {
        datos: data,
      };

      return datosEnviar;
    }
    return { datos: [] };
  }, [datos]);

  const {
    control,
    handleSubmit,
    // formState: { errors },
    watch,
    setValue,
  } = useForm<IReciboEnviarDatos>({
    resolver: zodResolver(schema),
    defaultValues: defaultValueRecibos,
  });

  const { fields: datosDocumentos } = useFieldArray({
    control,
    name: "datos",
  });

  const children = useMemo(() => {
    if (tabs[tab] === "Cliente" && datos) {
      return (
        <ReciboTabCliente
          datosDocumentos={datosDocumentos}
          control={control}
          datos={datos}
        />
      );
    } else if (tabs[tab] === "Recibo") {
      return (
        <ReciboTabRecibo
          datosDocumentos={datosDocumentos}
          watch={watch}
          setValue={setValue}
          control={control}
        />
      );
    } else {
      return (
        <ReciboTabTipoPago
          datosDocumentos={datosDocumentos}
          watch={watch}
          control={control}
        />
      );
    }
  }, [control, datos, datosDocumentos, setValue, tab, tabs, watch]);

  const handleCompararObjetos = useCallback((valor1: any, valor2: any) => {
    if (
      (valor1 === null && isEqual(valor2, [])) ||
      (valor2 === null && isEqual(valor1, []))
    ) {
      return true;
    }
    return undefined;
  }, []);

  const onSuccess = useCallback(
    (data: IReciboEnviarDatos) => {
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
          if (
            (element.valorCancela ?? 0) +
              (element.valorCobranza ?? 0) +
              (element.valorMora ?? 0) >
            0
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
                console.log("Guardar los datos ====> ", element);
              } else {
                Toast.error(
                  `La suma de los valores del comprobante ${data.datos[index].doctran} son diferentes`
                );
              }
            } else {
              Toast.error("Ingrese tipos de comprobantes");
            }
          } else {
            Toast.error("Ingrese los valores correspondientes");
          }
        }
      }
    },
    [defaultValueRecibos, handleCompararObjetos]
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

  // esta en la escucha del boton de retroceso por eso siempre se llama al ultimo de las funciones
  useBackButtonHandle(handleTabBack);
  return (
    <View style={styles.containerGeneral}>
      <Header
        title="BYRON GODOY"
        handleTapIconRight={handleSubmit(onSuccess, onError)}
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
      <Footer items={tabs} setTab={setTab} />
      {modalAlerta && (
        <ModalAlertBack onClose={handleCloseModal} visible={modalAlerta} />
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
