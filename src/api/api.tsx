import constants from "../configs/constants";
import axios from "../utils/axios";

interface Api<T> {
  login: (body: any) => Promise<T>;
}

// Create the api object with AxiosResponse as the generic type
const api: Api<any> = {
  login: async (body: any): Promise<any> => {
    const url = `${constants.BASE_URL}`;
    return axios.post(url, body);
  },
};

export default api;
