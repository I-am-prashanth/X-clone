import { useState } from 'react'
import { Routes ,Route} from 'react-router-dom'
import Homepage from './pages/components/Homepage.jsx'
import Login from './pages/auth/Login.jsx'
import SignupPage from './pages/auth/SignupPage.jsx'
import Sidebaar from './commonpage/Sidebar.jsx'
import Mypage from './Mypage.jsx'
import Notify from './pages/notifications/Notify.jsx'
import Profile from './profile/Profile.jsx'
import { Toaster } from 'react-hot-toast'
import { useQueries, useQuery } from '@tanstack/react-query'
import { Navigate } from 'react-router-dom';


// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const {data:authUser,isLoading}= useQuery({
    queryKey:['authUser'],
    queryFn:async()=>{
      try{
        const data=await fetch("/api/auth/me");
        if(data.status===401 || data.status===500){
          return null;
        }
        if(data==null) return null
        const res=await data.json();
        // console.log(res)
        if(res.error) return null
        if(!data.ok){
          throw new Error(data.error || "something went wrong")
        }
        console.log(res)
        return res 
      }catch(error){
        console.log(error)
        throw error
      }
    },
    retry:false
  })

  // console.log("aythuser",authUser)

  if(isLoading){
    return(<div className='h-screen flex justify-center items-center'>
      <span className="loading loading-dots loading-xl"></span>

    </div>)
  }


  return (

    

    // <div className='flex max-w-6x1 mx-auto'>
    <div>
    {authUser && <Sidebaar />} 
   
   <Routes>
      <Route path="/login" element={!authUser?<Login />:<Navigate to="/" />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/mypage" element={authUser?<Mypage/>:<Login/>} />
      <Route path="/" element={authUser?<Homepage />:<Navigate to="/login" />} />
      <Route path="/notifications" element={authUser?<Notify />:<Login />} />
      <Route path="/profile" element={authUser?<Profile />:<Login/>} />
      
   </Routes>
     <Toaster />
    </div>
  )
}

export default App
