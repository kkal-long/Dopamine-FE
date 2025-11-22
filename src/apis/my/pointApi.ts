import instance from "@/apis/instance";
import {
  ChargePointRequest,
  ChargePointResponse,
} from "@/types/my/pointApi.type";

export const postChargePoint = async (
  data: ChargePointRequest
): Promise<ChargePointResponse> => {
  const response = await instance.post("/api/points/charge/toss", data);
  return response.data;
};
