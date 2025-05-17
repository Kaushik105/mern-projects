import axios from "axios";

import { createSlice, createAsyncThunk } from  "@reduxjs/toolkit"

const initialState = {
  isLoading: true,
  addressList: [],
};

export const addAddress = createAsyncThunk(
  "addressSlice/addAddress",
  async ({ addressData }) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/address/add",
      addressData,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response.data;
  }
);
export const fetchAddress = createAsyncThunk(
  "addressSlice/fetchAddress",
  async ({ userId }) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/address/get/${userId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response.data;
  }
);
export const editAddress = createAsyncThunk(
  "addressSlice/editAddress",
  async ({ addressData, userId, addressId }) => {
    const response = await axios.put(
      `http://localhost:3000/api/shop/address/update/${userId}/${addressId}`,
      addressData,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response.data;
  }
);
export const deleteAddress = createAsyncThunk(
  "addressSlice/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "shopAddress",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer
