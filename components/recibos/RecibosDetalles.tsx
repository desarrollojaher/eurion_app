import { StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";
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

const schema = z.object({
  datos: z.array(
    z.object({
      doctran: z.string().min(1, "El número de transacción es requerido"),
      valores: z.array(
        z.object({
          tipoPago: z.string().min(1, "El tipo de pago es requerido"),
          numeroDocumento: z.string().optional(),
          fechaVencimiento: z.string().optional(),
          emisor: z.string().optional(),
          numeroCuenta: z.string().optional(),
          propieario: z.string().optional(),
          numeroCheque: z.string().optional(),
          valor: z.string().min(1, "El valor debe ser mayor a cero"),
        })
      ),
      valorMora: z.number().min(0, "El valor de mora no puede ser negativo"),
      valorCobranza: z
        .number()
        .min(0, "El valor de cobranza no puede ser negativo"),
      valorCancela: z
        .number()
        .min(0, "El valor a cancelar no puede ser negativo"),
      observaciones: z.string().optional(),
      imagenes: z
        .array(
          z.object({
            url: z.string(),
            titulo: z.string(),
          })
        )
        .optional(),
    })
  ),
});

const RecibosDetalles = () => {
  const [tab, setTab] = useState(0);
  const tabs = useMemo(() => ["Cliente", "Tipo Pago", "Recibo"], []);

  const { datos } = useReciboStore();

  const defaultValueRecibos = useMemo<IReciboEnviarDatos>(() => {
    if (datos && datos.documentos.length > 0) {
      const data = datos?.documentos.map<IReciboEnviar>((item) => ({
        doctran: item.doctran,
        fechaComprobante: item.fecha,
        valores: [
          {
            tipoPago: "",
            numeroDocumento: "",
            fechaVencimiento: "",
            emisor: "",
            numeroCuenta: "",
            propieario: "",
            numeroCheque: "",
          },
        ],
        imagenes: [],
        valorMora: 0,
        valorCobranza: 0,
        valorCancela: 0,
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
    formState: { errors },
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
    if (tabs[tab] === "Cliente") {
      return (
        <ReciboTabCliente datosDocumentos={datosDocumentos} control={control} />
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
  }, [control, datosDocumentos, setValue, tab, tabs, watch]);

  return (
    <View style={styles.containerGeneral}>
      <Header
        title="BYRON GODOY"
        iconRight={
          <Icon
            name="save"
            size={convertirTamanoHorizontal(30)}
            color={BLANCO}
          />
        }
      />
      <View style={styles.containerBody}>{children}</View>
      <Footer items={tabs} setTab={setTab} />
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
