import { IAws, IGenerarPresignalResponse } from "@/models/IAws";
import { post } from "./config";

export const awsApi = {
  generarPresignal: async (data: IAws) => {
    const res = await post<IGenerarPresignalResponse>(
      "aws-service/presigned-url",
      data,
    );
    return res.data;
  },
};
