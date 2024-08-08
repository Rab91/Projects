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
import { HMSContext } from '../HMSContext'
function App() {

  const [option,setOption]= useState("updateprofile")
  return (
    <>
     <div>
      <HMSContext.Provider value={{option,setOption}}>
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
        </HMSContext.Provider>
     </div>
    </>
  )
}

export default App
