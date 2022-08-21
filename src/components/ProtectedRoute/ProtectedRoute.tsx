import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import DashboardPage from '../../pages/DashboardPage/DashboardPage'
import { PropsType } from './protected-route.config'

const ProtectedRoute:React.FC<PropsType> = ({isAuth,component,path,navigateTo}) => {
    console.log("is auth : ",isAuth);
    return (
        isAuth ? <Outlet /> : <Navigate to={navigateTo || "/login"} />
    )
}

export default ProtectedRoute