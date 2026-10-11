import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Expo includes EXPO_PUBLIC_ values in the client bundle. Never put API keys here.
export const BASE_URL = (process.env.EXPO_PUBLIC_API_URL || "").trim().replace(/\/+$/, "");
export const imagesURL = BASE_URL;

// Django returns /media/... in local development and absolute https URLs for
// images stored in Cloudinary. Resolve both without corrupting remote URLs.
export const imageUrl = (value?: string | null): string => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return BASE_URL + (value.startsWith("/") ? value : "/" + value);
};

const api = axios.create({ baseURL: BASE_URL ? `${BASE_URL}/api` : undefined, timeout: 75000 });

api.interceptors.request.use(async (config) => {
  if (!BASE_URL) {
    return Promise.reject(new Error("Set EXPO_PUBLIC_API_URL in Frontend-repo/.env and restart Expo"));
  }
  if (!["/signup/", "/login/"].includes(config.url || "")) {
    const token = await AsyncStorage.getItem("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const request = error.config;
    if (BASE_URL && error.response?.status === 401 && request && !request._retry
      && !["/signup/", "/login/", "/token/refresh/"].includes(request.url || "")) {
      request._retry = true;
      const refresh = await AsyncStorage.getItem("refresh");
      if (!refresh) return Promise.reject(error);
      try {
        const response = await axios.post(`${BASE_URL}/api/token/refresh/`, { refresh }, { timeout: 75000 });
        await AsyncStorage.setItem("access", response.data.access);
        request.headers.Authorization = `Bearer ${response.data.access}`;
        return api(request);
      } catch {
        await AsyncStorage.multiRemove(["access", "refresh"]);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
