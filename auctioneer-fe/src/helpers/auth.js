import constants from "../constants";
import axios from "axios";
import store from "../redux/store";
import { clearAuthentication } from "../redux/ducks/auth";

export const setToken = (token) => {
  localStorage.setItem(constants.token, token);
};

export const getToken = () => localStorage.getItem(constants.token);

export const removeToken = () => {
  localStorage.removeItem(constants.token);
};

export const getAuthHeader = () => {
  return { Authorization: `Bearer ${getToken()}` };
};

export const isAuthenticated = () => !!getToken();

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      Object.assign(config.headers, getAuthHeader());
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    let token = await getToken();
    if (
      error.config &&
      error.response &&
      error.response.status === 401 &&
      token
    ) {
      store.dispatch(clearAuthentication());
    }

    return Promise.reject(error);
  }
);
