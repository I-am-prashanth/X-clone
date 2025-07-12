import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PostSkeleton from './PostSkeleton';
import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
function Fetchpost(props) {
  const [posts, setposts] = useState(props.post);
  const [isloading, setisloading] = useState(false);
  const [name, setname] = useState(true);
  const [follow,setfollow]=useState("follow")
  let follw=[]


  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(['authUser']);

  const {mutate:followUser,isPending}=useMutation({
    mutationFn:async()=>{
      
      try{
        // const follower=await fetch(`/api/user/follow/${posts.user._id}`)
        const follower=await fetch(`/api/user/follow/${posts.user._id}`,
          {
            method:"POST"
          }
        )
        const res=await follower.json();
        if(!follower.ok){
          throw res.message;
        }
        return message
      }catch(error){
      throw console.error()
      }
    }
  })

  const chechfollow=()=>{
    if( follw.includes(authUser?._id)){
      setfollow("unfollow")
    }
    else{
      setfollow("follow")
    }

  }

  useEffect(() => {
    setisloading(props.post);
    setposts(props.post);
    console.log(posts.user.followers)
   
    follw=posts.user.followers
    console.log("yes")
    
   
  }, [props.post]);
  

  return (
    
    <div className="my-4">
     
      {isloading ? (
        <div className="card bg-base-100 max-w-2xl mx-auto shadow-sm">
          {/* Header Section */}
          <div className="card-header flex items-start gap-4 p-4">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="Profile" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-semibold">{posts.user?.fullname}</div>
                  <Link 
                    to="/profile" 
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    @{posts.user?.username}
                  </Link>
                </div>
                {authUser?.username!==posts.user?.username && 
                <button className="btn btn-sm btn-ghost bg-green-500 hover:text-gray-700" onClick={
                  followUser
                  
                  }>{follow}</button>}
              </div>
            </div>
          </div>
          
          <hr className="border-base-300" />

          {/* Rest of your post content remains the same */}
          {posts.img && (
            <figure className="w-full">
              <img 
                src={posts.img} 
                alt="Post" 
                className="w-full h-auto max-h-96 object-contain" 
              />
            </figure>
          )}
          
          <div className="card-body p-4">
            <div className="flex items-center gap-2">
              <p className="text-lg">{posts.text}</p>
              <div className="badge badge-secondary">NEW</div>
            </div>

            {/* Actions */}
            <div className="card-actions justify-between mt-4">
              <div className="flex gap-4">
                <button 
                  className="btn btn-ghost gap-2"
                  onClick={() => {
                    setname(true);
                    // console.log(name);
                  }}
                >
                  <span>{posts.likes?.length || 0}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  Like
                </button>

                <button 
                  className="btn btn-ghost gap-2"
                  onClick={() => {
                    setname(false);
                    console.log(name);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                  </svg>
                  Comment
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Comments:</h3>
              <hr className="my-2 border-base-300" />
              <div className="space-y-3">
                {posts.comments?.map((element) => (
                  <div key={element._id} className="bg-base-200 p-3 rounded-lg">
                    <div className="font-medium">{element.user?.fullname}</div>
                    <p className="mt-1">{element.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
    </div>
  );
}

export default Fetchpost;