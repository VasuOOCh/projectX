import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required : true
    },
    avatar : {
        type: String,
        default : "https://images.pexels.com/photos/4009599/pexels-photo-4009599.jpeg?auto=compress&cs=tinysrgb&w=600"
    }

}, {timestamps : true})

export const User = mongoose.models?.User || mongoose.model("User", userSchema);