import Notification from "../models/notification.model.js";


export const allNotifications=async(req,res)=>{
    try{
        const userid=req.user._id;
        const notifications=await Notification.find({to:userid});
        if(!notifications) return res.send([]);
        // const notify=await notifications.json();
        await Notification.updateMany({to:userid},{$set:{read:true}})
        return res.send(notifications);
    }catch(error){
        console.log("error occured while fetching allnotifications",error);
        return res.status(500).json({message:error.message})
    }
}