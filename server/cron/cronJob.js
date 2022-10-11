var CronJob = require('cron').CronJob
var XMLHttpRequest = require('xhr2')
const { ObjectId } = require('mongodb')
const Service = require("../service/service")
const Message = require("../message/message")

function cronJob (api) {
  var job = new CronJob(
    '* * * * * *',
    async function() {

      const now = new Date()

      const tasks = await Service.getTasks()
      const users = await Service.getUsers()
      const folders = await Service.getFolders()

        tasks.map(task => {
          if(task.to && (Date.parse(task.to) - task.offsetTime <= Date.parse(now)) && task.active){
              users.map(user => {
                  folders.map(folder => {
                    if(String(ObjectId(task.folderId)) === String(folder._id)){
                      if(folder.user_email === user.email){

                        let xhttp = new XMLHttpRequest()
    
                        xhttp.open("GET", api + "?chat_id=" + user.telegram + "&text=" + Message(task.name, task.folder, task.status, task.desc), true)
                        xhttp.send()
    
                      }
                    }
                  })
              })

            Service.changeField("active", "", false, task._id)

          }
        })



    },
    null,
    true
  )
}

module.exports = cronJob