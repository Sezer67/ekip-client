import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  OrderStateType,
  ProductStateType,
  SalesStateType,
} from "../types/product.type";

type InitialType = {
  products: ProductStateType[];
  selectedProduct: ProductStateType;
  orders: OrderStateType[];
  salesData: SalesStateType;
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
  salesData: {
    count: 0,
    filterTotalTaking: 0,
    sales: [],
  },
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
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
    },
    setProductShowCountById: (state, action: PayloadAction<{ id: string }>) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) product.showCount += 1;
        return product;
      });
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
    setSalesData: (state, action: PayloadAction<SalesStateType>) => {
      state.salesData = action.payload;
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
  setProductShowCountById,
  setSalesData,
} = productSlice.actions;
