import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/api";
import { Product } from "../models/product.model";

interface ProductDetailState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: null,
};

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id: number) => {
    const response = await axiosInstance.get(`/products/${id}?populate=images`);
    return response.data;
  }
);

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch product details";
      });
  },
});

export default productDetailSlice.reducer;
