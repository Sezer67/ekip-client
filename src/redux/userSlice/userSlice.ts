import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ResponseLoginType } from '../../types/user-service.types';
import { UserStateType } from '../types/user.types';

const initialState:UserStateType = {
    user:{
        id:"",
    firstName:"",
    lastName:"",
    username:"",
    email:"",
    token:undefined
    }
}

const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setUser:(state:UserStateType,action:PayloadAction<ResponseLoginType>) => {
            state.user = {...action.payload}
        },
        logout:(state:UserStateType,action) => {
            state.user = {
                id:"",
                firstName:"",
                lastName:"",
                username:"",
                email:"",
                token:undefined
            }
        },
        
    }
});

export default userSlice.reducer;
export const {setUser,logout} = userSlice.actions;