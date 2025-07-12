import express from "express";
import  { configDotenv } from "dotenv"
import { v2 as cloudinary } from "cloudinary";
import authRoute from "./routes/auth.route.js";
import userrouth from "./routes/user.routh.js"
import authpost from "./routes/post.route.js";
import notificationRoute from "./routes/notificationrouter.js";
import connectdb from "./connectdb.js";
import cookieParser from "cookie-parser";



configDotenv()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API,
    api_secret:process.env.CLOUDINARY_API_KEY,
});




const app=express();

app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use("/api/auth",authRoute)

app.use("/api/user",userrouth)

app.use("/api/posts",authpost);

app.use("/api/notification",notificationRoute)

app.get("/",(req,res)=>{
    res.send("<h1 >prashanth</h1>")
})





app.listen(process.env.PORT||5000,()=>{
    connectdb();
    console.log("server is running at 5000 port")
})