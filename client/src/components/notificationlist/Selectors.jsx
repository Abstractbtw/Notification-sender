import React from 'react'
import './notificationlist.css'
import {updatefield} from "../../controllers/controller"

const FolderSelector = ({activeUserFolders, folder, ind}) => {
    return(
      <div className="selector_display">
        Folder: 
        <select defaultValue={folder} className="task_selector" onChange={(event) => updatefield("folder", event.target.value, ind)}>
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
      <div className="selector_display">
        Status: 
        <select defaultValue={status} className="task_selector" onChange={(event) => updatefield("status", event.target.value, ind)}>
          <option>todo</option>
          <option>inprogress</option>
          <option>done</option>
        </select>
      </div>
    )
}



const ActiveSelector = ({active, ind}) => {
    return(
      <div className="selector_display">
        Active: 
        <select defaultValue={active ? ("active"):("inactive")} className="task_selector" onChange={(event) => updatefield("active", event.target.value === "active" ? (true):(false), ind)}>
          <option>active</option>
          <option>inactive</option>
          </select>
      </div>
    )
}

export {FolderSelector, StatusSelector, ActiveSelector}