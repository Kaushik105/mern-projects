import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk(
  "shoppingOrderSlice/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/order/create",
      orderData
    );

    return response.data;
  }
);
export const capturePayment = createAsyncThunk(
  "shoppingOrderSlice/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/order/capture",
      { paymentId, payerId, orderId }
    );

    return response.data;
  }
);
export const getAllOrdersByUser = createAsyncThunk(
  "shoppingOrderSlice/getAllOrdersByUser",
  async ({ userId }) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/order/list/${userId}`
    );
    return response.data;
  }
);
export const getOrderDetails = createAsyncThunk(
  "shoppingOrderSlice/getOrderDetails",
  async ({ orderId }) => {
    console.log(orderId);
    
    const response = await axios.get(
      `http://localhost:3000/api/shop/order/details/${orderId}`
    );

    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers:{
    resetOrderDetails :(state) => {
      state.orderDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.data.approvalURL;
        state.orderId = action.payload.data.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.data.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(capturePayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(capturePayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.data.approvalURL;
        state.orderId = action.payload.data.orderId;
      })
      .addCase(capturePayment.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.orderList = null;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const {resetOrderDetails} = shoppingOrderSlice.actions

export default shoppingOrderSlice.reducer;
