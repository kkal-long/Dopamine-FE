import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getUserProfile,
  postRefresh,
  putUserProfile,
} from "@/apis/auth/authApi";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useAuthApi = () => {
  const queryClient = useQueryClient();
  const location = useLocation();

  const setAccessToken = useAuthStore(state => state.setAccessToken);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const setUser = useUserStore(state => state.setUser);

  const excludePaths = ["/auth/kakao/callback", "/register"];
  const skipUserProfile = excludePaths.some(path =>
    location.pathname.includes(path)
  );

  const postRefreshMutation = useMutation({
    mutationFn: postRefresh,
    onSuccess: res => {
      const { accessToken } = res;
      setAccessToken(accessToken);
    },
  });

  const putUserProfileMutation = useMutation({
    mutationFn: putUserProfile,
    onSuccess: res => {
      const { user_id, nickname, profileImageUrl } = res;

      setUser({
        userId: user_id,
        userName: nickname,
        userImage: profileImageUrl,
      });

      queryClient.setQueryData(["userProfile"], res);
    },
    onError: error => {
      console.error("프로필 설정 중 오류 발생: ", error);
    },
  });

  const getUserProfileQuery = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: isLoggedIn && !skipUserProfile,
    staleTime: 1000 * 60 * 5, // 5분
  });

  const getUserProfileMutation = useMutation({
    mutationFn: getUserProfile,
    onSuccess: res => {
      const { user_id, nickname, profileImageUrl } = res;

      setUser({
        userId: user_id,
        userName: nickname,
        userImage: profileImageUrl,
      });

      queryClient.setQueryData(["userProfile"], res);
    },
  });

  useEffect(() => {
    if (getUserProfileQuery.isSuccess && getUserProfileQuery.data) {
      const { user_id, nickname, profileImageUrl } = getUserProfileQuery.data;

      setUser({
        userId: user_id,
        userName: nickname,
        userImage: profileImageUrl,
      });
    }
  }, [getUserProfileQuery.data, getUserProfileQuery.isSuccess, setUser]);

  return {
    postRefreshMutation,
    putUserProfileMutation,
    getUserProfileMutation,
  };
};
