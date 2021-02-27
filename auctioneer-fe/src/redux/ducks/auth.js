import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../config";
import i18n from "../../i18n";
import { getToken, getIsAdmin, removeAuth, setAuth } from "../../helpers/auth";

const initialState = {
  loading: false,
  isAuthenticated: undefined,
  error: null,
  showError: null,
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
      isAdmin: action.payload.is_admin,
    }),
    loginFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      isAuthenticated: false,
      isAdmin: null,
    }),
    register: (state) => ({
      ...state,
      loading: true,
    }),
    registerSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      isAuthenticated: true,
      isAdmin: action.payload.is_admin,
    }),
    registerFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      isAuthenticated: false,
      isAdmin: null,
    }),
    registerAdmin: (state) => ({
      ...state,
      loading: true,
    }),
    registerAdminSuccess: (state) => ({
      ...state,
      loading: false,
      error: null,
    }),
    registerAdminFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    showError: (state, action) => ({
      ...state,
      loading: false,
      showError: action.payload,
      isAuthenticated: false,
      isAdmin: null,
    }),
    authenticate: (state, action) => ({
      ...state,
      isAuthenticated: true,
      isAdmin: action.payload,
    }),
    clearAuthentication: (state) => ({
      ...state,
      isAuthenticated: false,
      isAdmin: null,
    }),
  },
});

const authReducer = authSlice.reducer;

export const authenticate = () => {
  return (dispatch) => {
    const token = getToken();
    const isAdmin = getIsAdmin();

    if (!token) {
      return clearAuthentication();
    }

    dispatch(authSlice.actions.authenticate(isAdmin));
  };
};

export const clearAuthentication = () => {
  removeAuth();

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
        const { token, user, error } = data;

        if (token) {
          setAuth(token, user.is_admin);
          dispatch(authSlice.actions.loginSuccess(user));
        } else if (error) {
          toast.error(error);
          dispatch(authSlice.actions.loginFail(error));
        }
      })
      .catch((error) => {
        dispatch(authSlice.actions.loginFail(error));
      });
  };
};

export const register = (data) => {
  return (dispatch) => {
    dispatch(authSlice.actions.register());

    axios
      .post(`${API_URL}/register`, data)
      .then((r) => r.data)
      .then((data) => {
        const { token, user, error } = data;

        if (token) {
          setAuth(token, user.is_admin);
          dispatch(authSlice.actions.registerSuccess(user));
        } else if (error) {
          toast.error(error);
          dispatch(authSlice.actions.registerFail(error));
        }
      })
      .catch((error) => {
        dispatch(authSlice.actions.registerFail(error));
      });
  };
};

export const registerAdmin = (data, history) => {
  return (dispatch) => {
    dispatch(authSlice.actions.registerAdmin());

    axios
      .post(`${API_URL}/register-admin`, data)
      .then(() => {
        dispatch(authSlice.actions.registerAdminSuccess());
        toast.success(i18n.t("authScreen.registerSuccess"));
        history.goBack();
      })
      .catch((error) => {
        dispatch(authSlice.actions.registerAdminFail(error));
      });
  };
};

export default authReducer;
