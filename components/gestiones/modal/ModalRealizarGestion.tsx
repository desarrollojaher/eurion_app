import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import Select, { IDatosSelect } from "@/components/commons/select/Select";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import TextInput from "@/components/commons/card/TextInput";
import ButtonCustom from "@/components/commons/button/ButtonCustom";
import { NEGRO } from "@/constants/Colors";
import { useTipoGestionObtener } from "@/service/TipoGestiones/useTipoGestionObtener";
import { cloneDeep, find, map, set } from "lodash";
import { IGestiones } from "@/models/IGestiones";
import { useDocumentosCabeceraObtener } from "@/service/Documentos/useDocumentosCabeceraObtener";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IGestionesCelularCrear } from "@/models/IGestionesCelular";
import { format } from "date-fns";
import { useGuardarGestiones } from "@/service/gestiones/useGuardarGestiones";
import { router } from "expo-router";

const schema = z.object({
  nroDocumento: z.string({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  fechaGestion: z
    .string({
      required_error: "Obligatorio",
      invalid_type_error: "Obligatorio",
    })
    .nullish(),
  observaciones: z.string({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  fechaProximaGestion: z
    .string({
      required_error: "Obligatorio",
      invalid_type_error: "Obligatorio",
    })
    .nullish(),
  codigoTipoGestion: z.string({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  identificacionCliente: z.string({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  observacionesProximaGestion: z
    .string({
      required_error: "Obligatorio",
      invalid_type_error: "Obligatorio",
    })
    .nullish(),
  codigoTipoGestionProxima: z.string({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  latitud: z.number({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  longitud: z.number({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  sincronizado: z.number({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  tipoReferencia: z.string({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
});

interface PropsModalRealizarGestion {
  visible: boolean;
  onClose: () => void;
  datos: IGestiones;
  seccion?: "cabecera" | "detalles";
}

const ModalRealizarGestion: React.FC<PropsModalRealizarGestion> = ({
  onClose,
  visible,
  datos,
  seccion = "detalles",
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IGestionesCelularCrear>({
    resolver: zodResolver(schema),
    defaultValues: {
      identificacionCliente: datos.identificacionCliente,
      sincronizado: 0,
      latitud: datos.latitud,
      longitud: datos.longitud,
    },
  });

  const tipoGestion = watch("codigoTipoGestion");

  const { data: tipoGestiones } = useTipoGestionObtener();
  const { data: datosDocumentos } = useDocumentosCabeceraObtener({
    identificacion: datos.identificacionCliente,
  });
  const { mutate: gardarGestiones, isPending: isLoadingGestiones } =
    useGuardarGestiones();

  const tipoReferencia = useMemo(() => {
    return [
      { label: "CLIENTE", value: "CLIENTE" },
      { label: "FAMILIAR", value: "FAMILIAR" },
      { label: "TIPO REFERENCIA", value: "TIPOREFERENCIA" },
    ];
  }, []);

  const tipoGestionesFiltro = useMemo(() => {
    const datos: IDatosSelect[] = [];
    map(tipoGestiones, (item) => {
      const elemento: IDatosSelect = {
        label: item.descripcion ?? "",
        value: item.codigo ?? "",
      };
      datos.push(elemento);
    });
    return datos;
  }, [tipoGestiones]);

  const documentos = useMemo(() => {
    const datos: IDatosSelect[] = [];
    map(datosDocumentos, (item) => {
      const elemento: IDatosSelect = {
        label: item.nroDocumento ?? "",
        value: item.nroDocumento ?? "",
      };
      datos.push(elemento);
    });
    return datos;
  }, [datosDocumentos]);

  const handleChanceTipoGestion = useCallback(
    (value: IDatosSelect) => {
      setValue("codigoTipoGestion", value.value);
      setValue("codigoTipoGestionProxima", value.value);
      setValue("fechaProximaGestion", null);
    },
    [setValue]
  );

  const handleChanceFactura = useCallback(
    (value: IDatosSelect) => {
      setValue("nroDocumento", value.value);
    },
    [setValue]
  );

  const onSuccess = useCallback(
    (data: IGestionesCelularCrear) => {
      let dataAux = cloneDeep(data);
      dataAux.fechaGestion = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      gardarGestiones(dataAux, {
        onSuccess: () => {
          if (seccion === "detalles") {
            router.back();
          }
          reset();
          onClose();
        },
      });
    },
    [gardarGestiones, onClose, reset, seccion]
  );
  const onError = useCallback((error: any) => {
    console.log("Error al enviar los datos:", error);
  }, []);

  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Realizar Gestión">
      <View style={styles.container}>
        <Text>Gestion</Text>
        <Select
          datos={tipoGestionesFiltro}
          styleContainer={styles.styleSelect}
          onSelect={handleChanceTipoGestion}
          isError={!!errors.codigoTipoGestion}
          labelError={errors.codigoTipoGestion?.message}
        />
      </View>

      <View style={styles.container}>
        <Text>Factura</Text>
        <Controller
          control={control}
          name="nroDocumento"
          render={({ field: { value } }) => (
            <Select
              defaultValue={find(documentos, (item) => item.value === value)}
              datos={documentos}
              styleContainer={styles.styleSelect}
              onSelect={handleChanceFactura}
              isError={!!errors.nroDocumento}
              labelError={errors.nroDocumento?.message}
            />
          )}
        />
      </View>

      <View style={styles.container}>
        <Text>Tipo referencia</Text>
        <Controller
          name="tipoReferencia"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              datos={tipoReferencia}
              styleContainer={styles.styleSelect}
              defaultValue={find(
                tipoReferencia,
                (item) => item.value === value
              )}
              onSelect={(e) => onChange(e.value)}
            />
          )}
        />
      </View>

      {find(tipoGestiones, (item) => item.codigo === tipoGestion)?.pideFecha ===
        1 && (
        <View style={styles.container}>
          <Controller
            control={control}
            name="fechaProximaGestion"
            render={({ field: { value, onChange } }) => (
              <TextInput
                text="Fecha Próximo Pago"
                tipo="date"
                defaultValueText={value ?? undefined}
                onChangeText={onChange}
                direction="column"
                placeholder="Fecha Próximo Pago"
                styleContainer={styles.containerObservaciones}
                styleHeader={styles.textHeader}
                styleTextInput={styles.styleInputDate}
              />
            )}
          />
        </View>
      )}

      {/* <View style={styles.container}>
        <TextInput
          text="Telefono"
          tipo="text"
          direction="column"
          placeholder="Telefono"
          defaultValueText={datos.telefono ?? ""}
          styleContainer={styles.containerObservaciones}
          styleHeader={styles.textHeader}
          styleTextInput={styles.styleInput}
          readOnly
        />
      </View>

      <View style={styles.container}>
        <TextInput
          text="Nuevo numero"
          tipo="text"
          direction="column"
          placeholder="Nuevo numero"
          styleContainer={styles.containerObservaciones}
          styleHeader={styles.textHeader}
          styleTextInput={styles.styleInput}
        />
      </View> */}

      <View style={styles.container}>
        <Controller
          control={control}
          name="observaciones"
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChangeText={onChange}
              text=""
              tipo="text"
              defaultValueText={value}
              direction="column"
              placeholder="Observaciones"
              multiline
              styleContainer={styles.containerObservaciones}
              styleTextInput={styles.styleInput}
              isError={!!errors.observaciones}
              labelError={errors.observaciones?.message}
            />
          )}
        />
      </View>
      <View style={styles.containerBoton}>
        <ButtonCustom
          label="Guardar"
          onPress={handleSubmit(onSuccess, onError)}
          disabled={isLoadingGestiones}
          isLoading={isLoadingGestiones}
        />
      </View>
    </ModalCustom>
  );
};

export default ModalRealizarGestion;

const styles = StyleSheet.create({
  container: {
    marginTop: convertirTamanoVertical(7),
  },
  styleSelect: {
    borderWidth: 1,
    height: convertirTamanoVertical(60),
  },
  containerObservaciones: {
    justifyContent: "flex-start",
    marginTop: convertirTamanoVertical(1),
    alignItems: "flex-start",
  },
  textHeader: {
    fontSize: convertirTamanoHorizontal(15),
    fontWeight: "400",
    width: convertirTamanoHorizontal(160),
  },
  containerBoton: {
    alignItems: "center",
    marginTop: convertirTamanoVertical(15),
  },
  styleInput: {
    borderColor: NEGRO,
    textAlignVertical: "top",
  },
  styleInputDate: {
    width: convertirTamanoHorizontal(330),
    borderColor: NEGRO,
  },
});
