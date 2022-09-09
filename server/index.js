const express = require("express")
var XMLHttpRequest = require('xhr2')
const { ObjectId } = require('mongodb')
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/router")
const corsMiddleware = require("./middleware/cors.middleware")
const bodyParser = require("body-parser")

const app = express()
const PORT = config.get('serverPort')

app.use(corsMiddleware)
app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api/auth", authRouter)

const start = async () => {
  try {
    await mongoose.connect(config.get("dbUrl"))

    const db = mongoose.connection

    const URI_API = config.get("URI_API")

    var CronJob = require('cron').CronJob
    var job = new CronJob(
      '* * * * * *',
      function() {
        const now = new Date()

        db.collection("tasks").find({}).toArray(function(err, result) {
          result.map(task => {
            if(task.to && (Date.parse(task.to) - task.offsetTime <= Date.parse(now)) && task.active === "active"){
              db.collection("users").find({}).toArray(function(err, results) {
                for(user of results){
                  if(task.user_email === user.email){

                    let xhttp = new XMLHttpRequest()

                    let message = `${task.name}\n\n`
                      message += `Folder: ${task.folder}\n`
                      message += `Status: ${task.status}\n\n`
                      message += `Description: ${task.desc}`

                    xhttp.open("GET", URI_API + "?chat_id=" + user.telegram + "&text=" + message, true)
                    xhttp.send()

                  }
                }
              })

              db.collection("tasks").findOneAndUpdate({
                _id: ObjectId(task._id)
              }, {
                $set: {active: "inactive"}
              })

              app.get('/');

            }
          })

        })

      },
      null,
      true
    )

    app.get('/users', (req, res) => {
      db.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err
        res.json(result)
      })
    })

    app.get('/folders', (req, res) => {
      db.collection("folders").find({}).toArray(function(err, result) {
        if (err) throw err
        res.json(result)
      })
    })

    app.get('/tasks', (req, res) => {
      db.collection("tasks").find({}).toArray(function(err, result) {
        if (err) throw err
        res.json(result)
      })
    })

    app.listen(PORT, () => {
        console.log('Server started on port', PORT)
    })

  } catch (e) {
    console.log("error")
  }

}

start()