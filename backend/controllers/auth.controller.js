import express from "express"

const app=express()

app.use(express.json())

export const signup=async(req,res)=>{
    // console.log("signin")

    res.json({
        data:"you are at signup point",
    })

}

export const login=async(req,res)=>{
    res.json({
        data:"you are at login point"
    })

}

export const logout=async(req,res)=>{
    res.json({
        data:"you are at logout point"
    })

}