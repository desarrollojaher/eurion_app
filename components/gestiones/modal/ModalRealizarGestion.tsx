import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import Select, { IDatosSelect } from "@/components/commons/select/Select";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import TextInput from "@/components/commons/card/TextInput";
import ButtonCustom from "@/components/commons/button/ButtonCustom";
import { NEGRO } from "@/constants/Colors";
import { cloneDeep, find } from "lodash";
import { IGestionesCabecera, IGestionesRealizas } from "@/models/IGestiones";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTipoGestionesCabeceraObtener } from "@/service/TipoGestiones/useTipoGestionesCabeceraObtener";
import { ITipoGestion, ITipoGestionDetalle } from "@/models/ITiposGestiones";
import { useTipoGestionesDetalleObtener } from "@/service/TipoGestiones/useTipoGestionesDetalleObtener";
import { useTiposReferenciaObtener } from "@/service/TiposReferencia/useTiposReferenciaObtener";
import { useComprobantesObtener } from "@/service/Comprobantes/useComprobantesObtener";
import { Toast } from "toastify-react-native";
import { getUbicacion } from "@/helper/function/ubicacion";
import { useSession } from "@/helper/provider/Auth";
import { useGuardarGestion } from "@/service/Gestiones/useGuardarGestion";
import { router } from "expo-router";
import { format } from "date-fns";
import { useTelefonoObtener } from "@/service/Telefono/useTelefonoObtener";
import { useDireccionObtener } from "@/service/Direccion/useDireccionObtener";

