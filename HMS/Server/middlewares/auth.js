import {validationResult} from "express-validator"
import jwt from "jsonwebtoken"
import User from "../models/User.js";

const ValidateBodyData = (req,res,next)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
  
    return res.status(400).json({success: false,message:result.array()[0]['msg'] });
}

const isLoggedIn = (req,res,next)=>{
    console.log(req.headers)
    try {
        const token = req.headers["authorization"]
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        // inject user if from token to request
      } catch(err) {
        return res.status(400).json({success: false,message:"Invalid token" });

      }
}
// authorisation
const isAdmin = async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if(user && user.role == "admin"){
        return next();
    }
    return res.status(401).json({success: false, message: "Admin can acess this route"})
}
const isDoctor = async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if(user && user.role == "doctor"){
        return next();
    }
    return res.status(401).json({success: false, message: "doctors can acess this route"})
}
const isPatient = async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if(user && user.role == "patient"){
        return next();
    }
    return res.status(401).json({success: false, message: "Patient can acess this route"})
}

export {ValidateBodyData,isLoggedIn, isAdmin, isPatient,isDoctor};  