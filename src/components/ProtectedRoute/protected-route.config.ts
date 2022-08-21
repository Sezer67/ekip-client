import React from "react"

export type PropsType = {
    isAuth?:boolean,
    component?:React.ReactNode,
    path?:string;
    navigateTo?:string;
}