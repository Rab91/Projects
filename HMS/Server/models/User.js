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
    phone: String,
    about: String,
    address: {
        state: String,
        street: String,
        city: String,
        zip: String,
    }

})
export default mongoose.model("HMSUsers",UserSchema)