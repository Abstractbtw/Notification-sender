import React from 'react'
import './notificationlist.css'

const FolderIcon = (props) => {
  return(
    <div className="icon" style={{ margin: "0px 7px"}}>
      <div className="add_task icon_img" onClick={() => (props.setTrigger(true))}>🗁</div>
      <div className="icon_text">New folder</div>
    </div>
  )
}



const TaskIcon = (props) => {
  return(
    <div className="icon">
      <div className="add_task" onClick={() => (props.setTrigger(true))}>+</div>
      <div className="icon_text">New Task</div>
    </div>
  )
}

export {FolderIcon, TaskIcon}