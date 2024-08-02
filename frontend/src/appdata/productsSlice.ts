import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../lib/api";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "failed";
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
};

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
        state.products = action.payload;
        console.log(action.payload);
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await axiosInstance.get("/products?populate=images");
    return response.data;
  }
);

export default productsSlice.reducer;
