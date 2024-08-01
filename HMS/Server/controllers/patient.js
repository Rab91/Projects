import Department from "../models/Department.js";
import User from "../models/User.js";

const fetchAllDoctors =async(req,res)=>{
    let doctors = await User.find()
    .select( "name email profilePic about address departmenId")
    .populate("departmentId")

    return res.status(200).json({success: true,doctors})
}

const fetchAllDepartments =async(req,res)=>{
    let departments = await Department.find();
    return res.status(200).json({success: true,departments})
}
export {fetchAllDoctors,fetchAllDepartments};