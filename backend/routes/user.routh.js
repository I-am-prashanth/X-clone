import express from "express";
import ProctectRoute from "../middleware/ProctectRoute.js";
import { followunfollowUser, getsuggestion, updateUser } from "../controllers/user.controller.js";

const Router=express.Router();

Router.post("/follow/:id",ProctectRoute,followunfollowUser)

// Router.get("/profile/:username",ProctectRoute,getuserprofile)

Router.post("/update",ProctectRoute,updateUser)

Router.get("/suggetion",ProctectRoute,getsuggestion);


export default Router