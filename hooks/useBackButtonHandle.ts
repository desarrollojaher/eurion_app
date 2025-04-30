import { useEffect } from "react";
import { BackHandler } from "react-native";

const useBackButtonHandle = (funcion: any) => {
  useEffect(() => {
    const backAction = () => {
      if (funcion) {
        funcion();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [funcion]);
};

export default useBackButtonHandle;
