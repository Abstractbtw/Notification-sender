import React, {useState, useEffect} from 'react'
import './notificationlist.css'
import DatePicker from "react-datepicker"
import TimePicker from "react-time-picker/dist/entry.nostyle"
import "react-datepicker/dist/react-datepicker.css"

import {AddTask} from "../popups/Popups"
import {AddFolder} from "../popups/Popups"
import Notes from "./Notes"
import ErrorText from '../popups/ErrorText'

import {FolderSelector} from "./Selectors"
import {StatusSelector} from "./Selectors"
import {ActiveSelector} from "./Selectors"
import Navbar from "../navbar/Navbar"

import {updatefield, addtime, settimer} from "../../controllers/controller"

const {getNotes} = require("../../service/service")
const {getFolders} = require("../../service/service")

function Notificationlist(){

  const activeEmail = localStorage.getItem('email')
  const activeUser = localStorage.getItem('name')

  const [notes, setNotes] = useState([])
  const [folders, setFolders] = useState([])

  const [showAdd, setShowAdd] = useState(false)
  const [showFolder, setShowFolder] = useState(false)

  const [editing, setEditingText] = useState(false)
  const [folder, setFolder] = useState("default")

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [offset, setOffset] = useState(0);
  const [finishDate, setFinishDate] = useState();

  useEffect(() => {
    getNotes().then((res) => setNotes(res.data))
  }, []);

  useEffect(() => {
    getFolders().then((res) => setFolders(res.data))
  }, []);

  const activeUserFolders = []
  folders.map(folder => {
    if(folder.user_email === activeEmail){
      activeUserFolders.push(folder)
    }
  })

  const activeUserNotes = []
  notes.map(note => {
    activeUserFolders.map(folder => {
      if(note.folderId === folder._id){
        activeUserNotes.push(note)
      }
    })
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



  const ActiveNotes = ({status}) => {
  
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

          <Notes currentNotes={activeUserNotes} status={status} folder={folder}/>
      </>
    )
  }



  const TaskTop = ({name}) => {
    return(
      <div className="task_top">
        <div className="opened_task_name">{name}</div>
        <button className="nav_log_out" style={{marginLeft: "auto"}} onClick={() => (sessionStorage.setItem('Active', "false"), sessionStorage.setItem("ActiveTask", ""), document.location.reload())}>Back</button>
      </div>
    )
  }



  const TaskContainer = () => {

    return (
      <div className="task_container">
        {activeUser && activeEmail ? (
          <div>
            <div className="space" style={{backgroundColor: "white", zIndex: "10", borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px"}}>
              <div className="tasklist" style={{display: "flex", height: "100%"}}>
                <div className="main_title colored_text" style={{width: "150px", marginTop: "auto"}}>Tasks</div>
                <div style={{marginLeft: "auto", marginTop: "auto", display: "inline-flex"}}>

                  <div style={{textAlign: "center"}}>
                    <select defaultValue={folder} className="selector" onChange={(event) => (setFolder(event.target.value))}>
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
                    <ActiveNotes status="todo"/>
                  ):("")}

                  {activeFolderInProgressLength ? (
                    <ActiveNotes status="inprogress"/>
                  ):("")}
                      
                  {activeFolderDoneLength ? (
                    <ActiveNotes status="done"/>
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
    )
  }



  const [checkDate, setCheckDate] = useState(false)

  function checkTime(ind, date, finishDate, time){
    const now = new Date()
    finishDate = finishDate + " | " + time.slice(0,2) + ":" + time.slice(3,5)
    const noteDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.slice(0,2), time.slice(3,5))
    if (Date.parse(noteDate) >= Date.parse(now)) {
      addtime(ind, noteDate, finishDate, time)
      document.location.reload()
    }
    else{
      setCheckDate(true)
    }
  }



  return (
    <div>

      <Navbar />

      <AddTask trigger={showAdd} setTrigger={setShowAdd} user={activeEmail} folders={activeUserFolders} />

      <AddFolder trigger={showFolder} setTrigger={setShowFolder} user={activeEmail} folders={activeUserFolders} />


      {sessionStorage.getItem('Active') !== "false" ? (
        <div>
          {activeUserNotes.map((note, index) => (
            <div key={index}>
              {note._id === sessionStorage.getItem("ActiveTask") ? (
                <div className="task_background">
                  <div className="task_main">

                    <TaskTop name={note.name}/>

                    <div style={{height: "4px", backgroundColor: "#ffffff30"}}/>

                    <table className="task_mid">
                      <tbody>
                        <tr>
                          <td style={{verticalAlign: "top", width: "15%", fontSize: "20px"}}>

                            <div style={{padding: "5px 10px"}}>

                              <FolderSelector activeUserFolders={activeUserFolders} folder={note.folder} ind={note._id}/>
                              <br/>

                              <div style={{height: "5px"}} />

                              <StatusSelector status={note.status} ind={note._id}/>

                              <div style={{height: "5px"}} />

                              <ActiveSelector active={note.active} ind={note._id}/>

                            </div>

                            <div style={{height: "4px", backgroundColor: "#ffffff30"}}/>

                            <div style={{padding: "5px 10px"}}>
                              <div>Task set</div>
                              <div>To: {note.finishDate}</div>
                              <div style={{display: "flex", float: "left"}}>
                                <DatePicker className="datepicker" selected={date} placeholder="Select day" dateFormat="dd.MM.yyyy"
                                onChange={(date) => (setDate(date), setFinishDate(date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()), setCheckDate(false))} />
                                <TimePicker onChange={(time) => (setTime(time), setCheckDate(false))}/>
                              </div>
                              <ErrorText trigger={checkDate} message={"Wrong date"}/>
                              {date && time ? (
                                <button style={{marginTop: "5px", float: "left"}} className="nav_log_out" onClick={() => (checkTime(note._id, date, finishDate, time))}>Set date</button>
                              ):(
                                <button style={{marginTop: "5px", color: "#ffffff30", float: "left"}} className="nav_log_out" disabled>Set date</button>
                              )}
                              <br/>
                              <div style={{marginTop: "80px"}}>Notification offset</div>
                              <div>Offset: {note.offset}</div>
                              <TimePicker onChange={(offset) => (setOffset(offset))}/>
                              <br/>
                              {offset ? (
                                <button style={{marginTop: "5px", float: "left"}} className="nav_log_out" onClick={() => (settimer(note._id, offset), document.location.reload())}>Set offset</button>
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
                                  <button className="nav_log_out" style={{marginBottom: "5px", marginRight: '5px'}} onClick={() => 
                                    (setEditingText(false), 
                                    updatefield("desc", document.getElementById("newtext").value, note._id), 
                                    document.location.reload()
                                    )}>Save</button>
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

    <TaskContainer />

    </div>
  )
}

export default Notificationlist