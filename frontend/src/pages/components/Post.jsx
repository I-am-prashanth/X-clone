import React, { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query';
import Fetchpost from './Fetchpost.jsx';

function Post({feedtype}) {
  
  const [getposts,setposts]=useState({})

  const getpostsurl=()=>{
      switch (feedtype){
        case "suggested":return "/api/posts"
        case "following":return "/api/posts/follwing"
        default:return "/api/posts"
  }}

  // useEffect(()=>{endpoint},[feedtype])
  useEffect(()=>{refetch()},[feedtype])

  const endpoint=getpostsurl();

  const {data:posts,refetch}=useQuery({
    queryKey:["posts",feedtype],
    queryFn:async()=>{
      console.log("endpoint",endpoint , "for ffedtype:",feedtype)
      try{
        console.log("endpoint",endpoint)
        const res=await fetch(endpoint);
        let data=await res.json()
        // console.log("data:",data)
        if(!res.ok){ 
        
          throw new Error("unnable to fetch posts")}
        
        // console.log("setposts are:",getposts)
          return data
      }catch(error){
        console.log(feedtype)
        throw error
      }
    }
  })


  return (
    <>
    {console.log(feedtype)}
    {posts?.map((post, index) => {
      // console.log("post:",post._id)
  return <Fetchpost post={post} key={post._id} />
})}
    </>
  )
}

export default Post


