import { authApi } from "@/api/auth";
import { IAuth, IAuthResponse } from "@/models/IAuth";
import { AxiosError } from "axios";
import { Toast } from "toastify-react-native";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useIniciarSesion = (
  mutationOptions?: UseMutationOptions<
    IAuthResponse,
    AxiosError,
    IAuth,
    unknown
  >
) => {
  return useMutation({
    mutationFn: authApi.login,
    onError: (error: any) => {
      if (error.message === "Network Error") {
        Toast.error(
          "Error de conexión. Por favor, verifica tu conexión a internet."
        );
        return;
      }

      Toast.error(error.response.data.message);
    },
    ...mutationOptions,
  });
};
