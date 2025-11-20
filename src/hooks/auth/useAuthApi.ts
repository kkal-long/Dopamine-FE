import { useMutation } from "@tanstack/react-query";

import { postRefresh, putUserProfile } from "@/apis/auth/authApi";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";

export const useAuthApi = () => {
  const setAccessToken = useAuthStore(state => state.setAccessToken);
  const setUser = useUserStore(state => state.setUser);

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
    },
    onError: error => {
      console.error("프로필 설정 중 오류 발생: ", error);
    },
  });

  return {
    postRefreshMutation,
    putUserProfileMutation,
  };
};
