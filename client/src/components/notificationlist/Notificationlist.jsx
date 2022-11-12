import React, {useState, useEffect} from 'react'
import './notificationlist.css'
import "react-datepicker/dist/react-datepicker.css"
import 'react-select-search/style.css'

import {AddTask, AddFolder} from "../popups/Popups"
import {Notes, DeletedNotes} from "./Notes"
import {HistoryIcon, DeletedIcon, FolderIcon, TaskIcon, SearchIcon} from "./Icons"
import {TaskTop, TaskLeft} from "./Task"

import {FolderSelector} from "./Selectors"
import {StatusSelector} from "./Selectors"
import {ActiveSelector} from "./Selectors"
import Navbar from "../navbar/Navbar"

import { ErrorText } from '../popups/ErrorText'

import {updatefield} from "../../controllers/controller"

const {getNotes, getFolders} = require("../../service/service")

function Notificationlist(){

  const activeEmail = localStorage.getItem('email')
  const activeUser = localStorage.getItem('name')

  const [notes, setNotes] = useState([])
  const [folders, setFolders] = useState([])

  const [showAdd, setShowAdd] = useState(false)
  const [showFolder, setShowFolder] = useState(false)
  const [showDeleted, setShowDeleted] = useState(false)

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

  const activeUserToDo = []
  const activeUserInProgress = []
  const activeUserDone = []
  const activeUserDeleted = []

  notes.map(note => {
    if(note.deleted){
      activeUserDeleted.push(note)
    } else {
      activeUserFolders.map(folder => {
        if(note.folderId === folder._id){
          activeUserNotes.push(note)
        }
      })
    }
  })

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



  function CloseTask () {
    sessionStorage.setItem('Active', "false")
    sessionStorage.setItem("ActiveTask", "")
    document.location.reload()
  }

  const [notExists, setNotExists] = useState(false)

  function searchTask (name) {
    let exists
    let openId
    activeUserNotes.map(note => {
      if(note.name === name){
        exists = 1
        openId = note._id
      }
    })
    if(exists){
      sessionStorage.setItem('Active', "true")
      sessionStorage.setItem("ActiveTask", openId)
      document.location.reload()
    }else{
      setNotExists(true)
    }
  }



  const ActiveNotes = ({status}) => {
    return (
      <>
          <tr className="status_space"></tr>

          <tr><td colSpan={2}><div className="table_head status_div">
            <div className="active_note_status" style={{width: "5%"}} />
            {status === "todo" ? (<div className="status_text" style={{width: "68px"}}>To Do</div>):("")}
            {status === "inprogress" ? (<div className="status_text" style={{width: "125px"}}>In Progress</div>):("")}
            {status === "done" ? (<div className="status_text" style={{width: "56px"}}>Done</div>):("")}
            {status === "deleted" ? (<div className="status_text" style={{width: "100px"}}>Deleted</div>):("")}
            <div className="active_note_status" style={{width: "90%"}} />
          </div></td></tr>

          <tr style={{cursor: "default"}}>
            <td className="table_head">Task name</td>
            <td className="table_head">Description</td>
          </tr>

          {status === "deleted" ? (
            <DeletedNotes currentNotes={activeUserDeleted}/>
          ):(
            <Notes currentNotes={activeUserNotes} status={status} folder={folder}/>
          )}
      </>
    )
  }

  const [text, setText] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const onChangeHandler = (text) => {
    setText(text)
    let matches = []
    if (text.length > 0) {
      matches = activeUserNotes.filter(task =>{
        const regex = new RegExp(`${text}`, "gi")
        return task.name.match(regex)
      })
    }
    setSuggestions(matches)
  }

  const onSuggestHandler = (text) => {
    setText(text)
    setSuggestions([])
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

                  <div style={{textAlign: "center", marginRight: "15px"}}>
                    
                    <div className="suggestions">
                      {suggestions && suggestions.map((suggestion, index) => 
                        <div key={index} className="suggestion" onClick={() => onSuggestHandler(suggestion.name)}>
                          <div>{suggestion.name}</div>
                        </div>
                      )}
                    </div>

                    <div style={{paddingLeft: "10px"}}>
                      <ErrorText trigger={notExists} message={"Not found"}/>
                    </div>
                    
                    <div style={{display: "flex"}}>
                      <input type="text" className="selector" autoFocus="autoFocus" onChange={(event) => (onChangeHandler(event.target.value), setNotExists(false))} value={text} placeholder="Enter name" />
                      <SearchIcon setTrigger={searchTask} name={text}/>
                    </div>

                    <div className="select_folder">Search task</div>
                  </div>

                  <div style={{textAlign: "center", marginRight: "5px", marginTop: "auto"}}>
                    <select defaultValue={folder} className="selector" onChange={(event) => (setFolder(event.target.value))}>
                      {activeUserFolders.map((folder, index) => {
                        return(
                          <option key={index}>{folder.name}</option>
                        )
                      })}
                    </select>
                    <div className="select_folder">Select folder</div>
                  </div>

                  <HistoryIcon />

                  <DeletedIcon setTrigger={setShowDeleted} active={showDeleted}/>

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
                      
                  {activeFolderToDoLength && !showDeleted ? (
                    <ActiveNotes status="todo"/>
                  ):("")}

                  {activeFolderInProgressLength && !showDeleted ? (
                    <ActiveNotes status="inprogress"/>
                  ):("")}
                      
                  {activeFolderDoneLength && !showDeleted ? (
                    <ActiveNotes status="done"/>
                  ):("")}

                  {activeUserNotes.length ? (""):(
                    <tr className="not_found"><td>No tasks found</td></tr>
                  )}

                  {showDeleted && activeUserDeleted.length ? (
                    <ActiveNotes status="deleted"/>
                  ):("")}

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
          {notes.map((note, index) => (
            <div key={index}>
              {note._id === sessionStorage.getItem("ActiveTask") ? (
                <div className="task_background">
                  <div className="task_main">

                    <TaskTop name={note.name} startDate={note.startDate} updateDate={note.updateDate} info={note.lastUpdate}/>

                    <div className="transparent_line"/>

                    <table className="task_mid">
                      <tbody>
                        <tr>
                          <td className="left_td">

                            {note.deleted ? (
                              <></>
                            ):(
                              <>

                                <div style={{padding: "5px 10px"}}>

                                  <FolderSelector activeUserFolders={activeUserFolders} folder={note.folder} ind={note._id}/>
                                  <br/>

                                  <div style={{height: "5px"}} />

                                  <StatusSelector status={note.status} ind={note._id}/>

                                  <div style={{height: "5px"}} />

                                  <ActiveSelector active={note.active} ind={note._id}/>

                                </div>

                                <div className="transparent_line"/>

                                <TaskLeft taskFinishDate={note.finishDate} taskInd={note._id} taskOffset={note.offset} taskDeleted={note.deleted}/>

                              </>

                            )}

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
                            {note.deleted ? (
                              <></>
                            ):(
                              <div style={{padding: "10px 5px"}}>
                                {editing ? (
                                  <>
                                    <button className="nav_log_out" style={{marginBottom: "5px"}} onClick={() => setEditingText(false)}>Cancel</button>
                                    <button className="nav_log_out" style={{marginBottom: "5px", marginRight: '5px'}} onClick={() => 
                                      (setEditingText(false), 
                                      updatefield("desc", document.getElementById("newtext").value, note._id), 
                                      document.location.reload()
                                      )}>Save and continue</button>
                                    <button className="nav_log_out" style={{marginBottom: "5px", marginRight: '5px'}} onClick={() => 
                                      (setEditingText(false), 
                                      updatefield("desc", document.getElementById("newtext").value, note._id), 
                                      document.location.reload(),
                                      CloseTask()
                                      )}>Save</button>
                                  </>
                                ):(
                                  <button className="nav_log_out" style={{marginBottom: "5px"}} onClick={() => setEditingText(true)}>Edit</button>
                                )}
                              </div>
                            )}
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