import React from 'react'
import './notificationlist.css'
import { Link } from 'react-router-dom'

const FolderIcon = (props) => {
  return(
    <div className="icon">
      <div className="add_task icon_img" onClick={() => (props.setTrigger(true))}>🗁</div>
      <div className="icon_text">New Folder</div>
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

const DeletedIcon = (props) => {
  return(
    <div className="icon">
      {props.active ? (
        <div className="add_task icon_img" onClick={() => (props.setTrigger(false))}>✔</div>
      ):(
        <div className="add_task icon_img" onClick={() => (props.setTrigger(true))}>✘</div>
      )}
      <div className="icon_text">Deleted</div>
    </div>
  )
}

const HistoryIcon = () => {
  return(
    <div className="icon">
      <Link to="/history" style={{textDecoration: "none"}}><div className="add_task icon_img">↺</div></Link>
      <div className="icon_text">History</div>
    </div>
  )
}

const SearchIcon = (props) => {
  return(
      <div className="add_task icon_img" style={{marginRight: "10px", marginLeft: "-5px", paddingLeft: "2px"}} onClick={() => props.setTrigger(props.name)}>➤</div>
  )
}

export {FolderIcon, TaskIcon, DeletedIcon, HistoryIcon, SearchIcon}