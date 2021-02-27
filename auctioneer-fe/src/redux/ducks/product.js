import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

const initialState = {
  loading: false,
  error: null,
  product: null,
  productList: null,
  current_page: 1,
  col: "created_at",
  dir: "desc",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state, action) => ({
      ...state,
      loading: true,
      current_page: action.payload.current_page,
      col: action.payload.col,
      dir: action.payload.dir,
    }),
    getProductsSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      productList: action.payload,
    }),
    getProductsFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    getProductById: (state) => ({
      ...state,
      product: null,
      loading: true,
    }),
    getProductByIdSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      product: action.payload,
    }),
    getProductByIdFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    updateProduct: (state) => ({
      ...state,
      loading: true,
      product: null,
    }),
    updateProductSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      product: action.payload,
    }),
    updateProductFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    deleteProductById: (state) => ({
      ...state,
      loading: true,
      product: null,
    }),
    deleteProductByIdSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      product: action.payload,
    }),
    deleteProductByIdFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    createProduct: (state) => ({
      ...state,
      loading: true,
      product: null,
    }),
    createProductSuccess: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      product: action.payload,
    }),
    createProductFail: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    productLiveUpdate: (state, action) => ({
      ...state,
      product: {
        ...state.product,
        ...action.payload,
      },
    }),
  },
});

const productReducer = productSlice.reducer;

export const getProducts = (
  page = 1,
  col = "created_at",
  dir = "desc",
  filter = ""
) => {
  return (dispatch) => {
    dispatch(productSlice.actions.getProducts({ page, col, dir }));

    axios
      .get(
        `${API_URL}/products?col=${col}&dir=${dir}&page=${page}&filter=${filter}`
      )
      .then((r) => r.data)
      .then((data) => {
        dispatch(productSlice.actions.getProductsSuccess(data));
      })
      .catch((error) => {
        dispatch(productSlice.actions.getProductsFail(error));
      });
  };
};

export const getProductById = (id) => {
  return (dispatch) => {
    dispatch(productSlice.actions.getProductById());

    axios
      .get(`${API_URL}/products/${id}`)
      .then((r) => r.data)
      .then((data) => {
        dispatch(productSlice.actions.getProductByIdSuccess(data));
      })
      .catch((error) => {
        dispatch(productSlice.actions.getProductByIdFail(error));
      });
  };
};

export const deleteProductById = (id) => {
  return (dispatch) => {
    dispatch(productSlice.actions.deleteProductById());

    axios
      .delete(`${API_URL}/products/${id}`)
      .then(() => {
        dispatch(productSlice.actions.deleteProductByIdSuccess());
      })
      .catch((error) => {
        dispatch(productSlice.actions.deleteProductByIdFail(error));
      });
  };
};

export const createProduct = (data) => {
  return (dispatch) => {
    dispatch(productSlice.actions.createProduct());

    axios
      .post(`${API_URL}/products`, data)
      .then((r) => r.data)
      .then((data) => {
        dispatch(productSlice.actions.createProductSuccess(data));
      })
      .catch((error) => {
        dispatch(productSlice.actions.createProductFail(error));
      });
  };
};

export const updateProduct = (id, data) => {
  return (dispatch) => {
    dispatch(productSlice.actions.updateProduct());

    axios
      .put(`${API_URL}/products/${id}`, data)
      .then((r) => r.data)
      .then((data) => {
        dispatch(productSlice.actions.updateProductSuccess(data));
      })
      .catch((error) => {
        dispatch(productSlice.actions.updateProductFail(error));
      });
  };
};

export const productLiveUpdate = (data) => {
  return (dispatch) => {
    dispatch(productSlice.actions.productLiveUpdate(data));
  };
};

export default productReducer;
