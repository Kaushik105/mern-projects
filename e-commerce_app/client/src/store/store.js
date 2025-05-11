import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/productsSlice";
import ShopProductSlice from "./shop/productsSlice"
import shoppingCartSlice from "./shop/cartSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    shopProducts: ShopProductSlice,
    shopCart: shoppingCartSlice
  },
});

export default store;
