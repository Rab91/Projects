import User from "../models/User.js";
import Department from "../models/Department.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt"
import { sendJsonResponse } from "../utils/general.js";
import nodemailer from "nodemailer";
import Slots from "../models/Slots.js";
import jwt from "jsonwebtoken"

const createDoctorAccount = async(req,res)=>{
    try{
        const {name,email,gender,department_id}= req.body;

        //check if email already exists
        const existingUser = await User.findOne({email: email});
        if(existingUser)
        {
            return sendJsonResponse(400,false,"Email already in use",res)
        }
        console.log("department", department_id)

        //check if department id is valid or not
        const department = await Department.findById(department_id)
        if(!department){
            return sendJsonResponse(400,false,"Wrong department ID",res)

        }

        //autogenerate a password
        let password = uuidv4()
        console.log(password)
        // hash password
        bcrypt.hash(password,10, async function(err, hash) {
        //create account
        const newUser = new User({
            email,
            password : hash,
            gender,
            name,
            emailVerified: true,
            departmentId: department_id,
            role: "doctor"
        });
        await newUser.save();

         //send email to doctor about the credentials of login and password

         var transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
             user: 'rabianuzha@gmail.com',
             pass: 'process.env.EMAIL_PASSWORD'
           }
         });
         
         var mailOptions = {
           from: 'youremail@gmail.com',
           to: email,
           subject: 'Welcome HIS, Doctor account is created',
           text: `Hi ${name}, a new doctor account is created for you by the admin\n. Use
           the following credentials to login\n
           Email: ${email}\n
           Password: ${password}\n
           
           You can change the password after login!\n
           Thanks!`,

         };
         
         transporter.sendMail(mailOptions, function(error, info){
           if (error) {
             console.log(error);
           } else {
             console.log('Email sent: ' + info.response);
           }
         });


        return sendJsonResponse(200,true,"Account created sucessfully",res)
        });    
    }catch(err){
        return sendJsonResponse(500,false,err.message,res)
    }
}
const createDepartment = async(req,res)=>{
    const {name}= req.body;

    const old = await Department.findOne({name: name})
    if(old){
        return sendJsonResponse(400,false,"Department exist already",res)
    }
    const newDepartment = new Department({
        name: name
    })
    await newDepartment.save()
    return res.status(200).json({success: true,message: "department created",newDepartment})

}
const getAllDepartments = async(req,res)=>{
  let departments = await Department.find()
  return res.status(200).json({success:true,departments})
}
const getAllDoctors = async(req,res)=>{
  let doctors = await User.find({role:"doctor"}).populate("departmentId")
  return res.status(200).json({success:true,doctors})
}
const resetPassword = async(req,res)=>{
  const {accountId}= req.body

  const account = await User.findById(accountId)
  if(!account){
    return sendJsonResponse(400,false,"Account Id is invalid",res)

  }
  //autogenerate a password
  let password = uuidv4()
  console.log(password)
  // hash password
  bcrypt.hash(password,10, async function(err, hash) {
    //updating account
    account.password = hash;
    await account.save();

     //send email to doctor about the credentials of login and password

     var transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: 'rabianuzha@gmail.com',
         pass: 'process.env.EMAIL_PASSWORD'
       }
     });
     
     var mailOptions = {
       from: 'youremail@gmail.com',
       to: account.email,
       subject: 'Welcome HIS, your account password is reset by the admin',
       text: `Hi ${account.name}, your account is reset by the admin\n. Use
       the following new credentials to login\n
       Email: ${account.email}\n
       Password: ${password}\n
       
       You can change the password after login!\n
       Thanks!`,

     };
     
     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });


    return sendJsonResponse(200,true,"Password reset sucessfully",res)
    }); 

}
const doctorsEachDepartment = async(req,res)=>{
  let stats = await User.aggregate([
    {
      $match: {role: "doctor"}
    },
    {
      $group:{
        _id: "$departmentId",
        userCount: {$count:{}}
      }
    }
  ])
  let allDepartments = await Department.find()

  // arrays for sending frontend
  let departments = []
  let counts = []

  //check for each department
  for(let department of allDepartments ){
    departments.push(department.name)
    let departmentCount = 0;
    // find the count in stats for this id
    for(let item of stats){
      if(item._id.toString() == department._id.toString()){
        counts.push(item.userCount);
        break;
      }
    }
  }

  return res.status(200).json({success: true, stats,departments,counts})
}
const bookingEachDepartment = async(req,res)=>{
  //fetch all the slots
  const slots = await Slots.find({isBooked: true}).populate("openedBy")

  // object will store department id
  let obj = {}
  for(let slot of slots){
    let departId = slot.openedBy.departmentId.toString()
    console.log(departId)
    if(obj.hasOwnProperty(departId)){
      obj[departId] = 1
    }
    else{
      obj[departId] += 1
    }
  }

  // arrays for sending frontend
  let departments = []
  let counts = []
  //fetch all departments
  let allDepartments = await Department.find()

  //check for each department
  for(let department of allDepartments ){
    departments.push(department.name)
    if(obj[department._id]){
      counts.push(obj[department._id])
    }
    else{
      counts.push(0)
    }
  }
  return res.status(200).json({success: true,departments,counts})
}
export {
  createDoctorAccount,
  createDepartment, 
  getAllDepartments,
  getAllDoctors,
  resetPassword,
  doctorsEachDepartment,
  bookingEachDepartment
};
