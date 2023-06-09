import React from 'react'
import {Outlet, Navigate} from "react-router";

const isAuth = ()=>{
  const token = localStorage.getItem('jwt')
  return token!=null
}

const ProtectedRoutes = () => {
  return isAuth() ? <Outlet/> : <Navigate to="/Login"/>
}

export default ProtectedRoutes;
