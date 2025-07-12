import express from "express"
import { getme, login, logout, signup } from "../controllers/auth.controller.js"
import ProctectRoute from "../middleware/ProctectRoute.js";

const router=express.Router()


router.get("/me",ProctectRoute,getme);

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

export default router