import Department from "../models/Department.js";
import User from "../models/User.js";
import {sendJsonResponse} from '../utils/general.js'
import Slots from "../models/Slots.js";
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
            .select("name email profilePic about address departmentId")
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
const slotOfDoctor = async(req,res)=>{
    const {doctorId}=req.params;
    const slots = await Slots.find({
        openedBy: doctorId,
        isBooked: false,
    }).populate("openedBy", "name email profilePic");
    return res.status(200).json({success: true,slots})


}
const bookSlot = async(req,res)=>{

    const {slotId}=req.params
    const slot = await Slots.findOne({
        _id: slotId,
        isBooked: false
    })
    if(!slot){
        return sendJsonResponse(400,false,"Invalid slot id",res)

    }
    slot.isBooked = true
    slot.bookedBy = req.user._id

    await slot.save()
    return sendJsonResponse(200,true,"Slot is booked",res)


}

const getAllAppoinments =async(req,res)=>{
    const slots = await Slots.find({
        bookedBy:req.user._id
    }).populate("openedBy","name email profilePic _id")
    return res.status(200).json({success: true,slots})

}
export {fetchAllDoctors,fetchAllDepartments,filterDoctorByDepartment,slotOfDoctor,bookSlot,getAllAppoinments};