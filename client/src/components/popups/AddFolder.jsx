import React, {useState, useEffect} from 'react'
import './popup.css'
import {addfolder} from '../../controllers/controller'

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
    }
  }

  return (props.trigger) ? (
    <div className="popup_bg">
        <div className="add_task_popup">
          <div style={{fontSize: "26px", cursor: "default"}}>Add folder</div>
          <input className="task_input" placeholder="Folder name" onChange={(event) => (setName(event.target.value), setCheckFolder(false))}/>
          {checkFolder ? (
            <div className="error_text">Folder {name} already exists</div>
          ):("")}
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

export default AddFolder