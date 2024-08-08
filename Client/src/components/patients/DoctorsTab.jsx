import React, { useEffect, useState } from "react";
import "../../App.css";
import { getAllDoctorsAction,getAllDepartmentsAction, filterDoctors } from "../../redux/slices/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../common/userCard/UserCard";


const DoctorsTab = () => {
    const {doctors,departments,loading,error}= useSelector((state)=>state.patientReducers)
    const dispatch = useDispatch();

    const {user}=useSelector(state=>state.authReducers)
    //fetch all the doctors and departments
    useEffect(()=>{
        dispatch(getAllDoctorsAction({token: user.token}))
        dispatch(getAllDepartmentsAction({token: user.token}))
    },[])

    //states to store form data
    const [name,setName]= useState("")
    const [department,setDepartment]= useState("all")

    const handleFilter =(e)=>{
        e.preventDefault();
        console.log(name,department);
        dispatch(filterDoctors({name,departmentId:department,token:user.token}))
    }
    return (
        <div className="mt-3">
            <form 
            onSubmit={handleFilter}
            className="d-flex mt-2 mb-2 gap-2">
                <div className="form-group">
                <label>Search by name</label>
                <input 
                type="text" 
                onChange={(e)=>setName(e.currentTarget.value)}
                value={name}
                className="form-control"/>
                </div>
                <div className="form-group">
                <label>Choose department</label>
                <select 
                onChange={(e)=>setDepartment(e.currentTarget.value)}
                value={department}
                className="form-select">
                    <option value="all">All Departments</option>
                    {
                        departments?.map((item,index)=>{
                            <div>
                                <option key={index} value={item._id}>{item.name}</option>
                            </div>
                        })
                    }
                   
                </select>
                </div>

                <div className="form-group m-1">
                    <button className="btn btn-primary mt-3">Apply Filter</button>
                </div>
         </form>
            <div>
            <div className="row mt-2">
            { doctors?.length == 0 && (
                <p className="text-center">No doctors found !</p>
            )}
            {doctors?.map((item, index) => (
            <div key={index} className="col col-4">
                <UserCard
                bio={item.about}
                name={item.name}
                email={item.email}
                address={item?.address}
                pic={item.profilePic}
                department={item?.departmentId?.name}
                />
            </div>
            ))}
             </div>
            </div>
        </div>
    );
};

export default DoctorsTab;
