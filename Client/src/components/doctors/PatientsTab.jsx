import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import UserCard from "../common/userCard/UserCard";
import { HMSContext } from "../../../HMSContext";

const PatientsTab = () => {
    //states to store form data
    const [query,setQuery]= useState("")
    const {patients,fetchAllPatients,filterPatients}=useContext(HMSContext)
    const handleFilter =(e)=>{
        e.preventDefault();
        filterPatients(query);
    }
    useEffect(()=>{
        fetchAllPatients()
    },[])
    return (
        <div className="mt-3">
            <form 
            onSubmit={handleFilter}
            className="d-flex mt-2 mb-2 gap-2">
                <div className="form-group">
                <label>Search by name or email</label>
                <input 
                type="text" 
                onChange={(e)=>setQuery(e.currentTarget.value)}
                value={query}
                className="form-control"/>
                </div>
                
                <div className="form-group m-1">
                    <button className="btn btn-primary mt-3">Apply Filter</button>
                </div>
                <div className="form-group m-1">
                    <button 
                    type="button"
                    onClick={()=>{
                        setQuery("")
                        fetchAllPatients()
                    }}
                    className="btn btn-primary mt-3">Reset</button>
                </div>
            </form>
            <div>
            <div className="row mt-2">
            { patients?.length == 0 && (
                <p className="text-center">No patients found !</p>
            )}
            {patients?.map((item, index) => (
            <div key={index} className="col col-4">
                <UserCard
                bio={item.about}
                name={item.name}
                email={item.email}
                address={item?.address}
                pic={item.profilePic}
                isSlotButtonRequired={false}
                id = {item._id}
                />
            </div>
            ))}
             </div>
            </div>
        </div>
    );
};

export default PatientsTab;
