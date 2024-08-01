import express from "express";
const router = express.Router();

// controllers
import {fetchAllDepartments, fetchAllDoctors}from "../controllers/patient.js"

router.get("/all-doctors",fetchAllDoctors)
router.get("/all-departments",fetchAllDepartments)

export default router;