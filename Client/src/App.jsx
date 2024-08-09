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
import DoctorsDashboard from './components/doctors/DoctorsDashboard'
import DoctorWrapper from './components/auth/DoctorWrapper'
import { useSelector } from 'react-redux'

function App() {

  const [option,setOption]= useState("updateprofile")

  const {user}= useSelector(state=>state.authReducers)

  const[patients,setPatients]=useState([])
  const fetchAllPatients = ()=>{
    fetch("http://localhost:8000/doctor/all-patients",{
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": user?.token,
        },
  })
  .then(res=>res.json())
  .then((data)=>{
    if(data.success){
      setPatients(data.patients)
    }
    else{
      toast.error(data.message)
    }
  })
  .catch(err=>toast.error(err.message))
  }

  const filterPatients = (query)=>{
    fetch(`http://localhost:8000/doctor/search-patients?query=${query}`,{
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": user?.token,
        },
  })
  .then(res=>res.json())
  .then((data)=>{
    if(data.success){
      setPatients(data.patients)
    }
    else{
      toast.error(data.message)
    }
  })
  .catch(err=>toast.error(err.message))
  }
  return (
    <>
     <div>
      <HMSContext.Provider value={{option,setOption,fetchAllPatients,patients,filterPatients}}>
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
          <Route path="/doctor-dashboard" 
          element={
            <DoctorWrapper>
             <DoctorsDashboard/>
            </DoctorWrapper>
          }/>
        </Routes>
        </HMSContext.Provider>
     </div>
    </>
  )
}

export default App
