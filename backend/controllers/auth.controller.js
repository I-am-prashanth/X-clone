import express from "express"
import bcrypt from "bcryptjs"
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js"
import Users from "../models/user.model.js"
const app=express()

app.use(express.json())

export const signup=async(req,res)=>{
    
    
    try{
        const {fullname, username, email, password}=req.body
        const emailregex=/^\S+@\S+\.\S+$/
        if(!emailregex.test(email)){
            return res.status(400).json({error:"inavlid email fromat"})
        }
        const find_user=await Users.findOne({username})

        if(find_user){
            return res.status(400).json({error:"user already exist"})
        }
        const mail=await Users.findOne({email})

        if(mail){
            return res.status(400).json({error:"user with this email already exists"})
        }

        //hashpassword
        const salt=await bcrypt.genSalt(10);
        const hashpasword=await bcrypt.hash(password,salt);

        const newuser=new Users({
            username:username,
            fullname:fullname,
            email:email,
            password:hashpasword,
            email:email,
            coverImg:"",
            

        })

        if(newuser){
        
            generateTokenAndSetCookie(newuser._id,res);
            await newuser.save()
            res.status(201).json({
                _id:newuser._id,
                fullname:newuser.fullname,
                email:newuser.mail,
                profileImg:newuser.profileImg,
                coverImg:newuser.coverImg,
                bio:newuser.bio,
                followers:newuser.followers,
            
            })
        }
        else{
            res.status(400).json({error:"user not created"})
        }
        



    }catch(error){
        console.log(error)
        res.status(500).json({message:error.message})
    }

}

export const login=async(req,res)=>{
   try{

    const {username,password}=req.body;

    console.log(username,"  ",password)

    const user=await Users.findOne({username})

    const checkpassword=await bcrypt.compare(password,user?.password || "")

    console.log(user,"  ",checkpassword)

    if(!user || !checkpassword){
        return res.status(500).json({error:"Invalid user or check the password"})
    }
    console.log(user," ",checkpassword)

    generateTokenAndSetCookie(user._id,res);
    res.status(200).json({
        _id:user._id,
        username:user.username,
        followers:user.followers
    })


   }catch(error){
    console.log("error while login:",error.message)
    res.status(500).json({error:"check the login details"})
   }

}

export const logout=async(req,res)=>{
   try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"sucessfully logged out"})
   }catch(error){
    console.log("error occured at logout:",error.message)
    res.status(500).json({message:"unable to logout"})
   }

}

export const getme=async(req,res)=>{
    try{
        const user=await Users.findOne(req.user._id).lean().select("-password");
        if(!user){
           return res.status(500).json({message:"user not fount Internal error"})
        }
        // res.send(user)
        res.status(200).json(user);
    }catch(error){
        // console.log
        console.log("error occured at fetching profile",error.message);
       return res.status(500).json({message:error.message})
    }
}

