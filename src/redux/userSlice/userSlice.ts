import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Role } from "../../enums/role.enum";
import { ResponseLoginType } from "../../types/user-service.types";
import {
  EvaluateType,
  FollowType,
  UserStateType,
  UserType,
} from "../types/user.types";

const initialState: UserStateType = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    balance: 0,
    isFreeze: false,
    role: Role.Customer,
    profilePicture: null,
    token: undefined,
  },
  followers: [],
  allUsers: [],
  evaluateProducts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (
      state: UserStateType,
      action: PayloadAction<ResponseLoginType>
    ) => {
      state.user = { ...action.payload };
    },
    setUserMinusBalance: (
      state,
      action: PayloadAction<{ balance: number }>
    ) => {
      state.user.balance = state.user.balance - action.payload.balance;
    },
    setUserPlusBalance: (state, action: PayloadAction<{ balance: number }>) => {
      state.user.balance = state.user.balance + action.payload.balance;
    },
    logout: (state: UserStateType, action) => {
      state.user = {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        balance: 0,
        isFreeze: false,
        role: Role.Customer,
        profilePicture: null,
        token: undefined,
      };
      state.allUsers = [];
      state.followers = [];
      state.evaluateProducts = [];
    },
    setFollowers: (state, action: PayloadAction<FollowType[]>) => {
      state.followers = action.payload;
    },
    addFollower: (state, action: PayloadAction<FollowType>) => {
      state.followers.push(action.payload);
    },
    removeFollower: (state, action: PayloadAction<{ id: string }>) => {
      state.followers = state.followers.filter(
        (follow) => follow.id !== action.payload.id
      );
    },
    setAllUsers: (state, action: PayloadAction<UserType[]>) => {
      state.allUsers = action.payload;
    },
    updateUserById: (
      state,
      action: PayloadAction<{ id: string; isFreeze: boolean }>
    ) => {
      state.allUsers = state.allUsers.map((user) => {
        if (user.id === action.payload.id) {
          user.isFreeze = action.payload.isFreeze;
        }
        return user;
      });
    },
    setEvaluateProducts: (state, action: PayloadAction<EvaluateType[]>) => {
      state.evaluateProducts = action.payload;
    },
    setEvaluateProductByProductId: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      state.evaluateProducts = state.evaluateProducts.map((el) => {
        if (el.productId === action.payload.id) {
          el.isRating = true;
        }
        return el;
      });
    },
  },
});

export default userSlice.reducer;
export const {
  setUser,
  logout,
  setUserMinusBalance,
  setUserPlusBalance,
  setFollowers,
  addFollower,
  removeFollower,
  setAllUsers,
  updateUserById,
  setEvaluateProducts,
  setEvaluateProductByProductId,
} = userSlice.actions;
