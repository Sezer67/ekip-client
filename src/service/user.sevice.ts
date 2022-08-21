import axios, { AxiosPromise, AxiosResponse } from "axios"
import { ResponseLoginType, UserLoginType, UserRegisterType } from "../types/user-service.types";

const url = 'http://localhost:8000/user'

export const register = async (data:UserRegisterType) =>{
    return await axios.post(url,data);
}

export const login  = (data:UserLoginType):AxiosPromise<ResponseLoginType> =>{
    return axios.post(`${url}/login`,data,{
        withCredentials:true
    });
}

export const getLoggedUser = ():AxiosPromise<ResponseLoginType> =>{
    return axios.get(url,{
        withCredentials:true
    });
}

export const logout = ():AxiosPromise<{message:string}> =>{
    return axios.get(`${url}/logout`);
}