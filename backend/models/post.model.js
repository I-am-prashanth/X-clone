import mongoose from "mongoose";
import Users from "./user.model.js";


const postSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String
    },
    img:{
        type:String
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',

    }],
    comments:[{
        text:{
            type:String,
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            require:true
        }
    }],
    notify:{
        type:"String",
        // required:true,
        enum:['follow','like']
    },
    read:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

const Post=mongoose.model("Post",postSchema);

export default Post