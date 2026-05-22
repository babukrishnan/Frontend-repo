import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://backend-repo-production-5c16.up.railway.app";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const imagesURL = `${BASE_URL}`;

api.interceptors.request.use(
  async (config) => {
    // SKIP TOKEN FOR AUTH APIS
    const authRoutes = ["/signup/", "/login/"];

    if (authRoutes.includes(config.url || "")) {
      return config;
    }

    const token = await AsyncStorage.getItem("access");

    console.log("AXIOS TOKEN:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // TOKEN EXPIRED
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = await AsyncStorage.getItem("refresh");

        // GET NEW ACCESS TOKEN

        const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
          refresh,
        });

        const newAccess = response.data.access;

        // SAVE NEW TOKEN

        await AsyncStorage.setItem("access", newAccess);

        // RETRY FAILED REQUEST

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (refreshError) {
        // REFRESH FAILED

        await AsyncStorage.multiRemove(["access", "refresh"]);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
