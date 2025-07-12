import React, { useState,useRef, useEffect } from 'react'
import Post from '../pages/components/Post'
import { useQuery,useQueryClient  } from '@tanstack/react-query';
import AddPost from './AddPost';

function Profile() {
  const fileInputRef = useRef(null);
    const [activeTab,setActiveTab]=useState('posts')
    const [photo,setphoto]=useState('https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp');
    const [staus,setstatus]=useState('status')
    const [bgphoto,setbgphoto]=useState('https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp')
    const [isHovered,setIsHovered]=useState(false)
    const [isHoveredbg,setIsHoveredbg]=useState(false)
    const [isboiloading,setisbioloading]=useState(true)
    const [authUser,setauthUser]=useState(null)

    const queryClient = useQueryClient();
   
    useEffect(() => {
    queryClient.invalidateQueries(['authUser']);
    const latest = queryClient.getQueryData(['authUser']);
    setauthUser(latest);
    setisbioloading(false);
  }, []);
    
    
    console.log(authUser)

    const handleButtonClick=(e)=>{
      const {name}=e.target;
      setstatus(name)
      console.log(name)
      fileInputRef.current.click();
      
    }
    const handlefilechange=(e)=>{
      const file=e.target.files[0];
      if(file){
        const reader=new FileReader();
        if(staus==='status')
        reader.onload=(event)=>{setphoto(event.target.result)};
      else reader.onload=(event)=>{setbgphoto(event.target.result)};
      reader.readAsDataURL(file);
      }
    }
  return (
    <div>
      {isboiloading ? (<div className='mx-65 mt-5'>
      <div className="flex w-223 h-120 flex-col gap-4">
        <div className="skeleton h-200 w-full"></div>
  <div className="flex items-center gap-4">
    <div className="skeleton h-20 w-20 shrink-0 rounded-full"></div>
    <div className="flex flex-col gap-4 mt-30 mx-0">
      <div className="skeleton h-4 w-30"></div>
      <div className="skeleton h-4 w-28"></div>
    </div>
  </div>
  
</div>
      </div>):(
      <>
      <input
        type="file"
        
        ref={fileInputRef}
        onChange={handlefilechange}
        accept="image/*"
        className="hidden"
      />
      <div 
      className="relative mx-64"
      onMouseEnter={() => setIsHoveredbg(true)}
      onMouseLeave={() => setIsHoveredbg(false)}
    >
        <figure className='w-220 h-full mx-0 relative' >

          {isHoveredbg && (
        <button className="absolute w-8 h-8 mx-213 bg-yellow-300 rounded-full mt-0
   hover:bg-green-400 hover:scale-105 transition-all duration-200" name='bg'  onClick={handleButtonClick}
   >✏</button>
      )}
  <div className="w-24 rounded-full"></div>
    <img src={bgphoto}
      alt="Shoes" 
      className="w-223  h-90" />
  </figure>
  </div>

 <div className="absolute  mx-65 transform  -translate-y-1/2">
 <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
<div className="avatar avatar   ">
  {isHovered && (
        <button className="absolute  mx-18 bg-yellow-300 rounded-full mt-2
   hover:bg-green-400 hover:scale-105 transition-all duration-200" name='status'  onClick={handleButtonClick}
   >✏</button>
      )}
  {/* <button className="absolute  mx-18 bg-yellow-300 rounded-full mt-2
   hover:bg-green-400 hover:scale-105 transition-all duration-200" name='status'  onClick={handleButtonClick}
   >✏</button> */}
  <div className="w-24 rounded-full">
    <img src={photo} />
  </div>
</div>
    </div>
    </div>


    <h1 className='mx-68 mt-15 text-2xl'>{authUser.fullname}</h1>
    <h1 className='mx-68 opacity-70 '>@{authUser.username}</h1>
    <h1 className='mx-68'><span className='font-extrabold'>5</span> Followers <span className='font-extrabold'>{authUser.following.length} </span>Following</h1>
    <h1 className='mx-68'>I am prashanth follow me for more content on education</h1>
</>)}






    <div className="w-223 bg-gray-900 shadow-sm mx-64 mt-10 ">
      <div className="flex border-b border-gray-200">
        {/* Posts Tab - Takes half width */}
        <button
          className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200
            ${activeTab === 'posts' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>

        {/* Likes Tab - Takes half width */}
        <button
          className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200
            ${activeTab === 'likes' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          onClick={() => setActiveTab('likes')}
        >
          Likes
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4">
        {activeTab === 'posts' ? (
          <div><AddPost /></div>
        ) : (
          <div><Post/></div>
        )}
      </div>
    </div>



    </div>
  )
}

export default Profile
