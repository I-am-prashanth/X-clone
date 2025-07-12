import Users from "../models/user.model.js";
import jwt from "jsonwebtoken"

const ProctectRoute=async (req,res,next)=>{
    try{
        // const token=req.cookies.jwt;
        const token=req.cookies.jwt;
        if(!token){
            res.status(401).json({message:"token expried"})
        }

        const decoded=jwt.verify(token,process.env.JWT_SERECT)
        if(!decoded){
            res.status({message:"unvalid user"})
        }
        const user=await Users.findById(decoded.userId)
        if(!user){
            res.status(404).json({message:"user not found in database"});
        }
        req.user=user;
        next();

    }catch(error){
        console.log("error:",error.message)
        res.status(500).json({message:"Invalid user token "
        })
    }

    

}

export default ProctectRoute