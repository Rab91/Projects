import React, { useEffect, useRef, useState } from 'react'
import { BASE_URL } from '../../../config'
import {toast}from "react-toastify"
import { useSelector } from 'react-redux'
import Chart from 'chart.js/auto'
import '../../App.css'

const AdminDashboard = () => {
    const {user} = useSelector((state)=>state.authReducers)
    const [departments,setDepartments]=useState([])

    const [departmentName,setDepartmentName]= useState("")

    const [doctors,setDoctors]= useState("")
    const addDepartment = ()=>{
            fetch(`${BASE_URL}/admin/create-department`,{
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": user?.token,
                },
                body: JSON.stringify({name: departmentName})
          })
          .then(res=>res.json())
          .then((data)=>{
            if(data.success){
                toast.success("Department created")
                fetchAddDepartments()
                setDepartmentName("");
            }
            else{
              toast.error(data.message)
            }
          })
          .catch(err=>toast.error(err.message))
    }
    const fetchAddDepartments = ()=>{
        fetch(`${BASE_URL}/admin/departments`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": user?.token,
              },
        })
        .then(res=>res.json())
        .then((data)=>{
          if(data.success){
            setDepartments(data.departments)
          }
          else{
            toast.error(data.message)
          }
        })
        .catch(err=>toast.error(err.message))
    }
    const [name,setName]= useState("")
    const [email,setEmail]= useState("")
    const [departmentId,setDepartmentId]= useState("")
    const [gender,setGender]= useState("female")

    const addDoctor = ()=>{
        fetch(`${BASE_URL}/admin/create-doctor`,{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": user?.token,
            },
            body: JSON.stringify({
                name,
                email,
                gender,
                department_id: departmentId
            })
      })
      .then(res=>res.json())
      .then((data)=>{
        if(data.success){
            toast.success("Doctor Account created")
            fetchAddDoctors()
        }
        else{
          toast.error(data.message)
        }
      })
      .catch(err=>toast.error(err.message))
    }
    const fetchAddDoctors = ()=>{
        fetch(`${BASE_URL}/admin/doctors`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": user?.token,
              },
        })
        .then(res=>res.json())
        .then((data)=>{
          if(data.success){
            setDoctors(data.doctors)

          }
          else{
            toast.error(data.message)
          }
        })
        .catch(err=>toast.error(err.message))
    }
    const resetPasswordApi = (accountId)=>{
        fetch(`${BASE_URL}/admin/reset-password`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": user?.token,
              },
              body: JSON.stringify({
                  accountId,
              })
        })
        .then(res=>res.json())
        .then((data)=>{
          if(data.success){
              toast.success(data.message)
          }
          else{
            toast.error(data.message)
          }
        })
        .catch(err=>toast.error(err.message))
    }
    const resetPassword = (accountId)=>{
        let action = confirm("Are you sure you want to reset password?")
        if(action == true){
            resetPasswordApi(accountId)
        }
    }
    useEffect(()=>{
        fetchAddDepartments()
        fetchAddDoctors()
    },[])

    const barChartRef = useRef(null)
    const pieChartRef = useRef(null)

    const [barChartDeparment,setBarChartDepartment]= useState([])
    const [barChartCounts,setBarChartCounts] = useState([])
    const drawBarChart = ()=>{
        const ctx = barChartRef.current.getContext("2d");

        const myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: barChartDeparment,
            datasets: [
              {
                label: "Departments",
                data: barChartCounts,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
    
        return myChart;
    }
    useEffect(()=>{
       let myChart = drawBarChart()
       return ()=>{
        myChart.destroy()
       }
    },[barChartDeparment,barChartCounts])

    const [pieChartDeparment,setPieChartDepartment]= useState([])
    const [pieChartCounts,setPieChartCounts] = useState([])
    const drawPieChart = ()=>{
        const ctx = pieChartRef.current.getContext("2d");

        const myChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: pieChartDeparment,
            datasets: [
              {
                label: "Bookings",
                data: pieChartCounts,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Booking by Departments",
              },
            },
          },
        });
    
        return myChart;
    }
    useEffect(()=>{
        let myChart = drawPieChart()
        return ()=>{
         myChart.destroy()
        }
     },[pieChartDeparment,pieChartCounts])
    const fetchDoctorsEachDepartment = ()=>{
        fetch(`${BASE_URL}/admin/doctors-in-department`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": user?.token,
              },
        })
        .then(res=>res.json())
        .then((data)=>{
          if(data.success){
            setBarChartDepartment(data.departments)
            setBarChartCounts(data.counts)
          }
          else{
            toast.error(data.message)
          }
        })
        .catch(err=>toast.error(err.message))
    }
    const fetchBookingsEachDepartment = ()=>{
        fetch(`${BASE_URL}/admin/bookings-in-department`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": user?.token,
              },
        })
        .then(res=>res.json())
        .then((data)=>{
          if(data.success){
            setPieChartDepartment(data.departments)
            setPieChartCounts(data.counts)
          }
          else{
            toast.error(data.message)
          }
        })
        .catch(err=>toast.error(err.message))
    }
    useEffect(()=>{
        fetchDoctorsEachDepartment()
        fetchBookingsEachDepartment()
    },[])
  return (
    <div>
    <h5 className='text-center m-1 text-color'>Admin Dashboard</h5>
    <div className='d-flex justify-content-evenly'>
        <div className='border m-2 p-3'>
            <canvas ref={barChartRef}/>
        </div>
        <div className='border m-2 p-3'>
            <canvas ref={pieChartRef}/>
        </div>
    </div>
    <hr/>
    <div className='m-3 d-flex'>
        <div>
            <div className='border-bottom p-1'>
            <h5 className='text-color'>Add Department</h5>
            <form 
            onSubmit={(e)=>{
                e.preventDefault()
                addDepartment()
            }
            }>
            <div className='d-flex input-group my-2'>
                <input 
                type='text'
                className='form-control rounded border'
                placeholder='Enter department Name'
                onChange={(e)=>setDepartmentName(e.currentTarget.value)}
                value={departmentName}
                />
                <button 
                type='submit'
                className='btn btn-primary btn-sm'>Add Department</button>
            </div>  
            </form>
            </div>
            <div className='border-bottom p-2'>
            <h5 className='text-color'>Add Doctor</h5>
            <form
            onSubmit={(e)=>{
                e.preventDefault()
                addDoctor()
            }}
            >
            <div className='d-flex'>
            <input 
                type='text'
                className='form-control rounded border'
                placeholder='Full Name'
                onChange={(e)=>setName(e.currentTarget.value)}
                value={name}
            />
            <input 
                type='email'
                className='form-control mx-2 rounded border'
                placeholder='Email'
                required
                onChange={(e)=>setEmail(e.currentTarget.value)}
                value={email}
            />
            </div>
            <div className='d-flex mt-3'>
            <select 
            required
            className="form-select" 
            onChange={(e)=>setGender(e.currentTarget.value)}
            value={gender}
            aria-label="Default select example">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="others">Others</option>
            </select>

            <select 
            required
            onChange={(e)=>setDepartmentId(e.currentTarget.value)}
            value={departmentId}
            className="form-select mx-2" aria-label="Default select example">
                {
                    departments.map((item,index)=>{
                        return (
                            <option 
                            key={index}
                            value={item._id}>
                                {item.name}
                            </option>
                        ) 

                    })
                }
            </select> 
            </div>
            <button 
                type='submit'
                className='btn btn-primary mt-2 btn-sm'>Add Doctors</button>
            </form>
            </div>
        </div>
        <div className='border-start p-1 mx-2 '>
            <div 
            style={{ maxHeight: "300px", overflow: "scroll"}}
            >
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Department</th>
                    <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        doctors && doctors.map((item,index)=>{
                            return (
                                <tr key={index}>
                                    <th scope="row">{item?.name}</th>
                                    <td>{item?.email}</td>
                                    <td>{item?.departmentId?.name}</td>
                                    <td>
                                        <button 
                                        onClick={()=>resetPassword(item._id)}
                                        className=' btn btn-primary btn-sm'>
                                            Reset Password
                                        </button>
                                    </td>
                                </tr>
                            ) 
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AdminDashboard