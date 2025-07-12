import React from 'react'

function PostSkeleton() {
  return (
    <div>
        <div className="flex w-180 flex-col gap-4 " style={{margin:"30px 30px 30px 70px"}}>
  <div className="flex items-center gap-4">
    <div className="skeleton h-20 w-20 shrink-0 rounded-full bg-gray-500"></div>
    <div className="flex flex-col gap-4">
      <div className="skeleton h-6 w-20 bg-gray-200"></div>
      <div className="skeleton h-4 w-28 bg-gray-500"></div>
    </div>
  </div>
  <div className="skeleton h-60 w-full bg-gray-500"></div>
</div>
      
    </div>




  )
}

export default PostSkeleton
