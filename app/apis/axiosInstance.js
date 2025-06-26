import useAuthStore from "../../store/authStore";
import axios from "axios";

const api = axios.create({
  baseURL: "https://gateway.ashtra.ai",
});

// 🔐 Auto attach Bearer token
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default api;
