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
        required: false,
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
        default:"https://static-00.iconduck.com/assets.00/profile-icon-2048x2048-yj5zf8da.png"
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