import { useState } from 'react'
import './App.css'
import Navbar from './components/common/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import PatientDashboard from './components/patients/PatientDashboard'
import PatientWrapper from './components/auth/PatientWrapper'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
function App() {

  return (
    <>
     <div>
        <Navbar/>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/patient-dashboard" 
          element={
              <PatientWrapper>
                <PatientDashboard/>
              </PatientWrapper>
            }/>

        </Routes>
     </div>
    </>
  )
}

export default App
