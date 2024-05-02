import axios from "axios";

const axiosObject = {
  post: async function (url, body) {
    try {
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
      return response.data;
    } catch (e) {
      const message = e?.response?.data?.message || e?.message;
      throw new Error(message);
    }
  },

  patch: async function (url, body) {
    try {
      const response = await axios.patch(url, body);
      return response.data;
    } catch (e) {
      const message = e?.response?.data?.message || e?.message;
      throw new Error(message);
    }
  },

  delete: async function (url, body) {
    try {
      const response = await axios.delete(url, { data: body });
      return response.data;
    } catch (e) {
      const message = e?.response?.data?.message || e?.message;
      throw new Error(message);
    }
  },

  get: async function (url, params) {
    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (e) {
      const message = e?.response?.data?.message || e?.message;
      throw new Error(message);
    }
  },
};

export default axiosObject;
