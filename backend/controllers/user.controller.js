import Users from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import bcrypt from "bcryptjs"

import { v2 as cloudinary } from "cloudinary";

export const getuserprofile=async (req,res)=>{
    const {username}=req.params;

    try{
        const user=await Users.findOne({username}).select("-password")
        if(!user){
            res.status(404).json({message:`cant able to find user`})
        }
        res.status.json(user);
    }catch(error){
        console.log("user at user profile:",error.message);
        res.status(500).json({message:"error accored internal error"})
    }
}

export const followunfollowUser= async(req,res)=>{
    const {id}=req.params;
    try{
        console.log("backend is called",id)
        const usertomodify=await Users.findById(id);
       const current=await Users.findById(req.user._id);

       if(id === req.user._id){
        return res.status(500).json({message:"you cant follow your own id"})
       }

       if(!usertomodify || !current){
        return res.status(500).json({message:"user not found"})
       }

        // const user=await Users.followers.findById(id);
        // if(!user){
        //     console.log("unnable to find follower")
        //     res.status(404).json({message:"unable to find the user"})
        // }

        const isfollowing=current.following.includes(id);
        console.log("is following:",isfollowing)
        if(isfollowing){
            console.log("follwing the user")
            await Users.findByIdAndUpdate(id,{$pull:{followers:req.user._id}})
            await Users.findByIdAndUpdate(req.user._id,{$pull:{following:id}})
            res.status(201).json({message:"unfollowed the user"})
            const newnotification=new Notification({
                from:current,
                to:req.user._id,
                notify:'follow'
            })
            await newnotification.save();

        }
        else{
            console.log("unfollwing the user")
            await Users.findByIdAndUpdate(id, {$push:{followers:req.user._id}})
            await Users.findByIdAndUpdate(req.user._id, {$push:{following:id}})
            res.status(201).json({message:"followed the user"})
            const newnotification=new Notification({
                from:req.user._id,
                to:current,
                notify:'follow'
            })
            await newnotification.save();
        }
        console.log(req.user._id,"  ",req.user.following)

    }catch(error){
        console.log("error occured at unfllowing:",error.message)
        res.status(500).json({message:"error accured at unfollowing"})
    }
}

export const getsuggestion=async (req,res)=>{
    try{
        // const {id}=req.params;
        const userid=req.user._id;
        const usersFollowedBy=await Users.findById(userid).select("following");
        const users=await Users.aggregate([
            {
                $match:{
                    _id:{$ne:userid}
                }
            },
            {$sample:{size:10}}
        ])

        const filterruser=users.filter(user=>!usersFollowedBy.following.includes(user._id));
        const suggestion=filterruser.slice(0,4);
        suggestion.forEach(user=>user.password=null)

        res.status(200).json(suggestion)


    }catch(error){
        console.log("error accored",error);
        res.status(500).json({message:"internal error"})
    }
}

export const updateUser=async(req,res)=>{
    const {fullname,email,username,currentpassword,newpassword,bio,link}=req.body;
    let {profileImg,coverImg}=req.body;
    const id=req.user._id;
    console.log("hello",currentpassword," ",req.user.password)
    try{
        let pass=currentpassword;
        // const user=await Users.findById(id);
        const user=await Users.findOne({ _id: id })
        if(!user){
            return res.status(404).json({message:"user notfound/token expries"})
        }
        if(currentpassword && newpassword){
            const checkpassword=await bcrypt.compare(currentpassword,req.user.password);
            console.log("comparation is completed")
            
            if(checkpassword){
                if(currentpassword.length<6){
                    return res.status(400).json({error:"the length of password should be atleast 6"})
                }
                const salt=await bcrypt.genSalt(10);
                const haspass=await bcrypt.hash(newpassword,salt);
                pass=haspass
            }
        
            else{
                return res.status(400).json({error:"enter current password"})
            }}
            console.log("profileImg")
        if(profileImg){
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split(".")[0]);

            }
          const uploadedImg=  await cloudinary.uploader(profileImg);
          profileImg=uploadedImg.secure_url;

        }
        console.log("CoverImg")
        if(coverImg){
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0])
            }
            const uploadedImg=await cloudinary.uploader(coverImg);
            coverImg=uploadedImg.uploadedImg.secure_url;
        }

        
        user.fullname=fullname || user.fullname;
        user.email=email ||user.email,
        user.username=username || user.username,
        user.password=pass || user.password;
        user.bio=bio || user.bio;
        user.link=link || user.link,
        user.profileImg=profileImg || user.profileImg,
        user.coverImg=coverImg || user.coverImg

        await user.save();

        user.password=null;
        res.status(200).json(user)

        



    }catch(error){
        console.log("error occured:",error);
        res.status(500).json({message:error.message})
    }
}

