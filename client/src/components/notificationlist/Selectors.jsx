import React from 'react'
import './notificationlist.css'
import {updatefield} from "../../controllers/controller"

const FolderSelector = ({activeUserFolders, folder, ind}) => {
    return(
      <div style={{display: "inline"}}>
        Folder: 
        <select defaultValue={folder} className="task_selector" style={{marginLeft: "5px", float: "right", marginRight: "10px"}} onChange={(event) => updatefield("folder", event.target.value, ind)}>
          {activeUserFolders.map((folder, index) => {
            return(
              <option key={index}>{folder.name}</option>
            )
          })}
        </select>
      </div>
    )
  }



const StatusSelector = ({status, ind}) => {
    return(
      <div style={{display: "inline"}}>
        Status: 
        <select defaultValue={status} className="task_selector" style={{marginLeft: "5px", float: "right", marginRight: "10px"}} onChange={(event) => updatefield("status", event.target.value, ind)}>
          <option>todo</option>
          <option>inprogress</option>
          <option>done</option>
        </select>
      </div>
    )
}



const ActiveSelector = ({active, ind}) => {
    return(
      <div style={{display: "inline"}}>
        Active: 
        <select defaultValue={active} className="task_selector" style={{marginLeft: "5px", float: "right", marginRight: "10px"}} onChange={(event) => updatefield("active", event.target.value, ind)}>
          <option>active</option>
          <option>inactive</option>
          </select>
      </div>
    )
}

export {FolderSelector, StatusSelector, ActiveSelector}