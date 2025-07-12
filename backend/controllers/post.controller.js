import { v2 as cloudinary } from "cloudinary";
import Users from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";


export const addpost=async(req,res)=>{

    try{
        // console.log(req.body)
        const {text}=req.body;
        let {img}=req.body;
        const userid=req.user._id.toString();
        // console.log("text:",text)
        // console.log("img",img)

        const user=await Users.findById(userid);
        if(!user) return res.status(404).json({error:"user not found"});
        if(!text ) return res.status(400).json({error:"provide all details for post"});
        
        if(img){
            const uploadedimg=await cloudinary.uploader.upload(img);
            img=uploadedimg.secure_url;
        }
        
        const newpost=new Post({
            user:userid,
            text:text,
            img:img
        })
        await newpost.save();

        return res.status(201).json({message:"sucesfully uploaded the post"})


    }catch(error){
        console.log("error occured while adding post:",error)
        res.status(500).json({message:error.message})
    }
}



export const deletepost=async(req,res)=>{
    
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({error:"post not found"})
        }
        else{
            if(post.img){
                await cloudinary.uploader.destroy(post.img.split("/").pop().split(".")[0]);
            }
            // await Post.findOneAndDelete(post);
            await Post.findByIdAndDelete(req.params.id)
            return res.status(200).json({message:"sucessufully deleted the the post"})
        }


    }catch(error){
        console.log("error occured while adding post:",error.message)
        res.status(500).json({message:error.message})
    }
}



export const commentonpost=async(req,res)=>{


    try{
        const {text}=req.body;

        const {postid}=req.params;
        const post=await Post.findById(postid);

        console.log(post)

        // if(!user) return res.status(404).json({message:"user not found"});
        if(!post) return res.status(404).json({message:"post not found /seleted"})

        const comment={user:req.user._id,text:text}

        post.comments.push(comment);
        await post.save();

        res.status(201).json({message:"comment added to the post"})

    }catch(error){
        console.log("error occured while adding post:",error.message)
        res.status(500).json({message:error.message})
    }
}


export const LikeUnlike=async(req,res)=>{
    try{
        const {postid}=req.params;
        const id=req.user._id;


        const post=await Post.findById(postid);

        if(!post) return res.status(404).json({error:"post not found!!!"})

        console.log(post)
        

        const findmyid=post.likes.includes(id);



        if(findmyid){
            //unlinking the post
            await Post.updateOne({_id:postid},{$pull:{likes:id}})
          await Users.updateOne({_id:id},{$pull:{likedpost:postid}})
            return res.status(200).json({message:"like has been removed"})
        }
        //liking the post
         post.likes.push(id);
         await Users.updateOne({_id:id},{$push:{likedpost:postid}})

           await  post.save();
            const notification=new Notification({
                from:id,
                to:post.user,
                notify:"like"
            })
            await notification.save();
            return res.status(200).json({message:"liked the post"})


    }catch(error){
        console.log("error occured while like/unlike post :",error);
        return res.status(500).json({message:error.message})
    }
}

export const allposts=async(req,res)=>{
try{
    const posts = await Post.find()
  .sort({ createdAt: -1 })
  .populate({
    path: 'user',
    select: 'username profilePicture fullname followers' // Include fields you need
  })
  .populate({
    path: 'comments.user',
    select: 'username profilePicture ' // Same for comment users
  });
    // const posts=await Post.find().sort({createdAt:-1})
    if(posts.length===0) {return res.status(200).json([])}
    // console.log(posts)
    
    return res.status(200).json(posts)

}catch(error){
    console.log("error occured while fetching the posts:",error);
    return res.status(500).json({message:error.message})
}}


// export const getlikedpost=async(req,res)=>{
//     try{
//         const {id}=req.params;
//         const posts=await Users.findById(id).select("likedpost").populate(
//             {path:"likedpost",select:"-_id",
//             populate:{
//                 path:"comments.user",
//                 select:"text "
//             }}
//         )
//         // const posts=await Users.findById(id).populate({path:"likedpost",select:"-_id"}.populate{path:"comments.user",select:"-_id"})
//         if(!posts) return res.status(404).json({message:"post not found"})
//         console.log(posts)
        
//         return res.status(200).json(posts);


//     }catch(error){
//         console.log("error occured while fetching likedposts:",error);
//         res.status(500).json({message:error.message})
//     }
// }



export const getlikedpost=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log("id:",id)
        const post=await Post.findById(id).populate("likes","username");
        console.log(post)
        if(!post) return res.status(404).json({message:"post not found"});
        // const users=post.likes.populate("user")
        let allusers=[]
        // allusers=await post.populate("")
       
        console.log();
        console.log();
        // console.log(post.likes);

        // post.likes.forEach(element => {
        //     allusers.push(element)
        // });
        if(!allusers) return res.status(200).json([])
        console.log(allusers);
        return res.send(allusers);

    }catch(error){
        console.log("error ocuuredwhile feting liked users:",error);
        return res.status(500).json({message:error.message})
    }
}

export const getfollowers=async(req,res)=>{
    try{
        const id=req.user._id;
        console.log(id)
        const user=await Users.findById(id);
        const users=user.following
        
        console.log(users)
        

        
        const posts=await Post.find({user:{$in:users}})
        if(posts==null){
            return res.send("dont have any post for follwong")
        }
        return res.send(posts)


    }catch(error){
        console.log("error occured while fetching followers:",error);
        return res.status(500).json({message:error.message})
    }
}