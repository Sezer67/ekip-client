import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice/categorySlice";
import productSlice from "./productSlice/productSlice";
import notificationSlice from "./userSlice/notificationSlice";
import userSlice from "./userSlice/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
    category: categorySlice,
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
