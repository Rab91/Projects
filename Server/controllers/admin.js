import User from "../models/User.js";
import Department from "../models/Department.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt"
import { sendJsonResponse } from "../utils/general.js";
import nodemailer from "nodemailer";
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

        //check if department id is valid or not
        const department = await Department.findById(department_id)
        if(!department){
            return sendJsonResponse(400,false,"Wrong department ID",res)

        }
        console.log("department", department_id)

        //autogenerate a password
        let password = uuidv4()

        // hash password
        bcrypt.hash(password,10, async function(err, hash) {
        //create account
        const newUser = new User({
            email,
            password : hash,
            gender,
            name,
            emailVerified: true,
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
    return res.status(200).json({sucess: true,message: "department created",newDepartment})

}
export {createDoctorAccount,createDepartment};