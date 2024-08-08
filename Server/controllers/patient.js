import Department from "../models/Department.js";
import User from "../models/User.js";
import {sendJsonResponse} from '../utils/general.js'

const fetchAllDoctors =async(req,res)=>{
    let doctors = await User.find({role: "doctor"})
    .select( "name email profilePic about address departmentId")
    .populate("departmentId")

    return res.status(200).json({success: true,doctors})
}

const fetchAllDepartments =async(req,res)=>{
    let departments = await Department.find();
    return res.status(200).json({success: true,departments})
}

const filterDoctorByDepartment = async(req,res)=>{
    try{
        const {name,departmentId}= req.query;

        if(name.length > 0 && departmentId!="all"){
            let results = await User.find({
                role: "doctor",
                $text:{$search: name},
                departmentId:departmentId
            })
            .populate("departmentId")
            return res.status(200).json({success: true, doctors:results})
        }
        if(departmentId=='all'){
            let results = await User.find({
                role: "doctor",
                $text:{$search: name},
            })
            .populate("departmentId")
            return res.status(200).json({success: true, doctors:results})
        }
        else if(name.length == 0){
            let results = await User.find({
                role: "doctor",
                departmentId: departmentId
            })
            .populate("departmentId")
            return res.status(200).json({success: true, doctors:results})
        }
        return res.status(200).json({success: true, doctors:[]})

    }
    catch(err){
        return sendJsonResponse(500,false,err.message,res)
    }
}
export {fetchAllDoctors,fetchAllDepartments,filterDoctorByDepartment};