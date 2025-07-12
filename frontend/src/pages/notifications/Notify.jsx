import React from 'react'

function Notify(props) {
    const color=["bg-gray-700","bg-gray-500"]
    const type=["❤ someone liked your post","🤝 someone followed you"]
  return (
    <div>
      <div className={` h-40 card ${color[props.color]|| color[0]} text-primary-content  m-1 w-200 mx-65`}>
  <div className="card-body">
    <h2 className="card-title">Notification</h2>
    <p>{type[1]}</p>
    <div className="card-actions justify-start">
      BIO
    </div>
  </div>
</div>
    </div>
  )
}

export default Notify
