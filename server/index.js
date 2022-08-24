const express = require("express")
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