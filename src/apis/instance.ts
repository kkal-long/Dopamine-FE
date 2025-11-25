// src/apis/instance.ts
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL, // https://mmuuttssaa.shop
  withCredentials: true,
});

// 요청 인터셉터
instance.interceptors.request.use(config => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터
instance.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;

    // 🔥 여기 수정됨!!! (반드시 이 버전 사용)
    if (
      (err.response?.status === 401 || err.response?.status === 403) &&
      !original._retry
    ) {
      original._retry = true;

      const { refreshToken, login, logout } = useAuthStore.getState();

      if (!refreshToken) {
        logout();
        window.location.href = "/login";
        return;
      }

      try {
        const refresh = await axios.post(
          `${import.meta.env.VITE_SERVER_API_URL}/token/access`,
          { refreshToken },
          { withCredentials: true }
        );

        login(refresh.data.accessToken, refreshToken);

        original.headers["Authorization"] =
          `Bearer ${refresh.data.accessToken}`;

        return instance(original);
      } catch {
        logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
