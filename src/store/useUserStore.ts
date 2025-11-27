import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
  userId: number | null;
  userName: string | null;
  userImage: string | null;
  point: number;
  setUser: (user: {
    userId: number;
    userName: string;
    userImage: string;
    point: number;
  }) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      userId: null,
      userName: null,
      userImage: null,
      point: 0,

      setUser: user => {
        set(user);
      },

      clearUser: () => {
        set({ userId: null, userName: null, userImage: null, point: 0 });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
