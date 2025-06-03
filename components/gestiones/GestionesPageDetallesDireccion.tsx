import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import Card from "../commons/card/Card";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import TextInput from "../commons/card/TextInput";
import HeaderCard from "../commons/card/HeaderCard";
import { GRIS } from "@/constants/Colors";
import * as Location from "expo-location";
import { Toast } from "toastify-react-native";
import CarouselImagenes from "../commons/carousel/CarouselImagenes";
import Camara from "../commons/camera/Camara";
import { IImagenCompleta } from "@/models/IImagenCompleta";
import { cloneDeep } from "lodash";
import z from "zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { IDireccionCelularGcobranza } from "@/models/IDireccionCelularGcobranza";
import { zodResolver } from "@hookform/resolvers/zod";
import { IGestiones } from "@/models/IGestiones";
import { useDocumentosCabeceraObtener } from "@/service/Documentos/useDocumentosCabeceraObtener";
import { useGuardarGestionesActualizacionDireccion } from "@/service/gestiones/useGuardarGestionesActualizacionDireccion";
import { format } from "date-fns";
import ModalLoading from "../commons/modal/ModalLoading";
import ModalTelefonos from "./modal/ModalTelefonos";

const schema = z.object({
  latitud: z.number({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  longitud: z.number({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  identificacionCliente: z.string({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  direccionIngresada: z.string({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  indicacionesAdicionales: z.string({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  nroDocumento: z.string({
    required_error: "Obligatorio",
    invalid_type_error: "Obligatorio",
  }),
  fecha: z
    .string({
      required_error: "Obligatorio",
      invalid_type_error: "Obligatorio",
    })
    .nullish(),
  sincronizado: z.number().nullish(),
  imagenes: z
    .array(
      z.object({
        titulo: z.string(),
        url: z.string(),
      })
    )
    .nullish(),
});

interface PropsGestionesPageDetallesDireccion {
  datos: IGestiones;
}

export type PropsGestionesPageDetallesDireccionRef = {
  handleSubmit: () => void;
};
const GestionesPageDetallesDireccion = forwardRef<
  PropsGestionesPageDetallesDireccionRef,
  PropsGestionesPageDetallesDireccion
>(({ datos }, ref) => {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDireccionCelularGcobranza>({
    resolver: zodResolver(schema),
    defaultValues: {
      latitud: datos.latitud,
      longitud: datos.longitud,
      identificacionCliente: datos.identificacionCliente,
      direccionIngresada: datos.direccion,
    },
  });

  const {
    append,
    fields: imagenes,
    remove,
  } = useFieldArray({
    control,
    name: "imagenes",
  });

  const [modalCamara, setModalCamara] = useState(false);
  const [modalTelefono, setModalTelefono] = useState(false);
  const [guardar, setGuardar] = useState(false);

  const { data: datosDocumentos } = useDocumentosCabeceraObtener({
    identificacion: datos.identificacionCliente,
  });

  const { mutate: guardarDireccion } =
    useGuardarGestionesActualizacionDireccion();

  const handleOpenCamara = useCallback(() => {
    setModalCamara(true);
  }, []);
  const handleCloseCamara = useCallback(() => {
    setModalCamara(false);
  }, []);

  const handleCaptureCamara = useCallback(
    (data: IImagenCompleta[]) => {
      append(data);
    },
    [append]
  );

  const handleRemoveImage = useCallback(
    (indexElemento: number) => {
      remove(indexElemento);
    },
    [remove]
  );

  const handleObtenerDireccionGps = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.error("El GPS no tiene permiso");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      setValue("latitud", location.coords.latitude);
      setValue("longitud", location.coords.longitude);
    }
  }, [setValue]);

  const onSucess = useCallback(
    (data: IDireccionCelularGcobranza) => {
      setGuardar(true);
      const dataAux = cloneDeep(data);
      dataAux.fecha = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      guardarDireccion(dataAux, {
        onSuccess: () => {
          reset({
            direccionIngresada: "",
            indicacionesAdicionales: "",
            latitud: datos.latitud,
            longitud: datos.longitud,
            imagenes: [],
          });
          setGuardar(false);
        },
        onError: () => {
          setGuardar(false);
        },
      });
    },
    [datos.latitud, datos.longitud, guardarDireccion, reset]
  );
  const onError = useCallback((error: any) => {
    console.log(error);
  }, []);

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit(onSucess, onError),
  }));

  const handleOpenTelefono = useCallback(() => {
    setModalTelefono(true);
  }, []);
  const handleCloseTelefono = useCallback(() => {
    setModalTelefono(false);
  }, []);

  useEffect(() => {
    if (datosDocumentos && datosDocumentos.length > 0) {
      setValue("nroDocumento", datosDocumentos[0].nroDocumento);
    }
  }, [datosDocumentos, setValue]);

  return (
    <View style={styles.containerGeneral}>
      {modalCamara && (
        <Camara
          onClose={handleCloseCamara}
          visible={modalCamara}
          handleCaptureImage={handleCaptureCamara}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={styles.cardStyle}>
          {imagenes.length > 0 ? (
            <CarouselImagenes
              data={imagenes}
              width={convertirTamanoHorizontal(350)}
              paginacion={true}
              handleRemoveImage={handleRemoveImage}
              modulo="galeria"
              remove
              camera
              handleOpenCamara={handleOpenCamara}
            />
          ) : (
            <Pressable
              onPress={handleOpenCamara}
              style={styles.containerPressable}
            >
              <Icon name="camera" size={convertirTamanoHorizontal(80)} />
            </Pressable>
          )}
        </Card>

        <Card style={styles.cardMargin}>
          <Pressable onPress={handleOpenTelefono}>
            <TextInput
              tipo="text"
              text="Telefono"
              direction="column"
              placeholder="Telefono"
              styleHeader={styles.styleTextHeader}
              defaultValueText={datos.telefono}
              readOnly
              isError={!!errors.indicacionesAdicionales}
              labelError={errors.indicacionesAdicionales?.message}
            />
          </Pressable>

          <Controller
            control={control}
            name="direccionIngresada"
            render={({ field: { value, onChange } }) => (
              <TextInput
                tipo="text"
                text="Dirección"
                direction="column"
                multiline={true}
                placeholder="Direccion"
                styleHeader={styles.styleTextHeader}
                defaultValueText={value}
                onChangeText={onChange}
                isError={!!errors.direccionIngresada}
                labelError={errors.direccionIngresada?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="indicacionesAdicionales"
            render={({ field: { value, onChange } }) => (
              <TextInput
                tipo="text"
                text="Detalles Adicionales"
                direction="column"
                multiline={true}
                placeholder="Detalles Adicionales"
                styleHeader={styles.styleTextHeader}
                defaultValueText={value}
                onChangeText={onChange}
                isError={!!errors.indicacionesAdicionales}
                labelError={errors.indicacionesAdicionales?.message}
              />
            )}
          />
        </Card>

        <Card style={styles.cardMargin}>
          <HeaderCard labelLeft="Coordinadas" />
          <Controller
            control={control}
            name="latitud"
            render={({ field: { value } }) => (
              <HeaderCard
                labelLeft="Latitud"
                labelRight={value ? String(value) : "No hay ubicacion"}
                styleLeft={styles.styleLabelLeft}
                styleRight={styles.styleLabelRigth}
              />
            )}
          />
          <Controller
            control={control}
            name="longitud"
            render={({ field: { value } }) => (
              <HeaderCard
                labelLeft="Longitud"
                labelRight={value ? String(value) : "No hay ubicacion"}
                styleLeft={styles.styleLabelLeft}
                styleRight={styles.styleLabelRigth}
              />
            )}
          />
          <View style={styles.containerBotones}>
            <TouchableOpacity
              style={styles.containerBoton}
              onPress={handleObtenerDireccionGps}
            >
              <Icon
                name="location-arrow"
                size={convertirTamanoHorizontal(35)}
              />
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
      {guardar && <ModalLoading visible={guardar} onClose={() => {}} />}
      {modalTelefono && (
        <ModalTelefonos
          onClose={handleCloseTelefono}
          visible={modalTelefono}
          cedula={datos.identificacionCliente}
        />
      )}
    </View>
  );
});

GestionesPageDetallesDireccion.displayName = "GestionesPageDetallesDireccion";

export default GestionesPageDetallesDireccion;

const styles = StyleSheet.create({
  containerGeneral: {
    flex: 1,
    alignItems: "center",
  },
  cardStyle: {
    height: convertirTamanoVertical(300),
    width: convertirTamanoHorizontal(370),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: convertirTamanoVertical(30),
  },
  cardMargin: {
    width: convertirTamanoHorizontal(370),
    marginVertical: convertirTamanoVertical(10),
    gap: convertirTamanoVertical(10),
  },
  styleTextHeader: {
    width: "100%",
    fontSize: convertirTamanoHorizontal(14),
    marginVertical: convertirTamanoVertical(5),
  },
  styleLabelLeft: {
    width: convertirTamanoHorizontal(130),
  },
  styleLabelRigth: {
    width: convertirTamanoHorizontal(240),
    color: GRIS,
    fontSize: convertirTamanoHorizontal(15),
  },
  containerBotones: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: convertirTamanoVertical(50),
  },
  containerBoton: {
    height: convertirTamanoVertical(60),
    width: convertirTamanoHorizontal(60),
    alignItems: "center",
    justifyContent: "center",
  },
  containerPressable: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
