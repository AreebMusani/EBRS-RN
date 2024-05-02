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
};

export default api;