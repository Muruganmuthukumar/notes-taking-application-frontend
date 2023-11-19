import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PrivateRoutes() {
  const { user } = useAuth();
  return user?<Navigate to='/sign-in' />:<Outlet/>
}

export default PrivateRoutes