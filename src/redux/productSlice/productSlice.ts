import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductStateType } from "../types/product.type";

type InitialType = {
  products: ProductStateType[];
  selectedProduct: ProductStateType;
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
  },
});

export default productSlice.reducer;
export const { setProducts, setSelectedProduct } = productSlice.actions;
