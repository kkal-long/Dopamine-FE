// src/apis/instance.ts
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }

  // Content-Type 없으면 JSON 기본값 유지
  if (!config.headers.get("Content-Type")) {
    config.headers.set("Content-Type", "application/json");
  }

  return config;
});

instance.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;

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

        original.headers.set(
          "Authorization",
          `Bearer ${refresh.data.accessToken}`
        );

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
