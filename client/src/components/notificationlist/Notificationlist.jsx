import React, {useState, useEffect} from 'react'
import './notificationlist.css'
import "react-datepicker/dist/react-datepicker.css"

import {AddTask, AddFolder} from "../popups/Popups"
import {Notes} from "./Notes"
import {FolderIcon, TaskIcon} from "./Icons"
import {TaskTop, TaskLeft} from "./Task"

import {FolderSelector} from "./Selectors"
import {StatusSelector} from "./Selectors"
import {ActiveSelector} from "./Selectors"
import Navbar from "../navbar/Navbar"

import {updatefield} from "../../controllers/controller"

const {getNotes, getFolders} = require("../../service/service")

function Notificationlist(){

  const activeEmail = localStorage.getItem('email')
  const activeUser = localStorage.getItem('name')

  const [notes, setNotes] = useState([])
  const [folders, setFolders] = useState([])

  const [showAdd, setShowAdd] = useState(false)
  const [showFolder, setShowFolder] = useState(false)

  const [editing, setEditingText] = useState(false)
  const [folder, setFolder] = useState("default")

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
          <tr className="status_space"></tr>

          <tr><td colSpan={2}><div className="table_head status_div">
            <div className="active_note_status" style={{width: "5%"}} />
            {status === "todo" ? (<div className="status_text" style={{width: "68px"}}>To Do</div>):("")}
            {status === "inprogress" ? (<div className="status_text" style={{width: "125px"}}>In Progress</div>):("")}
            {status === "done" ? (<div className="status_text" style={{width: "56px"}}>Done</div>):("")}
            <div className="active_note_status" style={{width: "90%"}} />
          </div></td></tr>

          <tr style={{cursor: "default"}}>
            <td className="table_head">Task name</td>
            <td className="table_head">Description</td>
          </tr>

          <Notes currentNotes={activeUserNotes} status={status} folder={folder}/>
      </>
    )
  }



  const TaskContainer = () => {

    return (
      <div className="task_container">
        {activeUser && activeEmail ? (
          <div>
            <div className="space container_space">
              <div className="tasklist tasklist_top">
                <div className="main_title colored_text tasks_margin">Tasks</div>
                <div className="tasks_div">

                  <div style={{textAlign: "center"}}>
                    <select defaultValue={folder} className="selector" onChange={(event) => (setFolder(event.target.value))}>
                      {activeUserFolders.map((folder, index) => {
                        return(
                          <option key={index}>{folder.name}</option>
                        )
                      })}
                    </select>
                    <div className="select_folder">Select folder</div>
                  </div>

                  <FolderIcon setTrigger={setShowFolder}/>

                  <TaskIcon setTrigger={setShowAdd}/>

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
                    <tr className="not_found"><td>No tasks found</td></tr>
                  )}

                </tbody>
              </table>
            </div>
            <div className="bottom_space"></div>
          </div>
        ):(<div className="not_login">Log in to see tasks</div>)}
      </div>
    )
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

                    <div className="transparent_line"/>

                    <table className="task_mid">
                      <tbody>
                        <tr>
                          <td className="left_td">

                            <div style={{padding: "5px 10px"}}>

                              <FolderSelector activeUserFolders={activeUserFolders} folder={note.folder} ind={note._id}/>
                              <br/>

                              <div style={{height: "5px"}} />

                              <StatusSelector status={note.status} ind={note._id}/>

                              <div style={{height: "5px"}} />

                              <ActiveSelector active={note.active} ind={note._id}/>

                            </div>

                            <div className="transparent_line"/>

                            <TaskLeft taskFinishDate={note.finishDate} taskInd={note._id} taskOffset={note.offset}/>

                          </td>
                          <td className="right_td">
                            <div className="task_desc">
                              <div className="task_header white_color">Description</div>
                              {editing ? (
                                <textarea type="text" rows="20" className="text_area" defaultValue={note.desc} id="newtext"/>
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