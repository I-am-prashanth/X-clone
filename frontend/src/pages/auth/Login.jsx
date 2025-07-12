import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import toast from 'react-hot-toast'

function Login() {
  const [login,setlogin]=useState({
    username:"",
    password:""
  })

  const handelevent=(e)=>{
    const {name,value}=e.target;
    setlogin((prevvalue)=>({
      ...prevvalue,[name]:value
    }))
  }
  const handellogin=(e)=>{
    console.log("entered dunc")
    e.preventDefault();
  mutate(login);
  }
  const queryClient=useQueryClient()

  const {mutate,isError,isPending}=useMutation({
    mutationFn:async({username,password})=>{
      console.log("entered mutaation")
      try{
        const data=await fetch("/api/auth/login",{
          method:"POST",headers:{
           "Content-Type":"application/json"
          },body:JSON.stringify({username,password})
        })
        console.log("fetched data")
        if(!data.ok) throw new Error(data.message);
        const res=await data.json()
        console.log("sucesfully loged in");
        toast.success("sucessfully logged in !!")
        
      }catch(error){
        console.log(error.message)
        toast.error("error occured")
      }
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["authUser"]})
    } 
   })

  return (
   <>
    <div style={{margin:"0px 0px 0px 23vw"}} >
       <h1 className="text-6xl font-bold">login page enter details</h1>
    <div className="hero bg-base-2000 min-h-20" style={{margin:"15vh 0px 0px 0px"}}>
     
  <div className="hero-content flex-col lg:flex-row-reverse">
    
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-4">
        provide corrects username and password
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <fieldset className="fieldset">
          <label className="label">UserName</label>
          <input type="username" name="username" value={login.username} onChange={handelevent} className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input type="password" name="password" value={login.password} onChange={handelevent}  className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4" onClick={handellogin}>Login</button>
          <div>
<h1>Dont have account?</h1>
<Link to="/signup"><button className="btn btn-neutral mt-4" style={{width:"350px"}}>Sign Up</button></Link>
</div>
        </fieldset>
      </div>
    </div>
  </div>
   
</div>

</div>

    </>
  )
}

export default Login
