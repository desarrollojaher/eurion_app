import { Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
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
import { remove } from "lodash";
import { Toast } from "toastify-react-native";
import {
  IVerificacionesCabecera,
  IVerificacionesGuardar,
} from "@/models/IVerificaciones";
import { IDatosSelect } from "@/components/commons/select/Select";
import { format } from "date-fns";
import * as Location from "expo-location";
import { useSession } from "@/helper/provider/Auth";
import uuid from "react-native-uuid";
import { IImagenesVerificaciones } from "@/models/IImagenes";
import { useGuardarVerificaciones } from "@/service/Verificaciones/useGuardarVerificaciones";

interface PropsModalRealizarVerificacion {
  visible: boolean;
  onClose: () => void;
  cliente: IVerificacionesCabecera;
}

const ModalRealizarVerificacion: React.FC<PropsModalRealizarVerificacion> = ({
  onClose,
  visible,
  cliente,
}) => {
  const [visibleCamara, setVisibleCamara] = useState(false);
  const [calificacion, setCalificacion] = useState<IDatosSelect>();
  const [observaciones, setObservaciones] = useState<string>("");
  const [lodingGuardado, setLoadingGuardado] = useState(false);

  const { usuario } = useSession();

  const [imagenes, setImagenes] = useState<IImagenCompleta[]>([]);

  const { mutate: guardarVerificacion, isPending: isLoadingGestion } =
    useGuardarVerificaciones();

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
    [imagenes]
  );

  const handleRemoveImage = useCallback(
    (indexElemento: number) => {
      const images = remove(
        imagenes,
        (item) => item !== imagenes[indexElemento]
      );
      setImagenes(images);
    },
    [imagenes]
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

  const handleChangeSelect = useCallback((item: IDatosSelect) => {
    if (item) setCalificacion(item);
  }, []);

  const handleGuardarGestion = useCallback(async () => {
    if (imagenes.length < 3) {
      Toast.error("Debe ingresar minimo 3 imagenes");
      return;
    }

    if (!calificacion) {
      Toast.error("Seleccione la calificación");
      return;
    }
    if (observaciones.length < 5) {
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
    const uuidv4 = uuid.v4();

    const imgs = imagenes.map<IImagenesVerificaciones>((item) => ({
      id: uuid.v4(),
      idVerificacion: uuidv4,
      nombre: item.titulo,
      imagen: item.url,
    }));

    const datos: IVerificacionesGuardar = {
      calificacion: Number(calificacion?.value),
      identificacionCliente: cliente.identificacion,
      codigoTipoRuta: cliente.codigoTipoDeRuta,
      codigoTipoGestion: cliente.codigoTipoDeRuta,
      codigoDireccion: cliente.identificacion,
      fecha: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
      observaciones: observaciones,
      verificacion: Number(calificacion?.value),
      latitud: localizacion?.coords.latitude,
      longitud: localizacion?.coords.longitude,
      identificacionAgente: usuario?.identificacion ?? "",
      id: uuidv4,
      imagenes: imgs,
    };
    guardarVerificacion(datos, {
      onSuccess: () => {
        onClose();
        setLoadingGuardado(false);
      },
      onError: () => {
        setLoadingGuardado(false);
      },
    });
  }, [
    calificacion,
    cliente.codigoTipoDeRuta,
    cliente.identificacion,
    guardarVerificacion,
    handleObtenerDireccionGps,
    imagenes,
    observaciones,
    onClose,
    usuario?.identificacion,
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
        datos={[
          { label: "POSITIVA", value: "1" },
          { label: "NEGATIVA", value: "2" },
          { label: "REASIGNAR", value: "3" },
          { label: "ANULAR", value: "4" },
        ]}
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