const schema = z.object({
  gcIdCc: z.number({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  gdId: z.number({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  crLatitud: z.number().nullish(),
  crLongitud: z.number().nullish(),
  crObservaciones: z
    .string({
      required_error: "Obligatorio",
      invalid_type_error: "Obligatorio",
    })
    .min(1, "La observación es requerida"),
  usIdGestiona: z.number().nullish(),
  clId: z.number({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  agId: z.number().nullish(),
  cpFechaCompromiso: z.string().nullish(),
  hrId: z.number().nullish(),
  cpObservaciones: z.string().nullish(),
  crFechaProxGestion: z.string().nullish(),
  trId: z.number({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  crFechaGestionada: z.string().nullish(),
  diId: z.number().nullish(),
  teId: z.number().nullish(),
});

interface PropsModalRealizarGestion {
  visible: boolean;
  onClose: () => void;
  datos: IGestionesCabecera;
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
  } = useForm<IGestionesRealizas>({
    resolver: zodResolver(schema),
    defaultValues: {
      crLatitud: null,
      crLongitud: null,
      clId: datos.cliId,
      hrId: datos.idHojaRuta,
    },
  });

  const [seleccionCabecera, setSeleccionCabecera] = useState<ITipoGestion>();
  const [seleccionDetalle, setSeleccionDetalle] =
    useState<ITipoGestionDetalle>();

  const [guardandoGestion, setGuardandoGestion] = useState(false);

  const { data: dataTiposGestionesCabecera } = useTipoGestionesCabeceraObtener({
    tcId: datos.tcId ?? 1,
  });

  const { data: dataTiposGestionesDetalles } = useTipoGestionesDetalleObtener(
    {
      gcId: seleccionCabecera?.gcId ?? 0,
    },
    { enabled: seleccionCabecera?.gcId !== undefined },
  );

  const { data: dataTiposReferencias } = useTiposReferenciaObtener();

  const { data: dataComprobantes } = useComprobantesObtener(
    { clId: datos.cliId },
    { enabled: datos.cliId !== undefined },
  );

  const { data: dataTelefonos } = useTelefonoObtener(
    {
      peId: datos.peId ?? -1,
    },
    { enabled: datos.peId !== undefined },
  );

  const { data: dataDirecciones } = useDireccionObtener(
    {
      peId: datos.peId ?? -1,
    },
    { enabled: datos.peId !== undefined },
  );

  const { mutate: guardarGestion, isPending: isLoadingGuardarGestion } =
    useGuardarGestion();

  const { usuario } = useSession();

  const telefonos = useMemo(() => {
    return dataTelefonos
      ? dataTelefonos?.map((item) => {
          return {
            label: item.teTelefono ?? "",
            value: item.teId?.toString() ?? "",
          };
        })
      : [];
  }, [dataTelefonos]);
  const direccion = useMemo(() => {
    return dataDirecciones
      ? dataDirecciones?.map((item) => {
          return {
            label: item.diDireccion ?? "",
            value: item.diId?.toString() ?? "",
          };
        })
      : [];
  }, [dataDirecciones]);

  const tiposReferencias = useMemo(() => {
    return dataTiposReferencias
      ? dataTiposReferencias?.map((item) => {
          return {
            label: item.trReferencia ?? "",
            value: item.trId?.toString() ?? "",
          };
        })
      : [];
  }, [dataTiposReferencias]);

  const tipoGestionCabecera = useMemo(() => {
    return dataTiposGestionesCabecera
      ? dataTiposGestionesCabecera?.map((item) => {
          return {
            label: item.gcDescripcion ?? "",
            value: item.gcId?.toString() ?? "",
          };
        })
      : [];
  }, [dataTiposGestionesCabecera]);

  const tipoGestionDetalle = useMemo(() => {
    return dataTiposGestionesDetalles
      ? dataTiposGestionesDetalles?.map((item) => {
          return {
            label: item.gdDescripcion ?? "",
            value: item.gdId?.toString() ?? "",
          };
        })
      : [];
  }, [dataTiposGestionesDetalles]);

  // const comprobantes = useMemo(() => {
  //   return dataComprobantes
  //     ? dataComprobantes?.map((item) => {
  //         return {
  //           label: `${item.tipoComprobante} ${item.idCredito}`,
  //           value: item.idCredito?.toString() ?? "",
  //         };
  //       })
  //     : [];
  // }, [dataComprobantes]);

  const handleChanceTipoGestion = useCallback(
    (value: IDatosSelect) => {
      const gestion = find(dataTiposGestionesCabecera, (item) => {
        return item.gcId === Number(value.value);
      });
      setValue("gcIdCc", Number(value.value));
      // setValue("gdId", -1);
      if (gestion) {
        setSeleccionCabecera(gestion);
      }
    },
    [dataTiposGestionesCabecera, setValue],
  );

  const handleChanceTipoGestionDetalle = useCallback(
    (value: IDatosSelect) => {
      const gestion = find(dataTiposGestionesDetalles, (item) => {
        return item.gdId === Number(value.value);
      });
      setValue("gdId", Number(value.value));
      if (gestion) {
        setSeleccionDetalle(gestion);
      }
    },
    [dataTiposGestionesDetalles, setValue],
  );

  const handleChanceTipoReferencia = useCallback(
    (value: IDatosSelect) => {
      setValue("trId", Number(value.value));
    },
    [setValue],
  );

  const handleChanceDireccion = useCallback(
    (value: IDatosSelect) => {
      setValue("diId", Number(value.value));
    },
    [setValue],
  );

  const handleChanceTelefono = useCallback(
    (value: IDatosSelect) => {
      setValue("teId", Number(value.value));
    },
    [setValue],
  );

  // const handleChanceFactura = useCallback(
  //   (value: IDatosSelect) => {
  //     const fac = find(dataComprobantes, (item) => {
  //       return item.idCredito === Number(value.value);
  //     });
  //     setValue("crIdCredito", Number(value.value));
  //     if (fac && fac?.gcId && fac?.caId) {
  //       setValue("gcId", fac?.gcId);
  //       setValue("caId", fac?.caId);
  //       setValue("agId", fac?.idAgencia);
  //       setValue("hdId", fac?.idHojaDetalle);
  //     }
  //   },
  //   [dataComprobantes, setValue],
  // );

  const onSuccess = useCallback(
    async (data: IGestionesRealizas) => {
      setGuardandoGestion(true);
      let dataAux = cloneDeep(data);

      const localizacion = await getUbicacion();

      const tipoGestion = find(dataTiposGestionesDetalles, (item) => {
        return item.gdId === dataAux.gdId;
      });

      if (!tipoGestion) {
        Toast.error("No existe el tipo gestion");
        setGuardandoGestion(false);
        return;
      }

      if (tipoGestion.gfCompromisoPago === "S") {
        dataAux.cpObservaciones = data.crObservaciones;
        dataAux.crObservaciones = "";
        if (!dataAux.cpFechaCompromiso) {
          Toast.error("Seleccione una fecha de compromiso");
          setGuardandoGestion(false);
          return;
        }
        if (!dataAux.diId || dataAux.diId < 0) {
          Toast.error("Seleccione una dirección de cobro");
          setGuardandoGestion(false);
          return;
        }
        if (!dataAux.teId || dataAux.teId < 0) {
          Toast.error("Seleccione un telefono de cobro");
          setGuardandoGestion(false);
          return;
        }
      } else {
        dataAux.cpFechaCompromiso = null;
      }

      if (!localizacion) {
        Toast.error("El GPS no tiene permiso");
        setGuardandoGestion(false);
        return;
      }

      dataAux.crLatitud = localizacion.coords.latitude;
      dataAux.crLongitud = localizacion.coords.longitude;
      dataAux.usIdGestiona = usuario?.usuId ?? -1;
      dataAux.agId =
        (dataComprobantes && dataComprobantes[0].idAgencia) ?? undefined;

      dataAux.crFechaGestionada = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      setGuardandoGestion(false);
      guardarGestion(dataAux, {
        onSuccess: () => {
          if (seccion === "detalles") {
            router.back();
          }
          reset();
          onClose();
        },
      });
    },
    [
      dataComprobantes,
      dataTiposGestionesDetalles,
      guardarGestion,
      onClose,
      reset,
      seccion,
      usuario?.usuId,
    ],
  );
  const onError = useCallback((error: any) => {
    console.log("Error al enviar los datos:", error);
  }, []);

  return (
    <ModalCustom onClose={onClose} visible={visible} titulo="Realizar Gestión">
      <View style={styles.container}>
        <Text>Tipo Gestion</Text>
        <Controller
          control={control}
          name="gcIdCc"
          render={({ field: { value } }) => (
            <Select
              datos={tipoGestionCabecera}
              styleContainer={styles.styleSelect}
              defaultValue={find(tipoGestionCabecera, (item) => {
                return Number(item.value) === value;
              })}
              onSelect={handleChanceTipoGestion}
              isError={!!errors.gcIdCc}
              labelError={errors.gcIdCc?.message}
            />
          )}
        />
      </View>
      <View style={styles.container}>
        <Text>Tipo Gestion Detalle</Text>
        <Controller
          control={control}
          name="gdId"
          render={({ field: { value } }) => (
            <Select
              datos={tipoGestionDetalle}
              styleContainer={styles.styleSelect}
              defaultValue={find(tipoGestionDetalle, (item) => {
                return Number(item.value) === value;
              })}
              onSelect={handleChanceTipoGestionDetalle}
              isError={!!errors.gdId}
              labelError={errors.gdId?.message}
            />
          )}
        />
      </View>
      {seleccionDetalle && seleccionDetalle.gfCompromisoPago === "S" && (
        <View style={styles.container}>
          <Controller
            control={control}
            name="cpFechaCompromiso"
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

      {seleccionDetalle && seleccionDetalle.gfCompromisoPago === "S" && (
        <View style={styles.container}>
          <Text>Dirección de cobro</Text>
          <Controller
            control={control}
            name="diId"
            render={({ field: { value, onChange } }) => (
              <Select
                datos={direccion}
                styleContainer={styles.styleSelect}
                defaultValue={find(direccion, (item) => {
                  return Number(item.value) === value;
                })}
                onSelect={handleChanceDireccion}
                isError={!!errors.diId}
                labelError={errors.diId?.message}
              />
            )}
          />
        </View>
      )}

      {seleccionDetalle && seleccionDetalle.gfCompromisoPago === "S" && (
        <View style={styles.container}>
          <Text>Telefono de cobro</Text>
          <Controller
            control={control}
            name="teId"
            render={({ field: { value, onChange } }) => (
              <Select
                datos={telefonos}
                styleContainer={styles.styleSelect}
                defaultValue={find(telefonos, (item) => {
                  return Number(item.value) === value;
                })}
                onSelect={handleChanceTelefono}
                isError={!!errors.teId}
                labelError={errors.teId?.message}
              />
            )}
          />
        </View>
      )}

      <View style={styles.container}>
        <Text>Tipo Referencia</Text>
        <Controller
          control={control}
          name="trId"
          render={({ field: { value } }) => (
            <Select
              datos={tiposReferencias}
              styleContainer={styles.styleSelect}
              defaultValue={find(tiposReferencias, (item) => {
                return Number(item.value) === value;
              })}
              onSelect={handleChanceTipoReferencia}
              isError={!!errors.trId}
              labelError={errors.trId?.message}
            />
          )}
        />
      </View>
      {/* <View style={styles.container}>
        <Text>Factura</Text>
        <Controller
          control={control}
          name="crIdCredito"
          render={({ field: { value } }) => (
            <Select
              datos={comprobantes}
              styleContainer={styles.styleSelect}
              onSelect={handleChanceFactura}
              defaultValue={find(comprobantes, (item) => {
                return Number(item.value) === value;
              })}
              isError={!!errors.crIdCredito}
              labelError={errors.crIdCredito?.message}
            />
          )}
        />
      </View> */}

      <View style={styles.container}>
        <Controller
          control={control}
          name="crObservaciones"
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChangeText={onChange}
              text=""
              tipo="text"
              defaultValueText={value ?? ""}
              direction="column"
              placeholder="Observaciones"
              multiline
              styleContainer={styles.containerObservaciones}
              styleTextInput={styles.styleInput}
              isError={!!errors.crObservaciones}
              labelError={errors.crObservaciones?.message}
            />
          )}
        />
      </View>
      <View style={styles.containerBoton}>
        <ButtonCustom
          label="Guardar"
          onPress={handleSubmit(onSuccess, onError)}
          disabled={guardandoGestion || isLoadingGuardarGestion}
          isLoading={guardandoGestion || isLoadingGuardarGestion}
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
