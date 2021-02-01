import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  loading: false,
  error: null,
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getCurrentUser: (state) => ({
      ...state,
      loading: true,
      currentUser: null,
    }),
    getCurrentUserSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      currentUser: action.payload,
    }),
    getCurrentUserFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    updateCurrentUser: (state) => ({
      ...state,
      loading: true,
      currentUser: null,
    }),
    updateCurrentUserSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      currentUser: action.payload,
    }),
    updateCurrentUserFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    markNotificationsSeen: (state) => ({
      ...state,
      loading: true,
      currentUser: null,
    }),
    markNotificationsSeenSuccess: (state) => ({
      ...state,
      loading: false,
      error: null,
    }),
    markNotificationsSeenFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

const userReducer = userSlice.reducer;

export const getCurrentUser = () => {
  return (dispatch) => {
    dispatch(userSlice.actions.getCurrentUser());

    axios
      .get(`${API_URL}/users/current`)
      .then((r) => r.data)
      .then((data) => {
        dispatch(userSlice.actions.getCurrentUserSuccess(data));
      })
      .catch((error) => {
        dispatch(userSlice.actions.getCurrentUserFail(error));
      });
  };
};

export const updateCurrentUser = (data) => {
  return (dispatch) => {
    dispatch(userSlice.actions.updateCurrentUser());

    axios
      .put(`${API_URL}/users/current`, data)
      .then((r) => r.data)
      .then((data) => {
        dispatch(userSlice.actions.updateCurrentUserSuccess(data));
      })
      .catch((error) => {
        dispatch(userSlice.actions.updateCurrentUserFail(error));
      });
  };
};

export const markNotificationsSeen = () => {
  return (dispatch) => {
    dispatch(userSlice.actions.markNotificationsSeen());

    axios
      .put(`${API_URL}/users/current/notifications`, {})
      .then(() => {
        dispatch(userSlice.actions.markNotificationsSeenSuccess());
      })
      .catch((error) => {
        dispatch(userSlice.actions.markNotificationsSeenFail(error));
      });
  };
};

export default userReducer;
