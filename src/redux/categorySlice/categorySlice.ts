import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "../types/category.type";

const initialState: CategoryType[] = [];

const categorySlice = createSlice({
  name: "category",
  initialState: { initialState },
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryType[]>) => {
      state.initialState = action.payload;
    },
    addCategory: (state,action:PayloadAction<CategoryType>) => {
      state.initialState.push(action.payload);
    }
  },
});

export default categorySlice.reducer;
export const { setCategory, addCategory } = categorySlice.actions;
