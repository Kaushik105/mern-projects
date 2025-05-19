import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
  orderDetails: null,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "adminOrderSlice/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `http://localhost:3000/api/admin/order/get`
    );
    return response.data;
  }
);
export const getOrderDetailsForAdmin = createAsyncThunk(
  "adminOrderSlice/getOrderDetailsForAdmin",
  async ({ orderId }) => {
    const response = await axios.get(
      `http://localhost:3000/api/admin/order/details/${orderId}`
    );

    return response.data;
  }
);
export const updateOrderStatus = createAsyncThunk(
  "adminOrderSlice/updateOrderStatus",
  async ({ orderId, formData }) => {
    console.log(orderId);

    const response = await axios.put(
      `http://localhost:3000/api/admin/order/update/${orderId}`,
      formData
    );

    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(getAllOrdersForAdmin.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = null;
      })
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default adminOrderSlice.reducer;
export const { resetOrderDetails } = adminOrderSlice.actions;
