import express from "express";
import authRoute from "./routes/auth.route.js";
// import { configDotenv } from "dotenv";
import  { configDotenv } from "dotenv"
import connectdb from "./connectdb.js";

configDotenv()

// console.log(process.env.MONGO_DB)




const app=express();

app.use(express.json())

app.use("/api/auth",authRoute)

app.get("/",(req,res)=>{
    res.send("<h1 >prashanth</h1>")
})





app.listen(process.env.PORT||5000,()=>{
    connectdb();
    console.log("server is running at 5000 port")
})