import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
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
      })
      .catch((error) => {
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
      })
      .catch((error) => {
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
      })
      .catch((error) => {
        dispatch(bidSlice.actions.disableAutobiddingFail(error));
      });
  };
};

export default bidReducer;
