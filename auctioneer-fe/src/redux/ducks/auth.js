import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { getToken, removeToken, setToken } from "../../helpers/auth";

const initialState = {
  loading: false,
  isAuthenticated: false,
  error: null,
  user: null,
  isAdmin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => ({
      ...state,
      loading: true,
    }),
    loginSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      isAuthenticated: true,
      user: action.payload,
      isAdmin: action.payload.is_admin,
    }),
    loginFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      isAuthenticated: false,
      user: null,
      isAdmin: null,
    }),
    authenticate: (state) => ({
      ...state,
      isAuthenticated: true,
    }),
    clearAuthentication: (state) => ({
      ...state,
      isAuthenticated: false,
      user: null,
      isAdmin: null,
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
        const user = data.user;
        if (token) {
          setToken(token);
          dispatch(authSlice.actions.loginSuccess(user));
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
