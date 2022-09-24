import React, {useState} from 'react'
import './popup.css'
import {addfolder} from '../../controllers/controller'
import {addnote} from '../../controllers/controller'
import ErrorText from './ErrorText'

function AddFolder(props) {

  const [name, setName] = useState("")

  const [checkFolder, setCheckFolder] = useState(false)

  const folderNames = []
  props.folders.map(folder => {
    folderNames.push(folder.name)
  })

  function checkInput(){
    if (folderNames.includes(name)){
      setCheckFolder(true)
    }
    else{
      addfolder(name, props.user)
      document.location.reload()
    }
  }

  return (props.trigger) ? (
    <div className="popup_bg">
        <div className="add_task_popup">
          <div style={{fontSize: "26px", cursor: "default"}}>Add folder</div>
          <input className="task_input" placeholder="Folder name" onChange={(event) => (setName(event.target.value), setCheckFolder(false))}/>
          <ErrorText trigger={checkFolder} message={"Folder already exists"}/>
          <div style={{height: "48px"}}>
            {name.replace(/\s/g, "").length ? (
              <button className="nav_log_out" style={{float: "left"}} onClick={checkInput}>Add</button>
            ):(
              <button className="nav_log_out" style={{float: "left", color: "#ffffff30"}} disabled>Add</button>
            )}
            <button className="nav_log_out" style={{float: "right"}} onClick={() => (props.setTrigger(false), setName(""), setCheckFolder(false))}>Close</button>
          </div>
        </div>
      </div>
  ) : ""
}



function AddTask(props) {

    const [name, setName] = useState("")

    let folderId

    props.folders.map(folder => {
      if(folder.name === "default"){
        folderId = folder._id
      }
    })
  
    return (props.trigger) ? (
      <div className="popup_bg">
          <div className="add_task_popup">
            <div style={{fontSize: "26px", cursor: "default"}}>Add task</div>
            <input className="task_input" placeholder="Task name" onChange={(event) => (setName(event.target.value))}/>
            <div style={{height: "48px"}}>
              {name.replace(/\s/g, "").length ? (
                <button className="nav_log_out" style={{float: "left"}} onClick={() => (addnote(name, folderId), setName(""), document.location.reload())}>Add</button>
              ):(
                <button className="nav_log_out" style={{float: "left", color: "#ffffff30"}} disabled>Add</button>
              )}
              <button className="nav_log_out" style={{float: "right"}} onClick={() => (props.setTrigger(false), setName(""))}>Close</button>
            </div>
          </div>
        </div>
    ) : ""
  }
  


export {AddFolder, AddTask}