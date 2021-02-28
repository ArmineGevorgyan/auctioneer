import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import i18n from "../../i18n";
import { API_URL } from "../../config";

const initialState = {
  loading: false,
  error: null,
  bid: null,
};

const bidSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {
    makeBid: (state) => ({
      ...state,
      loading: true,
      bid: null,
    }),
    makeBidSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      bid: action.payload,
    }),
    makeBidFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    enableAutobidding: (state) => ({
      ...state,
      loading: true,
      bid: null,
    }),
    enableAutobiddingSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      bid: action.payload,
    }),
    enableAutobiddingFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    disableAutobidding: (state) => ({
      ...state,
      loading: true,
      bid: null,
    }),
    disableAutobiddingSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      bid: action.payload,
    }),
    disableAutobiddingFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

const bidReducer = bidSlice.reducer;

export const makeBid = (product_id, data) => {
  return (dispatch) => {
    dispatch(bidSlice.actions.makeBid());

    axios
      .post(`${API_URL}/products/${product_id}/bids`, data)
      .then((r) => r.data)
      .then((data) => {
        dispatch(bidSlice.actions.makeBidSuccess(data));
        toast.success(i18n.t("toast.makeBidSuccess"));
      })
      .catch((error) => {
        toast.error(i18n.t("toast.makeBidFail"));
        dispatch(bidSlice.actions.makeBidFail(error));
      });
  };
};

export const enableAutobidding = (product_id) => {
  return (dispatch) => {
    dispatch(bidSlice.actions.enableAutobidding());

    axios
      .post(`${API_URL}/products/${product_id}/autobid/enable`, {})
      .then((r) => r.data)
      .then((data) => {
        dispatch(bidSlice.actions.enableAutobiddingSuccess(data));
        toast.success(i18n.t("toast.enableAutobiddingSuccess"));
      })
      .catch((error) => {
        toast.error(i18n.t("toast.enableAutobiddingFail"));
        dispatch(bidSlice.actions.enableAutobiddingFail(error));
      });
  };
};

export const disableAutobidding = (product_id) => {
  return (dispatch) => {
    dispatch(bidSlice.actions.disableAutobidding());

    axios
      .post(`${API_URL}/products/${product_id}/autobid/disable`, {})
      .then((r) => r.data)
      .then((data) => {
        dispatch(bidSlice.actions.disableAutobiddingSuccess(data));
        toast.success(i18n.t("toast.disableAutobiddingSuccess"));
      })
      .catch((error) => {
        toast.error(i18n.t("toast.disableAutobiddingFail"));
        dispatch(bidSlice.actions.disableAutobiddingFail(error));
      });
  };
};

export default bidReducer;
