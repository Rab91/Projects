import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PatientWrapper = ({children}) => {
  const { user } = useSelector((state) => state.authReducers);
  return user == null ?<Navigate to= "/"/>: children;
}

export default PatientWrapper