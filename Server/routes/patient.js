import express from "express";
const router = express.Router();

// controllers
import {fetchAllDepartments, fetchAllDoctors, filterDoctorByDepartment}from "../controllers/patient.js"

router.get("/all-doctors",fetchAllDoctors)
router.get("/all-departments",fetchAllDepartments)

router.get("/filter-doctors/:name/:departmentId",filterDoctorByDepartment)
export default router;