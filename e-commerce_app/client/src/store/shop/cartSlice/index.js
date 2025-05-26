import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
  cartId: null,
};

export const createCart = createAsyncThunk(
  "shoppingCartSlice/createCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      "/api/shop/cart/add",
      {
        userId,
        productId,
        quantity,
      },
      {
        headers: {
          "Content-Type": "application/json ",
        },
      }
    );

    return response?.data;
  }
);
export const fetchCartItems = createAsyncThunk(
  "shoppingCartSlice/fetchCartItems",
  async (userId) => {
    const response = await axios.get(`/api/shop/cart/get/${userId}`);

    return response?.data;
  }
);
export const updateCart = createAsyncThunk(
  "shoppingCartSlice/updateCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      "/api/shop/cart/update",
      {
        userId,
        productId,
        quantity,
      },
      {
        headers: {
          "Content-Type": "application/json ",
        },
      }
    );

    return response?.data;
  }
);
export const deleteCart = createAsyncThunk(
  "shoppingCartSlice/deleteCart",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `/api/shop/cart/delete/${userId}/${productId}`
    );

    return response?.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data?.items;
        state.cartId = action.payload.data?._id;
      })
      .addCase(createCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data?.items;
        state.cartId = action.payload.data?._id;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data?.items;
        state.cartId = action.payload.data?._id;
      })
      .addCase(updateCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data?.items;
        state.cartId = action.payload.data?._id;
      })
      .addCase(deleteCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
