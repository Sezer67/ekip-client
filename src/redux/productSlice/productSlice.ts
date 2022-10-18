import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderStateType, ProductStateType } from "../types/product.type";

type InitialType = {
  products: ProductStateType[];
  selectedProduct: ProductStateType;
  orders: OrderStateType[];
};

const initialState: InitialType = {
  products: [],
  selectedProduct: {
    categories: [],
    createdAt: new Date(),
    id: "",
    images: null,
    name: "",
    ownerId: {
      id: "",
      firstName: "",
      lastName: "",
    },
    price: 0,
    showCount: 0,
    stock: 0,
  },
  orders: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: { ...initialState },
  reducers: {
    setProducts: (state, action: PayloadAction<ProductStateType[]>) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<ProductStateType>) => {
      state.selectedProduct = action.payload;
    },
    setOrders: (state, action: PayloadAction<OrderStateType[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<OrderStateType>) => {
      state.orders.unshift(action.payload);
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
  },
});

export default productSlice.reducer;
export const {
  setProducts,
  setSelectedProduct,
  setOrders,
  addOrder,
  deleteOrder,
} = productSlice.actions;
