import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { useUserStore } from "@/store/useUserStore";

type AuthStore = {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  login: (aceessToken: string, refreshToken: string) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,

      login: (access: string, refresh: string) => {
        set({ accessToken: access, refreshToken: refresh, isLoggedIn: true });
      },

      logout: () => {
        set({ accessToken: null, refreshToken: null, isLoggedIn: false });

        const { clearUser } = useUserStore.getState();
        clearUser();
      },

      setAccessToken: (token: string) => {
        set({ accessToken: token });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: state => ({
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
