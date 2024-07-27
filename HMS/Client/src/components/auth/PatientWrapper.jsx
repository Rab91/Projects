import React from 'react'
import { Navigate } from 'react-router-dom';

const PatientWrapper = ({children}) => {
    const user = 1;
  return user == null ?<Navigate to= "/"/>: children;
}

export default PatientWrapper