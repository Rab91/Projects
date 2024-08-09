import express from "express";
const router = express.Router();

// controllers
import {bookSlot, fetchAllDepartments, fetchAllDoctors, filterDoctorByDepartment,getAllAppoinments,slotOfDoctor}from "../controllers/patient.js"

router.get("/all-doctors",fetchAllDoctors)
router.get("/all-departments",fetchAllDepartments)

router.get("/filter-doctors",filterDoctorByDepartment)
router.get("/doctor-slots/:doctorId",slotOfDoctor)
router.put("/book-slot/:slotId",bookSlot)
router.get("/all-slots",getAllAppoinments)
export default router;