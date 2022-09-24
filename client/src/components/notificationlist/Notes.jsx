import React from 'react'
import './notificationlist.css'

const Notes = ({ currentNotes, status, folder }) => {

    function openTask(ind){
      sessionStorage.setItem('Active', "true")
      sessionStorage.setItem("ActiveTask", ind)
      document.location.reload()
    }

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

export default Notes