import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../apis/registerUser";
import { loginUser } from "../apis/registerUser";

export const useRegisterUser = () => {
  return useMutation({ mutationFn: registerUser });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
