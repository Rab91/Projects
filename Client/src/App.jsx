import { useEffect, useState } from 'react'
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
import socket from './socket'
import VideoCall from './components/common/VideoCall'
import LoginWrapper from './components/auth/LoginWrapper'
import { BASE_URL } from '../config'
import AdminWrapper from './components/auth/AdminWrapper'
import AdminDashboard from './components/admin/AdminDashboard'
function App() {

  const [option,setOption]= useState("updateprofile")

  const {user}= useSelector(state=>state.authReducers)

  const[patients,setPatients]=useState([])
  const fetchAllPatients = ()=>{
    fetch(`${BASE_URL}/doctor/all-patients`,{
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
    fetch(`${BASE_URL}/doctor/search-patients?query=${query}`,{
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
  useEffect(()=>{
    if(user){
      socket.connect();
      return()=>{
        socket.disconnect();
      }
    }
  },[user])
  //chat logic
  const [chatUsers,setChatUsers]= useState([])

  const [receiver,setReceiver]= useState(null)
  const [messages, setMessages] = useState([]);

  const sendMessage = (message)=>{
    console.log("Sender",user._id)
    console.log("Receiver",receiver)
    console.log("message",message)
    socket.emit("send-message",{
      sender: user?._id,
      receiver: receiver,
      message: message
    })
  }
  const sendFile = (file)=>{
    console.log("sending file", file)
    socket.emit("send-file",{
      sender: user?._id,
      receiver: receiver,
      file: file,
      filename: file.name,
    })
  }
  //check all chat users
  const fetchChatUsers = ()=>{
    let url =""
    if(user.role == "doctor"){
      url = `${BASE_URL}/doctor/all-patients`
    }
    else if(user.role == "patient"){
      url =`${BASE_URL}/patient/all-doctors`
    }
    fetch(url,{
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": user?.token,
        },
    })
    .then(res=>res.json())
    .then((data)=>{
      if(user.role == "doctor"){
        setChatUsers(data.patients)
      }
      else if(user.role == "patient"){
        setChatUsers(data.doctors)
      }
    })
    .catch((err)=>{console.log(err)})
  }

  useEffect(()=>{
    if(user){
      socket.connect();
      fetchChatUsers()
      return()=>{
        socket.disconnect();
      }
    }
  },[user])
  const fetchAllMessages = ()=>{
    fetch(`${BASE_URL}/auth/messages`,{
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": user?.token,
        },
        body: JSON.stringify({
          receiverId : receiver
        })
    })
    .then(res=>res.json())
    .then((data)=>{
        setMessages(data.messages)
    })
    .catch((err)=>console.log(err))
  }
  useEffect(()=>{
    if(user && receiver){
      let combinedId = ""
      if(user._id > receiver){
          combinedId = user._id + receiver;
      }
      else{
          combinedId =  receiver + user._id;
      }
      //fetch intial messages
      fetchAllMessages()
      socket.on(combinedId,(payload)=>{
        console.log("Received",payload)
        setMessages((state) => [...state, payload]);
       // console.log("message recieved from server", payload)
      })
      return ()=>{
        socket.removeListener(combinedId)
      }
    }
  },[user,receiver])

 // console.log(messages)

  console.log(receiver)
  return (
    <>
     <div>
      <HMSContext.Provider 
      value={{
        option,
        setOption,
        fetchAllPatients,
        patients,
        filterPatients,
        chatUsers,
        setReceiver,
        receiver,
        sendMessage,
        messages,
        sendFile
        }}>
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
          <Route 
          path='/video-call/:roomId'
          element={
          <LoginWrapper>
            <VideoCall/>
          </LoginWrapper>
          }
          />
          <Route 
          path='/admin-dashboard'
          element={
            <AdminWrapper>
              <AdminDashboard />
            </AdminWrapper>
          }
          />
        </Routes>
        </HMSContext.Provider>
     </div>
    </>
  )
}

export default App
