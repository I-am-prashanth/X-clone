import mongoose from "mongoose";

const connectdb=async()=>{
    try{
    const conn=await mongoose.connect(process.env.MONGO_DB);
    console.log("sucessfully connected to",conn.connection.host)
    }catch(error){
        console.log("enable to connect to database",error);
    }

}

export default connectdb