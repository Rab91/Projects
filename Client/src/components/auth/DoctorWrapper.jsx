import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DoctorWrapper = ({children}) => {
  const { user } = useSelector((state) => state.authReducers);
  if(user == null)
    return <Navigate to= "/"/>
  else if(user && user.role!="doctor")
    return <Navigate to= "/"/>
  else
  return children
}

export default DoctorWrapper