import {
  PostRefreshRequest,
  PostRefreshResponse,
  PutUserProfileRequset,
  PutUserProfileResponse,
} from "@/types/login/loginApi.type";

import instance from "@/apis/instance";

export const postRefresh = async (
  data: PostRefreshRequest
): Promise<PostRefreshResponse> => {
  const response = await instance.post("/token/access", data);
  return response.data;
};

export const putUserProfile = async (
  data: PutUserProfileRequset
): Promise<PutUserProfileResponse> => {
  const response = await instance.put("/user/profile", data);
  return response.data;
};
