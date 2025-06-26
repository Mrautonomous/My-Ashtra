//app/api's/registerUser.js
import api from "../apis/axiosInstance";

import axios from "axios";
export const registerUser = async (userData) => {
  const response = await axios.post(
    "https://gateway.ashtra.ai/auth/business/signup",
    userData
  );
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/business/signin", userData);
  return response.data;
};
