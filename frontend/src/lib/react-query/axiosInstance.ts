// =====================================================
// axiosInstance.ts
// =====================================================

import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_BASE = "http://localhost:8000";

// Custom event for logout redirect
export const AUTH_FAILURE_EVENT = "auth:failure";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

/* -----------------------------------------------------
   Add Access Token to Every Request
----------------------------------------------------- */
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const access = localStorage.getItem("access");
  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

/* -----------------------------------------------------
   Refresh Token Logic
----------------------------------------------------- */
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalReq: any = error.config;

    // Only handle 401 errors
    if (error.response?.status === 401 && !originalReq._retry) {
      if (isRefreshing) {
        // Queue failed requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalReq.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalReq);
        });
      }

      originalReq._retry = true;
      isRefreshing = true;

      try {
        const refresh = localStorage.getItem("refresh");
        if (!refresh) throw new Error("No refresh token available");

        // Refresh access token
        const response = await axios.post(`${API_BASE}/account/api/token/refresh/`, {
          refresh: refresh,
        });

        const newAccess = response.data.access;
        localStorage.setItem("access", newAccess);

        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccess}`;

        processQueue(null, newAccess);
        return axiosInstance(originalReq);
      } catch (refreshErr) {
        processQueue(refreshErr, null);

        // Remove tokens and notify React app
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.dispatchEvent(new Event(AUTH_FAILURE_EVENT));

        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
