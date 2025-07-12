import mongoose from "mongoose";
import Post from "./post.model.js";

const userSchema=mongoose.Schema({
    username:{
        required:true,
        type:String,
        unique:true
    },
    fullname:{
        required:true,
        type:String
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[]
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[]
}],
    profileImg:{
        type:String,
        default:""
    },
    coverImg:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    },
    likedpost:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        default:[]
    }]
    

    
},{timestamps:true})

const Users=mongoose.model("User",userSchema);
export default Users

