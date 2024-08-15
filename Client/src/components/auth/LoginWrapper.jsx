import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LoginWrapper = ({children}) => {
  const { user } = useSelector((state) => state.authReducers);
  if(user == null)
    return <Navigate to= "/"/>
  else
  return children
}

export default LoginWrapper