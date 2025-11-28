import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  userId: number | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;

  login: (access: string, refresh: string) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      userId: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,

      login: (access: string, refresh: string) => {
        try {
          const payload = JSON.parse(atob(access.split(".")[1]));
          const userId = Number(payload.sub);

          set({
            userId,
            accessToken: access,
            refreshToken: refresh,
            isLoggedIn: true,
          });
        } catch (err) {
          console.error("JWT 파싱 실패:", err);
        }
      },

      logout: () => {
        set({
          userId: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        });
      },

      setAccessToken: (token: string) => {
        set({ accessToken: token });
      },
    }),

    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        userId: state.userId,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
