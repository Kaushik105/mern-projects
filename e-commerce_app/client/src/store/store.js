import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./admin/productsSlice";
import ShopProductSlice from "./shop/productsSlice";
import shoppingCartSlice from "./shop/cartSlice";
import shoppingAddressSlice from "./shop/addressSlice";
import shoppingOrderSlice from "./shop/orderSlice";
import adminOrderSlice from "./admin/orderSlice"
import searchProductSlice from "./shop/searchSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    shopProducts: ShopProductSlice,
    shopCart: shoppingCartSlice,
    shopAddress: shoppingAddressSlice,
    shopOrder: shoppingOrderSlice,
    adminOrder: adminOrderSlice,
    shopSearch: searchProductSlice,
  },
});

export default store;
