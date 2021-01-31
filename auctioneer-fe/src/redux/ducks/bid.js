import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { useHistory } from "react-router-dom";

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
        let history = useHistory();
        history.goBack();
      })
      .catch((error) => {
        dispatch(bidSlice.actions.makeBidFail(error));
      });
  };
};

export default bidReducer;
