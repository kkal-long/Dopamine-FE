import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  userId: number | null;
  userName: string | null;
  userImage: string | null;
  setUser: (user: {
    userId: number;
    userName: string;
    userImage: string;
  }) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      userId: null,
      userName: null,
      userImage: null,

      setUser: user => {
        set(user);
      },

      clearUser: () => {
        set({ userId: null, userName: null, userImage: null });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
