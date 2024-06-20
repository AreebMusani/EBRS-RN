import constants from "../configs/constants";
import axios from "../utils/axios";


// Create the api object with AxiosResponse as the generic type
const api = {
  login: async (body) => {
    const url = `${constants.BASE_URL}/user/login`;
    return axios.post(url, body);
  },

  signup: async (body) => {
    const url = `${constants.BASE_URL}/user/register`;
    return axios.post(url, body);
  },

  sendOTPForEmailVerification: async (body) => {
    const url = `${constants.BASE_URL}/user/send-otp`;
    return axios.post(url, body);
  },

  socialLogin: async (body) => {
    const url = `${constants.BASE_URL}/user/social-login`;
    return axios.post(url, body);
  },

  sendOTPCode: async (body) => {
    const url = `${constants.BASE_URL}/user/forgot-password`;
    return axios.post(url, body);
  },

  
  verifyOTPCode: async (body) => {
    const url = `${constants.BASE_URL}/user/verify-otp`;
    return axios.post(url, body);
  },

  resetPassword: async (body) => {
    const url = `${constants.BASE_URL}/user/reset-password`;
    return axios.post(url, body);
  },
};

export default api;