import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PAGE_SIZE } from "../constants/pagination";
import axiosInstance from "../lib/api";
import { PaginationInfo } from "../models/pagination.model";
import { Product } from "../models/product.model";

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "failed";
  pagination: PaginationInfo | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  pagination: null,
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({
    productType,
    page,
    sortBy,
  }: {
    productType: string;
    page: number;
    sortBy: string;
  }) => {
    const response = await axiosInstance.get(
      `/products?populate=images&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&filters[type][$eqi]=${productType}&sort[0]=${sortBy}`
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.data;
        state.pagination = action.payload.meta.pagination;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
