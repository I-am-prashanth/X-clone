import React from 'react'
import { Link } from 'react-router-dom'
import {queryOptions, useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import toast from 'react-hot-toast'

function sidebaar() {
  const userqueries=useQueryClient();
  const {mutate,onSucess}=useMutation({
    mutationFn:async()=>{
      try{
        const exit=await fetch("/api/auth/logout",{
          method:"POST",
        })
        const data=await exit.json()

        console.log("logged out sucessfully")
        console.log(data);
        // toast.success("logout sucessfully ")
      }catch(error){
        throw new Error(error)
      }
      
    },
    onSuccess:()=>{
        // toast.success("logout sucessfully pp")
        // console.log("prasghanth pskpskk")
        userqueries.invalidateQueries({queryKey:["authUser"]})
      }

  })

  // const {data:authUser}=useQuery({queryKey:["authUser"]})

  const handellogout=()=>{
    mutate()
  }
  return (
    <>
  <div className=" relative flex h-auto bg-red-900 w-20">
  {/* Fixed Sidebar */}
  <div className="fixed top-0 left-0 h-full w-64 bg-gray-700 text-white p-4 overflow-y-auto">
    <div className="space-y-4">
      <div className="text-xl font-bold p-2">Menu</div>
      <Link to="/"><button className="flex items-center gap-2 w-full p-3 hover:bg-gray-700 rounded-lg">
        🏠 Home
      </button></Link>
      <button className="flex items-center gap-2 w-full p-3 hover:bg-gray-700 rounded-lg">
        🔍 Explore
      </button>
      <Link to="notifications">
      <button className="flex items-center gap-2 w-full p-3 hover:bg-gray-700 rounded-lg">
        🔔 Notifications
      </button> </Link>
      <Link to="/profile"><button className="flex items-center gap-2 w-full p-3 hover:bg-gray-700 rounded-lg">
        👤 Profile
      </button></Link>
      <button className="flex items-center gap-2 w-full p-3 hover:bg-gray-700 rounded-lg">
        ⚙️ Settings
      </button>
      <button className="flex items-center gap-2 w-full p-3 hover:bg-gray-700 rounded-lg" onClick={handellogout}>
        ↪️logout
      </button>
    </div>
  </div>

  {/* Scrollable Main Content (offset by sidebar width) */}
  
</div>
</>
  )
}

export default sidebaar
