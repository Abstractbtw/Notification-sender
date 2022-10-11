import React, {useState, useEffect} from 'react'
import './notificationlist.css'

import DatePicker from "react-datepicker"
import TimePicker from "react-time-picker/dist/entry.nostyle"

import {addtime, settimer} from "../../controllers/controller"

import ErrorText from '../popups/ErrorText'



const TaskTop = ({name}) => {
  function CloseTask () {
    sessionStorage.setItem('Active', "false")
    sessionStorage.setItem("ActiveTask", "")
    document.location.reload()
  }
  return(
    <div className="task_top">
      <div className="opened_task_name">{name}</div>
      <button className="nav_log_out" style={{marginLeft: "auto"}} onClick={() => (CloseTask())}>Back</button>
    </div>
  )
}



const TaskLeft = ({taskFinishDate, taskInd, taskOffset}) => {

  const [date, setDate] = useState("")
  const [finish, setFinish] = useState()
  const [time, setTime] = useState("");
  const [offset, setOffset] = useState(0);
  const [checkDate, setCheckDate] = useState(false)

  function checkTime(){
    const now = new Date()
    console.log(finish)
    const finishDate = finish + " | " + time.slice(0,2) + ":" + time.slice(3,5)
    const noteDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.slice(0,2), time.slice(3,5))
    if (Date.parse(noteDate) >= Date.parse(now)) {
      addtime(taskInd, noteDate, finishDate, time)
      document.location.reload()
    }
    else{
      setCheckDate(true)
    }
  }

  return(
    <div className="task_padding">
      <div>Task set</div>
      <div>To: {taskFinishDate}</div>
      <div className="task_display">
        <DatePicker className="datepicker" selected={date} placeholder="Select day" dateFormat="dd.MM.yyyy"
          onChange={(date) => (setDate(date), setFinish(date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()), setCheckDate(false))} />
        <TimePicker onChange={(time) => (setTime(time), setCheckDate(false))}/>
      </div>
      <ErrorText trigger={checkDate} message={"Wrong date"}/>
      {date && time ? (
        <button style={{marginTop: "5px", float: "left"}} className="nav_log_out" onClick={() => (checkTime(taskInd, date, finish, time))}>Set date</button>
      ):(
        <button style={{marginTop: "5px", color: "#ffffff30", float: "left"}} className="nav_log_out" disabled>Set date</button>
      )}
      <br/>
      <div className="note_offset">Notification offset</div>
      <div>Offset: {taskOffset}</div>
      <TimePicker onChange={(offset) => (setOffset(offset))}/>
      <br/>
      <div className="space_line"/>
      {offset ? (
        <button style={{float: "left"}} className="nav_log_out" onClick={() => (settimer(taskInd, offset), document.location.reload())}>Set offset</button>
      ):(
        <button style={{color: "#ffffff30", float: "left"}} className="nav_log_out" disabled>Set offset</button>
      )}
    </div>
  )
}

export {TaskTop, TaskLeft}