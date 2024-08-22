import React, { useEffect, useState,useRef } from "react";
import { updateDetailsAction, updatePasswordAction,fetchDetails } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { BASE_URL } from "../../../../config";
const UpdateProfile = () => {
    const [currentPassword,setCurrentPassword]= useState("");
    const [newPassword,setNewPassword]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("");

    const {authloading,autherror,user}= useSelector(state=>state.authReducers);

    const [phone,setPhone] = useState(user?.phone);
    const [about,setAbout] = useState(user?.about);
    const [city,setCity]= useState(user?.city);
    const [state,setState]= useState(user?.state);
    const [zip,setZip]= useState(user?.zip);
    const [street,setStreet]= useState(user?.street);

    console.log(user)

    const dispatch = useDispatch();

    const handlePasswordUpdate = (e)=>{
        e.preventDefault();
        if(newPassword == confirmPassword){
           dispatch(updatePasswordAction({currentPassword,newPassword,token:user.token,}))
        }else{
            toast.error("Password are not matching")
        }
        }

    const handleUpdateDetails =(e)=>{
        e.preventDefault();
        dispatch(updateDetailsAction({
            phone,
            about,
            street,
            city,
            state,
            zip, 
            token: user.token,
        }))
       
    }
    useEffect(()=>{
        if(autherror != null && autherror == "Details updated"){
            toast.success = "Details updated"
            dispatch(fetchDetails({token: user.token}))

        }
        else autherror !=null;{
            toast.error(autherror)
        }
    },[autherror])
    console.log(authloading);

    const updateProfilePhoto =(file)=>{
        let data = new FormData();
        data.append("profilepic", file);

        fetch(`${BASE_URL}/auth/profile-photo`, {
        method: "POST",
        headers: {
            Authorization: user.token,
        },
        body: data,
        })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Image updated");
          dispatch(fetchDetails({token: user.token}))
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
    }

    const inputRef = useRef(null);

    return (
        <div className="col">
            <div className="d-flex  mt-2 gap-5">
                <div className="flex-column">
                    <h5 className="text-color">Profile</h5>
                    <img     
                    width={70}        
                    height={70}        
                    className="rounded-circle"
                    onClick={()=>inputRef.current.click()}
                    src={user?.profilePic}
                    />
                    <input
                    style={{display: 'none'}}
                    ref={inputRef}
                    onChange={(e)=>updateProfilePhoto(e.currentTarget.files[0])}
                    type="file"
                    accept="image/png, image/jpeg"
                    />
                    <h5 className="mt-2">{user?.name}</h5>
                    <h6>{user?.email}</h6>
                    <hr />
                    <h5 className="text-color">About</h5>
                    <h6>{user?.about}</h6>
                </div>

                <div className="flex-column">
                    <h5 className="text-color">Change Password</h5>

                    <form onSubmit={handlePasswordUpdate}>
                    <div className="form-outline">
                        <label className="form-label">Old Password</label>
                        <input 
                        onChange={(e)=>setCurrentPassword(e.currentTarget.value)}
                        required
                        type="password" 
                        className="form-control" />
                    </div>

                    <div className="form-outline">
                        <label className="form-label">New Password</label>
                        <input 
                        onChange={(e)=>setNewPassword(e.currentTarget.value)}
                        required
                        type="password" 
                        className="form-control" />
                    </div>

                    <div className="form-outline">
                        <label className="form-label">
                            Confirm New Password
                        </label>
                        <input 
                        onChange={(e)=>setConfirmPassword(e.currentTarget.value)}
                        required
                        type="password" 
                        className="form-control" />
                    </div>

                    <div className="row m-1">
                        <button 
                        disabled = {authloading == true}
                        className="btn btn-primary mt-1">
                            {
                                authloading ? "Please wait..." : "Change Password"
                            }
                            
                        </button>
                    </div>
                    </form>
                </div>
            </div>

            <hr />
            <h5 className="text-color">Personal Details</h5>
            <form onSubmit={handleUpdateDetails}>

            <div className="lead">
                <div className="row">
                    <div className="col">
                        {/* Full Name input */}
                        <div className="form-outline">
                            <label className="form-label">Full Name</label>
                            <input 
                            disabled
                            value={user?.name}
                            type="text" 
                            className="form-control" />
                        </div>
                    </div>
                   
                    <div className="col">
                        {/* Email input */}
                        <div className="form-outline">
                            <label className="form-label">Email address</label>
                            <input 
                            value={user?.email}
                            disabled
                            type="email" 
                            className="form-control" />
                        </div>
                    </div>

                    <div className="col">
                        {/* Phone input */}
                        <div className="form-outline">
                            <label className="form-label">Phone</label>
                            <input 
                            required
                            onChange={(e)=>setPhone(e.currentTarget.value)}
                            value={phone}
                            type="text" 
                            className="form-control" />
                        </div>
                    </div>       

                    <div className="col">
                    <div className="form-outline">
                        <label className="form-label">About</label>
                        <input 
                        required
                        onChange={(e)=>setAbout(e.currentTarget.value)}
                        value={about}
                        type="text" 
                        className="form-control" />
                    </div>
                    </div> 

                </div>
                <hr />
                <h5 className="text-color">Address</h5>

                <div className="row">
                    <div className="col">
                        {/* Street input */}
                        <div className="form-outline">
                            <label className="form-label">Street</label>
                            <input 
                            required
                            onChange={(e)=>setStreet(e.currentTarget.value)}
                            value={street}
                            type="text" 
                            className="form-control" />
                        </div>
                    </div>
                    <div className="col">
                        {/*City input */}
                        <div className="form-outline">
                            <label className="form-label">City</label>
                            <input 
                            required
                            onChange={(e)=>setCity(e.currentTarget.value)}
                            value={city}
                            type="text" 
                            className="form-control" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        {/* State input */}
                        <div className="form-outline">
                            <label className="form-label">State</label>
                            <input 
                            required
                            onChange={(e)=>setState(e.currentTarget.value)}
                            value={state}
                            type="text" 
                            className="form-control" />
                        </div>
                    </div>
                    <div className="col">
                        {/* Zip input */}
                        <div className="form-outline">
                            <label className="form-label">Zip Code</label>
                            <input 
                            required
                            onChange={(e)=>setZip(e.currentTarget.value)}
                            value={zip}
                            type="text" 
                            className="form-control" />
                        </div>
                    </div>
                </div>
                

                <div className="row">
                    <button 
                    name="submit"
                    className="btn btn-primary w-25 m-2">Update</button>
                </div>
               
            </div>
            </form>
            <hr />
        </div>
    );
};

export default UpdateProfile;
