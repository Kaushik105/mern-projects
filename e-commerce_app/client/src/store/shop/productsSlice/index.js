import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  productList: [],
  productDetails: null,
};

export const getFilteredProducts = createAsyncThunk(
  "shopProducts/getFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({ ...filterParams, sortBy: sortParams });
    const response = await axios.get(
      `http://localhost:3000/api/shop/products/get?${query}`,
      {
        headers: {
          "Content-Type": "application/json ",
        },
      }
    );

    return response?.data;
  }
);

export const getProductDetails = createAsyncThunk(
  "shopProducts/getProductDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/products/get/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json ",
        },
      }
    );

    return response?.data;
  }
);

const ShopProductsSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredProducts.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.data;
      })
      .addCase(getFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(getProductDetails.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload?.data;
      })
      .addCase(getProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default ShopProductsSlice.reducer;
