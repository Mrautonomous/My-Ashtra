// store/businessLoginStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginStore = create(
  persist(
    (set) => ({
      user: null,
      userData: { email: "", password: "" },
      setUser: (user) => set(() => ({ user })),
      setUserData: (data) =>
        set((state) => ({
          userData: { ...state.userData, ...data },
        })),
      resetUserData: () =>
        set({
          user: null,
          userData: { email: "", password: "" },
        }),
    }),
    {
      name: "business-Login-data",
    }
  )
);

export default useLoginStore;
