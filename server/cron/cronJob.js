var CronJob = require('cron').CronJob
var XMLHttpRequest = require('xhr2')
const Service = require("../service/service")
const Message = require("../message/message")

function cronJob (api) {
  var job = new CronJob(
    '* * * * * *',
    async function() {

        const notes = await Service.getActiveNotes() 
        notes.map(async note => {
          const folder = await Service.getFolderByNote(note.folderId)
          const user = await Service.getUserByFolder(folder.user_email)

          let xhttp = new XMLHttpRequest()
    
          xhttp.open("GET", api + "?chat_id=" + user.telegram + "&text=" + Message(note.name, note.folder, note.status, note.desc), true)
                        
          xhttp.send()

          xhttp.onload = function() {
            console.log(`Sent: ${xhttp.status}`)
          }

          xhttp.onerror = function() {
            console.log(`Error: ${xhttp.status}`)
          }
          Service.changeField("active", "Automatically", false, note._id)
        })



    },
    null,
    true
  )
}

module.exports = cronJob