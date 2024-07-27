import express from "express";
//import controllers
import {signup,login,verifyEmail} from "../controllers/auth.js"
import {body}from "express-validator"

//middlewares
import {ValidateBodyData}from "../middlewares/auth.js"

const router = express.Router();
router.post("/signup",
    body("name").exists().isLength({min:3}).withMessage("Name must be atleast 3 char"),
    body("email").exists().isEmail().withMessage("Invalid Email"),
    body("password").exists().isStrongPassword().withMessage("Password is weak"),
    body("gender").exists().isIn(["male","female","others"]).withMessage("Provide the correct gender"),
    ValidateBodyData,
    signup);
router.post("/login",
    body("email").exists().isEmail().withMessage("Invalid Email"),
    body("password").exists().withMessage("Password is required"),
    ValidateBodyData,
    login);
    
router.get("/verify-account/:token",verifyEmail)

export default router;