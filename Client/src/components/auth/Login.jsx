import React, { useEffect, useState } from 'react'
import images from '../../assets/images.jpg'
import '../../App.css'
import { loginAction } from '../../redux/slices/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email,setEmail]= useState("rabianuzha12@gmail.com");
  const [password,setPassword]= useState("4d271eae-fefc-4819-bccd-40898422ba7f")

  console.log(email,password)

  const {authloading,autherror,loginsuccess,user}=useSelector(state=>state.authReducers)

  const dispatch = useDispatch();
  const handleLogin = ()=>{
    //dispatch the action
    dispatch(loginAction({email,password}))

  }
  useEffect(()=>{
    if(autherror !=null){
      toast.error(autherror)
    }
  },[autherror])

  const navigate = useNavigate();
  useEffect(()=>{
    if(loginsuccess == true){
      if (user && user.role == "doctor") 
        navigate("/doctor-dashboard");
      else if (user && user.role == "patient") 
        navigate("/patient-dashboard");

    }
  },[loginsuccess])
  return (
    <div>
       <img className='vh-100 vw-100'
      src={images}
      />
      <div className='main-container'>
      <div className='position-relative'>
      <div className='position-absolute bottom-0 end-50 translate-middle'>
      <form>
        <div className='mb-3'>
          <label className='text-color'>Email Address</label>
          <input 
          type='email'
          className='form-control'
          onChange={e=>setEmail(e.currentTarget.value)}
          value={email}
          />
        </div>
        <div className='mb-3'>
          <label className='text-color'>Password</label>
          <input 
          type='password'
          className='form-control'
          onChange={e=>setPassword(e.currentTarget.value)}
          value={password}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input"/>
          <label className="form-check-label text-color">Remember Me</label>
        </div>
        <button onClick={handleLogin}
        disabled = {authloading}
        type="button" className="btn btn-primary">
        {authloading ? "Loading..." : "Login" }
        </button>
      </form> 
      <p className='mt-1'>Don't have an account? 
      <Link to='/signup'>Register</Link>  
      </p>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Login