import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  name: string;
  provider: "KAKAO" | "GOOGLE" | null;
  verifiedEmail: string;
  subscribe: boolean;
}

export const useUser = create(
  persist(
    (set) => ({
      name: "",
      provider: null,
      verifiedEmail: "",
      subscribe: false,
      setUserInfo: (user: User) => set(user),
    }),
    {
      name: "login",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
