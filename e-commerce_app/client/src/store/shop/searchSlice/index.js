import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  searchResults: [],
};

export const getSearchResults = createAsyncThunk(
  "searchProductSlice/getSearchResults",
  async (Keyword) => {
    const resposne = await axios.get(
      `http://localhost:3000/api/shop/search/${Keyword}`
    );

    return resposne.data;
  }
);

const searchProductSlice = createSlice({
  name: "searchProductSlice",
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResults.fulfilled, (state, action) => {
        state.isLoading = true;
        state.searchResults = action.payload.data;
      })
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = true;
        state.searchResults = [];
      });
  },
});

export const { clearSearchResults } = searchProductSlice.actions;

export default searchProductSlice.reducer;
