import express from "express";
const router = express.Router();

// controllers
import {
    bookingEachDepartment, 
    createDepartment, 
    createDoctorAccount, 
    doctorsEachDepartment, 
    getAllDepartments, 
    getAllDoctors, 
    resetPassword
}from "../controllers/admin.js"

router.post("/create-doctor",createDoctorAccount)
router.post("/create-department",createDepartment)
router.get("/departments", getAllDepartments)
router.get("/doctors",getAllDoctors)
router.post("/reset-password",resetPassword)
router.get("/doctors-in-department",doctorsEachDepartment)
router.get("/bookings-in-department",bookingEachDepartment)


export default router;