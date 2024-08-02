import express from "express"
import mongoose from "mongoose";
import cors from "cors";

// import routes
import authRoutes from './routes/auth.js'
import adminRoutes from "./routes/admin.js"
import doctorRoutes from "./routes/doctor.js"
import patientRoutes from "./routes/patient.js"

import { isLoggedIn,isAdmin, isPatient,isDoctor } from "./middlewares/auth.js";

import dotenv from "dotenv"

//configure env
dotenv.config();

const PORT = 8000
const app = express();

//configure middlewares
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"]
}))

//configure routes
app.use("/auth",authRoutes);

app.use("/admin",isLoggedIn,adminRoutes);

app.use("/doctor",isLoggedIn,isDoctor,doctorRoutes)

app.use("/patient",isLoggedIn,isPatient,patientRoutes)

//connect to db
mongoose.connect(process.env.DB_URL)
.then(()=>{
    app.listen(PORT,()=>console.log("Port running on 8000"))
})
.catch((err)=>{
    console.log("Failed to connect to DB")
    process.exit();
})

