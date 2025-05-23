import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reviews: null,
};

export const addReview = createAsyncThunk(
  "shopReviewSlice/addReview",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/shop/review/add",
      formData
    );
    return response.data;
  }
);
export const getReviews = createAsyncThunk(
  "shopReviewSlice/getReviews",
  async (productId) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/review/${productId}`
    );
    return response.data;
  }
);

const shopReviewSlice = createSlice({
  name: "shopReviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        (state.isLoading = false), (state.reviews = action.payload?.data);
      })
      .addCase(addReview.rejected, (state) => {
        (state.isLoading = false), (state.reviews = null);
      })
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        (state.isLoading = false), (state.reviews = action.payload?.data);
      })
      .addCase(getReviews.rejected, (state) => {
        (state.isLoading = false), (state.reviews = null);
      });
  },
});

export default shopReviewSlice.reducer;
