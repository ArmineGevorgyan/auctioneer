import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { getToken, removeToken, setToken } from "../../helpers/auth";

const initialState = {
  loading: false,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => ({
      ...state,
      loading: true,
    }),
    loginSuccess: (state) => ({
      ...state,
      loading: false,
      error: null,
      isAuthenticated: true,
    }),
    loginFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      isAuthenticated: false,
    }),
    authenticate: (state) => ({
      ...state,
      isAuthenticated: true,
    }),
    clearAuthentication: (state) => ({
      ...state,
      isAuthenticated: false,
    }),
  },
});

const authReducer = authSlice.reducer;

export const authenticate = () => {
  return (dispatch) => {
    const token = getToken();
    if (token) {
      return dispatch(authSlice.actions.authenticate());
    }
    clearAuthentication();
  };
};

export const clearAuthentication = () => {
  removeToken();

  return (dispatch) => {
    dispatch(authSlice.actions.clearAuthentication());
  };
};

export const login = (data) => {
  return (dispatch) => {
    dispatch(authSlice.actions.login());

    axios
      .post(`${API_URL}/login`, data)
      .then((r) => r.data)
      .then((data) => {
        const token = data.token;
        if (token) {
          setToken(token);
          dispatch(authSlice.actions.loginSuccess());
        } else {
          dispatch(authSlice.actions.loginFail());
        }
      })
      .catch((error) => {
        dispatch(authSlice.actions.loginFail(error));
      });
  };
};

export default authReducer;
