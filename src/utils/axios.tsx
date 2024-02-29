import axios, { AxiosResponse } from "axios";

interface AxiosObject {
  post: <T>(url: string, body: any) => Promise<T>;
  patch: <T>(url: string, body: any) => Promise<T>;
  delete: <T>(url: string, body: any) => Promise<T>;
  get: <T>(url: string, params?: any) => Promise<T>;
}

const axiosObject: AxiosObject = {
  post: async function <T>(url: string, body: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(url, body);
      return response.data;
    } catch (e: any) {
      const message = e?.response?.data?.message || e?.message;
      throw new Error(message);
    }
  },

  patch: async function <T>(url: string, body: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.patch(url, body);
      return response.data;
    } catch (e: any) {
      const message = e?.response?.data?.message || e?.message;
      throw new Error(message);
    }
  },

  delete: async function <T>(url: string, body: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.delete(url, { data: body });
      return response.data;
    } catch (e: any) {
      const message = e?.response?.data?.message || e?.message;
      throw new Error(message);
    }
  },

  get: async function <T>(url: string, params?: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(url, { params });
      return response.data;
    } catch (e: any) {
      const message = e?.response?.data?.message || e?.message;
      throw new Error(message);
    }
  },
};

export default axiosObject;
