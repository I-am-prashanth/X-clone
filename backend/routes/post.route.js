import express from "express";
import ProctectRoute from "../middleware/ProctectRoute.js";
import { addpost, allposts, commentonpost, deletepost, getfollowers, getlikedpost, LikeUnlike } from "../controllers/post.controller.js";

const router=express.Router();

router.get("/",ProctectRoute,allposts)

router.get("/likedpost/:id",ProctectRoute,getlikedpost)
router.get("/follwing",ProctectRoute,getfollowers)

router.post("/addpost",ProctectRoute,addpost)
router.post("/like/:postid",ProctectRoute,LikeUnlike)
router.post("/comment/:postid",ProctectRoute,commentonpost)
router.delete("/delete/:id",ProctectRoute,deletepost)


export default router;