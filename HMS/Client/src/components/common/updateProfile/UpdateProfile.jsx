import React, { useEffect, useState } from "react";
import { updateDetailsAction, updatePasswordAction } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    const [currentPassword,setCurrentPassword]= useState("");
    const [newPassword,setNewPassword]= useState("");
    const [confirmPassword,setConfirmPassword]= useState("");

    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [about,setAbout] = useState("");
    const [city,setCity]= useState("");
    const [state,setState]= useState("");
    const [zip,setZip]= useState("");
    const [street,setStreet]= useState("");

    const dispatch = useDispatch();
    const {authloading,autherror,user}= useSelector(state=>state);

    const handlePasswordUpdate = (e)=>{
        e.preventDefault();
        if(newPassword == confirmPassword){
           dispatch(updatePasswordAction({currentPassword,newPassword,token:user.token,}))
        }else{
            toast.error("Password are not matching")
        }
       
        //console.log(currentPassword,newPassword,confirmPassword);
    }

    const handleUpdateDetails =(e)=>{
        e.preventDefault();
        dispatch(updateDetailsAction({
            name,
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
        }
        else autherror !=null;{
            toast.error(autherror)
        }
    },[autherror])

    return (
        <div className="col">
            <div className="d-flex justify-content-around">
                <div className="flex-column">
                    <h5 className="text-color">Profile</h5>
                    <h5>Rabia</h5>
                    <h6>rabianuzha@gmail.com</h6>
                    <hr />
                    <div className="form-outline">
                        <label className="form-label text-color">About</label>
                        <input 
                        required
                        onChange={(e)=>setAbout(e.currentTarget.value)}
                        type="text" 
                        className="form-control" />
                    </div>
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

                    <div className="row">
                        <button 
                        disabled = {authloading == true}
                        className="btn btn-primary  m-2">
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

            <div className="lead">
                <form onSubmit={handleUpdateDetails}>
                <div className="row">
                    <div className="col">
                        {/* Full Name input */}
                        <div className="form-outline">
                            <label className="form-label">Full Name</label>
                            <input 
                            required
                            onChange={(e)=>setName(e.currentTarget.value)}
                            type="text" 
                            className="form-control" />
                        </div>
                    </div>
                   
                    <div className="col">
                        {/* Email input */}
                        <div className="form-outline">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" />
                        </div>
                    </div>

                    <div className="col">
                        {/* Phone input */}
                        <div className="form-outline">
                            <label className="form-label">Phone</label>
                            <input 
                            required
                            onChange={(e)=>setPhone(e.currentTarget.value)}
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
                            type="text" 
                            className="form-control" />
                        </div>
                    </div>
                </div>
                </form>

                <div className="row">
                    <button className="btn btn-primary w-25 m-2">Update</button>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default UpdateProfile;
