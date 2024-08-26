import express from "express"
import mongoose from "mongoose";
import cors from "cors";
import {Server} from "socket.io";

// import routes
import authRoutes from './routes/auth.js'
import adminRoutes from "./routes/admin.js"
import doctorRoutes from "./routes/doctor.js"
import patientRoutes from "./routes/patient.js"

import {sendMessage} from "./controllers/chat.js"
import aws from "aws-sdk";

//connect to aws s3
aws.config.update({
    secretAccessKey:process.env.secretAccessKey,
    accessKeyId:process.env.accessKeyId,
    region:process.env.region,
});

const myBucket = new aws.S3();

import { isLoggedIn,isAdmin, isPatient,isDoctor } from "./middlewares/auth.js";

import dotenv from "dotenv"

//configure env
dotenv.config();

//const PORT = 8000
const Port = process.env.PORT || 8000

const app = express();

//configure middlewares
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"]
}))

//configure routes
app.use("/auth",authRoutes);

app.use("/admin",isLoggedIn,isAdmin,adminRoutes);

app.use("/doctor",isLoggedIn,isDoctor,doctorRoutes)

app.use("/patient",isLoggedIn,isPatient,patientRoutes)

//connect to db
mongoose.connect(process.env.DB_URL)
.then(()=>{
    const myapp = app.listen(Port,()=>console.log("Port running on 8000"))
    // start the socket server
    const io = new Server(myapp, {
        cors: {
          origin: ["http://localhost:5173"],
        },
        
    })
    io.on('connection', (socket) => {
        console.log('connected',socket.id);
        socket.on("disconnect",()=>{
            console.log("client disconnected",socket.id)
        })
        socket.on("send-message",async(payload)=>{
            //console.log("send mesage event occurred", payload)
            let chat = await sendMessage(
                payload.sender, 
                payload.receiver, 
                payload.message
            )
            console.log("Message saved in db emit for all clients",chat)
            io.emit(chat.combinedId, chat)
        })
        socket.on("send-file",async(payload)=>{
            //console.log("sending file", payload)
            const sender = payload.sender;
            const receiver = payload.receiver;
            const file = payload.file;
            const filename = payload.filename;

            console.log(payload)
            // upload file to bucket
            const params = {
                Bucket: "myhmsbucket14",
                Key: filename,
                Body: file
            }
            myBucket.upload(params,async(err,data)=>{
                if(err){
                    console.log("Failed to upload file",err)
                }
                else{
                    const url = data.Location
                    let chat = await sendMessage(sender,receiver,url, true)
                    console.log(chat)
                    io.emit(chat.combinedId,chat)
                }
            })
        })
     });
  
    })

.catch((err)=>{
    console.log("Failed to connect to DB")
    console.log(err)
    process.exit();
})

