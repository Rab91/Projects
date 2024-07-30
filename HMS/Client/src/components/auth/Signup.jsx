import React, { useEffect, useState } from 'react'
import images1 from '../../assets/images1.jpeg'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { signupAction } from '../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from "react-toastify"

const Signup = () => {
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [gender,setGender]= useState("female");
  const [firstname,setfirstName]= useState("");
  const [lastname,setLastName]= useState("");

  const dispatch = useDispatch();
  const {authloading,autherror,signupsuccess}= useSelector(state=>state)

  const handleSignup = ()=>{
    dispatch(signupAction({firstname,lastname,email,password,gender}))
  }

  useEffect(()=>{
    if(autherror !=null){
      toast.error(autherror)
    }
  },[autherror])

  const navigate = useNavigate();
  useEffect(()=>{
    if(signupsuccess == true){
      // redirect to login page
      navigate("/")
    }
  },[signupsuccess])
  return (
    <div className='d-flex justify-content-evenly'>
      <img 
      src={images1}
      />
    <div className='p-3 mt-5'>
       <form className='form-row'>
        <div className='mb-3'>
          <input 
          value={firstname}
          onChange={(e)=>setfirstName(e.currentTarget.value)}
          type='text'
          placeholder='First Name'
          className='form-control myInput'
          />
        </div>
        <div className='mb-3'>
          <input 
          value={lastname}
          onChange={(e)=>setLastName(e.currentTarget.value)}
          type='text'
          placeholder='Last Name'
          className='form-control myInput'
          />
        </div>
        <div className="mb-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">@</span>
            </div>
            <input 
             value={email}
             onChange={(e)=>setEmail(e.currentTarget.value)}
            type="text" 
            className="form-control myInput" 
            placeholder="Username" 
            required/>
          </div>
        </div>
        <div className='mb-3'>
          <input 
          value={password}
          onChange={(e)=>setPassword(e.currentTarget.value)}
          type='password'
          placeholder='Password'
          className='form-control myInput'
          />
        </div>
        <div className='mb-3'>
        <select 
        value={gender}
        onChange={(e)=>setGender(e.currentTarget.value)}
        className="form-select">
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="others">Others</option>
        </select>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input"/>
          <label className="form-check-label">Agree to terms and conditions</label>
        </div>
        <button 
        disabled= {authloading}
        onClick={handleSignup}
        type="submit" 
        className="btn btn-primary">
          {
            authloading == true ? "Loading..." : "Sign Up"
          }
        </button>
        <p className='mt-1'>Already have an account?
          <Link to='/'>Login</Link>
        </p>

      </form>
    </div>
    </div>
  )
}

export default Signup