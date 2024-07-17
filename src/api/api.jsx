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

  detectEmotion: async (body) => {
    const url = `https://oarfish-obliging-rooster.ngrok-free.app/analyze_emotion`;
    return axios.post(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  getSongs: async ({body, userId, category}) => {
    const url = `${constants.BASE_URL}/songs/${category}?userId=${userId}`;
    return axios.get(url, body);
  },

  giveRatingToSong: async ({songId, body}) => {
    const url = `${constants.BASE_URL}/songs/${songId}/rate`;
    return axios.post(url, body)
  },

  getFavouriteSongs: async ({userId}) => {
    const url = `${constants.BASE_URL}/likes?userId=${userId}`;
    return axios.get(url)
  },

  addFavouriteSong: async (body) => {
    const url = `${constants.BASE_URL}/likes`;
    return axios.post(url, body);
  }
};

export default api;