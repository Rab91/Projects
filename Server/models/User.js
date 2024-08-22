import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male","female", "others"],
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    role: {
        type: String,
        enum: ["admin", "doctor","patient"],
        default: "patient",
        required: true,
    },
    departmentId: {
        type: mongoose.Types.ObjectId,
        ref: "HMSDepartments",
        required: false, 
    },
    profilePic:{
        type: String,
        required: true,
        default:"https://static.vecteezy.com/system/resources/previews/005/520/145/original/cartoon-drawing-of-a-doctor-vector.jpg"
    },
    phone: String,
    about: String,
    address: {
        state: String,
        street: String,
        city: String,
        zip: String,
    }

})
UserSchema.index({name:"text",email:"text"})
export default mongoose.model("HMSUsers",UserSchema)