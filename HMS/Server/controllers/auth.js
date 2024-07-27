import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendJsonResponse } from "../utils/general.js";
import nodemailer from "nodemailer";

const signup = async(req,res)=>{
    try{
        const {name,email, password,gender}= req.body;

        //check if email already exists
        const existingUser = await User.findOne({email: email});
        if(existingUser)
        {
            return sendJsonResponse(400,false,"Email already in use",res)
        }
        // hash password
        bcrypt.hash(password,10, async function(err, hash) {
        //create account
        const newUser = new User({email,password : hash,gender,name});
        await newUser.save();

         //Email verification
         let token = jwt.sign({_id:newUser._id},"process.env.JWT_SECRET")

         //send token to user email
         const url =`http://localhost:8000/auth/verify-account/${token}`
         var transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
               user: process.env.EMAIL,
               pass: process.env.EMAIL_PASSWORD
             }
           });
           transporter.sendMail({
             from: "rabianuzha@gmail.com",
             to: email,
             subject: "verify your account",
             html: 
             `
             <h1>Dear ${name}, Thanks for signing up with us</h1>
             <p>Click on the below link to verify your email</p>
             <a href=${url}>Click here</a>
             `
           })

        return sendJsonResponse(200,true,"Account created",res)
        });    
    }catch(err){
        return sendJsonResponse(500,false,err.message,res)
    }
    
};

const login = async(req,res)=>{
    try{
        const {email,password}= req.body;

        // check if email is correct
        const user = await User.findOne({email})
        if(!user){
            return sendJsonResponse(400,false,"Invalid Email",res)
        }
        // compare password
        bcrypt.compare(password, user.password, function(err, result) {
           if(!result){
            return sendJsonResponse(400,false,"Invalid Password",res)
           }
           else{
            // sign token and return back to user
            const token = jwt.sign({
                _id: user._id,
              }, process.env.JWT_SECRET, { expiresIn: '1h' });
              return res.status(200).json({sucess: true, token: token})
           }
        });
    }
    catch(err){
        return sendJsonResponse(500,false,err.message,res)
    }
};
async function verifyEmail(req,res){
    try {
        const token = req.params.token;
        var decoded = jwt.verify(token, 'process.env.JWT_SECRET');
        await User.findByIdAndUpdate(decoded._id,{emailVerified: true})
        return sendJsonResponse(200,true,"your email is verified",res)
        console.log(decoded)
      } catch(err) {
        return sendJsonResponse(400,false,"Invalid Link",res)
      }
    
}
export {signup,login,verifyEmail};
