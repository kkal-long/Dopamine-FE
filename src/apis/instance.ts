import axios from "axios";

import { useAuthStore } from "@/store/useAuthStore";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
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
    const originalRequest = err.config;

    if (
      (err.response?.status === 401 || err.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = useAuthStore.getState();

        if (!refreshToken) {
          throw new Error("Refresh Token이 없습니다. 다시 로그안 하세요.");
        }

        const refreshRes = await axios.post(
          `${import.meta.env.VITE_SERVER_API_URL}/token/access`,
          { refreshToken: refreshToken },
          { withCredentials: true }
        );

        const { accessToken: newAccess } = refreshRes.data;

        useAuthStore.getState().login(newAccess, refreshToken);

        originalRequest.headers["Authorization"] =
          `Bearer ${refreshRes.data.accessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        console.error(refreshError);
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
