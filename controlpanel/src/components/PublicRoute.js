import React from 'react'
import {Outlet, Navigate} from 'react-router'

const isAuth = ()=>{
  const token = localStorage.getItem('jwt')
  return token!=null
}

const PublicRoute = () => {
  return isAuth() ? <Navigate to="/Dashboard" /> : <Outlet />
}

export default PublicRoute
