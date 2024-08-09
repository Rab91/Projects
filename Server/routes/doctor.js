import express from "express";
const router = express.Router();

// controllers
import {searchPatients,fetchAllPatients, openSlot, getAllSlots, deleteSlots}from "../controllers/doctor.js"
router.get("/all-patients",fetchAllPatients)
router.get("/search-patients",searchPatients)
router.post("/open-slot",openSlot)
router.get("/all-slots",getAllSlots)
router.delete("/delete-slot/:id",deleteSlots)


export default router;