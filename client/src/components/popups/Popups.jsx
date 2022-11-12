import React, { useState } from 'react'
import './popup.css'
import { addfolder } from '../../controllers/controller'
import { addnote } from '../../controllers/controller'
import { ErrorText, LabelText } from './ErrorText'

function AddFolder(props) {

  const [name, setName] = useState("")

  const [checkFolder, setCheckFolder] = useState(false)

  const folderNames = []
  props.folders.map(folder => {
    folderNames.push(folder.name)
  })

  function checkInput(){
    const checkName = name.replace(/[^a-zа-яё0-9]/gi, '')
    console.log(checkName)
    if (folderNames.includes(checkName)){
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
          <div className="add_folder">Add folder</div>
          <LabelText message={"Folder name"}/>
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
    const [folderName, setFolder] = useState("default")

    let folderId

    props.folders.map(folder => {
      if(folder.name === folderName){
        folderId = folder._id
      }
    })
  
    return (props.trigger) ? (
      <div className="popup_bg">
          <div className="add_task_popup">
            <div style={{fontSize: "26px", cursor: "default"}}>Add task</div>
            <LabelText message={"Task name"}/>
            <input className="task_input" placeholder="Task name" onChange={(event) => (setName(event.target.value))}/>
            <div style={{height: "10px"}} />
            <LabelText message={"Task folder"}/>
            <select defaultValue={folderName} className="selector" style={{float: "left"}} onChange={(event) => (setFolder(event.target.value))}>
              {props.folders.map((folder, index) => {
                return(
                  <option key={index}>{folder.name}</option>
                )
              })}
            </select>
            <div style={{height: "48px", marginTop: "40px"}}>
              {name.replace(/\s/g, "").length ? (
                <button className="nav_log_out" style={{float: "left"}} onClick={() => (addnote(name, folderId, folderName), setName(""), document.location.reload())}>Add</button>
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