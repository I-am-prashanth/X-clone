import express from "express";
import ProctectRoute from "../middleware/ProctectRoute.js";
import { allNotifications } from "../controllers/notification.controller.js";

const router=express.Router();

router.post("/all",ProctectRoute,allNotifications);
// router.del("/delete",ProctectRoute,deleteNotifications);

export default router;