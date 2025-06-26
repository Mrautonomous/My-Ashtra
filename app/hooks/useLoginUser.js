"use client";

import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/registerUser";
import useAuthStore from "../store/authStore";

export const useLogin = () => {
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const { accessToken, refreshToken, user } = response.data;

      // Save to Zustand
      login({ user, accessToken, refreshToken });
    },
    onError: (error) => {
      console.error(
        "Login failed:",
        error?.response?.data?.message || error.message
      );
    },
  });
};
