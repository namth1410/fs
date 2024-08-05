import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import myselfSlice from "./myselfSlice";
import productDetailsSlice from "./productDetailsSlice";
import productsSlice from "./productsSlice";

export const store = configureStore({
  reducer: {
    myselfRedux: myselfSlice,
    productsRedux: productsSlice,
    productDetailsRedux: productDetailsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
