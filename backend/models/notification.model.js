import mongoose from "mongoose";
import Users from "./user.model.js";


const notificationSchema=new mongoose.Schema({

    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    notify:{
        type:"String",
        required:true,
        enum:['follow','like']
    },
    read:{
        type:Boolean,
        default:false
    }

},{});

const Notification=mongoose.model("Notification",notificationSchema);

export default Notification