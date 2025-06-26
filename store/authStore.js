// store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      hasHydrated: false,
      setAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state.hasHydrated = true;
      },
    }
  )
);

export default useAuthStore;
