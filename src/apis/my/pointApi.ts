import instance from "@/apis/instance";
import {
  ChargePointRequest,
  ChargePointResponse,
  PointHistoryResponse,
} from "@/types/my/pointApi.type";

export const postChargePoint = async (
  data: ChargePointRequest
): Promise<ChargePointResponse> => {
  const response = await instance.post("/api/points/charge/toss", data);
  return response.data;
};

export const getPointHisotry = async (): Promise<PointHistoryResponse> => {
  const response = await instance.get("/api/points/history");
  return response.data;
};
