import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useMutation, useQuery} from "@tanstack/react-query"
import Login from './Login'
import toast from 'react-hot-toast'

function SignupPage() {
  const [details,setdetails]=useState({
    username:"",
    fullname:"",
    email:"",
    password:""
  })

const handelchange=(e)=>{
  const {name,value}=e.target;
  setdetails((prevdetails)=>({
    ...prevdetails,[name]:value
  }))
}

// useMutation();
const {mutate,isError,isPending,error}=useMutation({
  mutationFn:async({username,email,fullname,password})=>{
    try{
      const res=await fetch("/api/auth/signup",{
        method:"Post",headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,username,fullname,password})
      });
      // if(!res.ok) throw new Error("something went wrong while siging up!!!",res)
      const data=await res.json();
      if(data.error) throw new Error(data.error);
      console.log(data);
      toast.success("user added sucessfully")
      return data;
    }catch(error){
      console.log(error);
      toast.error(error.message)
    }
    
  }
}); 
// useQuery()

const handelsubmit=(e)=>{
  e.preventDefault();
  mutate(details);
}

  return (
    <>
    <div style={{margin:"0px 0px 0px 0vw"}} >
       <h1 className="text-6xl font-bold" style={{margin:"10px 0px 0px 35vw"}} >Sign up Today</h1>
    <div className="hero bg-base-2 min-h-20" >
     
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div className="text-center lg:text-left">
    
      
    </div>
    <div className="card bg-base-1 w-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">username</label>
          <input type="username" name="username"className="input" value={details.username} placeholder="username" onChange={handelchange} />
           
           <label className="label">fullname</label>
          <input type="fullname" name="fullname" value={details.fullname} onChange={handelchange} className="input" placeholder="fullname" />
          
          <label className="label">Email</label>
          <input type="email" name="email" value={details.email} onChange={handelchange} className="input" placeholder="Email" />
           
           <label className="label">Password</label>
          <input type="password" name="password" value={details.password} onChange={handelchange} className="input" placeholder="Password" />
          <button className="btn btn-neutral mt-4" onClick={handelsubmit}>signup</button>
          
          <p className="text-2xl ">Already have a account?</p>
          <Link to="/login"><button className="btn btn-neutral mt-4" style={{width:"350px"}}>Login</button></Link>
        </fieldset>
      </div>
    </div>
  </div>
</div>
</div>

    </>
  )
}

export default SignupPage
