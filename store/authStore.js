import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setUser: (user) => set({ user }),
      login: ({ user, accessToken, refreshToken }) =>
        set({
          isAuthenticated: true,
          user,
          accessToken,
          refreshToken,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);

// ✅ External hydration tracking
useAuthStore.hasHydrated = false;
useAuthStore.subscribe(
  () => {
    if (!useAuthStore.hasHydrated) {
      useAuthStore.hasHydrated = true;
      useAuthStore.setState({ hasHydrated: true });
      console.log("✅ Zustand store hydrated!");
    }
  },
  // Only run this after persistence rehydrates
  (state) => state.user !== null || state.accessToken !== null
);

export default useAuthStore;
