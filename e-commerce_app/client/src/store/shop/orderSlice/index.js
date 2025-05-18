import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
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

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
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
  },
});

export default shoppingOrderSlice.reducer;
