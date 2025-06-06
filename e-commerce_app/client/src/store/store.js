import { compose, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import AdminProductsSlice from "./admin/productsSlice";
import ShopProductSlice from "./shop/productsSlice";
import shoppingCartSlice from "./shop/cartSlice";
import shoppingAddressSlice from "./shop/addressSlice";
import shoppingOrderSlice from "./shop/orderSlice";
import adminOrderSlice from "./admin/orderSlice";
import searchProductSlice from "./shop/searchSlice";
import shopReviewSlice from "./shop/reviewSlice";
import commonSlice from "./commonSlice";

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
    shopReview: shopReviewSlice,
    commonFeature: commonSlice
  },
});

export default store;
