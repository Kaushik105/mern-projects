import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "adminProducts/addnewproduct",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json ",
        },
      }
    );

    return response?.data;
  }
);
export const fetchAllProducts = createAsyncThunk(
  "adminProducts/fetchallproducts",
  async (formData) => {
    const response = await axios.get(
      "http://localhost:3000/api/admin/products/get",
      formData,
      {
        headers: {
          "Content-Type": "application/json ",
        },
      }
    );

    return response?.data;
  }
);
export const editProduct = createAsyncThunk(
  "adminProducts/addnewproduct",
  async ({id, formData}) => {
    
    const response = await axios.patch(
      `http://localhost:3000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json ",
        },
      }
    );

    return response?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "adminProducts/addnewproduct",
  async ({id}) => {
    const response = await axios.delete(
      `http://localhost:3000/api/admin/products/delete/${id}`
    );

    return response?.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading= true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading= false;
        state.productList= action.payload?.data || 5000;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading= false;
        state.productList= null;
      });
  },
});

export default AdminProductsSlice.reducer;
