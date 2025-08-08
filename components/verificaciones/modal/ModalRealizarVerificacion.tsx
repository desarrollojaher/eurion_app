import { Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import ModalCustom from "@/components/commons/modal/ModalCustom";
import Separador from "@/components/commons/separador/Separador";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  convertirTamanoHorizontal,
  convertirTamanoVertical,
} from "@/helper/function/renderizadoImagen";
import TextInput from "@/components/commons/card/TextInput";
import ButtonCustom from "@/components/commons/button/ButtonCustom";
import Camara from "@/components/commons/camera/Camara";
import { IImagenCompleta } from "@/models/IImagenCompleta";
import CarouselImagenes from "@/components/commons/carousel/CarouselImagenes";
import { find, remove } from "lodash";
import { Toast } from "toastify-react-native";
import {
  IVerificacionesCabecera,
  IVerificacionesGuardar,
} from "@/models/IVerificaciones";
import { IDatosSelect } from "@/components/commons/select/Select";
import { format } from "date-fns";
import * as Location from "expo-location";
import { useSession } from "@/helper/provider/Auth";
import { IImagenesVerificaciones } from "@/models/IImagenes";
import { useGuardarVerificaciones } from "@/service/Verificaciones/useGuardarVerificaciones";
import { router } from "expo-router";
import { useObtenerTiposVerificaciones } from "@/service/TiposVerificaciones/useObtenerTiposVerificaciones";
import * as FileSystem from "expo-file-system";

interface PropsModalRealizarVerificacion {
  visible: boolean;
  onClose: () => void;
  cliente: IVerificacionesCabecera;
  seccion: "cabecera" | "detalles";
}

const ModalRealizarVerificacion: React.FC<PropsModalRealizarVerificacion> = ({
  onClose,
  visible,
  cliente,
  seccion,
}) => {
  const [visibleCamara, setVisibleCamara] = useState(false);
  const [calificacion, setCalificacion] = useState<IDatosSelect>();
  const [observaciones, setObservaciones] = useState<string>("");
  const [lodingGuardado, setLoadingGuardado] = useState(false);

  const { usuario } = useSession();

  const [imagenes, setImagenes] = useState<IImagenCompleta[]>([]);

  const { mutate: guardarVerificacion, isPending: isLoadingGestion } =
    useGuardarVerificaciones();

  const { data: datosTipoVerificaciones } = useObtenerTiposVerificaciones();

  const datosTipo = useMemo<IDatosSelect[]>(
    () =>
      datosTipoVerificaciones &&
      datosTipoVerificaciones.map((item) => ({
        label: item.vtDescripcion ?? "",
        value: item.vtId ? item.vtId.toString() : "",
      })),
    [datosTipoVerificaciones],
  );

  const onOpenCamara = useCallback(() => {
    setVisibleCamara(true);
  }, []);

  const onCloseCamara = useCallback(() => {
    setVisibleCamara(false);
  }, []);

  const handleCaptureImage = useCallback(
    (images: IImagenCompleta[]) => {
      const union = imagenes.concat(images);
      setImagenes(union);
    },
    [imagenes],
  );

  const handleRemoveImage = useCallback(
    (indexElemento: number) => {
      const images = remove(
        imagenes,
        (item) => item !== imagenes[indexElemento],
      );
      setImagenes(images);
    },
    [imagenes],
  );

  const handleObtenerDireccionGps = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.error("El GPS no tiene permiso");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    return location;
  }, []);

  const handleChangeDireccionImagenes = useCallback(
    async (imagenes: IImagenCompleta) => {
      try {
        const info = await FileSystem.getInfoAsync(imagenes.url);
        if (info.exists) {
          const folder = `${FileSystem.documentDirectory}photos`;
          await FileSystem.makeDirectoryAsync(folder, { intermediates: true });
          const newPath = `${folder}/${imagenes.titulo}.jpg`;

          await FileSystem.moveAsync({
            from: imagenes.url,
            to: newPath,
          });
          return newPath;
        } else {
          return null;
        }
      } catch (err) {
        console.error("Error al mover la imagen:", err);
        return null;
      }
    },
    [],
  );

  const handleChangeSelect = useCallback((item: IDatosSelect) => {
    if (item) setCalificacion(item);
  }, []);

  const handleGuardarGestion = useCallback(async () => {
    if (!calificacion) {
      Toast.error("Seleccione la calificación");
      return;
    }

    if (
      imagenes.length < 3 &&
      (calificacion.value === find(datosTipo, { label: "POSITIVA" })?.value ||
        calificacion.value === find(datosTipo, { label: "NEGATIVA" })?.value)
    ) {
      Toast.error("Debe ingresar minimo 3 imagenes");
      return;
    }

    if (observaciones.trim().length < 5) {
      Toast.error("Ingrese una observacion");
      return;
    }
    setLoadingGuardado(true);

    const localizacion = await handleObtenerDireccionGps();

    if (!localizacion) {
      Toast.error("No se pudo obtener la ubicacion");
      setLoadingGuardado(false);
      return;
    }

    const imgs: IImagenesVerificaciones[] = [];

    for (const item of imagenes) {
      const imagenConvertida = await handleChangeDireccionImagenes(item);

      if (imagenConvertida !== null) {
        const registro: IImagenesVerificaciones = {
          vcId: null,
          fecha: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          vrId: 3,
          nombre: item.titulo,
          periodo: cliente.periodo,
          vcImagenBase: imagenConvertida,
        };

        imgs.push(registro);
      }
    }

    const datos: IVerificacionesGuardar = {
      clId: cliente.clienteId,
      vrId: null,
      usIdCobrador: usuario?.usuId ?? -1,
      vdId: cliente.idVerificacion,
      veComentario: observaciones,
      vrFechaVerificacion: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
      vrLatitud: localizacion.coords.latitude,
      vrLongitud: localizacion.coords.longitude,
      vrPeriodo: cliente.periodo,
      vtId: Number(calificacion.value),
      imagenes: imgs,
    };

    guardarVerificacion(datos, {
      onSuccess: () => {
        if (seccion === "detalles") {
          router.back();
        }
        onClose();
        setLoadingGuardado(false);
      },
      onError: () => {
        setLoadingGuardado(false);
      },
    });
  }, [
    calificacion,
    cliente.clienteId,
    cliente.idVerificacion,
    cliente.periodo,
    datosTipo,
    guardarVerificacion,
    handleChangeDireccionImagenes,
    handleObtenerDireccionGps,
    imagenes,
    observaciones,
    onClose,
    seccion,
    usuario?.usuId,
  ]);

  return (
    <ModalCustom
      onClose={onClose}
      visible={visible}
      titulo={`${cliente.apellidos} ${cliente.apellidos}`}
    >
      <View style={styles.container}>
        {imagenes.length > 0 ? (
          <CarouselImagenes
            data={imagenes}
            width={convertirTamanoHorizontal(330)}
            paginacion={true}
            handleRemoveImage={handleRemoveImage}
            handleOpenCamara={onOpenCamara}
            modulo="galeria"
            remove
            camera
          />
        ) : (
          <Pressable onPress={onOpenCamara} style={styles.containerPressable}>
            <Icon name="camera" size={convertirTamanoHorizontal(80)} />
          </Pressable>
        )}
      </View>
      <Separador />
      <TextInput
        text={"Calificación: "}
        tipo="select"
        placeholder="Seleccione"
        onChangeSelect={handleChangeSelect}
        datos={datosTipo}
      />
      <TextInput
        text={""}
        tipo="text"
        multiline
        direction="column"
        placeholder="Observaciones"
        styleContainer={styles.containerObservaciones}
        onChangeText={setObservaciones}
      />
      <ButtonCustom
        label="Guardar"
        style={styles.buttonStyle}
        onPress={handleGuardarGestion}
        isLoading={isLoadingGestion || lodingGuardado}
        disabled={isLoadingGestion || lodingGuardado}
      />
      {visibleCamara && (
        <Camara
          onClose={onCloseCamara}
          visible={visibleCamara}
          handleCaptureImage={handleCaptureImage}
        />
      )}
    </ModalCustom>
  );
};

export default ModalRealizarVerificacion;

const styles = StyleSheet.create({
  container: {
    height: convertirTamanoVertical(250),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  containerObservaciones: {
    justifyContent: "flex-start",
    marginTop: convertirTamanoVertical(10),
    alignItems: "flex-start",
    gap: convertirTamanoVertical(5),
  },
  buttonStyle: {
    marginTop: convertirTamanoVertical(10),
    alignSelf: "center",
  },

  containerPressable: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
