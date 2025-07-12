import React, { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function AddPost() {
 
const [text,settext]=useState("entr your content")
const [previewImage, setPreviewImage] = useState('download.png');
const [selectedFile, setSelectedFile] = useState(null);
 const fileInputRef = useRef(null);

 
const {mutate:addpost,isPending}=useMutation({
  mutationFn:async()=>{
    try{
      
      // const text=texts;
      console.log(text)
      // console.log("preview",previewImage)
      // console.log("img",selectedFile)
      const data=await fetch('/api/posts/addpost',{
        method:"POST",
       headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        img: selectedFile // base64 string
      })
      })
      const response=await data.json();
      console.log(response)
      if(!data.ok){
        console.log("not so ok")
         throw new Error(data.error || "Unable to post");
      }
      console.log(response)
     return response
    }catch(error)
    {
      throw console.error();
      
    }
  },
   onSuccess: () => {
    console.log("Post added successfully!");
    toast.success("post added sucessfully")
  },
})


const handleImageChange=(e)=>{
  const file=e.target.files[0];
  if(file){
    const reader=new FileReader()
    reader.onload=()=>{
       setPreviewImage(reader.result);       // preview base64
    setSelectedFile(reader.result); 
    }
    reader.readAsDataURL(file);
    
  }
}
 

 

  return (
    <>
      <h1 className='text-3xl mx-75 my-2'>add a post</h1>
      <hr></hr>
     {!isPending && <div>
        <div className="card bg-base-100 w-180 shadow-sm mx-15 my-2">
          <div className="card-body">
            <fieldset className="fieldset border-base-300 rounded-box w-xs border">
             
              
              <textarea 
                className="input w-170 h-32" 
                placeholder="Enter your content here..."
                rows={4} 
                // value={text}
                onChange={(e) => {
                  settext(e.target.value);
                }}
              />
            </fieldset>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            {/* <div className='text-2xl'>add photo</div> */}
            
            <figure className="cursor-pointer" 
            onClick={() => fileInputRef.current.click()}
            >
              <img
                src={previewImage}
                alt="Previewssss"
                className="w-180 h-80 object-cover rounded-lg"
              />
            </figure>
            
            <div className="card-actions justify-end">
              <button 
                className="btn btn-primary mx-70" 
                onClick={() => addpost()}
                // disabled={!postdetails.text.trim()}
              >
                Post now
              </button>
            </div>
          </div>
        </div>
      </div>}
      {isPending && <div className='text-4xl h-10 mx-80 my-40'>posting....</div>}
    </>
  );
}

export default AddPost;