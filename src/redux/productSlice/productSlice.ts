import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BestSalesType,
  FavoriteStateType,
  OrderStateType,
  ProductStateType,
  SalesStateType,
} from "../types/product.type";

type InitialType = {
  products: ProductStateType[];
  selectedProduct: ProductStateType;
  orders: OrderStateType[];
  salesData: SalesStateType;
  favorites: FavoriteStateType[];
  globalDatas: {
    trends: ProductStateType[];
    new: ProductStateType[];
    bestSales: BestSalesType[];
  };
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
    description: "",
    ratingCount: 0,
    ratingPoint: 0,
  },
  orders: [],
  salesData: {
    count: 0,
    filterTotalTaking: 0,
    sales: [],
  },
  favorites: [],
  globalDatas: {
    bestSales: [],
    new: [],
    trends: [],
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
    setFavorites: (state, action: PayloadAction<FavoriteStateType[]>) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action: PayloadAction<FavoriteStateType>) => {
      state.favorites.unshift(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<{ id: string }>) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.productId.id !== action.payload.id
      );
    },
    setNewProducts: (state, action: PayloadAction<ProductStateType[]>) => {
      state.globalDatas.new = action.payload;
    },
    setTrendProducts: (state, action: PayloadAction<ProductStateType[]>) => {
      state.globalDatas.trends = action.payload;
    },
    setBestSaleProducts: (state, action: PayloadAction<BestSalesType[]>) => {
      state.globalDatas.bestSales = action.payload;
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
  setFavorites,
  addFavorite,
  removeFavorite,
  setNewProducts,
  setTrendProducts,
  setBestSaleProducts,
} = productSlice.actions;
