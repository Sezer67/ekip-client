import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PropsType } from './protected-route.config'

const ProtectedRoute:React.FC<PropsType> = ({isAuth,component,path,navigateTo}) => {
    return (
        isAuth ? <Outlet /> : <Navigate to={navigateTo || "/login"} />
    )
}

export default ProtectedRoute