import instance from "@/apis/instance";
import { SwipeActionRequest, SwipeActionResponse } from "@/types/auction/deck";

export const postSwipeAction = async (data: SwipeActionRequest) => {
  const res = await instance.post<SwipeActionResponse>("/swipes/action", data);
  return res.data;
};
