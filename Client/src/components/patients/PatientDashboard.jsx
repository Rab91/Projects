import React, { useContext } from "react";
import "../../App.css";
import UpdateProfile from "../common/updateProfile/updateProfile";
import DoctorsTab from "./DoctorsTab";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { HMSContext } from "../../../HMSContext";
import PatientAppointment from "./PatientAppointment";
import Chat from "../chats/Chat";

const PatientDashboard = () => {
    const  {user}=useSelector(state=>state.authReducers)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {option,setOption}=useContext(HMSContext)
    console.log("Option",option)
    return (
        <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline text-color">
                                    Patient Dashboard
                                </span>
                            </div>
                            <ul
                                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                                id="menu"
                            >
                                
                                <li  onClick={()=>setOption("appointments")}>
                                    <a
                                        href="#"
                                        data-bs-toggle="collapse"
                                        className="nav-link px-0 align-middle"  
                                    >
                                        <i className="fs-4 bi-speedometer2" />
                                        <span className="ms-1 d-none d-sm-inline text-color">
                                            Appointments
                                        </span>
                                    </a>
                                </li>
                                <li  onClick={()=>setOption("doctors")}>
                                    <a
                                        href="#"
                                        className="nav-link px-0 align-middle"
                                    >
                                        <i className="fs-4 bi-table" />
                                        <span className="ms-1 d-none d-sm-inline text-color">
                                            Doctors
                                        </span>
                                    </a>
                                </li>
                                <li  onClick={()=>setOption("chats")}>
                                    <a
                                        href="#"
                                        data-bs-toggle="collapse"
                                        className="nav-link px-0 align-middle "
                                    >
                                        <i className="fs-4 bi-bootstrap" />
                                        <span className="ms-1 d-none d-sm-inline text-color">
                                            Chat
                                        </span>
                                    </a>
                                </li>
                                <li  onClick={()=>setOption("profiles")}>
                                    <a
                                        href="#"
                                        data-bs-toggle="collapse"
                                        className="nav-link px-0 align-middle"
                                    >
                                        <i className="fs-4 bi-grid" />
                                        <span className="ms-1 d-none d-sm-inline text-color">
                                            Profile
                                        </span>
                                    </a>
                                </li>

                            </ul>
                            <div className="dropdown">
                                <a
                                className="d-flex align-items-center btn btn-primary dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                >
                                 <img 
                                className="rounded-circle me-2"
                                width={30}
                                height={30}
                                src= {user?.profilePic}
                                />
                                <h6>{user?.name}</h6>
                                </a>
                               
                                <ul className="dropdown-menu">
                                <li>
                                    <a 
                                    onClick={()=>{
                                        dispatch(logout())
                                        navigate("/")
                                    }}
                                    className="dropdown-item" href="#">
                                    Log out
                                    </a>
                                </li>
                                
                                </ul>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div>
                        {
                            option == "updateprofile" && <UpdateProfile/>
                        }
                        {
                            option == "doctors" && <DoctorsTab/>
                        }
                        {
                            option == "appointments" && <PatientAppointment/>
                        }
                        {
                            option == "chats" && <Chat/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
