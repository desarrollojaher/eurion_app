import { useState } from "react";
import { sincronizacionApi } from "@/api/sincronizacion";
import { dbSqliteService } from "../db/db";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { sincronizacionKeys } from "./sincronizacionKey";

export const useSincronizacion = () => {
  const [index, setIndex] = useState(1);
  const [tabla, setTabla] = useState("");
  const [loading, setLoading] = useState(false);
  const [cantidadDatos, setCantidadDatos] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sincronizado, setSincronizado] = useState(false);

  const queryClient = useQueryClient();

  const onCloseError = () => {
    setError(false);
  };

  const onCloseSincronizado = () => {
    setSincronizado(false);
  };

  const sincronizar = async () => {
    try {
      setLoading(true);
      // sincroniza las verificaciones
      setIndex(1);
      setTabla("Verificaciones");
      const datos = await sincronizacionApi.verificaciones();
      setCantidadDatos(datos.length);
      await dbSqliteService.deleteVerificaciones();
      await dbSqliteService.insertarVerificaciones(datos);

      // sincroniza clientes
      setIndex(2);
      setTabla("Clientes");
      const clientes = await sincronizacionApi.clientes();
      setCantidadDatos(clientes.length);
      await dbSqliteService.deleteClientes();
      await dbSqliteService.insertarClientes(clientes);

      // sincronizar conyugue
      setIndex(3);
      setTabla("ClienteConyugue");
      const conyugue = await sincronizacionApi.conyugue();
      setCantidadDatos(conyugue.length);
      await dbSqliteService.deleteConyuge();
      await dbSqliteService.insertarConyugue(conyugue);

      // sincronizar direcciones

      setIndex(4);
      setTabla("Direcciones");
      const direcciones = await sincronizacionApi.direcciones();
      setCantidadDatos(direcciones.length);
      await dbSqliteService.deleteDirecciones();
      await dbSqliteService.insertarDirecciones(direcciones);

      // sincronizar zona
      setIndex(5);
      setTabla("Zona");
      const zona = await sincronizacionApi.zona();
      setCantidadDatos(zona.length);
      await dbSqliteService.deleteZona();
      await dbSqliteService.insertarZona(zona);

      //sincronizar imagenes
      // setIndex(6);
      // setTabla("Imagenes clientes");
      // await dbSqliteService.deleteImagenesClientes();
      // let siguiente = true;
      // let i = 0;
      // do {
      //   const imagenes = await sincronizacionApi.imagenCliente({
      //     itemPagina: 30,
      //     paginaActual: i,
      //   });

      //   setCantidadDatos(imagenes.totalPaginas * 30);

      //   if (imagenes.datos.length > 0) {
      //     await dbSqliteService.insertarImagenCliente(imagenes.datos);
      //   }
      //   if (imagenes.paginaSiguiente) {
      //     i = imagenes.paginaSiguiente;
      //   } else {
      //     siguiente = false;
      //   }
      // } while (siguiente);

      // siguiente = true;
      // i = 0;
      // do {
      //   const imagenes = await sincronizacionApi.imagenClienteGcobranza({
      //     itemPagina: 30,
      //     paginaActual: i,
      //   });

      //   setCantidadDatos(imagenes.totalPaginas * 30);

      //   if (imagenes.datos.length > 0) {
      //     await dbSqliteService.insertarImagenCliente(imagenes.datos);
      //   }
      //   if (imagenes.paginaSiguiente) {
      //     i = imagenes.paginaSiguiente;
      //   } else {
      //     siguiente = false;
      //   }
      // } while (siguiente);

      // //sincronizacion de mapa domicilio
      // setIndex(7);
      // setTabla("Imagenes domicilio");
      // await dbSqliteService.deleteImagenesDomicilio();
      // siguiente = true;
      // i = 0;
      // do {
      //   const imagenes = await sincronizacionApi.imagenDomicilio({
      //     itemPagina: 30,
      //     paginaActual: i,
      //   });

      //   setCantidadDatos(imagenes.totalPaginas * 30);

      //   if (imagenes.datos.length > 0) {
      //     await dbSqliteService.insertarImagenDomicilio(imagenes.datos);
      //   }
      //   if (imagenes.paginaSiguiente) {
      //     i = imagenes.paginaSiguiente;
      //   } else {
      //     siguiente = false;
      //   }
      // } while (siguiente);

      // siguiente = true;
      // i = 0;
      // do {
      //   const imagenes = await sincronizacionApi.imagenDomicilioGcobranza({
      //     itemPagina: 30,
      //     paginaActual: i,
      //   });

      //   setCantidadDatos(imagenes.totalPaginas * 30);

      //   if (imagenes.datos.length > 0) {
      //     await dbSqliteService.insertarImagenDomicilio(imagenes.datos);
      //   }
      //   if (imagenes.paginaSiguiente) {
      //     i = imagenes.paginaSiguiente;
      //   } else {
      //     siguiente = false;
      //   }
      // } while (siguiente);

      // sincronizar Documentos
      setIndex(8);
      setTabla("documentos cobranza");
      const documentos = await sincronizacionApi.documentos();
      setCantidadDatos(documentos.length);
      await dbSqliteService.deleteDocumentos();
      await dbSqliteService.insertarDocumentos(documentos);

      // sincronizar gestiones

      setIndex(9);
      setTabla("Gestiones cobranza");
      const gcobanza = await sincronizacionApi.enviarGcobranza();
      setCantidadDatos(gcobanza.length);
      await dbSqliteService.deleteGcobranza();
      await dbSqliteService.insertarGCobranza(gcobanza);

      // sincronizar tipoGestiones

      setIndex(10);
      setTabla("Tipos gestiones");
      const tipoGestiones = await sincronizacionApi.tipoGestiones();
      setCantidadDatos(tipoGestiones.length);
      await dbSqliteService.deleteTipoGestiones();
      await dbSqliteService.insertarTipoGestiones(tipoGestiones);

      // sincronizar tipoGestiones
      setIndex(11);
      setTabla("gestiones celular");
      const gestionesCelular = await sincronizacionApi.gestionesCelular();
      setCantidadDatos(gestionesCelular.length);
      await dbSqliteService.deleteGestionesCelular();
      await dbSqliteService.insertarGestionesCelular(gestionesCelular);

      // sincronizar cliente garante
      setIndex(12);
      setTabla("Cliente garante");
      const clienteGarante = await sincronizacionApi.clienteGarante();
      setCantidadDatos(clienteGarante.length);
      await dbSqliteService.deleteClientesGarante();
      await dbSqliteService.insertarClienteGarante(clienteGarante);

      // sincronizar detalle facturas
      setIndex(13);
      setTabla("detalle facturas");
      const detalleFactura = await sincronizacionApi.detalleFacturas();
      setCantidadDatos(detalleFactura.length);
      await dbSqliteService.deleteDetalleFactura();
      await dbSqliteService.insertarDetalleFactura(detalleFactura);

      // sincronizar formas pago
      setIndex(14);
      setTabla("formas de pago");
      const formaPago = await sincronizacionApi.formasPago();
      setCantidadDatos(formaPago.length);
      await dbSqliteService.deleteFormaPago();
      await dbSqliteService.insertarFormaPago(formaPago);

      // sincronizar tarjeta credito
      setIndex(15);
      setTabla("tarjeta credito");
      const tarjetaCredito = await sincronizacionApi.tarjetaCredito();
      setCantidadDatos(tarjetaCredito.length);
      await dbSqliteService.deleteTarjetaCredito();
      await dbSqliteService.insertarTarjetaCredito(tarjetaCredito);

      // sincronizar tarjeta credito
      setIndex(16);
      setTabla("tarjeta credito");
      const bancos = await sincronizacionApi.bancos();
      setCantidadDatos(bancos.length);
      await dbSqliteService.deleteBancos();
      await dbSqliteService.insertarBanco(bancos);

      await dbSqliteService.insertarBitacoraSincronizacion({
        fecha: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      });

      queryClient.invalidateQueries({ queryKey: sincronizacionKeys.fechas() });

      setLoading(false);
      setSincronizado(true);
    } catch (error: any) {
      if (error.message === "Network Error") {
        setErrorMessage("No se pudo conectar con el servidor");
      } else {
        setErrorMessage(JSON.stringify(error));
      }
      setError(true);
      setLoading(false);
      console.log("Error en la sincoizacion", JSON.stringify(error));
    }
  };

  return {
    index,
    tabla,
    loading,
    sincronizar,
    cantidadDatos,
    error,
    errorMessage,
    onCloseError,
    sincronizado,
    onCloseSincronizado,
  };
};
