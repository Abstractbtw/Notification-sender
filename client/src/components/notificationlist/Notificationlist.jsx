import React, {useState, useEffect} from 'react'
import './notificationlist.css'
import DatePicker from "react-datepicker"
import TimePicker from "react-time-picker/dist/entry.nostyle"
import "react-datepicker/dist/react-datepicker.css"

import AddTask from "../popups/AddTask"
import AddFolder from "../popups/AddFolder"

import {updatefield, addtime, setoffset} from "../../controllers/controller"

function Notificationlist(){

  const activeEmail = localStorage.getItem('email')
  const activeUser = localStorage.getItem('name')

  const [notes, setNotes] = useState([])
  const [folders, setFolders] = useState([])
  const [users, setUsers] = useState([])

  const [showAdd, setShowAdd] = useState(false)
  const [showFolder, setShowFolder] = useState(false)

  const [editing, setEditingText] = useState(false)
  const [folder, setFolder] = useState("default")

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [offset, setOffset] = useState(0);
  const [finishDate, setFinishDate] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
    .then(res => res.json())
    .then(setNotes)
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/folders`)
    .then(res => res.json())
    .then(setFolders)
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
    .then(res => res.json())
    .then(setUsers)
  }, []);

  const activeUserNotes = []
  notes.map(note => {
    if(note.user_email === activeEmail){
      activeUserNotes.push(note)
    }
  })

  const activeUserFolders = []
  folders.map(folder => {
    if(folder.user_email === activeEmail){
      activeUserFolders.push(folder)
    }
  })

  const activeUserToDo = []
  const activeUserInProgress = []
  const activeUserDone = []

  activeUserNotes.map(note => {
    if(note.status === "todo"){
      activeUserToDo.push(note)
    }
    if(note.status === "inprogress"){
      activeUserInProgress.push(note)
    }
    if(note.status === "done"){
      activeUserDone.push(note)
    }
  })

  let activeFolderToDoLength = 0
  let activeFolderInProgressLength = 0
  let activeFolderDoneLength = 0

  activeUserToDo.map(note => {
    if(note.folder === folder){
      activeFolderToDoLength ++
    }
  })

  activeUserInProgress.map(note => {
    if(note.folder === folder){
      activeFolderInProgressLength ++
    }
  })

  activeUserDone.map(note => {
    if(note.folder === folder){
      activeFolderDoneLength ++
    }
  })

  function openTask(ind){
    sessionStorage.setItem('Active', "true")
    sessionStorage.setItem("ActiveTask", ind)
    document.location.reload()
  }

  function Notes({ currentNotes, status }) {
    return (
      currentNotes &&
      currentNotes.map((note, index) => (
        (note.folder === folder) && (note.status === status) ? (
          <tr className="table_task" key={index} onClick={() => (openTask(note._id))}>
            <td className="task_name"><div className="name_div">{note.name}</div></td>
            {note.desc ? (
              <td className="table_desc"><div className="desc_div">{note.desc}</div></td>
            ):(
              <td className="table_desc"><div className="desc_div">...</div></td>
            )}
          </tr>
        ):("")
      ))
    )
  }
  
  function PaginatedNotes({status}) {
  
    return (
      <>
          <tr style={{height: "80px"}}></tr>

          <tr><td colSpan={2}><div className="table_head" style={{color: "#ffffff90", display: "flex"}}>
            <div style={{width: "5%", backgroundColor: "#ffffff90", height: "4px", margin: "auto"}} />
            {status === "todo" ? (<div style={{width: "68px", textAlign: "center"}}>To Do</div>):("")}
            {status === "inprogress" ? (<div style={{width: "125px", textAlign: "center"}}>In Progress</div>):("")}
            {status === "done" ? (<div style={{width: "56px", textAlign: "center"}}>Done</div>):("")}
            <div style={{width: "90%", backgroundColor: "#ffffff90", height: "4px", margin: "auto"}} />
          </div></td></tr>

          <tr style={{cursor: "default"}}>
            <td className="table_head">Task name</td>
            <td className="table_head">Description</td>
          </tr>

          <Notes currentNotes={activeUserNotes} status={status}/>
      </>
    )
  }

  return (
    <div>

      <AddTask trigger={showAdd} setTrigger={setShowAdd} user={activeEmail} />

      <AddFolder trigger={showFolder} setTrigger={setShowFolder} user={activeEmail} folders={activeUserFolders} />


      {sessionStorage.getItem('Active') !== "false" ? (
        <div>
          {activeUserNotes.map((note, index) => (
            <div key={index}>
              {note._id === sessionStorage.getItem("ActiveTask") ? (
                <div className="task_background">
                  <div className="task_main">

                    <div className="task_top">
                      <div className="opened_task_name">{note.name}</div>
                      <button className="nav_log_out" style={{marginLeft: "auto"}} onClick={() => (sessionStorage.setItem('Active', "false"), sessionStorage.setItem("ActiveTask", ""), document.location.reload())}>Back</button>
                    </div>

                    <div style={{height: "4px", backgroundColor: "#ffffff30"}}/>

                    <table className="task_mid">
                      <tbody>
                        <tr>
                          <td style={{verticalAlign: "top", width: "15%", fontSize: "20px"}}>

                            <div style={{padding: "5px 10px"}}>

                              <div style={{display: "inline"}}>
                                Folder: 
                                <select defaultValue={note.folder} className="task_selector" style={{marginLeft: "5px", float: "right", marginRight: "10px"}} onChange={(event) => updatefield("folder", event.target.value, note._id)}>
                                  {activeUserFolders.map((folder, index) => {
                                    return(
                                      <option key={index}>{folder.name}</option>
                                    )
                                  })}
                                </select>
                              </div>
                              <br/>

                              <div style={{height: "5px"}} />

                              <div style={{display: "inline"}}>
                                Status: 
                                <select defaultValue={note.status} className="task_selector" style={{marginLeft: "5px", float: "right", marginRight: "10px"}} onChange={(event) => updatefield("status", event.target.value, note._id)}>
                                    <option>todo</option>
                                    <option>inprogress</option>
                                    <option>done</option>
                                </select>
                              </div>

                              <div style={{height: "5px"}} />

                              <div style={{display: "inline"}}>
                                Active: 
                                <select defaultValue={note.active} className="task_selector" style={{marginLeft: "5px", float: "right", marginRight: "10px"}} onChange={(event) => updatefield("active", event.target.value, note._id)}>
                                    <option>active</option>
                                    <option>inactive</option>
                                </select>
                              </div>

                            </div>

                            <div style={{height: "4px", backgroundColor: "#ffffff30"}}/>

                            <div style={{padding: "5px 10px"}}>
                              <div>Task set</div>
                              <div>To: {note.finishDate}</div>
                              <div style={{display: "flex", float: "left"}}>
                                <DatePicker className="datepicker" selected={date} placeholder="Select day" dateFormat="dd.MM.yyyy"
                                onChange={(date) => (setDate(date), setFinishDate(date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()))} />
                                <TimePicker onChange={(time) => (setTime(time))}/>
                              </div>
                              {date && time ? (
                                <button style={{marginTop: "5px", float: "left"}} className="nav_log_out" onClick={() => (addtime(note._id, note.name, note.desc, note.folder, note.status, date, finishDate, time))}>Set date</button>
                              ):(
                                <button style={{marginTop: "5px", color: "#ffffff30", float: "left"}} className="nav_log_out" disabled>Set date</button>
                              )}
                              <br/>
                              <div style={{marginTop: "80px"}}>Notification offset</div>
                              <div>Offset: {note.offset}</div>
                              <TimePicker onChange={(offset) => (setOffset(offset))}/>
                              <br/>
                              {offset ? (
                                <button style={{marginTop: "5px", float: "left"}} className="nav_log_out" onClick={() => (setoffset(note._id, offset))}>Set offset</button>
                              ):(
                                <button style={{marginTop: "5px", color: "#ffffff30", float: "left"}} className="nav_log_out" disabled>Set offset</button>
                              )}
                            </div>

                          </td>
                          <td style={{verticalAlign: "top", borderLeft: "4px solid #ffffff30"}}>
                            <div className="task_desc">
                              <div className="task_header" style={{color: "white"}}>Description</div>
                              {editing ? (
                                <textarea type="text" rows="20" style={{width: "100%", outline: "none", backgroundColor: "#ffffff05", color: "#ffffff50", border: "0px"}} defaultValue={note.desc} id="newtext"/>
                              ):(
                                <div>{note.desc}</div>
                              )}
                            </div>
                            <div style={{padding: "10px 5px"}}>
                              {editing ? (
                                <>
                                  <button className="nav_log_out" style={{marginBottom: "5px"}} onClick={() => setEditingText(false)}>Cancel</button>
                                  <button className="nav_log_out" style={{marginBottom: "5px", marginRight: '5px'}} onClick={() => (setEditingText(false), updatefield("desc", document.getElementById("newtext").value, note._id))}>Save</button>
                                </>
                              ):(
                                <button className="nav_log_out" style={{marginBottom: "5px"}} onClick={() => setEditingText(true)}>Edit</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>
              ):(<></>)}
            </div>
          ))}
        </div>
      ):(<></>)
    }




      <div className="task_container">
        {activeUser ? (
          <div>
            <div className="space" style={{backgroundColor: "white", zIndex: "10", borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px"}}>
              <div className="tasklist" style={{display: "flex", height: "100%"}}>
                <div className="main_title colored_text" style={{width: "150px", marginTop: "auto"}}>Tasks</div>
                <div style={{marginLeft: "auto", marginTop: "auto", display: "inline-flex"}}>

                  <div style={{textAlign: "center"}}>
                    <select className="selector" onChange={(event) => setFolder(event.target.value)}>
                      {activeUserFolders.map((folder, index) => {
                        return(
                          <option key={index}>{folder.name}</option>
                        )
                      })}
                    </select>
                    <div style={{fontSize: "12px", cursor: "default"}}>Select folder</div>
                  </div>

                  <div style={{textAlign: "center", margin: "0px 7px"}}>
                    <div className="add_task" style={{fontSize: "20px"}} onClick={() => (setShowFolder(true))}>🗁</div>
                    <div style={{fontSize: "12px", cursor: "default"}}>New folder</div>
                  </div>

                  <div style={{textAlign: "center"}}>
                    <div className="add_task" onClick={() => (setShowAdd(true))}>+</div>
                    <div style={{fontSize: "12px", cursor: "default"}}>New Task</div>
                  </div>

                </div>
              </div>
            </div>
            <div className="tasklist">
              <table className="task_table">
                <thead>
                </thead>
                <tbody>
                      
                  {activeFolderToDoLength? (
                    <PaginatedNotes status="todo"/>
                  ):("")}

                  {activeFolderInProgressLength ? (
                    <PaginatedNotes status="inprogress"/>
                  ):("")}
                      
                  {activeFolderDoneLength ? (
                    <PaginatedNotes status="done"/>
                  ):("")}

                  {activeUserNotes.length ? (""):(
                    <tr style={{color: "white", fontSize: "20px"}}><td>No tasks found</td></tr>
                  )}

                </tbody>
              </table>
            </div>
            <div style={{height: "300px"}}></div>
          </div>
        ):(<div className="not_login" style={{color: "#ffffff50", padding: "10px"}}>Log in to see tasks</div>)}
      </div>
    </div>
  )
}

export default Notificationlist



/* Description Description Description Description Description Description Description 
Description Description Description Description Description Description Description 
Description Description Description Description Description Description Description Description 
Description Description Description Description Description Description Description Description 
Description Description Description Description Description Description Description Description Description
 Description Description Description Description Description Description Description Description Description 
 Description Description Description Description Description Description */