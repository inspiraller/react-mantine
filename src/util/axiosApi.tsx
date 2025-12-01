import { env } from '@/const/env';
import { useUserState } from '@/store/zustand/auth/auth';

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const VITE_API_PROXY = env.VITE_API_PROXY;
export const axiosApi = axios.create({
  baseURL: VITE_API_PROXY,
});

// unwrap data.data automatically
axiosApi.interceptors.response.use(
  (response: AxiosResponse) => {
    const raw = response.data;
    // if `data` exists, return it
    if (raw && typeof raw === 'object' && 'data' in raw) {
      return (raw as any).data;
    }
    return raw;
  },
  (error) => Promise.reject(error),
);

// augment typings so TS knows axiosApi.request returns the payload
declare module 'axios' {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
  }
}

// auth handle cookie
// -----------------------------

interface AxiosSetupOptions {
  onLogout: () => void;
  maxRetries?: number;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const createAxiosAuthInstance = ({
  onLogout,
  maxRetries = 1,
}: AxiosSetupOptions) => {
  const axiosInstance = axios.create({
    baseURL: VITE_API_PROXY,
    withCredentials: true,
  });

  let isRefreshing = false;
  let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (err: any) => void;
  }> = [];

  const processQueue = (error: AxiosError | null = null) => {
    failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve()));
    failedQueue = [];
  };

  axiosInstance.interceptors.response.use(
    // (response: AxiosResponse) => response,
    (response: AxiosResponse) => {
      // unwraps data.data just like above method
      const raw = response.data;
      if (raw && typeof raw === 'object' && 'data' in raw) {
        return (raw as any).data;
      }
      return raw;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (!originalRequest) return Promise.reject(error);

      // Only handle 401
      if (error.response?.status !== 401) return Promise.reject(error);

      // Prevent infinite loop on refresh endpoint
      if (originalRequest.url?.includes('/auth/refresh')) {
        onLogout();
        return Promise.reject(error);
      }

      // Prevent retrying the same request multiple times
      if (originalRequest._retry) {
        onLogout();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // Queue requests if refresh is in progress
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      // Start token refresh
      isRefreshing = true;

      try {
        await axiosInstance.post(
          '/auth/refresh',
          {},
          { withCredentials: true },
        );

        // Give browser a tiny moment to set HttpOnly cookie
        await new Promise((resolve) => setTimeout(resolve, 40));

        isRefreshing = false;
        processQueue();

        // ----------------------------------------------------------------------------------------------------------
        // Retry original request
        // console.log('originalReques =', {
        //   method: originalRequest.method,
        //   data: originalRequest.data,
        // });
        return axiosInstance({
          ...originalRequest,
          method: originalRequest.method || 'get',
          data: originalRequest.data || undefined,
        });
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError as AxiosError);
        onLogout();
        return Promise.reject(refreshError);
      }
    },
  );

  return axiosInstance;
};

// Authenticated API instance
export const axiosAuthApi = createAxiosAuthInstance({
  onLogout: () => {
    useUserState.getState().clearUser();
  },
});
