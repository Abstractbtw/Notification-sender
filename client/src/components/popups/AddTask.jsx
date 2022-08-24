import React, {useState, useEffect} from 'react'
import './popup.css'
import {addnote} from '../../controllers/controller'

function AddTask(props) {

  const [name, setName] = useState("")

  return (props.trigger) ? (
    <div className="popup_bg">
        <div className="add_task_popup">
          <div style={{fontSize: "26px", cursor: "default"}}>Add task</div>
          <input className="task_input" placeholder="Task name" onChange={(event) => (setName(event.target.value))}/>
          <div style={{height: "48px"}}>
            {name.replace(/\s/g, "").length ? (
              <button className="nav_log_out" style={{float: "left"}} onClick={() => (addnote(name, props.user), setName(""))}>Add</button>
            ):(
              <button className="nav_log_out" style={{float: "left", color: "#ffffff30"}} disabled>Add</button>
            )}
            <button className="nav_log_out" style={{float: "right"}} onClick={() => (props.setTrigger(false), setName(""))}>Close</button>
          </div>
        </div>
      </div>
  ) : ""
}

export default AddTask